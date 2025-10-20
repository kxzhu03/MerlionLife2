import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { SES_CONFIG } from '../data/constants';
import { GameState, Player, SESClass } from '../types';
import { GameService } from '../services/GameService';

type NavProp = StackNavigationProp<RootStackParamList, 'CharacterCreation'>;

interface Props {
  navigation: NavProp;
}

const AVATARS = ['👦','👧'];

const CharacterCreation: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [sesClass] = useState<SESClass>(() => {
    const options = [SESClass.LOWER, SESClass.MIDDLE, SESClass.UPPER];
    return options[Math.floor(Math.random() * options.length)];
  });

  const sesData = SES_CONFIG[sesClass];

  const canContinue = name.trim().length > 0;

  const handleStart = async () => {
    if (!canContinue) return;
    const randomizedSES = [SESClass.LOWER, SESClass.MIDDLE, SESClass.UPPER][Math.floor(Math.random() * 3)];
    const player = GameService.createNewPlayer(name.trim(), avatar, randomizedSES);
    const initialized: Player = { ...player };
    const gameState: GameState = {
      player: initialized,
      currentYear: 1,
      isGameComplete: false,
      gamePhase: 'primary'
    };
    await GameService.saveGameState(gameState);
    navigation.navigate('Game', { gameState });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Character</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Enter name" style={styles.input} />

        <Text style={styles.label}>Avatar</Text>
        <FlatList
          data={AVATARS}
          keyExtractor={(i) => i}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setAvatar(item)} style={[styles.avatarItem, avatar === item && styles.avatarSelected]}>
              <Text style={styles.avatarText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.avatarList}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.helper}>{sesData.parentsOccupations[0]}</Text>

        <TouchableOpacity disabled={!canContinue} onPress={handleStart} style={[styles.startBtn, !canContinue && styles.startBtnDisabled]}>
          <Text style={styles.startText}>Start Primary 1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 16, paddingTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50', marginVertical: 12, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#34495E', marginTop: 12 },
  input: { backgroundColor: '#F0F3F4', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginTop: 6 },
  avatarList: { marginTop: 8 },
  avatarItem: { backgroundColor: '#F0F3F4', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, marginRight: 8 },
  avatarSelected: { backgroundColor: '#D6EAF8' },
  avatarText: { fontSize: 24 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  link: { color: '#4A90E2', fontWeight: '600' },
  sesRow: { flexDirection: 'row', marginTop: 8 },
  sesPill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: '#ECF0F1', marginRight: 8 },
  sesPillActive: { backgroundColor: '#4A90E2' },
  sesText: { color: '#7F8C8D', fontWeight: '700', fontSize: 12 },
  sesTextActive: { color: '#fff' },
  helper: { color: '#7F8C8D', fontSize: 12, marginTop: 4 },
  ccaItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10, backgroundColor: '#F8F9F9', marginTop: 8 },
  ccaItemActive: { backgroundColor: '#EAF2F8' },
  ccaEmoji: { fontSize: 22, marginRight: 10 },
  ccaName: { fontSize: 14, fontWeight: '700', color: '#2C3E50' },
  ccaDesc: { fontSize: 12, color: '#7F8C8D' },
  startBtn: { backgroundColor: '#4A90E2', paddingVertical: 14, borderRadius: 10, marginTop: 16 },
  startBtnDisabled: { backgroundColor: '#A9CCE3' },
  startText: { color: '#fff', textAlign: 'center', fontWeight: '700', fontSize: 16 }
});

export default CharacterCreation;


