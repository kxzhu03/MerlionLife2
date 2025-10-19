import React, { useEffect, useRef, useState } from 'react';
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
  const scrollRef = useRef<ScrollView>(null);
  const [scrollY, setScrollY] = useState(0);

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
    const updatedState: GameState = { ...gameState, player: updatedPlayer };
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


  const scrollBy = (delta: number) => {
    const target = Math.max(0, scrollY + delta);
    scrollRef.current?.scrollTo({ y: target, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={[styles.scroll, styles.webScroll]}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
        overScrollMode="always"
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        <Text style={styles.header}>🎒 Primary School — Year {gameState.player.currentYear}</Text>
        <PlayerCard player={gameState.player} />
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primary} onPress={goPlanYear}>
            <Text style={styles.primaryText}>Plan This Year</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.fabContainer} pointerEvents="box-none">
        <TouchableOpacity style={styles.fabButton} onPress={() => scrollBy(-300)}>
          <Text style={styles.fabText}>↑</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fabButton, { marginTop: 8 }]} onPress={() => scrollBy(300)}>
          <Text style={styles.fabText}>↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scroll: { flex: 1 },
  webScroll: { overflow: 'auto' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  header: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginVertical: 8, textAlign: 'center' },
  actions: { marginTop: 16 },
  primary: { backgroundColor: '#4A90E2', paddingVertical: 14, borderRadius: 12 },
  primaryText: { color: '#fff', textAlign: 'center', fontWeight: '700', fontSize: 16 }
  ,fabContainer: { position: 'absolute', right: 16, bottom: 16, alignItems: 'center' }
  ,fabButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#4A90E2', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 }
  ,fabText: { color: '#fff', fontSize: 18, fontWeight: '700' }
});

export default GameScreen;


