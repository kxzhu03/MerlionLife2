import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState, Player, RandomEvent, SESClass } from '../types';
import { LifeStage } from '../types/lifestages';
import PlayerCard from '../components/PlayerCard';
import { GameService } from '../services/GameService';
import { RANDOM_EVENTS, SES_CONFIG } from '../data/constants';

type NavProp = StackNavigationProp<RootStackParamList, 'Game'>;
type RouteProps = RouteProp<RootStackParamList, 'Game'>;

interface Props { navigation: NavProp; route: RouteProps; }

const GameScreen: React.FC<Props> = ({ navigation, route }) => {
  const [gameState, setGameState] = useState<GameState>(route.params?.gameState);
  const [hasShownEventForYear, setHasShownEventForYear] = useState<boolean>(false);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [currentYearTracked, setCurrentYearTracked] = useState<number>(route.params?.gameState?.player.currentYear || 1);

  useEffect(() => {
    if (!gameState) {
      GameService.loadGameState().then((gs) => { if (gs) setGameState(gs); });
    }
  }, [gameState]);

  // Reset event gate when year changes
  const currentYear = gameState?.player.currentYear;
  useEffect(() => {
    if (currentYear !== undefined && currentYear !== currentYearTracked) {
      setCurrentYearTracked(currentYear);
      setHasShownEventForYear(false);
    }
  }, [currentYear, currentYearTracked]);

  // Show random event popup at the start of the year
  useEffect(() => {
    if (!gameState || hasShownEventForYear) return;
    // Gate by lastRandomEventYear to ensure once per year even after resume
    if (gameState.lastRandomEventYear === gameState.player.currentYear) {
      setHasShownEventForYear(true);
      return;
    }
    
    const event = GameService.applyRandomEvent(gameState.player);
    if (!event) {
      setHasShownEventForYear(true);
      return;
    }
    
    const eventData = RANDOM_EVENTS.find(e => e.id === event);
    const changes = GameService.getRandomEventEffects(event);
    let updatedPlayer = GameService.updatePlayerStats(gameState.player, changes);
    
    // Handle relationship changes
    updatedPlayer = GameService.updateRelationships(updatedPlayer, event);
    
    // Add event to history
    const eventHistory = [...(updatedPlayer.eventHistory || []), event];
    updatedPlayer = { ...updatedPlayer, eventHistory };
    
    // Handle special events
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
    
    // Check for achievements
    const beforeAchievements = updatedPlayer.achievements?.filter(a => a.unlocked).length || 0;
    updatedPlayer = GameService.checkAchievements(updatedPlayer);
    const afterAchievements = updatedPlayer.achievements?.filter(a => a.unlocked).length || 0;
    
    if (afterAchievements > beforeAchievements) {
      const newlyUnlocked = updatedPlayer.achievements
        ?.filter(a => a.unlocked && a.unlockedYear === gameState.player.currentYear)
        .map(a => a.name) || [];
      setNewAchievements(newlyUnlocked);
    }
    
    const updatedState: GameState = { 
      ...gameState, 
      player: updatedPlayer, 
      lastRandomEventYear: gameState.player.currentYear 
    };
    setGameState(updatedState);
    GameService.saveGameState(updatedState);
    setHasShownEventForYear(true);
    
    // Build change description
    const parts: string[] = [];
    if (typeof changes.wealth === 'number' && changes.wealth !== 0) 
      parts.push(`${changes.wealth > 0 ? '+' : ''}S$${changes.wealth} wealth`);
    if (typeof changes.happiness === 'number' && changes.happiness !== 0) 
      parts.push(`${changes.happiness > 0 ? '+' : ''}${changes.happiness} happiness`);
    if (typeof changes.health === 'number' && changes.health !== 0) 
      parts.push(`${changes.health > 0 ? '+' : ''}${changes.health} health`);
    if (typeof changes.socialImpact === 'number' && changes.socialImpact !== 0) 
      parts.push(`${changes.socialImpact > 0 ? '+' : ''}${changes.socialImpact} social`);
    if (typeof changes.academicSkill === 'number' && changes.academicSkill !== 0) 
      parts.push(`${changes.academicSkill > 0 ? '+' : ''}${changes.academicSkill} academic`);
    if (typeof changes.stress === 'number' && changes.stress !== 0) 
      parts.push(`${changes.stress > 0 ? '+' : ''}${changes.stress} stress`);
    if (typeof changes.reputation === 'number' && changes.reputation !== 0) 
      parts.push(`${changes.reputation > 0 ? '+' : ''}${changes.reputation} reputation`);
    
    const deltaText = parts.length ? `Changes: ${parts.join(', ')}` : 'Changes: none';
    const title = eventData ? eventData.name : 'Random Event';
    const desc = eventData ? eventData.description : event.replace(/_/g, ' ');
    
    Alert.alert(title, `${desc}\n\n${deltaText}`);
  }, [gameState, hasShownEventForYear, gameState?.player.currentYear]);

  // Show achievement notifications
  useEffect(() => {
    if (newAchievements.length > 0) {
      setTimeout(() => {
        Alert.alert(
          '🏆 Achievement Unlocked!',
          newAchievements.join('\n'),
          [{ text: 'Awesome!', onPress: () => setNewAchievements([]) }]
        );
      }, 1000);
    }
  }, [newAchievements]);

  if (!gameState) return null;

  const goPlanYear = () => {
    navigation.navigate('YearlyPlanning', { gameState });
  };

  const goToProfile = () => {
    navigation.navigate('Profile', { gameState });
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
        <View style={styles.headerRow}>
          {(() => {
            const lp = gameState.player.lifeStageProgress;
            let stageName = 'Primary School';
            let yearLabel = `Year ${gameState.player.currentYear}`;
            if (lp?.currentStage !== undefined) {
              switch (lp.currentStage) {
                case LifeStage.PRIMARY_SCHOOL:
                  stageName = 'Primary School';
                  yearLabel = `Year ${lp.stageYear || gameState.player.currentYear}`;
                  break;
                case LifeStage.SECONDARY_SCHOOL:
                  stageName = 'Secondary School';
                  yearLabel = `Year ${lp.stageYear || 1}`;
                  break;
                case LifeStage.POST_SECONDARY:
                  stageName = 'Post-Secondary';
                  yearLabel = `Year ${lp.stageYear || 1}`;
                  break;
                case LifeStage.EARLY_CAREER:
                  stageName = 'Career & Life';
                  yearLabel = `Year ${lp.stageYear || 1}`;
                  break;
              }
            }
            return (
              <Text style={styles.header}>🎒 {stageName} — {yearLabel}</Text>
            );
          })()}
          <TouchableOpacity onPress={goToProfile} style={styles.profileBtn}>
            <Text style={styles.profileBtnText}>📋</Text>
          </TouchableOpacity>
        </View>
        
        <PlayerCard player={gameState.player} />
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Life Tips</Text>
          <Text style={styles.infoText}>
            • Balance your activities to maintain happiness and health{'\n'}
            • Build relationships through social activities{'\n'}
            • Manage stress by not overworking yourself{'\n'}
            • Save money for future opportunities
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primary} onPress={goPlanYear}>
            <Text style={styles.primaryText}>Plan This Year</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scroll: { flex: 1 },
  webScroll: { overflow: 'visible' },
  scrollContent: { paddingTop: 30, paddingHorizontal: 16, paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  header: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2C3E50', 
    flex: 1
  },
  profileBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  profileBtnText: {
    fontSize: 20
  },
  infoCard: {
    backgroundColor: '#E8F5E9',
    padding: 14,
    borderRadius: 10,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50'
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 6
  },
  infoText: {
    fontSize: 12,
    color: '#5D6D7E',
    lineHeight: 18
  },
  actions: { marginTop: 16 },
  primary: { 
    backgroundColor: '#4A90E2', 
    paddingVertical: 16, 
    borderRadius: 12,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  primaryText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: '700', 
    fontSize: 16 
  }
});

export default GameScreen;

