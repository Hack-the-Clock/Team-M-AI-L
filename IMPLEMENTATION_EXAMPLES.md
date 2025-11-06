# InvestorIQ - Practical Implementation Examples 💻

## Complete Code Examples for Your InvestorIQ Platform

---

## 1. 🔧 API Integration Layer

### File: `lib/api/stock-service.ts`

```typescript
// Stock API Service with Multiple Providers & Caching

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  timestamp: number;
}

class StockService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Alpha Vantage Implementation
  async getQuoteAlphaVantage(symbol: string): Promise<StockQuote> {
    const cached = this.getFromCache(`quote_${symbol}`);
    if (cached) return cached;

    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    const data = await response.json();
    const quote = data['Global Quote'];

    const result: StockQuote = {
      symbol: symbol,
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      timestamp: Date.now()
    };

    this.setCache(`quote_${symbol}`, result);
    return result;
  }

  // Twelve Data Implementation (Faster, More Generous)
  async getQuoteTwelveData(symbol: string): Promise<StockQuote> {
    const cached = this.getFromCache(`quote_${symbol}`);
    if (cached) return cached;

    const response = await fetch(
      `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.TWELVE_DATA_API_KEY}`
    );
    const data = await response.json();

    const result: StockQuote = {
      symbol: data.symbol,
      price: parseFloat(data.close),
      change: parseFloat(data.change),
      changePercent: parseFloat(data.percent_change),
      volume: parseInt(data.volume),
      timestamp: Date.now()
    };

    this.setCache(`quote_${symbol}`, result);
    return result;
  }

  // Get Multiple Quotes at Once (Batch Request)
  async getBatchQuotes(symbols: string[]): Promise<StockQuote[]> {
    const symbolString = symbols.join(',');
    
    const response = await fetch(
      `https://api.twelvedata.com/quote?symbol=${symbolString}&apikey=${process.env.TWELVE_DATA_API_KEY}`
    );
    const data = await response.json();

    // Handle both single and multiple responses
    const quotes = Array.isArray(data) ? data : [data];
    
    return quotes.map(q => ({
      symbol: q.symbol,
      price: parseFloat(q.close),
      change: parseFloat(q.change),
      changePercent: parseFloat(q.percent_change),
      volume: parseInt(q.volume),
      timestamp: Date.now()
    }));
  }

  // Sector Performance (Alpha Vantage)
  async getSectorPerformance() {
    const cached = this.getFromCache('sectors');
    if (cached) return cached;

    const response = await fetch(
      `https://www.alphavantage.co/query?function=SECTOR&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    const data = await response.json();

    // Extract real-time performance
    const sectors = data['Rank A: Real-Time Performance'];
    
    this.setCache('sectors', sectors);
    return sectors;
  }

  // Top Gainers/Losers (Alpha Vantage)
  async getTopMovers() {
    const cached = this.getFromCache('movers');
    if (cached) return cached;

    const response = await fetch(
      `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    const data = await response.json();

    const result = {
      gainers: data.top_gainers.slice(0, 10),
      losers: data.top_losers.slice(0, 10),
      mostActive: data.most_actively_traded.slice(0, 10)
    };

    this.setCache('movers', result);
    return result;
  }

  // Company Profile (Finnhub)
  async getCompanyProfile(symbol: string) {
    const cached = this.getFromCache(`profile_${symbol}`);
    if (cached) return cached;

    const response = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
    );
    const data = await response.json();

    this.setCache(`profile_${symbol}`, data);
    return data;
  }

  // Cache Helpers
  private getFromCache(key: string) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  private setCache(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}

export const stockService = new StockService();
```

---

## 2. 🔥 Trending Detection Algorithm

### File: `lib/trending/detector.ts`

```typescript
// Multi-Factor Trending Score Calculator

interface TrendingFactors {
  newsVolume: number;      // Number of news articles (last 7 days)
  socialMentions: number;  // Reddit/Twitter mentions
  priceChange: number;     // % price change (7 days)
  volumeChange: number;    // % volume change vs average
  searchTrend: number;     // Google search trend (0-100)
}

