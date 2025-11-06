# 🚀 InvestorIQ - Complete Development Guide

> **A modern, AI-powered investment intelligence platform for exploring stocks, trends, and insights — built with 100% FREE resources!**

---

## 📁 What's Included

This complete guide package includes everything you need to build InvestorIQ from scratch:

### 📄 Documentation Files

1. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** ⭐ **START HERE**
   - Complete overview of all resources
   - Quick answers to your questions
   - 3-hour quick start plan
   - Visual project roadmap

2. **[QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md)** 🚀
   - Step-by-step setup (30 minutes)
   - API key registration guides
   - Project structure templates
   - First-day action plan
   - Week 1 development roadmap

3. **[DATA_SOURCES_GUIDE.md](./DATA_SOURCES_GUIDE.md)** 📊
   - Complete list of FREE APIs (Alpha Vantage, Twelve Data, Finnhub, Groq)
   - Trending detection strategies
   - LLM integration (Groq, Gemini, Hugging Face)
   - Rate limits and best practices
   - API comparison tables

4. **[IMPLEMENTATION_EXAMPLES.md](./IMPLEMENTATION_EXAMPLES.md)** 💻
   - Production-ready code samples
   - Stock API service with caching
   - Multi-factor trending algorithm
   - AI chatbot implementation
   - React components with real-time data
   - Custom hooks (useStockQuote, useTrending)

5. **[COMPANY_DATABASE.md](./COMPANY_DATABASE.md)** 🏢
   - 100+ companies by category
   - Complete GICS sector classification
   - Theme-based stock lists (Innovation, Undervalued, Emerging)
   - Symbol lookup reference
   - Logo sources (Clearbit, Finnhub)

### 🧪 Test Script

**[test-apis.js](./test-apis.js)**
- Automated API testing suite
- Verifies all API connections
- Tests 8 different endpoints
- Shows you exactly what's working
- Run before you start building!

---

## 🎯 Quick Start (30 Minutes)

### Step 1: Get API Keys (10 mins)
Get your **FREE** API keys from:

1. **Alpha Vantage** (stock data): https://www.alphavantage.co/support/#api-key
   - 25 calls/day free

2. **Twelve Data** (recommended): https://twelvedata.com/apikey
   - 800 calls/day free

3. **Finnhub** (news & trends): https://finnhub.io/register
   - 60 calls/min free

4. **Groq** (AI chatbot): https://console.groq.com/keys
   - 14,400 calls/day free (amazing!)

### Step 2: Test Your APIs (5 mins)

```bash
# 1. Install dependencies
npm install groq-sdk node-fetch

# 2. Edit test-apis.js and add your API keys

# 3. Run the test
node test-apis.js
```

You should see:
```
✅ Alpha Vantage: WORKING!
✅ Twelve Data: WORKING!
✅ Finnhub: WORKING!
✅ Groq AI: WORKING!
🎉 All tests passed! You're ready to build!
```

### Step 3: Setup Project (15 mins)

```bash
# Create Next.js project
npx create-next-app@latest investoriq --typescript --tailwind --app
cd investoriq

# Install dependencies
npm install @tanstack/react-query zustand framer-motion
npm install recharts lucide-react groq-sdk

# Create .env.local
echo "ALPHA_VANTAGE_API_KEY=your_key" > .env.local
echo "TWELVE_DATA_API_KEY=your_key" >> .env.local
echo "FINNHUB_API_KEY=your_key" >> .env.local
echo "GROQ_API_KEY=your_key" >> .env.local

# Start dev server
npm run dev
```

---

## 💡 What You Asked, Answered

### ❓ "What data do I need?"
**Answer:** 4 types of data:
1. **Stock prices** - Alpha Vantage / Twelve Data
2. **Company info** - Finnhub company profiles
3. **Trending signals** - Finnhub news + social sentiment
4. **Sector performance** - Alpha Vantage sectors

→ See [DATA_SOURCES_GUIDE.md](./DATA_SOURCES_GUIDE.md) for details

### ❓ "How do I get stock data?"
**Answer:** 3 free options:
```javascript
// Option 1: Alpha Vantage (25 calls/day)
fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=YOUR_KEY`)

// Option 2: Twelve Data (800 calls/day - recommended!)
fetch(`https://api.twelvedata.com/quote?symbol=AAPL&apikey=YOUR_KEY`)

