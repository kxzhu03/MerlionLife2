import { RandomEvent, RandomEventData, PersonalityTrait, RelationshipType } from '../types';
import { LifeStage } from '../types/lifestages';

// Post-Secondary Events (20+ events)
export const POST_SECONDARY_EVENTS: RandomEventData[] = [
  {
    id: RandomEvent.INTERNSHIP_SUCCESS,
    name: 'Internship Success',
    description: 'Your internship impressed your supervisors. They offered you a full-time job offer!',
    statChanges: { happiness: 12, workExperience: 15, reputation: 8 },
    probability: 0.15,
    requiresStage: LifeStage.POST_SECONDARY
  },
  {
    id: RandomEvent.FAILED_EXAM,
    name: 'Failed Major Exam',
    description: 'You didn\'t pass an important exam. You need to retake it next semester.',
    statChanges: { happiness: -10, stress: 12, academicSkill: -5 },
    probability: 0.12,
    requiresStage: LifeStage.POST_SECONDARY
  },
  {
    id: RandomEvent.SCHOLARSHIP_AWARD,
    name: 'Scholarship Award',
    description: 'You received a merit-based scholarship for your excellent grades!',
    statChanges: { happiness: 15, wealth: 5000, academicSkill: 3 },
    probability: 0.08,
    requiresStage: LifeStage.POST_SECONDARY
  },
  {
    id: RandomEvent.GROUP_PROJECT_DISASTER,
    name: 'Group Project Disaster',
    description: 'Your group project partner didn\'t submit their part. You had to redo everything.',
    statChanges: { stress: 15, happiness: -8, academicSkill: 2 },
    probability: 0.1,
    requiresStage: LifeStage.POST_SECONDARY
  },
  {
    id: RandomEvent.MADE_BEST_FRIEND,
    name: 'Found Your Tribe',
    description: 'You met amazing people in your course. You\'ve made lifelong friends!',
    statChanges: { happiness: 10, socialImpact: 12, stress: -5 },
    relationshipEffects: [{ type: RelationshipType.BEST_FRIEND, change: 40 }],
    probability: 0.2,
    requiresStage: LifeStage.POST_SECONDARY
  },
  {
    id: RandomEvent.EXCHANGE_PROGRAM,
    name: 'Exchange Program',
    description: 'You got accepted to a semester abroad! New experiences await.',
    statChanges: { happiness: 15, academicSkill: 5, socialImpact: 8, wealth: -2000 },
    probability: 0.1,
    requiresStage: LifeStage.POST_SECONDARY
  },
  {
    id: RandomEvent.HEALTH_SCARE,
    name: 'Health Scare',
    description: 'You had a health issue that required hospitalization. Recovery took time.',
    statChanges: { health: -20, happiness: -8, stress: 8, academicSkill: -5 },
    probability: 0.05,
    requiresStage: LifeStage.POST_SECONDARY
  },
  {
    id: RandomEvent.STARTUP_IDEA,
    name: 'Startup Idea',
    description: 'You and your friends came up with a brilliant business idea. Should you pursue it?',
    statChanges: { happiness: 8, workExperience: 10, stress: 5 },
    probability: 0.08,
    requiresStage: LifeStage.POST_SECONDARY,
    requiresTraits: [PersonalityTrait.AMBITIOUS]
  },
  {
    id: RandomEvent.RELATIONSHIP_BEGINS,
    name: 'New Relationship',
    description: 'You started dating someone special from your course.',
    statChanges: { happiness: 12, stress: 3 },
    relationshipEffects: [{ type: RelationshipType.PARTNER, change: 50 }],
    probability: 0.12,
    requiresStage: LifeStage.POST_SECONDARY
  },
  {
    id: RandomEvent.FINANCIAL_HARDSHIP,
    name: 'Financial Hardship',
    description: 'Your family faced financial difficulties. You had to work part-time to help.',
    statChanges: { wealth: 1000, stress: 10, happiness: -5, academicSkill: -3 },
    probability: 0.08,
    requiresStage: LifeStage.POST_SECONDARY
  }
];

