import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, ViewStyle } from 'react-native';

// TODO: Implement KeyboardAvoidingWrapper component
interface KeyboardAvoidingWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function KeyboardAvoidingWrapper({ children, style }: KeyboardAvoidingWrapperProps) {
  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

