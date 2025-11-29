import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';

// TODO: Implement PaperCard component
interface PaperCardProps {
  title: string;
  subject: string;
  year?: number;
  uploadedAt: string;
  onPress: () => void;
}

export default function PaperCard({ title, subject, year, uploadedAt, onPress }: PaperCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card>
        <View style={styles.container}>
          <View style={styles.header}>
            <Ionicons name="document-text" size={24} color="#6366F1" />
            <View style={styles.info}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subject}>{subject} {year && `(${year})`}</Text>
            </View>
          </View>
          <Text style={styles.date}>{uploadedAt}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  subject: {
    fontSize: 14,
    color: '#4B5563',
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

