import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// TODO: Implement TimerDisplay component
interface TimerDisplayProps {
  timeRemaining: number; // in seconds
  totalTime?: number;
}

export default function TimerDisplay({ timeRemaining, totalTime }: TimerDisplayProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getColor = () => {
    if (!totalTime) return '#6366F1';
    const percentage = (timeRemaining / totalTime) * 100;
    if (percentage < 20) return '#EF4444';
    if (percentage < 50) return '#F59E0B';
    return '#6366F1';
  };

  return (
    <View style={styles.container}>
      <Ionicons name="time-outline" size={20} color={getColor()} />
      <Text style={[styles.time, { color: getColor() }]}>{formatTime(timeRemaining)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
  },
});

