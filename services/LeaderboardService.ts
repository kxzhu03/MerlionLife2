import { Player } from '../types';

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  score: number;
  category: 'wealth' | 'happiness' | 'achievements' | 'overall';
  age: number;
  career?: string;
  timestamp: number;
}

export interface PlayerScore {
  wealthScore: number;
  happinessScore: number;
  achievementScore: number;
  careerScore: number;
  familyScore: number;
  healthScore: number;
  overallScore: number;
}

export class LeaderboardService {
  /**
   * Calculate comprehensive player score
   */
  static calculatePlayerScore(player: Player): PlayerScore {
    const wealthScore = Math.min(100, ((player.stats.wealth || 0) / 100000) * 100);
    const happinessScore = player.stats.happiness || 0;
    const achievementScore = (player.achievements?.length || 0) * 10;
    const careerScore = player.careerData ? (player.careerData.monthlySalary / 100) : 0;
    const familyScore = player.familyData ? (player.familyData.children * 20 + 30) : 0;
    const healthScore = player.stats.health || 0;

    const overallScore = 
      (wealthScore * 0.2) +
      (happinessScore * 0.25) +
      (achievementScore * 0.2) +
      (careerScore * 0.15) +
      (familyScore * 0.1) +
      (healthScore * 0.1);

    return {
      wealthScore: Math.round(wealthScore),
      happinessScore: Math.round(happinessScore),
      achievementScore: Math.round(achievementScore),
      careerScore: Math.round(careerScore),
      familyScore: Math.round(familyScore),
      healthScore: Math.round(healthScore),
      overallScore: Math.round(overallScore)
    };
  }

  /**
   * Get leaderboard entries (simulated local leaderboard)
   */
  static getLeaderboard(
    category: 'wealth' | 'happiness' | 'achievements' | 'overall' = 'overall',
    limit: number = 10
  ): LeaderboardEntry[] {
    // Simulated leaderboard data
    const entries: LeaderboardEntry[] = [
      {
        rank: 1,
        playerName: 'Alex Chen',
        score: 9500,
        category: 'wealth',
        age: 45,
        career: 'CEO',
        timestamp: Date.now()
      },
      {
        rank: 2,
        playerName: 'Jordan Lee',
        score: 8900,
        category: 'wealth',
        age: 42,
        career: 'Investment Banker',
        timestamp: Date.now()
      },
      {
        rank: 3,
        playerName: 'Morgan Park',
        score: 8200,
        category: 'wealth',
        age: 48,
        career: 'Entrepreneur',
        timestamp: Date.now()
      },
      {
        rank: 4,
        playerName: 'Casey Wong',
        score: 7800,
        category: 'happiness',
        age: 38,
        career: 'Teacher',
        timestamp: Date.now()
      },
      {
        rank: 5,
        playerName: 'Riley Tan',
        score: 7500,
        category: 'achievements',
        age: 35,
        career: 'Software Engineer',
        timestamp: Date.now()
      }
    ];

    return entries.slice(0, limit);
  }

  /**
   * Get player rank in category
   */
  static getPlayerRank(playerScore: PlayerScore, category: 'wealth' | 'happiness' | 'achievements' | 'overall'): number {
    const leaderboard = this.getLeaderboard(category, 100);
    let categoryScore = 0;

    switch (category) {
      case 'wealth':
        categoryScore = playerScore.wealthScore;
        break;
      case 'happiness':
        categoryScore = playerScore.happinessScore;
        break;
      case 'achievements':
        categoryScore = playerScore.achievementScore;
        break;
      case 'overall':
        categoryScore = playerScore.overallScore;
        break;
    }

    const rank = leaderboard.filter(entry => entry.score > categoryScore).length + 1;
    return rank;
  }

