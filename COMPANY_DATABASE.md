# 📊 InvestorIQ - Stock Categories & Company Database

## Complete Company Lists for Each Category (Free to Use!)

---

## 🤖 AI & Robotics Companies

### Tier 1 (Large Cap - Most Liquid)
```javascript
const AI_ROBOTICS_TIER1 = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', focus: 'AI Chips & GPUs' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', focus: 'AI Research & Cloud' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', focus: 'Azure AI & OpenAI' },
  { symbol: 'TSLA', name: 'Tesla Inc', focus: 'Autonomous Driving & Robotics' },
  { symbol: 'META', name: 'Meta Platforms', focus: 'AI & Virtual Reality' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', focus: 'AWS AI & Robotics (warehouses)' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', focus: 'AI Processors' },
  { symbol: 'AAPL', name: 'Apple Inc', focus: 'AI Features & Neural Engine' }
];
```

### Tier 2 (Mid Cap - Growth)
```javascript
const AI_ROBOTICS_TIER2 = [
  { symbol: 'PLTR', name: 'Palantir Technologies', focus: 'AI Data Analytics' },
  { symbol: 'AI', name: 'C3.ai Inc', focus: 'Enterprise AI Software' },
  { symbol: 'SNOW', name: 'Snowflake Inc', focus: 'AI Data Cloud' },
  { symbol: 'PATH', name: 'UiPath Inc', focus: 'Robotic Process Automation' },
  { symbol: 'U', name: 'Unity Software', focus: 'AI for 3D & Gaming' },
  { symbol: 'BBAI', name: 'BigBear.ai', focus: 'AI Decision Intelligence' }
];
```

---

## 💰 Fintech Companies

### Payment Processors
```javascript
const FINTECH_PAYMENTS = [
  { symbol: 'SQ', name: 'Block Inc (Square)', focus: 'Payment Processing' },
  { symbol: 'PYPL', name: 'PayPal Holdings', focus: 'Digital Payments' },
  { symbol: 'V', name: 'Visa Inc', focus: 'Global Payments Network' },
  { symbol: 'MA', name: 'Mastercard Inc', focus: 'Payment Technology' },
  { symbol: 'ADYEN', name: 'Adyen NV', focus: 'Payment Platform' }
];
```

### Digital Banking & Lending
```javascript
const FINTECH_BANKING = [
  { symbol: 'SOFI', name: 'SoFi Technologies', focus: 'Digital Banking' },
  { symbol: 'AFRM', name: 'Affirm Holdings', focus: 'Buy Now Pay Later' },
  { symbol: 'LC', name: 'LendingClub', focus: 'Online Lending' },
  { symbol: 'UPST', name: 'Upstart Holdings', focus: 'AI Lending' },
  { symbol: 'NU', name: 'Nu Holdings', focus: 'Digital Bank (Brazil)' }
];
```

### Crypto & Blockchain
```javascript
const FINTECH_CRYPTO = [
  { symbol: 'COIN', name: 'Coinbase Global', focus: 'Crypto Exchange' },
  { symbol: 'RIOT', name: 'Riot Platforms', focus: 'Bitcoin Mining' },
  { symbol: 'MARA', name: 'Marathon Digital', focus: 'Bitcoin Mining' },
  { symbol: 'MSTR', name: 'MicroStrategy', focus: 'Bitcoin Holdings' }
];
```

---

## 🔋 Electric Vehicles (EVs)

### Pure EV Makers
```javascript
const EV_PURE_PLAY = [
  { symbol: 'TSLA', name: 'Tesla Inc', focus: 'Premium EVs & Batteries' },
  { symbol: 'RIVN', name: 'Rivian Automotive', focus: 'Electric Trucks & SUVs' },
  { symbol: 'LCID', name: 'Lucid Group', focus: 'Luxury Electric Sedans' },
  { symbol: 'NIO', name: 'NIO Inc', focus: 'Chinese Premium EVs' },
  { symbol: 'XPEV', name: 'XPeng Inc', focus: 'Smart EVs (China)' },
  { symbol: 'LI', name: 'Li Auto Inc', focus: 'Extended Range EVs' }
];
```

