import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ActivitySliderProps {
  label: string;
  value: number;
  maxValue: number;
  onChange: (value: number) => void;
  icon: string;
  color: string;
}

const ActivitySlider: React.FC<ActivitySliderProps> = ({
  label,
  value,
  maxValue,
  onChange,
  icon,
  color,
}) => {
  const canDecrement = value > 0;
  const canIncrement = value < maxValue;

  const progressPercent = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value} pts</Text>
      </View>

      <View style={styles.stepperRow}>
        <TouchableOpacity
          onPress={() => onChange(Math.max(0, value - 1))}
          disabled={!canDecrement}
          style={[styles.stepperBtn, { backgroundColor: canDecrement ? color : '#ECF0F1' }]}
        >
          <Text style={styles.stepperText}>-</Text>
        </TouchableOpacity>

        <View style={styles.track}>
          <View style={[styles.progress, { width: `${progressPercent}%`, backgroundColor: color }]} />
        </View>

        <TouchableOpacity
          onPress={() => onChange(Math.min(maxValue, value + 1))}
          disabled={!canIncrement}
          style={[styles.stepperBtn, { backgroundColor: canIncrement ? color : '#ECF0F1' }]}
        >
          <Text style={styles.stepperText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  slider: {
    height: 40,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepperBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  track: {
    flex: 1,
    height: 10,
    marginHorizontal: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});

export default ActivitySlider;

