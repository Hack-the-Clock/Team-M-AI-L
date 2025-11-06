# 🚀 InvestorIQ - Quick Start Guide

## Complete Setup in 30 Minutes! ⏱️

---

## 📋 Phase 1: Get Your Free API Keys (10 mins)

### 1. **Alpha Vantage** (Required)
- Go to: https://www.alphavantage.co/support/#api-key
- Click "Get Your Free API Key Today"
- Fill simple form (name, email, organization)
- ✅ You get: **25 API calls/day** (perfect for testing!)
- Copy your API key

### 2. **Twelve Data** (Recommended)
- Go to: https://twelvedata.com/apikey
- Sign up with email
- ✅ You get: **800 API calls/day** (very generous!)
- Copy your API key

### 3. **Finnhub** (For News & Trending)
- Go to: https://finnhub.io/register
- Sign up with email
- ✅ You get: **60 calls/minute** (excellent for news!)
- Copy your API key from dashboard

### 4. **Groq** (For AI Chatbot - BEST!)
- Go to: https://console.groq.com/
- Sign up with Google/GitHub
- Go to "API Keys" section
- ✅ You get: **14,400 requests/day FREE!** (insane!)
- Copy your API key

### 5. **Google Gemini** (Alternative AI - Optional)
- Go to: https://ai.google.dev/
- Click "Get API Key"
- Create project in Google AI Studio
- ✅ You get: **60 requests/minute FREE**
- Copy your API key

---

## 💾 Phase 2: Project Setup (5 mins)

```bash
# 1. Create Next.js project
npx create-next-app@latest investoriq --typescript --tailwind --app

# 2. Navigate to project
cd investoriq

# 3. Install required packages
npm install @tanstack/react-query zustand framer-motion
npm install recharts lucide-react
npm install groq-sdk @google/generative-ai

# 4. Create environment file
# Create .env.local and add your API keys
```

### `.env.local` Template:
```bash
# Stock Data APIs
ALPHA_VANTAGE_API_KEY=YOUR_KEY_HERE
TWELVE_DATA_API_KEY=YOUR_KEY_HERE
FINNHUB_API_KEY=YOUR_KEY_HERE

# AI APIs  
GROQ_API_KEY=YOUR_KEY_HERE
GEMINI_API_KEY=YOUR_KEY_HERE

# Optional
NEWS_API_KEY=YOUR_KEY_HERE
```

---

## 📁 Phase 3: Project Structure (5 mins)

Create these folders and files:

```
investoriq/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts          # AI Chatbot endpoint
│   │   ├── stocks/
│   │   │   └── quote/
│   │   │       └── route.ts      # Stock quotes
│   │   ├── sectors/
│   │   │   └── performance/
│   │   │       └── route.ts      # Sector data
│   │   └── trending/
│   │       └── route.ts          # Trending stocks
│   ├── layout.tsx
│   ├── page.tsx                  # Landing page
│   └── providers.tsx             # React Query provider
│
├── components/
│   ├── Hero.tsx
│   ├── SectorCard.tsx
│   ├── Chatbot.tsx
│   ├── StockCard.tsx
│   ├── Navbar.tsx
│   └── Watchlist.tsx
│
├── lib/
│   ├── api/
│   │   └── stock-service.ts     # Stock API wrapper
│   ├── trending/
│   │   └── detector.ts          # Trending algorithm
│   └── utils.ts
│
├── hooks/
│   ├── useStockQuote.ts
│   ├── useTrending.ts
│   └── useWatchlist.ts
│
├── types/
│   └── index.ts                  # TypeScript interfaces
│
├── .env.local                    # API keys (NEVER commit!)
├── package.json
└── README.md
```

---

## 🧪 Phase 4: Test Your APIs (5 mins)

### Create `test-apis.js` in root:

