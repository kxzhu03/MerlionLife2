import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { GameService } from '../services/GameService';
import { GameState, Player, SESClass, PSLEStream, PersonalityTrait } from '../types';
import { LifeStage } from '../types/lifestages';
import { Gender } from '../types/avatar';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const [hasExistingGame, setHasExistingGame] = useState(false);
  const [showDebugMenu, setShowDebugMenu] = useState(false);
  const [debugTapCount, setDebugTapCount] = useState(0);

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

  const handleLogoTap = () => {
    setDebugTapCount(prev => prev + 1);
    if (debugTapCount + 1 >= 5) {
      setShowDebugMenu(true);
      setDebugTapCount(0);
    }
  };

  const createDebugPlayer = (stage: LifeStage, age: number): Player => {
    const randomSES = [SESClass.LOWER, SESClass.MIDDLE, SESClass.UPPER][Math.floor(Math.random() * 3)];
    const randomGender = Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE;
    
    const basePlayer: Player = {
      id: `debug_${Date.now()}`,
      name: 'Debug Player',
      avatar: '👤',
      avatarCustomization: {
        gender: randomGender,
        skinTone: 'medium',
        hairStyle: 'short',
        hairColor: 'black',
        outfit: 'casual'
      },
      age,
      grade: age - 6,
      sesClass: randomSES,
      stats: {
        happiness: 60 + Math.floor(Math.random() * 30),
        health: 70 + Math.floor(Math.random() * 20),
        wealth: 5000 + Math.floor(Math.random() * 20000),
        socialImpact: 40 + Math.floor(Math.random() * 40),
        academicSkill: 50 + Math.floor(Math.random() * 40),
        stress: 20 + Math.floor(Math.random() * 30),
        reputation: 40 + Math.floor(Math.random() * 40),
        workExperience: stage === LifeStage.CAREER ? 50 + Math.floor(Math.random() * 40) : 0,
        leadership: 30 + Math.floor(Math.random() * 50)
      },
      cca: null,
      ccaSkill: 40 + Math.floor(Math.random() * 40),
      parentsOccupation: 'Engineer',
      dailyAllowance: randomSES === SESClass.UPPER ? 15 : randomSES === SESClass.MIDDLE ? 8 : 4,
      mealChoice: 'healthy' as any,
      tuitionSubjects: [],
      currentYear: 1,
      psleStream: PSLEStream.EXPRESS,
      personalityTraits: [PersonalityTrait.AMBITIOUS, PersonalityTrait.OUTGOING],
      relationships: [],
      achievements: [],
      eventHistory: [],
      lifeStageProgress: {
        currentStage: stage,
        stageYear: 1,
        totalYears: 0
      }
    };

    // Add stage-specific data
    if (stage === LifeStage.SECONDARY_SCHOOL) {
      basePlayer.secondarySchoolData = {
        stream: 'express' as any,
        yearStarted: 2020,
        oLevelScore: undefined,
        nLevelScore: undefined
      };
    }

    if (stage === LifeStage.CAREER) {
      basePlayer.careerData = {
        currentJob: 'Software Engineer',
        salary: 60000 + Math.floor(Math.random() * 80000),
        yearsInCareer: 1,
        careerPath: 'technology' as any,
        promotions: 0
      };
    }

    return basePlayer;
  };

  const skipToPhase = async (stage: LifeStage, screenName: keyof RootStackParamList, age: number) => {
    const player = createDebugPlayer(stage, age);
    const gameState: GameState = {
      player,
      currentYear: 1,
      isGameComplete: false,
      gamePhase: stage === LifeStage.PRIMARY_SCHOOL ? 'primary' : 
                  stage === LifeStage.SECONDARY_SCHOOL ? 'secondary' :
                  stage === LifeStage.POST_SECONDARY ? 'post_secondary' :
                  stage === LifeStage.CAREER ? 'career' : 'primary'
    };

    await GameService.saveGameState(gameState);
    setShowDebugMenu(false);
    navigation.navigate(screenName, { gameState } as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <TouchableOpacity onPress={handleLogoTap} activeOpacity={0.9}>
            <Text style={styles.emoji}>🦁</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Merlion Life 2</Text>
          <Text style={styles.tagline}>Your Singapore Story</Text>
          <View style={styles.divider} />
          <Text style={styles.description}>
            Experience the journey of a lifetime in Singapore. From primary school to retirement,
            every choice shapes your destiny. Will you chase wealth, happiness, or make a social impact?
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleNewGame}>
            <Text style={styles.primaryButtonText}>🎮 Start New Game</Text>
          </TouchableOpacity>

          {hasExistingGame && (
            <TouchableOpacity style={styles.secondaryButton} onPress={handleContinue}>
              <Text style={styles.secondaryButtonText}>▶️ Continue Game</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Life Stages Preview */}
        <View style={styles.stagesSection}>
          <Text style={styles.sectionTitle}>Life Stages</Text>
          
          <View style={styles.stageCard}>
            <Text style={styles.stageEmoji}>🎒</Text>
            <View style={styles.stageInfo}>
              <Text style={styles.stageName}>Primary School</Text>
              <Text style={styles.stageDesc}>Ages 7-12 • Build foundations</Text>
            </View>
          </View>

          <View style={styles.stageCard}>
            <Text style={styles.stageEmoji}>📚</Text>
            <View style={styles.stageInfo}>
              <Text style={styles.stageName}>Secondary School</Text>
              <Text style={styles.stageDesc}>Ages 13-16 • Shape your future</Text>
            </View>
          </View>

          <View style={styles.stageCard}>
            <Text style={styles.stageEmoji}>🎓</Text>
            <View style={styles.stageInfo}>
              <Text style={styles.stageName}>Post-Secondary</Text>
              <Text style={styles.stageDesc}>JC, Poly, ITE, or Work</Text>
            </View>
          </View>

          <View style={styles.stageCard}>
            <Text style={styles.stageEmoji}>💼</Text>
            <View style={styles.stageInfo}>
              <Text style={styles.stageName}>Career & Life</Text>
              <Text style={styles.stageDesc}>Build wealth, family, legacy</Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureRow}>
            <View style={styles.feature}>
              <Text style={styles.featureEmoji}>📊</Text>
              <Text style={styles.featureText}>Track Stats</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureEmoji}>💰</Text>
              <Text style={styles.featureText}>Investments</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureEmoji}>🎯</Text>
              <Text style={styles.featureText}>Achievements</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureEmoji}>🎲</Text>
              <Text style={styles.featureText}>Random Events</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>A Singaporean Life Simulation Game</Text>
        <Text style={styles.versionText}>Version 2.0</Text>
      </View>

      {/* Debug Menu Modal */}
      <Modal
        visible={showDebugMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDebugMenu(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.debugMenu}>
            <Text style={styles.debugTitle}>🛠️ Debug Menu</Text>
            <Text style={styles.debugSubtitle}>Skip to any life phase with random stats</Text>

            <TouchableOpacity
              style={styles.debugButton}
              onPress={() => skipToPhase(LifeStage.PRIMARY_SCHOOL, 'Game', 7)}
            >
              <Text style={styles.debugButtonText}>🎒 Primary School (Age 7)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.debugButton}
              onPress={() => skipToPhase(LifeStage.SECONDARY_SCHOOL, 'SecondarySchool', 13)}
            >
              <Text style={styles.debugButtonText}>📚 Secondary School (Age 13)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.debugButton}
              onPress={() => skipToPhase(LifeStage.POST_SECONDARY, 'PostSecondarySelection', 17)}
            >
              <Text style={styles.debugButtonText}>🎓 Post-Secondary (Age 17)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.debugButton}
              onPress={() => skipToPhase(LifeStage.CAREER, 'CareerLife', 25)}
            >
              <Text style={styles.debugButtonText}>💼 Career/Adulthood (Age 25)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.debugButton}
              onPress={() => skipToPhase(LifeStage.CAREER, 'InvestmentPortfolio', 18)}
            >
              <Text style={styles.debugButtonText}>📈 Investment Portfolio (Age 18)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.debugButton, styles.debugCloseButton]}
              onPress={() => setShowDebugMenu(false)}
            >
              <Text style={styles.debugCloseText}>❌ Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  emoji: {
    fontSize: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 8,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 20,
    color: '#4A90E2',
    fontWeight: '600',
    marginBottom: 16,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: '#4A90E2',
    borderRadius: 2,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 400,
  },
  actionSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  secondaryButtonText: {
    color: '#4A90E2',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  stagesSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 20,
  },
  stageCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stageEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  stageInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  stageName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 4,
  },
  stageDesc: {
    fontSize: 14,
    color: '#718096',
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  feature: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A202C',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#A0AEC0',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 10,
    color: '#CBD5E0',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  debugMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  debugTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 8,
  },
  debugSubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
  },
  debugButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  debugButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  debugCloseButton: {
    backgroundColor: '#E53E3E',
    marginTop: 8,
  },
  debugCloseText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
