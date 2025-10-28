import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState, Player, MealChoice } from '../types';
import { SecondarySchoolService } from '../services/SecondarySchoolService';
import { GameService } from '../services/GameService';
import { SECONDARY_EVENTS } from '../data/secondaryEvents';
import { CCA_OPTIONS } from '../data/constants';

type NavProp = StackNavigationProp<RootStackParamList, 'SecondaryYearPlanning'>;
type RouteProps = RouteProp<RootStackParamList, 'SecondaryYearPlanning'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const SecondaryYearPlanning: React.FC<Props> = ({ navigation, route }) => {
  const [gameState, setGameState] = useState<GameState>(route.params.gameState);
  const { player } = gameState;
  
  const [academicFocus, setAcademicFocus] = useState(5);
  const [ccaFocus, setCcaFocus] = useState(3);
  const [socialFocus, setSocialFocus] = useState(2);
  const [mealChoice, setMealChoice] = useState<MealChoice>(MealChoice.HEALTHY);
  const [tuitionSubjects, setTuitionSubjects] = useState<string[]>([]);
  const [selectedCCA, setSelectedCCA] = useState<string | null>(player.cca || null);

  const totalPoints = academicFocus + ccaFocus + socialFocus;
  const maxPoints = 10;

  // Calculate budget first
  const yearlyAllowance = player.dailyAllowance * 365;
  const mealCost = (mealChoice === MealChoice.HEALTHY ? 5 : 2) * 365;
  const tuitionCost = tuitionSubjects.length * 200 * 12;
  const totalCost = mealCost + tuitionCost;
  const savings = yearlyAllowance - totalCost;
  
  // Then check if can afford
  const canAffordYear = savings >= 0;
  const canConfirm = totalPoints === maxPoints && selectedCCA !== null && canAffordYear;

  const maxTuition = player.sesClass === 'upper' ? 2 : player.sesClass === 'middle' ? 1 : 0;

  const adjustPoints = (type: 'academic' | 'cca' | 'social', delta: number) => {
    const newTotal = totalPoints + delta;
    if (newTotal > maxPoints) return;

    if (type === 'academic') setAcademicFocus(Math.max(0, Math.min(10, academicFocus + delta)));
    if (type === 'cca') setCcaFocus(Math.max(0, Math.min(10, ccaFocus + delta)));
    if (type === 'social') setSocialFocus(Math.max(0, Math.min(10, socialFocus + delta)));
  };

  const toggleTuition = (subject: string) => {
    if (tuitionSubjects.includes(subject)) {
      setTuitionSubjects(tuitionSubjects.filter(s => s !== subject));
    } else if (tuitionSubjects.length < maxTuition) {
      setTuitionSubjects([...tuitionSubjects, subject]);
    }
  };

  const confirmYear = async () => {
    if (!canConfirm) {
      if (!canAffordYear) {
        Alert.alert('Insufficient Funds', `You cannot afford this year's expenses. You need at least $${Math.abs(savings)} more.`);
      } else if (!selectedCCA) {
        Alert.alert('No CCA Selected', 'Please select a CCA to continue');
      } else {
        Alert.alert('Incomplete', 'Please allocate all 10 activity points');
      }
      return;
    }

    // Calculate stat changes
    const statChanges = SecondarySchoolService.calculateYearlyStats(
      player,
      academicFocus,
      ccaFocus,
      socialFocus
    );

    // Update player stats
    let updatedPlayer = GameService.updatePlayerStats(player, statChanges);
    const previousCCA = player.cca;
    updatedPlayer = {
      ...updatedPlayer,
      mealChoice,
      tuitionSubjects,
      cca: selectedCCA as any,
      stats: {
        ...updatedPlayer.stats,
        wealth: (updatedPlayer.stats.wealth || 0) + savings
      }
    };
    
    // Update CCA skill with retention if CCA changed
    updatedPlayer = GameService.updateCCASkill(updatedPlayer, ccaFocus, previousCCA);

    // Trigger random event
    const stageYear = player.lifeStageProgress?.stageYear || 1;
    const availableEvents = SECONDARY_EVENTS.filter(event => {
      if (event.requiresYear && !event.requiresYear.includes(stageYear)) return false;
      if (event.requiresTraits && !event.requiresTraits.some(t => player.personalityTraits?.includes(t))) return false;
      if (event.requiresGender && event.requiresGender !== player.avatarCustomization?.gender) return false;
      if (event.requiresCCASkill && player.ccaSkill < event.requiresCCASkill) return false;
      if (event.requiresCCATypes && player.cca && !event.requiresCCATypes.includes(player.cca)) return false;
      return Math.random() < (event.probability || 0.2);
    });

    if (availableEvents.length > 0) {
      const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
      const eventChanges = GameService.getRandomEventEffects(randomEvent.id);
      updatedPlayer = GameService.updatePlayerStats(updatedPlayer, eventChanges);
      updatedPlayer = GameService.updateRelationships(updatedPlayer, randomEvent.id);
      updatedPlayer.eventHistory = [...(updatedPlayer.eventHistory || []), randomEvent.id];
    }

    // Check achievements
    updatedPlayer = GameService.checkAchievements(updatedPlayer);

    // Advance year
    updatedPlayer = SecondarySchoolService.advanceYear(updatedPlayer);

    const newGameState: GameState = {
      ...gameState,
      player: updatedPlayer
    };

    await GameService.saveGameState(newGameState);

    // Check if should take major exam or graduate
    const examInfo = SecondarySchoolService.shouldTakeMajorExam(updatedPlayer);
    
    if (examInfo.exam) {
      // Take exam first
      navigation.navigate('OLevelExam', { gameState: newGameState });
    } else if (examInfo.isGraduating) {
      // IP students or completed all years - go to post-secondary
      navigation.navigate('PostSecondarySelection', { gameState: newGameState });
    } else {
      // Continue secondary school
      navigation.navigate('SecondarySchool', { gameState: newGameState });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>📅 Plan Your Year</Text>
        <Text style={styles.subheader}>
          Secondary {player.lifeStageProgress?.stageYear || 1} • Age {player.age}
        </Text>

        {/* Activity Points */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activity Points (10 total)</Text>
          <Text style={styles.cardSubtitle}>
            Allocated: {totalPoints}/10 {canConfirm ? '✓' : ''}
          </Text>

          {/* Academic Focus */}
          <View style={styles.activityRow}>
            <View style={styles.activityInfo}>
              <Text style={styles.activityLabel}>📚 Academic Focus</Text>
              <Text style={styles.activityDesc}>Study and homework</Text>
            </View>
            <View style={styles.activityControls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => adjustPoints('academic', -1)}
              >
                <Text style={styles.controlButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.pointsValue}>{academicFocus}</Text>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => adjustPoints('academic', 1)}
              >
                <Text style={styles.controlButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* CCA Focus */}
          <View style={styles.activityRow}>
            <View style={styles.activityInfo}>
              <Text style={styles.activityLabel}>🎯 CCA & Sports</Text>
              <Text style={styles.activityDesc}>Co-curricular activities</Text>
            </View>
            <View style={styles.activityControls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => adjustPoints('cca', -1)}
              >
                <Text style={styles.controlButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.pointsValue}>{ccaFocus}</Text>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => adjustPoints('cca', 1)}
              >
                <Text style={styles.controlButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Social Focus */}
          <View style={styles.activityRow}>
            <View style={styles.activityInfo}>
              <Text style={styles.activityLabel}>🤝 Social & Volunteering</Text>
              <Text style={styles.activityDesc}>Friends and community</Text>
            </View>
            <View style={styles.activityControls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => adjustPoints('social', -1)}
              >
                <Text style={styles.controlButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.pointsValue}>{socialFocus}</Text>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => adjustPoints('social', 1)}
              >
                <Text style={styles.controlButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* CCA Selection */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your CCA</Text>
          <Text style={styles.cardSubtitle}>Continue or change your co-curricular activity</Text>
          <View style={styles.ccaGrid}>
            {CCA_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.ccaOption,
                  selectedCCA === option.id && styles.ccaOptionSelected
                ]}
                onPress={() => setSelectedCCA(option.id)}
              >
                <Text style={styles.ccaEmoji}>{option.emoji}</Text>
                <Text style={styles.ccaLabel}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {player.cca && selectedCCA !== player.cca && (
            <Text style={styles.ccaWarning}>⚠️ Changing CCA will retain only 30% of your current skill</Text>
          )}
        </View>

        {/* Meal Choice */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Meals</Text>
          <View style={styles.mealOptions}>
            <TouchableOpacity
              style={[
                styles.mealOption,
                mealChoice === MealChoice.HEALTHY && styles.mealOptionSelected
              ]}
              onPress={() => setMealChoice(MealChoice.HEALTHY)}
            >
              <Text style={styles.mealEmoji}>🥗</Text>
              <Text style={styles.mealLabel}>Healthy</Text>
              <Text style={styles.mealCost}>$5/day</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.mealOption,
                mealChoice === MealChoice.UNHEALTHY && styles.mealOptionSelected
              ]}
              onPress={() => setMealChoice(MealChoice.UNHEALTHY)}
            >
              <Text style={styles.mealEmoji}>🍔</Text>
              <Text style={styles.mealLabel}>Budget</Text>
              <Text style={styles.mealCost}>$2/day</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tuition */}
        {maxTuition > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tuition (Max {maxTuition})</Text>
            <View style={styles.tuitionList}>
              {['Mathematics', 'Science', 'English'].map(subject => (
                <TouchableOpacity
                  key={subject}
                  style={[
                    styles.tuitionOption,
                    tuitionSubjects.includes(subject) && styles.tuitionOptionSelected,
                    tuitionSubjects.length >= maxTuition &&
                      !tuitionSubjects.includes(subject) &&
                      styles.tuitionOptionDisabled
                  ]}
                  onPress={() => toggleTuition(subject)}
                >
                  <Text style={styles.tuitionLabel}>{subject}</Text>
                  <Text style={styles.tuitionCost}>$200/month</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Budget Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Yearly Budget</Text>
          <View style={styles.budgetRow}>
            <Text style={styles.budgetLabel}>Allowance:</Text>
            <Text style={styles.budgetValue}>+${yearlyAllowance}</Text>
          </View>
          <View style={styles.budgetRow}>
            <Text style={styles.budgetLabel}>Meals:</Text>
            <Text style={[styles.budgetValue, styles.budgetExpense]}>-${mealCost}</Text>
          </View>
          {tuitionCost > 0 && (
            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>Tuition:</Text>
              <Text style={[styles.budgetValue, styles.budgetExpense]}>-${tuitionCost}</Text>
            </View>
          )}
          <View style={[styles.budgetRow, styles.budgetTotal]}>
            <Text style={styles.budgetTotalLabel}>Net Savings:</Text>
            <Text
              style={[
                styles.budgetTotalValue,
                { color: savings >= 0 ? '#27AE60' : '#E74C3C' }
              ]}
            >
              ${savings}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.confirmButton, !canConfirm && styles.confirmButtonDisabled]}
          onPress={confirmYear}
          disabled={!canConfirm}
        >
          <Text style={styles.confirmButtonText}>
            {canConfirm ? 'Confirm Year Plan' : 'Allocate All Points First'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    padding: 16,
    paddingTop: 40,
    paddingBottom: 40
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4
  },
  subheader: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 16
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1'
  },
  activityInfo: {
    flex: 1
  },
  activityLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2
  },
  activityDesc: {
    fontSize: 12,
    color: '#95A5A6'
  },
  activityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700'
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    minWidth: 30,
    textAlign: 'center'
  },
  mealOptions: {
    flexDirection: 'row',
    gap: 12
  },
  mealOption: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0'
  },
  mealOptionSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#E3F2FD'
  },
  mealEmoji: {
    fontSize: 32,
    marginBottom: 8
  },
  mealLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4
  },
  mealCost: {
    fontSize: 12,
    color: '#7F8C8D'
  },
  tuitionList: {
    gap: 8
  },
  tuitionOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0'
  },
  tuitionOptionSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#E3F2FD'
  },
  tuitionOptionDisabled: {
    opacity: 0.4
  },
  tuitionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50'
  },
  tuitionCost: {
    fontSize: 13,
    color: '#7F8C8D'
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  budgetLabel: {
    fontSize: 14,
    color: '#5D6D7E'
  },
  budgetValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27AE60'
  },
  budgetExpense: {
    color: '#E74C3C'
  },
  budgetTotal: {
    borderTopWidth: 2,
    borderTopColor: '#ECF0F1',
    marginTop: 8,
    paddingTop: 12
  },
  budgetTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50'
  },
  budgetTotalValue: {
    fontSize: 16,
    fontWeight: '700'
  },
  ccaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  ccaOption: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0'
  },
  ccaOptionSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#E3F2FD'
  },
  ccaEmoji: {
    fontSize: 28,
    marginBottom: 6
  },
  ccaLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center'
  },
  ccaWarning: {
    fontSize: 12,
    color: '#FF9800',
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '600'
  },
  confirmButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  confirmButtonDisabled: {
    backgroundColor: '#BDC3C7',
    shadowOpacity: 0
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center'
  }
});

export default SecondaryYearPlanning;

