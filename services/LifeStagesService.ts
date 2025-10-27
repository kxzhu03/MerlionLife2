import { Player, PlayerStats, GameState } from '../types';
import {
  LifeStage, LifeStageProgress, PostSecondaryPath, PostSecondaryData,
  NSData, NSRank, NSVocation, UniversityType, UniversityData, Major,
  CareerPath, CareerData, FamilyData, RelationshipStatus,
  HousingType, HousingData, CPFData
} from '../types/lifestages';
import { Gender } from '../types/avatar';

export class LifeStagesService {
  // ==================== POST-SECONDARY ====================
  
  static initializePostSecondary(player: Player, path: PostSecondaryPath): Player {
    const postSecData: PostSecondaryData = {
      path,
      institution: this.getDefaultInstitution(path),
      course: 'General',
      gpa: 0,
      internships: [],
      projects: []
    };

    const lifeStageProgress: LifeStageProgress = {
      currentStage: LifeStage.POST_SECONDARY,
      stageYear: 1,
      totalYears: (player.lifeStageProgress?.totalYears || 0) + 1,
      age: player.age + 1
    };

    return {
      ...player,
      postSecondaryData: postSecData,
      lifeStageProgress,
      age: player.age + 1
    };
  }

  private static getDefaultInstitution(path: PostSecondaryPath): string {
    switch (path) {
      case PostSecondaryPath.JUNIOR_COLLEGE:
        return 'Raffles Junior College';
      case PostSecondaryPath.POLYTECHNIC:
        return 'Singapore Polytechnic';
      case PostSecondaryPath.ITE:
        return 'ITE College Central';
      default:
        return 'N/A';
    }
  }

  static getPostSecondaryDuration(path: PostSecondaryPath): number {
    switch (path) {
      case PostSecondaryPath.JUNIOR_COLLEGE:
        return 2;
      case PostSecondaryPath.POLYTECHNIC:
        return 3;
      case PostSecondaryPath.ITE:
        return 2;
      default:
        return 0;
    }
  }

  static calculatePostSecondaryGPA(player: Player, studyEffort: number): number {
    const academicSkill = player.stats.academicSkill || 50;
    const stress = player.stats.stress || 50;
    
    let gpa = (academicSkill / 25) + (studyEffort / 5);
    
    if (stress > 70) gpa -= 0.3;
    if (stress < 30) gpa += 0.2;
    
    return Math.max(0, Math.min(4.0, gpa));
  }

  // ==================== NATIONAL SERVICE ====================
  
  static initializeNS(player: Player): Player {
    if (player.avatarCustomization?.gender !== Gender.MALE) {
      // Skip NS for females
      return player;
    }

    const vocation = this.determineNSVocation(player);
    const nsData: NSData = {
      rank: NSRank.RECRUIT,
      vocation,
      unit: this.getDefaultUnit(vocation),
      yearsServed: 0,
      reservist: false
    };

    const lifeStageProgress: LifeStageProgress = {
      currentStage: LifeStage.NATIONAL_SERVICE,
      stageYear: 1,
      totalYears: (player.lifeStageProgress?.totalYears || 0) + 1,
      age: player.age + 1
    };

    return {
      ...player,
      nsData,
      lifeStageProgress,
      age: player.age + 1
    };
  }

  private static determineNSVocation(player: Player): NSVocation {
    const health = player.stats.health || 50;
    const academicSkill = player.stats.academicSkill || 50;
    const leadership = player.stats.leadership || 0;

    // High fitness and leadership -> Elite units
    if (health > 80 && leadership > 70) {
      return Math.random() > 0.7 ? NSVocation.COMMANDO : NSVocation.GUARDS;
    }

    // High academic -> Technical vocations
    if (academicSkill > 70) {
      return Math.random() > 0.5 ? NSVocation.SIGNALS : NSVocation.ENGINEER;
    }

    // Low health -> Admin/Support
    if (health < 50) {
      return Math.random() > 0.5 ? NSVocation.ADMIN : NSVocation.MEDICAL;
    }

    // Default
    return NSVocation.INFANTRY;
  }

