# InvestorIQ - Complete Data Sources & Implementation Guide 🚀

## 📋 Table of Contents
1. [Data Requirements Overview](#data-requirements)
2. [Free Stock Data APIs](#stock-data-apis)
3. [Trending Companies Detection](#trending-detection)
4. [LLM Integration (Free)](#llm-integration)
5. [Additional Free Resources](#additional-resources)
6. [Implementation Architecture](#architecture)
7. [Step-by-Step Setup](#setup)

---

## 🎯 Data Requirements Overview

### 1. **Landing Page Data**
- [ ] Sector performance data (daily/weekly trends)
- [ ] Top performing sectors with % change
- [ ] Sector icons/images
- [ ] Live market status (open/closed)

### 2. **AI Chatbot Data**
- [ ] Company information (name, ticker, description)
- [ ] Real-time or delayed stock prices
- [ ] Company logos
- [ ] Sector/category tags
- [ ] Company fundamentals (market cap, P/E ratio, etc.)

### 3. **Sectors Explorer (GICS)**
- [ ] GICS sector classification hierarchy
- [ ] Subcategory breakdown
- [ ] Companies per sector/subcategory
- [ ] Sector trend data (historical prices)
- [ ] Number of companies in each sector

### 4. **Watchlist/Stock Cart**
- [ ] User-selected stock data
- [ ] Live price updates
- [ ] Price change % (daily)
- [ ] Historical price data for mini-graphs

### 5. **Insights & Trends Dashboard**
- [ ] Market heatmap data (sector performance)
- [ ] Top gainers/losers (daily)
- [ ] Trading volume data
- [ ] Trending themes/topics
- [ ] News headlines (optional)

---

## 📊 Free Stock Data APIs

### **1. Alpha Vantage** ⭐ BEST FOR BEGINNERS
**Free Tier:** 25 API calls/day (500/month)

```
Website: https://www.alphavantage.co/
API Key: Free registration required
```

**Features:**
- ✅ Real-time & historical stock prices
- ✅ Company information
- ✅ Sector performance
- ✅ Top gainers/losers
- ✅ Global market data
- ✅ Technical indicators

**Example Endpoints:**
```javascript
// Get real-time stock price
https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=YOUR_KEY

// Get daily prices (last 100 days)
https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=YOUR_KEY

// Sector performance
https://www.alphavantage.co/query?function=SECTOR&apikey=YOUR_KEY

// Company overview (fundamentals)
https://www.alphavantage.co/query?function=OVERVIEW&symbol=NVDA&apikey=YOUR_KEY

// Top gainers/losers
https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=YOUR_KEY
```

**Rate Limit Strategy:**
- Cache responses in localStorage/IndexedDB
- Update prices every 5-15 minutes (not every second)
- Use batch requests where possible

---

### **2. Twelve Data** ⭐ GENEROUS FREE TIER
**Free Tier:** 800 API calls/day

```
Website: https://twelvedata.com/
API Key: Free registration required
```

**Features:**
- ✅ Real-time stock data
- ✅ 30+ cryptocurrencies
- ✅ Forex data
- ✅ Technical indicators
- ✅ Time series data
- ✅ Market state (open/closed)

**Example Endpoints:**
```javascript
// Real-time price
https://api.twelvedata.com/price?symbol=AAPL&apikey=YOUR_KEY

// Time series (multiple stocks at once)
https://api.twelvedata.com/time_series?symbol=AAPL,MSFT,GOOGL&interval=1day&apikey=YOUR_KEY

// Market state
https://api.twelvedata.com/market_state?country=United%20States&apikey=YOUR_KEY

// Logo (company logo URL)
https://api.twelvedata.com/logo?symbol=AAPL&apikey=YOUR_KEY
```

---

### **3. Finnhub** ⭐ EXCELLENT FOR NEWS & TRENDS
**Free Tier:** 60 API calls/minute

```
Website: https://finnhub.io/
API Key: Free registration required
```

**Features:**
- ✅ Real-time stock prices
- ✅ Company news (EXCELLENT for trending detection!)
- ✅ Company profiles
- ✅ Earnings calendar
- ✅ Social sentiment
- ✅ IPO calendar
- ✅ Insider transactions

**Example Endpoints:**
```javascript
// Stock quote
https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_KEY

// Company news (for trending detection!)
https://finnhub.io/api/v1/company-news?symbol=TSLA&from=2025-11-01&to=2025-11-06&token=YOUR_KEY

// Market news (general trends)
https://finnhub.io/api/v1/news?category=general&token=YOUR_KEY

// Company profile
https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=YOUR_KEY

// Social sentiment (Reddit, Twitter mentions)
https://finnhub.io/api/v1/stock/social-sentiment?symbol=TSLA&token=YOUR_KEY
```

---

### **4. Yahoo Finance (Unofficial APIs)** ⭐ NO API KEY NEEDED!
**Free Tier:** Unlimited (but use responsibly)

```
Libraries:
- Python: yfinance
- JavaScript: yahoo-finance2 (npm package)
```

**Features:**
- ✅ Real-time stock prices
- ✅ Historical data
- ✅ Company info
- ✅ No API key required!
- ✅ Most reliable free source

**JavaScript Implementation:**
```bash
npm install yahoo-finance2
```

```javascript
import yahooFinance from 'yahoo-finance2';

// Get real-time quote
const quote = await yahooFinance.quote('AAPL');

// Get historical data
const history = await yahooFinance.historical('TSLA', {
  period1: '2025-01-01',
  period2: '2025-11-06'
});

// Search for stocks
const search = await yahooFinance.search('artificial intelligence');
```

---

### **5. Financial Modeling Prep (FMP)** ⭐ GREAT FOR FUNDAMENTALS
**Free Tier:** 250 API calls/day

```
Website: https://financialmodelingprep.com/
API Key: Free registration required
```

**Features:**
- ✅ Company fundamentals
- ✅ Financial statements
- ✅ Stock screener
- ✅ Sector performance
- ✅ IPO calendar
- ✅ Market gainers/losers

**Example Endpoints:**
```javascript
// Company profile
https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=YOUR_KEY

// Stock screener (filter by sector, market cap, etc.)
https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&sector=Technology&apikey=YOUR_KEY

// Gainers
https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=YOUR_KEY

// Sector P/E ratios
https://financialmodelingprep.com/api/v4/sector_price_earning_ratio?date=2025-11-06&apikey=YOUR_KEY
```

---

## 🔥 Trending Companies Detection

### **Method 1: News Frequency Analysis** (BEST)

Use **Finnhub** or **News API**:

```javascript
// Collect news mentions for multiple companies
const companies = ['TSLA', 'NVDA', 'AAPL', 'MSFT'];
const trendingScores = {};

for (const symbol of companies) {
  const news = await fetch(
    `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=2025-11-01&to=2025-11-06&token=YOUR_KEY`
  ).then(r => r.json());
  
  // Score based on news volume
  trendingScores[symbol] = news.length;
}

// Sort by trending score
const trending = Object.entries(trendingScores)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10); // Top 10 trending
```

---

### **Method 2: Social Sentiment** (Reddit/Twitter)

Use **Finnhub Social Sentiment API**:

```javascript
const sentiment = await fetch(
  `https://finnhub.io/api/v1/stock/social-sentiment?symbol=TSLA&token=YOUR_KEY`
).then(r => r.json());

// sentiment.reddit.mention - Number of Reddit mentions
// sentiment.twitter.mention - Number of Twitter mentions
```

---

### **Method 3: Price Movement + Volume**

Calculate "momentum score":

```javascript
function calculateTrendingScore(stockData) {
  const priceChange = stockData.priceChangePercent; // Last 7 days
  const volumeChange = stockData.volumeChangePercent;
  
  // Weighted score
  return (priceChange * 0.6) + (volumeChange * 0.4);
}

// Stocks with high momentum = trending
```

---

### **Method 4: Google Trends** (Indirect)

Use **pytrends** (Python) or **google-trends-api** (Node.js):

```bash
npm install google-trends-api
```

```javascript
import googleTrends from 'google-trends-api';

// Check search interest for a company
const trend = await googleTrends.interestOverTime({
  keyword: 'Tesla stock',
  startTime: new Date('2025-10-01'),
  endTime: new Date('2025-11-06')
});
```

---

## 🤖 LLM Integration (Free Options)

### **Option 1: Groq API** ⭐ FASTEST & FREE
**Free Tier:** 14,400 requests/day (extremely generous!)

```
Website: https://console.groq.com/
Model: llama-3.3-70b-versatile (or llama-3.1-70b)
Speed: 300+ tokens/second (incredibly fast!)
```

**Setup:**
```bash
npm install groq-sdk
```

```javascript
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function chatWithAI(userMessage, stockContext) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are an investment advisor AI. You have access to current stock data: ${JSON.stringify(stockContext)}. Provide concise, helpful insights about stocks in specific categories.`
      },
      {
        role: 'user',
        content: userMessage
      }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 500
  });
  
  return completion.choices[0].message.content;
}

// Example usage
const response = await chatWithAI(
  "What companies are leading in AI Robotics?",
  {
    companies: [
      { name: "NVIDIA", ticker: "NVDA", sector: "AI", price: 145.20 },
      { name: "Tesla", ticker: "TSLA", sector: "Robotics", price: 242.80 }
    ]
  }
);
```

---

### **Option 2: Hugging Face Inference API** ⭐ FREE FOREVER
**Free Tier:** Unlimited (with rate limits)

```
Website: https://huggingface.co/inference-api
Models: Mistral-7B, Llama-2-7B, Falcon-7B
```

**Setup:**
```bash
npm install @huggingface/inference
```

```javascript
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HF_API_KEY);

async function getChatResponse(prompt) {
  const response = await hf.textGeneration({
    model: 'mistralai/Mistral-7B-Instruct-v0.2',
    inputs: prompt,
    parameters: {
      max_new_tokens: 500,
      temperature: 0.7
    }
  });
  
  return response.generated_text;
}
```

---

### **Option 3: Google Gemini API** ⭐ EXCELLENT & FREE
**Free Tier:** 60 requests/minute

```
Website: https://ai.google.dev/
Model: gemini-1.5-flash (fast & free!)
```

**Setup:**
```bash
npm install @google/generative-ai
```

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function chatWithGemini(message, context) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt = `
    You are an investment advisor. Answer this query based on the stock data provided.
    
    Stock Data: ${JSON.stringify(context)}
    
    User Question: ${message}
    
    Provide a concise, helpful response with specific company recommendations.
  `;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}
```

---

### **Option 4: OpenRouter** ⭐ ACCESS MULTIPLE MODELS
**Free Tier:** Some models are completely free

```
Website: https://openrouter.ai/
Free Models: google/gemma-7b-it:free, mistralai/mistral-7b-instruct:free
```

**Setup:**
```javascript
async function chatWithOpenRouter(message) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'google/gemma-7b-it:free', // Free model!
      messages: [
        { role: 'user', content: message }
      ]
    })
  });
  
  return await response.json();
}
```

---

## 🎨 Additional Free Resources

### **1. Company Logos**
- **Clearbit Logo API** (Free, no key): `https://logo.clearbit.com/{domain}`
  - Example: `https://logo.clearbit.com/apple.com`