// Option 3: Yahoo Finance (unlimited, no key!)
import yahooFinance from 'yahoo-finance2';
const quote = await yahooFinance.quote('AAPL');
```

→ See [IMPLEMENTATION_EXAMPLES.md](./IMPLEMENTATION_EXAMPLES.md) for code

### ❓ "How do I detect trending companies?"
**Answer:** Multi-factor algorithm:
1. **News volume** (30%) - Count articles in last 7 days
2. **Social mentions** (30%) - Reddit + Twitter buzz
3. **Price momentum** (40%) - Price change + volume spike

```javascript
const trendingScore = 
  (newsVolume * 0.3) + 
  (socialMentions * 0.3) + 
  (priceMomentum * 0.4);

if (score > 60) → Mark as "Trending"
```

→ See [IMPLEMENTATION_EXAMPLES.md](./IMPLEMENTATION_EXAMPLES.md#trending-detection)

### ❓ "How do I use the LLM?"
**Answer:** Use Groq (fastest & most generous free tier):
```javascript
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const completion = await groq.chat.completions.create({
  messages: [
    { role: 'system', content: 'You are an investment advisor with access to stock data: ...' },
    { role: 'user', content: 'What are the best AI stocks?' }
  ],
  model: 'llama-3.3-70b-versatile'
});
```

→ See [DATA_SOURCES_GUIDE.md](./DATA_SOURCES_GUIDE.md#llm-integration)

---

## 📚 Learning Path

### Day 1: Foundation
- [ ] Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
- [ ] Get API keys
- [ ] Run test script
- [ ] Setup Next.js project

### Day 2: Landing Page
- [ ] Build hero section
- [ ] Create sector cards (mock data)
- [ ] Add navbar with search

### Day 3: Real Data
- [ ] Connect stock APIs
- [ ] Implement caching
- [ ] Display live prices

### Day 4: AI Chatbot
- [ ] Setup Groq API
- [ ] Build chat interface
- [ ] Add recommendations panel

### Day 5: Trending & Intelligence
- [ ] Implement trending algorithm
- [ ] Connect Finnhub news
- [ ] Build insights dashboard

### Day 6-7: Polish
- [ ] Sectors explorer
- [ ] Watchlist functionality
- [ ] Dark mode + animations
- [ ] Deploy to Vercel

---

## 🎨 Features Included

### 🏠 Landing Page
- Hero section with animated background
- Top performing sectors (6 cards)
- Search bar + profile icon
- Light/dark mode toggle

### 🤖 AI Chatbot
- Split-screen interface
- Bubble chat messages
- Context-aware responses
- Dynamic stock recommendations
- Category detection

### 📊 Sectors Explorer
- GICS classification hierarchy
- Collapsible categories
- Subcategory breakdown
- Company counts + trend graphs

### 🛒 Watchlist
- Add/remove stocks
- Compare up to 3 stocks
- Export to CSV
- Mini price trend graphs

### 📈 Insights Dashboard
- Sector performance heatmap
- Top gainers/losers
- Trending themes
- Emerging companies carousel

---

## 💰 Cost: $0/month

| Service | Free Tier | Usage |
|---------|-----------|-------|
| Alpha Vantage | 25 calls/day | Stock data |
| Twelve Data | 800 calls/day | Real-time quotes |
| Finnhub | 60 calls/min | News & sentiment |
| Groq | 14,400 calls/day | AI chatbot |
| Clearbit | Unlimited | Company logos |
| Vercel | Free tier | Hosting |

**Total: $0** ✅

---

## 🏗️ Tech Stack

- **Frontend:** React + Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State:** Zustand / React Context
- **Data Fetching:** TanStack Query (React Query)
- **Charts:** Recharts
- **AI:** Groq (Llama 3.3 70B)
- **Deployment:** Vercel

---

## 📁 Project Structure

```
investoriq/
├── app/
│   ├── api/
│   │   ├── stocks/route.ts       # Stock quotes
│   │   ├── chat/route.ts         # AI chatbot
│   │   ├── trending/route.ts     # Trending stocks
│   │   └── sectors/route.ts      # Sector data
│   ├── page.tsx                  # Landing page
│   ├── chatbot/page.tsx          # Chatbot page
│   └── layout.tsx
│
├── components/
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── SectorCard.tsx
│   ├── Chatbot.tsx
│   ├── StockCard.tsx
│   └── Watchlist.tsx
│
├── lib/
│   ├── api/
│   │   └── stock-service.ts     # API wrapper
│   ├── trending/
│   │   └── detector.ts          # Trending algorithm
│   └── data/
│       └── companies.ts         # Company database
│
├── hooks/
│   ├── useStockQuote.ts
│   ├── useTrending.ts
│   └── useWatchlist.ts
│
├── .env.local                   # API keys (DON'T COMMIT!)
└── package.json
```

---

## 🎨 Design System

### Colors
```css
--navy: #0B132B;        /* Primary */
--emerald: #29A19C;     /* Accent */
--off-white: #F7F8FA;   /* Background */
--green: #10B981;       /* Positive */
--red: #EF4444;         /* Negative */
```

### Typography
- **Font:** Inter or Poppins
- **Headings:** Bold, 2xl-4xl
- **Body:** Regular, sm-base

### Components
- **Cards:** 16px border radius, soft shadows
- **Buttons:** Rounded-lg, hover transitions
- **Inputs:** Rounded-xl, focus ring

---

## 🔧 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Run production build

# Testing
node test-apis.js        # Test all APIs

# Deployment
vercel                   # Deploy to Vercel
```

