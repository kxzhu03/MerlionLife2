import { Player } from '../types';

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

export class InvestmentService {
  /**
   * Get available investments based on player wealth
   */
  static getAvailableInvestments(player: Player): Investment[] {
    const wealth = player.stats.wealth || 0;
    const investments: Investment[] = [];

    if (wealth >= 1000) {
      investments.push({
        id: 'stock_blue_chip',
        name: 'Blue Chip Stocks',
        type: 'stock',
        initialInvestment: 1000,
        currentValue: 1000,
        yearsHeld: 0,
        riskLevel: 'low',
        expectedReturn: 6,
        description: 'Invest in established Singapore companies (DBS, OCBC, UOB)'
      });
    }

    if (wealth >= 5000) {
      investments.push({
        id: 'property_reit',
        name: 'Property REIT',
        type: 'property',
        initialInvestment: 5000,
        currentValue: 5000,
        yearsHeld: 0,
        riskLevel: 'medium',
        expectedReturn: 5,
        description: 'Real Estate Investment Trust with regular dividends'
      });

      investments.push({
        id: 'bond_government',
        name: 'Government Bonds',
        type: 'bond',
        initialInvestment: 5000,
        currentValue: 5000,
        yearsHeld: 0,
        riskLevel: 'low',
        expectedReturn: 2.5,
        description: 'Safe investment with guaranteed returns'
      });
    }

    if (wealth >= 10000) {
      investments.push({
        id: 'stock_growth',
        name: 'Growth Stocks',
        type: 'stock',
        initialInvestment: 10000,
        currentValue: 10000,
        yearsHeld: 0,
        riskLevel: 'high',
        expectedReturn: 12,
        description: 'High-growth tech and biotech companies'
      });
    }

    if (wealth >= 50000) {
      investments.push({
        id: 'crypto_portfolio',
        name: 'Cryptocurrency Portfolio',
        type: 'crypto',
        initialInvestment: 50000,
        currentValue: 50000,
        yearsHeld: 0,
        riskLevel: 'high',
        expectedReturn: 25,
        description: 'Bitcoin, Ethereum, and other cryptocurrencies (Volatile!)'
      });
    }

    return investments;
  }

  /**
   * Make an investment
   */
  static makeInvestment(
    player: Player,
    investment: Investment
  ): { success: boolean; newPlayer: Player; message: string } {
    if ((player.stats.wealth || 0) < investment.initialInvestment) {
      return {
        success: false,
        newPlayer: player,
        message: 'Insufficient funds for this investment'
      };
    }

    const updatedPlayer = { ...player };
    updatedPlayer.stats.wealth = (updatedPlayer.stats.wealth || 0) - investment.initialInvestment;

    // Store investment in player data (simplified)
    if (!updatedPlayer.investments) {
      updatedPlayer.investments = [];
    }
    updatedPlayer.investments.push(investment);

    return {
      success: true,
      newPlayer: updatedPlayer,
      message: `Successfully invested $${investment.initialInvestment} in ${investment.name}`
    };
  }

  /**
   * Calculate investment returns after a year
   */
  static calculateYearlyReturns(investment: Investment): Investment {
    const volatility = investment.riskLevel === 'low' ? 0.02 : investment.riskLevel === 'medium' ? 0.05 : 0.15;
    const randomFactor = (Math.random() - 0.5) * 2 * volatility; // -volatility to +volatility
    const actualReturn = (investment.expectedReturn / 100 + randomFactor);

    return {
      ...investment,
      currentValue: investment.currentValue * (1 + actualReturn),
      yearsHeld: investment.yearsHeld + 1
    };
  }

  /**
   * Get investment performance
   */
  static getInvestmentPerformance(investment: Investment): {
    gain: number;
    gainPercentage: number;
    status: 'profit' | 'loss' | 'neutral';
  } {
    const gain = investment.currentValue - investment.initialInvestment;
    const gainPercentage = (gain / investment.initialInvestment) * 100;

    let status: 'profit' | 'loss' | 'neutral' = 'neutral';
    if (gain > 0) status = 'profit';
    if (gain < 0) status = 'loss';

    return { gain, gainPercentage, status };
  }

  /**
   * Sell investment
   */
  static sellInvestment(
    player: Player,
    investmentId: string
  ): { success: boolean; newPlayer: Player; proceeds: number; message: string } {
    if (!player.investments) {
      return { success: false, newPlayer: player, proceeds: 0, message: 'No investments found' };
    }

    const investmentIndex = player.investments.findIndex(inv => inv.id === investmentId);
    if (investmentIndex === -1) {
      return { success: false, newPlayer: player, proceeds: 0, message: 'Investment not found' };
    }

    const investment = player.investments[investmentIndex];
    const proceeds = Math.round(investment.currentValue);

    const updatedPlayer = { ...player };
    updatedPlayer.investments = updatedPlayer.investments!.filter((_, i) => i !== investmentIndex);
    updatedPlayer.stats.wealth = (updatedPlayer.stats.wealth || 0) + proceeds;

    const performance = this.getInvestmentPerformance(investment);

    return {
      success: true,
      newPlayer: updatedPlayer,
      proceeds,
      message: `Sold ${investment.name} for $${proceeds} (${performance.gainPercentage > 0 ? '+' : ''}${performance.gainPercentage.toFixed(1)}%)`
    };
  }

