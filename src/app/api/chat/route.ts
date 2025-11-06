// API Route: AI Chat with Ollama
import { NextRequest, NextResponse } from 'next/server';
import { ollamaService } from '@/lib/services/ollama.service';
import { yahooFinanceService } from '@/lib/services/yahoo-finance.service';
import { getCompaniesByCategory } from '@/lib/data/companies';

export const dynamic = 'force-dynamic';
export const maxDuration = 120; // 2 minutes for large model

function detectCategory(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.match(/ai|robot|artificial intelligence|automation|machine learning/i)) {
    return 'AI & Robotics';
  }
  if (lowerMessage.match(/fintech|payment|crypto|blockchain|bank|financial/i)) {
    return 'Fintech';
  }
  if (lowerMessage.match(/ev|electric vehicle|tesla|rivian|automotive/i)) {
    return 'Electric Vehicles';
  }
  if (lowerMessage.match(/green|solar|renewable|clean energy|wind/i)) {
    return 'Green Energy';
  }
  if (lowerMessage.match(/healthcare|medical|biotech|pharma|health tech/i)) {
    return 'Healthcare Tech';
  }
  if (lowerMessage.match(/chip|semiconductor|processor|gpu|cpu/i)) {
    return 'Semiconductors';
  }

  return 'AI & Robotics'; // Default
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, messages, category: providedCategory } = body;

    // Extract message from either format
    const userMessage = message || (messages && messages.length > 0 ? messages[messages.length - 1].content : null);

    if (!userMessage) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Detect category from message
    const category = providedCategory || detectCategory(userMessage);

    // Get companies in this category
    const companies = getCompaniesByCategory(category);
    const symbols = companies.map(c => c.symbol).slice(0, 8); // Limit to 8 for performance

    // Fetch live stock data
    const quotes = await yahooFinanceService.getBatchQuotes(symbols);

    // Fetch company profiles (adds industry/summary context beyond quotes)
    // Limit to first 5 to keep latency reasonable
    const profileEntries = await Promise.all(
      symbols.slice(0, 5).map(async (symbol) => {
        try {
          const profile = await yahooFinanceService.getCompanyProfile(symbol);
          return [symbol, profile] as const;
        } catch {
          return [symbol, null] as const;
        }
      })
    );
    const profileMap = Object.fromEntries(profileEntries) as Record<string, any | null>;

    // Build context for AI
    const stockContext = quotes.map(q => {
      const companyMeta = companies.find(c => c.symbol === q.symbol);
      const profile = profileMap[q.symbol];
      return {
        name: companyMeta?.name || q.name,
        symbol: q.symbol,
        price: q.price,
        change: q.changePercent,
        sector: profile?.sector || companyMeta?.sector || 'Unknown',
        industry: profile?.industry || 'Unknown',
        description: profile?.description || companyMeta?.description || ''
      };
    });

    // Create system prompt
  const systemPrompt = `You are an expert investment advisor AI for InvestorIQ.

Context: Current data for ${category} companies (with sector/industry and business summary when available):
${JSON.stringify(stockContext, null, 2)}

Guidelines:
- Provide concise, actionable investment insights, referencing sector/industry dynamics when relevant
- Mention specific companies with their tickers like: **CompanyName (TICKER)**
- Use current prices and day move from the data provided; do not fabricate numbers
- Keep responses under 250 words, use short paragraphs and bullet points
- If useful, add a brief 'Takeaway:' at the end
- Stay professional and balanced; avoid definitive financial advice`;

    // Call Ollama AI
    const aiResponse = await ollamaService.chatWithContext(userMessage, systemPrompt);

    // Return response with recommendations (properly formatted)
    return NextResponse.json({
      response: aiResponse,
      recommendations: quotes.slice(0, 5).map(quote => {
        const company = companies.find(c => c.symbol === quote.symbol);
        // Generate clean logo URL
        let logoUrl;
        if (company) {
          const cleanName = company.name
            .toLowerCase()
            .replace(/\s+(inc|corp|corporation|ltd|llc|limited|co\.|,)/gi, '')
            .replace(/\s+/g, '')
            .trim();
          logoUrl = `https://logo.clearbit.com/${cleanName}.com`;
        }
        
        return {
          symbol: quote.symbol,
          name: company?.name || quote.name,
          price: quote.price,
          change: quote.change,
          changePercent: quote.changePercent,
          logo: logoUrl,
          tags: company?.categories || []
        };
      }),
      category: category
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    
    if (error.message?.includes('Ollama server is not running')) {
      return NextResponse.json(
        { error: 'Ollama server is not running. Please start it with: ollama serve' },
        { status: 503 }
      );
    }

    if (error.message?.includes('Model') && error.message?.includes('not found')) {
      return NextResponse.json(
        { error: 'AI model not found. Please pull it with: ollama pull gpt-oss:120b-cloud' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process chat request', details: error.message },
      { status: 500 }
    );
  }
}
