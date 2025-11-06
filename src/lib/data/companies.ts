// Company Database - Organized by Categories
export interface Company {
  symbol: string;
  name: string;
  sector: string;
  categories: string[];
  description: string;
}

export const COMPANY_DATABASE: Record<string, Company[]> = {
  'AI & Robotics': [
    { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology', categories: ['AI & Robotics', 'Semiconductors'], description: 'Leading AI computing and GPU manufacturer' },
    { symbol: 'GOOGL', name: 'Alphabet Inc', sector: 'Technology', categories: ['AI & Robotics'], description: 'AI research and cloud services' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', categories: ['AI & Robotics'], description: 'Azure AI and OpenAI partnership' },
    { symbol: 'TSLA', name: 'Tesla Inc', sector: 'Automotive', categories: ['AI & Robotics', 'Electric Vehicles'], description: 'Autonomous driving and robotics' },
    { symbol: 'META', name: 'Meta Platforms', sector: 'Technology', categories: ['AI & Robotics'], description: 'AI and virtual reality' },
    { symbol: 'AMZN', name: 'Amazon.com Inc', sector: 'Consumer', categories: ['AI & Robotics'], description: 'AWS AI and warehouse robotics' },
    { symbol: 'AMD', name: 'Advanced Micro Devices', sector: 'Technology', categories: ['AI & Robotics', 'Semiconductors'], description: 'AI processors and GPUs' },
    { symbol: 'PLTR', name: 'Palantir Technologies', sector: 'Technology', categories: ['AI & Robotics'], description: 'AI data analytics platform' }
  ],

  'Fintech': [
    { symbol: 'SQ', name: 'Block Inc', sector: 'Financials', categories: ['Fintech'], description: 'Payment processing and financial services' },
    { symbol: 'PYPL', name: 'PayPal Holdings', sector: 'Financials', categories: ['Fintech'], description: 'Digital payments platform' },
    { symbol: 'COIN', name: 'Coinbase Global', sector: 'Financials', categories: ['Fintech'], description: 'Cryptocurrency exchange' },
    { symbol: 'SOFI', name: 'SoFi Technologies', sector: 'Financials', categories: ['Fintech'], description: 'Digital banking and lending' },
    { symbol: 'V', name: 'Visa Inc', sector: 'Financials', categories: ['Fintech'], description: 'Global payments network' },
    { symbol: 'MA', name: 'Mastercard Inc', sector: 'Financials', categories: ['Fintech'], description: 'Payment technology' }
  ],

  'Electric Vehicles': [
    { symbol: 'TSLA', name: 'Tesla Inc', sector: 'Automotive', categories: ['Electric Vehicles', 'AI & Robotics'], description: 'Premium electric vehicles and batteries' },
    { symbol: 'RIVN', name: 'Rivian Automotive', sector: 'Automotive', categories: ['Electric Vehicles'], description: 'Electric trucks and SUVs' },
    { symbol: 'LCID', name: 'Lucid Group', sector: 'Automotive', categories: ['Electric Vehicles'], description: 'Luxury electric sedans' },
    { symbol: 'NIO', name: 'NIO Inc', sector: 'Automotive', categories: ['Electric Vehicles'], description: 'Chinese premium EVs' },
    { symbol: 'F', name: 'Ford Motor', sector: 'Automotive', categories: ['Electric Vehicles'], description: 'F-150 Lightning and Mustang Mach-E' },
    { symbol: 'GM', name: 'General Motors', sector: 'Automotive', categories: ['Electric Vehicles'], description: 'Ultium battery platform' }
  ],

  'Green Energy': [
    { symbol: 'ENPH', name: 'Enphase Energy', sector: 'Energy', categories: ['Green Energy'], description: 'Solar microinverters' },
    { symbol: 'SEDG', name: 'SolarEdge Technologies', sector: 'Energy', categories: ['Green Energy'], description: 'Solar inverters and optimizers' },
    { symbol: 'FSLR', name: 'First Solar', sector: 'Energy', categories: ['Green Energy'], description: 'Solar panel manufacturing' },
    { symbol: 'PLUG', name: 'Plug Power', sector: 'Energy', categories: ['Green Energy'], description: 'Hydrogen fuel cells' },
    { symbol: 'NEE', name: 'NextEra Energy', sector: 'Utilities', categories: ['Green Energy'], description: 'Wind and solar utility' }
  ],

  'Healthcare Tech': [
    { symbol: 'TDOC', name: 'Teladoc Health', sector: 'Healthcare', categories: ['Healthcare Tech'], description: 'Telemedicine platform' },
    { symbol: 'ISRG', name: 'Intuitive Surgical', sector: 'Healthcare', categories: ['Healthcare Tech'], description: 'Surgical robots (da Vinci)' },
    { symbol: 'DXCM', name: 'DexCom Inc', sector: 'Healthcare', categories: ['Healthcare Tech'], description: 'Continuous glucose monitors' },
    { symbol: 'VEEV', name: 'Veeva Systems', sector: 'Healthcare', categories: ['Healthcare Tech'], description: 'Pharma cloud software' }
  ],

  'Semiconductors': [
    { symbol: 'NVDA', name: 'NVIDIA', sector: 'Technology', categories: ['Semiconductors', 'AI & Robotics'], description: 'AI GPUs and chips' },
    { symbol: 'AMD', name: 'AMD', sector: 'Technology', categories: ['Semiconductors', 'AI & Robotics'], description: 'CPUs and GPUs' },
    { symbol: 'INTC', name: 'Intel', sector: 'Technology', categories: ['Semiconductors'], description: 'CPUs and data center chips' },
    { symbol: 'TSM', name: 'Taiwan Semiconductor', sector: 'Technology', categories: ['Semiconductors'], description: 'Chip manufacturing foundry' },
    { symbol: 'AVGO', name: 'Broadcom', sector: 'Technology', categories: ['Semiconductors'], description: 'AI networking chips' },
    { symbol: 'QCOM', name: 'Qualcomm', sector: 'Technology', categories: ['Semiconductors'], description: 'Mobile and automotive chips' }
  ]
};

export const ALL_COMPANIES: Company[] = Object.values(COMPANY_DATABASE).flat();

export const UNIQUE_COMPANIES = Array.from(
  new Map(ALL_COMPANIES.map(c => [c.symbol, c])).values()
);

export function getCompaniesByCategory(category: string): Company[] {
  return COMPANY_DATABASE[category] || [];
}

export function getAllCategories(): string[] {
  return Object.keys(COMPANY_DATABASE);
}

export function getCompanyBySymbol(symbol: string): Company | undefined {
  return UNIQUE_COMPANIES.find(c => c.symbol === symbol);
}

export function searchCompanies(query: string): Company[] {
  const lowerQuery = query.toLowerCase();
  return UNIQUE_COMPANIES.filter(
    c => c.name.toLowerCase().includes(lowerQuery) ||
         c.symbol.toLowerCase().includes(lowerQuery) ||
         c.categories.some(cat => cat.toLowerCase().includes(lowerQuery))
  );
}