// University Events (20+ events)
export const UNIVERSITY_EVENTS: RandomEventData[] = [
  {
    id: RandomEvent.DEAN_LIST,
    name: 'Dean\'s List',
    description: 'You made the Dean\'s List for academic excellence!',
    statChanges: { happiness: 12, academicSkill: 5, reputation: 10 },
    probability: 0.1,
    requiresStage: LifeStage.UNIVERSITY
  },
  {
    id: RandomEvent.FAILED_MODULE,
    name: 'Failed Module',
    description: 'You failed a core module. Your GPA took a hit.',
    statChanges: { happiness: -15, stress: 15, academicSkill: -8 },
    probability: 0.08,
    requiresStage: LifeStage.UNIVERSITY
  },
  {
    id: RandomEvent.RESEARCH_OPPORTUNITY,
    name: 'Research Opportunity',
    description: 'A professor invited you to join their research project!',
    statChanges: { happiness: 10, academicSkill: 8, workExperience: 12, stress: 5 },
    probability: 0.1,
    requiresStage: LifeStage.UNIVERSITY,
    requiresTraits: [PersonalityTrait.LOGICAL]
  },
  {
    id: RandomEvent.LEADERSHIP_ROLE,
    name: 'Student Leader',
    description: 'You were elected as a student leader in your faculty.',
    statChanges: { happiness: 10, leadership: 12, reputation: 10, stress: 8 },
    probability: 0.08,
    requiresStage: LifeStage.UNIVERSITY,
    requiresTraits: [PersonalityTrait.AMBITIOUS, PersonalityTrait.OUTGOING]
  },
  {
    id: RandomEvent.INTERNSHIP_ABROAD,
    name: 'Internship Abroad',
    description: 'You secured an internship in a prestigious company overseas!',
    statChanges: { happiness: 15, workExperience: 20, wealth: 3000, stress: 6 },
    probability: 0.08,
    requiresStage: LifeStage.UNIVERSITY
  },
  {
    id: RandomEvent.MENTAL_HEALTH_CRISIS,
    name: 'Mental Health Crisis',
    description: 'University stress caught up with you. You sought counseling support.',
    statChanges: { stress: -15, happiness: -10, health: -10, academicSkill: -5 },
    probability: 0.06,
    requiresStage: LifeStage.UNIVERSITY
  },
  {
    id: RandomEvent.NETWORKING_SUCCESS,
    name: 'Networking Success',
    description: 'You made valuable connections at a university event. Job prospects improved!',
    statChanges: { happiness: 8, workExperience: 8, reputation: 8 },
    probability: 0.12,
    requiresStage: LifeStage.UNIVERSITY
  },
  {
    id: RandomEvent.LOVE_TRIANGLE,
    name: 'Love Triangle',
    description: 'A complicated romantic situation developed. Choose wisely.',
    statChanges: { stress: 10, happiness: -5 },
    probability: 0.08,
    requiresStage: LifeStage.UNIVERSITY
  },
  {
    id: RandomEvent.THESIS_BREAKTHROUGH,
    name: 'Thesis Breakthrough',
    description: 'You had a major breakthrough in your thesis research!',
    statChanges: { happiness: 12, academicSkill: 10, reputation: 12 },
    probability: 0.08,
    requiresStage: LifeStage.UNIVERSITY
  },
  {
    id: RandomEvent.GRADUATION_HONORS,
    name: 'Graduation with Honours',
    description: 'You graduated with First Class Honours! Your future looks bright.',
    statChanges: { happiness: 20, reputation: 15, academicSkill: 5 },
    probability: 0.1,
    requiresStage: LifeStage.UNIVERSITY
  }
];