- **Brandfetch API**: https://brandfetch.com/
- **Logo.dev**: `https://img.logo.dev/{domain}?token=YOUR_KEY`

### **2. Sector Icons**
- **Font Awesome** (Free): https://fontawesome.com/
- **Heroicons** (Free): https://heroicons.com/
- **Lucide Icons** (Free): https://lucide.dev/

### **3. News APIs**
- **News API** (100 requests/day free): https://newsapi.org/
- **Finnhub News** (included in Finnhub API)
- **GNews API** (100 requests/day): https://gnews.io/

### **4. GICS Sector Classification**
```javascript
// Free GICS sector mapping (you can hardcode this)
const GICS_SECTORS = {
  "10": "Energy",
  "15": "Materials",
  "20": "Industrials",
  "25": "Consumer Discretionary",
  "30": "Consumer Staples",
  "35": "Health Care",
  "40": "Financials",
  "45": "Information Technology",
  "50": "Communication Services",
  "55": "Utilities",
  "60": "Real Estate"
};

// Enhanced categories (your custom subcategories)
const CUSTOM_CATEGORIES = {
  "AI & Robotics": ["NVDA", "TSLA", "GOOGL", "AMZN"],
  "Green Energy": ["TSLA", "ENPH", "SEDG", "PLUG"],
  "Healthcare Tech": ["TDOC", "VEEV", "DXCM", "ISRG"],
  "Fintech": ["SQ", "PYPL", "COIN", "SOFI"],
  "Electric Vehicles": ["TSLA", "RIVN", "LCID", "NIO"],
  "Semiconductors": ["NVDA", "AMD", "INTC", "TSM"]
};
```