  private static getDefaultUnit(vocation: NSVocation): string {
    const units: Record<NSVocation, string> = {
      [NSVocation.INFANTRY]: '1st Battalion Singapore Infantry Regiment',
      [NSVocation.ARMOUR]: '42nd Battalion Singapore Armoured Regiment',
      [NSVocation.ARTILLERY]: '23rd Battalion Singapore Artillery',
      [NSVocation.ENGINEER]: '30th Battalion Singapore Combat Engineers',
      [NSVocation.SIGNALS]: '1st Signal Battalion',
      [NSVocation.TRANSPORT]: '48th Battalion Singapore Armoured Regiment',
      [NSVocation.MEDICAL]: 'Medical Training Institute',
      [NSVocation.SUPPLY]: 'Supply Base',
      [NSVocation.MAINTENANCE]: 'Maintenance Base',
      [NSVocation.ADMIN]: 'CMPB',
      [NSVocation.COMMANDO]: '1st Commando Battalion',
      [NSVocation.GUARDS]: 'Guards',
      [NSVocation.NAVY]: 'Republic of Singapore Navy',
      [NSVocation.AIR_FORCE]: 'Republic of Singapore Air Force'
    };
    return units[vocation];
  }

  static progressNSRank(player: Player, months: number): NSRank {
    const leadership = player.stats.leadership || 0;
    const health = player.stats.health || 50;
    const performanceScore = (leadership + health) / 2;

    if (performanceScore > 80 && months >= 9) return NSRank.SECOND_LIEUTENANT;
    if (performanceScore > 75 && months >= 9) return NSRank.OFFICER_CADET;
    if (performanceScore > 65 && months >= 12) return NSRank.THIRD_SERGEANT;
    if (performanceScore > 55 && months >= 12) return NSRank.CORPORAL_FIRST_CLASS;
    if (months >= 6) return NSRank.CORPORAL;
    if (months >= 3) return NSRank.LANCE_CORPORAL;
    return NSRank.PRIVATE;
  }

  // ==================== UNIVERSITY ====================
  
  static initializeUniversity(player: Player, university: UniversityType, major: Major): Player {
    const uniData: UniversityData = {
      university,
      major,
      gpa: 0,
      exchange: false,
      internships: [],
      activities: []
    };

    const lifeStageProgress: LifeStageProgress = {
      currentStage: LifeStage.UNIVERSITY,
      stageYear: 1,
      totalYears: (player.lifeStageProgress?.totalYears || 0) + 1,
      age: player.age + 1
    };

    return {
      ...player,
      universityData: uniData,
      lifeStageProgress,
      age: player.age + 1
    };
  }

  static calculateUniversityGPA(player: Player, studyEffort: number): number {
    const academicSkill = player.stats.academicSkill || 50;
    const stress = player.stats.stress || 50;
    const health = player.stats.health || 50;
    
    let gpa = (academicSkill / 20) + (studyEffort / 4) + (health / 100);
    
    if (stress > 75) gpa -= 0.4;
    if (stress < 25) gpa += 0.3;
    
    return Math.max(0, Math.min(5.0, gpa));
  }

  static determineHonours(gpa: number): 'first_class' | 'second_upper' | 'second_lower' | 'third_class' | 'pass' {
    if (gpa >= 4.5) return 'first_class';
    if (gpa >= 4.0) return 'second_upper';
    if (gpa >= 3.5) return 'second_lower';
    if (gpa >= 3.0) return 'third_class';
    return 'pass';
  }

  // ==================== CAREER ====================
  
  static initializeCareer(player: Player, careerPath: CareerPath): Player {
    const salary = this.getStartingSalary(careerPath, player);
    
    const careerData: CareerData = {
      currentJob: careerPath,
      company: this.getDefaultCompany(careerPath),
      yearsExperience: 0,
      monthlySalary: salary,
      jobSatisfaction: 70,
      promotions: 0,
      jobChanges: 0
    };

    const lifeStageProgress: LifeStageProgress = {
      currentStage: LifeStage.EARLY_CAREER,
      stageYear: 1,
      totalYears: (player.lifeStageProgress?.totalYears || 0) + 1,
      age: player.age + 1
    };

    return {
      ...player,
      careerData,
      lifeStageProgress,
      age: player.age + 1
    };
  }

