import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Achievement } from '../types';

interface Props {
  achievement: Achievement;
}

const AchievementCard: React.FC<Props> = ({ achievement }) => {
  return (
    <View style={[styles.container, achievement.unlocked && styles.unlocked]}>
      <Text style={styles.icon}>{achievement.icon}</Text>
      <View style={styles.content}>
        <Text style={[styles.name, achievement.unlocked && styles.unlockedText]}>
          {achievement.name}
        </Text>
        <Text style={styles.description}>{achievement.description}</Text>
        {achievement.unlocked && achievement.unlockedYear && (
          <Text style={styles.yearText}>Unlocked in Year {achievement.unlockedYear}</Text>
        )}
      </View>
      {!achievement.unlocked && <View style={styles.lockedOverlay} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    position: 'relative'
  },
  unlocked: {
    borderColor: '#FFD700',
    backgroundColor: '#FFFEF7'
  },
  icon: {
    fontSize: 32,
    marginRight: 12
  },
  content: {
    flex: 1
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999',
    marginBottom: 2
  },
  unlockedText: {
    color: '#2C3E50'
  },
  description: {
    fontSize: 12,
    color: '#7F8C8D'
  },
  yearText: {
    fontSize: 10,
    color: '#27AE60',
    marginTop: 2,
    fontWeight: '600'
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10
  }
});

export default AchievementCard;

