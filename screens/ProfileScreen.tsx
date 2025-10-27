import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState } from '../types';
import AchievementCard from '../components/AchievementCard';
import RelationshipCard from '../components/RelationshipCard';

type NavProp = StackNavigationProp<RootStackParamList, 'Profile'>;
type RouteProps = RouteProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const ProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const { gameState } = route.params;
  const { player } = gameState;

  const unlockedAchievements = player.achievements?.filter(a => a.unlocked) || [];
  const lockedAchievements = player.achievements?.filter(a => !a.unlocked) || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Relationships Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🤝 Relationships</Text>
          {player.relationships && player.relationships.length > 0 ? (
            player.relationships.map(relationship => (
              <RelationshipCard key={relationship.id} relationship={relationship} />
            ))
          ) : (
            <Text style={styles.emptyText}>No relationships yet. Make friends as you go through life!</Text>
          )}
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Achievements</Text>
          <Text style={styles.achievementCount}>
            {unlockedAchievements.length} / {player.achievements?.length || 0} Unlocked
          </Text>
          
          {unlockedAchievements.length > 0 && (
            <View style={styles.achievementGroup}>
              <Text style={styles.groupTitle}>Unlocked</Text>
              {unlockedAchievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </View>
          )}

          {lockedAchievements.length > 0 && (
            <View style={styles.achievementGroup}>
              <Text style={styles.groupTitle}>Locked</Text>
              {lockedAchievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </View>
          )}
        </View>

        {/* Event History Section */}
        {player.eventHistory && player.eventHistory.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📜 Major Events</Text>
            <Text style={styles.eventCount}>{player.eventHistory.length} events experienced</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    position: 'relative'
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    top: 40,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#EAF2F8'
  },
  backText: {
    color: '#4A90E2',
    fontWeight: '700'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50'
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12
  },
  achievementCount: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 12
  },
  achievementGroup: {
    marginBottom: 16
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 8
  },
  emptyText: {
    fontSize: 14,
    color: '#95A5A6',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20
  },
  eventCount: {
    fontSize: 14,
    color: '#7F8C8D'
  }
});

export default ProfileScreen;

