/**
 * GPU Market Simulator - Type Definitions
 * Defines all TypeScript interfaces and types for the simulator
 */

export interface GameState {
  week: number;              // Current week (1-12)
  budget: number;            // Remaining budget in USD
  gpusOwned: number;         // Number of GPUs purchased
  score: number;             // Current score (0-100+)
  currentPrice: number;      // Current H100 price per hour
  lockedPrice?: number;      // Locked rate if user locked
  lockedWeeks?: number;      // Weeks remaining on lock
  events: GameEvent[];       // History of events
  decisions: Decision[];     // History of decisions
  isGameOver: boolean;       // Game completed flag
}

export interface GameEvent {
  id: string;
  week: number;
  type: EventType;
  title: string;
  description: string;
  priceImpact: number;       // Multiplier (e.g., 1.25 = +25%)
  timestamp: Date;
}

export type EventType =
  | 'supply_shock'           // Prices increase
  | 'new_capacity'           // Prices decrease
  | 'h200_leak'              // H200 rumors, prices spike
  | 'market_crash'           // Significant drop
  | 'hyperscaler_buy'        // Large purchase, prices up
  | 'none';                  // No event

export interface Decision {
  id: string;
  week: number;
  action: DecisionAction;
  gpusPurchased?: number;
  priceAtPurchase?: number;
  amountSpent?: number;
  scoreImpact: number;
  timestamp: Date;
}

export type DecisionAction =
  | 'buy_now'               // Purchase at current price
  | 'wait'                  // Skip this week
  | 'lock_rate';            // Lock current price

export interface GameConfig {
  totalWeeks: number;
  startingBudget: number;
  baseH100Price: number;
  priceVolatility: number;
  eventProbability: number;
  lockRateDuration: number; // Weeks lock is valid
}

export interface ScoreBreakdown {
  timingScore: number;      // How well timed purchases were
  budgetScore: number;      // Budget efficiency
  riskScore: number;        // Risk management
  totalScore: number;
  grade: Grade;
}

export type Grade =
  | 'Expert'                // 100+
  | 'Strategic'             // 75-99
  | 'Learning'              // 50-74
  | 'Novice';               // <50

export interface PriceHistory {
  week: number;
  price: number;
  event?: EventType;
}

export interface GameStats {
  gamesPlayed: number;
  averageScore: number;
  highScore: number;
  totalGPUsPurchased: number;
  averagePricePerGPU: number;
}
