// Life stages and progression types

export enum LifeStage {
  PRIMARY_SCHOOL = 'primary_school',
  SECONDARY_SCHOOL = 'secondary_school',
  POST_SECONDARY = 'post_secondary',
  NATIONAL_SERVICE = 'national_service',
  UNIVERSITY = 'university',
  EARLY_CAREER = 'early_career',
  MID_CAREER = 'mid_career',
  MARRIAGE = 'marriage',
  PARENTHOOD = 'parenthood',
  LATE_CAREER = 'late_career',
  RETIREMENT = 'retirement'
}

export enum SecondaryStream {
  INTEGRATED_PROGRAMME = 'ip',
  EXPRESS = 'express',
  NORMAL_ACADEMIC = 'normal_academic',
  NORMAL_TECHNICAL = 'normal_technical'
}

export enum PostSecondaryPath {
  JUNIOR_COLLEGE = 'jc',
  POLYTECHNIC = 'polytechnic',
  ITE = 'ite',
  PRIVATE_DIPLOMA = 'private_diploma',
  WORK = 'work'
}

export enum UniversityType {
  NUS = 'nus',
  NTU = 'ntu',
  SMU = 'smu',
  SUTD = 'sutd',
  SIT = 'sit',
  SUSS = 'suss',
  OVERSEAS = 'overseas',
  NONE = 'none'
}

export enum Major {
  // STEM
  COMPUTER_SCIENCE = 'computer_science',
  ENGINEERING = 'engineering',
  MATHEMATICS = 'mathematics',
  SCIENCE = 'science',
  MEDICINE = 'medicine',
  DENTISTRY = 'dentistry',
  PHARMACY = 'pharmacy',
  
  // Business
  BUSINESS = 'business',
  ACCOUNTING = 'accounting',
  FINANCE = 'finance',
  ECONOMICS = 'economics',
  
  // Arts & Social Sciences
  LAW = 'law',
  ARTS = 'arts',
  SOCIAL_SCIENCES = 'social_sciences',
  PSYCHOLOGY = 'psychology',
  COMMUNICATIONS = 'communications',
  
  // Others
  EDUCATION = 'education',
  DESIGN = 'design',
  ARCHITECTURE = 'architecture',
  HOSPITALITY = 'hospitality',
  NONE = 'none'
}

export enum CareerPath {
  // Professional
  DOCTOR = 'doctor',
  LAWYER = 'lawyer',
  ENGINEER = 'engineer',
  TEACHER = 'teacher',
  ACCOUNTANT = 'accountant',
  ARCHITECT = 'architect',
  
  // Business
  ENTREPRENEUR = 'entrepreneur',
  MANAGER = 'manager',
  CONSULTANT = 'consultant',
  BANKER = 'banker',
  SALES = 'sales',
  
  // Tech
  SOFTWARE_ENGINEER = 'software_engineer',
  DATA_SCIENTIST = 'data_scientist',
  IT_SPECIALIST = 'it_specialist',
  
  // Creative
  DESIGNER = 'designer',
  ARTIST = 'artist',
  WRITER = 'writer',
  MEDIA = 'media',
  
  // Service
  HEALTHCARE = 'healthcare',
  HOSPITALITY = 'hospitality',
  RETAIL = 'retail',
  CIVIL_SERVICE = 'civil_service',
  
  // Technical
  TECHNICIAN = 'technician',
  TRADESPERSON = 'tradesperson',
  
  UNEMPLOYED = 'unemployed'
}

export enum HousingType {
  PARENTS_HOME = 'parents_home',
  RENTAL_ROOM = 'rental_room',
  RENTAL_FLAT = 'rental_flat',
  HDB_BTO_2ROOM = 'hdb_bto_2room',
  HDB_BTO_3ROOM = 'hdb_bto_3room',
  HDB_BTO_4ROOM = 'hdb_bto_4room',
  HDB_BTO_5ROOM = 'hdb_bto_5room',
  HDB_RESALE = 'hdb_resale',
  CONDO = 'condo',
  LANDED = 'landed',
  NONE = 'none'
}

export enum RelationshipStatus {
  SINGLE = 'single',
  DATING = 'dating',
  ENGAGED = 'engaged',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed'
}

export enum NSRank {
  RECRUIT = 'recruit',
  PRIVATE = 'private',
  LANCE_CORPORAL = 'lance_corporal',
  CORPORAL = 'corporal',
  CORPORAL_FIRST_CLASS = 'corporal_first_class',
  THIRD_SERGEANT = 'third_sergeant',
  SECOND_SERGEANT = 'second_sergeant',
  FIRST_SERGEANT = 'first_sergeant',
  OFFICER_CADET = 'officer_cadet',
  SECOND_LIEUTENANT = 'second_lieutenant',
  LIEUTENANT = 'lieutenant',
  CAPTAIN = 'captain'
}

export enum NSVocation {
  INFANTRY = 'infantry',
  ARMOUR = 'armour',
  ARTILLERY = 'artillery',
  ENGINEER = 'engineer',
  SIGNALS = 'signals',
  TRANSPORT = 'transport',
  MEDICAL = 'medical',
  SUPPLY = 'supply',
  MAINTENANCE = 'maintenance',
  ADMIN = 'admin',
  COMMANDO = 'commando',
  GUARDS = 'guards',
  NAVY = 'navy',
  AIR_FORCE = 'air_force'
}

export interface LifeStageProgress {
  currentStage: LifeStage;
  stageYear: number; // Year within current stage
  totalYears: number; // Total years lived
  age: number;
}

export interface SecondarySchoolData {
  stream: SecondaryStream;
  subjects: string[];
  oLevelScore?: number; // L1R5 for Express, EMB3 for Normal
  nLevelScore?: number; // For Normal Academic
  coCurricular: string[];
  leadership: string[];
}

export interface PostSecondaryData {
  path: PostSecondaryPath;
  institution?: string;
  course?: string;
  gpa?: number;
  internships: string[];
  projects: string[];
}

export interface NSData {
  rank: NSRank;
  vocation: NSVocation;
  unit: string;
  yearsServed: number;
  reservist: boolean;
}

export interface UniversityData {
  university: UniversityType;
  major: Major;
  secondMajor?: Major;
  minor?: Major;
  gpa: number;
  honours?: 'first_class' | 'second_upper' | 'second_lower' | 'third_class' | 'pass';
  exchange: boolean;
  internships: string[];
  activities: string[];
}

export interface CareerData {
  currentJob: CareerPath;
  company: string;
  yearsExperience: number;
  monthlySalary: number;
  jobSatisfaction: number;
  promotions: number;
  jobChanges: number;
}

export interface FamilyData {
  relationshipStatus: RelationshipStatus;
  partnerName?: string;
  marriageYear?: number;
  children: number;
  childrenAges: number[];
}

export interface HousingData {
  currentHousing: HousingType;
  housingValue: number;
  mortgage: number;
  monthlyPayment: number;
  yearsOwned: number;
}

export interface CPFData {
  ordinaryAccount: number;
  specialAccount: number;
  medisaveAccount: number;
  retirementAccount: number;
  totalCPF: number;
}

