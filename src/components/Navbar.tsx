'use client';

import Link from 'next/link';
import { TrendingUp, Moon, Sun, User, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(0);

  useEffect(() => {
    // Check dark mode preference
    const dark = document.documentElement.classList.contains('dark');
    setIsDark(dark);

    // Get watchlist count from localStorage
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlistCount(watchlist.length);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
    localStorage.setItem('darkMode', (!isDark).toString());
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">InvestorIQ</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/sectors" className="text-muted-foreground hover:text-primary transition">
              Sectors
            </Link>
            <Link href="/trends" className="text-muted-foreground hover:text-primary transition">
              Trends
            </Link>
            <Link href="/chatbot" className="text-muted-foreground hover:text-primary transition">
              AI Chatbot
            </Link>
            <Link href="/watchlist" className="relative text-muted-foreground hover:text-primary transition">
              My Watchlist
              {watchlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {watchlistCount}
                </span>
              )}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 rounded-lg hover:bg-muted transition">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-muted transition"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {/* User Profile */}
            <button className="p-2 rounded-lg hover:bg-muted transition">
              <User className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
