# Complete Life Stages Implementation Guide
## MerlionLife2 - Full Singapore Life Simulation

This guide provides complete implementation details for transforming MerlionLife2 into a comprehensive life simulation game covering all major Singapore life stages.

---

## Current Status

### ✅ Completed
1. **Avatar Customization System**
   - Full avatar builder with 8 customization options
   - Gender, skin tone, hair style/color, clothing, accessories
   - Visual preview and emoji representation
   - Integrated into character creation

2. **Enhanced Primary School** (Ages 7-12)
   - 45+ random events with rich narratives
   - Personality traits system (8 traits)
   - Relationship system (6 types)
   - Achievement system (10+ achievements)
   - Enhanced stats (Stress, Reputation)
   - Profile screen
   - Modern UI/UX

3. **Life Stages Architecture**
   - Complete type system for all stages
   - Singapore-specific systems defined (CPF, HDB, NS, etc.)
   - Career paths, housing types, relationships
   - Scalable foundation

### 🚧 In Progress / To Implement
- Secondary School (Ages 13-17)
- Post-Secondary (Ages 17-20)
- National Service (Males, Ages 18-20)
- University (Ages 20-24)
- Early Career (Ages 24-35)
- Mid Career & Family (Ages 35-55)
- Late Career & Retirement (Ages 55+)

---

## Implementation Roadmap

### Phase 1: Secondary School (4-6 weeks)

#### 1.1 Core Mechanics
**Files to Create:**
- `screens/SecondaryYearPlanning.tsx` - Yearly planning for secondary school
- `screens/SubjectSelection.tsx` - Choose subjects based on stream
- `screens/OLevelExam.tsx` - O-Level/N-Level examination
- `data/secondaryEvents.ts` - 50+ secondary school events
- `data/subjects.ts` - Subject data and requirements

**Key Features:**
- **Stream-Specific Content**:
  - IP: 6 years, no O-Levels, enrichment programs
  - Express: 4 years, O-Level focus, subject combinations
  - Normal Academic: 5 years, N-Level then O-Level
  - Normal Technical: 4 years, N-Level, ITE pathway

- **Subject System**:
  - Core subjects: English, Mother Tongue, Math, Science/Humanities
  - Electives based on stream and interests
  - Subject combinations affect university options
  - Grades affect post-secondary pathways

- **Social System**:
  - Dating and relationships
  - Friendship drama
  - First crush/relationship/breakup events
  - Peer pressure situations
  - Social media influence

