import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Player } from '../types';
import EnhancedStatBar from './EnhancedStatBar';

interface PlayerCardProps {
  player: Player;
  statsChanges?: Partial<Record<keyof Player['stats'], number>>;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, statsChanges }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatar}>{player.avatar}</Text>
        <View style={styles.info}>
          <Text style={styles.name}>{player.name}</Text>
          <Text style={styles.details}>Age {player.age} | Primary {player.grade}</Text>
          <Text style={styles.ses}>{player.sesClass.toUpperCase()} CLASS</Text>
          <Text style={styles.occupation}>{"Parents' occupation: "}{player.parentsOccupation}</Text>
        </View>
      </View>
      
      {player.personalityTraits && player.personalityTraits.length > 0 && (
        <View style={styles.traitsContainer}>
          {player.personalityTraits.map(trait => (
            <View key={trait} style={styles.traitBadge}>
              <Text style={styles.traitText}>{trait}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.stats}>
        <EnhancedStatBar
          label="Academic Skill"
          value={player.stats.academicSkill}
          color="#3498DB"
          icon="📚"
          showChange={statsChanges?.academicSkill}
        />
        <EnhancedStatBar
          label="Happiness"
          value={player.stats.happiness}
          color="#F39C12"
          icon="😊"
          showChange={statsChanges?.happiness}
        />
        <EnhancedStatBar
          label="Health"
          value={player.stats.health}
          color="#E74C3C"
          icon="❤️"
          showChange={statsChanges?.health}
        />
        <EnhancedStatBar
          label="Social Impact"
          value={player.stats.socialImpact}
          color="#9B59B6"
          icon="🤝"
          showChange={statsChanges?.socialImpact}
        />
        <EnhancedStatBar
          label="Wealth"
          value={player.stats.wealth}
          maxValue={10000}
          color="#27AE60"
          icon="💰"
          showChange={statsChanges?.wealth}
        />
        {player.stats.stress !== undefined && (
          <EnhancedStatBar
            label="Stress"
            value={player.stats.stress}
            color="#E67E22"
            icon="😰"
            showChange={statsChanges?.stress}
          />
        )}
        {player.stats.reputation !== undefined && (
          <EnhancedStatBar
            label="Reputation"
            value={player.stats.reputation}
            color="#1ABC9C"
            icon="⭐"
            showChange={statsChanges?.reputation}
          />
        )}
        {player.cca && (
          <View style={styles.ccaSection}>
            <Text style={styles.sectionTitle}>CCA: {player.cca}</Text>
            <EnhancedStatBar
              label="CCA Skill"
              value={player.ccaSkill}
              color="#16A085"
              icon="🎯"
            />
          </View>
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
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#34495E',
    marginTop: 12,
    marginBottom: 8,
    textTransform: 'capitalize'
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12
  },
  traitBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6
  },
  traitText: {
    fontSize: 11,
    color: '#4A90E2',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  ccaSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1'
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

