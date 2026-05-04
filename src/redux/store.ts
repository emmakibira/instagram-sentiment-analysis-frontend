/**
 * Redux Store Configuration
 */

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, AnalysisResult, AnalysisHistory } from '@/types/index';

const initialState: AppState = {
  currentAnalysis: null,
  history: [],
  loading: false,
  error: null,
  isConnected: false,
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Analysis actions
    setCurrentAnalysis: (state, action: PayloadAction<AnalysisResult>) => {
      state.currentAnalysis = action.payload;
      state.error = null;
      state.loading = false;
    },

    clearCurrentAnalysis: (state) => {
      state.currentAnalysis = null;
    },

    // History actions
    setHistory: (state, action: PayloadAction<AnalysisHistory[]>) => {
      state.history = action.payload;
    },

    addToHistory: (state, action: PayloadAction<AnalysisHistory>) => {
      // Add to beginning of array
      state.history.unshift(action.payload);
    },

    clearHistory: (state) => {
      state.history = [];
    },

    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter((item) => item.analysis_id !== action.payload);
    },

    // Error handling
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Connection status
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },

    // Reset state
    resetState: () => initialState,
  },
});

export const {
  setLoading,
  setCurrentAnalysis,
  clearCurrentAnalysis,
  setHistory,
  addToHistory,
  clearHistory,
  removeFromHistory,
  setError,
  setConnected,
  resetState,
} = analysisSlice.actions;

export const store = configureStore({
  reducer: {
    analysis: analysisSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
