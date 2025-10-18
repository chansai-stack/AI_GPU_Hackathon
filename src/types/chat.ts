/**
 * AI Chat - Type Definitions
 */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  confidence?: number;
  timestamp: Date;
}

export interface ChatConversation {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIResponse {
  answer: string;
  confidence: number;
  timestamp: Date;
  error?: string;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
  category: 'pricing' | 'timing' | 'comparison' | 'strategy';
  icon?: string;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}
