import { SESData, CCAOptionData, RandomEventData, SESClass, CCAOption, RandomEvent } from '../types';

export const SES_CONFIG: Record<SESClass, SESData> = {
  [SESClass.LOWER]: {
    class: SESClass.LOWER,
    startingStats: {
      wealth: 0,
      happiness: 60,
      health: 60,
      socialImpact: 30,
      academicSkill: 20
    },
    dailyAllowanceRange: [2, 2],
    maxTuitionSubjects: 0,
    parentsOccupation: 'Taxi Driver & Hawker'
  },
  [SESClass.MIDDLE]: {
    class: SESClass.MIDDLE,
    startingStats: {
      wealth: 100,
      happiness: 65,
      health: 70,
      socialImpact: 35,
      academicSkill: 25
    },
    dailyAllowanceRange: [3, 5],
    maxTuitionSubjects: 1,
    parentsOccupation: 'Executive & Teacher'
  },
  [SESClass.UPPER]: {
    class: SESClass.UPPER,
    startingStats: {
      wealth: 300,
      happiness: 70,
      health: 75,
      socialImpact: 40,
      academicSkill: 30
    },
    dailyAllowanceRange: [10, 20],
    maxTuitionSubjects: 2,
    parentsOccupation: 'Doctor & Lawyer'
  }
};

export const CCA_OPTIONS: CCAOptionData[] = [
  { id: CCAOption.FOOTBALL, name: 'Football', emoji: '⚽', description: 'Develop teamwork and physical fitness' },
  { id: CCAOption.BASKETBALL, name: 'Basketball', emoji: '🏀', description: 'Build coordination and strategic thinking' },
  { id: CCAOption.BADMINTON, name: 'Badminton', emoji: '🏸', description: 'Improve reflexes and agility' },
  { id: CCAOption.CODING, name: 'Coding', emoji: '💻', description: 'Learn programming and logical thinking' },
  { id: CCAOption.ROBOTICS, name: 'Robotics', emoji: '🤖', description: 'Explore engineering and innovation' },
  { id: CCAOption.ART, name: 'Art', emoji: '🎨', description: 'Express creativity and visual thinking' },
  { id: CCAOption.BALLET, name: 'Ballet', emoji: '🩰', description: 'Develop grace and discipline' },
  { id: CCAOption.CHOIR, name: 'Choir', emoji: '🎤', description: 'Build musical skills and confidence' },
  { id: CCAOption.SCIENCE_CLUB, name: 'Science Club', emoji: '🧪', description: 'Explore scientific concepts and experiments' },
  { id: CCAOption.DEBATE, name: 'Debate', emoji: '🗣️', description: 'Develop critical thinking and public speaking' }
];

export const RANDOM_EVENTS: RandomEventData[] = [
  {
    id: RandomEvent.BULLIED,
    name: 'Bullied at School',
    description: 'You experienced bullying this year',
    statChanges: { happiness: -5 },
    probability: 0.1
  },
  {
    id: RandomEvent.PARENTS_DIVORCE,
    name: 'Parents Divorce',
    description: 'Your parents got divorced',
    statChanges: { happiness: -10 },
    probability: 0.05
  },
  {
    id: RandomEvent.BEST_FRIEND,
    name: 'Makes a Best Friend',
    description: 'You made a close friend this year',
    statChanges: { happiness: 8 },
    probability: 0.15
  },
  {
    id: RandomEvent.ERASER_BUSINESS,
    name: 'Eraser-Selling Business',
    description: 'You started a small eraser-selling business',
    // Wealth will be generated dynamically at event application time
    statChanges: { wealth: 0 },
    probability: 0.1
  },
  {
    id: RandomEvent.MINOR_FLU,
    name: 'Minor Flu',
    description: 'You caught a minor flu this year',
    statChanges: { health: -3 },
    probability: 0.2
  }
];

export const PSLE_STREAM_THRESHOLDS = {
  INTEGRATED_PROGRAMME: 50,
  EXPRESS: 40,
  NORMAL_ACADEMIC: 20
};

export const ACTIVITY_POINTS_PER_YEAR = 10;
export const HEALTHY_MEAL_COST = 5;
export const UNHEALTHY_MEAL_COST = 2;
export const HEALTHY_MEAL_HEALTH_BONUS = 2;
export const UNHEALTHY_MEAL_HEALTH_PENALTY = 1;
export const SPECIAL_PROGRAM_SKILL_THRESHOLD = 45;
