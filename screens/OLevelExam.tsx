import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState } from '../types';
import { SecondarySchoolService } from '../services/SecondarySchoolService';
import { GameService } from '../services/GameService';
import { SecondaryStream } from '../types/lifestages';

type NavProp = StackNavigationProp<RootStackParamList, 'OLevelExam'>;
type RouteProps = RouteProp<RootStackParamList, 'OLevelExam'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const OLevelExam: React.FC<Props> = ({ navigation, route }) => {
  const { gameState } = route.params;
  const { player } = gameState;
  
  const stream = player.secondarySchoolData?.stream || SecondaryStream.EXPRESS;
  const isOLevel = stream === SecondaryStream.EXPRESS || 
                   (stream === SecondaryStream.NORMAL_ACADEMIC && player.lifeStageProgress?.stageYear === 5);
  const examName = isOLevel ? 'O-Level' : 'N-Level';
  
  const score = isOLevel 
    ? SecondarySchoolService.calculateOLevelScore(player)
    : SecondarySchoolService.calculateNLevelScore(player);

  const options = isOLevel
    ? SecondarySchoolService.getPostSecondaryOptions(score, stream)
    : SecondarySchoolService.getPostSecondaryOptionsNormal(score, stream);

  const getScoreGrade = () => {
    if (!isOLevel) {
      if (score <= 8) return { grade: 'Excellent', color: '#27AE60', desc: 'Outstanding performance!' };
      if (score <= 12) return { grade: 'Good', color: '#2ECC71', desc: 'Well done!' };
      if (score <= 16) return { grade: 'Satisfactory', color: '#F39C12', desc: 'Decent result' };
      return { grade: 'Pass', color: '#E67E22', desc: 'You passed' };
    }
    
    if (score <= 12) return { grade: 'Excellent', color: '#27AE60', desc: 'Outstanding! Top universities await!' };
    if (score <= 20) return { grade: 'Good', color: '#2ECC71', desc: 'Great job! JC or Poly options available' };
    if (score <= 26) return { grade: 'Satisfactory', color: '#F39C12', desc: 'Decent result, Poly is a good option' };
    if (score <= 35) return { grade: 'Pass', color: '#E67E22', desc: 'You passed, ITE pathway available' };
    return { grade: 'Weak', color: '#E74C3C', desc: 'Consider retaking or alternative paths' };
  };

  const scoreGrade = getScoreGrade();

  const continueToSelection = async () => {
    // Update player with exam score
    const updatedPlayer = {
      ...player,
      examScore: score,
      postSecondaryOptions: options
    };

    const newGameState: GameState = {
      ...gameState,
      player: updatedPlayer,
      gamePhase: 'post_secondary_selection'
    };

    await GameService.saveGameState(newGameState);
    navigation.navigate('PostSecondarySelection', { gameState: newGameState });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>📝 {examName} Results</Text>
        <Text style={styles.subtitle}>
          {isOLevel ? 'GCE O-Level Examination' : 'GCE N-Level Examination'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.congratsText}>Results for {player.name}</Text>
        
        <View style={[styles.scoreCard, { borderLeftColor: scoreGrade.color }]}>
          <Text style={styles.scoreLabel}>Your {examName} Score</Text>
          <Text style={[styles.scoreValue, { color: scoreGrade.color }]}>{score}</Text>
          <Text style={styles.scoreSubtext}>
            {isOLevel ? '(L1R5 - Lower is better)' : '(EMB3 - Lower is better)'}
          </Text>
          <View style={[styles.gradeBadge, { backgroundColor: scoreGrade.color }]}>
            <Text style={styles.gradeText}>{scoreGrade.grade}</Text>
          </View>
          <Text style={styles.gradeDesc}>{scoreGrade.desc}</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Factors That Influenced Your Score</Text>
          <View style={styles.factorRow}>
            <Text style={styles.factorLabel}>Academic Skill:</Text>
            <Text style={styles.factorValue}>{player.stats.academicSkill}</Text>
          </View>
          <View style={styles.factorRow}>
            <Text style={styles.factorLabel}>Tuition Subjects:</Text>
            <Text style={styles.factorValue}>{player.tuitionSubjects?.length || 0}</Text>
          </View>
          <View style={styles.factorRow}>
            <Text style={styles.factorLabel}>Stress Level:</Text>
            <Text style={styles.factorValue}>{player.stats.stress}</Text>
          </View>
          <View style={styles.factorRow}>
            <Text style={styles.factorLabel}>Health:</Text>
            <Text style={styles.factorValue}>{player.stats.health}</Text>
          </View>
          <View style={styles.factorRow}>
            <Text style={styles.factorLabel}>Leadership:</Text>
            <Text style={styles.factorValue}>{player.stats.leadership || 0}</Text>
          </View>
          <View style={styles.factorRow}>
            <Text style={styles.factorLabel}>CCA Skill:</Text>
            <Text style={styles.factorValue}>{player.ccaSkill}</Text>
          </View>
        </View>

        <View style={styles.optionsCard}>
          <Text style={styles.optionsTitle}>🎓 Your Post-Secondary Options</Text>
          <Text style={styles.optionsSubtitle}>
            Based on your {examName} score, you qualify for:
          </Text>
          {options.map((option, index) => (
            <View key={index} style={styles.optionRow}>
              <Text style={styles.optionBullet}>✓</Text>
              <Text style={styles.optionText}>{option.replace('_', ' ').toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <View style={styles.nextStepsCard}>
          <Text style={styles.nextStepsTitle}>What's Next?</Text>
          <Text style={styles.nextStepsText}>
            You'll now choose your post-secondary pathway. This decision will shape your future career and life opportunities.
            {'\n\n'}
            Consider your interests, career goals, and the pathways available to you.
          </Text>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={continueToSelection}>
          <Text style={styles.continueButtonText}>Choose Your Path →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  content: {
    padding: 16,
    paddingTop: 40,
    paddingBottom: 40
  },
  header: {
    marginBottom: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  congratsText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20
  },
  scoreCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    alignItems: 'center'
  },
  scoreLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 4
  },
  scoreSubtext: {
    fontSize: 12,
    color: '#95A5A6',
    marginBottom: 12
  },
  gradeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8
  },
  gradeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  gradeDesc: {
    fontSize: 14,
    color: '#5D6D7E',
    textAlign: 'center'
  },
  statsCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12
  },
  factorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  factorLabel: {
    fontSize: 14,
    color: '#5D6D7E'
  },
  factorValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50'
  },
  optionsCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50'
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 6
  },
  optionsSubtitle: {
    fontSize: 13,
    color: '#5D6D7E',
    marginBottom: 12
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  optionBullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
    fontWeight: '700'
  },
  optionText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600'
  },
  nextStepsCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3'
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8
  },
  nextStepsText: {
    fontSize: 14,
    color: '#5D6D7E',
    lineHeight: 22
  },
  continueButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  }
});

export default OLevelExam;

