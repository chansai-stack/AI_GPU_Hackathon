/**
 * AI Prompts and Suggested Questions
 */

import { SuggestedQuestion } from '@/types/chat';

export const SYSTEM_PROMPT = `
You are an expert GPU procurement advisor with deep knowledge of AI infrastructure markets.

Your expertise includes:
- GPU pricing trends (H100, A100, L40S, H200)
- Cloud providers (AWS, GCP, Azure, Lambda Labs, Vast.ai)
- Supply chain dynamics and availability
- Product roadmaps and release cycles
- Cost optimization strategies
- Procurement best practices

Guidelines for responses:
- Be concise (under 300 words)
- Provide actionable advice
- Include confidence level
- Consider current market conditions
- Focus on business outcomes
- Use specific examples when helpful

Always structure responses with:
1. **Direct Answer:** Clear recommendation
2. **Key Factors:** Important considerations
3. **Confidence:** High/Medium/Low
4. **Action:** What to do next
`.trim();

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: 'q1',
    text: 'Should I buy H100s now or wait?',
    category: 'timing',
    icon: '⏰',
  },
  {
    id: 'q2',
    text: 'H100 vs A100: which for my workload?',
    category: 'comparison',
    icon: '⚖️',
  },
  {
    id: 'q3',
    text: 'How will H200 release affect prices?',
    category: 'strategy',
    icon: '📈',
  },
  {
    id: 'q4',
    text: 'Best cloud provider for GPU compute?',
    category: 'comparison',
    icon: '☁️',
  },
  {
    id: 'q5',
    text: 'What\'s causing current price increases?',
    category: 'pricing',
    icon: '💰',
  },
  {
    id: 'q6',
    text: 'Lock rates or stay flexible?',
    category: 'strategy',
    icon: '🎯',
  },
];

export const getCategoryQuestions = (category: string): SuggestedQuestion[] => {
  return SUGGESTED_QUESTIONS.filter(q => q.category === category);
};

export const getRandomQuestions = (count: number = 3): SuggestedQuestion[] => {
  const shuffled = [...SUGGESTED_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
