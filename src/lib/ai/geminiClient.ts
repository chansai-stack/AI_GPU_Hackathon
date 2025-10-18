/**
 * Gemini AI Client
 * Handles communication with Gemini API via Supabase Edge Function
 */

import { createClient } from '@supabase/supabase-js';
import { AIResponse } from '@/types/chat';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/**
 * Send question to AI and get response
 */
export const askAI = async (question: string): Promise<AIResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('chat-ai', {
      body: { question },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data || !data.answer) {
      throw new Error('Invalid response from AI');
    }

    // Extract confidence from response
    const confidence = extractConfidence(data.answer);

    return {
      answer: data.answer,
      confidence,
      timestamp: new Date(),
    };
  } catch (error: any) {
    console.error('AI request failed:', error);
    
    return {
      answer: "I'm having trouble connecting to the AI service right now. Please try again in a moment.",
      confidence: 0,
      timestamp: new Date(),
      error: error.message,
    };
  }
};

/**
 * Extract confidence level from AI response
 */
const extractConfidence = (text: string): number => {
  // Look for explicit confidence statements
  const confidenceMatch = text.match(/Confidence:\s*(High|Medium|Low)/i);
  
  if (confidenceMatch) {
    const level = confidenceMatch[1].toLowerCase();
    if (level === 'high') return 90;
    if (level === 'medium') return 70;
    if (level === 'low') return 40;
  }

  // Look for certainty indicators
  if (text.match(/definitely|certainly|clearly|absolutely/i)) {
    return 85;
  }
  if (text.match(/probably|likely|generally|typically/i)) {
    return 70;
  }
  if (text.match(/possibly|maybe|might|could/i)) {
    return 50;
  }

  // Default to medium confidence
  return 70;
};

/**
 * Format question with context (for better responses)
 */
export const formatQuestionWithContext = (question: string): string => {
  const context = `
You are an expert GPU procurement advisor. The user is asking about AI infrastructure and GPU markets.

Current context:
- Date: ${new Date().toLocaleDateString()}
- Market: AI/ML GPU infrastructure
- Focus: H100, A100, L40S GPUs

User question: ${question}

Provide a concise, actionable response (under 300 words) that includes:
1. Direct answer
2. Key considerations
3. Confidence level (High/Medium/Low)
4. Recommended action

Be specific and business-focused.
`.trim();

  return context;
};
