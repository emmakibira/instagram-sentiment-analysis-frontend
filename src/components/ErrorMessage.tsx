/**
 * Error Message Component
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@utils/helpers';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>

      <View style={styles.buttonContainer}>
        {onRetry && (
          <TouchableOpacity
            style={[styles.button, styles.retryButton]}
            onPress={onRetry}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        )}

        {onDismiss && (
          <TouchableOpacity
            style={[styles.button, styles.dismissButton]}
            onPress={onDismiss}
          >
            <Text style={styles.dismissButtonText}>Dismiss</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: colors.negative,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButton: {
    backgroundColor: colors.secondary,
  },
  retryButtonText: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: 12,
  },
  dismissButton: {
    backgroundColor: colors.border,
  },
  dismissButtonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 12,
  },
});

export default ErrorMessage;
