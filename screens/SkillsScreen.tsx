import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState } from '../types';
import StatBar from '../components/StatBar';

type NavProp = StackNavigationProp<RootStackParamList, 'Skills'>;
type RouteProps = RouteProp<RootStackParamList, 'Skills'>;

interface Props { navigation: NavProp; route: RouteProps; }

const SkillsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { player } = route.params.gameState;
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Skills</Text>
      <StatBar label="Academic" value={player.stats.academicSkill} maxValue={100} color="#2196F3" icon="📚" />
      {player.cca && (
        <StatBar label={String(player.cca)} value={player.ccaSkill} maxValue={100} color="#00BCD4" icon="🎯" />
      )}
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  content: { paddingTop: 30, paddingHorizontal: 16, paddingBottom: 24 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50', marginBottom: 12, textAlign: 'center' },
  back: { marginTop: 16, backgroundColor: '#4A90E2', paddingVertical: 12, borderRadius: 10 },
  backText: { color: '#fff', textAlign: 'center', fontWeight: '700' }
});

export default SkillsScreen;


