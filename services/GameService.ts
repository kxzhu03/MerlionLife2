import AsyncStorage from '@react-native-async-storage/async-storage';
import { Player, PlayerStats, SESClass, ActivityPoints, MealChoice, RandomEvent, PSLEStream, GameState } from '../types';
import { SES_CONFIG, RANDOM_EVENTS, PSLE_STREAM_THRESHOLDS, ACTIVITY_POINTS_PER_YEAR, HEALTHY_MEAL_COST, UNHEALTHY_MEAL_COST, HEALTHY_MEAL_HEALTH_BONUS, UNHEALTHY_MEAL_HEALTH_PENALTY, SPECIAL_PROGRAM_SKILL_THRESHOLD } from '../data/constants';

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

  static createNewPlayer(name: string, avatar: string, sesClass: SESClass): Player {
    const sesData = SES_CONFIG[sesClass];
    const dailyAllowance = this.getRandomAllowance(sesData.dailyAllowanceRange);
    
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
      parentsOccupation: sesData.parentsOccupation,
      dailyAllowance,
      mealChoice: MealChoice.HEALTHY,
      tuitionSubjects: [],
      currentYear: 1,
      psleStream: null
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
    if (activityPoints.academics > 7) {
      statsChange.health = -(activityPoints.academics - 7) * 2;
    }

    // CCA points effect
    if (player.cca) {
      // CCA skill will be handled separately
      if (activityPoints.cca < 3) {
        statsChange.happiness = -2;
        statsChange.health = -1;
      }
    }

    // Volunteering points effect (1:1)
    statsChange.socialImpact = activityPoints.volunteering;

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
    }

    // Yearly wealth: subtract meal cost per day only
    const dailyMealCost = mealChoice === MealChoice.HEALTHY ? HEALTHY_MEAL_COST : UNHEALTHY_MEAL_COST;
    wealthChange = -(dailyMealCost * 365);
    // Apply tuition yearly wealth cost (simple model): -1 per subject per year
    wealthChange -= tuitionCount;

    return { statsChange, wealthChange };
  }

  static applyRandomEvent(): RandomEvent | null {
    // 30% chance that any random event happens this year
    const trigger = Math.random() < 0.3;
    if (!trigger) return null;
    const index = Math.floor(Math.random() * RANDOM_EVENTS.length);
    return RANDOM_EVENTS[index].id;
  }

  static getRandomEventEffects(event: RandomEvent): Partial<PlayerStats> {
    const eventData = RANDOM_EVENTS.find(e => e.id === event);
    if (!eventData) return {};
    if (event === RandomEvent.ERASER_BUSINESS) {
      // Wealth gain between 1 and 500 inclusive
      const wealthGain = Math.floor(Math.random() * 500) + 1;
      return { ...eventData.statChanges, wealth: wealthGain };
    }
    return { ...eventData.statChanges };
  }

  static calculatePSLEStream(academicSkill: number, ccaSkill: number): PSLEStream {
    if (academicSkill >= PSLE_STREAM_THRESHOLDS.INTEGRATED_PROGRAMME) {
      return PSLEStream.INTEGRATED_PROGRAMME;
    } else if (academicSkill >= PSLE_STREAM_THRESHOLDS.EXPRESS) {
      return PSLEStream.EXPRESS;
    } else if (academicSkill >= PSLE_STREAM_THRESHOLDS.NORMAL_ACADEMIC) {
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
      academicSkill: Math.max(0, Math.min(100, player.stats.academicSkill + (statsChange.academicSkill || 0)))
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