```javascript
// test-apis.js
require('dotenv').config({ path: '.env.local' });

async function testAPIs() {
  console.log('🧪 Testing API Connections...\n');

  // 1. Test Alpha Vantage
  console.log('Testing Alpha Vantage...');
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    const data = await res.json();
    console.log('✅ Alpha Vantage:', data['Global Quote'] ? 'Working!' : 'Check your API key');
    if (data['Global Quote']) {
      console.log(`   Price: $${data['Global Quote']['05. price']}`);
    }
  } catch (e) {
    console.log('❌ Alpha Vantage: Failed -', e.message);
  }

  console.log('\n---\n');

  // 2. Test Twelve Data
  console.log('Testing Twelve Data...');
  try {
    const res = await fetch(
      `https://api.twelvedata.com/quote?symbol=AAPL&apikey=${process.env.TWELVE_DATA_API_KEY}`
    );
    const data = await res.json();
    console.log('✅ Twelve Data:', data.symbol ? 'Working!' : 'Check your API key');
    if (data.close) {
      console.log(`   Price: $${data.close}`);
    }
  } catch (e) {
    console.log('❌ Twelve Data: Failed -', e.message);
  }

  console.log('\n---\n');

  // 3. Test Finnhub
  console.log('Testing Finnhub...');
  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${process.env.FINNHUB_API_KEY}`
    );
    const data = await res.json();
    console.log('✅ Finnhub:', data.c ? 'Working!' : 'Check your API key');
    if (data.c) {
      console.log(`   Price: $${data.c}`);
    }
  } catch (e) {
    console.log('❌ Finnhub: Failed -', e.message);
  }

  console.log('\n---\n');

  // 4. Test Groq
  console.log('Testing Groq AI...');
  try {
    const { Groq } = require('groq-sdk');
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: 'Say "API is working!"' }],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 50
    });
    
    console.log('✅ Groq AI: Working!');
    console.log(`   Response: ${completion.choices[0].message.content}`);
  } catch (e) {
    console.log('❌ Groq AI: Failed -', e.message);
  }

  console.log('\n✅ All tests complete!');
}

testAPIs();
```

### Run the test:
```bash
node test-apis.js
```

---

## 🎨 Phase 5: Build Your First Feature (5 mins)

### Let's create a simple stock quote component:

### File: `components/StockPrice.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';

interface StockPriceProps {
  symbol: string;
}

