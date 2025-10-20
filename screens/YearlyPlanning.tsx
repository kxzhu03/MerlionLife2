import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { ACTIVITY_POINTS_PER_YEAR, HEALTHY_MEAL_COST, UNHEALTHY_MEAL_COST, SES_CONFIG, CCA_OPTIONS } from '../data/constants';
import { ActivityPoints, GameState, MealChoice, Player, RandomEvent, SESClass } from '../types';
import ActivitySlider from '../components/ActivitySlider';
import { GameService } from '../services/GameService';

type NavProp = StackNavigationProp<RootStackParamList, 'YearlyPlanning'>;
type RouteProps = RouteProp<RootStackParamList, 'YearlyPlanning'>;

interface Props { navigation: NavProp; route: RouteProps; }

const YearlyPlanning: React.FC<Props> = ({ navigation, route }) => {
  const [gameState, setGameState] = useState<GameState>(route.params.gameState);
  const [academics, setAcademics] = useState(0);
  const [cca, setCca] = useState(0);
  const [volunteering, setVolunteering] = useState(0);
  const initYearlyBudget = route.params.gameState.player.stats.wealth + (route.params.gameState.player.dailyAllowance * 365);
  const canAffordHealthyInit = (initYearlyBudget - (HEALTHY_MEAL_COST * 365)) > 0;
  const [mealHealthy, setMealHealthy] = useState<boolean>(canAffordHealthyInit);
  const [tuitionSelected, setTuitionSelected] = useState<string[]>([]);
  const [selectedCCA, setSelectedCCA] = useState<string | null>(gameState.player.cca || null);
  const [ccaOpen, setCcaOpen] = useState<boolean>(false);
  const [showTuitionInfo, setShowTuitionInfo] = useState<boolean>(false);

  const remaining = ACTIVITY_POINTS_PER_YEAR - (academics + cca + volunteering);
  const mealChoice = mealHealthy ? MealChoice.HEALTHY : MealChoice.UNHEALTHY;

  const maxTuition = SES_CONFIG[gameState.player.sesClass].maxTuitionSubjects;

  const canConfirm = remaining === 0 && (!!selectedCCA);

  const toggleTuition = (subject: string) => {
    if (tuitionSelected.includes(subject)) {
      setTuitionSelected(tuitionSelected.filter(s => s !== subject));
      return;
    }
    if (tuitionSelected.length >= maxTuition) return;
    setTuitionSelected([...tuitionSelected, subject]);
  };

  const confirmYear = async () => {
    if (!canConfirm) return;
    const player: Player = { ...gameState.player, mealChoice, tuitionSubjects: tuitionSelected, cca: (selectedCCA as any) || gameState.player.cca };
    const ap: ActivityPoints = { academics, cca, volunteering };
    // Yearly calculations
    const { statsChange, wealthChange } = GameService.calculateYearlyStats(player, ap, mealChoice);
    const updated = GameService.updatePlayerStats(player, { ...statsChange, wealth: wealthChange });
    const updatedWithCCA = GameService.updateCCASkill(updated, cca);

    // Random events are handled at the start of the next year (on Game screen)
    let finalPlayer = updatedWithCCA;

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

  const yearlyBudget = gameState.player.stats.wealth + (gameState.player.dailyAllowance * 365);
  const canAffordHealthy = (yearlyBudget - (HEALTHY_MEAL_COST * 365)) > 0;
  const canAffordUnhealthy = (yearlyBudget - (UNHEALTHY_MEAL_COST * 365)) > 0;

  const onToggleMeal = (val: boolean) => {
    if (val && !canAffordHealthy) {
      Alert.alert('Not enough allowance', `Healthy meals cost S$${HEALTHY_MEAL_COST}/day.`);
      return;
    }
    if (!val && !canAffordUnhealthy) {
      Alert.alert('Not enough allowance', `Unhealthy meals cost S$${UNHEALTHY_MEAL_COST}/day.`);
      return;
    }
    setMealHealthy(val);
  };

  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={[styles.scroll, styles.webScroll]}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
        overScrollMode="always"
      >
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Plan Year {gameState.player.currentYear}</Text>
      </View>
      {ccaOpen && (
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setCcaOpen(false)} />
      )}
      <Text style={styles.subtitle}>Distribute 10 activity points</Text>
      <ActivitySlider label="Academics" value={academics} maxValue={ACTIVITY_POINTS_PER_YEAR - (cca + volunteering)} onChange={setAcademics} icon="📚" color="#2196F3" />
      <ActivitySlider label="CCA / Skill" value={cca} maxValue={ACTIVITY_POINTS_PER_YEAR - (academics + volunteering)} onChange={setCca} icon="🎯" color="#00BCD4" />
      <ActivitySlider label="Volunteering" value={volunteering} maxValue={ACTIVITY_POINTS_PER_YEAR - (academics + cca)} onChange={setVolunteering} icon="🤝" color="#9C27B0" />
      <Text style={styles.remaining}>Remaining: {remaining} pts</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Choose a CCA</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity onPress={() => setCcaOpen(!ccaOpen)} style={styles.dropdownToggle}>
            <Text style={styles.dropdownText}>{selectedCCA ? (CCA_OPTIONS.find(o => o.id === selectedCCA)?.name || 'Select a CCA') : 'Select a CCA'}</Text>
            <Text style={styles.dropdownCaret}>{ccaOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {ccaOpen && (
            <View style={styles.dropdownMenu}>
              {CCA_OPTIONS.map((opt) => (
                <TouchableOpacity key={opt.id} style={styles.dropdownItem} onPress={() => { setSelectedCCA(opt.id); setCcaOpen(false); }}>
                  <Text style={styles.ccaEmoji}>{opt.emoji}</Text>
                  <Text style={styles.dropdownItemText}>{opt.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {!selectedCCA && <Text style={styles.helper}>Select a CCA to continue</Text>}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Food Habit</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.helper}>{mealHealthy ? `Healthy (S$${HEALTHY_MEAL_COST}/day)` : `Unhealthy (S$${UNHEALTHY_MEAL_COST}/day)`}</Text>
          <View style={styles.row}> 
            <Text style={!canAffordUnhealthy ? { opacity: 0.4 } : undefined}>Unhealthy</Text>
            <Switch value={mealHealthy} onValueChange={onToggleMeal} />
            <Text style={!canAffordHealthy ? { opacity: 0.4 } : undefined}>Healthy</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Tuition (Max {maxTuition})</Text>
        </View>
        <Text style={[styles.helper, { marginTop: 4 }]}>Max subjects depend on SES (Lower=0, Middle=1, Upper=2). Your cap: {maxTuition}.</Text>
        <View style={styles.tuitionRow}>
          {['Math', 'English', 'Science'].map((s) => (
            <TouchableOpacity key={s} onPress={() => toggleTuition(s)} style={[styles.tuitionPill, tuitionSelected.includes(s) && styles.tuitionPillActive, tuitionSelected.length >= maxTuition && !tuitionSelected.includes(s) && styles.tuitionPillDisabled]}>
              <Text style={[styles.tuitionText, tuitionSelected.includes(s) && styles.tuitionTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity disabled={!canConfirm} onPress={confirmYear} style={[styles.confirm, !canConfirm && styles.confirmDisabled]}>
        <Text style={styles.confirmText}>Confirm Year</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scroll: { flex: 1 },
  webScroll: { overflow: 'auto' },
  scrollContent: { paddingTop: 30, paddingHorizontal: 16, paddingBottom: 40 },
  navRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8, marginTop: 10, position: 'relative' },
  backBtn: { paddingVertical: 6, paddingHorizontal: 8, borderRadius: 8, backgroundColor: '#EAF2F8', position: 'absolute', left: 0 },
  backText: { color: '#4A90E2', fontWeight: '700' },
  
  title: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: 12, color: '#7F8C8D', textAlign: 'center', marginBottom: 12 },
  remaining: { textAlign: 'center', marginBottom: 8, color: '#7F8C8D', fontWeight: '700' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginTop: 12 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#34495E' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center' },
  helper: { color: '#7F8C8D', fontSize: 12 },
  tuitionRow: { flexDirection: 'row', marginTop: 8 },
  tuitionPill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: '#ECF0F1', marginRight: 8 },
  tuitionPillActive: { backgroundColor: '#4A90E2' },
  tuitionPillDisabled: { opacity: 0.4 },
  tuitionText: { color: '#7F8C8D', fontWeight: '700', fontSize: 12 },
  tuitionTextActive: { color: '#fff' },
  confirm: { backgroundColor: '#27AE60', paddingVertical: 14, borderRadius: 12, marginTop: 16 },
  confirmDisabled: { backgroundColor: '#A3E4D7' },
  confirmText: { color: '#fff', textAlign: 'center', fontWeight: '700', fontSize: 16 }
  ,ccaItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10, backgroundColor: '#F8F9F9', marginTop: 8 }
  ,ccaItemActive: { backgroundColor: '#EAF2F8' }
  ,ccaEmoji: { fontSize: 22, marginRight: 10 }
  ,ccaName: { fontSize: 14, fontWeight: '700', color: '#2C3E50' }
  ,ccaDesc: { fontSize: 12, color: '#7F8C8D' }
  ,dropdownToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0F3F4', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 }
  ,dropdownText: { fontSize: 14, color: '#2C3E50' }
  ,dropdownCaret: { fontSize: 12, color: '#7F8C8D' }
  ,dropdownMenu: { backgroundColor: '#fff', borderRadius: 8, marginTop: 6, paddingVertical: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }
  ,dropdownItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12 }
  ,dropdownItemText: { marginLeft: 8, fontSize: 14, color: '#2C3E50' }
  ,dropdownContainer: { marginTop: 8, position: 'relative' }
  ,infoWrap: { position: 'relative' }
  ,infoIcon: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#EAF2F8', color: '#4A90E2', textAlign: 'center', lineHeight: 20, fontWeight: '700' }
  ,tooltip: { position: 'absolute', top: 24, right: 0, maxWidth: 240, backgroundColor: '#2C3E50', padding: 8, borderRadius: 6 }
  ,tooltipText: { color: '#fff', fontSize: 12 }
  ,backdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
});

export default YearlyPlanning;