---

## 🏗️ Implementation Architecture

### **Recommended Tech Stack**
```
Frontend: React/Next.js + TailwindCSS + Framer Motion
State Management: Zustand or React Context
Data Fetching: TanStack Query (React Query)
Charts: Recharts or Chart.js
Backend: Next.js API Routes (serverless)
Database: localStorage (for watchlist) or Supabase (free tier)
Deployment: Vercel (free)
```

### **Data Flow Architecture**
```
┌─────────────────┐
│   User Action   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────┐
│  React Frontend │────▶│  Cache Layer     │
│                 │     │  (localStorage)  │
└────────┬────────┘     └──────────────────┘
         │
         ▼
┌─────────────────┐
│  API Aggregator │ (Next.js API routes)
│  (Backend)      │
└────────┬────────┘
         │
         ├──▶ Alpha Vantage (stock prices)
         ├──▶ Finnhub (news, sentiment)
         ├──▶ Yahoo Finance (backup data)
         ├──▶ Groq API (chatbot)
         └──▶ Clearbit (logos)
```

---

## 🚀 Step-by-Step Setup

### **Step 1: Get API Keys (Free)**
1. **Alpha Vantage**: https://www.alphavantage.co/support/#api-key
2. **Twelve Data**: https://twelvedata.com/apikey
3. **Finnhub**: https://finnhub.io/register
4. **Groq**: https://console.groq.com/keys
5. **Google Gemini**: https://ai.google.dev/