export function StockPrice({ symbol }: StockPriceProps) {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch(`/api/stocks/quote?symbol=${symbol}`);
        const data = await res.json();
        setPrice(data.price);
      } catch (error) {
        console.error('Failed to fetch price:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrice();
    
    // Update every 15 seconds
    const interval = setInterval(fetchPrice, 15000);
    return () => clearInterval(interval);
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  if (!price) return <div>Error</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold">{symbol}</h3>
      <p className="text-2xl font-semibold text-green-600">
        ${price.toFixed(2)}
      </p>
    </div>
  );
}
```

### File: `app/page.tsx`

```typescript
import { StockPrice } from '@/components/StockPrice';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">InvestorIQ</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <StockPrice symbol="AAPL" />
        <StockPrice symbol="TSLA" />
        <StockPrice symbol="NVDA" />
      </div>
    </main>
  );
}
```

### Run it:
```bash
npm run dev
```

Visit: http://localhost:3000

---

## 📊 Understanding Your Data Needs

### **1. Stock Data You'll Need:**

#### For Landing Page:
```javascript
{
  sectors: [
    {
      name: "AI & Robotics",
      changePercent: 2.34,
      trend: "up",
      companies: 150
    }
  ]
}
```

#### For Chatbot:
```javascript
{
  companies: [
    {
      symbol: "NVDA",
      name: "NVIDIA",
      price: 145.20,
      change: 2.45,
      changePercent: 1.71,
      description: "AI chip leader",
      logo: "https://logo.clearbit.com/nvidia.com",
      tags: ["AI", "Semiconductors"]
    }
  ]
}
```

#### For Watchlist:
```javascript
{
  watchlist: [
    {
      symbol: "TSLA",
      name: "Tesla",
      price: 242.80,
      change: -3.20,
      changePercent: -1.30,
      addedAt: "2025-11-06"
    }
  ]
}
```

---

## 🔥 How to Detect Trending Stocks

### **Method 1: News Volume** (EASIEST)

```javascript
// Count news articles in last 7 days
async function getTrendingScore(symbol) {
  const response = await fetch(
    `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=2025-10-30&to=2025-11-06&token=YOUR_KEY`
  );
  const news = await response.json();
  
  // More news = more trending
  return news.length; // Score: 0-100+
}
```

### **Method 2: Social Mentions**

```javascript
async function getSocialTrending(symbol) {
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/social-sentiment?symbol=${symbol}&token=YOUR_KEY`
  );
  const data = await response.json();
  
  // Combine Reddit + Twitter mentions
  return data.reddit.mention + data.twitter.mention;
}
```

### **Method 3: Price + Volume Momentum**

```javascript
function calculateMomentum(stockData) {
  const priceChange = stockData.changePercent; // Last 7 days
  const volumeIncrease = stockData.volumeChangePercent;
  
  // Weighted score
  const score = (priceChange * 0.6) + (volumeIncrease * 0.4);
  
  return score; // Higher = more trending
}
```

### **Combined Trending Algorithm:**

```javascript
async function isTrending(symbol) {
  const newsScore = await getTrendingScore(symbol);
  const socialScore = await getSocialTrending(symbol);
  const momentumScore = await calculateMomentum(symbol);
  
  // Normalize to 0-100
  const finalScore = 
    (newsScore / 50 * 30) +           // 30% weight
    (socialScore / 10000 * 30) +      // 30% weight
    (momentumScore / 20 * 40);        // 40% weight
  
  return finalScore > 60; // Threshold for "trending"
}
```

---

## 🤖 How to Use LLM (Groq Example)

### **Basic Setup:**

```typescript
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function askAI(userQuestion: string) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are an investment advisor AI.'
      },
      {
        role: 'user',
        content: userQuestion
      }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 500
  });
  
  return completion.choices[0].message.content;
}
```

### **With Stock Data Context:**

```typescript
async function chatWithStockContext(userMessage: string, category: string) {
  // 1. Get relevant stock data
  const stocks = await getStocksForCategory(category);
  
  // 2. Format as context for AI
  const context = stocks.map(s => 
    `${s.name} (${s.symbol}): $${s.price}, ${s.changePercent}% today`
  ).join('\n');
  
  // 3. Send to AI with context
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are an investment advisor. Here's current ${category} stock data:\n\n${context}\n\nProvide insights based on this data.`
      },
      {
        role: 'user',
        content: userMessage
      }
    ],
    model: 'llama-3.3-70b-versatile'
  });
  
  return completion.choices[0].message.content;
}
```

### **Smart Category Detection:**

```typescript
function detectCategory(message: string): string {
  const lower = message.toLowerCase();
  
  if (lower.match(/ai|robot|machine learning|automation/)) {
    return 'AI & Robotics';
  }
  if (lower.match(/fintech|crypto|payment|blockchain/)) {
    return 'Fintech';
  }
  if (lower.match(/ev|electric vehicle|tesla|rivian/)) {
    return 'Electric Vehicles';
  }
  if (lower.match(/solar|green|renewable|clean energy/)) {
    return 'Green Energy';
  }
  
  return 'General'; // Default
}

// Usage
const category = detectCategory("What are the best EV stocks?");
// Returns: "Electric Vehicles"
```

---

## 💡 Pro Tips for Success

### 1. **Start with Mock Data First**
Don't connect APIs immediately. Build UI with fake data, then integrate.

```typescript
// Mock data for development
const MOCK_STOCKS = [
  { symbol: 'AAPL', name: 'Apple', price: 178.50, change: 2.3 },
  { symbol: 'TSLA', name: 'Tesla', price: 242.80, change: -1.2 },
  // ... more
];

// Use mock in development, real in production
const stocks = process.env.NODE_ENV === 'development' 
  ? MOCK_STOCKS 
  : await fetchRealStocks();
```

### 2. **Cache Everything**
Save API calls with aggressive caching:

```typescript
// Cache for 5 minutes
const CACHE_TIME = 5 * 60 * 1000;

