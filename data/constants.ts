import { SESData, CCAOptionData, RandomEventData, SESClass, CCAOption, RandomEvent, AchievementType, Achievement, PersonalityTrait, RelationshipType } from '../types';

export const SES_CONFIG: Record<SESClass, SESData> = {
  [SESClass.LOWER]: {
    class: SESClass.LOWER,
    startingStats: {
      wealth: 0,
      happiness: 60,
      health: 50,
      socialImpact: 30,
      academicSkill: 20,
      stress: 40,
      reputation: 50
    },
    dailyAllowanceRange: [2, 2],
    maxTuitionSubjects: 0,
    parentsOccupations: [
      'Taxi Driver & Hawker',
      'Cleaner & Cashier',
      'Delivery Rider & Retail Assistant',
      'Security Guard & Janitor',
      'Construction Worker & Stall Assistant'
    ]
  },
  [SESClass.MIDDLE]: {
    class: SESClass.MIDDLE,
    startingStats: {
      wealth: 1000,
      happiness: 65,
      health: 70,
      socialImpact: 35,
      academicSkill: 25,
      stress: 35,
      reputation: 50
    },
    dailyAllowanceRange: [3, 5],
    maxTuitionSubjects: 1,
    parentsOccupations: [
      'Executive & Teacher',
      'Nurse & Technician',
      'Police Officer & Admin Assistant',
      'Engineer & Accountant',
      'Sales Manager & Civil Servant'
    ]
  },
  [SESClass.UPPER]: {
    class: SESClass.UPPER,
    startingStats: {
      wealth: 3000,
      happiness: 70,
      health: 75,
      socialImpact: 50,
      academicSkill: 30,
      stress: 30,
      reputation: 60
    },
    dailyAllowanceRange: [10, 20],
    maxTuitionSubjects: 2,
    parentsOccupations: [
      'Doctor & Lawyer',
      'Business Owner & Consultant',
      'Professor & Architect',
      'Investor & Corporate Director',
      'Surgeon & Judge'
    ]
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
  // Original events
  {
    id: RandomEvent.BULLIED,
    name: 'Bullied at School',
    description: 'You experienced bullying this year. Some classmates made fun of you, affecting your confidence.',
    statChanges: { happiness: -5, stress: 5, reputation: -3 },
    probability: 0.1,
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: -5 }]
  },
  {
    id: RandomEvent.PARENTS_DIVORCE,
    name: 'Parents Divorce',
    description: 'Your parents got divorced this year. It was a difficult time for the whole family.',
    statChanges: { happiness: -10, stress: 8 },
    probability: 0.05,
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: -10 }]
  },
  {
    id: RandomEvent.BEST_FRIEND,
    name: 'Made a Best Friend',
    description: 'You made a close friend this year who shares your interests. You spend lots of time together!',
    statChanges: { happiness: 8, socialImpact: 3 },
    probability: 0.15,
    relationshipEffects: [{ type: RelationshipType.BEST_FRIEND, change: 20 }]
  },
  {
    id: RandomEvent.ERASER_BUSINESS,
    name: 'Eraser-Selling Business',
    description: 'You started a small eraser-selling business at school. Your classmates love the fancy designs!',
    statChanges: { wealth: 0 }, // Dynamic wealth based on SES
    probability: 0.1,
    requiresTraits: [PersonalityTrait.AMBITIOUS]
  },
  {
    id: RandomEvent.MINOR_FLU,
    name: 'Minor Flu',
    description: 'You caught a minor flu this year and missed a few days of school.',
    statChanges: { health: -3, academicSkill: -1 },
    probability: 0.2
  },
  {
    id: RandomEvent.SCHOLARSHIP,
    name: 'Mini Scholarship',
    description: 'You received a small bursary for good effort and improvement in your studies!',
    statChanges: { wealth: 50, academicSkill: 1, happiness: 5 },
    probability: 0.1
  },
  {
    id: RandomEvent.LOST_POCKET_MONEY,
    name: 'Lost Pocket Money',
    description: 'Your wallet went missing one day. You searched everywhere but never found it.',
    statChanges: { wealth: -10, happiness: -2 },
    probability: 0.1
  },
  {
    id: RandomEvent.WON_ART_CONTEST,
    name: 'Won Art Contest',
    description: 'Your drawing won a school competition! It\'s now displayed in the school hall.',
    statChanges: { happiness: 6, socialImpact: 2, reputation: 5 },
    probability: 0.08,
    requiresTraits: [PersonalityTrait.CREATIVE]
  },
  {
    id: RandomEvent.SPORT_INJURY,
    name: 'Sports Injury',
    description: 'You sprained your ankle during PE and had to sit out for a few weeks.',
    statChanges: { health: -6, happiness: -2 },
    probability: 0.08
  },
  {
    id: RandomEvent.COMMUNITY_AWARD,
    name: 'Community Award',
    description: 'You were recognised for your volunteering spirit with a community service award!',
    statChanges: { socialImpact: 6, happiness: 3, reputation: 4 },
    probability: 0.07
  },
  {
    id: RandomEvent.NEW_SIBLING,
    name: 'New Sibling',
    description: 'A baby joined your family! You\'re now a big brother/sister.',
    statChanges: { happiness: 4 },
    probability: 0.07,
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 5 }]
  },
  {
    id: RandomEvent.MOVED_HOUSE,
    name: 'Moved House',
    description: 'Your family moved to a new flat in a different neighborhood. You had to say goodbye to some friends.',
    statChanges: { happiness: -2, socialImpact: -1 },
    probability: 0.06,
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: -5 }]
  },
  {
    id: RandomEvent.SCHOOL_MERGER,
    name: 'School Merger',
    description: 'Your school merged with another school. Everything feels different now.',
    statChanges: { happiness: -1, stress: 3 },
    probability: 0.05
  },
  {
    id: RandomEvent.MENTOR_SUPPORT,
    name: 'Mentor Support',
    description: 'A caring teacher noticed you struggling and offered to tutor you after class.',
    statChanges: { academicSkill: 2, happiness: 2 },
    probability: 0.09,
    relationshipEffects: [{ type: RelationshipType.MENTOR, change: 15 }]
  },
  {
    id: RandomEvent.LIBRARY_DISCOVERY,
    name: 'Library Discovery',
    description: 'You discovered the school library and fell in love with reading adventure books!',
    statChanges: { academicSkill: 2, happiness: 1 },
    probability: 0.12
  },
  
  // NEW EVENTS
  {
    id: RandomEvent.SCHOOL_CAMP,
    name: 'School Camp Adventure',
    description: 'You went on a 3-day school camp! You made s\'mores, went on night walks, and bonded with classmates.',
    statChanges: { happiness: 7, socialImpact: 4, health: 2 },
    probability: 0.15,
    requiresYear: [4, 5, 6],
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 8 }]
  },
  {
    id: RandomEvent.CLASS_MONITOR,
    name: 'Elected Class Monitor',
    description: 'Your classmates elected you as class monitor! You help the teacher and lead by example.',
    statChanges: { happiness: 5, socialImpact: 5, reputation: 6, stress: 3 },
    probability: 0.08,
    requiresTraits: [PersonalityTrait.OUTGOING]
  },
  {
    id: RandomEvent.TALENT_SHOW,
    name: 'Talent Show Performance',
    description: 'You performed in the school talent show! Your act received a standing ovation.',
    statChanges: { happiness: 8, socialImpact: 6, reputation: 7 },
    probability: 0.1,
    requiresTraits: [PersonalityTrait.CREATIVE, PersonalityTrait.OUTGOING]
  },
  {
    id: RandomEvent.FAMILY_VACATION,
    name: 'Family Vacation',
    description: 'Your family went on a vacation to Malaysia! You had so much fun exploring new places.',
    statChanges: { happiness: 10, health: 3, stress: -5 },
    probability: 0.12,
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 8 }]
  },
  {
    id: RandomEvent.PET_ADOPTION,
    name: 'Adopted a Pet',
    description: 'Your family adopted a cute pet! You\'re responsible for feeding and caring for it.',
    statChanges: { happiness: 9, socialImpact: 2, wealth: -20 },
    probability: 0.08,
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 5 }]
  },
  {
    id: RandomEvent.MATH_OLYMPIAD,
    name: 'Math Olympiad Competition',
    description: 'You participated in a Math Olympiad and solved challenging problems. You placed in the top 20!',
    statChanges: { academicSkill: 4, happiness: 6, reputation: 5, stress: 4 },
    probability: 0.07,
    requiresTraits: [PersonalityTrait.LOGICAL]
  },
  {
    id: RandomEvent.SCIENCE_FAIR,
    name: 'Science Fair Project',
    description: 'Your volcano experiment won 2nd place at the science fair! Everyone was impressed.',
    statChanges: { academicSkill: 3, happiness: 5, socialImpact: 3, reputation: 4 },
    probability: 0.09
  },
  {
    id: RandomEvent.SPORTS_TOURNAMENT,
    name: 'Sports Tournament Victory',
    description: 'Your CCA team won the inter-school tournament! You celebrated with your teammates.',
    statChanges: { happiness: 9, health: 2, socialImpact: 5, reputation: 6 },
    probability: 0.08,
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 10 }]
  },
  {
    id: RandomEvent.CULTURAL_PERFORMANCE,
    name: 'Cultural Performance',
    description: 'You performed in a cultural show celebrating Singapore\'s diversity. It was a memorable experience!',
    statChanges: { happiness: 6, socialImpact: 5, reputation: 4 },
    probability: 0.1
  },
  {
    id: RandomEvent.BIRTHDAY_PARTY,
    name: 'Amazing Birthday Party',
    description: 'You had an amazing birthday party! Many friends came and you received wonderful gifts.',
    statChanges: { happiness: 8, socialImpact: 3 },
    probability: 0.15,
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 6 }]
  },
  {
    id: RandomEvent.LOST_ITEM,
    name: 'Lost Favorite Item',
    description: 'You lost your favorite toy/book. You were sad for days but eventually moved on.',
    statChanges: { happiness: -4 },
    probability: 0.12
  },
  {
    id: RandomEvent.FOUND_MONEY,
    name: 'Found Money',
    description: 'You found $20 on the ground! You decided to keep it after checking if anyone lost it.',
    statChanges: { wealth: 20, happiness: 3 },
    probability: 0.08
  },
  {
    id: RandomEvent.HELPED_ELDERLY,
    name: 'Helped Elderly Neighbor',
    description: 'You helped an elderly neighbor carry groceries. They gave you a small reward and praised you.',
    statChanges: { happiness: 4, socialImpact: 4, reputation: 3 },
    probability: 0.11,
    requiresTraits: [PersonalityTrait.COOPERATIVE]
  },
  {
    id: RandomEvent.CYBER_WELLNESS,
    name: 'Cyber Wellness Workshop',
    description: 'You attended a cyber wellness workshop and learned about online safety and digital citizenship.',
    statChanges: { academicSkill: 1, socialImpact: 2 },
    probability: 0.1
  },
  {
    id: RandomEvent.FIELD_TRIP,
    name: 'Educational Field Trip',
    description: 'Your class went on a field trip to the Science Centre! You learned so much and had fun.',
    statChanges: { happiness: 6, academicSkill: 2, socialImpact: 2 },
    probability: 0.14,
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 4 }]
  },
  {
    id: RandomEvent.SCHOOL_PLAY,
    name: 'School Play Participation',
    description: 'You acted in the school play! Despite the nerves, you delivered your lines perfectly.',
    statChanges: { happiness: 7, socialImpact: 4, reputation: 5, stress: 5 },
    probability: 0.09,
    requiresTraits: [PersonalityTrait.CREATIVE]
  },
  {
    id: RandomEvent.PREFECT_NOMINATION,
    name: 'Prefect Nomination',
    description: 'You were nominated to be a prefect! Teachers trust you to be a role model.',
    statChanges: { happiness: 6, socialImpact: 6, reputation: 8, stress: 4 },
    probability: 0.06,
    requiresYear: [5, 6]
  },
  {
    id: RandomEvent.EXAM_STRESS,
    name: 'Exam Stress',
    description: 'The exams were particularly stressful this year. You felt overwhelmed at times.',
    statChanges: { stress: 8, happiness: -4, health: -2 },
    probability: 0.13,
    requiresYear: [5, 6]
  },
  {
    id: RandomEvent.GROUP_PROJECT,
    name: 'Successful Group Project',
    description: 'Your group project was a huge success! Everyone worked well together.',
    statChanges: { happiness: 5, academicSkill: 2, socialImpact: 3 },
    probability: 0.12,
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 5 }]
  },
  {
    id: RandomEvent.RIVALRY,
    name: 'Academic Rivalry',
    description: 'A friendly rivalry developed with a classmate. You both push each other to do better.',
    statChanges: { academicSkill: 3, stress: 4, happiness: 2 },
    probability: 0.08,
    requiresTraits: [PersonalityTrait.COMPETITIVE],
    relationshipEffects: [{ type: RelationshipType.RIVAL, change: 15 }]
  },
  {
    id: RandomEvent.RECONCILIATION,
    name: 'Reconciliation',
    description: 'You made up with a friend after a disagreement. Your friendship is stronger now.',
    statChanges: { happiness: 6, socialImpact: 3 },
    probability: 0.09,
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 12 }]
  },
  {
    id: RandomEvent.GRANDPARENT_VISIT,
    name: 'Grandparent Visit',
    description: 'Your grandparents visited and shared stories from their childhood. You felt connected to your heritage.',
    statChanges: { happiness: 7, socialImpact: 2 },
    probability: 0.11,
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 8 }]
  },
  {
    id: RandomEvent.LEARNING_DISABILITY,
    name: 'Learning Challenge Identified',
    description: 'Teachers identified a learning challenge. With proper support, you\'re learning to overcome it.',
    statChanges: { stress: 6, happiness: -3, academicSkill: -2 },
    probability: 0.04,
    relationshipEffects: [{ type: RelationshipType.MENTOR, change: 10 }]
  },
  {
    id: RandomEvent.GIFTED_PROGRAM,
    name: 'Gifted Education Programme',
    description: 'You were selected for the Gifted Education Programme! You\'ll get special enrichment lessons.',
    statChanges: { happiness: 8, academicSkill: 5, reputation: 7, stress: 5 },
    probability: 0.05,
    requiresYear: [4, 5]
  },
  {
    id: RandomEvent.FOOD_POISONING,
    name: 'Food Poisoning',
    description: 'You got food poisoning from the canteen and missed a week of school.',
    statChanges: { health: -8, happiness: -4, academicSkill: -2 },
    probability: 0.06
  },
  {
    id: RandomEvent.PERFECT_ATTENDANCE,
    name: 'Perfect Attendance Award',
    description: 'You received a perfect attendance award for not missing a single day of school!',
    statChanges: { happiness: 5, reputation: 4, health: 2 },
    probability: 0.08
  },
  {
    id: RandomEvent.DETENTION,
    name: 'Detention',
    description: 'You got detention for talking in class. It was embarrassing and you learned your lesson.',
    statChanges: { happiness: -5, reputation: -6, stress: 3 },
    probability: 0.07
  },
  {
    id: RandomEvent.TEACHER_PRAISE,
    name: 'Teacher\'s Praise',
    description: 'Your teacher praised you in front of the whole class for your excellent work!',
    statChanges: { happiness: 6, academicSkill: 1, reputation: 5 },
    probability: 0.13
  },
  {
    id: RandomEvent.PEER_TUTORING,
    name: 'Peer Tutoring',
    description: 'You helped tutor a struggling classmate. Teaching others helped you learn better too!',
    statChanges: { happiness: 5, academicSkill: 2, socialImpact: 4 },
    probability: 0.1,
    requiresTraits: [PersonalityTrait.COOPERATIVE],
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 8 }]
  },
  {
    id: RandomEvent.LOST_FRIEND,
    name: 'Lost a Friend',
    description: 'A close friend moved away to another country. You miss them but stay in touch online.',
    statChanges: { happiness: -6, socialImpact: -3 },
    probability: 0.06,
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: -15 }]
  },
  {
    id: RandomEvent.NEW_HOBBY,
    name: 'Discovered New Hobby',
    description: 'You discovered a new hobby that you\'re passionate about! It brings you joy.',
    statChanges: { happiness: 7, health: 2 },
    probability: 0.11
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: AchievementType.ACADEMIC_EXCELLENCE,
    name: 'Academic Excellence',
    description: 'Reach 80+ Academic Skill',
    unlocked: false,
    icon: '📚'
  },
  {
    id: AchievementType.SOCIAL_BUTTERFLY,
    name: 'Social Butterfly',
    description: 'Maintain 5+ strong relationships',
    unlocked: false,
    icon: '🦋'
  },
  {
    id: AchievementType.ATHLETIC_STAR,
    name: 'Athletic Star',
    description: 'Reach 80+ CCA Skill in sports',
    unlocked: false,
    icon: '⭐'
  },
  {
    id: AchievementType.CREATIVE_GENIUS,
    name: 'Creative Genius',
    description: 'Reach 80+ CCA Skill in arts',
    unlocked: false,
    icon: '🎨'
  },
  {
    id: AchievementType.COMMUNITY_HERO,
    name: 'Community Hero',
    description: 'Reach 80+ Social Impact',
    unlocked: false,
    icon: '🦸'
  },
  {
    id: AchievementType.FINANCIAL_WIZARD,
    name: 'Financial Wizard',
    description: 'Accumulate S$5000+ wealth',
    unlocked: false,
    icon: '💰'
  },
  {
    id: AchievementType.PERFECT_BALANCE,
    name: 'Perfect Balance',
    description: 'Keep all stats above 60',
    unlocked: false,
    icon: '⚖️'
  },
  {
    id: AchievementType.SURVIVOR,
    name: 'Survivor',
    description: 'Complete primary school with health never below 20',
    unlocked: false,
    icon: '💪'
  },
  {
    id: AchievementType.POPULAR,
    name: 'Popular',
    description: 'Reach 90+ Reputation',
    unlocked: false,
    icon: '👑'
  },
  {
    id: AchievementType.SCHOLAR,
    name: 'Scholar',
    description: 'Get into Integrated Programme',
    unlocked: false,
    icon: '🎓'
  }
];

export const PERSONALITY_TRAITS = [
  { id: PersonalityTrait.SHY, name: 'Shy', description: 'Prefers quiet activities, slower to make friends' },
  { id: PersonalityTrait.OUTGOING, name: 'Outgoing', description: 'Loves social activities, makes friends easily' },
  { id: PersonalityTrait.CREATIVE, name: 'Creative', description: 'Excels in arts and creative thinking' },
  { id: PersonalityTrait.LOGICAL, name: 'Logical', description: 'Excels in math and analytical thinking' },
  { id: PersonalityTrait.COMPETITIVE, name: 'Competitive', description: 'Driven to be the best, thrives on challenges' },
  { id: PersonalityTrait.COOPERATIVE, name: 'Cooperative', description: 'Works well in teams, helps others' },
  { id: PersonalityTrait.AMBITIOUS, name: 'Ambitious', description: 'Sets high goals, works hard to achieve them' },
  { id: PersonalityTrait.RELAXED, name: 'Relaxed', description: 'Takes life easy, less stressed' }
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

