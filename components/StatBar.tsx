import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  icon?: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue, color, icon }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{Math.round(value)}</Text>
      </View>
      <View style={styles.barContainer}>
        <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    color: '#333',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  barContainer: {
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 10,
  },
});

export default StatBar;

