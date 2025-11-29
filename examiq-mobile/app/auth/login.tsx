import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// TODO: Implement Login screen
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.placeholder}>Login screen placeholder</Text>
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