### Traditional Auto + EV
```javascript
const EV_LEGACY = [
  { symbol: 'F', name: 'Ford Motor', focus: 'F-150 Lightning, Mustang Mach-E' },
  { symbol: 'GM', name: 'General Motors', focus: 'Ultium Battery Platform' },
  { symbol: 'STLA', name: 'Stellantis', focus: 'Multi-brand EV Strategy' },
  { symbol: 'BMW', name: 'BMW', focus: 'i Series EVs' }
];
```

### EV Charging Infrastructure
```javascript
const EV_CHARGING = [
  { symbol: 'CHPT', name: 'ChargePoint Holdings', focus: 'EV Charging Network' },
  { symbol: 'BLNK', name: 'Blink Charging', focus: 'Charging Stations' },
  { symbol: 'EVGO', name: 'EVgo Inc', focus: 'Fast Charging Network' }
];
```

---

## 🌱 Green Energy / Renewables

### Solar Energy
```javascript
const GREEN_SOLAR = [
  { symbol: 'ENPH', name: 'Enphase Energy', focus: 'Solar Microinverters' },
  { symbol: 'SEDG', name: 'SolarEdge Technologies', focus: 'Solar Inverters' },
  { symbol: 'FSLR', name: 'First Solar', focus: 'Solar Panel Manufacturing' },
  { symbol: 'SPWR', name: 'SunPower Corporation', focus: 'Residential Solar' },
  { symbol: 'RUN', name: 'Sunrun Inc', focus: 'Solar Installation' }
];
```

### Hydrogen & Fuel Cells
```javascript
const GREEN_HYDROGEN = [
  { symbol: 'PLUG', name: 'Plug Power', focus: 'Hydrogen Fuel Cells' },
  { symbol: 'BE', name: 'Bloom Energy', focus: 'Fuel Cell Systems' },
  { symbol: 'BLDP', name: 'Ballard Power Systems', focus: 'Fuel Cell Tech' },
  { symbol: 'FCEL', name: 'FuelCell Energy', focus: 'Stationary Fuel Cells' }
];
```

### Wind & Utilities
```javascript
const GREEN_WIND = [
  { symbol: 'NEE', name: 'NextEra Energy', focus: 'Wind & Solar Utility' },
  { symbol: 'VWDRY', name: 'Vestas Wind Systems', focus: 'Wind Turbines' },
  { symbol: 'ORSTED', name: 'Ørsted', focus: 'Offshore Wind' }
];
```

---

## 💊 Healthcare Tech

### Digital Health
```javascript
const HEALTHCARE_DIGITAL = [
  { symbol: 'TDOC', name: 'Teladoc Health', focus: 'Telemedicine Platform' },
  { symbol: 'DOCS', name: 'Doximity', focus: 'Doctor Network' },
  { symbol: 'ONEM', name: '1Life Healthcare (One Medical)', focus: 'Primary Care' },
  { symbol: 'HIMS', name: 'Hims & Hers Health', focus: 'Telehealth & Wellness' }
];
```

### Medical Devices & Robotics
```javascript
const HEALTHCARE_DEVICES = [
  { symbol: 'ISRG', name: 'Intuitive Surgical', focus: 'Surgical Robots (da Vinci)' },
  { symbol: 'DXCM', name: 'DexCom Inc', focus: 'Continuous Glucose Monitors' },
  { symbol: 'PODD', name: 'Insulet Corporation', focus: 'Insulin Pumps' },
  { symbol: 'HOLX', name: 'Hologic Inc', focus: 'Medical Imaging' },
  { symbol: 'GMED', name: 'Globus Medical', focus: 'Spine Robotics' }
];
```

### Health IT
```javascript
const HEALTHCARE_IT = [
  { symbol: 'VEEV', name: 'Veeva Systems', focus: 'Pharma Cloud Software' },
  { symbol: 'CERT', name: 'Certara Inc', focus: 'Drug Development Software' },
  { symbol: 'PHR', name: 'Phreesia Inc', focus: 'Patient Intake Software' }
];
```

---

## 💻 Semiconductors / Chips

