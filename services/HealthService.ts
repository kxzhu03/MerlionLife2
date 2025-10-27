import { Player } from '../types';

export interface HealthCondition {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  treatmentCost: number;
  treatmentDuration: number; // months
  healthImpact: number; // negative
  stressImpact: number;
  description: string;
}

export interface MedicalHistory {
  conditions: HealthCondition[];
  hospitalizations: number;
  totalMedicalCosts: number;
  lastCheckup: number; // year
}

export class HealthService {
  /**
   * Get possible health conditions based on age and lifestyle
   */
  static getPossibleConditions(player: Player): HealthCondition[] {
    const age = player.age;
    const stress = player.stats.stress || 50;
    const health = player.stats.health || 50;
    const conditions: HealthCondition[] = [];

    // Stress-related conditions
    if (stress > 70) {
      conditions.push({
        id: 'anxiety',
        name: 'Anxiety Disorder',
        severity: 'moderate',
        treatmentCost: 2000,
        treatmentDuration: 6,
        healthImpact: -10,
        stressImpact: -15,
        description: 'Chronic anxiety affecting daily life. Requires therapy and possibly medication.'
      });
    }

    // Age-related conditions
    if (age > 40) {
      conditions.push({
        id: 'hypertension',
        name: 'High Blood Pressure',
        severity: 'moderate',
        treatmentCost: 1500,
        treatmentDuration: 12,
        healthImpact: -8,
        stressImpact: 5,
        description: 'Hypertension increases risk of heart disease. Requires lifestyle changes and medication.'
      });
    }

    if (age > 50) {
      conditions.push({
        id: 'diabetes',
        name: 'Type 2 Diabetes',
        severity: 'severe',
        treatmentCost: 5000,
        treatmentDuration: 24,
        healthImpact: -15,
        stressImpact: 10,
        description: 'Chronic condition requiring regular monitoring and medication.'
      });
    }

    // Poor health conditions
    if (health < 30) {
      conditions.push({
        id: 'flu',
        name: 'Severe Flu',
        severity: 'moderate',
        treatmentCost: 500,
        treatmentDuration: 2,
        healthImpact: -20,
        stressImpact: 5,
        description: 'Severe influenza requiring bed rest and medication.'
      });
    }

    // Common conditions
    conditions.push({
      id: 'common_cold',
      name: 'Common Cold',
      severity: 'mild',
      treatmentCost: 100,
      treatmentDuration: 1,
      healthImpact: -5,
      stressImpact: 2,
      description: 'Common viral infection. Usually resolves on its own.'
    });

    conditions.push({
      id: 'back_pain',
      name: 'Chronic Back Pain',
      severity: 'moderate',
      treatmentCost: 1000,
      treatmentDuration: 3,
      healthImpact: -8,
      stressImpact: 5,
      description: 'Persistent back pain affecting work and daily activities.'
    });

    return conditions;
  }

  /**
   * Diagnose a health condition
   */
  static diagnoseCondition(
    player: Player,
    condition: HealthCondition
  ): { diagnosed: boolean; cost: number; message: string } {
    const diagnosisCost = 200 + (condition.severity === 'severe' ? 300 : condition.severity === 'moderate' ? 150 : 0);

    return {
      diagnosed: true,
      cost: diagnosisCost,
      message: `Diagnosed with ${condition.name}. Treatment cost: $${condition.treatmentCost}`
    };
  }

  /**
   * Treat a health condition
   */
  static treatCondition(
    player: Player,
    condition: HealthCondition
  ): { success: boolean; newPlayer: Player; message: string } {
    if ((player.stats.wealth || 0) < condition.treatmentCost) {
      return {
        success: false,
        newPlayer: player,
        message: `Insufficient funds for treatment. Cost: $${condition.treatmentCost}`
      };
    }

    const updatedPlayer = { ...player };
    updatedPlayer.stats.wealth = (updatedPlayer.stats.wealth || 0) - condition.treatmentCost;
    updatedPlayer.stats.health = Math.min(100, updatedPlayer.stats.health + 20);
    updatedPlayer.stats.stress = Math.max(0, updatedPlayer.stats.stress - condition.stressImpact);

    return {
      success: true,
      newPlayer: updatedPlayer,
      message: `Successfully treated ${condition.name}. Health improved!`
    };
  }

