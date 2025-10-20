import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState, Player, RandomEvent, SESClass } from '../types';
import PlayerCard from '../components/PlayerCard';
import { GameService } from '../services/GameService';
import { RANDOM_EVENTS, SES_CONFIG } from '../data/constants';

type NavProp = StackNavigationProp<RootStackParamList, 'Game'>;
type RouteProps = RouteProp<RootStackParamList, 'Game'>;

interface Props { navigation: NavProp; route: RouteProps; }

const GameScreen: React.FC<Props> = ({ navigation, route }) => {
  const [gameState, setGameState] = useState<GameState>(route.params?.gameState);
  const [hasShownEventForYear, setHasShownEventForYear] = useState<boolean>(false);
  

  useEffect(() => {
    if (!gameState) {
      GameService.loadGameState().then((gs) => { if (gs) setGameState(gs); });
    }
  }, [gameState]);

  // Reset event gate when year changes
  useEffect(() => {
    if (gameState) {
      setHasShownEventForYear(false);
    }
  }, [gameState?.player.currentYear]);

  // Show random event popup at the start of the year
  useEffect(() => {
    if (!gameState || hasShownEventForYear) return;
    // Gate by lastRandomEventYear to ensure once per year even after resume
    if (gameState.lastRandomEventYear === gameState.player.currentYear) {
      setHasShownEventForYear(true);
      return;
    }
    const event = GameService.applyRandomEvent();
    if (!event) {
      setHasShownEventForYear(true);
      return;
    }
    const eventData = RANDOM_EVENTS.find(e => e.id === event);
    const changes = GameService.getRandomEventEffects(event);
    let updatedPlayer = GameService.updatePlayerStats(gameState.player, changes);
    if (event === RandomEvent.PARENTS_DIVORCE) {
      const order: SESClass[] = [SESClass.UPPER, SESClass.MIDDLE, SESClass.LOWER];
      const idx = order.indexOf(updatedPlayer.sesClass);
      const newIdx = Math.min(idx + 1, order.length - 1);
      const newSES = order[newIdx];
      if (newSES !== updatedPlayer.sesClass) {
        const occs = SES_CONFIG[newSES].parentsOccupations;
        updatedPlayer = {
          ...updatedPlayer,
          sesClass: newSES,
          parentsOccupation: occs[Math.floor(Math.random() * occs.length)]
        };
      }
    }
    const updatedState: GameState = { ...gameState, player: updatedPlayer, lastRandomEventYear: gameState.player.currentYear };
    setGameState(updatedState);
    GameService.saveGameState(updatedState);
    setHasShownEventForYear(true);
    const parts: string[] = [];
    if (typeof changes.wealth === 'number' && changes.wealth !== 0) parts.push(`${changes.wealth > 0 ? '+' : ''}S$${changes.wealth} wealth`);
    if (typeof changes.happiness === 'number' && changes.happiness !== 0) parts.push(`${changes.happiness > 0 ? '+' : ''}${changes.happiness} happiness`);
    if (typeof changes.health === 'number' && changes.health !== 0) parts.push(`${changes.health > 0 ? '+' : ''}${changes.health} health`);
    if (typeof changes.socialImpact === 'number' && changes.socialImpact !== 0) parts.push(`${changes.socialImpact > 0 ? '+' : ''}${changes.socialImpact} social`);
    if (typeof changes.academicSkill === 'number' && changes.academicSkill !== 0) parts.push(`${changes.academicSkill > 0 ? '+' : ''}${changes.academicSkill} academic`);
    const deltaText = parts.length ? `Changes: ${parts.join(', ')}` : 'Changes: none';
    const title = eventData ? eventData.name : 'Random Event';
    const desc = eventData ? eventData.description : event.replace(/_/g, ' ');
    Alert.alert(title, `${desc}\n\n${deltaText}`);
  }, [gameState, hasShownEventForYear]);

  if (!gameState) return null;

  const goPlanYear = () => {
    navigation.navigate('YearlyPlanning', { gameState });
  };


  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.scroll, styles.webScroll]}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
        overScrollMode="always"
      >
        <View style={styles.topQuarter}>
          <Text style={styles.headerName}>{gameState.player.name}</Text>
          <Text style={styles.headerMeta}>Primary {gameState.player.grade} • {gameState.player.parentsOccupation}</Text>
          <Text style={styles.headerMeta}>{gameState.player.sesClass.toUpperCase()} CLASS • Allowance S${gameState.player.dailyAllowance}/day</Text>
        </View>
        <View style={styles.bottomQuarter}>
          <View style={styles.rowStats}>
            <View style={styles.statCell}><Text>💰</Text><Text style={styles.statValue}>S${gameState.player.stats.wealth}</Text></View>
            <View style={styles.statCell}><Text>😊</Text><Text style={styles.statValue}>{gameState.player.stats.happiness}</Text></View>
            <View style={styles.statCell}><Text>❤️</Text><Text style={styles.statValue}>{gameState.player.stats.health}</Text></View>
            <View style={styles.statCell}><Text>🤝</Text><Text style={styles.statValue}>{gameState.player.stats.socialImpact}</Text></View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.primary, { marginRight: 8 }]} onPress={goPlanYear}>
              <Text style={styles.primaryText}>Plan This Year</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secondary]} onPress={() => navigation.navigate('Skills', { gameState })}>
              <Text style={styles.secondaryText}>View Skills</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scroll: { flex: 1 },
  webScroll: { overflow: 'auto' },
  scrollContent: { paddingTop: 30, paddingHorizontal: 16, paddingBottom: 40 },
  header: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginVertical: 8, textAlign: 'center' },
  actions: { marginTop: 16 },
  primary: { backgroundColor: '#4A90E2', paddingVertical: 14, borderRadius: 12 },
  primaryText: { color: '#fff', textAlign: 'center', fontWeight: '700', fontSize: 16 }
  ,topQuarter: { minHeight: 180, justifyContent: 'center', alignItems: 'center' }
  ,headerName: { fontSize: 24, fontWeight: '800', color: '#2C3E50' }
  ,headerMeta: { fontSize: 12, color: '#7F8C8D', marginTop: 4 }
  ,bottomQuarter: { marginTop: 24 }
  ,rowStats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }
  ,statCell: { backgroundColor: '#fff', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, flex: 1, marginHorizontal: 4, alignItems: 'center' }
  ,statValue: { marginTop: 4, fontWeight: '700', color: '#2C3E50' }
  ,secondary: { backgroundColor: '#FFFFFF', paddingVertical: 14, borderRadius: 12, borderWidth: 2, borderColor: '#4A90E2' }
  ,secondaryText: { color: '#4A90E2', textAlign: 'center', fontWeight: '700', fontSize: 16 }
});

export default GameScreen;


