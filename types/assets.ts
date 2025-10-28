export type AssetType = 
  | 'stock' 
  | 'bond' 
  | 'crypto' 
  | 'reit' 
  | 'gold' 
  | 'fixed_deposit'
  | 'cpf_investment';

export type LiabilityType =
  | 'private_property'
  | 'car'
  | 'luxury_goods'
  | 'personal_loan';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  purchasePrice: number;
  currentValue: number;
  quantity: number;
  purchaseDate: Date;
  annualReturn: number; // percentage
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}

export interface Liability {
  id: string;
  name: string;
  type: LiabilityType;
  purchasePrice: number;
  currentValue: number;
  loanAmount: number;
  monthlyInstallment: number;
  remainingMonths: number;
  interestRate: number; // percentage
  purchaseDate: Date;
  depreciationRate?: number; // percentage per year (for cars)
  description: string;
}

export interface Portfolio {
  assets: Asset[];
  liabilities: Liability[];
  totalAssetValue: number;
  totalLiabilityValue: number;
  netWorth: number;
  monthlyIncome: number; // from dividends, interest
  monthlyExpenses: number; // loan installments
}

export interface AssetMarketData {
  id: string;
  name: string;
  symbol: string;
  type: AssetType;
  currentPrice: number;
  previousPrice: number;
  riskLevel: 'low' | 'medium' | 'high';
  volatility: number;
  annualReturn: number; // expected annual return %
  minInvestment: number;
  description: string;
  emoji: string;
}

export interface LiabilityMarketData {
  id: string;
  name: string;
  type: LiabilityType;
  price: number;
  downPayment: number; // percentage
  loanTenure: number; // months
  interestRate: number; // percentage
  monthlyInstallment: number;
  depreciationRate?: number; // for cars
  description: string;
  emoji: string;
}
