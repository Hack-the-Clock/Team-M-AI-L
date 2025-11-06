'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MarketData {
  date: string;
  value: number;
}

interface SectorPerformance {
  name: string;
  change: number;
  color: string;
}

interface TopStock {
  symbol: string;
  name: string;
  changePercent: number;
}

export default function TrendsPage() {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1Y');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [topGainers, setTopGainers] = useState<TopStock[]>([]);
  const [topLosers, setTopLosers] = useState<TopStock[]>([]);

  // Mock market data - in production, this would come from Yahoo Finance historical data
  useEffect(() => {
    const generateMarketData = () => {
      const data: MarketData[] = [];
      const dataPoints = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : 365;
      
      // Different base values and volatility for different sectors
      let baseValue = 10000;
      let volatility = 0.48;
      let trend = 0;
      
      if (selectedSector) {
        // Adjust base values based on sector performance
        const sectorData: { [key: string]: { base: number; vol: number; trend: number } } = {
          'AI & Robotics': { base: 8000, vol: 0.55, trend: 0.15 },
          'Electric Vehicles': { base: 9000, vol: 0.60, trend: 0.12 },
          'Green Energy': { base: 8500, vol: 0.52, trend: 0.10 },
          'Semiconductors': { base: 9500, vol: 0.45, trend: 0.08 },
          'Healthcare Tech': { base: 10500, vol: 0.40, trend: 0.06 },
          'Fintech': { base: 9800, vol: 0.50, trend: 0.05 },
          'Consumer Tech': { base: 11000, vol: 0.42, trend: 0.04 },
          'Cloud Computing': { base: 10200, vol: 0.48, trend: 0.03 }
        };
        
        const sector = sectorData[selectedSector];
        if (sector) {
          baseValue = sector.base;
          volatility = sector.vol;
          trend = sector.trend;
        }
      }
      
      let value = baseValue;

      for (let i = 0; i < dataPoints; i++) {
        // Add trend and random volatility
        value += (Math.random() - volatility) * 100 + (trend * 50);
        data.push({
          date: timeframe === '1D' ? `${i}:00` : `Day ${i + 1}`,
          value: Math.round(value)
        });
      }
      
      return data;
    };

    setMarketData(generateMarketData());
  }, [timeframe, selectedSector]);

  // Mock top performers - in production, fetch from API
  useEffect(() => {
    // Sector-specific stocks
    const sectorStocks: { [key: string]: { gainers: TopStock[]; losers: TopStock[] } } = {
      'AI & Robotics': {
        gainers: [
          { symbol: 'NVDA', name: 'NVIDIA Corporation', changePercent: 12.5 },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', changePercent: 9.8 },
          { symbol: 'MSFT', name: 'Microsoft Corporation', changePercent: 8.3 },
          { symbol: 'PLTR', name: 'Palantir Technologies', changePercent: 7.9 },
          { symbol: 'AMD', name: 'Advanced Micro Devices', changePercent: 6.8 }
        ],
        losers: [
          { symbol: 'IBM', name: 'IBM Corporation', changePercent: -2.1 },
          { symbol: 'ORCL', name: 'Oracle Corporation', changePercent: -1.8 },
          { symbol: 'CRM', name: 'Salesforce Inc.', changePercent: -1.5 },
          { symbol: 'SNOW', name: 'Snowflake Inc.', changePercent: -1.2 },
          { symbol: 'AI', name: 'C3.ai Inc.', changePercent: -0.9 }
        ]
      },
      'Electric Vehicles': {
        gainers: [
          { symbol: 'TSLA', name: 'Tesla, Inc.', changePercent: 11.2 },
          { symbol: 'RIVN', name: 'Rivian Automotive', changePercent: 8.7 },
          { symbol: 'LCID', name: 'Lucid Group', changePercent: 7.5 },
          { symbol: 'NIO', name: 'NIO Inc.', changePercent: 6.9 },
          { symbol: 'XPEV', name: 'XPeng Inc.', changePercent: 5.4 }
        ],
        losers: [
          { symbol: 'F', name: 'Ford Motor Company', changePercent: -3.2 },
          { symbol: 'GM', name: 'General Motors', changePercent: -2.8 },
          { symbol: 'RIDE', name: 'Lordstown Motors', changePercent: -2.5 },
          { symbol: 'GOEV', name: 'Canoo Inc.', changePercent: -2.1 },
          { symbol: 'FSR', name: 'Fisker Inc.', changePercent: -1.9 }
        ]
      },
      'Green Energy': {
        gainers: [
          { symbol: 'ENPH', name: 'Enphase Energy', changePercent: 9.9 },
          { symbol: 'SEDG', name: 'SolarEdge Technologies', changePercent: 8.4 },
          { symbol: 'FSLR', name: 'First Solar', changePercent: 7.8 },
          { symbol: 'NEE', name: 'NextEra Energy', changePercent: 6.5 },
          { symbol: 'RUN', name: 'Sunrun Inc.', changePercent: 5.9 }
        ],
        losers: [
          { symbol: 'PLUG', name: 'Plug Power Inc.', changePercent: -4.2 },
          { symbol: 'BE', name: 'Bloom Energy', changePercent: -3.5 },
          { symbol: 'SPWR', name: 'SunPower Corporation', changePercent: -2.9 },
          { symbol: 'ARRY', name: 'Array Technologies', changePercent: -2.4 },
          { symbol: 'NOVA', name: 'Sunnova Energy', changePercent: -2.1 }
        ]
      },
      'Semiconductors': {
        gainers: [
          { symbol: 'NVDA', name: 'NVIDIA Corporation', changePercent: 10.8 },
          { symbol: 'AMD', name: 'Advanced Micro Devices', changePercent: 9.2 },
          { symbol: 'AVGO', name: 'Broadcom Inc.', changePercent: 8.5 },
          { symbol: 'TSM', name: 'Taiwan Semiconductor', changePercent: 7.3 },
          { symbol: 'QCOM', name: 'Qualcomm Inc.', changePercent: 6.7 }
        ],
        losers: [
          { symbol: 'INTC', name: 'Intel Corporation', changePercent: -3.1 },
          { symbol: 'MU', name: 'Micron Technology', changePercent: -2.6 },
          { symbol: 'TXN', name: 'Texas Instruments', changePercent: -2.2 },
          { symbol: 'MRVL', name: 'Marvell Technology', changePercent: -1.8 },
          { symbol: 'ADI', name: 'Analog Devices', changePercent: -1.4 }
        ]
      },
      'Healthcare Tech': {
        gainers: [
          { symbol: 'TDOC', name: 'Teladoc Health', changePercent: 8.5 },
          { symbol: 'VEEV', name: 'Veeva Systems', changePercent: 7.9 },
          { symbol: 'DXCM', name: 'DexCom Inc.', changePercent: 7.2 },
          { symbol: 'ISRG', name: 'Intuitive Surgical', changePercent: 6.8 },
          { symbol: 'ILMN', name: 'Illumina Inc.', changePercent: 6.3 }
        ],
        losers: [
          { symbol: 'PTON', name: 'Peloton Interactive', changePercent: -2.9 },
          { symbol: 'DOCS', name: 'Doximity Inc.', changePercent: -2.4 },
          { symbol: 'ONEM', name: 'One Medical', changePercent: -2.1 },
          { symbol: 'SDGR', name: 'Schrodinger Inc.', changePercent: -1.7 },
          { symbol: 'GDRX', name: 'GoodRx Holdings', changePercent: -1.4 }
        ]
      },
      'Fintech': {
        gainers: [
          { symbol: 'SQ', name: 'Block, Inc.', changePercent: 8.4 },
          { symbol: 'PYPL', name: 'PayPal Holdings', changePercent: 7.5 },
          { symbol: 'COIN', name: 'Coinbase Global', changePercent: 6.9 },
          { symbol: 'AFRM', name: 'Affirm Holdings', changePercent: 6.2 },
          { symbol: 'SOFI', name: 'SoFi Technologies', changePercent: 5.8 }
        ],
        losers: [
          { symbol: 'HOOD', name: 'Robinhood Markets', changePercent: -3.5 },
          { symbol: 'UPST', name: 'Upstart Holdings', changePercent: -3.1 },
          { symbol: 'LC', name: 'LendingClub Corp', changePercent: -2.7 },
          { symbol: 'NU', name: 'Nu Holdings', changePercent: -2.3 },
          { symbol: 'OPEN', name: 'Opendoor Technologies', changePercent: -2.0 }
        ]
      },
      'Consumer Tech': {
        gainers: [
          { symbol: 'AAPL', name: 'Apple Inc.', changePercent: 7.5 },
          { symbol: 'AMZN', name: 'Amazon.com Inc.', changePercent: 6.8 },
          { symbol: 'META', name: 'Meta Platforms', changePercent: 6.4 },
          { symbol: 'NFLX', name: 'Netflix Inc.', changePercent: 5.9 },
          { symbol: 'DIS', name: 'Walt Disney Co.', changePercent: 5.3 }
        ],
        losers: [
          { symbol: 'SNAP', name: 'Snap Inc.', changePercent: -3.8 },
          { symbol: 'PINS', name: 'Pinterest Inc.', changePercent: -3.2 },
          { symbol: 'SPOT', name: 'Spotify Technology', changePercent: -2.8 },
          { symbol: 'ROKU', name: 'Roku Inc.', changePercent: -2.5 },
          { symbol: 'UBER', name: 'Uber Technologies', changePercent: -2.1 }
        ]
      },
      'Cloud Computing': {
        gainers: [
          { symbol: 'MSFT', name: 'Microsoft Corporation', changePercent: 7.2 },
          { symbol: 'AMZN', name: 'Amazon Web Services', changePercent: 6.8 },
          { symbol: 'GOOGL', name: 'Google Cloud', changePercent: 6.4 },
          { symbol: 'CRM', name: 'Salesforce Inc.', changePercent: 5.9 },
          { symbol: 'ORCL', name: 'Oracle Corporation', changePercent: 5.5 }
        ],
        losers: [
          { symbol: 'SNOW', name: 'Snowflake Inc.', changePercent: -2.8 },
          { symbol: 'DDOG', name: 'Datadog Inc.', changePercent: -2.4 },
          { symbol: 'MDB', name: 'MongoDB Inc.', changePercent: -2.1 },
          { symbol: 'NET', name: 'Cloudflare Inc.', changePercent: -1.9 },
          { symbol: 'TWLO', name: 'Twilio Inc.', changePercent: -1.6 }
        ]
      }
    };

    if (selectedSector && sectorStocks[selectedSector]) {
      setTopGainers(sectorStocks[selectedSector].gainers);
      setTopLosers(sectorStocks[selectedSector].losers);
    } else {
      // Overall market top movers
      setTopGainers([
        { symbol: 'NVDA', name: 'NVIDIA Corporation', changePercent: 8.5 },
        { symbol: 'TSLA', name: 'Tesla, Inc.', changePercent: 7.2 },
        { symbol: 'AMD', name: 'Advanced Micro Devices', changePercent: 6.8 },
        { symbol: 'ENPH', name: 'Enphase Energy', changePercent: 5.9 },
        { symbol: 'SQ', name: 'Block, Inc.', changePercent: 5.4 }
      ]);

      setTopLosers([
        { symbol: 'PLUG', name: 'Plug Power Inc.', changePercent: -4.2 },
        { symbol: 'LCID', name: 'Lucid Group', changePercent: -3.8 },
        { symbol: 'RIVN', name: 'Rivian Automotive', changePercent: -3.5 },
        { symbol: 'COIN', name: 'Coinbase Global', changePercent: -2.9 },
        { symbol: 'PYPL', name: 'PayPal Holdings', changePercent: -2.4 }
      ]);
    }
  }, [selectedSector]);

  const sectorPerformance: SectorPerformance[] = [
    { name: 'AI & Robotics', change: 15.3, color: 'bg-primary' },
    { name: 'Electric Vehicles', change: 14.5, color: 'bg-orange-500' },
    { name: 'Green Energy', change: 12.7, color: 'bg-green-500' },
    { name: 'Semiconductors', change: 11.8, color: 'bg-indigo-500' },
    { name: 'Healthcare Tech', change: 10.2, color: 'bg-rose-500' },
    { name: 'Fintech', change: 8.9, color: 'bg-emerald-500' },
    { name: 'Consumer Tech', change: 7.5, color: 'bg-blue-500' },
    { name: 'Cloud Computing', change: 6.2, color: 'bg-purple-500' }
  ];

  // Dynamic stats based on selected sector
  const getSectorStats = () => {
    const sectorStatsData: { [key: string]: { volume: string; growth: number; stocks: number } } = {
      'AI & Robotics': { volume: '18.3B', growth: 15.3, stocks: 24 },
      'Electric Vehicles': { volume: '22.7B', growth: 14.5, stocks: 18 },
      'Green Energy': { volume: '15.8B', growth: 12.7, stocks: 22 },
      'Semiconductors': { volume: '28.5B', growth: 11.8, stocks: 16 },
      'Healthcare Tech': { volume: '12.4B', growth: 10.2, stocks: 20 },
      'Fintech': { volume: '19.6B', growth: 8.9, stocks: 25 },
      'Consumer Tech': { volume: '35.2B', growth: 7.5, stocks: 19 },
      'Cloud Computing': { volume: '24.1B', growth: 6.2, stocks: 21 }
    };

    if (selectedSector && sectorStatsData[selectedSector]) {
      return sectorStatsData[selectedSector];
    }

    return { volume: '42.5B', growth: 2.4, stocks: 156 };
  };

  const stats = getSectorStats();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Market Trends & Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track market performance, sector trends, and top movers
            </p>
          </div>

          {/* Market Performance Chart */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  {selectedSector ? `${selectedSector} Performance` : 'Market Performance'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedSector ? `${selectedSector} trend over selected timeframe` : 'Overall market trend over selected timeframe'}
                </p>
                {selectedSector && (
                  <button
                    onClick={() => setSelectedSector(null)}
                    className="mt-2 text-xs text-primary hover:text-primary/80 transition underline"
                  >
                    ← Back to Overall Market
                  </button>
                )}
              </div>
              
              {/* Timeframe Selector */}
              <div className="flex gap-2">
                {(['1D', '1W', '1M', '3M', '1Y'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      timeframe === tf
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2642" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A2642', 
                      border: '1px solid #29A19C',
                      borderRadius: '8px',
                      color: '#F7F8FA'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#29A19C" 
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sector Heatmap */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Sector Heatmap
              </h2>
              <p className="text-sm text-muted-foreground">
                Performance by sector (30-day change)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sectorPerformance.map((sector) => (
                <div
                  key={sector.name}
                  onClick={() => setSelectedSector(sector.name)}
                  className={`${sector.color} bg-opacity-90 rounded-lg p-4 hover:scale-105 transition cursor-pointer relative ${
                    selectedSector === sector.name ? 'ring-4 ring-white ring-opacity-50' : ''
                  }`}
                >
                  {selectedSector === sector.name && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full animate-pulse" />
                  )}
                  <p className="text-white font-medium text-sm mb-2">
                    {sector.name}
                  </p>
                  <div className="flex items-center gap-1 text-white">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xl font-bold">
                      +{sector.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Movers */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Gainers */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-positive/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-positive" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Top Gainers</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedSector ? `Best performing ${selectedSector} stocks` : 'Best performing stocks today'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {topGainers.map((stock, index) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-muted/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground font-bold w-6">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-bold text-foreground">{stock.symbol}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {stock.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-positive font-bold">
                      <TrendingUp className="w-4 h-4" />
                      +{stock.changePercent}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-negative/10 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-negative" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Top Losers</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedSector ? `Worst performing ${selectedSector} stocks` : 'Worst performing stocks today'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {topLosers.map((stock, index) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-muted/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground font-bold w-6">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-bold text-foreground">{stock.symbol}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {stock.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-negative font-bold">
                      <TrendingDown className="w-4 h-4" />
                      {stock.changePercent}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Activity className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground mb-1">
                {stats.volume}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedSector ? `${selectedSector} Volume` : 'Total Market Volume'}
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <TrendingUp className="w-8 h-8 text-positive mx-auto mb-3" />
              <p className="text-3xl font-bold text-positive mb-1">
                +{stats.growth}%
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedSector ? `${selectedSector} Growth` : 'Average Sector Growth'}
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Activity className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground mb-1">
                {stats.stocks}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedSector ? `${selectedSector} Stocks` : 'Stocks Tracked'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