---

## 🆘 Troubleshooting

### Problem: API returns errors
```bash
# Check your .env.local file
cat .env.local

# Verify keys are correct (no quotes needed)
ALPHA_VANTAGE_API_KEY=ABC123
```

### Problem: Rate limit exceeded
```javascript
// Implement caching (15 min intervals)
const CACHE_TIME = 15 * 60 * 1000;

// Don't fetch every second - use intervals
refetchInterval: 60000 // 1 minute
```

### Problem: Chatbot doesn't work
```javascript
// Make sure to pass stock data in system prompt
const systemPrompt = `You are an advisor. Stock data: ${JSON.stringify(stocks)}`;
```

---

## 📖 Documentation Index

| Document | Purpose | When to Read |
|----------|---------|--------------|
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Overview & quick reference | **Start here** |
| [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md) | Setup instructions | Before building |
| [DATA_SOURCES_GUIDE.md](./DATA_SOURCES_GUIDE.md) | API documentation | When connecting data |
| [IMPLEMENTATION_EXAMPLES.md](./IMPLEMENTATION_EXAMPLES.md) | Code examples | While coding |
| [COMPANY_DATABASE.md](./COMPANY_DATABASE.md) | Stock lists | When adding companies |

---

## 🎯 Success Checklist

Before you start:
- [ ] Read PROJECT_SUMMARY.md
- [ ] Get all 4 API keys
- [ ] Run test-apis.js successfully
- [ ] Setup Next.js project
- [ ] Create .env.local with keys

Day 1 goals:
- [ ] Landing page with hero section
- [ ] 6 sector cards displayed
- [ ] Navbar with theme toggle

Week 1 goals:
- [ ] Real-time stock prices working
- [ ] AI chatbot functional
- [ ] Trending detection implemented
- [ ] Basic watchlist working

---

## 🌟 Tips for Success

1. **Start Simple** - Build with mock data first, then add real APIs
2. **Cache Everything** - Save your precious API calls
3. **Test Often** - Use the test script to verify APIs
4. **Progressive Enhancement** - Basic → Data → AI → Polish
5. **Ask for Help** - Stack Overflow, Reddit, Discord

---

## 🚀 Ready to Build?

You have everything you need:
- ✅ Free APIs for stock data, news, and AI
- ✅ Complete company database (100+ stocks)
- ✅ Trending detection algorithm
- ✅ Production-ready code examples
- ✅ Step-by-step guides

**Now go build something amazing!** 💪🔥

---

## 📞 Resources

- **Stack Overflow:** Tag [next.js] [react] [finance-api]
- **Reddit:** r/reactjs, r/nextjs
- **Discord:** [Reactiflux](https://www.reactiflux.com/)
- **Next.js Docs:** https://nextjs.org/docs
- **React Query Docs:** https://tanstack.com/query/latest

---

## ⭐ Next Steps

1. Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) (5 min overview)
2. Follow [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md) (30 min setup)
3. Run `test-apis.js` to verify your APIs
4. Start building with [IMPLEMENTATION_EXAMPLES.md](./IMPLEMENTATION_EXAMPLES.md)

**Good luck with your hackathon! You've got this! 🎉**
