import AsyncStorage from '@react-native-async-storage/async-storage';
import { Player, PlayerStats, SESClass, ActivityPoints, MealChoice, RandomEvent, PSLEStream, GameState, PersonalityTrait, Relationship, RelationshipType, Achievement, AchievementType } from '../types';
import { SES_CONFIG, RANDOM_EVENTS, PSLE_STREAM_THRESHOLDS, ACTIVITY_POINTS_PER_YEAR, HEALTHY_MEAL_COST, UNHEALTHY_MEAL_COST, HEALTHY_MEAL_HEALTH_BONUS, UNHEALTHY_MEAL_HEALTH_PENALTY, SPECIAL_PROGRAM_SKILL_THRESHOLD, ACHIEVEMENTS } from '../data/constants';

export class GameService {
  private static readonly GAME_STATE_KEY = 'merlion_life_game_state';

  static async saveGameState(gameState: GameState): Promise<void> {
    try {
      await AsyncStorage.setItem(this.GAME_STATE_KEY, JSON.stringify(gameState));
    } catch (error) {
      console.error('Failed to save game state:', error);
    }
  }

  static async loadGameState(): Promise<GameState | null> {
    try {
      const gameStateJson = await AsyncStorage.getItem(this.GAME_STATE_KEY);
      return gameStateJson ? JSON.parse(gameStateJson) : null;
    } catch (error) {
      console.error('Failed to load game state:', error);
      return null;
    }
  }

