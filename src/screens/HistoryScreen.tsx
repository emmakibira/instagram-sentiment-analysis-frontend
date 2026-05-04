/**
 * History Screen - Display past analyses
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setHistory, setLoading, setError } from '@redux/store';
import APIClient from '@services/api';
import LoadingIndicator from '@components/LoadingIndicator';
import ErrorMessage from '@components/ErrorMessage';
import { colors, formatDate, formatPercentage } from '@utils/helpers';
import { AnalysisHistory } from '@/types/index';

const HistoryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { history, loading, error } = useAppSelector((state) => state.analysis);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      dispatch(setLoading(true));
      const historyData = await APIClient.getHistory();
      dispatch(setHistory(historyData));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load history';
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  const handleAnalysisPress = async (item: AnalysisHistory) => {
    try {
      dispatch(setLoading(true));
      const fullAnalysis = await APIClient.getAnalysis(item.analysis_id);
      navigation.navigate('Analysis', { analysis: fullAnalysis });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load analysis';
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const renderHistoryItem = ({ item }: { item: AnalysisHistory }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => handleAnalysisPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.itemHeader}>
        <Text style={styles.satisfactionScore}>
          {item.satisfaction_score.toFixed(1)}%
        </Text>
        <Text style={styles.itemDate}>{formatDate(item.analyzed_at)}</Text>
      </View>

      <Text style={styles.postUrl} numberOfLines={1}>
        {item.post_url}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Comments</Text>
          <Text style={styles.statValue}>{item.total_comments}</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Positive</Text>
          <Text style={[styles.statValue, { color: colors.positive }]}>
            {formatPercentage(item.sentiment_breakdown.positive, 0)}
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Neutral</Text>
          <Text style={[styles.statValue, { color: colors.neutral }]}>
            {formatPercentage(item.sentiment_breakdown.neutral, 0)}
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Negative</Text>
          <Text style={[styles.statValue, { color: colors.negative }]}>
            {formatPercentage(item.sentiment_breakdown.negative, 0)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && history.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {error && (
        <ErrorMessage
          message={error}
          onDismiss={() => dispatch(setError(null))}
          onRetry={loadHistory}
        />
      )}

      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyTitle}>No Analysis History</Text>
          <Text style={styles.emptyDescription}>
            Analyze Instagram posts to see your analysis history here
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.emptyButtonText}>Start Analyzing</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.analysis_id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.secondary]}
              tintColor={colors.secondary}
            />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyButtonText: {
    color: colors.surface,
    fontWeight: '600',
  },
  historyItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  satisfactionScore: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.secondary,
  },
  itemDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  postUrl: {
    fontSize: 12,
    color: colors.secondary,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
});

export default HistoryScreen;
