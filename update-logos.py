#!/usr/bin/env python3
"""
MongoDB Logo Updater Script
Fetches company logos from Wikipedia and updates MongoDB documents
"""

import os
import sys
import requests
from pymongo import MongoClient
from urllib.parse import quote
import time

# Configuration - reads from .env.local format or you can hardcode
MONGODB_URI = "mongodb+srv://Portfolio_intelligence:WMproject3@cluster0.5ibriwd.mongodb.net/?retryWrites=true&w=majority"
MONGODB_DB = "project3"
MONGODB_COLLECTION = "wikipedia_holdings"

def get_wikipedia_logo(company_name, ticker):
    """
    Fetch logo URL from Wikipedia API
    """
    try:
        # Clean company name for Wikipedia search
        search_name = company_name.replace(' Inc', '').replace(' Corporation', '').replace(' Ltd', '').strip()
        
        # Wikipedia API - search for the page
        search_url = f"https://en.wikipedia.org/w/api.php"
        search_params = {
            "action": "query",
            "format": "json",
            "list": "search",
            "srsearch": search_name,
            "utf8": 1
        }
        
        response = requests.get(search_url, params=search_params, timeout=10)
        data = response.json()
        
        if not data.get('query', {}).get('search'):
            print(f"  ⚠️  No Wikipedia page found for {company_name}")
            return None
        
        # Get the first search result page title
        page_title = data['query']['search'][0]['title']
        
        # Fetch page info including images
        page_url = "https://en.wikipedia.org/w/api.php"
        page_params = {
            "action": "query",
            "format": "json",
            "titles": page_title,
            "prop": "pageimages|images",
            "pithumbsize": 200,
            "pilimit": 10
        }
        
        response = requests.get(page_url, params=page_params, timeout=10)
        data = response.json()
        
        pages = data.get('query', {}).get('pages', {})
        page = list(pages.values())[0]
        
        # Try to get thumbnail (logo)
        if 'thumbnail' in page:
            logo_url = page['thumbnail']['source']
            print(f"  ✓ Found thumbnail logo: {logo_url}")
            return logo_url
        
        # Try to get main image
        if 'images' in page:
            for img in page['images']:
                img_title = img['title']
                if 'logo' in img_title.lower() or 'icon' in img_title.lower():
                    # Fetch image info to get URL
                    img_url = "https://en.wikipedia.org/w/api.php"
                    img_params = {
                        "action": "query",
                        "format": "json",
                        "titles": img_title,
                        "prop": "imageinfo",
                        "iiprop": "url",
                        "iiurlwidth": 200
                    }
                    
                    img_response = requests.get(img_url, params=img_params, timeout=10)
                    img_data = img_response.json()
                    
                    img_pages = img_data.get('query', {}).get('pages', {})
                    img_page = list(img_pages.values())[0]
                    
                    if 'imageinfo' in img_page:
                        logo_url = img_page['imageinfo'][0].get('thumburl') or img_page['imageinfo'][0].get('url')
                        print(f"  ✓ Found image logo: {logo_url}")
                        return logo_url
        
        print(f"  ⚠️  No logo image found for {company_name}")
        return None
        
    except Exception as e:
        print(f"  ❌ Error fetching logo for {company_name}: {str(e)}")
        return None

def update_logos():
    """
    Connect to MongoDB and update logo fields
    """
    print("🔗 Connecting to MongoDB...")
    
    try:
        client = MongoClient(MONGODB_URI)
        db = client[MONGODB_DB]
        collection = db[MONGODB_COLLECTION]
        
        print(f"✓ Connected to database: {MONGODB_DB}")
        print(f"✓ Collection: {MONGODB_COLLECTION}\n")
        
        # Find all documents without logos (or you can update all)
        query = {
            "$or": [
                {"logo": {"$exists": False}},
                {"logo": None},
                {"logo": ""}
            ],
            # Only update publicly traded companies with prices
            "$and": [
                {"$or": [
                    {"price": {"$exists": True, "$ne": None, "$type": "number"}},
                    {"latestPrice": {"$exists": True, "$ne": None, "$type": "number"}}
                ]}
            ]
        }
        
        companies = list(collection.find(query).limit(100))  # Limit to 100 at a time
        total = len(companies)
        
        print(f"📊 Found {total} companies without logos\n")
        
        if total == 0:
            print("✓ All companies already have logos!")
            return
        
        updated = 0
        skipped = 0
        
        for i, company in enumerate(companies, 1):
            ticker = company.get('ticker') or company.get('symbol', 'UNKNOWN')
            name = company.get('name') or company.get('companyName', ticker)
            
            print(f"[{i}/{total}] {ticker} - {name}")
            
            # Check if logo already exists in wiki data
            logo_url = None
            if 'wiki' in company and isinstance(company['wiki'], dict):
                # Try to extract from existing wiki data
                wiki = company['wiki']
                if 'thumbnail' in wiki:
                    logo_url = wiki['thumbnail'].get('source') if isinstance(wiki['thumbnail'], dict) else wiki['thumbnail']
                elif 'image' in wiki:
                    logo_url = wiki['image']
                elif 'logo' in wiki:
                    logo_url = wiki['logo']
            
            # If not in existing data, fetch from Wikipedia
            if not logo_url:
                logo_url = get_wikipedia_logo(name, ticker)
                time.sleep(0.5)  # Rate limiting - be nice to Wikipedia
            else:
                print(f"  ✓ Using logo from existing wiki data")
            
            # Update MongoDB
            if logo_url:
                collection.update_one(
                    {"_id": company["_id"]},
                    {"$set": {"logo": logo_url}}
                )
                updated += 1
                print(f"  ✅ Updated {ticker} with logo\n")
            else:
                skipped += 1
                print(f"  ⏭️  Skipped {ticker} (no logo found)\n")
        
        print(f"\n{'='*50}")
        print(f"✅ Update complete!")
        print(f"   Updated: {updated}")
        print(f"   Skipped: {skipped}")
        print(f"   Total:   {total}")
        print(f"{'='*50}\n")
        
        client.close()
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    print("\n" + "="*50)
    print("  MongoDB Logo Updater")
    print("="*50 + "\n")
    
    # Check if pymongo is installed
    try:
        import pymongo
    except ImportError:
        print("❌ pymongo is not installed!")
        print("\nInstall it with:")
        print("  pip install pymongo requests")
        sys.exit(1)
    
    update_logos()
    
    print("\n✓ Done! Restart your Next.js dev server to see the changes.")
    print("  cd investoriq && npm run dev\n")