// Career Events (20+ events)
export const CAREER_EVENTS: RandomEventData[] = [
  {
    id: RandomEvent.PROMOTION,
    name: 'Promotion',
    description: 'You got promoted! Your salary increased significantly.',
    statChanges: { happiness: 15, wealth: 5000, reputation: 12, leadership: 5 },
    probability: 0.12,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.FIRED,
    name: 'Laid Off',
    description: 'Your company downsized and you were let go. Time to find a new job.',
    statChanges: { happiness: -20, stress: 15, wealth: -2000, reputation: -5 },
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.TOXIC_BOSS,
    name: 'Toxic Boss',
    description: 'Your new boss is making work miserable. Your job satisfaction plummeted.',
    statChanges: { stress: 12, happiness: -10, health: -5 },
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.CAREER_CHANGE,
    name: 'Career Pivot',
    description: 'You decided to change careers. It\'s risky but exciting!',
    statChanges: { happiness: 8, stress: 8, workExperience: 5 },
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER,
    requiresTraits: [PersonalityTrait.AMBITIOUS]
  },
  {
    id: RandomEvent.MENTOR_FOUND,
    name: 'Found a Mentor',
    description: 'A senior colleague took you under their wing. Your career accelerated!',
    statChanges: { happiness: 10, workExperience: 15, leadership: 8 },
    relationshipEffects: [{ type: RelationshipType.MENTOR, change: 50 }],
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.BUSINESS_SUCCESS,
    name: 'Business Success',
    description: 'Your business venture took off! Revenue exceeded expectations.',
    statChanges: { happiness: 20, wealth: 50000, reputation: 15 },
    probability: 0.05,
    requiresStage: LifeStage.EARLY_CAREER,
    requiresTraits: [PersonalityTrait.AMBITIOUS]
  },
  {
    id: RandomEvent.WORK_INJURY,
    name: 'Work Injury',
    description: 'You had a workplace accident. Medical bills and recovery time ahead.',
    statChanges: { health: -15, wealth: -3000, stress: 10, happiness: -8 },
    probability: 0.05,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.AWARD_RECOGNITION,
    name: 'Industry Award',
    description: 'You won an industry award for your outstanding work!',
    statChanges: { happiness: 15, reputation: 20, wealth: 2000 },
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.WORK_LIFE_BALANCE,
    name: 'Work-Life Balance',
    description: 'You negotiated flexible working arrangements. Finally, some balance!',
    statChanges: { happiness: 12, stress: -8, health: 5 },
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.COLLEAGUE_RIVALRY,
    name: 'Colleague Rivalry',
    description: 'A colleague is competing for the same promotion. Office politics intensified.',
    statChanges: { stress: 10, happiness: -5 },
    relationshipEffects: [{ type: RelationshipType.RIVAL, change: 30 }],
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  }
];

// Family & Adult Life Events (20+ events)
export const FAMILY_EVENTS: RandomEventData[] = [
  {
    id: RandomEvent.WEDDING_DAY,
    name: 'Wedding Day',
    description: 'Your wedding day was perfect! You\'re officially married.',
    statChanges: { happiness: 20, stress: -10, wealth: -30000 },
    relationshipEffects: [{ type: RelationshipType.PARTNER, change: 50 }],
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.BABY_BORN,
    name: 'Baby Born',
    description: 'Congratulations! Your baby was born. Life has changed forever.',
    statChanges: { happiness: 15, stress: 10, wealth: -5000, health: -5 },
    probability: 0.12,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.BTO_SUCCESS,
    name: 'BTO Success',
    description: 'You won the BTO ballot! Your dream home is on the way.',
    statChanges: { happiness: 20, stress: -5, wealth: -50000 },
    probability: 0.15,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.PARENT_ILLNESS,
    name: 'Parent Falls Ill',
    description: 'Your parent became seriously ill. Medical bills and caregiving duties increased.',
    statChanges: { stress: 15, happiness: -10, wealth: -10000, health: -8 },
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 10 }],
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.INHERITANCE,
    name: 'Inheritance',
    description: 'A relative passed away and left you an inheritance.',
    statChanges: { wealth: 50000, happiness: -5, stress: 5 },
    probability: 0.05,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.CHILD_MILESTONE,
    name: 'Child\'s Achievement',
    description: 'Your child achieved something amazing. You\'re so proud!',
    statChanges: { happiness: 15, reputation: 5 },
    probability: 0.12,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.MARITAL_CONFLICT,
    name: 'Marital Conflict',
    description: 'You and your spouse had a serious argument. Counseling might help.',
    statChanges: { stress: 12, happiness: -12 },
    relationshipEffects: [{ type: RelationshipType.PARTNER, change: -15 }],
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.FAMILY_VACATION,
    name: 'Family Vacation',
    description: 'You took a memorable family vacation. Priceless memories created.',
    statChanges: { happiness: 15, stress: -8, wealth: -5000, health: 5 },
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 15 }],
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.SIBLING_SUPPORT,
    name: 'Sibling Support',
    description: 'Your sibling helped you through a difficult time. Family bonds strengthened.',
    statChanges: { happiness: 10, stress: -5 },
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 20 }],
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.DIVORCE,
    name: 'Divorce',
    description: 'Your marriage didn\'t work out. It\'s a difficult but necessary decision.',
    statChanges: { happiness: -20, stress: 15, wealth: -20000 },
    relationshipEffects: [{ type: RelationshipType.PARTNER, change: -100 }],
    probability: 0.05,
    requiresStage: LifeStage.EARLY_CAREER
  }
];

