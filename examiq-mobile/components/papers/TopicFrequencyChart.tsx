import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO: Implement TopicFrequencyChart component
interface TopicFrequency {
  topicName: string;
  count: number;
  percentage: number;
}

interface TopicFrequencyChartProps {
  data: TopicFrequency[];
}

export default function TopicFrequencyChart({ data }: TopicFrequencyChartProps) {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.header}>
            <Text style={styles.topicName}>{item.topicName}</Text>
            <Text style={styles.percentage}>{item.percentage}%</Text>
          </View>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { width: `${item.percentage}%` }]} />
          </View>
          <Text style={styles.count}>{item.count} questions</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  item: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  topicName: {
    fontSize: 14,
    fontWeight: '600',
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
    marginBottom: 4,
  },
  bar: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  count: {
    fontSize: 12,
    color: '#4B5563',
  },
});

