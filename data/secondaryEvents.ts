import { RandomEvent, RandomEventData, PersonalityTrait, RelationshipType } from '../types';
import { LifeStage } from '../types/lifestages';
import { Gender } from '../types/avatar';

export const SECONDARY_EVENTS: RandomEventData[] = [
  // Year 1 Events
  {
    id: RandomEvent.ORIENTATION_WEEK,
    name: 'Orientation Week',
    description: 'Your first week of secondary school! You made new friends and learned about the school.',
    statChanges: { happiness: 8, socialImpact: 5, stress: 3 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 15 }],
    probability: 0.9,
    requiresYear: [1],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.FIRST_CRUSH,
    name: 'First Crush',
    description: 'You developed feelings for a classmate. Your heart races whenever they\'re near.',
    statChanges: { happiness: 6, stress: 4 },
    relationshipEffects: [{ type: RelationshipType.CRUSH, change: 30 }],
    probability: 0.35,
    requiresYear: [1, 2],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.CCA_TRIALS,
    name: 'CCA Trials',
    description: 'You tried out different CCAs to find your passion. It was exciting exploring new activities!',
    statChanges: { happiness: 5, health: 3, socialImpact: 4 },
    probability: 0.4,
    requiresYear: [1],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.SCHOOL_CAMP,
    name: 'Secondary 1 Camp',
    description: 'A 3-day bonding camp with your classmates. You overcame challenges together!',
    statChanges: { happiness: 10, health: -2, socialImpact: 8, leadership: 3 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 12 }],
    probability: 0.7,
    requiresYear: [1],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.LOST_FRIEND,
    name: 'Drifted Apart',
    description: 'You and a primary school friend drifted apart as you went to different schools.',
    statChanges: { happiness: -6, stress: 3 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: -15 }],
    probability: 0.25,
    requiresYear: [1],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },

  // Year 2 Events
  {
    id: RandomEvent.ACADEMIC_PRESSURE,
    name: 'Academic Pressure',
    description: 'The workload is intense. You feel overwhelmed by assignments and tests.',
    statChanges: { stress: 12, happiness: -7, health: -4 },
    probability: 0.3,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.FRIENDSHIP_DRAMA,
    name: 'Friendship Drama',
    description: 'A misunderstanding caused tension in your friend group. It was emotionally draining.',
    statChanges: { happiness: -8, stress: 6 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: -10 }],
    probability: 0.22,
    requiresYear: [2, 3],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.FIRST_RELATIONSHIP,
    name: 'First Relationship',
    description: 'You started dating someone special! Everything feels new and exciting.',
    statChanges: { happiness: 15, stress: 3, academicSkill: -2 },
    relationshipEffects: [{ type: RelationshipType.PARTNER, change: 50 }],
    probability: 0.15,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL,
    requiresTraits: [PersonalityTrait.OUTGOING]
  },
  {
    id: RandomEvent.SPORTS_TOURNAMENT,
    name: 'Inter-School Competition',
    description: 'Your CCA competed against other schools. The experience was thrilling!',
    statChanges: { happiness: 8, health: 5, reputation: 6, stress: 4 },
    probability: 0.25,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.PART_TIME_JOB,
    name: 'Part-Time Job',
    description: 'You got a part-time job at a fast food restaurant. It\'s tiring but you\'re earning money!',
    statChanges: { wealth: 300, workExperience: 8, stress: 5, academicSkill: -3, health: -2 },
    probability: 0.18,
    requiresYear: [3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },

  // Year 3 Events
  {
    id: RandomEvent.STUDENT_LEADER,
    name: 'Student Leadership',
    description: 'You were appointed as a student leader. It\'s a big responsibility but rewarding!',
    statChanges: { leadership: 10, reputation: 8, stress: 6, happiness: 5 },
    probability: 0.12,
    requiresYear: [3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL,
    requiresTraits: [PersonalityTrait.AMBITIOUS, PersonalityTrait.OUTGOING]
  },
  {
    id: RandomEvent.BREAKUP,
    name: 'Relationship Breakup',
    description: 'Your relationship ended. It hurts, but you\'ll get through this.',
    statChanges: { happiness: -12, stress: 8, academicSkill: -2 },
    relationshipEffects: [{ type: RelationshipType.PARTNER, change: -60 }],
    probability: 0.1,
    requiresYear: [3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.OVERSEAS_TRIP,
    name: 'School Overseas Trip',
    description: 'Your class went on an educational trip abroad. You learned so much and made memories!',
    statChanges: { happiness: 12, academicSkill: 4, socialImpact: 4, wealth: -400 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 10 }],
    probability: 0.15,
    requiresYear: [2, 3],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.EXAM_FAILURE,
    name: 'Failed Major Exam',
    description: 'You didn\'t do well on an important exam. Your parents are disappointed.',
    statChanges: { happiness: -10, stress: 10, academicSkill: -4, reputation: -5 },
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: -8 }],
    probability: 0.18,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.SCHOLARSHIP_OFFER,
    name: 'Scholarship Offer',
    description: 'You received a scholarship offer for your excellent academic performance!',
    statChanges: { happiness: 12, wealth: 1500, reputation: 10, academicSkill: 3 },
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 15 }],
    probability: 0.06,
    requiresYear: [3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL,
    requiresTraits: [PersonalityTrait.AMBITIOUS]
  },

  // Year 4 Events
  {
    id: RandomEvent.SCHOOL_DANCE,
    name: 'School Dance',
    description: 'The annual school dance! You had an amazing time with friends.',
    statChanges: { happiness: 10, socialImpact: 6, stress: -3 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 8 }],
    probability: 0.3,
    requiresYear: [3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.EXAM_STRESS,
    name: 'O-Level/N-Level Stress',
    description: 'The pressure of major exams is overwhelming. You\'re studying non-stop.',
    statChanges: { stress: 15, happiness: -8, health: -5, academicSkill: 3 },
    probability: 0.5,
    requiresYear: [4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.TEACHER_PRAISE,
    name: 'Teacher\'s Recognition',
    description: 'A teacher praised your improvement and dedication. It feels great to be recognized!',
    statChanges: { happiness: 8, academicSkill: 2, reputation: 5 },
    relationshipEffects: [{ type: RelationshipType.MENTOR, change: 12 }],
    probability: 0.2,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.PEER_TUTORING,
    name: 'Tutored Classmates',
    description: 'You helped struggling classmates with their studies. Teaching others helped you learn too!',
    statChanges: { happiness: 6, academicSkill: 3, socialImpact: 8, leadership: 4 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 10 }],
    probability: 0.15,
    requiresYear: [3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL,
    requiresTraits: [PersonalityTrait.COOPERATIVE]
  },
  {
    id: RandomEvent.RIVALRY,
    name: 'Academic Rivalry',
    description: 'A competitive classmate became your rival. You push each other to excel.',
    statChanges: { academicSkill: 4, stress: 6, reputation: 3 },
    relationshipEffects: [{ type: RelationshipType.RIVAL, change: 25 }],
    probability: 0.12,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL,
    requiresTraits: [PersonalityTrait.COMPETITIVE]
  },

  // Social Events
  {
    id: RandomEvent.BIRTHDAY_PARTY,
    name: 'Birthday Celebration',
    description: 'You celebrated your birthday with close friends. It was a memorable day!',
    statChanges: { happiness: 10, socialImpact: 4, wealth: -50 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 8 }],
    probability: 0.2,
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.RECONCILIATION,
    name: 'Friendship Reconciliation',
    description: 'You made up with a friend after a disagreement. Your friendship is stronger now.',
    statChanges: { happiness: 8, stress: -4 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 15 }],
    probability: 0.15,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.CYBER_WELLNESS,
    name: 'Social Media Drama',
    description: 'Drama on social media affected your friendships. You learned to be more careful online.',
    statChanges: { happiness: -5, stress: 5, reputation: -3 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: -6 }],
    probability: 0.18,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },

  // Achievement Events
  {
    id: RandomEvent.CULTURAL_PERFORMANCE,
    name: 'Cultural Performance',
    description: 'You performed in a school cultural event. The applause was exhilarating!',
    statChanges: { happiness: 10, reputation: 8, stress: 6 },
    probability: 0.15,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL,
    requiresTraits: [PersonalityTrait.CREATIVE, PersonalityTrait.OUTGOING]
  },
  {
    id: RandomEvent.SCIENCE_FAIR,
    name: 'Science Fair Winner',
    description: 'Your science project won an award at the school science fair!',
    statChanges: { happiness: 12, academicSkill: 5, reputation: 10 },
    relationshipEffects: [{ type: RelationshipType.MENTOR, change: 10 }],
    probability: 0.08,
    requiresYear: [2, 3],
    requiresStage: LifeStage.SECONDARY_SCHOOL,
    requiresTraits: [PersonalityTrait.LOGICAL]
  },
  {
    id: RandomEvent.TALENT_SHOW,
    name: 'Talent Show Performance',
    description: 'You showcased your talent at the school talent show. Everyone was impressed!',
    statChanges: { happiness: 10, reputation: 12, stress: 5 },
    probability: 0.12,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL,
    requiresTraits: [PersonalityTrait.CREATIVE, PersonalityTrait.OUTGOING]
  },
  {
    id: RandomEvent.MATH_OLYMPIAD,
    name: 'Math Olympiad',
    description: 'You represented your school at the Math Olympiad. It was challenging but rewarding!',
    statChanges: { happiness: 8, academicSkill: 6, reputation: 8, stress: 7 },
    probability: 0.08,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL,
    requiresTraits: [PersonalityTrait.LOGICAL, PersonalityTrait.COMPETITIVE]
  },

  // Family Events
  {
    id: RandomEvent.FAMILY_VACATION,
    name: 'Family Vacation',
    description: 'Your family went on a vacation together. Quality time with loved ones!',
    statChanges: { happiness: 12, stress: -5, health: 3, wealth: -500 },
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 12 }],
    probability: 0.15,
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.GRANDPARENT_VISIT,
    name: 'Grandparents Visit',
    description: 'Your grandparents visited and shared wisdom. You enjoyed their company.',
    statChanges: { happiness: 8, wealth: 100 },
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 10 }],
    probability: 0.18,
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.NEW_SIBLING,
    name: 'New Sibling',
    description: 'Your parents had another baby! You\'re now an older sibling.',
    statChanges: { happiness: 5, stress: 4, socialImpact: 3 },
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 15 }],
    probability: 0.08,
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },

  // Challenges
  {
    id: RandomEvent.BULLIED,
    name: 'Bullying Incident',
    description: 'You experienced bullying. It was a difficult time, but you sought help.',
    statChanges: { happiness: -12, stress: 10, health: -5, reputation: -4 },
    probability: 0.08,
    requiresYear: [1, 2],
    requiresStage: LifeStage.SECONDARY_SCHOOL,
    requiresTraits: [PersonalityTrait.SHY]
  },
  {
    id: RandomEvent.LEARNING_DISABILITY,
    name: 'Learning Support',
    description: 'You discovered you learn differently and got support. It\'s helping you improve!',
    statChanges: { academicSkill: 3, happiness: 4, stress: -3 },
    relationshipEffects: [{ type: RelationshipType.MENTOR, change: 15 }],
    probability: 0.06,
    requiresYear: [1, 2],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.HEALTH_CRISIS,
    name: 'Health Issue',
    description: 'You fell seriously ill and missed school. Recovery took time.',
    statChanges: { health: -15, happiness: -8, academicSkill: -4, stress: 6 },
    probability: 0.05,
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.DETENTION,
    name: 'Got Detention',
    description: 'You got detention for breaking school rules. It was embarrassing.',
    statChanges: { happiness: -6, reputation: -8, stress: 5 },
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: -10 }],
    probability: 0.1,
    requiresYear: [2, 3],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },

  // Positive Events
  {
    id: RandomEvent.PERFECT_ATTENDANCE,
    name: 'Perfect Attendance Award',
    description: 'You received an award for perfect attendance throughout the year!',
    statChanges: { happiness: 6, reputation: 5, health: 2 },
    probability: 0.12,
    requiresYear: [1, 2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.FOUND_MONEY,
    name: 'Found Money',
    description: 'You found money on the ground and returned it. The owner rewarded you!',
    statChanges: { happiness: 5, wealth: 50, reputation: 4, socialImpact: 3 },
    probability: 0.08,
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.HELPED_ELDERLY,
    name: 'Helped Elderly',
    description: 'You helped an elderly person and it felt good to make a difference.',
    statChanges: { happiness: 6, socialImpact: 8, reputation: 4 },
    probability: 0.15,
    requiresStage: LifeStage.SECONDARY_SCHOOL,
    requiresTraits: [PersonalityTrait.COOPERATIVE]
  },
  {
    id: RandomEvent.NEW_HOBBY,
    name: 'Discovered New Hobby',
    description: 'You discovered a new hobby that brings you joy and relaxation.',
    statChanges: { happiness: 8, stress: -5, health: 3 },
    probability: 0.18,
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },

  // Special IP Events
  {
    id: RandomEvent.ENRICHMENT_PROGRAM,
    name: 'IP Enrichment Program',
    description: 'You participated in a special enrichment program. It broadened your horizons!',
    statChanges: { happiness: 8, academicSkill: 5, leadership: 4 },
    probability: 0.2,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.RESEARCH_PROJECT,
    name: 'Research Project',
    description: 'You worked on an independent research project. It was intellectually stimulating!',
    statChanges: { academicSkill: 6, stress: 6, reputation: 6 },
    relationshipEffects: [{ type: RelationshipType.MENTOR, change: 10 }],
    probability: 0.15,
    requiresYear: [3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },

  // Career Exploration
  {
    id: RandomEvent.CAREER_FAIR,
    name: 'Career Fair',
    description: 'You attended a career fair and learned about different professions.',
    statChanges: { happiness: 5, workExperience: 3, academicSkill: 2 },
    probability: 0.2,
    requiresYear: [3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.INTERNSHIP_OFFER,
    name: 'Holiday Internship',
    description: 'You got a holiday internship opportunity. Real work experience!',
    statChanges: { happiness: 8, workExperience: 10, wealth: 400, stress: 4 },
    probability: 0.1,
    requiresYear: [3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL,
    requiresTraits: [PersonalityTrait.AMBITIOUS]
  },

  // Random Fun Events
  {
    id: RandomEvent.SCHOOL_PLAY,
    name: 'School Play',
    description: 'You participated in the school play. It was fun being on stage!',
    statChanges: { happiness: 10, reputation: 6, stress: 5 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 8 }],
    probability: 0.15,
    requiresYear: [2, 3],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.FIELD_TRIP,
    name: 'Educational Field Trip',
    description: 'Your class went on a field trip. Learning outside the classroom was refreshing!',
    statChanges: { happiness: 8, academicSkill: 3, socialImpact: 4 },
    probability: 0.25,
    requiresYear: [1, 2, 3],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },
  {
    id: RandomEvent.GROUP_PROJECT,
    name: 'Group Project Success',
    description: 'Your group project was a success! Teamwork makes the dream work.',
    statChanges: { happiness: 7, academicSkill: 4, socialImpact: 6, leadership: 3 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 8 }],
    probability: 0.22,
    requiresYear: [2, 3, 4],
    requiresStage: LifeStage.SECONDARY_SCHOOL
  }
];

// Export event count for reference
export const SECONDARY_EVENTS_COUNT = SECONDARY_EVENTS.length;