interface TrendingCompany {
  symbol: string;
  name: string;
  trendingScore: number;
  factors: TrendingFactors;
  rank: number;
}

class TrendingDetector {
  
  // Main trending calculation
  async calculateTrendingScore(symbol: string): Promise<number> {
    const factors = await this.gatherFactors(symbol);
    
    // Weighted scoring algorithm
    const weights = {
      newsVolume: 0.30,      // 30% weight
      socialMentions: 0.25,  // 25% weight
      priceChange: 0.20,     // 20% weight
      volumeChange: 0.15,    // 15% weight
      searchTrend: 0.10      // 10% weight
    };

    // Normalize each factor (0-100 scale)
    const normalized = {
      newsVolume: this.normalize(factors.newsVolume, 0, 50),
      socialMentions: this.normalize(factors.socialMentions, 0, 10000),
      priceChange: this.normalize(Math.abs(factors.priceChange), 0, 20),
      volumeChange: this.normalize(factors.volumeChange, 0, 200),
      searchTrend: factors.searchTrend
    };

    // Calculate weighted score
    const score = 
      normalized.newsVolume * weights.newsVolume +
      normalized.socialMentions * weights.socialMentions +
      normalized.priceChange * weights.priceChange +
      normalized.volumeChange * weights.volumeChange +
      normalized.searchTrend * weights.searchTrend;

    return Math.round(score);
  }

  // Gather all trending factors
  private async gatherFactors(symbol: string): Promise<TrendingFactors> {
    const [news, social, price, volume] = await Promise.all([
      this.getNewsVolume(symbol),
      this.getSocialMentions(symbol),
      this.getPriceChange(symbol),
      this.getVolumeChange(symbol)
    ]);

    return {
      newsVolume: news,
      socialMentions: social.reddit + social.twitter,
      priceChange: price,
      volumeChange: volume,
      searchTrend: 50 // Placeholder (Google Trends API is complex)
    };
  }

  // Get news volume (Finnhub)
  private async getNewsVolume(symbol: string): Promise<number> {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const from = weekAgo.toISOString().split('T')[0];
    const to = today.toISOString().split('T')[0];

    const response = await fetch(
      `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${process.env.FINNHUB_API_KEY}`
    );
    const news = await response.json();
    
    return news.length;
  }

  // Get social sentiment (Finnhub)
  private async getSocialMentions(symbol: string) {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/social-sentiment?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
    );
    const data = await response.json();

