# Team-M-AI-L - Hack-the-Clock 2025 Submission# Team-M-AI-L - Hack-the-Clock 2025 Submission



# InvestorIQ



A modern investor intelligence platform powered by AI to help investors explore stocks, understand trends, and make smarter investment decisions.A modern investor intelligence platform powered by AI to help investors explore stocks, understand trends, and make smarter investment decisions.



**Team**: Team M-AI-L  ## ðŸŒŸ Features

**Event**: Hack-the-Clock 2025  

**Repository**: https://github.com/Hack-the-Clock/Team-M-AI-L### ðŸ¤– AI-Powered Chatbot

- Interactive AI advisor powered by Ollama (gpt-oss:120b-cloud)

## 🌟 Features- Category-aware recommendations with live stock data

- Natural language queries for stock analysis

### 🤖 AI-Powered Chatbot- Real-time market context integration

- Interactive AI advisor powered by Ollama (gpt-oss:120b-cloud)

- Category-aware recommendations with live stock data### ðŸ“Š Sectors Explorer

- Natural language queries for stock analysis- Browse companies by 6 major investment categories:

- Real-time market context integration  - AI & Robotics

- Persistent chat history across sessions  - Fintech

- Markdown-formatted responses with tables and formatting  - Electric Vehicles

  - Green Energy

### 📊 Sectors Explorer  - Healthcare Tech

- Browse companies by 6 major investment categories:  - Semiconductors

  - AI & Robotics- Expandable accordion view with live stock quotes

  - Fintech- One-click add to watchlist

  - Electric Vehicles

  - Green Energy### ðŸ“ˆ Trends & Insights

  - Healthcare Tech- Interactive market performance charts (1D, 1W, 1M, 3M, 1Y)

  - Semiconductors- Sector performance heatmap

- Expandable accordion view with live stock quotes- Top gainers and losers

- One-click add to watchlist- Market statistics and volume tracking

- Real-time price updates from Yahoo Finance

### ðŸŽ¯ Watchlist Management

### 📈 Trends & Insights- Track favorite stocks in personalized watchlist

- Interactive market performance charts (1D, 1W, 1M, 3M, 1Y)- Compare up to 3 stocks side-by-side

- Dynamic sector performance heatmap- Export watchlist to CSV

- Click sectors to view sector-specific trends- Real-time price refresh

- Top gainers and losers per sector- Visual performance indicators

- Market statistics that update by sector

- Visual performance indicators### ðŸŽ¨ Modern UI/UX

- Dark mode support with toggle

### 🎯 Watchlist Management- Responsive design (mobile, tablet, desktop)

- Track favorite stocks in personalized watchlist- Smooth animations with Framer Motion

- Compare up to 3 stocks side-by-side- Gradient hero sections

- Export watchlist to CSV- Clean, professional interface

- Real-time price refresh

- Visual performance indicators## ðŸ›  Tech Stack

- Persistent storage with localStorage

- **Framework**: Next.js 16 (App Router)

### 🎨 Modern UI/UX- **Language**: TypeScript

- Dark mode support with toggle- **Styling**: Tailwind CSS v4

- Responsive design (mobile, tablet, desktop)- **State Management**: Zustand + React Query

- Smooth animations with Framer Motion- **Charts**: Recharts

- Gradient hero sections- **Animations**: Framer Motion

- Clean, professional interface- **Icons**: Lucide React

- Optimized image loading with Next.js Image- **Stock Data**: Yahoo Finance (yahoo-finance2)

- **AI**: Ollama (local LLM)

## 🛠 Tech Stack

## ðŸ“¦ Installation

- **Framework**: Next.js 16 (App Router)

- **Language**: TypeScript### Prerequisites

- **Styling**: Tailwind CSS v4

- **Data Fetching**: React Query (@tanstack/react-query)- Node.js 18+ and npm

