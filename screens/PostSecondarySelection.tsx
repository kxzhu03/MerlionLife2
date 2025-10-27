import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState } from '../types';
import { PostSecondaryPath, LifeStage } from '../types/lifestages';
import { LifeStagesService } from '../services/LifeStagesService';
import { GameService } from '../services/GameService';
import { Gender } from '../types/avatar';

type NavProp = StackNavigationProp<RootStackParamList, 'PostSecondarySelection'>;
type RouteProps = RouteProp<RootStackParamList, 'PostSecondarySelection'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const PostSecondarySelection: React.FC<Props> = ({ navigation, route }) => {
  const { gameState } = route.params;
  const { player } = gameState;
  
  const [selectedPath, setSelectedPath] = useState<PostSecondaryPath | null>(null);

  const options = player.postSecondaryOptions || [PostSecondaryPath.WORK];

  const getPathInfo = (path: PostSecondaryPath) => {
    switch (path) {
      case PostSecondaryPath.JUNIOR_COLLEGE:
        return {
          name: 'Junior College (JC)',
          duration: '2 years',
          description: 'Prepare for A-Level examinations and university admission. Academic-focused pathway.',
          icon: '🎓',
          color: '#9C27B0',
          details: [
            'Take A-Level examinations',
            'Wide range of university options',
            'Academic and research focus',
            'Scholarships available'
          ]
        };
      case PostSecondaryPath.POLYTECHNIC:
        return {
          name: 'Polytechnic',
          duration: '3 years',
          description: 'Earn a diploma in a specialized field. Practical and industry-focused education.',
          icon: '🏫',
          color: '#2196F3',
          details: [
            'Hands-on learning',
            'Industry internships',
            'Direct career pathway',
            'Can progress to university'
          ]
        };
      case PostSecondaryPath.ITE:
        return {
          name: 'ITE (Institute of Technical Education)',
          duration: '2 years',
          description: 'Technical and vocational training. Learn practical skills for immediate employment.',
          icon: '🔧',
          color: '#FF9800',
          details: [
            'Vocational skills training',
            'Industry certifications',
            'Quick entry to workforce',
            'Can progress to polytechnic'
          ]
        };
      case PostSecondaryPath.WORK:
        return {
          name: 'Enter Workforce',
          duration: 'Immediate',
          description: 'Start working immediately. Gain real-world experience and earn income.',
          icon: '💼',
          color: '#4CAF50',
          details: [
            'Immediate income',
            'Work experience',
            'Learn on the job',
            'Can study part-time later'
          ]
        };
      default:
        return {
          name: 'Unknown',
          duration: '',
          description: '',
          icon: '❓',
          color: '#607D8B',
          details: []
        };
    }
  };

  const confirmSelection = async () => {
    if (!selectedPath) {
      Alert.alert('No Selection', 'Please choose a post-secondary pathway');
      return;
    }

    let updatedPlayer = player;
    let nextScreen: keyof RootStackParamList = 'CareerLife';

    // Check if male and needs NS
    const isMale = player.avatarCustomization?.gender === Gender.MALE;
    const age = player.age;

    if (selectedPath === PostSecondaryPath.WORK) {
      // Go straight to career
      if (isMale && age < 20) {
        // Do NS first
        updatedPlayer = LifeStagesService.initializeNS(player);
        Alert.alert(
          'National Service',
          'As a male Singaporean, you must complete National Service before starting work.',
          [{ text: 'OK' }]
        );
      }
      nextScreen = 'CareerLife';
    } else {
      // Initialize post-secondary education
      updatedPlayer = LifeStagesService.initializePostSecondary(player, selectedPath);
      
      // If male and going to poly/ITE, might do NS first or after
      if (isMale && selectedPath !== PostSecondaryPath.JUNIOR_COLLEGE) {
        // Simplified: Do NS after post-secondary for non-JC paths
        updatedPlayer.nsData = { pending: true } as any;
      }
      
      nextScreen = 'CareerLife'; // Simplified: skip to career life (you can add detailed post-sec screens later)
    }

    const newGameState: GameState = {
      ...gameState,
      player: updatedPlayer,
      gamePhase: 'career'
    };

    await GameService.saveGameState(newGameState);
    navigation.navigate(nextScreen, { gameState: newGameState });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>🎯 Choose Your Path</Text>
        <Text style={styles.subtitle}>Post-Secondary Education</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          This is an important decision that will shape your future career and opportunities.
          Choose the pathway that aligns with your interests and goals.
        </Text>
      </View>

      {options.map((path, index) => {
        const info = getPathInfo(path);
        const isSelected = selectedPath === path;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.pathCard,
              { borderLeftColor: info.color },
              isSelected && styles.pathCardSelected
            ]}
            onPress={() => setSelectedPath(path)}
          >
            <View style={styles.pathHeader}>
              <Text style={styles.pathIcon}>{info.icon}</Text>
              <View style={styles.pathTitleContainer}>
                <Text style={styles.pathName}>{info.name}</Text>
                <Text style={styles.pathDuration}>{info.duration}</Text>
              </View>
              {isSelected && <Text style={styles.checkmark}>✓</Text>}
            </View>
            
            <Text style={styles.pathDescription}>{info.description}</Text>
            
            <View style={styles.detailsList}>
              {info.details.map((detail, idx) => (
                <View key={idx} style={styles.detailRow}>
                  <Text style={styles.detailBullet}>•</Text>
                  <Text style={styles.detailText}>{detail}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={[styles.confirmButton, !selectedPath && styles.confirmButtonDisabled]}
        onPress={confirmSelection}
        disabled={!selectedPath}
      >
        <Text style={styles.confirmButtonText}>
          {selectedPath ? 'Confirm Selection' : 'Select a Pathway First'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  content: {
    padding: 16,
    paddingTop: 40,
    paddingBottom: 40
  },
  header: {
    marginBottom: 20,
    alignItems: 'center'
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
  infoCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50'
  },
  infoText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 22
  },
  pathCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  pathCardSelected: {
    borderWidth: 2,
    borderColor: '#4A90E2',
    backgroundColor: '#F0F8FF'
  },
  pathHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  pathIcon: {
    fontSize: 32,
    marginRight: 12
  },
  pathTitleContainer: {
    flex: 1
  },
  pathName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 2
  },
  pathDuration: {
    fontSize: 13,
    color: '#7F8C8D'
  },
  checkmark: {
    fontSize: 24,
    color: '#4A90E2',
    fontWeight: '700'
  },
  pathDescription: {
    fontSize: 14,
    color: '#5D6D7E',
    lineHeight: 20,
    marginBottom: 12
  },
  detailsList: {
    gap: 6
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  detailBullet: {
    fontSize: 14,
    color: '#95A5A6',
    marginRight: 8,
    marginTop: 2
  },
  detailText: {
    flex: 1,
    fontSize: 13,
    color: '#5D6D7E',
    lineHeight: 20
  },
  confirmButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  confirmButtonDisabled: {
    backgroundColor: '#BDC3C7',
    shadowOpacity: 0
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  }
});

export default PostSecondarySelection;

