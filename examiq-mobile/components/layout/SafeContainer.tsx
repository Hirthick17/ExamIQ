import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';

// TODO: Implement SafeContainer component
interface SafeContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function SafeContainer({ children, style }: SafeContainerProps) {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