- **State Management**: React Hooks + localStorage- Ollama installed locally ([Download](https://ollama.ai))

- **Charts**: Recharts

- **Animations**: Framer Motion### Step 1: Install Dependencies

- **Icons**: Lucide React

- **Stock Data**: Yahoo Finance (yahoo-finance2)```bash

- **AI**: Ollama (local LLM)npm install

- **HTTP Client**: Axios```



## 📦 Installation### Step 2: Setup Ollama



### Prerequisites1. **Install Ollama** (if not already installed):

   - Visit https://ollama.ai

- Node.js 18+ and npm   

- Ollama installed locally ([Download](https://ollama.ai))2. **Pull the GPT-OSS model**:

   ```bash

### Step 1: Clone the Repository   ollama pull gpt-oss:120b-cloud

   ```

```bash

git clone https://github.com/Hack-the-Clock/Team-M-AI-L.git3. **Start Ollama server** (in a separate terminal):

cd Team-M-AI-L   ```bash

```   ollama serve

   ```

### Step 2: Install Dependencies

### Step 3: Run Development Server

```bash

npm install```bash

```npm run dev

```

### Step 3: Setup Environment Variables

Visit [http://localhost:3000](http://localhost:3000) to see the application.

Create a `.env.local` file in the root directory:

## ðŸ“– Usage Guide

```env

OLLAMA_API_URL=http://localhost:11434### Landing Page

OLLAMA_MODEL=gpt-oss:120b-cloud- View top performing sectors

```- Quick stats overview

- Navigate to different features

### Step 4: Setup Ollama

### AI Chatbot (`/chatbot`)

1. **Install Ollama** (if not already installed):1. Click "AI Chatbot" in navigation

   - Visit https://ollama.ai and download for your platform2. Try example queries or type your own:

      - "What companies are leading in AI & Robotics?"

2. **Pull the GPT-OSS model**:   - "Show me undervalued Fintech stocks"

   ```bash   - "Which Green Energy stocks are trending?"

   ollama pull gpt-oss:120b-cloud3. AI will respond with recommendations in the right panel

   ```4. Click "+ Add to Watchlist" on any stock



3. **Start Ollama server** (in a separate terminal):### Sectors Explorer (`/sectors`)

   ```bash1. Click "Sectors" in navigation

   ollama serve2. Click any sector to expand and see all companies

   ```3. View live prices and performance

4. Add stocks to watchlist

   Keep this terminal running while using the app.

### Trends Dashboard (`/trends`)

### Step 5: Run Development Server1. Click "Trends" in navigation

2. Select timeframe (1D, 1W, 1M, 3M, 1Y)

```bash3. View market performance chart

npm run dev4. Explore sector heatmap

```5. Check top gainers and losers



Visit [http://localhost:3000](http://localhost:3000) to see the application.### Watchlist (`/watchlist`)

1. Click "My Watchlist" in navigation

## 📖 Usage Guide2. Select stocks to compare (2-3 stocks)

3. Click "Compare Selected"

### Landing Page4. Export to CSV for external analysis

- View featured sectors with quick stats5. Refresh prices for latest data

- See platform capabilities overview6. Remove stocks with trash icon

- Navigate to different features via navbar or cards

## ðŸ— Project Structure

### AI Chatbot (`/chatbot`)

1. Click "AI Chatbot" in navigation```

2. Try example queries or type your own:investoriq/

   - "What companies are leading in AI & Robotics?"â”œâ”€â”€ src/

   - "Show me undervalued Fintech stocks"â”‚   â”œâ”€â”€ app/

   - "Which Green Energy stocks are trending?"â”‚   â”‚   â”œâ”€â”€ api/

3. AI responds with insights in markdown format (tables, bold text, bullets)â”‚   â”‚   â”‚   â”œâ”€â”€ chat/          # AI chatbot endpoint

4. View recommended stocks in the right panelâ”‚   â”‚   â”‚   â””â”€â”€ stocks/        # Stock data endpoints

5. Click "+ Add to Watchlist" on any stockâ”‚   â”‚   â”œâ”€â”€ chatbot/           # Chatbot page

6. Chat history persists across page navigationâ”‚   â”‚   â”œâ”€â”€ sectors/           # Sectors explorer page

7. Use "Clear Chat" button to reset conversationâ”‚   â”‚   â”œâ”€â”€ trends/            # Trends dashboard page

â”‚   â”‚   â”œâ”€â”€ watchlist/         # Watchlist page

### Sectors Explorer (`/sectors`)â”‚   â”‚   â”œâ”€â”€ globals.css        # Global styles + CSS variables

1. Click "Sectors" in navigationâ”‚   â”‚   â”œâ”€â”€ layout.tsx         # Root layout

2. Click any sector card to expand and see all companiesâ”‚   â”‚   â”œâ”€â”€ page.tsx           # Landing page

3. View live prices, daily changes, and market capâ”‚   â”‚   â””â”€â”€ providers.tsx      # React Query provider

4. Add stocks to watchlist with one clickâ”‚   â”œâ”€â”€ components/

5. Stocks display with company logos from Clearbitâ”‚   â”‚   â”œâ”€â”€ Hero.tsx           # Hero section

â”‚   â”‚   â”œâ”€â”€ Navbar.tsx         # Navigation bar

### Trends Dashboard (`/trends`)â”‚   â”‚   â””â”€â”€ SectorCard.tsx     # Sector card component

1. Click "Trends" in navigationâ”‚   â””â”€â”€ lib/

2. Select timeframe (1D, 1W, 1M, 3M, 1Y) for the chartâ”‚       â”œâ”€â”€ data/

3. View overall market performance chartâ”‚       â”‚   â””â”€â”€ companies.ts   # Company database (40+ stocks)

4. **Click any sector** in the heatmap to:â”‚       â””â”€â”€ services/

   - See sector-specific performance chartâ”‚           â”œâ”€â”€ ollama.service.ts       # AI service

   - View top gainers/losers for that sectorâ”‚           â””â”€â”€ yahoo-finance.service.ts # Stock data service

   - See sector-specific market statsâ”œâ”€â”€ .env.local                 # Environment variables

5. Click "Back to Overall Market" to return to market viewâ”œâ”€â”€ package.json

6. Explore dynamic sector insightsâ”œâ”€â”€ tsconfig.json

â””â”€â”€ README.md

### Watchlist (`/watchlist`)```

1. Click "My Watchlist" in navigation (badge shows count)

2. View all your tracked stocks with live data## ðŸŽ¨ Color Scheme

3. Select 2-3 stocks using checkboxes

4. Click "Compare Selected" to see comparison### Light Mode

5. Click "Export to CSV" to download your watchlist- Background: `#F7F8FA` (Off-white)

6. Click "Refresh Prices" for latest data- Primary: `#29A19C` (Teal)

7. Remove stocks with the trash icon- Secondary: `#0B132B` (Navy)

8. Watchlist persists in browser localStorage

### Dark Mode

## 🏗 Project Structure- Background: `#0A1628` (Dark Navy)

- Cards: `#1A2642` (Medium Navy)

```- Primary: `#29A19C` (Teal) - unchanged

investoriq/- Text: `#F7F8FA` (Off-white)

├── src/

│   ├── app/## ðŸ“Š Data Sources

│   │   ├── api/

│   │   │   ├── chat/### Yahoo Finance (Free, No API Key)

│   │   │   │   └── route.ts        # AI chatbot endpoint- Real-time stock quotes

│   │   │   └── stocks/- Historical price data

│   │   │       └── quote/- Company profiles

│   │   │           └── route.ts    # Stock data endpoint- Search functionality

│   │   ├── chatbot/- 5-minute caching to prevent rate limiting

│   │   │   └── page.tsx            # AI chatbot page

│   │   ├── sectors/### Ollama Local LLM

│   │   │   └── page.tsx            # Sectors explorer page- Runs locally (no API costs)

│   │   ├── trends/- Privacy-focused (data never leaves your machine)

│   │   │   └── page.tsx            # Trends dashboard page- Model: gpt-oss:120b-cloud

│   │   ├── watchlist/- Provides investment advice and analysis

│   │   │   └── page.tsx            # Watchlist page

│   │   ├── globals.css             # Global styles + CSS variables## ðŸ› Troubleshooting

│   │   ├── layout.tsx              # Root layout

│   │   ├── page.tsx                # Landing page### Ollama Not Running

│   │   └── providers.tsx           # React Query provider**Error**: "Failed to connect to Ollama"

│   ├── components/

│   │   ├── Hero.tsx                # Hero section component**Solution**:

│   │   ├── Navbar.tsx              # Navigation bar```bash

│   │   └── SectorCard.tsx          # Sector card component# Start Ollama server

│   └── lib/ollama serve

│       ├── data/```

│       │   └── companies.ts        # Company database (40+ stocks)

│       └── services/### Model Not Found

│           ├── ollama.service.ts   # Ollama AI service**Error**: "Model gpt-oss:120b-cloud not found"

│           └── yahoo-finance.service.ts  # Yahoo Finance service

├── public/                         # Static assets**Solution**:

├── .env.local                      # Environment variables (create this)```bash

├── next.config.ts                  # Next.js configuration# Pull the model

├── package.json                    # Dependenciesollama pull gpt-oss:120b-cloud

├── tailwind.config.ts              # Tailwind configuration

├── tsconfig.json                   # TypeScript configuration# Verify it's installed

└── README.md                       # This fileollama list

``````



## 🎨 Color Scheme### Yahoo Finance Rate Limiting

**Error**: "Too many requests"

### Light Mode

- Background: `#F7F8FA` (Off-white)**Solution**:

- Primary: `#29A19C` (Teal)- Caching is already implemented (5 min)

- Secondary: `#0B132B` (Navy)- Avoid rapid-fire requests

- Success: `#10B981` (Green)- Use batch quote endpoint when possible

- Danger: `#EF4444` (Red)

## ðŸ“ API Endpoints

### Dark Mode

- Background: `#0A1628` (Dark Navy)### GET `/api/stocks/quote`

- Cards: `#1A2642` (Medium Navy)Get single or batch stock quotes

- Border: `#2A3F5F` (Light Navy)

- Primary: `#29A19C` (Teal) - unchanged**Query Parameters**:

- Text: `#F7F8FA` (Off-white)- `symbol` - Single stock symbol (e.g., `AAPL`)

- `batch` - Comma-separated symbols (e.g., `AAPL,MSFT,GOOGL`)

Colors are defined as CSS custom properties in `globals.css` and automatically switch with dark mode.

### POST `/api/chat`

## 📊 Data SourcesAI chatbot conversation



### Yahoo Finance (Free, No API Key Required)**Body**:

- **Real-time stock quotes**: Price, change, volume, market cap```json

- **Company profiles**: Sector, industry, business description{

- **Batch quotes**: Fetch multiple stocks efficiently  "messages": [

- **Search**: Find stocks by symbol or name    { "role": "user", "content": "What are the best AI stocks?" }

- **Caching**: 5-minute cache to prevent rate limiting  ]

- **API**: yahoo-finance2 npm package}

```

### Ollama Local LLM

- **Model**: gpt-oss:120b-cloud (120B parameter model)## ðŸŽ¯ Future Enhancements

- **Runs locally**: No API costs, complete privacy

- **Investment insights**: AI-generated analysis and recommendations- [ ] Stock comparison charts

- **Context-aware**: Uses real-time stock data in prompts- [ ] Portfolio tracking with virtual trading

- **Fast**: Local inference with GPU acceleration (if available)- [ ] Email alerts for price targets

- [ ] News integration

### Company Data- [ ] Social sentiment analysis

- **Curated database**: 40+ companies across 6 sectors- [ ] Technical indicators (RSI, MACD, etc.)

- **Categories**: Multiple tags per company for cross-sector analysis- [ ] Advanced filtering and sorting

- **Descriptions**: Brief summaries of each company's focus

- **Logo URLs**: Clearbit logo service integration## ðŸ“„ License



## 🐛 TroubleshootingMIT License - Feel free to use this project for learning and development.



### Ollama Not Running---

**Error**: `ECONNREFUSED` or "Ollama server is not running"

Built with â¤ï¸ for the SGTA Hackathon 2025

**Solution**:
```bash
# Start Ollama server in a separate terminal
ollama serve
```

### Model Not Found
**Error**: "Model gpt-oss:120b-cloud not found"

**Solution**:
```bash
# Pull the model (large download ~70GB)
ollama pull gpt-oss:120b-cloud

# Verify it's installed
ollama list
```

### Yahoo Finance Rate Limiting
**Error**: "Too many requests" or empty quotes

**Solution**:
- Built-in 5-minute caching already implemented
- Avoid rapid-fire refresh clicks
- Use batch quote endpoint when possible
- Wait a few minutes before retrying

### Port Already in Use
**Error**: "Port 3000 is already in use"

**Solution**:
```bash
# Kill the process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### Dark Mode Not Working
**Solution**:
- Clear localStorage: `localStorage.clear()` in browser console
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## 📝 API Endpoints

### GET `/api/stocks/quote`
Get single or batch stock quotes

**Query Parameters**:
- `symbol` - Single stock symbol (e.g., `AAPL`)
- `batch` - Comma-separated symbols (e.g., `AAPL,MSFT,GOOGL`)

**Response**:
```json
{
  "quotes": [
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "price": 178.45,
      "change": 2.34,
      "changePercent": 1.33,
      "volume": 45678900,
      "marketCap": 2847000000000
    }
  ]
}
```

### POST `/api/chat`
AI chatbot conversation

**Request Body**:
```json
{
  "message": "What are the best AI stocks?",
  "category": "AI & Robotics"
}
```

**Response**:
```json
{
  "response": "Based on current market data...",
  "recommendations": [
    {
      "symbol": "NVDA",
      "name": "NVIDIA Corporation",
      "price": 495.23,
      "change": 12.45,
      "changePercent": 2.58,
      "logo": "https://logo.clearbit.com/nvidia.com",
      "tags": ["AI & Robotics", "Semiconductors"]
    }
  ],
  "category": "AI & Robotics"
}
```

## 🎯 Future Enhancements

- [ ] Stock comparison charts (side-by-side visualizations)
- [ ] Portfolio tracking with virtual trading
- [ ] Email alerts for price targets
- [ ] News integration (real-time financial news)
- [ ] Social sentiment analysis (Twitter, Reddit)
- [ ] Technical indicators (RSI, MACD, Bollinger Bands)
- [ ] Advanced filtering and sorting
- [ ] Wikipedia-powered company intelligence system
- [ ] Thematic classification for modern tech companies
- [ ] SEC filing analysis integration
- [ ] Multi-language support

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub (already done!)
2. Go to [vercel.com](https://vercel.com)
3. Import the repository
4. Add environment variables:
   - `OLLAMA_API_URL` (use cloud-hosted Ollama or replace with OpenAI)
   - `OLLAMA_MODEL`
5. Deploy!

**Note**: For production, consider replacing Ollama with a cloud-based LLM API (OpenAI, Anthropic, etc.) since Ollama requires a server.

### Docker

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type check
npm run type-check

# Build production
npm run build
```

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 👥 Team M-AI-L

Built with ❤️ for Hack-the-Clock 2025

**Features Highlight**:
- ✅ Real-time stock data integration
- ✅ AI-powered investment insights
- ✅ Modern, responsive UI
- ✅ Persistent state management
- ✅ Dynamic sector analysis
- ✅ Interactive visualizations

---

**Made with**: Next.js 16, TypeScript, Tailwind CSS v4, Yahoo Finance API, Ollama AI

**Repository**: https://github.com/Hack-the-Clock/Team-M-AI-L
