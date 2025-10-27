import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState } from '../types';
import { GameService } from '../services/GameService';
import { SecondarySchoolService } from '../services/SecondarySchoolService';

type NavProp = StackNavigationProp<RootStackParamList, 'PSLEAssessment'>;
type RouteProps = RouteProp<RootStackParamList, 'PSLEAssessment'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const PSLEAssessment: React.FC<Props> = ({ navigation, route }) => {
  const { gameState } = route.params;
  const { player } = gameState;
  
  const stream = GameService.calculatePSLEStream(player.stats.academicSkill, player.ccaSkill);
  const special = GameService.checkSpecialProgramEligibility(player.ccaSkill);

  const continueToSecondary = async () => {
    // Update player with PSLE stream
    const updatedPlayer = { ...player, psleStream: stream };
    
    // Check achievements (Scholar achievement)
    const playerWithAchievements = GameService.checkAchievements(updatedPlayer);
    
    // Initialize secondary school
    const secondaryPlayer = SecondarySchoolService.initializeSecondarySchool(playerWithAchievements);
    
    const next: GameState = { 
      ...gameState, 
      player: secondaryPlayer,
      gamePhase: 'secondary'
    };
    
    await GameService.saveGameState(next);
    
    // Navigate to secondary school
    navigation.navigate('SecondarySchool', { gameState: next });
  };

  const getStreamColor = () => {
    switch (stream) {
      case 'ip': return '#9C27B0';
      case 'express': return '#2196F3';
      case 'normal_academic': return '#4CAF50';
      case 'normal_technical': return '#FF9800';
      default: return '#607D8B';
    }
  };

  const getStreamName = () => {
    switch (stream) {
      case 'ip': return 'Integrated Programme (IP)';
      case 'express': return 'Express Stream';
      case 'normal_academic': return 'Normal (Academic)';
      case 'normal_technical': return 'Normal (Technical)';
      default: return 'Express Stream';
    }
  };

  const getStreamDescription = () => {
    switch (stream) {
      case 'ip':
        return 'Congratulations! You\'ve qualified for the Integrated Programme. You\'ll skip O-Levels and go straight to A-Levels after 6 years.';
      case 'express':
        return 'You\'re in the Express stream! You\'ll take O-Level examinations in Secondary 4.';
      case 'normal_academic':
        return 'You\'re in the Normal (Academic) stream. You\'ll take N-Levels in Sec 4 and can progress to O-Levels in Sec 5.';
      case 'normal_technical':
        return 'You\'re in the Normal (Technical) stream. You\'ll take N-Levels in Sec 4 and typically progress to ITE.';
      default:
        return 'You\'re in the Express stream!';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>🎓 PSLE Results</Text>
        <Text style={styles.subtitle}>Primary School Leaving Examination</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.congratsText}>Congratulations, {player.name}!</Text>
        <Text style={styles.infoText}>You've completed primary school.</Text>

        <View style={[styles.streamCard, { borderLeftColor: getStreamColor() }]}>
          <Text style={styles.streamLabel}>Your Secondary School Stream</Text>
          <Text style={[styles.streamName, { color: getStreamColor() }]}>{getStreamName()}</Text>
          <Text style={styles.streamDesc}>{getStreamDescription()}</Text>
        </View>

        {special && (
          <View style={styles.specialCard}>
            <Text style={styles.specialTitle}>🌟 Special Programme Eligible</Text>
            <Text style={styles.specialText}>
              Your excellent CCA performance makes you eligible for special programmes!
            </Text>
          </View>
        )}

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Final Primary School Stats</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Academic Skill:</Text>
            <Text style={styles.statValue}>{player.stats.academicSkill}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>CCA Skill:</Text>
            <Text style={styles.statValue}>{player.ccaSkill}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Happiness:</Text>
            <Text style={styles.statValue}>{player.stats.happiness}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Health:</Text>
            <Text style={styles.statValue}>{player.stats.health}</Text>
          </View>
        </View>

        <View style={styles.nextStepsCard}>
          <Text style={styles.nextStepsTitle}>What's Next?</Text>
          <Text style={styles.nextStepsText}>
            • You'll enter secondary school at age {player.age + 1}{'\n'}
            • Choose your subjects and CCAs{'\n'}
            • Build new friendships and relationships{'\n'}
            • Work towards your O-Level/N-Level examinations{'\n'}
            • Explore your interests and future career paths
          </Text>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={continueToSecondary}>
          <Text style={styles.continueButtonText}>Continue to Secondary School →</Text>
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
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8
  },
  infoText: {
    fontSize: 15,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 24
  },
  streamCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4
  },
  streamLabel: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  streamName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8
  },
  streamDesc: {
    fontSize: 14,
    color: '#5D6D7E',
    lineHeight: 20
  },
  specialCard: {
    backgroundColor: '#FFF9C4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107'
  },
  specialTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 6
  },
  specialText: {
    fontSize: 14,
    color: '#5D6D7E',
    lineHeight: 20
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
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  statLabel: {
    fontSize: 14,
    color: '#5D6D7E'
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50'
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

export default PSLEAssessment;

