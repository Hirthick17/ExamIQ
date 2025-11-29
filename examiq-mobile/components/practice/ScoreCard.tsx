import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';

// TODO: Implement ScoreCard component
interface ScoreCardProps {
  score: number;
  total: number;
  timeSpent: number; // in seconds
  onReview?: () => void;
  onContinue?: () => void;
}

export default function ScoreCard({ score, total, timeSpent, onReview, onContinue }: ScoreCardProps) {
  const percentage = Math.round((score / total) * 100);
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.scoreCircle}>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>
        <Text style={styles.scoreText}>
          {score} out of {total} correct
        </Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={20} color="#4B5563" />
            <Text style={styles.statText}>{formatTime(timeSpent)}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  percentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    color: '#4B5563',
  },
});

