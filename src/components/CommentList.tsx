/**
 * Comment List Component
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Comment } from '@/types/index';
import { colors, getSentimentEmoji, sentimentColors } from '@utils/helpers';

interface CommentListProps {
  comments: Comment[];
  filter?: 'all' | 'positive' | 'neutral' | 'negative';
  maxDisplay?: number;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  filter = 'all',
  maxDisplay = 10,
}) => {
  const filteredComments =
    filter === 'all'
      ? comments
      : comments.filter((c) => c.sentiment === filter);

  const displayedComments = filteredComments.slice(0, maxDisplay);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return sentimentColors.positive;
      case 'negative':
        return sentimentColors.negative;
      default:
        return sentimentColors.neutral;
    }
  };

  const renderCommentItem = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.emoji}>{getSentimentEmoji(item.sentiment as any)}</Text>
        <View style={styles.sentimentBadge}>
          <View
            style={[
              styles.sentimentDot,
              { backgroundColor: getSentimentColor(item.sentiment) },
            ]}
          />
          <Text
            style={[
              styles.sentimentLabel,
              { color: getSentimentColor(item.sentiment) },
            ]}
          >
            {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
          </Text>
        </View>
        <Text style={styles.confidence}>
          {(item.confidence * 100).toFixed(0)}%
        </Text>
      </View>

      <Text style={styles.commentText} numberOfLines={3}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Comments</Text>
        <Text style={styles.count}>
          {displayedComments.length} of {comments.length}
        </Text>
      </View>

      {displayedComments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No comments found</Text>
        </View>
      ) : (
        <FlatList
          data={displayedComments}
          renderItem={renderCommentItem}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  count: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  commentContainer: {
    paddingVertical: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  emoji: {
    fontSize: 18,
  },
  sentimentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  sentimentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sentimentLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  confidence: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  commentText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  emptyContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default CommentList;