function getCached(key: string) {
  const item = localStorage.getItem(key);
  if (!item) return null;
  
  const { data, timestamp } = JSON.parse(item);
  if (Date.now() - timestamp > CACHE_TIME) {
    localStorage.removeItem(key);
    return null;
  }
  
  return data;
}
```

### 3. **Handle API Failures Gracefully**

```typescript
async function fetchWithFallback(symbol: string) {
  try {
    // Try primary API
    return await fetchFromTwelveData(symbol);
  } catch (error) {
    try {
      // Fallback to secondary API
      return await fetchFromAlphaVantage(symbol);
    } catch (error2) {
      // Return cached data if available
      return getCached(`stock_${symbol}`);
    }
  }
}
```

### 4. **Rate Limit Protection**

```typescript
class RateLimiter {
  private calls: number[] = [];
  private maxCalls = 25; // Alpha Vantage limit
  private perMinutes = 1440; // Per day

  canMakeCall(): boolean {
    const now = Date.now();
    const cutoff = now - (this.perMinutes * 60 * 1000);
    
    // Remove old calls
    this.calls = this.calls.filter(t => t > cutoff);
    
    if (this.calls.length < this.maxCalls) {
      this.calls.push(now);
      return true;
    }
    
    return false;
  }
}
```

---

## 🎯 Your First Day Goals

### ✅ Morning (2 hours):
- [ ] Get all API keys
- [ ] Setup Next.js project
- [ ] Test all APIs with test script
- [ ] Create basic project structure

### ✅ Afternoon (3 hours):
- [ ] Build landing page with mock data
- [ ] Create sector cards component
- [ ] Implement basic stock price display
- [ ] Add dark mode toggle

### ✅ Evening (2 hours):
- [ ] Connect real stock API
- [ ] Implement caching
- [ ] Test with multiple stocks
- [ ] Deploy to Vercel

---

## 🚀 Week 1 Roadmap

### Day 1: Foundation
- Setup + Landing page with mock data

### Day 2: Real Data
- Connect stock APIs
- Implement caching
- Build stock cards

### Day 3: Chatbot
- Setup Groq API
- Build chat UI
- Basic Q&A working

### Day 4: Intelligence
- Trending detection
- Category matching
- Context-aware responses

### Day 5: Sectors
- GICS explorer
- Sector performance
- Subcategories

### Day 6: Watchlist
- localStorage persistence
- Compare feature
- Export data

### Day 7: Polish
- Dashboard graphs
- Micro-interactions
- Bug fixes

---

## 📚 Learning Resources

### APIs:
- Alpha Vantage Docs: https://www.alphavantage.co/documentation/
- Twelve Data Docs: https://twelvedata.com/docs
- Finnhub Docs: https://finnhub.io/docs/api
- Groq Docs: https://console.groq.com/docs

### React/Next.js:
- Next.js Docs: https://nextjs.org/docs
- React Query: https://tanstack.com/query/latest
- Framer Motion: https://www.framer.com/motion/

### Communities:
- Reddit: r/reactjs, r/nextjs
- Discord: Reactiflux
- Stack Overflow

---

## 🆘 Common Issues & Solutions

### Issue: "API calls exceeded"
**Solution:** Implement caching, reduce update frequency

### Issue: "CORS error"
**Solution:** Use Next.js API routes (they run server-side)

### Issue: "Stock data not updating"
**Solution:** Check cache expiration, verify API key

### Issue: "Slow performance"
**Solution:** Use React Query, implement pagination, lazy loading

---

## ✅ Final Checklist Before Building

- [ ] All API keys obtained and tested
- [ ] `.env.local` file created and populated
- [ ] Project structure created
- [ ] Dependencies installed
- [ ] Test script runs successfully
- [ ] Mock data prepared
- [ ] Git repo initialized (don't commit `.env.local`!)

---

## 🎉 You're Ready!

Start with the landing page, get something visual working, then progressively enhance with real data and features.

**Remember:** Build incrementally, test often, and don't be afraid to use mock data while learning!

Good luck! 🚀💹
