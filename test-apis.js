// API Test Script - Run this to verify all your APIs are working!
// Usage: node test-apis.js

// Instructions:
// 1. Replace YOUR_KEY_HERE with your actual API keys
// 2. Run: npm install groq-sdk node-fetch
// 3. Run: node test-apis.js

const fetch = require('node-fetch');

// ========================================
// 🔑 ADD YOUR API KEYS HERE
// ========================================
const API_KEYS = {
  ALPHA_VANTAGE: 'YOUR_KEY_HERE',
  TWELVE_DATA: 'YOUR_KEY_HERE',
  FINNHUB: 'YOUR_KEY_HERE',
  GROQ: 'YOUR_KEY_HERE'
};

// ========================================
// Test Functions
// ========================================

async function testAlphaVantage() {
  console.log('\n📊 Testing Alpha Vantage...');
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${API_KEYS.ALPHA_VANTAGE}`
    );
    const data = await response.json();
    
    if (data['Global Quote']) {
      const quote = data['Global Quote'];
      console.log('✅ Alpha Vantage: WORKING!');
      console.log(`   AAPL Price: $${quote['05. price']}`);
      console.log(`   Change: ${quote['10. change percent']}`);
      return true;
    } else {
      console.log('❌ Alpha Vantage: Failed - Check your API key');
      console.log('   Error:', data.Note || data['Error Message'] || 'Unknown error');
      return false;
    }
  } catch (error) {
    console.log('❌ Alpha Vantage: Network error -', error.message);
    return false;
  }
}

async function testTwelveData() {
  console.log('\n📈 Testing Twelve Data...');
  try {
    const response = await fetch(
      `https://api.twelvedata.com/quote?symbol=AAPL&apikey=${API_KEYS.TWELVE_DATA}`
    );
    const data = await response.json();
    
    if (data.symbol) {
      console.log('✅ Twelve Data: WORKING!');
      console.log(`   ${data.symbol} Price: $${data.close}`);
      console.log(`   Change: ${data.percent_change}%`);
      console.log(`   Volume: ${data.volume}`);
      return true;
    } else {
      console.log('❌ Twelve Data: Failed - Check your API key');
      console.log('   Error:', data.message || 'Unknown error');
      return false;
    }
  } catch (error) {
    console.log('❌ Twelve Data: Network error -', error.message);
    return false;
  }
}

async function testFinnhub() {
  console.log('\n📰 Testing Finnhub (News & Sentiment)...');
  try {
    // Test 1: Stock Quote
    const quoteRes = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${API_KEYS.FINNHUB}`
    );
    const quoteData = await quoteRes.json();
    
    if (quoteData.c) {
      console.log('✅ Finnhub Quote: WORKING!');
      console.log(`   AAPL Price: $${quoteData.c}`);
      console.log(`   Change: ${quoteData.dp}%`);
    }
    
    // Test 2: Company News
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const from = weekAgo.toISOString().split('T')[0];
    const to = today.toISOString().split('T')[0];
    
    const newsRes = await fetch(
      `https://finnhub.io/api/v1/company-news?symbol=TSLA&from=${from}&to=${to}&token=${API_KEYS.FINNHUB}`
    );
    const newsData = await newsRes.json();
    
    if (Array.isArray(newsData)) {
      console.log('✅ Finnhub News: WORKING!');
      console.log(`   Found ${newsData.length} TSLA news articles (last 7 days)`);
      if (newsData.length > 0) {
        console.log(`   Latest: "${newsData[0].headline.substring(0, 60)}..."`);
      }
    }
    
    return true;
  } catch (error) {
    console.log('❌ Finnhub: Network error -', error.message);
    return false;
  }
}

async function testGroq() {
  console.log('\n🤖 Testing Groq AI...');
  try {
    const { default: Groq } = await import('groq-sdk');
    const groq = new Groq({ apiKey: API_KEYS.GROQ });
    
    console.log('   Sending test message to AI...');
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'Say "Hello from Groq!" and nothing else.'
        }
      ],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 50
    });
    
    const response = completion.choices[0].message.content;
    console.log('✅ Groq AI: WORKING!');
    console.log(`   AI Response: "${response}"`);
    console.log(`   Model: llama-3.3-70b-versatile`);
    console.log(`   Speed: FAST! ⚡`);
    return true;
  } catch (error) {
    console.log('❌ Groq AI: Failed -', error.message);
    if (error.message.includes('groq-sdk')) {
      console.log('   Install: npm install groq-sdk');
    }
    return false;
  }
}

async function testSectorPerformance() {
  console.log('\n🏢 Testing Sector Performance (Alpha Vantage)...');
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SECTOR&apikey=${API_KEYS.ALPHA_VANTAGE}`
    );
    const data = await response.json();
    
    if (data['Rank A: Real-Time Performance']) {
      const sectors = data['Rank A: Real-Time Performance'];
      console.log('✅ Sector Performance: WORKING!');
      console.log('\n   Today\'s Sector Performance:');
      
      Object.entries(sectors).slice(0, 5).forEach(([sector, change]) => {
        const emoji = parseFloat(change) > 0 ? '📈' : '📉';
        console.log(`   ${emoji} ${sector}: ${change}`);
      });
      return true;
    } else {
      console.log('❌ Sector Performance: Failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Sector Performance: Network error -', error.message);
    return false;
  }
}

async function testTopGainersLosers() {
  console.log('\n🎯 Testing Top Gainers/Losers (Alpha Vantage)...');
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEYS.ALPHA_VANTAGE}`
    );
    const data = await response.json();
    
    if (data.top_gainers) {
      console.log('✅ Top Movers: WORKING!');
      console.log('\n   Top 3 Gainers Today:');
      data.top_gainers.slice(0, 3).forEach((stock, idx) => {
        console.log(`   ${idx + 1}. ${stock.ticker} - ${stock.change_percentage} (${stock.price})`);
      });
      return true;
    } else {
      console.log('❌ Top Movers: Failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Top Movers: Network error -', error.message);
    return false;
  }
}

