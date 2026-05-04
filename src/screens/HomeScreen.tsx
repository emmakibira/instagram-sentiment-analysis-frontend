/**
 * Home Screen - Main entry point for Instagram URL input
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  setLoading,
  setCurrentAnalysis,
  setError,
  setConnected,
} from '@redux/store';
import APIClient from '@services/api';
import LoadingIndicator from '@components/LoadingIndicator';
import ErrorMessage from '@components/ErrorMessage';
import { colors, isValidInstagramUrl } from '@utils/helpers';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [url, setUrl] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { loading, isConnected } = useAppSelector((state) => state.analysis);

  useEffect(() => {
    // Check backend connectivity on mount
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const available = await APIClient.isBackendAvailable();
      dispatch(setConnected(available));

      if (!available) {
        setLocalError('Backend server is not available. Please start the Flask server.');
      }
    } catch (err) {
      dispatch(setConnected(false));
      setLocalError('Unable to connect to backend.');
    }
  };

  const handleAnalyze = async () => {
    // Clear previous errors
    setLocalError(null);
    dispatch(setError(null));

    // Validation
    if (!url.trim()) {
      setLocalError('Please enter an Instagram post URL');
      return;
    }

    if (!isValidInstagramUrl(url)) {
      setLocalError(
        'Invalid Instagram URL. Please use a valid post, reel, or TV URL.'
      );
      return;
    }

    if (!isConnected) {
      setLocalError('Backend server is not available. Please check your connection.');
      return;
    }

    try {
      dispatch(setLoading(true));
      const result = await APIClient.analyzePost(url);
      dispatch(setCurrentAnalysis(result));
      // Navigate to analysis screen
      navigation.navigate('Analysis');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze post';
      setLocalError(errorMessage);
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>📊 Sentiment Analyzer</Text>
          <Text style={styles.appSubtitle}>
            Analyze Instagram comments for customer satisfaction
          </Text>
        </View>

        {/* Connection Status */}
        {!isConnected && (
          <View style={styles.connectionWarning}>
            <Text style={styles.warningText}>
              ⚠️ Backend server is offline. Please ensure the Flask server is running on
              localhost:5000
            </Text>
          </View>
        )}

        {/* Error Messages */}
        {localError && (
          <ErrorMessage
            message={localError}
            onDismiss={() => setLocalError(null)}
            onRetry={() => {
              if (!isConnected) {
                checkBackendConnection();
              } else {
                handleAnalyze();
              }
            }}
          />
        )}

        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Instagram Post URL</Text>
          <TextInput
            style={styles.input}
            placeholder="https://www.instagram.com/p/ABC123DEF456/"
            placeholderTextColor={colors.textSecondary}
            value={url}
            onChangeText={setUrl}
            editable={!loading}
            multiline={false}
          />

          <Text style={styles.helperText}>
            Paste the URL of an Instagram post, reel, or TV video
          </Text>
        </View>

        {/* Analyze Button */}
        <TouchableOpacity
          style={[
            styles.analyzeButton,
            {
              opacity: loading || !isConnected ? 0.5 : 1,
            },
          ]}
          onPress={handleAnalyze}
          disabled={loading || !isConnected}
        >
          {loading ? (
            <LoadingIndicator size="small" color={colors.surface} />
          ) : (
            <Text style={styles.analyzeButtonText}>Analyze Post</Text>
          )}
        </TouchableOpacity>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featureTitle}>Features</Text>

          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🤖</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>AI-Powered Analysis</Text>
              <Text style={styles.featureDescription}>
                Advanced sentiment classification using machine learning
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>📊</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Detailed Breakdown</Text>
              <Text style={styles.featureDescription}>
                Sentiment distribution with confidence scores
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>💾</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>History Tracking</Text>
              <Text style={styles.featureDescription}>
                Save and review all your past analyses
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          {isConnected ? '✓ Connected to backend' : '✗ Backend offline'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  connectionWarning: {
    backgroundColor: '#FEE2E2',
    borderLeftColor: colors.negative,
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  warningText: {
    fontSize: 12,
    color: '#991B1B',
    lineHeight: 16,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  analyzeButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  analyzeButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    gap: 12,
    alignItems: 'flex-start',
  },
  featureEmoji: {
    fontSize: 24,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  footer: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default HomeScreen;
