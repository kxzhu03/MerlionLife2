import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { SES_CONFIG, PERSONALITY_TRAITS } from '../data/constants';
import { GameState, Player, SESClass, PersonalityTrait } from '../types';
import { AvatarCustomization, getAvatarDisplayString } from '../types/avatar';
import { GameService } from '../services/GameService';
import AvatarBuilder from './AvatarBuilder';

type NavProp = StackNavigationProp<RootStackParamList, 'CharacterCreation'>;

interface Props {
  navigation: NavProp;
}

const CharacterCreation: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState<'avatar' | 'details'>('avatar');
  const [name, setName] = useState('');
  const [avatarCustomization, setAvatarCustomization] = useState<AvatarCustomization | null>(null);
  const [selectedTraits, setSelectedTraits] = useState<PersonalityTrait[]>([]);
  const [sesClass] = useState<SESClass>(() => {
    const options = [SESClass.LOWER, SESClass.MIDDLE, SESClass.UPPER];
    return options[Math.floor(Math.random() * options.length)];
  });

  const canContinue = name.trim().length > 0 && selectedTraits.length === 2 && avatarCustomization !== null;

  const toggleTrait = (trait: PersonalityTrait) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait));
    } else if (selectedTraits.length < 2) {
      setSelectedTraits([...selectedTraits, trait]);
    }
  };

  const handleAvatarComplete = (customization: AvatarCustomization) => {
    setAvatarCustomization(customization);
    setStep('details');
  };

  const handleStart = async () => {
    if (!canContinue || !avatarCustomization) return;
    const randomizedSES = [SESClass.LOWER, SESClass.MIDDLE, SESClass.UPPER][Math.floor(Math.random() * 3)];
    const player = GameService.createNewPlayer(
      name.trim(), 
      getAvatarDisplayString(avatarCustomization), 
      randomizedSES, 
      selectedTraits,
      avatarCustomization
    );
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

  if (step === 'avatar') {
    return <AvatarBuilder navigation={navigation} onComplete={handleAvatarComplete} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setStep('avatar')} style={styles.backButton}>
          <Text style={styles.backText}>← Change Avatar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Character Details</Text>
        <Text style={styles.subtitle}>Complete your character profile</Text>
      </View>
      
      <View style={styles.card}>
        {/* Avatar Preview */}
        {avatarCustomization && (
          <View style={styles.avatarPreview}>
            <Text style={styles.avatarEmoji}>{getAvatarDisplayString(avatarCustomization)}</Text>
            <Text style={styles.avatarLabel}>Your Avatar</Text>
          </View>
        )}

        {/* Name Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Name</Text>
          <TextInput 
            value={name} 
            onChangeText={setName} 
            placeholder="Enter your name" 
            style={styles.input}
            placeholderTextColor="#BDC3C7"
          />
        </View>

        {/* Personality Traits */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Personality Traits (Choose 2)</Text>
          <Text style={styles.helper}>These traits will shape your life journey and opportunities</Text>
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
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>🎲 Game Information</Text>
          <Text style={styles.infoText}>
            • Your socioeconomic background will be randomly assigned{'\n'}
            • You'll experience a full Singaporean life from Primary 1 to retirement{'\n'}
            • Your choices and traits will shape your unique story{'\n'}
            • Build relationships, achieve goals, and navigate life's challenges
          </Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity 
          disabled={!canContinue} 
          onPress={handleStart} 
          style={[styles.startBtn, !canContinue && styles.startBtnDisabled]}
        >
          <Text style={styles.startText}>Begin Your Life Journey</Text>
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
    paddingBottom: 40
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  backButton: {
    marginBottom: 12
  },
  backText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '600'
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#2C3E50', 
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D'
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  avatarPreview: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12
  },
  avatarEmoji: {
    fontSize: 64,
    marginBottom: 8
  },
  avatarLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600'
  },
  inputSection: {
    marginBottom: 24
  },
  label: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#2C3E50', 
    marginBottom: 8
  },
  input: { 
    backgroundColor: '#F8F9FA', 
    borderRadius: 10, 
    paddingHorizontal: 16, 
    paddingVertical: 14,
    fontSize: 16,
    color: '#2C3E50',
    borderWidth: 2,
    borderColor: '#E0E0E0'
  },
  helper: {
    fontSize: 13,
    color: '#95A5A6',
    marginBottom: 12,
    lineHeight: 18
  },
  traitsContainer: {
    gap: 10
  },
  traitPill: {
    backgroundColor: '#F8F9FA',
    padding: 14,
    borderRadius: 12,
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
    fontSize: 15,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4
  },
  traitTextSelected: {
    color: '#4A90E2'
  },
  traitDesc: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18
  },
  traitDescSelected: {
    color: '#5A9FE2'
  },
  infoBox: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50'
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8
  },
  infoText: {
    fontSize: 13,
    color: '#5D6D7E',
    lineHeight: 20
  },
  startBtn: { 
    backgroundColor: '#4A90E2', 
    paddingVertical: 18, 
    borderRadius: 12,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8
  },
  startBtnDisabled: { 
    backgroundColor: '#BDC3C7',
    shadowOpacity: 0
  },
  startText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: '700', 
    fontSize: 18 
  }
});

export default CharacterCreation;

