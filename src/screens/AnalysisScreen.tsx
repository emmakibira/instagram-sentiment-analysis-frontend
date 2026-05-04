/**
 * Analysis Screen - Display sentiment analysis results
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useAppSelector } from '@redux/hooks';
import SatisfactionScore from '@components/SatisfactionScore';
import SentimentBreakdown from '@components/SentimentBreakdown';
import CommentList from '@components/CommentList';
import { colors, formatDate, getSentimentSummary } from '@utils/helpers';

const AnalysisScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const analysis = useAppSelector((state) => state.analysis.currentAnalysis);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleShare}
          style={{ marginRight: 16 }}
        >
          <Text style={{ fontSize: 18 }}>Share</Text>
        </TouchableOpacity>
      ),
    });
  }, [analysis]);

  const handleShare = async () => {
    if (!analysis) return;

    try {
      const summary = getSentimentSummary(
        analysis.sentiment_breakdown,
        analysis.total_comments
      );

      await Share.share({
        message: `📊 Sentiment Analysis Results\n\n${summary}\n\nPost: ${analysis.post_url}\nAnalyzed: ${formatDate(analysis.analyzed_at)}`,
        title: 'Instagram Sentiment Analysis',
        url: analysis.post_url,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  if (!analysis) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>No analysis data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Post URL */}
        <View style={styles.postUrlSection}>
          <Text style={styles.postUrlLabel}>Post URL</Text>
          <Text style={styles.postUrl} numberOfLines={2}>
            {analysis.post_url}
          </Text>
        </View>

        {/* Timestamp */}
        <Text style={styles.timestamp}>
          Analyzed: {formatDate(analysis.analyzed_at)}
        </Text>

        {/* Satisfaction Score */}
        <SatisfactionScore
          score={analysis.satisfaction_score}
          totalComments={analysis.total_comments}
        />

        {/* Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryText}>
            {getSentimentSummary(
              analysis.sentiment_breakdown,
              analysis.total_comments
            )}
          </Text>
        </View>

        {/* Sentiment Breakdown */}
        <SentimentBreakdown breakdown={analysis.sentiment_breakdown} />

        {/* Comments */}
        <CommentList
          comments={analysis.comments}
          maxDisplay={5}
        />

        {/* View All Comments Button */}
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() =>
            navigation.navigate('Comments', {
              comments: analysis.comments,
            })
          }
        >
          <Text style={styles.viewAllButtonText}>
            View All {analysis.comments.length} Comments
          </Text>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.shareButton]}
            onPress={handleShare}
          >
            <Text style={styles.actionButtonText}>📤 Share Results</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.newAnalysisButton]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.newAnalysisButtonText}>➕ New Analysis</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
  postUrlSection: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
  },
  postUrlLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  postUrl: {
    fontSize: 13,
    color: colors.secondary,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: 8,
  },
  summarySection: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    borderLeftColor: colors.secondary,
    borderLeftWidth: 4,
  },
  summaryText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  viewAllButton: {
    backgroundColor: colors.surface,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 12,
  },
  viewAllButtonText: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    backgroundColor: colors.secondary,
  },
  newAnalysisButton: {
    backgroundColor: colors.positive,
  },
  actionButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '600',
  },
  newAnalysisButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AnalysisScreen;