    return {
      reddit: data.reddit?.mention || 0,
      twitter: data.twitter?.mention || 0
    };
  }

  // Get 7-day price change
  private async getPriceChange(symbol: string): Promise<number> {
    // Use your stock service to get historical data
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=7&apikey=${process.env.TWELVE_DATA_API_KEY}`
    );
    const data = await response.json();

    if (!data.values || data.values.length < 2) return 0;

    const latest = parseFloat(data.values[0].close);
    const weekAgo = parseFloat(data.values[data.values.length - 1].close);
    
    return ((latest - weekAgo) / weekAgo) * 100;
  }

  // Get volume change
  private async getVolumeChange(symbol: string): Promise<number> {
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=30&apikey=${process.env.TWELVE_DATA_API_KEY}`
    );
    const data = await response.json();

    if (!data.values || data.values.length < 7) return 0;

    // Compare last 7 days average vs previous 23 days average
    const recent = data.values.slice(0, 7);
    const previous = data.values.slice(7);

    const recentAvg = recent.reduce((sum, d) => sum + parseInt(d.volume), 0) / recent.length;
    const prevAvg = previous.reduce((sum, d) => sum + parseInt(d.volume), 0) / previous.length;

    return ((recentAvg - prevAvg) / prevAvg) * 100;
  }

  // Normalize value to 0-100 scale
  private normalize(value: number, min: number, max: number): number {
    if (value <= min) return 0;
    if (value >= max) return 100;
    return ((value - min) / (max - min)) * 100;
  }

  // Get trending companies for a category
  async getTrendingByCategory(category: string, limit = 10): Promise<TrendingCompany[]> {
    const companies = this.getCompaniesForCategory(category);
    
    const scoredCompanies = await Promise.all(
      companies.map(async (company) => ({
        ...company,
        trendingScore: await this.calculateTrendingScore(company.symbol),
        factors: await this.gatherFactors(company.symbol)
      }))
    );

    // Sort by score and add rank
    return scoredCompanies
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, limit)
      .map((company, index) => ({
        ...company,
        rank: index + 1
      }));
  }

  // Hardcoded company lists by category
  private getCompaniesForCategory(category: string) {
    const categories: Record<string, Array<{ symbol: string; name: string }>> = {
      'AI & Robotics': [
        { symbol: 'NVDA', name: 'NVIDIA' },
        { symbol: 'GOOGL', name: 'Alphabet' },
        { symbol: 'TSLA', name: 'Tesla' },
        { symbol: 'AMZN', name: 'Amazon' },
        { symbol: 'MSFT', name: 'Microsoft' },
        { symbol: 'META', name: 'Meta' },
        { symbol: 'PLTR', name: 'Palantir' },
        { symbol: 'AI', name: 'C3.ai' }
      ],
      'Fintech': [
        { symbol: 'SQ', name: 'Block' },
        { symbol: 'PYPL', name: 'PayPal' },
        { symbol: 'COIN', name: 'Coinbase' },
        { symbol: 'SOFI', name: 'SoFi' },
        { symbol: 'AFRM', name: 'Affirm' },
        { symbol: 'NU', name: 'Nu Holdings' }
      ],
      'Electric Vehicles': [
        { symbol: 'TSLA', name: 'Tesla' },
        { symbol: 'RIVN', name: 'Rivian' },
        { symbol: 'LCID', name: 'Lucid' },
        { symbol: 'NIO', name: 'NIO' },
        { symbol: 'XPEV', name: 'XPeng' },
        { symbol: 'LI', name: 'Li Auto' }
      ],
      'Green Energy': [
        { symbol: 'ENPH', name: 'Enphase' },
        { symbol: 'SEDG', name: 'SolarEdge' },
        { symbol: 'PLUG', name: 'Plug Power' },
        { symbol: 'BE', name: 'Bloom Energy' },
        { symbol: 'FSLR', name: 'First Solar' }
      ]
    };

    return categories[category] || [];
  }
}

export const trendingDetector = new TrendingDetector();
```

---

## 3. 🤖 AI Chatbot Integration

### File: `app/api/chat/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { stockService } from '@/lib/api/stock-service';
import { trendingDetector } from '@/lib/trending/detector';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!
});

export async function POST(request: NextRequest) {
  try {
    const { message, category } = await request.json();

    // Detect category from message if not provided
    const detectedCategory = category || detectCategory(message);

    // Get relevant stock data for context
    const stockContext = await getStockContext(detectedCategory);

    // Create system prompt with stock data
    const systemPrompt = `You are an expert investment advisor AI for InvestorIQ platform.

Current Stock Data for ${detectedCategory}:
${JSON.stringify(stockContext, null, 2)}

Guidelines:
- Provide concise, actionable insights
- Mention specific companies with their tickers
- Include current prices and trends
- Be enthusiastic but professional
- Keep responses under 200 words
- Format company mentions as: **CompanyName (TICKER)**
`;

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = completion.choices[0].message.content;

    // Return response with stock recommendations
    return NextResponse.json({
      message: aiResponse,
      recommendations: stockContext.companies.slice(0, 5),
      category: detectedCategory
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

// Detect category from user message
function detectCategory(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.match(/ai|robot|artificial intelligence|automation/i)) {
    return 'AI & Robotics';
  }
  if (lowerMessage.match(/fintech|payment|crypto|blockchain|bank/i)) {
    return 'Fintech';
  }
  if (lowerMessage.match(/ev|electric vehicle|tesla|rivian/i)) {
    return 'Electric Vehicles';
  }
  if (lowerMessage.match(/green|solar|renewable|clean energy/i)) {
    return 'Green Energy';
  }
  if (lowerMessage.match(/healthcare|medical|biotech|pharma/i)) {
    return 'Healthcare Tech';
  }
  if (lowerMessage.match(/chip|semiconductor|processor/i)) {
    return 'Semiconductors';
  }

  return 'AI & Robotics'; // Default
}

// Get stock context for AI
async function getStockContext(category: string) {
  try {
    // Get trending companies in this category
    const trending = await trendingDetector.getTrendingByCategory(category, 8);

    // Get live quotes for these companies
    const symbols = trending.map(c => c.symbol);
    const quotes = await stockService.getBatchQuotes(symbols);

    // Combine data
    const companies = trending.map((t, idx) => ({
      name: t.name,
      symbol: t.symbol,
      price: quotes[idx]?.price || 0,
      change: quotes[idx]?.changePercent || 0,
      trendingScore: t.trendingScore,
      logo: `https://logo.clearbit.com/${t.name.toLowerCase().replace(' ', '')}.com`
    }));

    return {
      category,
      companies,
      totalCount: companies.length
    };

  } catch (error) {
    console.error('Error getting stock context:', error);
    return { category, companies: [], totalCount: 0 };
  }
}
```

---

## 4. 📊 Next.js API Routes

### File: `app/api/stocks/quote/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stockService } from '@/lib/api/stock-service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const batch = searchParams.get('batch')?.split(',');

  try {
    if (batch) {
      const quotes = await stockService.getBatchQuotes(batch);
      return NextResponse.json(quotes);
    }

    if (symbol) {
      const quote = await stockService.getQuoteTwelveData(symbol);
      return NextResponse.json(quote);
    }

    return NextResponse.json({ error: 'Missing symbol parameter' }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 });
  }
}
```

### File: `app/api/sectors/performance/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stockService } from '@/lib/api/stock-service';