  static async clearGameState(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.GAME_STATE_KEY);
    } catch (error) {
      console.error('Failed to clear game state:', error);
    }
  }

  static createNewPlayer(name: string, avatar: string, sesClass: SESClass, traits: PersonalityTrait[]): Player {
    const sesData = SES_CONFIG[sesClass];
    const dailyAllowance = this.getRandomAllowance(sesData.dailyAllowanceRange);
    
    const occupations = SES_CONFIG[sesClass].parentsOccupations;
    const pickedOccupation = occupations[Math.floor(Math.random() * occupations.length)];
    
    // Initialize relationships
    const initialRelationships: Relationship[] = [
      {
        id: 'parents',
        name: 'Parents',
        type: RelationshipType.FAMILY,
        level: 70,
        avatar: '👨‍👩‍👧',
        description: 'Your loving parents'
      }
    ];

    // Initialize achievements
    const initialAchievements = ACHIEVEMENTS.map(a => ({ ...a, unlocked: false }));

    return {
      id: Date.now().toString(),
      name,
      avatar,
      age: 7,
      grade: 1,
      sesClass,
      stats: { ...sesData.startingStats },
      cca: null,
      ccaSkill: 0,
      parentsOccupation: pickedOccupation,
      dailyAllowance,
      mealChoice: MealChoice.HEALTHY,
      tuitionSubjects: [],
      currentYear: 1,
      psleStream: null,
      personalityTraits: traits,
      relationships: initialRelationships,
      achievements: initialAchievements,
      eventHistory: []
    };
  }

  static calculateYearlyStats(
    player: Player,
    activityPoints: ActivityPoints,
    mealChoice: MealChoice
  ): { statsChange: Partial<PlayerStats>; wealthChange: number } {
    const statsChange: Partial<PlayerStats> = {};
    let wealthChange = 0;

    // Academic points effect (1:1)
    statsChange.academicSkill = activityPoints.academics;
    statsChange.stress = 0;
    
    // High academic workload increases stress
    if (activityPoints.academics > 7) {
      statsChange.health = -(activityPoints.academics - 7) * 2;
      statsChange.stress = (activityPoints.academics - 7) * 3;
    }

    // CCA points effect
    if (player.cca) {
      // CCA skill will be handled separately
      if (activityPoints.cca < 3) {
        statsChange.happiness = -2;
        statsChange.health = -1;
      } else {
        // Good CCA participation reduces stress
        statsChange.stress = (statsChange.stress || 0) - 2;
      }
    }

    // Volunteering points effect (1:1)
    statsChange.socialImpact = activityPoints.volunteering;
    if (activityPoints.volunteering > 3) {
      statsChange.happiness = (statsChange.happiness || 0) + 2;
    }

    // Meal choice effects
    if (mealChoice === MealChoice.HEALTHY) {
      statsChange.health = (statsChange.health || 0) + HEALTHY_MEAL_HEALTH_BONUS;
      wealthChange = -HEALTHY_MEAL_COST;
    } else {
      statsChange.health = (statsChange.health || 0) - UNHEALTHY_MEAL_HEALTH_PENALTY;
      wealthChange = -UNHEALTHY_MEAL_COST;
    }

    // Tuition effects (per year, not per day)
    const tuitionCount = player.tuitionSubjects.length;
    if (tuitionCount > 0) {
      statsChange.academicSkill = (statsChange.academicSkill || 0) + tuitionCount; // 1 per subject
      statsChange.happiness = (statsChange.happiness || 0) - tuitionCount;
      statsChange.stress = (statsChange.stress || 0) + tuitionCount * 2;
    }

    // Personality trait effects
    if (player.personalityTraits?.includes(PersonalityTrait.RELAXED)) {
      statsChange.stress = (statsChange.stress || 0) - 3;
    }
    if (player.personalityTraits?.includes(PersonalityTrait.AMBITIOUS)) {
      statsChange.academicSkill = (statsChange.academicSkill || 0) + 1;
      statsChange.stress = (statsChange.stress || 0) + 2;
    }

    // Yearly wealth: (allowance - mealCost) * 365
    const dailyMealCost = mealChoice === MealChoice.HEALTHY ? HEALTHY_MEAL_COST : UNHEALTHY_MEAL_COST;
    wealthChange = (player.dailyAllowance - dailyMealCost) * 365;

    return { statsChange, wealthChange };
  }

  static applyRandomEvent(player: Player): RandomEvent | null {
    // Filter events based on requirements
    const eligibleEvents = RANDOM_EVENTS.filter(event => {
      // Check year requirements
      if (event.requiresYear && !event.requiresYear.includes(player.currentYear)) {
        return false;
      }
      // Check trait requirements
      if (event.requiresTraits && event.requiresTraits.length > 0) {
        const hasRequiredTrait = event.requiresTraits.some(trait => 
          player.personalityTraits?.includes(trait)
        );
        if (!hasRequiredTrait) return false;
      }
      // Check if event already occurred (some events should only happen once)
      if (player.eventHistory?.includes(event.id)) {
        // Allow repeatable events
        const nonRepeatableEvents = [
          RandomEvent.PARENTS_DIVORCE,
          RandomEvent.GIFTED_PROGRAM,
          RandomEvent.LEARNING_DISABILITY,
          RandomEvent.PET_ADOPTION
        ];
        if (nonRepeatableEvents.includes(event.id)) {
          return false;
        }
      }
      return true;
    });

    if (eligibleEvents.length === 0) return null;

    // Weighted random selection based on probability
    const totalProbability = eligibleEvents.reduce((sum, e) => sum + e.probability, 0);
    let random = Math.random() * totalProbability;
    
    for (const event of eligibleEvents) {
      random -= event.probability;
      if (random <= 0) {
        return event.id;
      }
    }

    return eligibleEvents[0].id;
  }

  static getRandomEventEffects(event: RandomEvent): Partial<PlayerStats> {
    const eventData = RANDOM_EVENTS.find(e => e.id === event);
    if (!eventData) return {};
    if (event === RandomEvent.ERASER_BUSINESS) {
      // Wealth gain between 50 and 300
      const wealthGain = Math.floor(Math.random() * 251) + 50;
      return { ...eventData.statChanges, wealth: wealthGain };
    }
    return { ...eventData.statChanges };
  }

  static updateRelationships(player: Player, event: RandomEvent): Player {
    const eventData = RANDOM_EVENTS.find(e => e.id === event);
    if (!eventData || !eventData.relationshipEffects) return player;

    const updatedRelationships = [...(player.relationships || [])];

    eventData.relationshipEffects.forEach(effect => {
      const existingRelationship = updatedRelationships.find(r => r.type === effect.type);
      if (existingRelationship) {
        existingRelationship.level = Math.max(0, Math.min(100, existingRelationship.level + effect.change));
      } else if (effect.change > 0) {
        // Create new relationship
        const newRelationship = this.createRelationship(effect.type);
        if (newRelationship) {
          newRelationship.level = Math.min(100, effect.change);
          updatedRelationships.push(newRelationship);
        }
      }
    });

    return {
      ...player,
      relationships: updatedRelationships
    };
  }

  static createRelationship(type: RelationshipType): Relationship | null {
    const names = {
      [RelationshipType.FRIEND]: ['Wei Ming', 'Siti', 'Raj', 'Mei Ling', 'Ahmad'],
      [RelationshipType.BEST_FRIEND]: ['Best Friend'],
      [RelationshipType.RIVAL]: ['Academic Rival'],
      [RelationshipType.MENTOR]: ['Mr. Tan', 'Mrs. Lee', 'Ms. Wong'],
      [RelationshipType.FAMILY]: ['Family'],
      [RelationshipType.CRUSH]: ['Secret Crush']
    };

    const avatars = {
      [RelationshipType.FRIEND]: '👦',
      [RelationshipType.BEST_FRIEND]: '🤝',
      [RelationshipType.RIVAL]: '⚔️',
      [RelationshipType.MENTOR]: '👨‍🏫',
      [RelationshipType.FAMILY]: '👨‍👩‍👧',
      [RelationshipType.CRUSH]: '💕'
    };

    const descriptions = {
      [RelationshipType.FRIEND]: 'A good friend from school',
      [RelationshipType.BEST_FRIEND]: 'Your closest friend',
      [RelationshipType.RIVAL]: 'Someone who pushes you to be better',
      [RelationshipType.MENTOR]: 'A teacher who guides you',
      [RelationshipType.FAMILY]: 'Your family members',
      [RelationshipType.CRUSH]: 'Someone special'
    };

    const nameList = names[type];
    const name = nameList[Math.floor(Math.random() * nameList.length)];

    return {
      id: `${type}_${Date.now()}`,
      name,
      type,
      level: 0,
      avatar: avatars[type],
      description: descriptions[type]
    };
  }

  static checkAchievements(player: Player): Player {
    const updatedAchievements = player.achievements?.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;

      switch (achievement.id) {
        case AchievementType.ACADEMIC_EXCELLENCE:
          shouldUnlock = player.stats.academicSkill >= 80;
          break;
        case AchievementType.SOCIAL_BUTTERFLY:
          shouldUnlock = (player.relationships?.filter(r => r.level >= 60).length || 0) >= 5;
          break;
        case AchievementType.ATHLETIC_STAR:
          shouldUnlock = player.ccaSkill >= 80 && 
            [CCAOption.FOOTBALL, CCAOption.BASKETBALL, CCAOption.BADMINTON].includes(player.cca as any);
          break;
        case AchievementType.CREATIVE_GENIUS:
          shouldUnlock = player.ccaSkill >= 80 && 
            [CCAOption.ART, CCAOption.BALLET, CCAOption.CHOIR].includes(player.cca as any);
          break;
        case AchievementType.COMMUNITY_HERO:
          shouldUnlock = player.stats.socialImpact >= 80;
          break;
        case AchievementType.FINANCIAL_WIZARD:
          shouldUnlock = player.stats.wealth >= 5000;
          break;
        case AchievementType.PERFECT_BALANCE:
          shouldUnlock = player.stats.wealth >= 60 &&
            player.stats.happiness >= 60 &&
            player.stats.health >= 60 &&
            player.stats.socialImpact >= 60 &&
            player.stats.academicSkill >= 60;
          break;
        case AchievementType.SURVIVOR:
          // This needs to be tracked differently - for now just check current health
          shouldUnlock = player.stats.health >= 20 && player.currentYear >= 6;
          break;
        case AchievementType.POPULAR:
          shouldUnlock = (player.stats.reputation || 0) >= 90;
          break;
        case AchievementType.SCHOLAR:
          shouldUnlock = player.psleStream === PSLEStream.INTEGRATED_PROGRAMME;
          break;
      }

      if (shouldUnlock) {
        return {
          ...achievement,
          unlocked: true,
          unlockedYear: player.currentYear
        };
      }

      return achievement;
    }) || [];

    return {
      ...player,
      achievements: updatedAchievements
    };
  }

  static calculatePSLEStream(academicSkill: number, ccaSkill: number): PSLEStream {
    // CCA skill can provide a small boost
    const totalScore = academicSkill + (ccaSkill * 0.1);
    
    if (totalScore >= PSLE_STREAM_THRESHOLDS.INTEGRATED_PROGRAMME) {
      return PSLEStream.INTEGRATED_PROGRAMME;
    } else if (totalScore >= PSLE_STREAM_THRESHOLDS.EXPRESS) {
      return PSLEStream.EXPRESS;
    } else if (totalScore >= PSLE_STREAM_THRESHOLDS.NORMAL_ACADEMIC) {
      return PSLEStream.NORMAL_ACADEMIC;
    } else {
      return PSLEStream.NORMAL_TECHNICAL;
    }
  }

  static checkSpecialProgramEligibility(ccaSkill: number): boolean {
    return ccaSkill >= SPECIAL_PROGRAM_SKILL_THRESHOLD;
  }

  static updatePlayerStats(player: Player, statsChange: Partial<PlayerStats>): Player {
    const newStats: PlayerStats = {
      wealth: Math.max(0, player.stats.wealth + (statsChange.wealth || 0)),
      happiness: Math.max(0, Math.min(100, player.stats.happiness + (statsChange.happiness || 0))),
      health: Math.max(0, Math.min(100, player.stats.health + (statsChange.health || 0))),
      socialImpact: Math.max(0, Math.min(100, player.stats.socialImpact + (statsChange.socialImpact || 0))),
      academicSkill: Math.max(0, Math.min(100, player.stats.academicSkill + (statsChange.academicSkill || 0))),
      stress: Math.max(0, Math.min(100, (player.stats.stress || 0) + (statsChange.stress || 0))),
      reputation: Math.max(0, Math.min(100, (player.stats.reputation || 0) + (statsChange.reputation || 0)))
    };

    return {
      ...player,
      stats: newStats
    };
  }

  static advanceToNextYear(player: Player): Player {
    const newAge = player.age + 1;
    const newGrade = player.grade + 1;
    const newYear = player.currentYear + 1;

    return {
      ...player,
      age: newAge,
      grade: newGrade,
      currentYear: newYear,
      dailyAllowance: this.getRandomAllowance(SES_CONFIG[player.sesClass].dailyAllowanceRange)
    };
  }

  static updateCCASkill(player: Player, ccaPoints: number): Player {
    if (!player.cca) return player;

    const newCCASkill = Math.min(100, player.ccaSkill + ccaPoints);
    return {
      ...player,
      ccaSkill: newCCASkill
    };
  }

  private static getRandomAllowance(range: [number, number]): number {
    return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
  }
}

import { CCAOption } from '../types';

