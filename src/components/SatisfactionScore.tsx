/**
 * Satisfaction Score Card Component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, getSatisfactionEmoji } from '@utils/helpers';

interface SatisfactionScoreProps {
  score: number;
  totalComments: number;
}

const SatisfactionScore: React.FC<SatisfactionScoreProps> = ({ score, totalComments }) => {
  const getScoreColor = (s: number): string => {
    if (s >= 75) return colors.positive;
    if (s >= 50) return colors.neutral;
    return colors.negative;
  };

  const getScoreLabel = (s: number): string => {
    if (s >= 75) return 'Excellent';
    if (s >= 50) return 'Good';
    if (s >= 25) return 'Fair';
    return 'Poor';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Satisfaction</Text>

      <View style={styles.scoreCircle}>
        <Text style={[styles.scoreValue, { color: getScoreColor(score) }]}>
          {score.toFixed(1)}%
        </Text>
        <Text style={styles.emoji}>{getSatisfactionEmoji(score)}</Text>
      </View>

      <Text style={[styles.scoreLabel, { color: getScoreColor(score) }]}>
        {getScoreLabel(score)}
      </Text>

      <Text style={styles.subtitle}>
        Based on {totalComments} comments
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 20,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: colors.secondary,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
  },
  emoji: {
    fontSize: 32,
    marginTop: 8,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default SatisfactionScore;
