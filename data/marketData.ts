import { AssetMarketData, LiabilityMarketData } from '../types/assets';

export const ASSET_MARKET_DATA: AssetMarketData[] = [
  // === STOCKS ===
  {
    id: 'dbs',
    name: 'DBS Bank',
    symbol: 'DBS',
    type: 'stock',
    currentPrice: 35.50,
    previousPrice: 35.20,
    riskLevel: 'low',
    volatility: 0.02,
    annualReturn: 5.5,
    minInvestment: 1000,
    description: 'Singapore\'s largest bank. Stable dividend yields of ~4-5% annually.',
    emoji: '🏦'
  },
  {
    id: 'ocbc',
    name: 'OCBC Bank',
    symbol: 'OCBC',
    type: 'stock',
    currentPrice: 12.80,
    previousPrice: 12.65,
    riskLevel: 'low',
    volatility: 0.015,
    annualReturn: 4.8,
    minInvestment: 1000,
    description: 'Established bank with strong fundamentals and consistent dividends.',
    emoji: '🏦'
  },
  {
    id: 'uob',
    name: 'UOB Bank',
    symbol: 'UOB',
    type: 'stock',
    currentPrice: 28.90,
    previousPrice: 28.50,
    riskLevel: 'low',
    volatility: 0.018,
    annualReturn: 5.2,
    minInvestment: 1000,
    description: 'Major regional bank with growth potential and steady returns.',
    emoji: '🏦'
  },
  {
    id: 'singtel',
    name: 'Singtel',
    symbol: 'ST',
    type: 'stock',
    currentPrice: 3.45,
    previousPrice: 3.50,
    riskLevel: 'low',
    volatility: 0.02,
    annualReturn: 4.2,
    minInvestment: 1000,
    description: 'Singapore\'s largest telecom provider with stable dividend income.',
    emoji: '📱'
  },
  {
    id: 'sea',
    name: 'Sea Limited',
    symbol: 'SE',
    type: 'stock',
    currentPrice: 85.20,
    previousPrice: 82.10,
    riskLevel: 'high',
    volatility: 0.08,
    annualReturn: 15,
    minInvestment: 5000,
    description: 'E-commerce and fintech giant. High growth potential but volatile.',
    emoji: '🛒'
  },
  {
    id: 'grab',
    name: 'Grab Holdings',
    symbol: 'GRAB',
    type: 'stock',
    currentPrice: 4.50,
    previousPrice: 4.35,
    riskLevel: 'high',
    volatility: 0.1,
    annualReturn: 18,
    minInvestment: 5000,
    description: 'Ride-hailing and delivery platform. Volatile but growing rapidly.',
    emoji: '🚗'
  },

  // === BONDS ===
  {
    id: 'sgb',
    name: 'Singapore Government Bonds',
    symbol: 'SGB',
    type: 'bond',
    currentPrice: 100,
    previousPrice: 100,
    riskLevel: 'low',
    volatility: 0.005,
    annualReturn: 2.8,
    minInvestment: 5000,
    description: 'Safe investment backed by Singapore government. Guaranteed returns.',
    emoji: '🏛️'
  },
  {
    id: 'corporate_bond',
    name: 'Corporate Bonds',
    symbol: 'CORP',
    type: 'bond',
    currentPrice: 98.50,
    previousPrice: 99.00,
    riskLevel: 'medium',
    volatility: 0.03,
    annualReturn: 5.0,
    minInvestment: 5000,
    description: 'Higher yield than government bonds with moderate risk.',
    emoji: '📜'
  },
  {
    id: 'treasury_bills',
    name: 'Singapore T-Bills',
    symbol: 'T-BILL',
    type: 'bond',
    currentPrice: 100,
    previousPrice: 100,
    riskLevel: 'low',
    volatility: 0.002,
    annualReturn: 3.5,
    minInvestment: 1000,
    description: 'Short-term government securities. Very safe with decent returns.',
    emoji: '💵'
  },

  // === CRYPTOCURRENCY ===
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    type: 'crypto',
    currentPrice: 45000,
    previousPrice: 43000,
    riskLevel: 'high',
    volatility: 0.15,
    annualReturn: 25,
    minInvestment: 10000,
    description: 'The original cryptocurrency. Highly volatile with potential for massive gains or losses.',
    emoji: '₿'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    type: 'crypto',
    currentPrice: 2500,
    previousPrice: 2400,
    riskLevel: 'high',
    volatility: 0.18,
    annualReturn: 30,
    minInvestment: 5000,
    description: 'Smart contract platform. High volatility but strong ecosystem.',
    emoji: '⟠'
  },

  // === REITs ===
  {
    id: 'ascendas_reit',
    name: 'Ascendas REIT',
    symbol: 'AREIT',
    type: 'reit',
    currentPrice: 3.20,
    previousPrice: 3.15,
    riskLevel: 'low',
    volatility: 0.025,
    annualReturn: 6.5,
    minInvestment: 3000,
    description: 'Industrial and business space REIT. Stable dividends of ~6% annually.',
    emoji: '🏢'
  },
  {
    id: 'capitaland_reit',
    name: 'CapitaLand Integrated Commercial Trust',
    symbol: 'CICT',
    type: 'reit',
    currentPrice: 2.10,
    previousPrice: 2.08,
    riskLevel: 'low',
    volatility: 0.02,
    annualReturn: 5.8,
    minInvestment: 3000,
    description: 'Retail and office REIT. Consistent dividend payer.',
    emoji: '🏬'
  },
  {
    id: 'mapletree_reit',
    name: 'Mapletree Logistics Trust',
    symbol: 'MLT',
    type: 'reit',
    currentPrice: 1.65,
    previousPrice: 1.62,
    riskLevel: 'low',
    volatility: 0.022,
    annualReturn: 6.2,
    minInvestment: 3000,
    description: 'Logistics and warehouse REIT. Benefits from e-commerce growth.',
    emoji: '📦'
  },

  // === GOLD ===
  {
    id: 'gold_bars',
    name: 'Physical Gold',
    symbol: 'GOLD',
    type: 'gold',
    currentPrice: 2050,
    previousPrice: 2030,
    riskLevel: 'medium',
    volatility: 0.04,
    annualReturn: 4.5,
    minInvestment: 5000,
    description: 'Physical gold bars. Hedge against inflation and economic uncertainty.',
    emoji: '🥇'
  },
  {
    id: 'gold_etf',
    name: 'Gold ETF',
    symbol: 'GLD',
    type: 'gold',
    currentPrice: 180,
    previousPrice: 178,
    riskLevel: 'medium',
    volatility: 0.035,
    annualReturn: 4.0,
    minInvestment: 2000,
    description: 'Gold-backed ETF. Easier to trade than physical gold.',
    emoji: '🪙'
  },

  // === FIXED DEPOSIT ===
  {
    id: 'fixed_deposit_1y',
    name: '1-Year Fixed Deposit',
    symbol: 'FD-1Y',
    type: 'fixed_deposit',
    currentPrice: 100,
    previousPrice: 100,
    riskLevel: 'low',
    volatility: 0,
    annualReturn: 2.5,
    minInvestment: 1000,
    description: 'Bank fixed deposit for 1 year. Capital guaranteed with fixed interest.',
    emoji: '🏦'
  },
  {
    id: 'fixed_deposit_3y',
    name: '3-Year Fixed Deposit',
    symbol: 'FD-3Y',
    type: 'fixed_deposit',
    currentPrice: 100,
    previousPrice: 100,
    riskLevel: 'low',
    volatility: 0,
    annualReturn: 3.2,
    minInvestment: 5000,
    description: 'Bank fixed deposit for 3 years. Higher interest rate for longer tenure.',
    emoji: '🏦'
  },

  // === CPF INVESTMENT ===
  {
    id: 'cpf_oa',
    name: 'CPF Ordinary Account',
    symbol: 'CPF-OA',
    type: 'cpf_investment',
    currentPrice: 100,
    previousPrice: 100,
    riskLevel: 'low',
    volatility: 0,
    annualReturn: 2.5,
    minInvestment: 1000,
    description: 'CPF Ordinary Account. Guaranteed 2.5% interest from government.',
    emoji: '🏛️'
  },
  {
    id: 'cpf_sa',
    name: 'CPF Special Account',
    symbol: 'CPF-SA',
    type: 'cpf_investment',
    currentPrice: 100,
    previousPrice: 100,
    riskLevel: 'low',
    volatility: 0,
    annualReturn: 4.0,
    minInvestment: 1000,
    description: 'CPF Special Account. Guaranteed 4% interest for retirement savings.',
    emoji: '🏛️'
  }
];

