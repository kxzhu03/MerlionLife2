import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState, Player, RandomEvent } from '../types';
import PlayerCard from '../components/PlayerCard';
import { GameService } from '../services/GameService';

type NavProp = StackNavigationProp<RootStackParamList, 'Game'>;
type RouteProps = RouteProp<RootStackParamList, 'Game'>;

interface Props { navigation: NavProp; route: RouteProps; }

const GameScreen: React.FC<Props> = ({ navigation, route }) => {
  const [gameState, setGameState] = useState<GameState>(route.params?.gameState);

  useEffect(() => {
    if (!gameState) {
      GameService.loadGameState().then((gs) => { if (gs) setGameState(gs); });
    }
  }, [gameState]);

  if (!gameState) return null;

  const goPlanYear = () => {
    navigation.navigate('YearlyPlanning', { gameState });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎒 Primary School — Year {gameState.player.currentYear}</Text>
      <PlayerCard player={gameState.player} />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.primary} onPress={goPlanYear}>
          <Text style={styles.primaryText}>Plan This Year</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginVertical: 8, textAlign: 'center' },
  actions: { marginTop: 16 },
  primary: { backgroundColor: '#4A90E2', paddingVertical: 14, borderRadius: 12 },
  primaryText: { color: '#fff', textAlign: 'center', fontWeight: '700', fontSize: 16 }
});

export default GameScreen;


