// Core game types for Merlion-Life

export enum SESClass {
  LOWER = 'lower',
  MIDDLE = 'middle',
  UPPER = 'upper'
}

export enum PSLEStream {
  INTEGRATED_PROGRAMME = 'ip',
  EXPRESS = 'express',
  NORMAL_ACADEMIC = 'normal_academic',
  NORMAL_TECHNICAL = 'normal_technical'
}

export enum CCAOption {
  FOOTBALL = 'football',
  BASKETBALL = 'basketball',
  BADMINTON = 'badminton',
  CODING = 'coding',
  ROBOTICS = 'robotics',
  ART = 'art',
  BALLET = 'ballet',
  CHOIR = 'choir',
  SCIENCE_CLUB = 'science_club',
  DEBATE = 'debate'
}

export enum MealChoice {
  HEALTHY = 'healthy',
  UNHEALTHY = 'unhealthy'
}

export enum RandomEvent {
  BULLIED = 'bullied',
  PARENTS_DIVORCE = 'parents_divorce',
  BEST_FRIEND = 'best_friend',
  ERASER_BUSINESS = 'eraser_business',
  MINOR_FLU = 'minor_flu',
  SCHOLARSHIP = 'scholarship',
  LOST_POCKET_MONEY = 'lost_pocket_money',
  WON_ART_CONTEST = 'won_art_contest',
  SPORT_INJURY = 'sport_injury',
  COMMUNITY_AWARD = 'community_award',
  NEW_SIBLING = 'new_sibling',
  MOVED_HOUSE = 'moved_house',
  SCHOOL_MERGER = 'school_merger',
  MENTOR_SUPPORT = 'mentor_support',
  LIBRARY_DISCOVERY = 'library_discovery'
}

export interface PlayerStats {
  wealth: number;
  happiness: number;
  health: number;
  socialImpact: number;
  academicSkill: number;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  age: number;
  grade: number;
  sesClass: SESClass;
  stats: PlayerStats;
  cca: CCAOption | null;
  ccaSkill: number;
  parentsOccupation: string;
  dailyAllowance: number;
  mealChoice: MealChoice;
  tuitionSubjects: string[];
  currentYear: number;
  psleStream: PSLEStream | null;
}

export interface ActivityPoints {
  academics: number;
  cca: number;
  volunteering: number;
}

export interface YearlyReport {
  year: number;
  age: number;
  grade: string;
  statsChange: Partial<PlayerStats>;
  wealthChange: number;
  events: RandomEvent[];
  finalStats: PlayerStats;
}

export interface SESData {
  class: SESClass;
  startingStats: PlayerStats;
  dailyAllowanceRange: [number, number];
  maxTuitionSubjects: number;
  parentsOccupations: string[];
}

export interface CCAOptionData {
  id: CCAOption;
  name: string;
  emoji: string;
  description: string;
}

export interface RandomEventData {
  id: RandomEvent;
  name: string;
  description: string;
  statChanges: Partial<PlayerStats>;
  probability: number;
}

export interface GameState {
  player: Player;
  currentYear: number;
  isGameComplete: boolean;
  gamePhase: 'primary' | 'secondary' | 'completed';
}
