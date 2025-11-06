// Yahoo Finance Service - Stock Data API
import YahooFinance from 'yahoo-finance2';

// Instantiate Yahoo Finance and suppress survey notice
const yahooFinance = new YahooFinance({ 
  suppressNotices: ['yahooSurvey'] 
});

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  timestamp: number;
}

export interface CompanyProfile {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  description: string;
  website?: string;
  logo?: string;
}

class YahooFinanceService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Get single stock quote
  async getQuote(symbol: string): Promise<StockQuote> {
    const cacheKey = `quote_${symbol}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const quote = await yahooFinance.quote(symbol) as any;
      
      if (!quote || !quote.regularMarketPrice) {
        throw new Error(`Invalid quote data for ${symbol}`);
      }
      
      const result: StockQuote = {
        symbol: quote.symbol || symbol,
        name: quote.shortName || quote.longName || symbol,
        price: quote.regularMarketPrice || 0,
        change: quote.regularMarketChange || 0,
        changePercent: quote.regularMarketChangePercent || 0,
        volume: quote.regularMarketVolume || 0,
        marketCap: quote.marketCap,
        timestamp: Date.now()
      };

      this.setCache(cacheKey, result);
      return result;
    } catch (error: any) {
      console.error(`Error fetching quote for ${symbol}:`, error.message);
      throw error;
    }
  }

  // Get multiple stock quotes (batch)
  async getBatchQuotes(symbols: string[]): Promise<StockQuote[]> {
    console.log('YahooFinanceService.getBatchQuotes called with:', symbols);
    const promises = symbols.map(symbol => this.getQuote(symbol).catch(err => {
      console.error(`Failed to fetch quote for ${symbol}:`, err.message);
      return null;
    }));
    const results = await Promise.all(promises);
    
    const validQuotes = results.filter((quote): quote is StockQuote => quote !== null);
    console.log(`Fetched ${validQuotes.length} valid quotes out of ${symbols.length} symbols`);
    return validQuotes;
  }

  // Get historical data
  async getHistoricalData(symbol: string, period1: Date, period2: Date) {
    const cacheKey = `history_${symbol}_${period1.getTime()}_${period2.getTime()}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const history = await yahooFinance.historical(symbol, {
        period1: period1.toISOString().split('T')[0],
        period2: period2.toISOString().split('T')[0],
        interval: '1d'
      });

      this.setCache(cacheKey, history);
      return history;
    } catch (error) {
      console.error(`Error fetching history for ${symbol}:`, error);
      return [];
    }
  }

  // Search stocks
  async searchStocks(query: string) {
    try {
      const results = await yahooFinance.search(query) as any;
      return results.quotes || [];
    } catch (error) {
      console.error('Error searching stocks:', error);
      return [];
    }
  }

  // Get company profile
  async getCompanyProfile(symbol: string): Promise<CompanyProfile | null> {
    const cacheKey = `profile_${symbol}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const quote = await yahooFinance.quoteSummary(symbol, {
        modules: ['summaryProfile', 'price']
      }) as any;

      const profile: CompanyProfile = {
        symbol: symbol,
        name: quote.price?.shortName || symbol,
        sector: quote.summaryProfile?.sector || 'Unknown',
        industry: quote.summaryProfile?.industry || 'Unknown',
        description: quote.summaryProfile?.longBusinessSummary || '',
        website: quote.summaryProfile?.website,
        logo: `https://logo.clearbit.com/${quote.summaryProfile?.website?.replace('http://', '').replace('https://', '').split('/')[0]}`
      };

      this.setCache(cacheKey, profile);
      return profile;
    } catch (error) {
      console.error(`Error fetching profile for ${symbol}:`, error);
      return null;
    }
  }

  // Cache helpers
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

  // Clear cache
  clearCache() {
    this.cache.clear();
  }
}

export const yahooFinanceService = new YahooFinanceService();