  private static getStartingSalary(career: CareerPath, player: Player): number {
    const salaryRanges: Record<CareerPath, { min: number; max: number }> = {
      [CareerPath.DOCTOR]: { min: 4500, max: 6000 },
      [CareerPath.LAWYER]: { min: 4000, max: 5500 },
      [CareerPath.ENGINEER]: { min: 3500, max: 4500 },
      [CareerPath.TEACHER]: { min: 3200, max: 3800 },
      [CareerPath.ACCOUNTANT]: { min: 3000, max: 4000 },
      [CareerPath.ARCHITECT]: { min: 3200, max: 4200 },
      [CareerPath.ENTREPRENEUR]: { min: 0, max: 10000 },
      [CareerPath.MANAGER]: { min: 3500, max: 5000 },
      [CareerPath.CONSULTANT]: { min: 4000, max: 6000 },
      [CareerPath.BANKER]: { min: 3800, max: 5500 },
      [CareerPath.SALES]: { min: 2500, max: 4000 },
      [CareerPath.SOFTWARE_ENGINEER]: { min: 4000, max: 6000 },
      [CareerPath.DATA_SCIENTIST]: { min: 4500, max: 6500 },
      [CareerPath.IT_SPECIALIST]: { min: 3000, max: 4500 },
      [CareerPath.DESIGNER]: { min: 2800, max: 3800 },
      [CareerPath.ARTIST]: { min: 2000, max: 4000 },
      [CareerPath.WRITER]: { min: 2200, max: 3500 },
      [CareerPath.MEDIA]: { min: 2500, max: 3800 },
      [CareerPath.HEALTHCARE]: { min: 2200, max: 3200 },
      [CareerPath.HOSPITALITY]: { min: 1800, max: 2500 },
      [CareerPath.RETAIL]: { min: 1600, max: 2200 },
      [CareerPath.CIVIL_SERVICE]: { min: 2800, max: 4000 },
      [CareerPath.TECHNICIAN]: { min: 2200, max: 2800 },
      [CareerPath.TRADESPERSON]: { min: 1800, max: 2600 },
      [CareerPath.UNEMPLOYED]: { min: 0, max: 0 }
    };

    const range = salaryRanges[career];
    const baseSalary = range.min + Math.random() * (range.max - range.min);
    
    // Adjust based on education
    const uniGPA = player.universityData?.gpa || 0;
    const gpaBonus = uniGPA > 4.0 ? 500 : uniGPA > 3.5 ? 300 : 0;
    
    return Math.round(baseSalary + gpaBonus);
  }

  private static getDefaultCompany(career: CareerPath): string {
    const companies: Partial<Record<CareerPath, string>> = {
      [CareerPath.SOFTWARE_ENGINEER]: 'Tech Startup Pte Ltd',
      [CareerPath.BANKER]: 'DBS Bank',
      [CareerPath.LAWYER]: 'Law Firm LLP',
      [CareerPath.DOCTOR]: 'Singapore General Hospital',
      [CareerPath.TEACHER]: 'Ministry of Education',
      [CareerPath.CIVIL_SERVICE]: 'Government Agency'
    };
    return companies[career] || 'Company Pte Ltd';
  }

  static calculateSalaryIncrease(player: Player, performance: number): number {
    const baseIncrease = player.careerData!.monthlySalary * 0.03; // 3% base
    const performanceBonus = performance > 80 ? player.careerData!.monthlySalary * 0.05 : 0;
    return Math.round(baseIncrease + performanceBonus);
  }

  // ==================== CPF ====================
  
  static calculateCPF(monthlySalary: number, age: number): CPFData {
    // Simplified CPF calculation
    const employeeRate = age <= 55 ? 0.20 : age <= 60 ? 0.13 : 0.075;
    const employerRate = age <= 55 ? 0.17 : age <= 60 ? 0.13 : 0.075;
    
    const totalContribution = monthlySalary * (employeeRate + employerRate);
    
    return {
      ordinaryAccount: totalContribution * 0.6216,
      specialAccount: totalContribution * 0.1622,
      medisaveAccount: totalContribution * 0.2162,
      retirementAccount: 0,
      totalCPF: totalContribution
    };
  }

  static accumulateCPF(player: Player, months: number): Player {
    if (!player.careerData) return player;
    
    const monthlyCPF = this.calculateCPF(player.careerData.monthlySalary, player.age);
    const cpfData = player.cpfData || {
      ordinaryAccount: 0,
      specialAccount: 0,
      medisaveAccount: 0,
      retirementAccount: 0,
      totalCPF: 0
    };

    return {
      ...player,
      cpfData: {
        ordinaryAccount: cpfData.ordinaryAccount + (monthlyCPF.ordinaryAccount * months),
        specialAccount: cpfData.specialAccount + (monthlyCPF.specialAccount * months),
        medisaveAccount: cpfData.medisaveAccount + (monthlyCPF.medisaveAccount * months),
        retirementAccount: cpfData.retirementAccount,
        totalCPF: cpfData.totalCPF + (monthlyCPF.totalCPF * months)
      }
    };
  }

