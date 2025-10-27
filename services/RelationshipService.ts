import { Player, Relationship, RelationshipType } from '../types';

export class RelationshipService {
  /**
   * Initialize a new relationship
   */
  static initializeRelationship(
    player: Player,
    name: string,
    type: RelationshipType,
    description: string = ''
  ): Relationship {
    return {
      id: `rel_${Date.now()}`,
      name,
      type,
      level: 20, // Start at 20/100
      avatar: this.getRandomAvatar(),
      description
    };
  }

  /**
   * Update relationship level based on interactions
   */
  static updateRelationshipLevel(
    relationship: Relationship,
    change: number,
    maxLevel: number = 100
  ): Relationship {
    return {
      ...relationship,
      level: Math.max(0, Math.min(maxLevel, relationship.level + change))
    };
  }

  /**
   * Get relationship status description
   */
  static getRelationshipStatus(level: number): string {
    if (level >= 80) return 'Best Friends';
    if (level >= 60) return 'Close Friends';
    if (level >= 40) return 'Friends';
    if (level >= 20) return 'Acquaintances';
    if (level >= 0) return 'Strangers';
    return 'Enemies';
  }

  /**
   * Check if relationship can progress to next level
   */
  static canProgressRelationship(relationship: Relationship): boolean {
    return relationship.level >= 60;
  }

  /**
   * Get dating compatibility score (0-100)
   */
  static getCompatibilityScore(player1Stats: any, player2Stats: any): number {
    let score = 50; // Base score

    // Similar happiness levels
    const happinessDiff = Math.abs(player1Stats.happiness - player2Stats.happiness);
    score += Math.max(0, 20 - happinessDiff / 5);

    // Similar stress levels
    const stressDiff = Math.abs(player1Stats.stress - player2Stats.stress);
    score += Math.max(0, 15 - stressDiff / 5);

    // Shared interests (simplified)
    score += 15;

    return Math.min(100, Math.max(0, score));
  }

  /**
   * Simulate dating interaction
   */
  static simulateDateInteraction(
    player: Player,
    partner: Relationship,
    dateType: 'casual' | 'romantic' | 'serious'
  ): { success: boolean; relationshipChange: number; statsChange: any } {
    const baseSuccess = this.getCompatibilityScore(player.stats, {
      happiness: 60,
      stress: 40
    });

    const random = Math.random() * 100;
    const success = random < baseSuccess;

    let relationshipChange = 0;
    let statsChange: any = {};

    if (success) {
      relationshipChange = dateType === 'casual' ? 5 : dateType === 'romantic' ? 10 : 15;
      statsChange = { happiness: 8, stress: -3 };
    } else {
      relationshipChange = -5;
      statsChange = { happiness: -5, stress: 5 };
    }

    return { success, relationshipChange, statsChange };
  }

  /**
   * Check if relationship can lead to marriage
   */
  static canGetMarried(relationship: Relationship): boolean {
    return relationship.type === RelationshipType.PARTNER && relationship.level >= 80;
  }

  /**
   * Simulate breakup
   */
  static simulateBreakup(
    player: Player,
    partner: Relationship,
    reason: 'distance' | 'incompatibility' | 'cheating' | 'career' = 'incompatibility'
  ): { statsChange: any; message: string } {
    const reasonMessages: Record<string, string> = {
      distance: 'Long distance became too difficult.',
      incompatibility: 'You realized you wanted different things.',
      cheating: 'Trust was broken.',
      career: 'Career priorities pulled you apart.'
    };

    const statsChange = {
      happiness: -15,
      stress: 10,
      health: -5
    };

    return {
      statsChange,
      message: `You and ${partner.name} broke up. ${reasonMessages[reason]}`
    };
  }

  /**
   * Get romantic interest based on player stats
   */
  static generateRomanticInterest(player: Player): Relationship {
    const names = ['Alex', 'Jordan', 'Casey', 'Morgan', 'Riley', 'Taylor', 'Quinn', 'Drew'];
    const name = names[Math.floor(Math.random() * names.length)];

    return this.initializeRelationship(
      player,
      name,
      RelationshipType.CRUSH,
      `You\'ve developed feelings for ${name}.`
    );
  }

  /**
   * Calculate relationship impact on happiness
   */
  static calculateRelationshipHappinessBonus(relationships: Relationship[]): number {
    let bonus = 0;

    relationships.forEach(rel => {
      if (rel.type === RelationshipType.PARTNER && rel.level >= 80) {
        bonus += 15;
      } else if (rel.type === RelationshipType.BEST_FRIEND && rel.level >= 70) {
        bonus += 10;
      } else if (rel.type === RelationshipType.FRIEND && rel.level >= 50) {
        bonus += 5;
      } else if (rel.type === RelationshipType.FAMILY && rel.level >= 60) {
        bonus += 8;
      }
    });

    return Math.min(bonus, 50); // Cap at 50
  }

  /**
   * Handle relationship conflict
   */
  static handleConflict(
    relationship: Relationship,
    severity: 'minor' | 'moderate' | 'severe'
  ): Relationship {
    const changes = {
      minor: -5,
      moderate: -15,
      severe: -30
    };

    return this.updateRelationshipLevel(relationship, changes[severity]);
  }

  /**
   * Reconcile after conflict
   */
  static reconcile(relationship: Relationship, effort: 'low' | 'medium' | 'high'): Relationship {
    const changes = {
      low: 5,
      medium: 10,
      high: 15
    };

    return this.updateRelationshipLevel(relationship, changes[effort]);
  }

  /**
   * Get random avatar emoji
   */
  private static getRandomAvatar(): string {
    const avatars = ['👨', '👩', '👨‍🦱', '👩‍🦱', '👨‍🦲', '👩‍🦲', '🧔', '👱‍♀️'];
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  /**
   * Simulate jealousy event
   */
  static simulateJealousy(
    player: Player,
    partner: Relationship,
    trigger: 'attention' | 'ex' | 'coworker'
  ): { statsChange: any; relationshipChange: number; message: string } {
    const messages = {
      attention: `${partner.name} seemed upset that you were spending time with others.`,
      ex: `${partner.name} found out about your ex. Things got awkward.`,
      coworker: `${partner.name} didn't like how close you were with your coworker.`
    };

    return {
      statsChange: { stress: 8, happiness: -5 },
      relationshipChange: -10,
      message: messages[trigger]
    };
  }

  /**
   * Check for marriage proposal opportunity
   */
  static checkProposalOpportunity(
    player: Player,
    partner: Relationship
  ): { canPropose: boolean; reason: string } {
    if (partner.type !== RelationshipType.PARTNER) {
      return { canPropose: false, reason: 'Not in a romantic relationship' };
    }

    if (partner.level < 80) {
      return { canPropose: false, reason: 'Relationship not strong enough' };
    }

    if (player.age < 25) {
      return { canPropose: false, reason: 'Too young' };
    }

    if ((player.stats.wealth || 0) < 10000) {
      return { canPropose: false, reason: 'Not enough savings for ring and wedding' };
    }

    return { canPropose: true, reason: 'Perfect time to propose!' };
  }

  /**
   * Simulate proposal
   */
  static simulateProposal(
    player: Player,
    partner: Relationship
  ): { accepted: boolean; statsChange: any } {
    const acceptanceChance = Math.min(95, partner.level);
    const accepted = Math.random() * 100 < acceptanceChance;

    const statsChange = accepted
      ? { happiness: 20, stress: -5, wealth: -5000 }
      : { happiness: -15, stress: 10 };

    return { accepted, statsChange };
  }
}

