import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Relationship } from '../types';

interface Props {
  relationship: Relationship;
}

const RelationshipCard: React.FC<Props> = ({ relationship }) => {
  const getRelationshipColor = (level: number) => {
    if (level >= 80) return '#27AE60';
    if (level >= 60) return '#3498DB';
    if (level >= 40) return '#F39C12';
    return '#E74C3C';
  };

  const getRelationshipStatus = (level: number) => {
    if (level >= 80) return 'Excellent';
    if (level >= 60) return 'Good';
    if (level >= 40) return 'Fair';
    return 'Poor';
  };

  const color = getRelationshipColor(relationship.level);
  const status = getRelationshipStatus(relationship.level);

  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>{relationship.avatar}</Text>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{relationship.name}</Text>
          <Text style={[styles.status, { color }]}>{status}</Text>
        </View>
        <Text style={styles.description}>{relationship.description}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${relationship.level}%`, backgroundColor: color }]} />
        </View>
        <Text style={styles.levelText}>{relationship.level}/100</Text>
      </View>
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
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  avatar: {
    fontSize: 32,
    marginRight: 12
  },
  content: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C3E50'
  },
  status: {
    fontSize: 12,
    fontWeight: '600'
  },
  description: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 6
  },
  progressBar: {
    height: 6,
    backgroundColor: '#ECF0F1',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4
  },
  progressFill: {
    height: '100%',
    borderRadius: 3
  },
  levelText: {
    fontSize: 10,
    color: '#95A5A6',
    textAlign: 'right'
  }
});

export default RelationshipCard;

