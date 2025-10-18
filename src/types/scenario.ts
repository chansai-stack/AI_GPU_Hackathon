/**
 * Scenario Studio - Type Definitions
 */

export type ScenarioCategory = 'supply' | 'demand' | 'technology' | 'market';
export type Availability = 'abundant' | 'normal' | 'tight' | 'critical';
export type Volatility = 'low' | 'medium' | 'high' | 'extreme';
export type Urgency = 'low' | 'medium' | 'high' | 'critical';
export type RiskLevel = 'low' | 'medium' | 'high';
export type Probability = 'low' | 'medium' | 'high';

export interface Scenario {
  id: string;
  name: string;
  description: string;
  category: ScenarioCategory;
  icon: string;
  
  impact: {
    h100_price_change: string;
    a100_price_change: string;
    l40s_price_change: string;
    availability: Availability;
    volatility: Volatility;
    timeline: string;
  };
  
  confidence: number; // 0-100
  probability: Probability;
  
  recommendation: {
    action: string;
    urgency: Urgency;
    timeline: string;
    risk_level: RiskLevel;
  };
  
  details?: string; // AI-generated detailed analysis
}

export interface ScenarioAnalysis {
  scenario: Scenario;
  generated_insights: string;
  timestamp: Date;
}
