/**
 * Type definitions for Instagram Sentiment Analysis App
 */

export interface SentimentResult {
  label: 'positive' | 'negative' | 'neutral';
  confidence: number;
  raw_label?: string;
  method?: string;
}

export interface Comment {
  text: string;
  cleaned_text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

export interface SentimentBreakdown {
  positive: number;
  neutral: number;
  negative: number;
}

export interface AnalysisResult {
  analysis_id: string;
  post_url: string;
  total_comments: number;
  satisfaction_score: number;
  sentiment_breakdown: SentimentBreakdown;
  comments: Comment[];
  analyzed_at: string;
}

export interface AnalysisHistory extends Omit<AnalysisResult, 'comments'> {
  // Simplified version without comments array for history list
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AnalyzeRequest {
  post_url: string;
}

export interface AnalyzeResponse {
  analysis_id: string;
  post_url: string;
  total_comments: number;
  satisfaction_score: number;
  sentiment_breakdown: SentimentBreakdown;
  comments: Comment[];
  analyzed_at: string;
}

export interface HistoryResponse extends Array<AnalysisHistory> {}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp?: string;
}

export interface AppState {
  currentAnalysis: AnalysisResult | null;
  history: AnalysisHistory[];
  loading: boolean;
  error: string | null;
  isConnected: boolean;
}

export interface SentimentColor {
  positive: string;
  neutral: string;
  negative: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    color?: (opacity: number) => string;
  }>;
}