  /**
   * Get achievement badges
   */
  static getAchievementBadges(player: Player): string[] {
    const badges: string[] = [];

    // Wealth badges
    if ((player.stats.wealth || 0) > 500000) badges.push('💰 Millionaire');
    if ((player.stats.wealth || 0) > 1000000) badges.push('💎 Multi-Millionaire');

    // Happiness badges
    if (player.stats.happiness > 90) badges.push('😄 Happiness Champion');
    if (player.stats.happiness > 80) badges.push('😊 Content Soul');

    // Career badges
    if (player.careerData?.monthlySalary > 15000) badges.push('💼 Executive');
    if (player.careerData?.yearsExperience > 20) badges.push('👴 Veteran');

    // Family badges
    if (player.familyData?.children === 3) badges.push('👨‍👩‍👧‍👦 Family Person');
    if (player.familyData?.relationshipStatus === 'married') badges.push('💍 Married');

    // Health badges
    if (player.stats.health > 90) badges.push('💪 Health Nut');

    // Achievement badges
    if ((player.achievements?.length || 0) >= 5) badges.push('🏆 Achievement Collector');
    if ((player.achievements?.length || 0) >= 10) badges.push('🌟 Legend');

    // Age badges
    if (player.age > 60) badges.push('🌅 Retiree');
    if (player.age > 70) badges.push('👴 Elder');

    return badges;
  }

  /**
   * Get player statistics summary
   */
  static getPlayerStatsSummary(player: Player): Record<string, any> {
    const score = this.calculatePlayerScore(player);

    return {
      name: player.name,
      age: player.age,
      overallScore: score.overallScore,
      wealth: player.stats.wealth || 0,
      happiness: player.stats.happiness,
      health: player.stats.health,
      achievements: player.achievements?.length || 0,
      relationships: player.relationships?.length || 0,
      career: player.careerData?.currentJob || 'Unemployed',
      family: player.familyData ? `Married with ${player.familyData.children} children` : 'Single',
      housing: player.housingData?.currentHousing || 'None',
      cpf: player.cpfData?.totalCPF || 0,
      badges: this.getAchievementBadges(player)
    };
  }

  /**
   * Compare two players
   */
  static comparePlayers(player1: Player, player2: Player): {
    winner: string;
    player1Score: PlayerScore;
    player2Score: PlayerScore;
    differences: Record<string, number>;
  } {
    const score1 = this.calculatePlayerScore(player1);
    const score2 = this.calculatePlayerScore(player2);

    const differences = {
      wealth: score2.wealthScore - score1.wealthScore,
      happiness: score2.happinessScore - score1.happinessScore,
      achievements: score2.achievementScore - score1.achievementScore,
      career: score2.careerScore - score1.careerScore,
      family: score2.familyScore - score1.familyScore,
      health: score2.healthScore - score1.healthScore
    };

    const winner = score1.overallScore > score2.overallScore ? player1.name : player2.name;

    return {
      winner,
      player1Score: score1,
      player2Score: score2,
      differences
    };
  }

  /**
   * Get lifetime achievements
   */
  static getLifetimeAchievements(player: Player): string[] {
    const achievements: string[] = [];

    // Career achievements
    if (player.careerData) {
      if (player.careerData.monthlySalary > 20000) achievements.push('High Earner');
      if (player.careerData.yearsExperience > 30) achievements.push('Career Veteran');
    }

    // Financial achievements
    if ((player.stats.wealth || 0) > 500000) achievements.push('Financial Success');
    if ((player.cpfData?.totalCPF || 0) > 500000) achievements.push('CPF Millionaire');

    // Family achievements
    if (player.familyData?.children === 3) achievements.push('Large Family');
    if (player.familyData?.relationshipStatus === 'married' && player.age > 50) {
      achievements.push('Long-term Marriage');
    }

    // Housing achievements
    if (player.housingData?.currentHousing === 'landed_property') achievements.push('Landed Property Owner');

    // Health achievements
    if (player.stats.health > 85 && player.age > 50) achievements.push('Healthy Aging');

    // Happiness achievements
    if (player.stats.happiness > 85) achievements.push('Life Satisfaction');

    return achievements;
  }

  /**
   * Get player percentile
   */
  static getPlayerPercentile(player: Player): Record<string, number> {
    const score = this.calculatePlayerScore(player);

    // Simulated percentiles
    return {
      wealth: Math.min(99, Math.round((score.wealthScore / 100) * 100)),
      happiness: Math.min(99, Math.round((score.happinessScore / 100) * 100)),
      achievements: Math.min(99, Math.round((score.achievementScore / 100) * 100)),
      overall: Math.min(99, Math.round((score.overallScore / 100) * 100))
    };
  }
}