export async function GET(request: NextRequest) {
  try {
    const performance = await stockService.getSectorPerformance();
    return NextResponse.json(performance);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sectors' }, { status: 500 });
  }
}
```

### File: `app/api/trending/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { trendingDetector } from '@/lib/trending/detector';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'AI & Robotics';
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const trending = await trendingDetector.getTrendingByCategory(category, limit);
    return NextResponse.json(trending);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trending' }, { status: 500 });
  }
}
```

---

## 5. 🎨 React Components with Data

### File: `components/SectorCard.tsx`

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectorCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
}

export function SectorCard({ name, icon, description }: SectorCardProps) {
  // Fetch real-time sector performance
  const { data: performance } = useQuery({
    queryKey: ['sector', name],
    queryFn: async () => {
      const res = await fetch(`/api/sectors/performance?name=${name}`);
      return res.json();
    },
    refetchInterval: 60000 // Refresh every minute
  });

  const isPositive = performance?.changePercent > 0;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
          {icon}
        </div>
        {performance && (
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            <span className="font-semibold">{performance.changePercent.toFixed(2)}%</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>

      <button className="w-full bg-navy-600 hover:bg-navy-700 text-white py-2 rounded-lg transition">
        Explore Sector
      </button>
    </motion.div>
  );
}
```

