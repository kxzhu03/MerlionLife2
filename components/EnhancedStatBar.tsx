import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface Props {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
  icon: string;
  showChange?: number;
}

const EnhancedStatBar: React.FC<Props> = ({ 
  label, 
  value, 
  maxValue = 100, 
  color, 
  icon,
  showChange 
}) => {
  const percentage = Math.min(100, (value / maxValue) * 100);
  
  const getChangeColor = (change: number) => {
    if (change > 0) return '#27AE60';
    if (change < 0) return '#E74C3C';
    return '#95A5A6';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{Math.round(value)}</Text>
          {showChange !== undefined && showChange !== 0 && (
            <Text style={[styles.change, { color: getChangeColor(showChange) }]}>
              {showChange > 0 ? '+' : ''}{Math.round(showChange)}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.barContainer}>
        <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    fontSize: 16,
    marginRight: 6
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#34495E'
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C3E50'
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6
  },
  barContainer: {
    height: 8,
    backgroundColor: '#ECF0F1',
    borderRadius: 4,
    overflow: 'hidden'
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
    minWidth: 2
  }
});

export default EnhancedStatBar;