export const LIABILITY_MARKET_DATA: LiabilityMarketData[] = [
  // === PRIVATE PROPERTY ===
  {
    id: 'condo_3br',
    name: '3-Bedroom Condo',
    type: 'private_property',
    price: 1200000,
    downPayment: 25, // 25% down payment
    loanTenure: 300, // 25 years
    interestRate: 3.5,
    monthlyInstallment: 4200,
    description: 'Modern 3-bedroom condominium in prime location. Appreciates over time.',
    emoji: '🏢'
  },
  {
    id: 'condo_2br',
    name: '2-Bedroom Condo',
    type: 'private_property',
    price: 900000,
    downPayment: 25,
    loanTenure: 300,
    interestRate: 3.5,
    monthlyInstallment: 3150,
    description: 'Compact 2-bedroom condo. Good for young professionals.',
    emoji: '🏢'
  },
  {
    id: 'landed_terrace',
    name: 'Terrace House',
    type: 'private_property',
    price: 2500000,
    downPayment: 25,
    loanTenure: 300,
    interestRate: 3.8,
    monthlyInstallment: 9100,
    description: 'Spacious terrace house with garden. Premium property.',
    emoji: '🏡'
  },
  {
    id: 'landed_semi_detached',
    name: 'Semi-Detached House',
    type: 'private_property',
    price: 3500000,
    downPayment: 25,
    loanTenure: 300,
    interestRate: 3.8,
    monthlyInstallment: 12740,
    description: 'Luxurious semi-detached house. Status symbol.',
    emoji: '🏠'
  },
  {
    id: 'bungalow',
    name: 'Detached Bungalow',
    type: 'private_property',
    price: 5000000,
    downPayment: 25,
    loanTenure: 300,
    interestRate: 4.0,
    monthlyInstallment: 18500,
    description: 'Ultimate luxury living. Detached bungalow with large land.',
    emoji: '🏰'
  },

  // === CARS ===
  {
    id: 'car_economy',
    name: 'Economy Car (Toyota Corolla)',
    type: 'car',
    price: 120000,
    downPayment: 20,
    loanTenure: 84, // 7 years
    interestRate: 2.8,
    monthlyInstallment: 1300,
    depreciationRate: 15, // 15% per year
    description: 'Reliable economy car. Practical for daily commute. Depreciates 15% annually.',
    emoji: '🚗'
  },
  {
    id: 'car_mid_range',
    name: 'Mid-Range Sedan (Honda Accord)',
    type: 'car',
    price: 180000,
    downPayment: 20,
    loanTenure: 84,
    interestRate: 2.8,
    monthlyInstallment: 1950,
    depreciationRate: 15,
    description: 'Comfortable mid-range sedan. Good balance of features and cost.',
    emoji: '🚙'
  },
  {
    id: 'car_suv',
    name: 'SUV (Honda CR-V)',
    type: 'car',
    price: 220000,
    downPayment: 20,
    loanTenure: 84,
    interestRate: 2.8,
    monthlyInstallment: 2380,
    depreciationRate: 15,
    description: 'Spacious SUV for families. Higher running costs.',
    emoji: '🚙'
  },
  {
    id: 'car_luxury',
    name: 'Luxury Sedan (BMW 5 Series)',
    type: 'car',
    price: 350000,
    downPayment: 20,
    loanTenure: 84,
    interestRate: 3.2,
    monthlyInstallment: 3850,
    depreciationRate: 18, // Luxury cars depreciate faster
    description: 'Premium luxury sedan. Status symbol but expensive to maintain.',
    emoji: '🚗'
  },
  {
    id: 'car_sports',
    name: 'Sports Car (Porsche 911)',
    type: 'car',
    price: 650000,
    downPayment: 20,
    loanTenure: 84,
    interestRate: 3.5,
    monthlyInstallment: 7300,
    depreciationRate: 20, // Sports cars depreciate even faster
    description: 'High-performance sports car. Extremely expensive but thrilling.',
    emoji: '🏎️'
  },

  // === LUXURY GOODS ===
  {
    id: 'luxury_watch',
    name: 'Luxury Watch (Rolex)',
    type: 'luxury_goods',
    price: 25000,
    downPayment: 0, // Usually paid in full or short installment
    loanTenure: 12,
    interestRate: 8.0,
    monthlyInstallment: 2200,
    depreciationRate: 5, // Luxury watches hold value better
    description: 'Prestigious luxury watch. Can appreciate if rare model.',
    emoji: '⌚'
  },
  {
    id: 'luxury_bag',
    name: 'Designer Handbag (Hermès)',
    type: 'luxury_goods',
    price: 15000,
    downPayment: 0,
    loanTenure: 12,
    interestRate: 8.0,
    monthlyInstallment: 1320,
    depreciationRate: 10,
    description: 'Iconic designer handbag. Status symbol.',
    emoji: '👜'
  },
  {
    id: 'luxury_jewelry',
    name: 'Diamond Jewelry',
    type: 'luxury_goods',
    price: 30000,
    downPayment: 0,
    loanTenure: 24,
    interestRate: 8.0,
    monthlyInstallment: 1450,
    depreciationRate: 8,
    description: 'Fine diamond jewelry. Holds value reasonably well.',
    emoji: '💎'
  }
];