  // ==================== HOUSING ====================
  
  static applyBTO(player: Player): { success: boolean; waitTime: number; housingType: HousingType } {
    const wealth = player.stats.wealth || 0;
    const cpf = player.cpfData?.ordinaryAccount || 0;
    
    const ballotChance = wealth > 50000 || cpf > 40000 ? 0.35 : 0.25;
    const success = Math.random() < ballotChance;
    
    if (success) {
      const waitTime = Math.floor(Math.random() * 24) + 36; // 3-5 years in months
      const housingType = this.determineBTOType(player);
      return { success: true, waitTime, housingType };
    }
    
    return { success: false, waitTime: 0, housingType: HousingType.NONE };
  }

  private static determineBTOType(player: Player): HousingType {
    const familySize = (player.familyData?.children || 0) + 2; // Player + spouse + children
    
    if (familySize <= 2) return HousingType.HDB_BTO_2ROOM;
    if (familySize <= 4) return HousingType.HDB_BTO_4ROOM;
    return HousingType.HDB_BTO_5ROOM;
  }

  static getBTOPrice(housingType: HousingType): number {
    const prices: Record<HousingType, number> = {
      [HousingType.HDB_BTO_2ROOM]: 150000,
      [HousingType.HDB_BTO_3ROOM]: 250000,
      [HousingType.HDB_BTO_4ROOM]: 350000,
      [HousingType.HDB_BTO_5ROOM]: 450000,
      [HousingType.HDB_RESALE]: 500000,
      [HousingType.CONDO]: 1200000,
      [HousingType.LANDED]: 3000000,
      [HousingType.PARENTS_HOME]: 0,
      [HousingType.RENTAL_ROOM]: 0,
      [HousingType.RENTAL_FLAT]: 0,
      [HousingType.NONE]: 0
    };
    return prices[housingType] || 0;
  }

  static purchaseHousing(player: Player, housingType: HousingType): Player {
    const price = this.getBTOPrice(housingType);
    const downPayment = price * 0.2;
    const mortgage = price * 0.8;
    
    const housingData: HousingData = {
      currentHousing: housingType,
      housingValue: price,
      mortgage,
      monthlyPayment: mortgage / (25 * 12), // 25-year loan
      yearsOwned: 0
    };

    return {
      ...player,
      housingData,
      stats: {
        ...player.stats,
        wealth: (player.stats.wealth || 0) - downPayment
      },
      cpfData: {
        ...player.cpfData!,
        ordinaryAccount: (player.cpfData?.ordinaryAccount || 0) - downPayment
      }
    };
  }

  // ==================== FAMILY ====================
  
  static initializeMarriage(player: Player, partnerName: string): Player {
    const familyData: FamilyData = {
      relationshipStatus: RelationshipStatus.MARRIED,
      partnerName,
      marriageYear: player.lifeStageProgress?.totalYears || 0,
      children: 0,
      childrenAges: []
    };

    return {
      ...player,
      familyData,
      stats: {
        ...player.stats,
        happiness: (player.stats.happiness || 0) + 15,
        wealth: (player.stats.wealth || 0) - 30000 // Wedding costs
      }
    };
  }

  static haveChild(player: Player): Player {
    const familyData = player.familyData!;
    
    return {
      ...player,
      familyData: {
        ...familyData,
        children: familyData.children + 1,
        childrenAges: [...familyData.childrenAges, 0]
      },
      stats: {
        ...player.stats,
        happiness: (player.stats.happiness || 0) + 10,
        stress: (player.stats.stress || 0) + 8
      }
    };
  }

  // ==================== RETIREMENT ====================
  
  static initializeRetirement(player: Player): Player {
    const lifeStageProgress: LifeStageProgress = {
      currentStage: LifeStage.RETIREMENT,
      stageYear: 1,
      totalYears: (player.lifeStageProgress?.totalYears || 0) + 1,
      age: 65
    };

    return {
      ...player,
      lifeStageProgress,
      age: 65
    };
  }

  static calculateCPFPayout(cpfData: CPFData): number {
    const retirementSum = cpfData.retirementAccount + cpfData.specialAccount;
    return retirementSum * 0.004; // Simplified monthly payout
  }
}

