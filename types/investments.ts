// Shared investment and business types used by InvestmentService and Player

export interface Investment {
  id: string;
  name: string;
  type: 'stock' | 'property' | 'business' | 'crypto' | 'bond';
  initialInvestment: number;
  currentValue: number;
  yearsHeld: number;
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number; // percentage
  description: string;
}

export interface Business {
  id: string;
  name: string;
  type: 'startup' | 'ecommerce' | 'service' | 'retail';
  initialInvestment: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  yearsOperating: number;
  employees: number;
  successRate: number; // 0-100
  description: string;
}
