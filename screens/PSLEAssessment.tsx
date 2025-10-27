import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameService } from '../services/GameService';
import { GameState, PSLEStream } from '../types';

type NavProp = StackNavigationProp<RootStackParamList, 'PSLEAssessment'>;
type RouteProps = RouteProp<RootStackParamList, 'PSLEAssessment'>;

interface Props { navigation: NavProp; route: RouteProps; }

const streamName = (s: PSLEStream) => {
  switch (s) {
    case PSLEStream.INTEGRATED_PROGRAMME: return 'Integrated Programme (IP)';
    case PSLEStream.EXPRESS: return 'Express';
    case PSLEStream.NORMAL_ACADEMIC: return 'Normal (Acad.)';
    case PSLEStream.NORMAL_TECHNICAL: return 'Normal (Tech.)';
    default: return '';
  }
};

const PSLEAssessment: React.FC<Props> = ({ navigation, route }) => {
  const [gameState, setGameState] = useState<GameState>(route.params.gameState);
  const { player } = gameState;
  const stream = GameService.calculatePSLEStream(player.stats.academicSkill, player.ccaSkill);
  const special = GameService.checkSpecialProgramEligibility(player.ccaSkill);

  const continueToSecondary = async () => {
    // Update player with PSLE stream
    const updatedPlayer = { ...player, psleStream: stream };
    // Check achievements (Scholar achievement)
    const finalPlayer = GameService.checkAchievements(updatedPlayer);
    const next: GameState = { ...gameState, player: finalPlayer, gamePhase: 'secondary' };
    await GameService.saveGameState(next);
    // For now, end here with a simple loop back to Welcome or Game
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PSLE Results</Text>
      <View style={styles.card}>
        <Text style={styles.row}>Academic Skill: {Math.round(player.stats.academicSkill)}</Text>
        <Text style={styles.row}>Top Skill ({player.cca || 'None'}): {Math.round(player.ccaSkill)}</Text>
        <Text style={styles.row}>Ending Wealth: S${Math.round(player.stats.wealth)}</Text>
        <Text style={styles.row}>Health: {Math.round(player.stats.health)} | Happiness: {Math.round(player.stats.happiness)}</Text>
        <Text style={styles.stream}>Stream Placement: {streamName(stream)}</Text>
        {special && <Text style={styles.special}>Specialized Track Offer based on Skill!</Text>}
      </View>
      <TouchableOpacity onPress={continueToSecondary} style={styles.primary}>
        <Text style={styles.primaryText}>Continue to Secondary School</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 16, paddingTop: 30 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', textAlign: 'center', marginVertical: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  row: { fontSize: 14, color: '#34495E', marginBottom: 6 },
  stream: { marginTop: 8, fontSize: 16, fontWeight: '800', color: '#2C3E50' },
  special: { marginTop: 4, color: '#27AE60', fontWeight: '700' },
  primary: { backgroundColor: '#4A90E2', paddingVertical: 14, borderRadius: 12, marginTop: 16 },
  primaryText: { color: '#fff', textAlign: 'center', fontWeight: '700', fontSize: 16 }
});

export default PSLEAssessment;


