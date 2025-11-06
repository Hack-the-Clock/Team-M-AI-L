'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { TrendingUp, TrendingDown, Trash2, Download, RefreshCw } from 'lucide-react';
import Image from 'next/image';

interface WatchlistStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  addedAt: string;
  logo?: string;
  sector?: string;
  tags?: string[];
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistStock[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<Set<string>>(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load watchlist from localStorage
  useEffect(() => {
    loadWatchlist();

    // Listen for watchlist updates
    const handleUpdate = () => loadWatchlist();
    window.addEventListener('watchlistUpdated', handleUpdate);
    return () => window.removeEventListener('watchlistUpdated', handleUpdate);
  }, []);

  const loadWatchlist = () => {
    const stored = localStorage.getItem('watchlist');
    if (stored) {
      const data = JSON.parse(stored);
      setWatchlist(data);
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    const updated = watchlist.filter(stock => stock.symbol !== symbol);
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('watchlistUpdated'));
  };

  const toggleSelectStock = (symbol: string) => {
    const newSelected = new Set(selectedStocks);
    if (newSelected.has(symbol)) {
      newSelected.delete(symbol);
    } else {
      newSelected.add(symbol);
    }
    setSelectedStocks(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedStocks.size === watchlist.length) {
      setSelectedStocks(new Set());
    } else {
      setSelectedStocks(new Set(watchlist.map(s => s.symbol)));
    }
  };

  const compareSelected = () => {
    const symbols = Array.from(selectedStocks);
    if (symbols.length < 2) {
      alert('Please select at least 2 stocks to compare');
      return;
    }
    if (symbols.length > 3) {
      alert('You can compare up to 3 stocks at a time');
      return;
    }
    
    // In production, navigate to comparison page
    alert(`Comparing: ${symbols.join(', ')}`);
  };

  const exportToCSV = () => {
    const headers = ['Symbol', 'Name', 'Price', 'Change', 'Change %', 'Added Date'];
    const rows = watchlist.map(stock => [
      stock.symbol,
      stock.name,
      stock.price.toFixed(2),
      stock.change.toFixed(2),
      stock.changePercent.toFixed(2),
      new Date(stock.addedAt).toLocaleDateString()
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `watchlist_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const refreshPrices = async () => {
    if (watchlist.length === 0) return;
    
    setIsRefreshing(true);
    try {
      const symbols = watchlist.map(s => s.symbol).join(',');
      const response = await fetch(`/api/stocks/quote?batch=${symbols}`);
      const data = await response.json();

      if (data.quotes) {
        const updated = watchlist.map(stock => {
          const quote = data.quotes.find((q: any) => q.symbol === stock.symbol);
          return quote ? { ...stock, ...quote } : stock;
        });
        
        setWatchlist(updated);
        localStorage.setItem('watchlist', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error refreshing prices:', error);
      alert('Failed to refresh prices');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              My Watchlist
            </h1>
            <p className="text-lg text-muted-foreground">
              Track and compare your favorite stocks
            </p>
          </div>

          {/* Action Bar */}
          {watchlist.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={compareSelected}
                  disabled={selectedStocks.size < 2 || selectedStocks.size > 3}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-white rounded-lg transition text-sm font-medium"
                >
                  Compare Selected ({selectedStocks.size})
                </button>
                
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition text-sm font-medium flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>

              <button
                onClick={refreshPrices}
                disabled={isRefreshing}
                className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition text-sm font-medium flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh Prices
              </button>
            </div>
          )}

          {/* Watchlist Table */}
          {watchlist.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Your watchlist is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Start adding stocks from the AI Chatbot or Sectors pages
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/chatbot"
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition font-medium"
                >
                  Try AI Chatbot
                </a>
                <a
                  href="/sectors"
                  className="px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition font-medium"
                >
                  Browse Sectors
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedStocks.size === watchlist.length}
                          onChange={toggleSelectAll}
                          className="w-4 h-4 rounded border-border"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Sector
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                        Price
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                        Change
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Tags
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {watchlist.map((stock) => (
                      <tr
                        key={stock.symbol}
                        className="hover:bg-muted/50 transition"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedStocks.has(stock.symbol)}
                            onChange={() => toggleSelectStock(stock.symbol)}
                            className="w-4 h-4 rounded border-border"
                          />
                        </td>
                        <td className="px-6 py-4">
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
                              <p className="font-bold text-foreground">{stock.symbol}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {stock.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-muted-foreground">
                            {stock.sector || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <p className="text-lg font-bold text-foreground">
                            ${stock.price.toFixed(2)}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className={`inline-flex items-center gap-1 ${
                            stock.change >= 0 ? 'text-positive' : 'text-negative'
                          }`}>
                            {stock.change >= 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span className="font-bold">
                              {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {stock.tags && stock.tags.length > 0 ? (
                            <div className="flex gap-1 flex-wrap">
                              {stock.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => removeFromWatchlist(stock.symbol)}
                            className="p-2 hover:bg-negative/10 text-negative rounded-lg transition"
                            title="Remove from watchlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Stats */}
          {watchlist.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-1">Total Stocks</p>
                <p className="text-3xl font-bold text-foreground">{watchlist.length}</p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-1">Average Change</p>
                <p className={`text-3xl font-bold ${
                  watchlist.reduce((sum, s) => sum + s.changePercent, 0) / watchlist.length >= 0
                    ? 'text-positive'
                    : 'text-negative'
                }`}>
                  {(watchlist.reduce((sum, s) => sum + s.changePercent, 0) / watchlist.length).toFixed(2)}%
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-1">Portfolio Value</p>
                <p className="text-3xl font-bold text-foreground">
                  ${watchlist.reduce((sum, s) => sum + s.price, 0).toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
