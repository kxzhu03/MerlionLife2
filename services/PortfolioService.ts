import { Player } from '../types';
import { Asset, Liability, Portfolio, AssetMarketData, LiabilityMarketData } from '../types/assets';
import { ASSET_MARKET_DATA, LIABILITY_MARKET_DATA } from '../data/marketData';

export class PortfolioService {
  /**
   * Initialize empty portfolio for a player
   */
  static initializePortfolio(): Portfolio {
    return {
      assets: [],
      liabilities: [],
      totalAssetValue: 0,
      totalLiabilityValue: 0,
      netWorth: 0,
      monthlyIncome: 0,
      monthlyExpenses: 0
    };
  }

  /**
   * Buy an asset
   */
  static buyAsset(
    player: Player,
    marketData: AssetMarketData,
    quantity: number
  ): { success: boolean; message: string; updatedPlayer?: Player } {
    const totalCost = marketData.currentPrice * quantity;
    const wealth = player.stats.wealth || 0;

    if (totalCost < marketData.minInvestment) {
      return {
        success: false,
        message: `Minimum investment is $${marketData.minInvestment.toLocaleString()}`
      };
    }

    if (wealth < totalCost) {
      return {
        success: false,
        message: `Insufficient funds. You need $${totalCost.toLocaleString()} but have $${wealth.toLocaleString()}`
      };
    }

    const portfolio = player.portfolio || this.initializePortfolio();

    const newAsset: Asset = {
      id: `${marketData.id}_${Date.now()}`,
      name: marketData.name,
      type: marketData.type,
      purchasePrice: marketData.currentPrice,
      currentValue: marketData.currentPrice * quantity,
      quantity,
      purchaseDate: new Date(),
      annualReturn: marketData.annualReturn,
      riskLevel: marketData.riskLevel,
      description: marketData.description
    };

    portfolio.assets.push(newAsset);

    const updatedPlayer: Player = {
      ...player,
      stats: {
        ...player.stats,
        wealth: wealth - totalCost
      },
      portfolio: this.recalculatePortfolio(portfolio)
    };

    return {
      success: true,
      message: `Successfully purchased ${quantity} units of ${marketData.name} for $${totalCost.toLocaleString()}`,
      updatedPlayer
    };
  }

  /**
   * Buy a liability (car, property, etc.)
   */
  static buyLiability(
    player: Player,
    marketData: LiabilityMarketData
  ): { success: boolean; message: string; updatedPlayer?: Player } {
    const wealth = player.stats.wealth || 0;
    const downPaymentAmount = (marketData.price * marketData.downPayment) / 100;
    const loanAmount = marketData.price - downPaymentAmount;

    if (wealth < downPaymentAmount) {
      return {
        success: false,
        message: `Insufficient funds for down payment. You need $${downPaymentAmount.toLocaleString()} but have $${wealth.toLocaleString()}`
      };
    }

    const portfolio = player.portfolio || this.initializePortfolio();

    // Check if monthly installment is affordable (shouldn't exceed 40% of monthly income)
    const monthlyIncome = (player.careerData?.salary || 0) / 12;
    const totalMonthlyExpenses = portfolio.monthlyExpenses + marketData.monthlyInstallment;
    
    if (totalMonthlyExpenses > monthlyIncome * 0.4 && monthlyIncome > 0) {
      return {
        success: false,
        message: `Monthly installment too high. Total expenses would be ${((totalMonthlyExpenses / monthlyIncome) * 100).toFixed(0)}% of income (max 40%)`
      };
    }

    const newLiability: Liability = {
      id: `${marketData.id}_${Date.now()}`,
      name: marketData.name,
      type: marketData.type,
      purchasePrice: marketData.price,
      currentValue: marketData.price,
      loanAmount,
      monthlyInstallment: marketData.monthlyInstallment,
      remainingMonths: marketData.loanTenure,
      interestRate: marketData.interestRate,
      purchaseDate: new Date(),
      depreciationRate: marketData.depreciationRate,
      description: marketData.description
    };

    portfolio.liabilities.push(newLiability);

    const updatedPlayer: Player = {
      ...player,
      stats: {
        ...player.stats,
        wealth: wealth - downPaymentAmount
      },
      portfolio: this.recalculatePortfolio(portfolio)
    };

    return {
      success: true,
      message: `Successfully purchased ${marketData.name} with $${downPaymentAmount.toLocaleString()} down payment. Monthly installment: $${marketData.monthlyInstallment.toLocaleString()}`,
      updatedPlayer
    };
  }

  /**
   * Sell an asset
   */
  static sellAsset(
    player: Player,
    assetId: string
  ): { success: boolean; message: string; updatedPlayer?: Player } {
    const portfolio = player.portfolio;
    if (!portfolio) {
      return { success: false, message: 'No portfolio found' };
    }

    const assetIndex = portfolio.assets.findIndex(a => a.id === assetId);
    if (assetIndex === -1) {
      return { success: false, message: 'Asset not found' };
    }

    const asset = portfolio.assets[assetIndex];
    const saleValue = asset.currentValue;
    
    // Remove asset
    portfolio.assets.splice(assetIndex, 1);

    const updatedPlayer: Player = {
      ...player,
      stats: {
        ...player.stats,
        wealth: (player.stats.wealth || 0) + saleValue
      },
      portfolio: this.recalculatePortfolio(portfolio)
    };

    const profit = saleValue - (asset.purchasePrice * asset.quantity);
    const profitMsg = profit >= 0 
      ? `Profit: $${profit.toLocaleString()}`
      : `Loss: $${Math.abs(profit).toLocaleString()}`;

    return {
      success: true,
      message: `Sold ${asset.name} for $${saleValue.toLocaleString()}. ${profitMsg}`,
      updatedPlayer
    };
  }

