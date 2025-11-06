// API Route: Search Stocks
import { NextRequest, NextResponse } from 'next/server';
import { yahooFinanceService } from '@/lib/services/yahoo-finance.service';
import { searchCompanies } from '@/lib/data/companies';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Missing query parameter' },
      { status: 400 }
    );
  }

  try {
    // Search in our local database first
    const localResults = searchCompanies(query);
    
    // Also search Yahoo Finance
    const yahooResults = await yahooFinanceService.searchStocks(query);

    return NextResponse.json({
      local: localResults,
      yahoo: yahooResults.slice(0, 10)
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search stocks' },
      { status: 500 }
    );
  }
}
