import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// TODO: Implement Practice session screen
export default function PracticeSessionScreen() {
  const { topicId } = useLocalSearchParams<{ topicId: string }>();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Practice Session</Text>
        <Text style={styles.placeholder}>Topic ID: {topicId}</Text>
        <Text style={styles.placeholder}>Practice session screen placeholder</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 16,
    color: '#4B5563',
  },
});