  /**
   * Apply annual returns to all assets
   */
  static applyAnnualReturns(player: Player): Player {
    const portfolio = player.portfolio;
    if (!portfolio || portfolio.assets.length === 0) {
      return player;
    }

    let totalReturns = 0;

    portfolio.assets = portfolio.assets.map(asset => {
      // Calculate return with some randomness based on volatility
      const marketData = ASSET_MARKET_DATA.find(m => m.type === asset.type);
      const volatility = marketData?.volatility || 0.05;
      const randomFactor = 1 + (Math.random() - 0.5) * volatility * 2;
      
      const returnRate = (asset.annualReturn / 100) * randomFactor;
      const returnAmount = asset.currentValue * returnRate;
      
      totalReturns += returnAmount;

      return {
        ...asset,
        currentValue: asset.currentValue * (1 + returnRate)
      };
    });

    // Apply depreciation to liabilities (cars, etc.)
    portfolio.liabilities = portfolio.liabilities.map(liability => {
      if (liability.depreciationRate) {
        const depreciationAmount = liability.currentValue * (liability.depreciationRate / 100);
        return {
          ...liability,
          currentValue: Math.max(0, liability.currentValue - depreciationAmount)
        };
      }
      return liability;
    });

    const updatedPortfolio = this.recalculatePortfolio(portfolio);

    return {
      ...player,
      stats: {
        ...player.stats,
        wealth: (player.stats.wealth || 0) + totalReturns
      },
      portfolio: updatedPortfolio
    };
  }

  /**
   * Process monthly loan payments
   */
  static processMonthlyPayments(player: Player): Player {
    const portfolio = player.portfolio;
    if (!portfolio || portfolio.liabilities.length === 0) {
      return player;
    }

    let totalPayment = 0;
    const updatedLiabilities: Liability[] = [];

    portfolio.liabilities.forEach(liability => {
      if (liability.remainingMonths > 0) {
        totalPayment += liability.monthlyInstallment;
        
        // Calculate principal and interest
        const monthlyInterestRate = liability.interestRate / 100 / 12;
        const interestPayment = liability.loanAmount * monthlyInterestRate;
        const principalPayment = liability.monthlyInstallment - interestPayment;
        
        const updatedLiability: Liability = {
          ...liability,
          loanAmount: Math.max(0, liability.loanAmount - principalPayment),
          remainingMonths: liability.remainingMonths - 1
        };

        // Only keep liabilities that aren't fully paid
        if (updatedLiability.remainingMonths > 0 || updatedLiability.loanAmount > 0) {
          updatedLiabilities.push(updatedLiability);
        }
      }
    });

    portfolio.liabilities = updatedLiabilities;

    return {
      ...player,
      stats: {
        ...player.stats,
        wealth: (player.stats.wealth || 0) - totalPayment
      },
      portfolio: this.recalculatePortfolio(portfolio)
    };
  }

  /**
   * Recalculate portfolio totals
   */
  private static recalculatePortfolio(portfolio: Portfolio): Portfolio {
    const totalAssetValue = portfolio.assets.reduce((sum, asset) => sum + asset.currentValue, 0);
    const totalLiabilityValue = portfolio.liabilities.reduce((sum, liability) => sum + liability.loanAmount, 0);
    const monthlyExpenses = portfolio.liabilities.reduce((sum, liability) => sum + liability.monthlyInstallment, 0);
    
    // Calculate monthly income from dividends (simplified: annual return / 12)
    const monthlyIncome = portfolio.assets.reduce((sum, asset) => {
      const monthlyReturn = (asset.currentValue * asset.annualReturn / 100) / 12;
      return sum + monthlyReturn;
    }, 0);

    return {
      ...portfolio,
      totalAssetValue,
      totalLiabilityValue,
      netWorth: totalAssetValue - totalLiabilityValue,
      monthlyIncome,
      monthlyExpenses
    };
  }

  /**
   * Get available assets based on player wealth
   */
  static getAvailableAssets(player: Player): AssetMarketData[] {
    const wealth = player.stats.wealth || 0;
    return ASSET_MARKET_DATA.filter(asset => wealth >= asset.minInvestment);
  }

  /**
   * Get available liabilities based on player wealth and income
   */
  static getAvailableLiabilities(player: Player): LiabilityMarketData[] {
    const wealth = player.stats.wealth || 0;
    return LIABILITY_MARKET_DATA.filter(liability => {
      const downPayment = (liability.price * liability.downPayment) / 100;
      return wealth >= downPayment;
    });
  }
}
