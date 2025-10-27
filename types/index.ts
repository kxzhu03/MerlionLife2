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
  // Original events
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
  LIBRARY_DISCOVERY = 'library_discovery',
  // New events
  SCHOOL_CAMP = 'school_camp',
  CLASS_MONITOR = 'class_monitor',
  TALENT_SHOW = 'talent_show',
  FAMILY_VACATION = 'family_vacation',
  PET_ADOPTION = 'pet_adoption',
  MATH_OLYMPIAD = 'math_olympiad',
  SCIENCE_FAIR = 'science_fair',
  SPORTS_TOURNAMENT = 'sports_tournament',
  CULTURAL_PERFORMANCE = 'cultural_performance',
  BIRTHDAY_PARTY = 'birthday_party',
  LOST_ITEM = 'lost_item',
  FOUND_MONEY = 'found_money',
  HELPED_ELDERLY = 'helped_elderly',
  CYBER_WELLNESS = 'cyber_wellness',
  FIELD_TRIP = 'field_trip',
  SCHOOL_PLAY = 'school_play',
  PREFECT_NOMINATION = 'prefect_nomination',
  EXAM_STRESS = 'exam_stress',
  GROUP_PROJECT = 'group_project',
  RIVALRY = 'rivalry',
  RECONCILIATION = 'reconciliation',
  GRANDPARENT_VISIT = 'grandparent_visit',
  LEARNING_DISABILITY = 'learning_disability',
  GIFTED_PROGRAM = 'gifted_program',
  FOOD_POISONING = 'food_poisoning',
  PERFECT_ATTENDANCE = 'perfect_attendance',
  DETENTION = 'detention',
  TEACHER_PRAISE = 'teacher_praise',
  PEER_TUTORING = 'peer_tutoring',
  LOST_FRIEND = 'lost_friend',
  NEW_HOBBY = 'new_hobby'
}

export enum PersonalityTrait {
  SHY = 'shy',
  OUTGOING = 'outgoing',
  CREATIVE = 'creative',
  LOGICAL = 'logical',
  COMPETITIVE = 'competitive',
  COOPERATIVE = 'cooperative',
  AMBITIOUS = 'ambitious',
  RELAXED = 'relaxed'
}

export enum AchievementType {
  ACADEMIC_EXCELLENCE = 'academic_excellence',
  SOCIAL_BUTTERFLY = 'social_butterfly',
  ATHLETIC_STAR = 'athletic_star',
  CREATIVE_GENIUS = 'creative_genius',
  COMMUNITY_HERO = 'community_hero',
  FINANCIAL_WIZARD = 'financial_wizard',
  PERFECT_BALANCE = 'perfect_balance',
  SURVIVOR = 'survivor',
  POPULAR = 'popular',
  SCHOLAR = 'scholar'
}

export enum RelationshipType {
  FAMILY = 'family',
  FRIEND = 'friend',
  BEST_FRIEND = 'best_friend',
  RIVAL = 'rival',
  MENTOR = 'mentor',
  CRUSH = 'crush'
}

export interface PlayerStats {
  wealth: number;
  happiness: number;
  health: number;
  socialImpact: number;
  academicSkill: number;
  stress?: number; // New stat
  reputation?: number; // New stat
}

export interface Relationship {
  id: string;
  name: string;
  type: RelationshipType;
  level: number; // 0-100
  avatar: string;
  description: string;
}

export interface Achievement {
  id: AchievementType;
  name: string;
  description: string;
  unlocked: boolean;
  unlockedYear?: number;
  icon: string;
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
  // New fields
  personalityTraits?: PersonalityTrait[];
  relationships?: Relationship[];
  achievements?: Achievement[];
  eventHistory?: string[]; // Track events that have occurred
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
  achievements?: Achievement[];
  relationshipChanges?: { name: string; change: number }[];
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
  relationshipEffects?: { type: RelationshipType; change: number }[];
  requiresYear?: number[]; // Only occurs in specific years
  requiresTraits?: PersonalityTrait[]; // Only occurs with certain traits
}

export interface GameState {
  player: Player;
  currentYear: number;
  isGameComplete: boolean;
  gamePhase: 'primary' | 'secondary' | 'post_secondary' | 'career' | 'completed';
  lastRandomEventYear?: number;
  yearlyReports?: YearlyReport[];
}

