/**
 * API Service for Backend Communication
 */

import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { AnalyzeResponse, HistoryResponse, HealthCheckResponse } from '@/types/index';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_TIMEOUT = parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '30000', 10);

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error: AxiosError) => {
        console.error('[API] Request error:', error.message);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`[API] Response ${response.status}:`, response.data);
        return response;
      },
      (error: AxiosError) => {
        console.error('[API] Response error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Analyze Instagram post comments for sentiment
   */
  async analyzePost(postUrl: string): Promise<AnalyzeResponse> {
    try {
      const response = await this.client.post<AnalyzeResponse>('/analyze', {
        post_url: postUrl,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get all analysis history
   */
  async getHistory(): Promise<HistoryResponse> {
    try {
      const response = await this.client.get<HistoryResponse>('/history');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get specific analysis by ID
   */
  async getAnalysis(analysisId: string): Promise<AnalyzeResponse> {
    try {
      const response = await this.client.get<AnalyzeResponse>(`/history/${analysisId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<HealthCheckResponse> {
    try {
      const response = await this.client.get<HealthCheckResponse>('/health');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Check if backend is available
   */
  async isBackendAvailable(): Promise<boolean> {
    try {
      await this.healthCheck();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Handle API errors
   */
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      const status = error.response?.status;

      if (status === 400) {
        return new Error(`Invalid input: ${message}`);
      } else if (status === 404) {
        return new Error('Resource not found');
      } else if (status === 500) {
        return new Error('Server error. Please try again later.');
      } else if (!error.response) {
        return new Error('Network error. Please check your connection.');
      }

      return new Error(message || 'An error occurred');
    }

    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
}

export default new APIClient();