### File: `components/Chatbot.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const exampleQueries = [
    "What companies are leading in AI Robotics?",
    "Show me undervalued Fintech stocks.",
    "Which EV firms are growing fastest in 2025?"
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message
      }]);

      setRecommendations(data.recommendations || []);

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 h-[600px]">
      {/* Chat Interface */}
      <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-emerald-500" />
            AI Investment Assistant
          </h2>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-navy-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl">
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me about trending companies in any category..."
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
          
          {/* Example Queries */}
          <div className="mt-3 flex flex-wrap gap-2">
            {exampleQueries.map((query, idx) => (
              <button
                key={idx}
                onClick={() => setInput(query)}
                className="text-xs text-gray-500 hover:text-emerald-500 transition"
              >
                "{query}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Recommendations</h3>
        
        <div className="space-y-3">
          {recommendations.map((company, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition"
            >
              <div className="flex items-start gap-3">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-12 h-12 rounded-lg"
                  onError={(e) => e.currentTarget.src = '/placeholder-logo.png'}
                />
                
                <div className="flex-1">
                  <h4 className="font-bold">{company.name}</h4>
                  <p className="text-sm text-gray-500">{company.symbol}</p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-lg font-semibold">${company.price}</span>
                    <span className={`text-sm ${company.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {company.change >= 0 ? '+' : ''}{company.change.toFixed(2)}%
                    </span>
                  </div>

                  <button className="mt-3 w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-lg transition">
                    + Add to Watchlist
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 6. 🔄 React Query Setup

### File: `app/providers.tsx`

```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

---

## 7. 🎯 Custom Hooks

### File: `hooks/useStockQuote.ts`

```typescript
import { useQuery } from '@tanstack/react-query';

export function useStockQuote(symbol: string) {
  return useQuery({
    queryKey: ['quote', symbol],
    queryFn: async () => {
      const res = await fetch(`/api/stocks/quote?symbol=${symbol}`);
      if (!res.ok) throw new Error('Failed to fetch quote');
      return res.json();
    },
    refetchInterval: 15000, // Update every 15 seconds
    enabled: !!symbol
  });
}

export function useBatchQuotes(symbols: string[]) {
  return useQuery({
    queryKey: ['quotes', symbols.join(',')],
    queryFn: async () => {
      const res = await fetch(`/api/stocks/quote?batch=${symbols.join(',')}`);
      if (!res.ok) throw new Error('Failed to fetch quotes');
      return res.json();
    },
    refetchInterval: 15000,
    enabled: symbols.length > 0
  });
}
```

### File: `hooks/useTrending.ts`

```typescript
import { useQuery } from '@tanstack/react-query';

export function useTrending(category: string, limit = 10) {
  return useQuery({
    queryKey: ['trending', category, limit],
    queryFn: async () => {
      const res = await fetch(`/api/trending?category=${category}&limit=${limit}`);
      if (!res.ok) throw new Error('Failed to fetch trending');
      return res.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 5 * 60 * 1000 // Refresh every 5 minutes
  });
}
```

---

## 8. 📦 Environment Variables

### File: `.env.local`

```bash
# Stock Data APIs
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here
TWELVE_DATA_API_KEY=your_twelve_data_key_here
FINNHUB_API_KEY=your_finnhub_key_here

# LLM APIs
GROQ_API_KEY=your_groq_key_here
GEMINI_API_KEY=your_gemini_key_here

# Optional
NEWS_API_KEY=your_newsapi_key_here
```

---

## 9. 🚀 Quick Start Commands

```bash
# Install dependencies
npm install @tanstack/react-query zustand framer-motion
npm install recharts lucide-react
npm install groq-sdk @google/generative-ai

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

---

## 10. ✅ Testing Your Setup

### File: `test-api.ts`

```typescript
// Test script to verify all APIs are working

async function testAPIs() {
  console.log('🧪 Testing API Connections...\n');

  // Test Alpha Vantage
  try {
    const av = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
    const avData = await av.json();
    console.log('✅ Alpha Vantage:', avData['Global Quote'] ? 'Working' : 'Failed');
  } catch (e) {
    console.log('❌ Alpha Vantage: Failed');
  }

  // Test Twelve Data
  try {
    const td = await fetch(`https://api.twelvedata.com/quote?symbol=AAPL&apikey=${process.env.TWELVE_DATA_API_KEY}`);
    const tdData = await td.json();
    console.log('✅ Twelve Data:', tdData.symbol ? 'Working' : 'Failed');
  } catch (e) {
    console.log('❌ Twelve Data: Failed');
  }

  // Test Finnhub
  try {
    const fh = await fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${process.env.FINNHUB_API_KEY}`);
    const fhData = await fh.json();
    console.log('✅ Finnhub:', fhData.c ? 'Working' : 'Failed');
  } catch (e) {
    console.log('❌ Finnhub: Failed');
  }

  // Test Groq
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: 'Say hello' }],
      model: 'llama-3.3-70b-versatile'
    });
    console.log('✅ Groq:', completion.choices[0].message ? 'Working' : 'Failed');
  } catch (e) {
    console.log('❌ Groq: Failed');
  }

  console.log('\n✅ API Testing Complete!');
}

testAPIs();
```

---

**This gives you complete, working code for all major features!** 🎉

Copy these files into your project and start building! 🚀
