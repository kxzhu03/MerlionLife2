import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Player } from '../types';
import StatBar from './StatBar';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatar}>{player.avatar}</Text>
        <View style={styles.info}>
          <Text style={styles.name}>{player.name}</Text>
          <Text style={styles.details}>Age {player.age} | Primary {player.grade}</Text>
          <Text style={styles.ses}>{player.sesClass.toUpperCase()} CLASS</Text>
          <Text style={styles.occupation}>{player.parentsOccupation}</Text>
        </View>
      </View>
      
      <View style={styles.stats}>
        <StatBar
          label="Wealth"
          value={player.stats.wealth}
          maxValue={1000}
          color="#4CAF50"
          icon="💰"
        />
        <StatBar
          label="Happiness"
          value={player.stats.happiness}
          maxValue={100}
          color="#FF9800"
          icon="😊"
        />
        <StatBar
          label="Health"
          value={player.stats.health}
          maxValue={100}
          color="#E91E63"
          icon="❤️"
        />
        <StatBar
          label="Social Impact"
          value={player.stats.socialImpact}
          maxValue={100}
          color="#9C27B0"
          icon="🤝"
        />
        <StatBar
          label="Academic Skill"
          value={player.stats.academicSkill}
          maxValue={100}
          color="#2196F3"
          icon="📚"
        />
        {player.cca && (
          <StatBar
            label={`${player.cca} Skill`}
            value={player.ccaSkill}
            maxValue={100}
            color="#00BCD4"
            icon="🎯"
          />
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.allowance}>Daily Allowance: S${player.dailyAllowance}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 60,
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  ses: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginTop: 4,
  },
  occupation: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  stats: {
    marginTop: 8,
  },
  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  allowance: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
  },
});

export default PlayerCard;