### GPU & AI Chips
```javascript
const SEMIS_AI = [
  { symbol: 'NVDA', name: 'NVIDIA', focus: 'AI GPUs' },
  { symbol: 'AMD', name: 'AMD', focus: 'CPUs & GPUs' },
  { symbol: 'INTC', name: 'Intel', focus: 'CPUs & Data Center' },
  { symbol: 'AVGO', name: 'Broadcom', focus: 'AI Networking Chips' }
];
```

### Foundries (Manufacturing)
```javascript
const SEMIS_FOUNDRY = [
  { symbol: 'TSM', name: 'Taiwan Semiconductor (TSMC)', focus: 'Chip Manufacturing' },
  { symbol: 'UMC', name: 'United Microelectronics', focus: 'Foundry Services' },
  { symbol: 'GFS', name: 'GlobalFoundries', focus: 'Chip Fabrication' }
];
```

### Equipment & Materials
```javascript
const SEMIS_EQUIPMENT = [
  { symbol: 'ASML', name: 'ASML Holding', focus: 'Chip Manufacturing Equipment' },
  { symbol: 'AMAT', name: 'Applied Materials', focus: 'Semiconductor Equipment' },
  { symbol: 'LRCX', name: 'Lam Research', focus: 'Wafer Fabrication Equipment' },
  { symbol: 'KLAC', name: 'KLA Corporation', focus: 'Process Control Equipment' }
];
```

---

## 🏗️ GICS Sector Classification

### Complete GICS Structure with Companies

```javascript
const GICS_FULL_CLASSIFICATION = {
  "Information Technology": {
    code: "45",
    subcategories: {
      "Software": {
        companies: ['MSFT', 'ORCL', 'ADBE', 'CRM', 'NOW', 'WDAY', 'TEAM']
      },
      "Semiconductors": {
        companies: ['NVDA', 'AMD', 'INTC', 'TSM', 'AVGO', 'QCOM', 'TXN']
      },
      "IT Services": {
        companies: ['ACN', 'IBM', 'INFY', 'WIT', 'CTSH']
      },
      "Hardware": {
        companies: ['AAPL', 'HPQ', 'DELL', 'NTAP', 'WDC']
      }
    }
  },
  
  "Health Care": {
    code: "35",
    subcategories: {
      "Biotechnology": {
        companies: ['GILD', 'VRTX', 'BIIB', 'REGN', 'MRNA', 'BNTX']
      },
      "Pharmaceuticals": {
        companies: ['JNJ', 'PFE', 'ABBV', 'MRK', 'LLY', 'BMY']
      },
      "Medical Devices": {
        companies: ['ISRG', 'DXCM', 'ABT', 'TMO', 'DHR', 'MDT']
      },
      "Health Care Technology": {
        companies: ['TDOC', 'VEEV', 'DOCS', 'HIMS']
      }
    }
  },
  
  "Financials": {
    code: "40",
    subcategories: {
      "Banks": {
        companies: ['JPM', 'BAC', 'WFC', 'C', 'USB', 'PNC']
      },
      "Fintech": {
        companies: ['SQ', 'PYPL', 'COIN', 'SOFI', 'AFRM', 'NU']
      },
      "Insurance": {
        companies: ['BRK.B', 'PGR', 'TRV', 'ALL', 'AIG']
      },
      "Asset Management": {
        companies: ['BLK', 'MS', 'GS', 'SCHW', 'TROW']
      }
    }
  },
  
  "Consumer Discretionary": {
    code: "25",
    subcategories: {
      "E-Commerce": {
        companies: ['AMZN', 'SHOP', 'EBAY', 'ETSY', 'W']
      },
      "Automotive": {
        companies: ['TSLA', 'F', 'GM', 'RIVN', 'LCID', 'NIO']
      },
      "Entertainment": {
        companies: ['DIS', 'NFLX', 'WBD', 'PARA', 'SPOT']
      },
      "Restaurants": {
        companies: ['MCD', 'SBUX', 'CMG', 'YUM', 'QSR']
      }
    }
  },
  
  "Communication Services": {
    code: "50",
    subcategories: {
      "Social Media": {
        companies: ['META', 'SNAP', 'PINS', 'RDDT']
      },
      "Streaming": {
        companies: ['NFLX', 'DIS', 'PARA', 'WBD']
      },
      "Telecom": {
        companies: ['T', 'VZ', 'TMUS', 'CMCSA']
      }
    }
  },
  
  "Industrials": {
    code: "20",
    subcategories: {
      "Aerospace": {
        companies: ['BA', 'LMT', 'RTX', 'GD', 'NOC']
      },
      "Robotics & Automation": {
        companies: ['ROK', 'EMR', 'FANUY', 'ABB']
      },
      "Logistics": {
        companies: ['UPS', 'FDX', 'XPO', 'CHRW']
      }
    }
  },
  
  "Energy": {
    code: "10",
    subcategories: {
      "Oil & Gas": {
        companies: ['XOM', 'CVX', 'COP', 'SLB', 'EOG']
      },
      "Clean Energy": {
        companies: ['NEE', 'ENPH', 'SEDG', 'FSLR', 'PLUG']
      },
      "Utilities": {
        companies: ['NEE', 'DUK', 'SO', 'D', 'AEP']
      }
    }
  }
};
```

