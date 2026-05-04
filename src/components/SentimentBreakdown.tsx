/**
 * Sentiment Breakdown Component
 * Displays the breakdown of sentiments (positive, neutral, negative)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SentimentBreakdown as SentimentBreakdownType } from '@/types/index';
import { colors, sentimentColors, formatPercentage } from '@utils/helpers';

interface SentimentBreakdownProps {
  breakdown: SentimentBreakdownType;
}

const SentimentBreakdown: React.FC<SentimentBreakdownProps> = ({ breakdown }) => {
  const renderSentimentBar = (
    label: string,
    percentage: number,
    color: string
  ) => (
    <View key={label} style={styles.barContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.percentage}>{formatPercentage(percentage)}</Text>
      </View>
      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sentiment Breakdown</Text>
      {renderSentimentBar('Positive', breakdown.positive, sentimentColors.positive)}
      {renderSentimentBar('Neutral', breakdown.neutral, sentimentColors.neutral)}
      {renderSentimentBar('Negative', breakdown.negative, sentimentColors.negative)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 16,
  },
  barContainer: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  barBackground: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default SentimentBreakdown;
