// API Route: Get Stock Quote(s)
import { NextRequest, NextResponse } from 'next/server';
import { yahooFinanceService } from '@/lib/services/yahoo-finance.service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const batch = searchParams.get('batch');

  console.log('Stock quote API called:', { symbol, batch });

  try {
    // Batch request
    if (batch) {
      const symbols = batch.split(',').map(s => s.trim().toUpperCase());
      console.log('Fetching batch quotes for:', symbols);
      const quotes = await yahooFinanceService.getBatchQuotes(symbols);
      console.log(`Successfully fetched ${quotes.length} quotes`);
      return NextResponse.json({ quotes });
    }

    // Single quote request
    if (symbol) {
      const quote = await yahooFinanceService.getQuote(symbol.toUpperCase());
      return NextResponse.json({ quote });
    }

    return NextResponse.json(
      { error: 'Missing symbol or batch parameter' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Stock quote error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock quote' },
      { status: 500 }
    );
  }
}
