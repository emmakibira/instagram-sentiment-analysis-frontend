/**
 * Comments Screen - Display all comments from an analysis
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CommentList from '@components/CommentList';
import { colors } from '@utils/helpers';
import { Comment } from '@/types/index';

const CommentsScreen: React.FC<{ route: any }> = ({ route }) => {
  const { comments } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Comments List */}
        <CommentList
          comments={comments}
          filter="all"
          maxDisplay={comments.length}
        />
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
  filterContainer: {
    marginVertical: 16,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 12,
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  filterButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  filterButtonTextActive: {
    color: colors.surface,
  },
});

export default CommentsScreen;