---

## 🎯 Curated Theme-Based Lists

### 🚀 "Innovation Leaders" (High Growth Tech)
```javascript
const INNOVATION_LEADERS = [
  'NVDA',  // AI Chips
  'TSLA',  // EVs & Autonomy
  'COIN',  // Crypto
  'PLTR',  // AI Software
  'RKLB',  // Space (Rocket Lab)
  'IONQ',  // Quantum Computing
  'PATH',  // Automation
  'AI',    // Enterprise AI
  'SNOW',  // Data Cloud
  'DDOG'   // Cloud Monitoring
];
```

### 💎 "Undervalued Tech" (Low P/E, High Potential)
```javascript
const UNDERVALUED_TECH = [
  'INTC',  // Intel (turnaround story)
  'QCOM',  // Qualcomm
  'WDC',   // Western Digital
  'HPE',   // Hewlett Packard Enterprise
  'CSCO',  // Cisco
  'IBM',   // IBM (hybrid cloud)
  'ORCL'   // Oracle
];
```

### 🌟 "Emerging Giants" (Small/Mid Cap with Potential)
```javascript
const EMERGING_GIANTS = [
  'IONQ',  // Quantum Computing
  'RKLB', // Space Launch
  'SOFI',  // Fintech Banking
  'BBAI',  // AI Decision Intelligence
  'CHPT',  // EV Charging
  'HIMS',  // Digital Health
  'U',     // Unity (3D/Gaming)
  'DOCS'   // Healthcare Network
];
```

### 🛡️ "Defensive Tech" (Stable, Dividends)
```javascript
const DEFENSIVE_TECH = [
  'AAPL',  // Apple
  'MSFT',  // Microsoft
  'CSCO',  // Cisco
  'IBM',   // IBM
  'INTC',  // Intel
  'ORCL',  // Oracle
  'TXN',   // Texas Instruments
  'AVGO'   // Broadcom
];
```

---

## 📈 How to Use This Data

### 1. **Hardcode for Quick Start**

```typescript
// lib/data/companies.ts
export const COMPANY_DATABASE = {
  'AI & Robotics': [
    { symbol: 'NVDA', name: 'NVIDIA', sector: 'Technology' },
    { symbol: 'GOOGL', name: 'Alphabet', sector: 'Technology' },
    // ... more
  ],
  'Fintech': [
    { symbol: 'SQ', name: 'Block', sector: 'Financials' },
    // ... more
  ]
};

// Usage
export function getCompaniesByCategory(category: string) {
  return COMPANY_DATABASE[category] || [];
}
```

### 2. **Fetch Real-Time Data for These Symbols**

```typescript
import { getCompaniesByCategory } from '@/lib/data/companies';

async function getAIStocksWithPrices() {
  const companies = getCompaniesByCategory('AI & Robotics');
  const symbols = companies.map(c => c.symbol);
  
  // Fetch live prices
  const quotes = await fetch(
    `/api/stocks/quote?batch=${symbols.join(',')}`
  ).then(r => r.json());
  
  // Merge data
  return companies.map((c, idx) => ({
    ...c,
    price: quotes[idx].price,
    change: quotes[idx].changePercent
  }));
}
```

