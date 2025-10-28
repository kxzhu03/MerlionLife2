import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState } from '../types';
import { ChoiceEvent, ChoiceOption } from '../types/choiceEvents';
import { GameService } from '../services/GameService';

type NavProp = StackNavigationProp<RootStackParamList, 'ChoiceEvent'>;
type RouteProps = RouteProp<RootStackParamList, 'ChoiceEvent'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const ChoiceEventScreen: React.FC<Props> = ({ navigation, route }) => {
  const { gameState, event, returnScreen } = route.params;
  const [selectedOption, setSelectedOption] = useState<ChoiceOption | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (option: ChoiceOption) => {
    setSelectedOption(option);
  };

  const handleConfirm = async () => {
    if (!selectedOption) {
      Alert.alert('No Choice', 'Please select an option before continuing.');
      return;
    }

    setShowResult(true);
  };

  const handleContinue = async () => {
    if (!selectedOption) return;

    // Apply stat changes
    const updatedPlayer = GameService.updatePlayerStats(gameState.player, selectedOption.statChanges);
    
    const updatedGameState: GameState = {
      ...gameState,
      player: updatedPlayer
    };

    await GameService.saveGameState(updatedGameState);

    // Navigate back to the appropriate screen
    navigation.navigate(returnScreen as any, { gameState: updatedGameState });
  };

  if (showResult && selectedOption) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultEmoji}>{selectedOption.emoji}</Text>
            <Text style={styles.resultTitle}>Result</Text>
            <Text style={styles.resultDescription}>{selectedOption.description}</Text>

            <View style={styles.statsContainer}>
              <Text style={styles.statsTitle}>Stat Changes:</Text>
              {Object.entries(selectedOption.statChanges).map(([stat, value]) => {
                if (value === 0 || value === undefined) return null;
                const isPositive = value > 0;
                return (
                  <View key={stat} style={styles.statRow}>
                    <Text style={styles.statName}>{stat}:</Text>
                    <Text style={[styles.statValue, isPositive ? styles.positive : styles.negative]}>
                      {isPositive ? '+' : ''}{value}
                    </Text>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Event Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>{event.emoji}</Text>
          <Text style={styles.title}>{event.title}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{event.category.toUpperCase()}</Text>
          </View>
        </View>

        {/* Event Description */}
        <View style={styles.descriptionCard}>
          <Text style={styles.description}>{event.description}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>What do you do?</Text>
          {event.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedOption?.id === option.id && styles.optionCardSelected
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <View style={styles.optionHeader}>
                <Text style={styles.optionEmoji}>{option.emoji}</Text>
                <Text style={styles.optionText}>{option.text}</Text>
              </View>
              
              {selectedOption?.id === option.id && (
                <View style={styles.optionSelected}>
                  <Text style={styles.selectedText}>✓ Selected</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Confirm Button */}
        {selectedOption && (
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirm Choice</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  descriptionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionCardSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#EBF8FF',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
  },
  optionSelected: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#4A90E2',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A90E2',
  },
  positive: {
    color: '#48BB78',
    fontWeight: '700',
  },
  negative: {
    color: '#F56565',
    fontWeight: '700',
  },
  confirmButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  resultContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  resultEmoji: {
    fontSize: 100,
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 16,
  },
  resultDescription: {
    fontSize: 18,
    color: '#2D3748',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    width: '100%',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 16,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  statName: {
    fontSize: 16,
    color: '#4A5568',
    textTransform: 'capitalize',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  continueButton: {
    backgroundColor: '#48BB78',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 12,
    shadowColor: '#48BB78',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ChoiceEventScreen;
