import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { GameService } from '../services/GameService';
import { GameState } from '../types';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const [hasExistingGame, setHasExistingGame] = useState(false);

  useEffect(() => {
    checkExistingGame();
  }, []);

  const checkExistingGame = async () => {
    const gameState = await GameService.loadGameState();
    setHasExistingGame(gameState !== null);
  };

  const handleNewGame = async () => {
    await GameService.clearGameState();
    navigation.navigate('CharacterCreation');
  };

  const handleContinue = async () => {
    const gameState = await GameService.loadGameState();
    if (gameState) {
      navigation.navigate('Game', { gameState });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🦁</Text>
        <Text style={styles.title}>Merlion Life</Text>
        <Text style={styles.subtitle}>
          Experience a full Singaporean life cycle
        </Text>
        <Text style={styles.description}>
          Make choices that affect your happiness, wealth, health, and social impact
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleNewGame}>
            <Text style={styles.primaryButtonText}>New Game</Text>
          </TouchableOpacity>

          {hasExistingGame && (
            <TouchableOpacity style={styles.secondaryButton} onPress={handleContinue}>
              <Text style={styles.secondaryButtonText}>Continue Game</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>🎒 Stage 1: Primary School</Text>
          <Text style={styles.infoText}>Ages 7-12 | Learn balance, opportunity, and consequences</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>A Singaporean Life Simulation Game</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#95A5A6',
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  secondaryButtonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoBox: {
    marginTop: 32,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#BDC3C7',
  },
});

export default WelcomeScreen;

