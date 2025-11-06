import { Player, PlayerStats } from '../types';
import { SecondaryStream, SecondarySchoolData, PostSecondaryPath, LifeStage, LifeStageProgress } from '../types/lifestages';
import { getDefaultCombination } from '../data/subjects';

export class SecondarySchoolService {
  // Initialize secondary school data when transitioning from primary
  static initializeSecondarySchool(player: Player): Player {
    const stream = this.convertPSLEStreamToSecondary(player.psleStream);
    const defaultCombo = getDefaultCombination(stream);
    
    const secondaryData: SecondarySchoolData = {
      stream,
      subjects: defaultCombo?.subjects || [],
      coCurricular: player.cca ? [player.cca] : [],
      leadership: []
    };

    const lifeStageProgress: LifeStageProgress = {
      currentStage: LifeStage.SECONDARY_SCHOOL,
      stageYear: 1,
      totalYears: player.currentYear || 6,
      age: player.age
    };

    return {
      ...player,
      secondarySchoolData: secondaryData,
      lifeStageProgress
    };
  }

  // Convert PSLE stream to secondary stream
  private static convertPSLEStreamToSecondary(psleStream: any): SecondaryStream {
    switch (psleStream) {
      case 'ip':
        return SecondaryStream.INTEGRATED_PROGRAMME;
      case 'express':
        return SecondaryStream.EXPRESS;
      case 'normal_academic':
        return SecondaryStream.NORMAL_ACADEMIC;
      case 'normal_technical':
        return SecondaryStream.NORMAL_TECHNICAL;
      default:
        return SecondaryStream.EXPRESS;
    }
  }

  // Calculate O-Level score (L1R5 - lower is better, range 6-45)
  static calculateOLevelScore(player: Player): number {
    const academicSkill = player.stats.academicSkill || 50;
    const stress = player.stats.stress || 50;
    const health = player.stats.health || 50;
    
    // Base score calculation (inverse of academic skill)
    let score = 45 - (academicSkill * 0.4);
    
    // Tuition bonus
    const tuitionCount = player.tuitionSubjects?.length || 0;
    score -= tuitionCount * 2;
    
    // Stress penalty
    if (stress > 70) score += 3;
    if (stress > 85) score += 2;
    
    // Health bonus
    if (health > 70) score -= 2;
    if (health > 85) score -= 1;
    
    // Leadership bonus
    const leadership = player.stats.leadership || 0;
    if (leadership > 60) score -= 2;
    
    // CCA bonus
    if (player.ccaSkill > 60) score -= 1;
    if (player.ccaSkill > 80) score -= 1;
    
    // Clamp between 6 and 45
    return Math.max(6, Math.min(45, Math.round(score)));
  }

  // Calculate N-Level score (EMB3 - lower is better, range 4-20)
  static calculateNLevelScore(player: Player): number {
    const academicSkill = player.stats.academicSkill || 50;
    const stress = player.stats.stress || 50;
    
    let score = 20 - (academicSkill * 0.3);
    
    const tuitionCount = player.tuitionSubjects?.length || 0;
    score -= tuitionCount * 1.5;
    
    if (stress > 70) score += 2;
    
    return Math.max(4, Math.min(20, Math.round(score)));
  }

  // Determine post-secondary options based on O-Level score
  static getPostSecondaryOptions(oLevelScore: number, stream: SecondaryStream): PostSecondaryPath[] {
    const options: PostSecondaryPath[] = [];
    
    if (stream === SecondaryStream.INTEGRATED_PROGRAMME) {
      // IP students go directly to JC
      options.push(PostSecondaryPath.JUNIOR_COLLEGE);
      return options;
    }
    
    // Junior College (need good O-Level score)
    if (oLevelScore <= 20) {
      options.push(PostSecondaryPath.JUNIOR_COLLEGE);
    }
    
    // Polytechnic (moderate O-Level score)
    if (oLevelScore <= 26) {
      options.push(PostSecondaryPath.POLYTECHNIC);
    }
    
    // ITE (any O-Level score)
    if (oLevelScore <= 35) {
      options.push(PostSecondaryPath.ITE);
    }
    
    // Work (always available)
    options.push(PostSecondaryPath.WORK);
    
    return options;
  }

  // Get post-secondary options for Normal stream students
  static getPostSecondaryOptionsNormal(nLevelScore: number, stream: SecondaryStream): PostSecondaryPath[] {
    const options: PostSecondaryPath[] = [];
    
    if (stream === SecondaryStream.NORMAL_ACADEMIC) {
      // Good N-Level score can progress to Sec 5 for O-Levels
      if (nLevelScore <= 12) {
        // After Sec 5 O-Levels, can go to Poly/JC
        options.push(PostSecondaryPath.POLYTECHNIC);
      }
      // Can go to ITE
      options.push(PostSecondaryPath.ITE);
    } else if (stream === SecondaryStream.NORMAL_TECHNICAL) {
      // NT students typically go to ITE
      options.push(PostSecondaryPath.ITE);
    }
    
    // Work always available
    options.push(PostSecondaryPath.WORK);
    
    return options;
  }