- **Activities**:
  - CCA continuation with leadership roles
  - Part-time jobs (McDonald's, tuition, retail)
  - Volunteering and community service
  - School events (dances, camps, trips)

#### 1.2 Events Library (50+ Events)
```typescript
// Example secondary school events
export const SECONDARY_EVENTS = [
  {
    id: 'first_crush',
    name: 'First Crush',
    description: 'You developed feelings for a classmate. Your heart races when they're near.',
    statChanges: { happiness: 5, stress: 3 },
    relationshipEffects: [{ type: RelationshipType.CRUSH, change: 30 }],
    requiresYear: [1, 2],
    probability: 0.3
  },
  {
    id: 'school_dance',
    name: 'School Dance',
    description: 'The annual school dance is here! You had a great time with friends.',
    statChanges: { happiness: 8, socialImpact: 4 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: 6 }],
    probability: 0.2
  },
  {
    id: 'part_time_job',
    name: 'Part-Time Job',
    description: 'You got a part-time job at a fast food restaurant. It\'s tiring but rewarding.',
    statChanges: { wealth: 200, workExperience: 5, stress: 4, academicSkill: -2 },
    probability: 0.15,
    requiresYear: [3, 4]
  },
  {
    id: 'overseas_trip',
    name: 'School Overseas Trip',
    description: 'Your class went on an educational trip abroad. You learned so much!',
    statChanges: { happiness: 10, academicSkill: 3, socialImpact: 3, wealth: -300 },
    probability: 0.12
  },
  {
    id: 'student_leader',
    name: 'Student Leadership',
    description: 'You were appointed as a student leader. It\'s a big responsibility.',
    statChanges: { leadership: 8, reputation: 7, stress: 5, happiness: 4 },
    probability: 0.1,
    requiresTraits: [PersonalityTrait.OUTGOING, PersonalityTrait.AMBITIOUS]
  },
  {
    id: 'academic_pressure',
    name: 'Academic Pressure',
    description: 'The pressure to perform well is overwhelming. You feel stressed about exams.',
    statChanges: { stress: 10, happiness: -6, health: -3 },
    probability: 0.25,
    requiresYear: [3, 4]
  },
  {
    id: 'friendship_drama',
    name: 'Friendship Drama',
    description: 'A misunderstanding caused tension in your friend group. It was difficult.',
    statChanges: { happiness: -5, stress: 4 },
    relationshipEffects: [{ type: RelationshipType.FRIEND, change: -8 }],
    probability: 0.18
  },
  {
    id: 'first_relationship',
    name: 'First Relationship',
    description: 'You started dating someone special. Everything feels new and exciting!',
    statChanges: { happiness: 12, stress: 2 },
    relationshipEffects: [{ type: RelationshipType.PARTNER, change: 40 }],
    probability: 0.12,
    requiresYear: [2, 3, 4]
  },
  {
    id: 'breakup',
    name: 'Relationship Breakup',
    description: 'Your relationship ended. It hurts, but you\'ll get through this.',
    statChanges: { happiness: -10, stress: 6 },
    relationshipEffects: [{ type: RelationshipType.PARTNER, change: -50 }],
    probability: 0.08
  },
  {
    id: 'exam_failure',
    name: 'Failed an Important Exam',
    description: 'You didn\'t do well on a major exam. You need to work harder.',
    statChanges: { happiness: -8, stress: 8, academicSkill: -3, reputation: -4 },
    probability: 0.15
  },
  {
    id: 'scholarship_offer',
    name: 'Scholarship Offer',
    description: 'You received a scholarship offer for your academic excellence!',
    statChanges: { happiness: 10, wealth: 1000, reputation: 8, academicSkill: 2 },
    probability: 0.05,
    requiresTraits: [PersonalityTrait.AMBITIOUS]
  }
  // ... 40+ more events
];
```

#### 1.3 O-Level/N-Level System
```typescript
// Calculate O-Level score (L1R5)
export function calculateOLevelScore(player: Player): number {
  const baseScore = 45 - (player.stats.academicSkill * 0.4);
  const tuitionBonus = player.tuitionSubjects.length * 2;
  const stressPenalty = player.stats.stress > 70 ? 3 : 0;
  const healthBonus = player.stats.health > 70 ? 2 : 0;
  
  return Math.max(6, Math.min(45, Math.round(baseScore - tuitionBonus + stressPenalty - healthBonus)));
}

// Determine post-secondary eligibility
export function getPostSecondaryOptions(oLevelScore: number, stream: SecondaryStream): PostSecondaryPath[] {
  const options: PostSecondaryPath[] = [];
  
  if (oLevelScore <= 20) {
    options.push(PostSecondaryPath.JUNIOR_COLLEGE);
  }
  if (oLevelScore <= 26) {
    options.push(PostSecondaryPath.POLYTECHNIC);
  }
  if (oLevelScore <= 35) {
    options.push(PostSecondaryPath.ITE);
  }
  options.push(PostSecondaryPath.WORK);
  
  return options;
}
```

---

### Phase 2: Post-Secondary Education (3-4 weeks)

#### 2.1 Junior College (JC)
**Duration**: 2 years (Ages 17-18)
**Key Features**:
- Subject combinations (Science/Arts/Commerce)
- H1/H2/H3 subject system
- Project Work (PW)
- A-Level preparation
- University application process
- Enrichment activities

**Events** (30+ events):
- Orientation week bonding
- CCA trials and selection
- Mid-year exam stress
- Prom night
- Overseas immersion programs
- University open houses
- A-Level examination period
- Results day anxiety
- University application process

#### 2.2 Polytechnic
**Duration**: 3 years (Ages 17-19)
**Key Features**:
- Diploma course selection (Engineering, Business, IT, Design, etc.)
- GPA system (4.0 scale)
- Internship opportunities (6 months)
- Project-based learning
- Industry attachments
- Final Year Project (FYP)

**Events** (35+ events):
- Orientation camps
- Group project challenges
- Internship placement
- Industry mentor connections
- Polytechnic festivals
- Graduation ceremony
- Job offers vs university decisions

#### 2.3 ITE
**Duration**: 2 years (Ages 17-18)
**Key Features**:
- NITEC/Higher NITEC courses
- Hands-on technical training
- Apprenticeship programs
- Industry certifications
- Practical skills development
- Pathway to polytechnic or work

**Events** (25+ events):
- Skills competitions
- Industry visits
- Apprenticeship experiences
- Certification achievements
- Job placement opportunities

---

### Phase 3: National Service (Males Only) (2-3 weeks)

#### 3.1 Core NS System
**Duration**: 2 years (Ages 18-20)
**Key Features**:
- Basic Military Training (BMT) - 3 months
- Vocation training
- Rank progression (Recruit to Officer)
- Unit posting
- Reservist obligations (after ORD)
- Monthly allowance system

#### 3.2 Vocations
```typescript
export const NS_VOCATIONS = {
  INFANTRY: {
    name: 'Infantry',
    description: 'Frontline combat role',
    physicalDemand: 'High',
    statEffects: { health: 10, stress: 15, leadership: 5 }
  },
  SIGNALS: {
    name: 'Signals',
    description: 'Communications and IT',
    physicalDemand: 'Medium',
    statEffects: { academicSkill: 5, stress: 8, leadership: 3 }
  },
  MEDICAL: {
    name: 'Medical',
    description: 'Healthcare support',
    physicalDemand: 'Low',
    statEffects: { health: 5, socialImpact: 8, stress: 10 }
  },
  COMMANDO: {
    name: 'Commando',
    description: 'Elite special forces',
    physicalDemand: 'Very High',
    statEffects: { health: 15, stress: 20, leadership: 10, reputation: 12 }
  }
  // ... more vocations
};
```

#### 3.3 NS Events (40+ events)
- BMT graduation
- Vocation posting
- Rank promotions
- Outfield exercises
- Guard duty nights
- NS injuries
- Commendations and awards
- ORD (Operationally Ready Date)
- Reservist call-ups

---

### Phase 4: University (4-5 weeks)

#### 4.1 University Selection
**Local Universities**:
- NUS (National University of Singapore)
- NTU (Nanyang Technological University)
- SMU (Singapore Management University)
- SUTD (Singapore University of Technology and Design)
- SIT (Singapore Institute of Technology)
- SUSS (Singapore University of Social Sciences)

**Overseas Options**:
- Based on academic performance and wealth
- Scholarship opportunities
- Higher costs but prestige benefits

#### 4.2 Major Selection
**STEM**: Computer Science, Engineering, Medicine, Science
**Business**: Business, Accounting, Finance, Economics
**Arts**: Law, Arts, Social Sciences, Psychology
**Others**: Education, Design, Architecture

#### 4.3 University Life (50+ events)
- Orientation camps and RAG
- Hall/Residential life
- Exchange programs
- Internships
- Research projects
- Dean's List achievements
- Club leadership
- Dating and relationships
- Part-time work
- Graduation and honours classification

---

### Phase 5: Career & Adult Life (6-8 weeks)

#### 5.1 Career System
**Job Search**:
- Based on education and major
- Starting salary ranges
- Industry selection
- Company prestige levels

**Career Progression**:
- Annual performance reviews
- Promotions and salary increments
- Job changes and career switches
- Entrepreneurship opportunities
- Passive income streams

**Salary Ranges** (Monthly, SGD):
```typescript
export const STARTING_SALARIES = {
  // University Graduates
  DOCTOR: { min: 4500, max: 6000 },
  LAWYER: { min: 4000, max: 5500 },
  ENGINEER: { min: 3500, max: 4500 },
  SOFTWARE_ENGINEER: { min: 4000, max: 6000 },
  ACCOUNTANT: { min: 3000, max: 4000 },
  TEACHER: { min: 3200, max: 3800 },
  
  // Polytechnic Graduates
  TECHNICIAN: { min: 2200, max: 2800 },
  ADMIN: { min: 2000, max: 2500 },
  
  // ITE/Others
  TRADESPERSON: { min: 1800, max: 2400 },
  RETAIL: { min: 1600, max: 2000 },
  HOSPITALITY: { min: 1700, max: 2200 }
};
```

#### 5.2 CPF System
```typescript
export function calculateCPF(monthlySalary: number, age: number) {
  const employeeRate = age <= 55 ? 0.20 : age <= 60 ? 0.13 : 0.075;
  const employerRate = age <= 55 ? 0.17 : age <= 60 ? 0.13 : 0.075;
  
  const totalContribution = monthlySalary * (employeeRate + employerRate);
  
  return {
    ordinary: totalContribution * 0.6216,
    special: totalContribution * 0.1622,
    medisave: totalContribution * 0.2162,
    total: totalContribution
  };
}
```

#### 5.3 Housing System
**BTO (Build-To-Order)**:
- Ballot system (luck-based)
- Waiting time: 3-5 years
- Prices: $200k-$500k depending on room type
- Eligibility: Must be 21+, married or with family
- Grant schemes based on income

**Resale HDB**:
- Immediate availability
- Higher prices: $300k-$800k
- No waiting time
- More location options

**Private Property**:
- Condos: $800k-$2M+
- Landed: $2M-$10M+
- Requires high income/wealth

#### 5.4 Relationship & Family
**Dating**:
- Meet partners through work, friends, apps
- Relationship progression
- Compatibility based on traits and values

**Marriage**:
- Engagement and wedding planning
- Wedding costs: $20k-$80k
- Honeymoon expenses
- Combined finances

**Children**:
- Family planning decisions
- Pregnancy and childbirth
- Childcare costs: $800-$1500/month
- Education expenses
- Work-life balance challenges

#### 5.5 Adult Life Events (100+ events)
- Job offers and promotions
- Career changes
- Business ventures
- BTO ballot results
- House purchases
- Renovations
- Marriage proposals
- Weddings
- Childbirth
- Parenting challenges
- Health issues
- Financial windfalls/crises
- Inheritance
- Mid-life crisis
- Retirement planning

---

### Phase 6: Retirement (2-3 weeks)

#### 6.1 Retirement System
**Retirement Age**: 63-67
**CPF Retirement Sum**: Minimum $181,000 (2024)
**CPF LIFE**: Monthly payouts based on retirement sum

#### 6.2 Retirement Activities
- Travel and hobbies
- Volunteering
- Grandparenting
- Health management
- Legacy planning

#### 6.3 End Game
**Life Summary**:
- Total wealth accumulated
- Career achievements
- Family legacy
- Relationships maintained
- Life satisfaction score
- Final achievements unlocked

**Multiple Endings**:
- Wealthy Tycoon
- Family Person
- Community Leader
- Career Master
- Balanced Life
- Struggling Survivor

---

## Singapore-Specific Systems Implementation

### 1. CPF (Central Provident Fund)
```typescript
export class CPFService {
  static calculateMonthlyContribution(salary: number, age: number): CPFData {
    // Implementation as shown above
  }
  
  static canWithdrawForHousing(cpf: CPFData, housingPrice: number): boolean {
    return cpf.ordinaryAccount >= housingPrice * 0.2; // 20% down payment
  }
  
  static calculateRetirementPayout(retirementSum: number): number {
    // CPF LIFE payout calculation
    return retirementSum * 0.004; // Simplified monthly payout
  }
}
```

### 2. HDB/BTO System
```typescript
export class HousingService {
  static applyBTO(player: Player): { success: boolean; waitTime: number } {
    const ballotChance = player.stats.wealth > 50000 ? 0.3 : 0.2;
    const success = Math.random() < ballotChance;
    const waitTime = success ? Math.floor(Math.random() * 24) + 36 : 0; // 3-5 years
    
    return { success, waitTime };
  }
  
  static calculateAffordability(monthlySalary: number, housingPrice: number): boolean {
    const monthlyInstallment = housingPrice / (25 * 12); // 25-year loan
    return monthlyInstallment <= monthlySalary * 0.3; // 30% of income
  }
}
```

### 3. NS System
```typescript
export class NSService {
  static determineVocation(player: Player): NSVocation {
    const { health, academicSkill, leadership } = player.stats;
    
    if (health > 80 && leadership > 70) return NSVocation.COMMANDO;
    if (academicSkill > 70) return NSVocation.SIGNALS;
    if (health < 50) return NSVocation.ADMIN;
    
    return NSVocation.INFANTRY; // Default
  }
  
  static calculateRankProgression(player: Player, months: number): NSRank {
    const performanceScore = (player.stats.health + player.stats.leadership) / 2;
    
    if (performanceScore > 80 && months >= 9) return NSRank.OFFICER_CADET;
    if (performanceScore > 60 && months >= 12) return NSRank.THIRD_SERGEANT;
    if (months >= 6) return NSRank.CORPORAL;
    
    return NSRank.PRIVATE;
  }
}
```

---

## UI/UX Enhancements

### 1. Vibrant Color Scheme
```typescript
export const GAME_COLORS = {
  primary: '#4A90E2',
  secondary: '#7B68EE',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#F44336',
  info: '#00BCD4',
  
  // Life Stage Colors
  primary_school: '#FF6B6B',
  secondary_school: '#4ECDC4',
  post_secondary: '#45B7D1',
  ns: '#96CEB4',
  university: '#FFEAA7',
  career: '#DFE6E9',
  retirement: '#A29BFE',
  
  // Stat Colors
  wealth: '#27AE60',
  happiness: '#F39C12',
  health: '#E74C3C',
  social: '#9B59B6',
  academic: '#3498DB',
  stress: '#E67E22',
  reputation: '#1ABC9C'
};
```

### 2. Animations
```typescript
// Use React Native Animated API
import { Animated } from 'react-native';

// Stat change animations
const animateStatChange = (value: Animated.Value, toValue: number) => {
  Animated.spring(value, {
    toValue,
    friction: 8,
    tension: 40,
    useNativeDriver: true
  }).start();
};

// Achievement unlock animation
const animateAchievement = () => {
  Animated.sequence([
    Animated.timing(scale, { toValue: 1.2, duration: 200 }),
    Animated.timing(scale, { toValue: 1, duration: 200 })
  ]).start();
};
```

### 3. Modern Components
- Gradient backgrounds
- Card shadows and elevation
- Smooth transitions
- Loading states
- Progress indicators
- Confetti for achievements
- Toast notifications

---

## Testing Strategy

### 1. Unit Tests
- Test stat calculations
- Test event triggers
- Test progression logic
- Test CPF/Housing calculations

### 2. Integration Tests
- Test life stage transitions
- Test save/load functionality
- Test achievement unlocking
- Test relationship system

### 3. Playtesting
- Complete playthrough from start to retirement
- Test different paths (IP vs Express, JC vs Poly, etc.)
- Test edge cases (very low stats, very high stats)
- Balance testing (difficulty, progression speed)

---

## Performance Optimization

### 1. Code Splitting
- Lazy load life stage screens
- Load events on demand
- Optimize image assets

### 2. State Management
- Use React Context for global state
- Memoize expensive calculations
- Debounce user inputs

### 3. Storage
- Compress save data
- Implement auto-save
- Cloud save support (future)

---

## Monetization (Optional)

### 1. Free Version
- Complete game with ads
- Limited save slots (1)
- Standard features

### 2. Premium Version ($4.99)
- Ad-free experience
- Multiple save slots (3)
- Exclusive events
- Bonus starting stats
- Fast-forward option

### 3. In-App Purchases
- Cosmetic avatar items
- Bonus traits
- Cheat codes (for fun)

---

## Launch Checklist

- [ ] All life stages implemented
- [ ] 200+ events across all stages
- [ ] All Singapore systems working (CPF, HDB, NS)
- [ ] 20+ achievements
- [ ] Profile and progress tracking
- [ ] Save/load functionality
- [ ] Tutorial system
- [ ] Balanced gameplay
- [ ] Performance optimized
- [ ] Tested on iOS and Android
- [ ] App store assets (screenshots, description)
- [ ] Privacy policy
- [ ] Terms of service

---

## Estimated Timeline

**Total Development Time**: 20-30 weeks (5-7 months)

- Avatar & Primary School: ✅ Complete (4 weeks)
- Secondary School: 4-6 weeks
- Post-Secondary: 3-4 weeks
- NS: 2-3 weeks
- University: 4-5 weeks
- Career & Adult Life: 6-8 weeks
- Retirement: 2-3 weeks
- Polish & Testing: 3-4 weeks

**Team Size**: 1-2 developers

---

## Resources Needed

### Development
- React Native / Expo expertise
- TypeScript knowledge
- UI/UX design skills
- Game balance experience

### Assets
- Icon sets
- Sound effects (optional)
- Background music (optional)
- Illustrations (optional)

### Testing
- iOS device/simulator
- Android device/emulator
- Beta testers (10-20 people)

---

## Success Metrics

### Engagement
- Average session length: 15-30 minutes
- Retention rate: 40%+ Day 7
- Completion rate: 20%+ (full playthrough)

### Quality
- App store rating: 4.5+ stars
- Crash rate: <1%
- Load time: <3 seconds

### Growth
- 10,000+ downloads in first 3 months
- 1,000+ active users
- Positive reviews and word-of-mouth

---

This guide provides a complete roadmap for implementing all life stages. Each phase can be developed incrementally, tested, and released as updates to keep users engaged while you continue building.

