'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import Image from 'next/image';
import { COMPANY_DATABASE } from '@/lib/data/companies';

interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  logo?: string;
}

export default function SectorsPage() {
  const [expandedSector, setExpandedSector] = useState<string | null>(null);
  const [sectorStocks, setSectorStocks] = useState<Record<string, StockQuote[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const sectors = [
    {
      name: 'AI & Robotics',
      description: 'Leading companies in artificial intelligence, machine learning, autonomous systems, and robotics technology.',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      name: 'Fintech',
      description: 'Digital payment processors, cryptocurrency exchanges, online banking, and financial technology innovators.',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      name: 'Electric Vehicles',
      description: 'Electric vehicle manufacturers, battery technology companies, and charging infrastructure providers.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      name: 'Green Energy',
      description: 'Solar panel manufacturers, wind energy companies, renewable energy providers, and clean energy technology.',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      name: 'Healthcare Tech',
      description: 'Telemedicine platforms, medical device manufacturers, healthcare AI, and digital health solutions.',
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10'
    },
    {
      name: 'Semiconductors',
      description: 'Chip manufacturers, semiconductor design companies, and hardware powering AI, computing, and mobile devices.',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    }
  ];

  const toggleSector = async (sectorName: string) => {
    if (expandedSector === sectorName) {
      setExpandedSector(null);
    } else {
      setExpandedSector(sectorName);
      
      // Fetch stock data if not already loaded
      if (!sectorStocks[sectorName]) {
        setLoading({ ...loading, [sectorName]: true });
        
        try {
          const companies = COMPANY_DATABASE[sectorName as keyof typeof COMPANY_DATABASE] || [];
          console.log(`Fetching stocks for ${sectorName}:`, companies);
          
          if (companies.length === 0) {
            console.warn(`No companies found for sector: ${sectorName}`);
            setLoading({ ...loading, [sectorName]: false });
            return;
          }
          
          const symbols = companies.map(c => c.symbol).join(',');
          console.log(`Symbols to fetch: ${symbols}`);
          
          const response = await fetch(`/api/stocks/quote?batch=${symbols}`);
          const data = await response.json();
          
          console.log(`API response for ${sectorName}:`, data);
          
          setSectorStocks(prev => ({
            ...prev,
            [sectorName]: data.quotes || []
          }));
        } catch (error) {
          console.error('Error fetching sector stocks:', error);
        } finally {
          setLoading({ ...loading, [sectorName]: false });
        }
      }
    }
  };

  const addToWatchlist = (stock: StockQuote) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    if (!watchlist.find((item: any) => item.symbol === stock.symbol)) {
      watchlist.push({
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        change: stock.change,
        changePercent: stock.changePercent,
        addedAt: new Date().toISOString()
      });
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      window.dispatchEvent(new Event('watchlistUpdated'));
      alert(`${stock.symbol} added to watchlist!`);
    } else {
      alert(`${stock.symbol} is already in your watchlist`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Explore Sectors
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse companies by industry sectors and discover investment opportunities
            </p>
          </div>

          {/* Sectors Accordion */}
          <div className="space-y-4">
            {sectors.map((sector) => {
              const isExpanded = expandedSector === sector.name;
              const stocks = sectorStocks[sector.name] || [];
              const isLoading = loading[sector.name];

              return (
                <div
                  key={sector.name}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                >
                  {/* Sector Header */}
                  <button
                    onClick={() => toggleSector(sector.name)}
                    className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${sector.bgColor} rounded-lg flex items-center justify-center`}>
                        <span className={`text-2xl font-bold ${sector.color}`}>
                          {sector.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-left">
                        <h2 className="text-xl font-bold text-foreground mb-1">
                          {sector.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {sector.description}
                        </p>
                      </div>
                    </div>
                    
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    )}
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-border bg-background">
                      {isLoading ? (
                        <div className="p-8 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                          <p className="text-muted-foreground mt-4">Loading stocks...</p>
                        </div>
                      ) : stocks.length === 0 ? (
                        <div className="p-8 text-center">
                          <p className="text-muted-foreground">No stocks available for this sector.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                          {stocks.map((stock) => (
                            <div
                              key={stock.symbol}
                              className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  {stock.logo ? (
                                    <Image
                                      src={stock.logo}
                                      alt={stock.symbol}
                                      width={40}
                                      height={40}
                                      className="rounded-lg"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                      <span className="text-primary font-bold text-sm">
                                        {stock.symbol.slice(0, 2)}
                                      </span>
                                    </div>
                                  )}
                                  <div>
                                    <h3 className="font-bold text-foreground">{stock.symbol}</h3>
                                    <p className="text-xs text-muted-foreground line-clamp-1">
                                      {stock.name}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <p className="text-2xl font-bold text-foreground">
                                    ${stock.price.toFixed(2)}
                                  </p>
                                  <div className={`flex items-center gap-1 text-sm ${
                                    stock.change >= 0 ? 'text-positive' : 'text-negative'
                                  }`}>
                                    {stock.change >= 0 ? (
                                      <TrendingUp className="w-4 h-4" />
                                    ) : (
                                      <TrendingDown className="w-4 h-4" />
                                    )}
                                    <span>
                                      {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => addToWatchlist(stock)}
                                className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm font-medium"
                              >
                                <Plus className="w-4 h-4" />
                                Add to Watchlist
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