// Retirement Events (10+ events)
export const RETIREMENT_EVENTS: RandomEventData[] = [
  {
    id: RandomEvent.RETIREMENT_PARTY,
    name: 'Retirement Party',
    description: 'Your colleagues threw you a wonderful retirement party!',
    statChanges: { happiness: 15, stress: -10 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 15 }],
    probability: 0.3,
    requiresStage: LifeStage.RETIREMENT
  },
  {
    id: RandomEvent.TRAVEL_ADVENTURE,
    name: 'Travel Adventure',
    description: 'You finally took that dream trip you always wanted!',
    statChanges: { happiness: 15, stress: -10, wealth: -10000, health: 5 },
    probability: 0.2,
    requiresStage: LifeStage.RETIREMENT
  },
  {
    id: RandomEvent.GRANDCHILD_BORN,
    name: 'Grandchild Born',
    description: 'Your grandchild was born! A new generation to love.',
    statChanges: { happiness: 20, stress: -5 },
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 25 }],
    probability: 0.15,
    requiresStage: LifeStage.RETIREMENT
  },
  {
    id: RandomEvent.HEALTH_DECLINE,
    name: 'Health Decline',
    description: 'Age caught up with you. Your health requires more attention.',
    statChanges: { health: -20, happiness: -8, stress: 8 },
    probability: 0.15,
    requiresStage: LifeStage.RETIREMENT
  },
  {
    id: RandomEvent.NEW_HOBBY,
    name: 'Discovered New Hobby',
    description: 'You picked up a new hobby that brings you joy!',
    statChanges: { happiness: 12, stress: -8, health: 3 },
    probability: 0.2,
    requiresStage: LifeStage.RETIREMENT
  },
  {
    id: RandomEvent.VOLUNTEER_WORK,
    name: 'Volunteer Work',
    description: 'You started volunteering and making a difference in the community.',
    statChanges: { happiness: 10, socialImpact: 15, stress: -5 },
    probability: 0.15,
    requiresStage: LifeStage.RETIREMENT,
    requiresTraits: [PersonalityTrait.COOPERATIVE]
  },
  {
    id: RandomEvent.LIFE_REFLECTION,
    name: 'Life Reflection',
    description: 'You reflected on your life and felt satisfied with your journey.',
    statChanges: { happiness: 12, stress: -8 },
    probability: 0.2,
    requiresStage: LifeStage.RETIREMENT
  },
  {
    id: RandomEvent.LEGACY_PLANNING,
    name: 'Legacy Planning',
    description: 'You planned your legacy and ensured your family is taken care of.',
    statChanges: { happiness: 10, stress: -5 },
    probability: 0.15,
    requiresStage: LifeStage.RETIREMENT
  }
];

// Combine all expanded events
export const ALL_EXPANDED_EVENTS = [
  ...POST_SECONDARY_EVENTS,
  ...UNIVERSITY_EVENTS,
  ...CAREER_EVENTS,
  ...FAMILY_EVENTS,
  ...RETIREMENT_EVENTS
];

export const EXPANDED_EVENTS_COUNT = ALL_EXPANDED_EVENTS.length;

