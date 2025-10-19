import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from 'react-native-slider';

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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value} pts</Text>
      </View>
      <Slider
        value={value}
        onValueChange={onChange}
        minimumValue={0}
        maximumValue={maxValue}
        step={1}
        minimumTrackTintColor={color}
        maximumTrackTintColor="#E0E0E0"
        thumbTintColor={color}
        style={styles.slider}
      />
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
});

export default ActivitySlider;

