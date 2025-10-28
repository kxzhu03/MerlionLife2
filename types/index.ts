// Core game types for Merlion-Life
export * from './avatar';
export * from './lifestages';

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
  NEW_HOBBY = 'new_hobby',
  
  // Secondary School Events
  FIRST_CRUSH = 'first_crush',
  SCHOOL_DANCE = 'school_dance',
  PART_TIME_JOB = 'part_time_job',
  OVERSEAS_TRIP = 'overseas_trip',
  STUDENT_LEADER = 'student_leader',
  ACADEMIC_PRESSURE = 'academic_pressure',
  FRIENDSHIP_DRAMA = 'friendship_drama',
  FIRST_RELATIONSHIP = 'first_relationship',
  BREAKUP = 'breakup',
  EXAM_FAILURE = 'exam_failure',
  SCHOLARSHIP_OFFER = 'scholarship_offer',
  CCA_TRIALS = 'cca_trials',
  ENRICHMENT_PROGRAM = 'enrichment_program',
  SPORTS_SCHOLARSHIP = 'sports_scholarship',
  ARTS_SCHOLARSHIP = 'arts_scholarship',
  STEM_SCHOLARSHIP = 'stem_scholarship',
  LEADERSHIP_SCHOLARSHIP = 'leadership_scholarship',
  NATIONAL_TEAM_SELECTION = 'national_team_selection',
  INTERNATIONAL_COMPETITION = 'international_competition',
  SPECIAL_PROGRAM_INVITATION = 'special_program_invitation',
  CCA_CAPTAIN = 'cca_captain',
  
  // Post-Secondary Events
  ORIENTATION_WEEK = 'orientation_week',
  INTERNSHIP_OFFER = 'internship_offer',
  OVERSEAS_EXCHANGE = 'overseas_exchange',
  STARTUP_IDEA = 'startup_idea',
  CAREER_FAIR = 'career_fair',
  
  // NS Events
  BMT_GRADUATION = 'bmt_graduation',
  PROMOTION = 'promotion',
  OUTFIELD_EXERCISE = 'outfield_exercise',
  NS_INJURY = 'ns_injury',
  COMMENDATION = 'commendation',
  
  // University Events
  DEAN_LIST = 'dean_list',
  RESEARCH_PROJECT = 'research_project',
  CLUB_PRESIDENT = 'club_president',
  GRADUATION = 'graduation',
  
  // Career Events
  JOB_OFFER = 'job_offer',
  JOB_PROMOTION = 'job_promotion',
  JOB_LOSS = 'job_loss',
  CAREER_CHANGE = 'career_change',
  BUSINESS_SUCCESS = 'business_success',
  BUSINESS_FAILURE = 'business_failure',
  
  // Life Events
  ENGAGEMENT = 'engagement',
  WEDDING = 'wedding',
  FIRST_CHILD = 'first_child',
  BTO_BALLOT = 'bto_ballot',
  HOUSE_PURCHASE = 'house_purchase',
  INHERITANCE = 'inheritance',
  HEALTH_CRISIS = 'health_crisis',
  WINDFALL = 'windfall'
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
  SCHOLAR = 'scholar',
  
  // New Achievements
  MILLIONAIRE = 'millionaire',
  HOMEOWNER = 'homeowner',
  FAMILY_PERSON = 'family_person',
  CAREER_MASTER = 'career_master',
  ENTREPRENEUR = 'entrepreneur',
  LIFELONG_LEARNER = 'lifelong_learner',
  COMMUNITY_LEADER = 'community_leader',
  HEALTHY_LIVING = 'healthy_living',
  RELATIONSHIP_EXPERT = 'relationship_expert',
  COMPLETE_LIFE = 'complete_life'
}

export enum RelationshipType {
  FAMILY = 'family',
  FRIEND = 'friend',
  BEST_FRIEND = 'best_friend',
  RIVAL = 'rival',
  MENTOR = 'mentor',
  CRUSH = 'crush',
  PARTNER = 'partner',
  SPOUSE = 'spouse',
  CHILD = 'child',
  COLLEAGUE = 'colleague',
  BUSINESS_PARTNER = 'business_partner'
}

export interface PlayerStats {
  wealth: number;
  happiness: number;
  health: number;
  socialImpact: number;
  academicSkill: number;
  stress?: number;
  reputation?: number;
  workExperience?: number;
  leadership?: number;
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
  avatarCustomization?: import('./avatar').AvatarCustomization;
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
  personalityTraits?: PersonalityTrait[];
  relationships?: Relationship[];
  achievements?: Achievement[];
  eventHistory?: string[];
  examScore?: number;
  postSecondaryOptions?: import('./lifestages').PostSecondaryPath[];
  
  // Life stage data
  lifeStageProgress?: import('./lifestages').LifeStageProgress;
  secondarySchoolData?: import('./lifestages').SecondarySchoolData;
  postSecondaryData?: import('./lifestages').PostSecondaryData;
  nsData?: import('./lifestages').NSData;
  universityData?: import('./lifestages').UniversityData;
  careerData?: import('./lifestages').CareerData;
  familyData?: import('./lifestages').FamilyData;
  housingData?: import('./lifestages').HousingData;
  cpfData?: import('./lifestages').CPFData;
  
  // Investment portfolio
  portfolio?: import('./assets').Portfolio;
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
  requiresStage?: import('./lifestages').LifeStage;
  requiresGender?: import('./avatar').Gender;
  requiresCCASkill?: number; // Minimum CCA skill level required
  requiresCCATypes?: string[]; // Specific CCA types that qualify
}

export interface GameState {
  player: Player;
  currentYear: number;
  isGameComplete: boolean;
  gamePhase: 'primary' | 'secondary' | 'post_secondary' | 'post_secondary_selection' | 'ns' | 'university' | 'career' | 'retirement' | 'completed';
  lastRandomEventYear?: number;
  yearlyReports?: YearlyReport[];
}