  /**
   * Calculate health deterioration over time
   */
  static calculateHealthDeterioration(player: Player): Player {
    const updatedPlayer = { ...player };
    let healthChange = 0;

    // Stress impacts health
    if (player.stats.stress > 70) {
      healthChange -= 3;
    } else if (player.stats.stress > 50) {
      healthChange -= 1;
    }

    // Happiness impacts health
    if (player.stats.happiness < 30) {
      healthChange -= 2;
    } else if (player.stats.happiness > 70) {
      healthChange += 1;
    }

    // Age impacts health
    if (player.age > 50) {
      healthChange -= 1;
    } else if (player.age > 60) {
      healthChange -= 2;
    }

    updatedPlayer.stats.health = Math.max(0, Math.min(100, player.stats.health + healthChange));

    return updatedPlayer;
  }

  /**
   * Get health status description
   */
  static getHealthStatus(health: number): string {
    if (health >= 80) return 'Excellent';
    if (health >= 60) return 'Good';
    if (health >= 40) return 'Fair';
    if (health >= 20) return 'Poor';
    return 'Critical';
  }

  /**
   * Get health recommendations
   */
  static getHealthRecommendations(player: Player): string[] {
    const recommendations: string[] = [];

    if (player.stats.health < 40) {
      recommendations.push('Your health is declining. Consider visiting a doctor.');
    }

    if (player.stats.stress > 70) {
      recommendations.push('Your stress levels are very high. Try relaxation techniques or seek counseling.');
    }

    if (player.stats.happiness < 30) {
      recommendations.push('Your mental health needs attention. Consider talking to someone.');
    }

    if (player.age > 40 && player.stats.health < 60) {
      recommendations.push('Age-related health issues may develop. Regular checkups recommended.');
    }

    return recommendations;
  }

  /**
   * Simulate health event
   */
  static simulateHealthEvent(player: Player): { event: string; statsChange: any; costChange: number } {
    const random = Math.random();
    const health = player.stats.health;

    if (health < 30 && random < 0.3) {
      return {
        event: 'You had to visit the hospital for emergency treatment.',
        statsChange: { health: 15, stress: 5 },
        costChange: -2000
      };
    }

    if (player.stats.stress > 80 && random < 0.2) {
      return {
        event: 'You experienced a panic attack. You needed medical attention.',
        statsChange: { stress: -20, health: -10 },
        costChange: -500
      };
    }

    if (random < 0.1) {
      return {
        event: 'You had a minor accident but recovered quickly.',
        statsChange: { health: -5 },
        costChange: -300
      };
    }

    return {
      event: 'You maintained good health this year.',
      statsChange: { health: 2 },
      costChange: 0
    };
  }

  /**
   * Get insurance benefit
   */
  static getInsuranceBenefit(player: Player, treatmentCost: number): number {
    const hasInsurance = (player.stats.wealth || 0) > 50000; // Simplified
    if (!hasInsurance) return 0;

    // Insurance covers 70-80% of costs
    return Math.round(treatmentCost * (0.7 + Math.random() * 0.1));
  }

  /**
   * Calculate life expectancy
   */
  static calculateLifeExpectancy(player: Player): number {
    let expectancy = 82; // Singapore average

    // Health impacts
    if (player.stats.health > 70) expectancy += 5;
    else if (player.stats.health < 40) expectancy -= 5;

    // Stress impacts
    if (player.stats.stress > 70) expectancy -= 3;
    else if (player.stats.stress < 40) expectancy += 2;

    // Happiness impacts
    if (player.stats.happiness > 70) expectancy += 3;
    else if (player.stats.happiness < 30) expectancy -= 3;

    // Career impacts (stress from demanding jobs)
    if (player.careerData?.monthlySalary > 10000) expectancy -= 1;

    return Math.round(expectancy);
  }
}