  // Calculate yearly stat changes for secondary school
  static calculateYearlyStats(
    player: Player,
    academicFocus: number, // 0-10
    ccaFocus: number, // 0-10
    socialFocus: number // 0-10
  ): Partial<PlayerStats> {
    const changes: Partial<PlayerStats> = {};
    
    // Academic skill grows more slowly to make grades harder to maintain
    changes.academicSkill = Math.min(7, Math.max(0, Math.round(academicFocus * 0.9)));
    if (player.tuitionSubjects && player.tuitionSubjects.length > 0) {
      changes.academicSkill += Math.min(3, Math.round(player.tuitionSubjects.length * 1));
    }
    
    // Stress ramps up faster in secondary school
    changes.stress = Math.round(academicFocus * 1.6);
    if (academicFocus >= 8) changes.stress += 4;
    
    // Tuition stress (higher to reflect tighter schedules)
    if (player.tuitionSubjects && player.tuitionSubjects.length > 0) {
      changes.stress += player.tuitionSubjects.length * 2;
    }
    
    // CCA benefits (still helpful but not a full antidote)
    if (ccaFocus >= 3) {
      changes.health = Math.round(ccaFocus * 0.8);
      changes.stress = (changes.stress || 0) - Math.round(ccaFocus * 0.5);
      changes.happiness = Math.round(ccaFocus * 0.6);
    } else {
      changes.happiness = -2;
      changes.health = -1;
    }
    
    // Social/volunteering (reduced scaling, easier to slip backwards)
    changes.socialImpact = Math.round(socialFocus * 1.2);
    if (socialFocus >= 3) {
      changes.happiness = (changes.happiness || 0) + Math.round(socialFocus * 0.6);
      changes.reputation = Math.round(socialFocus * 0.3);
    } else {
      changes.socialImpact = (changes.socialImpact || 0) - 2;
      changes.reputation = Math.min(0, (changes.reputation || 0) - 1);
    }
    
    // Leadership from CCA and social activities (slower growth)
    if (ccaFocus >= 5 || socialFocus >= 5) {
      changes.leadership = Math.max(1, Math.floor((ccaFocus + socialFocus) / 4));
    }
    
    // Work experience if doing part-time work
    if (player.stats.workExperience && player.stats.workExperience > 0) {
      changes.workExperience = 1; // slower growth
    }

    // Baseline burnout from balancing commitments
    const workload = academicFocus + ccaFocus + socialFocus;
    const burnout = Math.max(2, Math.round(workload / 3));
    changes.happiness = (changes.happiness || 0) - burnout;
    changes.health = (changes.health || 0) - Math.max(2, Math.round(academicFocus / 2));
    changes.stress = (changes.stress || 0) + Math.max(3, Math.round(workload / 2));

    // Annual personal expenses eat into savings
    changes.wealth = (changes.wealth || 0) - 800;
    
    return changes;
  }

  // Advance to next year
  static advanceYear(player: Player): Player {
    const currentStageYear = player.lifeStageProgress?.stageYear || 1;
    const stream = player.secondarySchoolData?.stream || SecondaryStream.EXPRESS;
    
    const maxYears = this.getMaxYearsForStream(stream);
    
    if (currentStageYear >= maxYears) {
      // Completed secondary school
      return player;
    }
    
    return {
      ...player,
      age: player.age + 1,
      lifeStageProgress: {
        ...player.lifeStageProgress!,
        stageYear: currentStageYear + 1,
        totalYears: (player.lifeStageProgress?.totalYears || 0) + 1,
        age: player.age + 1
      }
    };
  }

  // Get maximum years for stream
  static getMaxYearsForStream(stream: SecondaryStream): number {
    switch (stream) {
      case SecondaryStream.INTEGRATED_PROGRAMME:
        return 6;
      case SecondaryStream.EXPRESS:
        return 4;
      case SecondaryStream.NORMAL_ACADEMIC:
        return 5; // Includes Sec 5 for O-Levels
      case SecondaryStream.NORMAL_TECHNICAL:
        return 4;
      default:
        return 4;
    }
  }

  // Check if student should take major exam this year
  static shouldTakeMajorExam(player: Player): { exam: 'O-Level' | 'N-Level' | null; isGraduating: boolean } {
    const stream = player.secondarySchoolData?.stream;
    const year = player.lifeStageProgress?.stageYear || 1;
    
    if (stream === SecondaryStream.EXPRESS && year === 4) {
      return { exam: 'O-Level', isGraduating: true };
    }
    
    if (stream === SecondaryStream.NORMAL_ACADEMIC && year === 4) {
      return { exam: 'N-Level', isGraduating: false };
    }
    
    if (stream === SecondaryStream.NORMAL_ACADEMIC && year === 5) {
      return { exam: 'O-Level', isGraduating: true };
    }
    
    if (stream === SecondaryStream.NORMAL_TECHNICAL && year === 4) {
      return { exam: 'N-Level', isGraduating: true };
    }
    
    if (stream === SecondaryStream.INTEGRATED_PROGRAMME && year === 6) {
      return { exam: null, isGraduating: true }; // IP students don't take O-Levels
    }
    
    return { exam: null, isGraduating: false };
  }

  // Add leadership position
  static addLeadershipPosition(player: Player, position: string): Player {
    const leadership = player.secondarySchoolData?.leadership || [];
    if (!leadership.includes(position)) {
      leadership.push(position);
    }
    
    return {
      ...player,
      secondarySchoolData: {
        ...player.secondarySchoolData!,
        leadership
      },
      stats: {
        ...player.stats,
        leadership: (player.stats.leadership || 0) + 5,
        reputation: (player.stats.reputation || 0) + 3
      }
    };
  }

  // Add CCA
  static addCCA(player: Player, cca: string): Player {
    const ccas = player.secondarySchoolData?.coCurricular || [];
    if (!ccas.includes(cca)) {
      ccas.push(cca);
    }
    
    return {
      ...player,
      secondarySchoolData: {
        ...player.secondarySchoolData!,
        coCurricular: ccas
      }
    };
  }
}