### 3. **Build Stock Screener**

```typescript
function filterStocks(criteria: {
  category?: string;
  minMarketCap?: number;
  maxPE?: number;
  minGrowth?: number;
}) {
  let stocks = getAllStocks();
  
  if (criteria.category) {
    stocks = getCompaniesByCategory(criteria.category);
  }
  
  // Apply filters (you'll need to fetch fundamentals)
  return stocks.filter(stock => {
    // Filter logic here
    return true;
  });
}
```

---

## 🆓 Where to Get Company Logos

### Method 1: Clearbit (FREE, No Key)
```javascript
const logoUrl = `https://logo.clearbit.com/${companyDomain}`;
// Example: https://logo.clearbit.com/nvidia.com
```

### Method 2: Company Domain Mapping
```javascript
const COMPANY_DOMAINS = {
  'NVDA': 'nvidia.com',
  'TSLA': 'tesla.com',
  'AAPL': 'apple.com',
  'GOOGL': 'google.com',
  'MSFT': 'microsoft.com',
  // ... add more as needed
};

function getCompanyLogo(symbol: string) {
  const domain = COMPANY_DOMAINS[symbol];
  return domain 
    ? `https://logo.clearbit.com/${domain}`
    : '/placeholder-logo.png';
}
```

### Method 3: Finnhub Logo API
```javascript
// Returns logo URL in company profile
const profile = await fetch(
  `https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=YOUR_KEY`
).then(r => r.json());

const logoUrl = profile.logo; // Direct logo URL!
```

---

## 💡 Pro Tips

### Tip 1: Start Small
Don't try to load 500 stocks at once. Start with:
- 8-10 companies per category
- Top 5 trending stocks
- User's watchlist (5-20 stocks)

### Tip 2: Progressive Enhancement
```typescript
// Phase 1: Hardcoded mock data
const stocks = MOCK_DATA;

// Phase 2: Static company list + live prices
const stocks = await addLivePrices(HARDCODED_COMPANIES);

// Phase 3: Full dynamic with trending detection
const stocks = await getTrendingStocks();
```

### Tip 3: Category Synonyms
```typescript
const CATEGORY_ALIASES = {
  'AI': 'AI & Robotics',
  'Artificial Intelligence': 'AI & Robotics',
  'Machine Learning': 'AI & Robotics',
  'EVs': 'Electric Vehicles',
  'Electric Cars': 'Electric Vehicles',
  'Crypto': 'Fintech',
  'Blockchain': 'Fintech'
};
```

---

## 📊 Sample Database Structure

```typescript
interface CompanyData {
  symbol: string;
  name: string;
  sector: string;
  category: string[];
  description: string;
  marketCap?: number;
  founded?: number;
  website?: string;
  tags: string[];
}

const COMPANY_FULL_DATA: CompanyData[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Information Technology',
    category: ['AI & Robotics', 'Semiconductors'],
    description: 'Designs GPUs and AI chips for gaming, data centers, and autonomous vehicles.',
    founded: 1993,
    website: 'nvidia.com',
    tags: ['AI', 'GPU', 'Data Center', 'Gaming', 'Autonomous']
  },
  // ... more companies
];
```

---

## ✅ Quick Reference: Symbol Lookup

```
Tech Giants:
AAPL - Apple
MSFT - Microsoft  
GOOGL - Google (Alphabet)
AMZN - Amazon
META - Meta (Facebook)
NFLX - Netflix
TSLA - Tesla

AI Leaders:
NVDA - NVIDIA
AMD - AMD
PLTR - Palantir
AI - C3.ai
SNOW - Snowflake

Fintech:
SQ - Block (Square)
PYPL - PayPal
COIN - Coinbase
SOFI - SoFi
AFRM - Affirm

EVs:
TSLA - Tesla
RIVN - Rivian
LCID - Lucid
NIO - NIO
XPEV - XPeng

Green Energy:
ENPH - Enphase
SEDG - SolarEdge
FSLR - First Solar
PLUG - Plug Power
```

---

**You now have everything you need to build a comprehensive stock database!** 🎉

Use these lists as your foundation, fetch live prices via APIs, and build an amazing investor platform! 🚀
