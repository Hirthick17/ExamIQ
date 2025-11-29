import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// TODO: Implement TopicChip component
interface TopicChipProps {
  label: string;
  count?: number;
  onPress?: () => void;
  selected?: boolean;
}

export default function TopicChip({ label, count, onPress, selected = false }: TopicChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label} {count !== undefined && `(${count})`}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#6366F1',
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
  },
  labelSelected: {
    color: '#FFFFFF',
  },
});

