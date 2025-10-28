import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { ACTIVITY_POINTS_PER_YEAR, HEALTHY_MEAL_COST, UNHEALTHY_MEAL_COST, SES_CONFIG, CCA_OPTIONS } from '../data/constants';
import { ActivityPoints, GameState, MealChoice, Player } from '../types';
import { GameService } from '../services/GameService';

type NavProp = StackNavigationProp<RootStackParamList, 'YearlyPlanning'>;
type RouteProps = RouteProp<RootStackParamList, 'YearlyPlanning'>;

interface Props { 
  navigation: NavProp; 
  route: RouteProps; 
}

const YearlyPlanning: React.FC<Props> = ({ navigation, route }) => {
  const [gameState, setGameState] = useState<GameState>(route.params.gameState);
  const { player } = gameState;
  
  const [academics, setAcademics] = useState(5);
  const [ccaPoints, setCcaPoints] = useState(3);
  const [volunteering, setVolunteering] = useState(2);
  const [mealChoice, setMealChoice] = useState<MealChoice>(MealChoice.HEALTHY);
  const [tuitionSubjects, setTuitionSubjects] = useState<string[]>([]);
  const [selectedCCA, setSelectedCCA] = useState<string | null>(player.cca || null);

  const totalPoints = academics + ccaPoints + volunteering;
  const maxPoints = ACTIVITY_POINTS_PER_YEAR;
  const canConfirm = totalPoints === maxPoints && selectedCCA !== null;

  const yearlyAllowance = player.dailyAllowance * 365;
  const mealCost = (mealChoice === MealChoice.HEALTHY ? HEALTHY_MEAL_COST : UNHEALTHY_MEAL_COST) * 365;
  const tuitionCost = tuitionSubjects.length * 200 * 12;
  const totalCost = mealCost + tuitionCost;
  const savings = yearlyAllowance - totalCost;

  const maxTuition = SES_CONFIG[player.sesClass].maxTuitionSubjects;

  const adjustPoints = (type: 'academic' | 'cca' | 'social', delta: number) => {
    const newTotal = totalPoints + delta;
    if (newTotal > maxPoints) return;

    if (type === 'academic') setAcademics(Math.max(0, Math.min(10, academics + delta)));
    if (type === 'cca') setCcaPoints(Math.max(0, Math.min(10, ccaPoints + delta)));
    if (type === 'social') setVolunteering(Math.max(0, Math.min(10, volunteering + delta)));
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
      Alert.alert('Incomplete', 'Please allocate all 10 activity points and select a CCA');
      return;
    }

    const updatedPlayer: Player = { 
      ...player, 
      mealChoice, 
      tuitionSubjects, 
      cca: selectedCCA as any 
    };
    
    const ap: ActivityPoints = { academics, cca: ccaPoints, volunteering };
    
    // Calculate yearly stats
    const { statsChange, wealthChange } = GameService.calculateYearlyStats(updatedPlayer, ap, mealChoice);
    let finalPlayer = GameService.updatePlayerStats(updatedPlayer, { ...statsChange, wealth: wealthChange });
    finalPlayer = GameService.updateCCASkill(finalPlayer, ccaPoints);

    // Check achievements
    finalPlayer = GameService.checkAchievements(finalPlayer);

    // Advance year
    const advanced = GameService.advanceToNextYear(finalPlayer);

    const newState: GameState = { ...gameState, player: advanced, currentYear: advanced.currentYear };
    await GameService.saveGameState(newState);

    // If completed Primary 6 (year 6), go to PSLE
    if (advanced.currentYear > 6) {
      navigation.navigate('PSLEAssessment', { gameState: newState });
    } else {
      navigation.navigate('Game', { gameState: newState });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>📅 Plan Your Year</Text>
        <Text style={styles.subheader}>
          {player.lifeStageProgress?.currentStage === 'secondary_school' 
            ? `Secondary ${player.lifeStageProgress?.stageYear || 1}`
            : `Primary ${player.currentYear}`} • Age {player.age}
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
              <Text style={styles.pointsValue}>{academics}</Text>
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
              <Text style={styles.pointsValue}>{ccaPoints}</Text>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => adjustPoints('cca', 1)}
              >
                <Text style={styles.controlButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Volunteering Focus */}
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
              <Text style={styles.pointsValue}>{volunteering}</Text>
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
          <Text style={styles.cardTitle}>Choose Your CCA</Text>
          <Text style={styles.cardSubtitle}>Select one co-curricular activity</Text>
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
              <Text style={styles.mealCost}>${HEALTHY_MEAL_COST}/day</Text>
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
              <Text style={styles.mealCost}>${UNHEALTHY_MEAL_COST}/day</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tuition */}
        {maxTuition > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tuition (Max {maxTuition})</Text>
            <Text style={styles.cardSubtitle}>
              Extra classes cost $200/month per subject
            </Text>
            <View style={styles.tuitionList}>
              {['Math', 'English', 'Science'].map(subject => (
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
            {canConfirm ? 'Confirm Year Plan' : 'Complete All Selections First'}
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

export default YearlyPlanning;