### **Step 2: Project Setup**
```bash
# Create Next.js project
npx create-next-app@latest investoriq --typescript --tailwind --app

cd investoriq

# Install dependencies
npm install @tanstack/react-query zustand framer-motion
npm install recharts lucide-react
npm install groq-sdk @google/generative-ai
npm install yahoo-finance2
```

### **Step 3: Environment Variables**
Create `.env.local`:
```bash
ALPHA_VANTAGE_API_KEY=your_key_here
TWELVE_DATA_API_KEY=your_key_here
FINNHUB_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

### **Step 4: Create API Aggregator**
Create `app/api/stocks/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  
  // Fetch from multiple sources with fallbacks
  try {
    const alphaData = await fetchFromAlphaVantage(symbol);
    return NextResponse.json(alphaData);
  } catch {
    const yahooData = await fetchFromYahoo(symbol);
    return NextResponse.json(yahooData);
  }
}
```

### **Step 5: Implement Caching Strategy**
```typescript
// utils/cache.ts
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export function getCachedData(key: string) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(key);
    return null;
  }
  
  return data;
}

export function setCachedData(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
}
```

### **Step 6: Build Chatbot with Context**
```typescript
// app/api/chat/route.ts
import Groq from 'groq-sdk';

export async function POST(request: Request) {
  const { message, category } = await request.json();
  
  // Fetch relevant stock data based on category
  const stockData = await fetchStocksByCategory(category);
  
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are an investment advisor. Here's current data for ${category} stocks: ${JSON.stringify(stockData)}`
      },
      { role: 'user', content: message }
    ],
    model: 'llama-3.3-70b-versatile'
  });
  
  return Response.json({
    response: completion.choices[0].message.content,
    recommendations: stockData.slice(0, 5)
  });
}
```

---

## 📊 Sample Data Structure

### **Company Object**
```typescript
interface Company {
  symbol: string;          // "NVDA"
  name: string;           // "NVIDIA Corporation"
  price: number;          // 145.20
  change: number;         // 2.45
  changePercent: number;  // 1.71
  volume: number;         // 45230000
  marketCap: number;      // 3580000000000
  sector: string;         // "Information Technology"
  category: string[];     // ["AI & Robotics", "Semiconductors"]
  logo: string;           // URL to logo
  description: string;    // Company description
  trending: boolean;      // Is it trending?
  trendingScore: number;  // 0-100
}
```

### **Sector Performance Object**
```typescript
interface SectorPerformance {
  name: string;              // "Information Technology"
  change: number;            // 2.34
  changePercent: number;     // 1.2
  companies: number;         // 500
  topCompanies: string[];    // ["AAPL", "MSFT", "NVDA"]
  trend: 'up' | 'down';      // Current trend
}
```

---

## 🎯 Recommended Implementation Priority

1. **Week 1**: Setup + Landing Page + Basic Stock Data
   - Get API keys
   - Implement Alpha Vantage integration
   - Build landing page with mock data
   - Add caching layer

2. **Week 2**: Chatbot + Real Data
   - Integrate Groq/Gemini API
   - Build chatbot UI
   - Connect to real stock APIs
   - Implement trending detection

3. **Week 3**: Sectors Explorer + Watchlist
   - Build GICS explorer
   - Implement watchlist functionality
   - Add localStorage persistence
   - Build comparison feature

4. **Week 4**: Dashboard + Polish
   - Create insights dashboard
   - Add charts (Recharts)
   - Implement dark mode
   - Add micro-interactions

---

## 💡 Pro Tips

1. **API Rate Limits**: Always cache responses and implement retry logic
2. **Fallback Strategy**: Use multiple APIs (if Alpha Vantage fails, use Yahoo Finance)
3. **Mock Data First**: Build UI with mock data, then connect real APIs
4. **Error Handling**: Always have fallback UI for when APIs fail
5. **Progressive Loading**: Load critical data first (prices), then enhance with news/sentiment
6. **Deploy on Vercel**: Free hosting + serverless functions for API calls

---

## 📝 Final Checklist

- [ ] Get all API keys (Alpha Vantage, Finnhub, Groq, etc.)
- [ ] Setup Next.js project with TypeScript
- [ ] Create API aggregator for stock data
- [ ] Implement caching strategy (15-minute cache)
- [ ] Build trending detection algorithm (news + volume)
- [ ] Integrate LLM (Groq recommended for speed)
- [ ] Add company logos (Clearbit API)
- [ ] Implement watchlist with localStorage
- [ ] Create sector performance tracker
- [ ] Build interactive charts
- [ ] Add dark mode toggle
- [ ] Deploy to Vercel

---

## 🆘 Need Help?

**Communities:**
- Reddit: r/reactjs, r/nextjs, r/algotrading
- Discord: Reactiflux, Next.js Discord
- Stack Overflow: Tag questions with [next.js] [react] [finance-api]

**Good luck building InvestorIQ! 🚀📈**
