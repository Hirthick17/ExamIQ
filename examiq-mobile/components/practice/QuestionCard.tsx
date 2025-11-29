import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../common/Card';

// TODO: Implement QuestionCard component
interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  children: React.ReactNode;
}

export default function QuestionCard({
  questionNumber,
  totalQuestions,
  questionText,
  children,
}: QuestionCardProps) {
  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.counter}>
          Question {questionNumber} of {totalQuestions}
        </Text>
        <Text style={styles.questionText}>{questionText}</Text>
        {children}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  counter: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 26,
  },
});

