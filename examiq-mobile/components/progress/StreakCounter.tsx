import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';

// TODO: Implement StreakCounter component
interface StreakCounterProps {
  streak: number;
  longestStreak?: number;
}

export default function StreakCounter({ streak, longestStreak }: StreakCounterProps) {
  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="flame" size={32} color="#F59E0B" />
          <View style={styles.streakInfo}>
            <Text style={styles.streakNumber}>{streak}</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
          </View>
        </View>
        {longestStreak && longestStreak > streak && (
          <Text style={styles.longestStreak}>Longest: {longestStreak} days</Text>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  streakInfo: {
    flex: 1,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  streakLabel: {
    fontSize: 14,
    color: '#4B5563',
  },
  longestStreak: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
});

