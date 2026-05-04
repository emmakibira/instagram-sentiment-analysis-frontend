/**
 * Utility functions
 */

import { SentimentBreakdown } from '@/types/index';

export const colors = {
  primary: '#1F2937',
  secondary: '#3B82F6',
  positive: '#10B981',
  neutral: '#F59E0B',
  negative: '#EF4444',
  background: '#F3F4F6',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111827',
  textSecondary: '#6B7280',
};

export const sentimentColors = {
  positive: colors.positive,
  neutral: colors.neutral,
  negative: colors.negative,
};

/**
 * Format percentage for display
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format date to readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format satisfaction score with emoji
 */
export const getSatisfactionEmoji = (score: number): string => {
  if (score >= 75) return '😊';
  if (score >= 50) return '😐';
  return '😞';
};

/**
 * Get sentiment label with emoji
 */
export const getSentimentEmoji = (sentiment: 'positive' | 'neutral' | 'negative'): string => {
  switch (sentiment) {
    case 'positive':
      return '👍';
    case 'negative':
      return '👎';
    default:
      return '➖';
  }
};

/**
 * Validate Instagram URL
 */
export const isValidInstagramUrl = (url: string): boolean => {
  const patterns = [
    /^https?:\/\/(www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+\/?/,
    /^https?:\/\/(www\.)?instagram\.com\/reel\/[A-Za-z0-9_-]+\/?/,
    /^https?:\/\/(www\.)?instagram\.com\/tv\/[A-Za-z0-9_-]+\/?/,
  ];

  return patterns.some((pattern) => pattern.test(url));
};

/**
 * Extract shortcode from Instagram URL
 */
export const extractInstagramShortcode = (url: string): string | null => {
  const patterns = [
    /instagram\.com\/p\/([A-Za-z0-9_-]+)/,
    /instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
    /instagram\.com\/tv\/([A-Za-z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
};

/**
 * Round number to specific decimals
 */
export const roundNumber = (value: number, decimals: number = 2): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Calculate sentiment summary text
 */
export const getSentimentSummary = (breakdown: SentimentBreakdown, totalComments: number): string => {
  const { positive } = breakdown;

  if (positive > 60) {
    return `Excellent! ${positive.toFixed(0)}% positive sentiment from ${totalComments} comments.`;
  } else if (positive > 40) {
    return `Good! ${positive.toFixed(0)}% positive sentiment from ${totalComments} comments.`;
  } else if (positive > 20) {
    return `Mixed reactions with ${positive.toFixed(0)}% positive sentiment.`;
  } else {
    return `Needs improvement. Only ${positive.toFixed(0)}% positive sentiment detected.`;
  }
};

/**
 * Sleep/delay utility
 */
export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
