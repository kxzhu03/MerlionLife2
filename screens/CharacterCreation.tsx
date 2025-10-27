import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { SES_CONFIG, PERSONALITY_TRAITS } from '../data/constants';
import { GameState, Player, SESClass, PersonalityTrait } from '../types';
import { GameService } from '../services/GameService';

type NavProp = StackNavigationProp<RootStackParamList, 'CharacterCreation'>;

interface Props {
  navigation: NavProp;
}

const BOY_AVATARS = ['👦','👦🏻','👦🏼','👦🏽','👦🏾'];
const GIRL_AVATARS = ['👧','👧🏻','👧🏼','👧🏽','👧🏾'];

const CharacterCreation: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(BOY_AVATARS[0]);
  const [selectedTraits, setSelectedTraits] = useState<PersonalityTrait[]>([]);
  const [sesClass] = useState<SESClass>(() => {
    const options = [SESClass.LOWER, SESClass.MIDDLE, SESClass.UPPER];
    return options[Math.floor(Math.random() * options.length)];
  });

  const sesData = SES_CONFIG[sesClass];

  const canContinue = name.trim().length > 0 && selectedTraits.length === 2;

  const toggleTrait = (trait: PersonalityTrait) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait));
    } else if (selectedTraits.length < 2) {
      setSelectedTraits([...selectedTraits, trait]);
    }
  };

  const handleStart = async () => {
    if (!canContinue) return;
    const randomizedSES = [SESClass.LOWER, SESClass.MIDDLE, SESClass.UPPER][Math.floor(Math.random() * 3)];
    const player = GameService.createNewPlayer(name.trim(), avatar, randomizedSES, selectedTraits);
    const initialized: Player = { ...player };
    const gameState: GameState = {
      player: initialized,
      currentYear: 1,
      isGameComplete: false,
      gamePhase: 'primary',
      yearlyReports: []
    };
    await GameService.saveGameState(gameState);
    navigation.navigate('Game', { gameState });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Create Your Character</Text>
      <Text style={styles.subtitle}>Begin your Singaporean life journey</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput 
          value={name} 
          onChangeText={setName} 
          placeholder="Enter your name" 
          style={styles.input}
          placeholderTextColor="#BDC3C7"
        />

        <Text style={styles.label}>Avatar</Text>
        <View style={styles.avatarList}>
          <View style={styles.avatarRow}>
            {BOY_AVATARS.map((item) => (
              <TouchableOpacity 
                key={item} 
                onPress={() => setAvatar(item)} 
                style={[styles.avatarItem, avatar === item && styles.avatarSelected]}
              >
                <Text style={styles.avatarText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.avatarRow}>
            {GIRL_AVATARS.map((item) => (
              <TouchableOpacity 
                key={item} 
                onPress={() => setAvatar(item)} 
                style={[styles.avatarItem, avatar === item && styles.avatarSelected]}
              >
                <Text style={styles.avatarText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.label}>Personality Traits (Choose 2)</Text>
        <Text style={styles.helper}>These traits will affect your journey and available opportunities</Text>
        <View style={styles.traitsContainer}>
          {PERSONALITY_TRAITS.map((trait) => (
            <TouchableOpacity
              key={trait.id}
              onPress={() => toggleTrait(trait.id)}
              style={[
                styles.traitPill,
                selectedTraits.includes(trait.id) && styles.traitPillSelected,
                selectedTraits.length >= 2 && !selectedTraits.includes(trait.id) && styles.traitPillDisabled
              ]}
            >
              <Text style={[
                styles.traitText,
                selectedTraits.includes(trait.id) && styles.traitTextSelected
              ]}>
                {trait.name}
              </Text>
              <Text style={[
                styles.traitDesc,
                selectedTraits.includes(trait.id) && styles.traitDescSelected
              ]}>
                {trait.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            🎲 Your socioeconomic background will be randomly assigned
          </Text>
          <Text style={styles.infoText}>
            📚 You'll start Primary 1 at age 7
          </Text>
        </View>

        <TouchableOpacity 
          disabled={!canContinue} 
          onPress={handleStart} 
          style={[styles.startBtn, !canContinue && styles.startBtnDisabled]}
        >
          <Text style={styles.startText}>Start Primary 1</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F7FA'
  },
  scrollContent: {
    padding: 16, 
    paddingTop: 30
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#2C3E50', 
    marginBottom: 4, 
    textAlign: 'center' 
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 16
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#34495E', 
    marginTop: 16,
    marginBottom: 8
  },
  input: { 
    backgroundColor: '#F0F3F4', 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    paddingVertical: 12,
    fontSize: 14,
    color: '#2C3E50'
  },
  helper: {
    fontSize: 12,
    color: '#95A5A6',
    marginBottom: 8
  },
  avatarList: { 
    marginTop: 4 
  },
  avatarRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: 8 
  },
  avatarItem: { 
    backgroundColor: '#F0F3F4', 
    paddingHorizontal: 14, 
    paddingVertical: 10, 
    borderRadius: 10, 
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  avatarSelected: { 
    backgroundColor: '#E3F2FD',
    borderColor: '#4A90E2'
  },
  avatarText: { 
    fontSize: 28 
  },
  traitsContainer: {
    marginTop: 4
  },
  traitPill: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0'
  },
  traitPillSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#4A90E2'
  },
  traitPillDisabled: {
    opacity: 0.4
  },
  traitText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 2
  },
  traitTextSelected: {
    color: '#4A90E2'
  },
  traitDesc: {
    fontSize: 12,
    color: '#7F8C8D'
  },
  traitDescSelected: {
    color: '#5A9FE2'
  },
  infoBox: {
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12'
  },
  infoText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 4
  },
  startBtn: { 
    backgroundColor: '#4A90E2', 
    paddingVertical: 16, 
    borderRadius: 10, 
    marginTop: 20,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  startBtnDisabled: { 
    backgroundColor: '#BDC3C7',
    shadowOpacity: 0
  },
  startText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: '700', 
    fontSize: 16 
  }
});

export default CharacterCreation;

