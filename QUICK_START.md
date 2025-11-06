# InvestorIQ - Quick Start Checklist ✅

## Pre-Launch Checklist

### 1. ✅ Installation Complete
- [x] Next.js 16 project created
- [x] All dependencies installed
- [x] TypeScript configured
- [x] Tailwind CSS v4 setup

### 2. ✅ Core Services Implemented
- [x] Yahoo Finance service (stock data)
- [x] Ollama service (AI chatbot)
- [x] Company database (40+ stocks in 6 categories)
- [x] Caching system (5-minute cache)

### 3. ✅ API Routes Created
- [x] `/api/stocks/quote` - Stock price quotes (single & batch)
- [x] `/api/stocks/search` - Stock search
- [x] `/api/chat` - AI chatbot with context

### 4. ✅ Pages Implemented
- [x] Landing page (`/`) - Hero, sectors, CTA
- [x] AI Chatbot page (`/chatbot`) - Split-screen interface
- [x] Sectors page (`/sectors`) - Expandable accordion
- [x] Trends page (`/trends`) - Charts and heatmap
- [x] Watchlist page (`/watchlist`) - Table with CRUD

### 5. ✅ Components Built
- [x] Navbar - Dark mode toggle, links, watchlist counter
- [x] Hero - Gradient background, CTA
- [x] SectorCard - Animated sector cards

### 6. ✅ Styling Complete
- [x] Custom color system (light/dark mode)
- [x] CSS variables configured
- [x] Responsive design
- [x] Animations with Framer Motion

## 🚀 Launch Steps

### Step 1: Start Ollama Server

Open a **new terminal** and run:

\`\`\`powershell
ollama serve
\`\`\`

**Expected Output**: Server should start on `http://localhost:11434`

### Step 2: Verify Model is Installed

In the same terminal (or another one):

\`\`\`powershell
ollama list
\`\`\`

You should see `gpt-oss:120b-cloud` in the list.

**If NOT installed**, run:

\`\`\`powershell
ollama pull gpt-oss:120b-cloud
\`\`\`

### Step 3: Start Next.js Dev Server

The dev server should already be running. If not:

\`\`\`powershell
cd "d:\\Projects\\SGTA HAckathon\\investoriq"
npm run dev
\`\`\`

**Expected Output**: 
- Server running on `http://localhost:3000`
- Warning about workspace root is **normal** and can be ignored

### Step 4: Open in Browser

Visit: **http://localhost:3000**

## 🧪 Testing Checklist

### Landing Page (`/`)
- [ ] Hero section displays with gradient background
- [ ] 6 sector cards visible with icons and percentages
- [ ] Dark mode toggle works in navbar
- [ ] All navigation links present
- [ ] CTA button links to `/chatbot`

### AI Chatbot (`/chatbot`)
- [ ] Split-screen layout (chat left, recommendations right)
- [ ] Example queries display on first load
- [ ] Can type message and send
- [ ] AI responds (requires Ollama running)
- [ ] Recommendations appear in right panel
- [ ] "+ Add to Watchlist" button works
- [ ] Watchlist counter in navbar updates

### Sectors Explorer (`/sectors`)
- [ ] 6 sectors listed in accordion format
- [ ] Click sector to expand
- [ ] Stock cards load with live prices
- [ ] Can add stocks to watchlist
- [ ] Stock logos display (if available)
- [ ] Trending up/down icons show correctly

### Trends Dashboard (`/trends`)
- [ ] Market performance chart displays
- [ ] Timeframe buttons work (1D, 1W, 1M, 3M, 1Y)
- [ ] Chart updates when timeframe changes
- [ ] Sector heatmap shows 8 colored tiles
- [ ] Top gainers list displays
- [ ] Top losers list displays
- [ ] Market stats show at bottom

### Watchlist (`/watchlist`)
- [ ] Empty state shows if no stocks added
- [ ] Stocks display in table format after adding
- [ ] Checkboxes work for selection
- [ ] "Compare Selected" button enables with 2-3 stocks
- [ ] "Export CSV" downloads file
- [ ] "Refresh Prices" updates data
- [ ] Can remove stocks with trash icon
- [ ] Stats show at bottom (total stocks, avg change, portfolio value)

