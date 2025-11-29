import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO: Implement ProgressBar component
interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  color?: string;
}

export default function ProgressBar({
  progress,
  label,
  showPercentage = true,
  color = '#6366F1',
}: ProgressBarProps) {
  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.header}>
          <Text style={styles.label}>{label}</Text>
          {showPercentage && <Text style={styles.percentage}>{Math.round(progress)}%</Text>}
        </View>
      )}
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${progress}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  percentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  barContainer: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
});