  /**
   * Get available business opportunities
   */
  static getBusinessOpportunities(player: Player): Business[] {
    const wealth = player.stats.wealth || 0;
    const businesses: Business[] = [];

    if (wealth >= 5000) {
      businesses.push({
        id: 'business_freelance',
        name: 'Freelance Consulting',
        type: 'service',
        initialInvestment: 5000,
        monthlyRevenue: 3000,
        monthlyExpenses: 500,
        yearsOperating: 0,
        employees: 1,
        successRate: 70,
        description: 'Offer consulting services in your field of expertise'
      });
    }

    if (wealth >= 20000) {
      businesses.push({
        id: 'business_ecommerce',
        name: 'E-commerce Store',
        type: 'ecommerce',
        initialInvestment: 20000,
        monthlyRevenue: 8000,
        monthlyExpenses: 3000,
        yearsOperating: 0,
        employees: 2,
        successRate: 50,
        description: 'Start an online store selling products'
      });

      businesses.push({
        id: 'business_cafe',
        name: 'Cafe/Food Business',
        type: 'retail',
        initialInvestment: 20000,
        monthlyRevenue: 10000,
        monthlyExpenses: 6000,
        yearsOperating: 0,
        employees: 3,
        successRate: 40,
        description: 'Open a small cafe or food stall'
      });
    }

    if (wealth >= 50000) {
      businesses.push({
        id: 'business_startup',
        name: 'Tech Startup',
        type: 'startup',
        initialInvestment: 50000,
        monthlyRevenue: 15000,
        monthlyExpenses: 8000,
        yearsOperating: 0,
        employees: 5,
        successRate: 30,
        description: 'Launch a technology startup with high growth potential'
      });
    }

    return businesses;
  }

  /**
   * Start a business
   */
  static startBusiness(
    player: Player,
    business: Business
  ): { success: boolean; newPlayer: Player; message: string } {
    if ((player.stats.wealth || 0) < business.initialInvestment) {
      return {
        success: false,
        newPlayer: player,
        message: 'Insufficient funds to start this business'
      };
    }

    const updatedPlayer = { ...player };
    updatedPlayer.stats.wealth = (updatedPlayer.stats.wealth || 0) - business.initialInvestment;

    if (!updatedPlayer.businesses) {
      updatedPlayer.businesses = [];
    }
    updatedPlayer.businesses.push(business);

    return {
      success: true,
      newPlayer: updatedPlayer,
      message: `Successfully started ${business.name}!`
    };
  }

  /**
   * Calculate yearly business performance
   */
  static calculateBusinessPerformance(business: Business): Business {
    const successRoll = Math.random() * 100;
    let performanceMultiplier = 1;

    if (successRoll < business.successRate) {
      // Success - business grows
      performanceMultiplier = 1 + (Math.random() * 0.3); // 1.0 to 1.3x
    } else if (successRoll < business.successRate + 20) {
      // Moderate performance
      performanceMultiplier = 0.9 + (Math.random() * 0.2); // 0.9 to 1.1x
    } else {
      // Poor performance
      performanceMultiplier = 0.5 + (Math.random() * 0.4); // 0.5 to 0.9x
    }

    return {
      ...business,
      monthlyRevenue: Math.round(business.monthlyRevenue * performanceMultiplier),
      monthlyExpenses: Math.round(business.monthlyExpenses * (0.9 + Math.random() * 0.2)),
      yearsOperating: business.yearsOperating + 1
    };
  }

  /**
   * Get business profit
   */
  static getBusinessProfit(business: Business): number {
    return (business.monthlyRevenue - business.monthlyExpenses) * 12;
  }

  /**
   * Sell business
   */
  static sellBusiness(
    player: Player,
    businessId: string
  ): { success: boolean; newPlayer: Player; proceeds: number; message: string } {
    if (!player.businesses) {
      return { success: false, newPlayer: player, proceeds: 0, message: 'No businesses found' };
    }

    const businessIndex = player.businesses.findIndex(b => b.id === businessId);
    if (businessIndex === -1) {
      return { success: false, newPlayer: player, proceeds: 0, message: 'Business not found' };
    }

    const business = player.businesses[businessIndex];
    const annualProfit = this.getBusinessProfit(business);
    const businessValue = business.initialInvestment + (annualProfit * business.yearsOperating * 2);
    const proceeds = Math.round(businessValue);

    const updatedPlayer = { ...player };
    updatedPlayer.businesses = updatedPlayer.businesses!.filter((_, i) => i !== businessIndex);
    updatedPlayer.stats.wealth = (updatedPlayer.stats.wealth || 0) + proceeds;

    return {
      success: true,
      newPlayer: updatedPlayer,
      proceeds,
      message: `Sold ${business.name} for $${proceeds}`
    };
  }
}