### Dark Mode
- [ ] Toggle in navbar switches mode
- [ ] All pages respect dark/light preference
- [ ] Colors transition smoothly
- [ ] Preference persists after refresh

## 🐛 Known Issues & Notes

### CSS Linter Warnings (IGNORE)
The following warnings in `globals.css` are **false positives**:
- `Unknown at rule @theme`
- `Unknown at rule @apply`

These are valid Tailwind CSS v4 syntax. The linter hasn't been updated yet.

### Workspace Root Warning (IGNORE)
```
⚠ Warning: Next.js inferred your workspace root...
```

This warning is **harmless**. It appears because there are multiple package-lock.json files in the parent directory structure.

To silence it (optional):
1. Add to `next.config.ts`:
   ```typescript
   turbopack: {
     root: process.cwd()
   }
   ```

## 📊 Data Flow

### How AI Chatbot Works

1. **User sends message** → `/api/chat`
2. **Category detection** → Regex matches sector keywords
3. **Fetch companies** → From `companies.ts` database
4. **Get live prices** → Yahoo Finance API (batch request)
5. **Build context** → System prompt with stock data
6. **Call Ollama** → POST to `localhost:11434/api/chat`
7. **Return response** → AI answer + top 5 recommendations
8. **Display in UI** → Chat bubble + recommendation cards

### How Stock Data Works

1. **Request quote** → `/api/stocks/quote?symbol=AAPL`
2. **Check cache** → 5-minute in-memory cache
3. **If cache miss** → Yahoo Finance API call
4. **Transform data** → Extract price, change, volume, etc.
5. **Cache result** → Store for 5 minutes
6. **Return to client** → JSON response

## 🔒 Security Notes

- ✅ No API keys stored (Yahoo Finance is free tier)
- ✅ Ollama runs locally (data privacy)
- ✅ No sensitive data in localStorage
- ✅ All API routes use `force-dynamic` (no stale cache)

## 📈 Performance Optimizations

- ✅ 5-minute caching on stock quotes
- ✅ Batch quote requests (multiple stocks in 1 call)
- ✅ React Query for automatic request deduplication
- ✅ Framer Motion animations use GPU acceleration
- ✅ Next.js Image component for optimized images

## 🎯 Next Steps After Launch

1. **Test all features** using the checklist above
2. **Add more stocks** to `src/lib/data/companies.ts` if needed
3. **Customize colors** in `src/app/globals.css` if desired
4. **Add more sectors** by expanding the database
5. **Implement comparison feature** (currently shows alert)
6. **Add news integration** for sector insights
7. **Create stock detail pages** with full company info

## 💡 Tips for Demo/Presentation

### Best Example Queries for AI Chatbot:
1. "What companies are leading in AI & Robotics?"
2. "Show me undervalued Fintech stocks"
3. "Which Green Energy companies are growing fastest?"
4. "Compare Tesla and Rivian in the EV space"
5. "What are the top semiconductor stocks?"

### Impressive Features to Highlight:
- ✨ Real-time stock data from Yahoo Finance
- 🤖 Local AI running on your machine (privacy-focused)
- 🎨 Beautiful dark mode with smooth transitions
- 📊 Interactive charts and visualizations
- 💾 Persistent watchlist with CSV export
- ⚡ Fast performance with intelligent caching

## 📞 Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| Ollama error | Run `ollama serve` in terminal |
| Model not found | Run `ollama pull gpt-oss:120b-cloud` |
| Port 3000 in use | Kill process or use different port |
| Watchlist not saving | Check browser localStorage is enabled |
| Stock logos not loading | Clearbit API may be rate limited (optional feature) |

---

## ✅ Final Check

Before presenting/demoing:

- [ ] Ollama server running
- [ ] Next.js dev server running
- [ ] Opened http://localhost:3000 in browser
- [ ] Tested dark mode toggle
- [ ] Added at least 1 stock to watchlist
- [ ] Sent 1 message to AI chatbot
- [ ] Expanded 1 sector in sectors page

**You're ready to go! 🚀**