async function testCompanyProfile() {
  console.log('\n🏭 Testing Company Profile (Finnhub)...');
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=TSLA&token=${API_KEYS.FINNHUB}`
    );
    const data = await response.json();
    
    if (data.name) {
      console.log('✅ Company Profile: WORKING!');
      console.log(`   Name: ${data.name}`);
      console.log(`   Industry: ${data.finnhubIndustry}`);
      console.log(`   Market Cap: $${(data.marketCapitalization / 1000).toFixed(1)}B`);
      console.log(`   Logo: ${data.logo}`);
      return true;
    } else {
      console.log('❌ Company Profile: Failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Company Profile: Network error -', error.message);
    return false;
  }
}

async function testBatchQuotes() {
  console.log('\n📦 Testing Batch Quotes (Twelve Data)...');
  try {
    const symbols = ['AAPL', 'MSFT', 'GOOGL'];
    const response = await fetch(
      `https://api.twelvedata.com/quote?symbol=${symbols.join(',')}&apikey=${API_KEYS.TWELVE_DATA}`
    );
    const data = await response.json();
    
    // Handle both array and object responses
    const quotes = Array.isArray(data) ? data : Object.values(data);
    
    if (quotes.length > 0 && quotes[0].symbol) {
      console.log('✅ Batch Quotes: WORKING!');
      console.log(`   Retrieved ${quotes.length} stocks at once:`);
      quotes.forEach(q => {
        console.log(`   ${q.symbol}: $${q.close} (${q.percent_change}%)`);
      });
      return true;
    } else {
      console.log('❌ Batch Quotes: Failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Batch Quotes: Network error -', error.message);
    return false;
  }
}

// ========================================
// Main Test Runner
// ========================================

async function runAllTests() {
  console.log('🧪 InvestorIQ API Testing Suite');
  console.log('================================\n');
  
  // Check if keys are set
  const missingKeys = Object.entries(API_KEYS)
    .filter(([_, value]) => value === 'YOUR_KEY_HERE')
    .map(([key, _]) => key);
  
  if (missingKeys.length > 0) {
    console.log('⚠️  WARNING: Missing API Keys!');
    console.log('Please edit this file and add your keys for:');
    missingKeys.forEach(key => console.log(`   - ${key}`));
    console.log('\nSkipping tests for missing keys...\n');
  }
  
  const results = {
    passed: 0,
    failed: 0,
    skipped: 0
  };
  
  // Run tests
  const tests = [
    { name: 'Alpha Vantage', fn: testAlphaVantage, key: 'ALPHA_VANTAGE' },
    { name: 'Twelve Data', fn: testTwelveData, key: 'TWELVE_DATA' },
    { name: 'Finnhub', fn: testFinnhub, key: 'FINNHUB' },
    { name: 'Groq AI', fn: testGroq, key: 'GROQ' },
    { name: 'Sector Performance', fn: testSectorPerformance, key: 'ALPHA_VANTAGE' },
    { name: 'Top Gainers/Losers', fn: testTopGainersLosers, key: 'ALPHA_VANTAGE' },
    { name: 'Company Profile', fn: testCompanyProfile, key: 'FINNHUB' },
    { name: 'Batch Quotes', fn: testBatchQuotes, key: 'TWELVE_DATA' }
  ];
  
  for (const test of tests) {
    if (API_KEYS[test.key] === 'YOUR_KEY_HERE') {
      console.log(`\n⏭️  Skipping ${test.name} (no API key)`);
      results.skipped++;
      continue;
    }
    
    try {
      const passed = await test.fn();
      if (passed) {
        results.passed++;
      } else {
        results.failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name}: Unexpected error -`, error.message);
      results.failed++;
    }
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Summary
  console.log('\n\n================================');
  console.log('📊 TEST SUMMARY');
  console.log('================================');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⏭️  Skipped: ${results.skipped}`);
  
  if (results.passed === tests.length - results.skipped) {
    console.log('\n🎉 All tests passed! You\'re ready to build! 🚀');
  } else if (results.passed > 0) {
    console.log('\n⚠️  Some tests failed. Check the errors above.');
  } else {
    console.log('\n❌ All tests failed. Please check your API keys.');
  }
  
  console.log('\n📚 Next Steps:');
  console.log('1. If tests passed: Start building your InvestorIQ app!');
  console.log('2. If tests failed: Check API keys and error messages');
  console.log('3. Read QUICK_START_GUIDE.md for step-by-step instructions');
}

// ========================================
// Run Tests
// ========================================

runAllTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
