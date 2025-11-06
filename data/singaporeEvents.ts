import { RandomEvent, RandomEventData, PersonalityTrait, RelationshipType, Gender } from '../types';
import { LifeStage } from '../types/lifestages';

// Singapore-Specific Events with Deep Storylines
export const SINGAPORE_EVENTS: RandomEventData[] = [
  // HDB & Housing Events
  {
    id: RandomEvent.HDB_KEY_COLLECTION,
    name: 'HDB Key Collection Day',
    description: 'You collected the keys to your new HDB flat! Your dream home is finally yours. Moving day is next week.',
    statChanges: { happiness: 20, stress: 5, wealth: -1000 },
    probability: 0.15,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.BTO_BALLOT_LOSS,
    name: 'BTO Ballot Disappointment',
    description: "You didn't win the BTO ballot this round. Only 30% success rate. You'll try again next year.",
    statChanges: { happiness: -10, stress: 8 },
    probability: 0.12,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.UPGRADING_FLAT,
    name: 'Upgrading to Larger Flat',
    description: 'Your family is growing. You sold your 3-room and upgraded to a 4-room HDB. Better space for everyone!',
    statChanges: { happiness: 15, wealth: -20000, stress: -5 },
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.PROPERTY_MARKET_CRASH,
    name: 'Property Market Downturn',
    description: "The property market crashed. Your HDB value dropped by 15%. But you're not selling, so it's just paper loss.",
    statChanges: { stress: 8, happiness: -5 },
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER
  },

  // CPF & Financial Events
  {
    id: RandomEvent.CPF_WITHDRAWAL_APPROVED,
    name: 'CPF Housing Withdrawal Approved',
    description: 'Your CPF withdrawal for housing was approved! $50,000 transferred to your account.',
    statChanges: { happiness: 12, wealth: 50000 },
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.CPF_LIFE_BEGINS,
    name: 'CPF LIFE Payouts Begin',
    description: "You've reached 65 and CPF LIFE payouts started. Monthly income of $1,500 for life!",
    statChanges: { happiness: 15, stress: -10 },
    probability: 0.2,
    requiresStage: LifeStage.RETIREMENT
  },
  {
    id: RandomEvent.MEDISAVE_WITHDRAWAL,
    name: 'Medisave for Medical Treatment',
    description: 'You used your Medisave account to pay for medical treatment. $3,000 covered.',
    statChanges: { health: 10, wealth: -3000 },
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER
  },

  // NS Events (Males)
  {
    id: RandomEvent.NS_ENLISTMENT,
    name: 'NS Enlistment Day',
    description: 'You reported to Tekong for Basic Military Training. Two years of your life dedicated to national service.',
    statChanges: { stress: 15, health: 5, happiness: -5 },
    probability: 0.3,
    requiresStage: LifeStage.POST_SECONDARY,
    requiresGender: Gender.MALE
  },
  {
    id: RandomEvent.NS_PROMOTION,
    name: 'NS Promotion',
    description: 'You were promoted to Lance Corporal. Your leadership was recognized. Small allowance increase.',
    statChanges: { happiness: 10, reputation: 10, wealth: 500 },
    probability: 0.15,
    requiresStage: LifeStage.POST_SECONDARY,
    requiresGender: Gender.MALE
  },
  {
    id: RandomEvent.NS_FIELD_EXERCISE,
    name: 'Grueling Field Exercise',
    description: 'A 3-day field exercise in the Straits. You were exhausted but it built your resilience.',
    statChanges: { health: -10, stress: 12, leadership: 5 },
    probability: 0.2,
    requiresStage: LifeStage.POST_SECONDARY,
    requiresGender: Gender.MALE
  },

  // Hawker & Food Culture
  {
    id: RandomEvent.HAWKER_DISCOVERY,
    name: 'Found Your Favorite Hawker Stall',
    description: 'You discovered an amazing hawker stall near your home. Cheap, delicious, and now your daily lunch spot!',
    statChanges: { happiness: 8, health: 3, wealth: -200 },
    probability: 0.15,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.HAWKER_CLOSURE,
    name: 'Favorite Hawker Stall Closed',
    description: "Your favorite hawker uncle retired. The stall you loved for years is gone. You'll miss those meals.",
    statChanges: { happiness: -8, stress: 3 },
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.FOOD_POISONING,
    name: 'Food Poisoning from Hawker',
    description: 'You got food poisoning from a hawker stall. Spent the day in the hospital. Lesson learned: check hygiene ratings.',
    statChanges: { health: -20, stress: 10, wealth: -500 },
    probability: 0.05,
    requiresStage: LifeStage.EARLY_CAREER
  },

  // MRT & Transport
  {
    id: RandomEvent.MRT_DELAY,
    name: 'MRT Breakdown',
    description: 'The MRT broke down during rush hour. You were stuck for 45 minutes. Stressful commute!',
    statChanges: { stress: 8, happiness: -5 },
    probability: 0.12,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.CAR_PURCHASE,
    name: 'Bought Your First Car',
    description: 'You saved up and bought a Toyota. No more MRT! But now you have car loan and insurance payments.',
    statChanges: { happiness: 12, wealth: -50000, stress: 5 },
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER
  },

  // Education System Events
  {
    id: RandomEvent.PSLE_STREAMING,
    name: 'PSLE Stream Placement',
    description: 'You received your PSLE results and stream placement. Your score determines your secondary school path.',
    statChanges: { stress: -10, happiness: 8 },
    probability: 0.3,
    requiresStage: LifeStage.PRIMARY_SCHOOL
  },
  {
    id: RandomEvent.TUITION_PRESSURE,
    name: 'Tuition Classes Overload',
    description: 'Your parents enrolled you in 5 tuition classes. Between school and tuition, you have no free time.',
    statChanges: { stress: 15, happiness: -10, academicSkill: 8 },
    probability: 0.1,
    requiresStage: LifeStage.PRIMARY_SCHOOL
  },
  {
    id: RandomEvent.STREAMING_REGRET,
    name: 'Regret About Stream Choice',
    description: "You're struggling in the Express stream. You wish you had chosen Normal Academic. Too late now.",
    statChanges: { stress: 10, happiness: -8, academicSkill: -5 },
    probability: 0.08,
    requiresStage: LifeStage.SECONDARY_SCHOOL
  },

  // Crypto & Investment Crashes
  {
    id: RandomEvent.CRYPTO_BOOM,
    name: 'Crypto Investment Boom',
    description: 'Your Bitcoin investment tripled! You made $30,000 in profit. Time to cash out?',
    statChanges: { happiness: 18, wealth: 30000 },
    probability: 0.06,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.CRYPTO_CRASH,
    name: 'Crypto Market Crash',
    description: 'The crypto market crashed 60% overnight. Your $50,000 investment is now worth $20,000. Devastating loss.',
    statChanges: { happiness: -20, stress: 20, wealth: -30000 },
    probability: 0.05,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.STOCK_MARKET_CRASH,
    name: 'Stock Market Correction',
    description: 'The stock market dropped 15% due to global economic concerns. Your portfolio lost $10,000.',
    statChanges: { stress: 12, happiness: -8, wealth: -10000 },
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER
  },

  // Insurance Events
  {
    id: RandomEvent.INSURANCE_CLAIM_APPROVED,
    name: 'Insurance Claim Approved',
    description: 'Your medical insurance claim was approved. $5,000 reimbursement received!',
    statChanges: { happiness: 10, wealth: 5000 },
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.INSURANCE_CLAIM_DENIED,
    name: 'Insurance Claim Denied',
    description: 'Your insurance claim was denied due to pre-existing condition clause. You have to pay $8,000 out of pocket.',
    statChanges: { happiness: -15, stress: 15, wealth: -8000 },
    probability: 0.06,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.INSURANCE_PREMIUM_INCREASE,
    name: 'Insurance Premium Hike',
    description: 'Your insurance company increased premiums by 20% due to age and health factors.',
    statChanges: { stress: 8, wealth: -2000 },
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },

  // Job Market Events
  {
    id: RandomEvent.RETRENCHMENT,
    name: 'Company Retrenchment',
    description: 'Your company announced retrenchment. You received a severance package but need to find a new job.',
    statChanges: { happiness: -15, stress: 20, wealth: 20000 },
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.SALARY_FREEZE,
    name: 'Salary Freeze',
    description: 'Due to economic downturn, the company announced a salary freeze for 2 years. No raise for you.',
    statChanges: { happiness: -8, stress: 8 },
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.BONUS_SURPRISE,
    name: 'Unexpected Bonus',
    description: 'Your company gave an unexpected mid-year bonus! $5,000 extra in your account.',
    statChanges: { happiness: 15, wealth: 5000 },
    probability: 0.12,
    requiresStage: LifeStage.EARLY_CAREER
  },

  // Family & Relationship Events
  {
    id: RandomEvent.PARENTS_RETIREMENT,
    name: 'Parents Retired',
    description: 'Your parents retired. You now have more responsibility to support them financially.',
    statChanges: { stress: 10, happiness: 5, wealth: -2000 },
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.EXTENDED_FAMILY_GATHERING,
    name: 'Extended Family Gathering',
    description: 'Chinese New Year gathering with extended family. Lots of relatives, food, and gossip!',
    statChanges: { happiness: 12, stress: 5 },
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: 10 }],
    probability: 0.15,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.FAMILY_BUSINESS_CONFLICT,
    name: 'Family Business Conflict',
    description: 'Your family business had a major conflict. You had to choose sides between parents and siblings.',
    statChanges: { stress: 18, happiness: -12 },
    relationshipEffects: [{ type: RelationshipType.FAMILY, change: -20 }],
    probability: 0.06,
    requiresStage: LifeStage.EARLY_CAREER
  },

  // Health & Pandemic Events
  {
    id: RandomEvent.COVID_LOCKDOWN,
    name: 'COVID-19 Lockdown',
    description: 'Singapore entered lockdown. You worked from home for 2 months. Monotonous but safe.',
    statChanges: { stress: 10, happiness: -8, health: -5 },
    probability: 0.05,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.VACCINATION_SIDE_EFFECTS,
    name: 'Vaccination Side Effects',
    description: 'You experienced side effects from vaccination. Fever and body aches for 2 days.',
    statChanges: { health: -10, stress: 5 },
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER
  },

  // Lifestyle Events
  {
    id: RandomEvent.JOINED_GYM,
    name: 'Joined a Gym',
    description: 'You joined a gym and started working out regularly. Your health and confidence improved!',
    statChanges: { health: 15, happiness: 8, stress: -5, wealth: -500 },
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.YOGA_CLASS,
    name: 'Discovered Yoga',
    description: "You took up yoga for stress relief. It's helping you find inner peace.",
    statChanges: { stress: -12, happiness: 10, health: 8 },
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },

  // Neighborhood Events
  {
    id: RandomEvent.NOISY_NEIGHBOR,
    name: 'Noisy Neighbor Trouble',
    description: 'Your neighbor plays loud music every night. Sleep deprivation is affecting your work.',
    statChanges: { stress: 12, happiness: -10, health: -8 },
    probability: 0.08,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.COMMUNITY_BONDING,
    name: 'Community Bonding Session',
    description: 'Your HDB block organized a community bonding session. Made new friends in the neighborhood!',
    statChanges: { happiness: 12, socialImpact: 10 },
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER
  },

  // Civic Events
  {
    id: RandomEvent.JURY_DUTY,
    name: 'Jury Duty Summons',
    description: 'You received a jury duty summons. 2 weeks away from work for court proceedings.',
    statChanges: { stress: 8, happiness: 5, reputation: 5, wealth: -2000 },
    probability: 0.05,
    requiresStage: LifeStage.EARLY_CAREER
  },
  {
    id: RandomEvent.VOLUNTEER_COMMUNITY_SERVICE,
    name: 'Community Service Volunteer',
    description: 'You volunteered at a community center helping underprivileged children. Rewarding experience!',
    statChanges: { happiness: 15, socialImpact: 15, stress: -5 },
    probability: 0.1,
    requiresStage: LifeStage.EARLY_CAREER,
    requiresTraits: [PersonalityTrait.COOPERATIVE]
  }
];

export const SINGAPORE_EVENTS_COUNT = SINGAPORE_EVENTS.length;

