import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Card from '../common/Card';

// TODO: Implement BadgeItem component
interface BadgeItemProps {
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export default function BadgeItem({ name, description, icon, earned, earnedAt }: BadgeItemProps) {
  return (
    <Card style={[styles.container, !earned && styles.locked]}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, !earned && styles.iconContainerLocked]}>
          {earned ? (
            <Text style={styles.iconEmoji}>{icon}</Text>
          ) : (
            <Text style={styles.iconEmoji}>🔒</Text>
          )}
        </View>
        <View style={styles.info}>
          <Text style={[styles.name, !earned && styles.nameLocked]}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          {earned && earnedAt && <Text style={styles.earnedAt}>Earned {earnedAt}</Text>}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  locked: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    gap: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerLocked: {
    backgroundColor: '#F3F4F6',
  },
  iconEmoji: {
    fontSize: 32,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  nameLocked: {
    color: '#9CA3AF',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  earnedAt: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

