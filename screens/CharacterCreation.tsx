import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { CCA_OPTIONS, SES_CONFIG } from '../data/constants';
import { CCAOption, GameState, MealChoice, Player, SESClass } from '../types';
import { GameService } from '../services/GameService';

type NavProp = StackNavigationProp<RootStackParamList, 'CharacterCreation'>;

interface Props {
  navigation: NavProp;
}

const AVATARS = ['😀','😎','🤓','🥳','🧑‍🦱','🧒','👧','🧑‍🎓'];

const CharacterCreation: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [sesClass, setSesClass] = useState<SESClass>(() => {
    const options = [SESClass.LOWER, SESClass.MIDDLE, SESClass.UPPER];
    return options[Math.floor(Math.random() * options.length)];
  });
  const [selectedCCA, setSelectedCCA] = useState<CCAOption | null>(null);

  const sesData = SES_CONFIG[sesClass];

  const canContinue = name.trim().length > 0 && !!selectedCCA;

  const handleRandomizeSES = () => {
    const options = [SESClass.LOWER, SESClass.MIDDLE, SESClass.UPPER];
    setSesClass(options[Math.floor(Math.random() * options.length)]);
  };

  const handleStart = async () => {
    if (!canContinue || !selectedCCA) return;
    const player = GameService.createNewPlayer(name.trim(), avatar, sesClass);
    const initialized: Player = { ...player, cca: selectedCCA };
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

        <View style={styles.rowBetween}>
          <Text style={styles.label}>SES Class</Text>
          <TouchableOpacity onPress={handleRandomizeSES}><Text style={styles.link}>randomize</Text></TouchableOpacity>
        </View>
        <View style={styles.sesRow}>
          {[SESClass.LOWER, SESClass.MIDDLE, SESClass.UPPER].map((c) => (
            <TouchableOpacity key={c} onPress={() => setSesClass(c)} style={[styles.sesPill, sesClass === c && styles.sesPillActive]}>
              <Text style={[styles.sesText, sesClass === c && styles.sesTextActive]}>{c.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.helper}>{sesData.parentsOccupation}</Text>

        <Text style={styles.label}>Choose CCA</Text>
        <View>
          {CCA_OPTIONS.map((cca) => (
            <TouchableOpacity key={cca.id} style={[styles.ccaItem, selectedCCA === cca.id && styles.ccaItemActive]} onPress={() => setSelectedCCA(cca.id)}>
              <Text style={styles.ccaEmoji}>{cca.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.ccaName}>{cca.name}</Text>
                <Text style={styles.ccaDesc}>{cca.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity disabled={!canContinue} onPress={handleStart} style={[styles.startBtn, !canContinue && styles.startBtnDisabled]}>
          <Text style={styles.startText}>Start Primary 1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 16 },
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


