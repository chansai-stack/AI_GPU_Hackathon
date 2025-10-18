/**
 * Scenario Engine
 * Pre-built scenarios and analysis logic
 */

import { Scenario } from '@/types/scenario';

export const SCENARIOS: Scenario[] = [
  {
    id: 'h200-early-release',
    name: 'H200 Early Release',
    description: 'NVIDIA announces H200 availability 2 months ahead of schedule',
    category: 'technology',
    icon: '🚀',
    impact: {
      h100_price_change: '+25-30% surge',
      a100_price_change: '-10-15% drop',
      l40s_price_change: '+5-10% increase',
      availability: 'tight',
      volatility: 'extreme',
      timeline: '2-4 weeks',
    },
    confidence: 85,
    probability: 'medium',
    recommendation: {
      action: 'Lock H100 rates immediately before announcement. H200 will be expensive initially.',
      urgency: 'critical',
      timeline: 'This week',
      risk_level: 'high',
    },
  },
  {
    id: 'supply-disruption',
    name: 'Supply Chain Disruption',
    description: 'Taiwan manufacturing delays affect GPU production for 3-6 months',
    category: 'supply',
    icon: '⚠️',
    impact: {
      h100_price_change: '+40-50% spike',
      a100_price_change: '+30-40% increase',
      l40s_price_change: '+25-35% increase',
      availability: 'critical',
      volatility: 'extreme',
      timeline: '1-2 weeks onset',
    },
    confidence: 72,
    probability: 'medium',
    recommendation: {
      action: 'Secure capacity immediately. Prices will remain elevated for 6+ months.',
      urgency: 'critical',
      timeline: 'Immediate',
      risk_level: 'high',
    },
  },
  {
    id: 'hyperscaler-capacity',
    name: 'New Hyperscaler Capacity',
    description: 'Major cloud provider releases 50,000 GPUs to open market',
    category: 'supply',
    icon: '📈',
    impact: {
      h100_price_change: '-15-20% decrease',
      a100_price_change: '-10-15% decrease',
      l40s_price_change: '-5-10% decrease',
      availability: 'abundant',
      volatility: 'low',
      timeline: '4-6 weeks',
    },
    confidence: 90,
    probability: 'high',
    recommendation: {
      action: 'Wait 3-4 weeks for optimal pricing. Market will stabilize at lower levels.',
      urgency: 'low',
      timeline: '3-4 weeks',
      risk_level: 'low',
    },
  },
  {
    id: 'market-crash',
    name: 'AI Investment Slowdown',
    description: 'Decreased AI/ML investment leads to GPU demand collapse',
    category: 'demand',
    icon: '📉',
    impact: {
      h100_price_change: '-30-40% crash',
      a100_price_change: '-25-35% drop',
      l40s_price_change: '-20-30% decline',
      availability: 'abundant',
      volatility: 'high',
      timeline: '6-8 weeks',
    },
    confidence: 45,
    probability: 'low',
    recommendation: {
      action: 'If possible, delay purchases 2-3 months to capture lower prices.',
      urgency: 'low',
      timeline: '2-3 months',
      risk_level: 'medium',
    },
  },
  {
    id: 'h200-production-issues',
    name: 'H200 Production Delays',
    description: 'Poor H200 chip yields force NVIDIA to extend H100 production',
    category: 'technology',
    icon: '🔧',
    impact: {
      h100_price_change: 'Stable to -5%',
      a100_price_change: '-5-10% decrease',
      l40s_price_change: 'Stable',
      availability: 'normal',
      volatility: 'low',
      timeline: '8-12 weeks',
    },
    confidence: 65,
    probability: 'medium',
    recommendation: {
      action: 'Continue standard H100 procurement. No urgency, H100 will remain available.',
      urgency: 'low',
      timeline: 'Normal cadence',
      risk_level: 'low',
    },
  },
];

/**
 * Get scenario by ID
 */
export const getScenarioById = (id: string): Scenario | undefined => {
  return SCENARIOS.find((s) => s.id === id);
};

/**
 * Get scenarios by category
 */
export const getScenariosByCategory = (category: string): Scenario[] => {
  return SCENARIOS.filter((s) => s.category === category);
};
