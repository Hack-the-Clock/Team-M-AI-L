# Logo Update Script Guide

## Quick Start

### 1. Install Python dependencies
```powershell
pip install pymongo requests
```

### 2. Run the script
```powershell
cd 'd:\Projects\SGTA HAckathon - Copy'
python update-logos.py
```

### 3. What it does
- Connects to your MongoDB (`project3.wikipedia_holdings`)
- Finds companies without logos (or with null/empty logo fields)
- Extracts logos from existing Wikipedia data in your documents
- If not found, fetches fresh from Wikipedia API
- Updates the `logo` field with image URLs
- Processes up to 100 companies at a time (rate-limited)

### 4. Expected Output
```
🔗 Connecting to MongoDB...
✓ Connected to database: project3
✓ Collection: wikipedia_holdings

📊 Found 50 companies without logos

[1/50] NVDA - NVIDIA Corporation
  ✓ Found thumbnail logo: https://upload.wikimedia.org/...
  ✅ Updated NVDA with logo

[2/50] MSFT - Microsoft Corporation
  ✓ Using logo from existing wiki data
  ✅ Updated MSFT with logo
...
```

## Configuration

The script is already configured with your MongoDB credentials from `.env.local`:
- URI: `mongodb+srv://Portfolio_intelligence:WMproject3@...`
- Database: `project3`
- Collection: `wikipedia_holdings`

To change settings, edit lines 12-14 in `update-logos.py`.

## Features

✓ Extracts logos from existing Wikipedia data in your documents  
✓ Falls back to live Wikipedia API if needed  
✓ Rate-limited (0.5s delay) to respect Wikipedia's servers  
✓ Processes only publicly traded companies (with price fields)  
✓ Skips companies that already have logos  
✓ Updates 100 companies at a time (change `limit(100)` to process more)

## After Running

1. Check MongoDB to verify logos were added:
```javascript
db.wikipedia_holdings.find({ logo: { $exists: true, $ne: null } }).limit(5)
```

2. Restart your Next.js dev server:
```powershell
cd 'd:\Projects\SGTA HAckathon - Copy\investoriq'
npm run dev
```

3. Visit http://localhost:3000/chatbot and ask about stocks — logos should now appear!

## Troubleshooting

**"pymongo is not installed"**
```powershell
pip install pymongo requests
```

**"Connection refused"**
- Check your MongoDB URI in the script
- Verify network access in MongoDB Atlas

**"No logo found for X"**
- Some companies don't have logos on Wikipedia
- The script will skip them (fallback to Clearbit will still work in the UI)

**Want to update ALL companies (not just missing logos)?**
Change line 93 in the script:
```python
# From:
query = {"$or": [{"logo": {"$exists": False}}, {"logo": None}]}

# To:
query = {}  # Update all companies
```

## Run Again Later

You can run this script anytime to:
- Add logos for newly added companies
- Update logos for companies that were skipped
- Refresh all logos (change the query to update all)

Just run: `python update-logos.py`
