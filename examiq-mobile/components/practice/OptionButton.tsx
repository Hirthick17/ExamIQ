import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// TODO: Implement OptionButton component
interface OptionButtonProps {
  option: string;
  label: string;
  selected?: boolean;
  correct?: boolean;
  showResult?: boolean;
  onPress: () => void;
}

export default function OptionButton({
  option,
  label,
  selected = false,
  correct,
  showResult = false,
  onPress,
}: OptionButtonProps) {
  const getButtonStyle = () => {
    if (showResult && correct) return styles.correct;
    if (showResult && selected && !correct) return styles.incorrect;
    if (selected) return styles.selected;
    return styles.default;
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle()]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={showResult}
    >
      <View style={styles.content}>
        <Text style={styles.optionLabel}>{option}</Text>
        <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
      </View>
      {showResult && correct && <Ionicons name="checkmark-circle" size={24} color="#10B981" />}
      {showResult && selected && !correct && <Ionicons name="close-circle" size={24} color="#EF4444" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  default: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
  },
  selected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  correct: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },
  incorrect: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
    marginRight: 12,
    minWidth: 24,
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  optionTextSelected: {
    color: '#6366F1',
  },
});

