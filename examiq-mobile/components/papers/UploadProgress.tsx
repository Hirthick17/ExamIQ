import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO: Implement UploadProgress component
interface UploadProgressProps {
  progress: number;
  fileName: string;
}

export default function UploadProgress({ progress, fileName }: UploadProgressProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.fileName}>{fileName}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{Math.round(progress)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 12,
  },
  fileName: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'right',
  },
});

