# InvestorIQ 📈

A modern investor intelligence platform powered by AI to help investors explore stocks, understand trends, and make smarter investment decisions.

## 🌟 Features

### 🤖 AI-Powered Chatbot
- Interactive AI advisor powered by Ollama (gpt-oss:120b-cloud)
- Category-aware recommendations with live stock data
- Natural language queries for stock analysis
- Real-time market context integration

### 📊 Sectors Explorer
- Browse companies by 6 major investment categories:
  - AI & Robotics
  - Fintech
  - Electric Vehicles
  - Green Energy
  - Healthcare Tech
  - Semiconductors
- Expandable accordion view with live stock quotes
- One-click add to watchlist

### 📈 Trends & Insights
- Interactive market performance charts (1D, 1W, 1M, 3M, 1Y)
- Sector performance heatmap
- Top gainers and losers
- Market statistics and volume tracking

### 🎯 Watchlist Management
- Track favorite stocks in personalized watchlist
- Compare up to 3 stocks side-by-side
- Export watchlist to CSV
- Real-time price refresh
- Visual performance indicators

### 🎨 Modern UI/UX
- Dark mode support with toggle
- Responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Gradient hero sections
- Clean, professional interface

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand + React Query
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Stock Data**: Yahoo Finance (yahoo-finance2)
- **AI**: Ollama (local LLM)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Ollama installed locally ([Download](https://ollama.ai))

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Ollama

1. **Install Ollama** (if not already installed):
   - Visit https://ollama.ai
   
2. **Pull the GPT-OSS model**:
   ```bash
   ollama pull gpt-oss:120b-cloud
   ```

3. **Start Ollama server** (in a separate terminal):
   ```bash
   ollama serve
   ```

### Step 3: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage Guide

### Landing Page
- View top performing sectors
- Quick stats overview
- Navigate to different features

### AI Chatbot (`/chatbot`)
1. Click "AI Chatbot" in navigation
2. Try example queries or type your own:
   - "What companies are leading in AI & Robotics?"
   - "Show me undervalued Fintech stocks"
   - "Which Green Energy stocks are trending?"
3. AI will respond with recommendations in the right panel
4. Click "+ Add to Watchlist" on any stock

### Sectors Explorer (`/sectors`)
1. Click "Sectors" in navigation
2. Click any sector to expand and see all companies
3. View live prices and performance
4. Add stocks to watchlist

### Trends Dashboard (`/trends`)
1. Click "Trends" in navigation
2. Select timeframe (1D, 1W, 1M, 3M, 1Y)
3. View market performance chart
4. Explore sector heatmap
5. Check top gainers and losers

### Watchlist (`/watchlist`)
1. Click "My Watchlist" in navigation
2. Select stocks to compare (2-3 stocks)
3. Click "Compare Selected"
4. Export to CSV for external analysis
5. Refresh prices for latest data
6. Remove stocks with trash icon

## 🏗 Project Structure

```
investoriq/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/          # AI chatbot endpoint
│   │   │   └── stocks/        # Stock data endpoints
│   │   ├── chatbot/           # Chatbot page
│   │   ├── sectors/           # Sectors explorer page
│   │   ├── trends/            # Trends dashboard page
│   │   ├── watchlist/         # Watchlist page
│   │   ├── globals.css        # Global styles + CSS variables
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── providers.tsx      # React Query provider
│   ├── components/
│   │   ├── Hero.tsx           # Hero section
│   │   ├── Navbar.tsx         # Navigation bar
│   │   └── SectorCard.tsx     # Sector card component
│   └── lib/
│       ├── data/
│       │   └── companies.ts   # Company database (40+ stocks)
│       └── services/
│           ├── ollama.service.ts       # AI service
│           └── yahoo-finance.service.ts # Stock data service
├── .env.local                 # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Color Scheme

### Light Mode
- Background: `#F7F8FA` (Off-white)
- Primary: `#29A19C` (Teal)
- Secondary: `#0B132B` (Navy)

### Dark Mode
- Background: `#0A1628` (Dark Navy)
- Cards: `#1A2642` (Medium Navy)
- Primary: `#29A19C` (Teal) - unchanged
- Text: `#F7F8FA` (Off-white)

## 📊 Data Sources

### Yahoo Finance (Free, No API Key)
- Real-time stock quotes
- Historical price data
- Company profiles
- Search functionality
- 5-minute caching to prevent rate limiting

### Ollama Local LLM
- Runs locally (no API costs)
- Privacy-focused (data never leaves your machine)
- Model: gpt-oss:120b-cloud
- Provides investment advice and analysis

## 🐛 Troubleshooting

### Ollama Not Running
**Error**: "Failed to connect to Ollama"

**Solution**:
```bash
# Start Ollama server
ollama serve
```

### Model Not Found
**Error**: "Model gpt-oss:120b-cloud not found"

**Solution**:
```bash
# Pull the model
ollama pull gpt-oss:120b-cloud

# Verify it's installed
ollama list
```

### Yahoo Finance Rate Limiting
**Error**: "Too many requests"

**Solution**:
- Caching is already implemented (5 min)
- Avoid rapid-fire requests
- Use batch quote endpoint when possible

## 📝 API Endpoints

### GET `/api/stocks/quote`
Get single or batch stock quotes

**Query Parameters**:
- `symbol` - Single stock symbol (e.g., `AAPL`)
- `batch` - Comma-separated symbols (e.g., `AAPL,MSFT,GOOGL`)

### POST `/api/chat`
AI chatbot conversation

**Body**:
```json
{
  "messages": [
    { "role": "user", "content": "What are the best AI stocks?" }
  ]
}
```

## 🎯 Future Enhancements

- [ ] Stock comparison charts
- [ ] Portfolio tracking with virtual trading
- [ ] Email alerts for price targets
- [ ] News integration
- [ ] Social sentiment analysis
- [ ] Technical indicators (RSI, MACD, etc.)
- [ ] Advanced filtering and sorting

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

Built with ❤️ for the SGTA Hackathon 2025
