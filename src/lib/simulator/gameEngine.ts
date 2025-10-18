/**
 * GPU Market Simulator - Core Game Engine
 * Handles game state, logic, and calculations
 */

import { GameState, GameEvent, Decision, GameConfig, EventType, DecisionAction } from '@/types/simulator';

// Game configuration
export const GAME_CONFIG: GameConfig = {
  totalWeeks: 12,
  startingBudget: 500000,
  baseH100Price: 4.50,
  priceVolatility: 0.10,
  eventProbability: 0.30,
  lockRateDuration: 4,
};

// Initialize new game
export const initializeGame = (): GameState => {
  return {
    week: 1,
    budget: GAME_CONFIG.startingBudget,
    gpusOwned: 0,
    score: 0,
    currentPrice: GAME_CONFIG.baseH100Price,
    events: [],
    decisions: [],
    isGameOver: false,
  };
};

// Generate random market event
export const generateEvent = (week: number): GameEvent | null => {
  // 30% chance of event each week
  if (Math.random() > GAME_CONFIG.eventProbability) {
    return null;
  }

  const eventTypes: Array<{
    type: EventType;
    title: string;
    description: string;
    priceImpact: number;
    probability: number;
  }> = [
    {
      type: 'supply_shock',
      title: 'Supply Chain Disruption',
      description: 'Manufacturing delays in Taiwan affect GPU availability',
      priceImpact: 1.25,
      probability: 0.35,
    },
    {
      type: 'new_capacity',
      title: 'New Data Center Capacity',
      description: 'Major cloud provider announces expanded GPU fleet',
      priceImpact: 0.85,
      probability: 0.30,
    },
    {
      type: 'h200_leak',
      title: 'H200 Release Rumors',
      description: 'Leaked benchmarks show H200 performance gains',
      priceImpact: 1.15,
      probability: 0.15,
    },
    {
      type: 'market_crash',
      title: 'Market Correction',
      description: 'Decreased AI investment leads to price drops',
      priceImpact: 0.70,
      probability: 0.10,
    },
    {
      type: 'hyperscaler_buy',
      title: 'Massive Purchase Order',
      description: 'Tech giant buys 50,000 H100s, tightening supply',
      priceImpact: 1.30,
      probability: 0.10,
    },
  ];

  // Weighted random selection
  const random = Math.random();
  let cumulative = 0;

  for (const eventDef of eventTypes) {
    cumulative += eventDef.probability;
    if (random <= cumulative) {
      return {
        id: `event-${week}-${Date.now()}`,
        week,
        type: eventDef.type,
        title: eventDef.title,
        description: eventDef.description,
        priceImpact: eventDef.priceImpact,
        timestamp: new Date(),
      };
    }
  }

  return null;
};

// Calculate new price for next week
export const calculateNewPrice = (
  currentPrice: number,
  event: GameEvent | null
): number => {
  // Base volatility (random ±10%)
  const volatilityFactor = 1 + (Math.random() * 2 - 1) * GAME_CONFIG.priceVolatility;
  let newPrice = currentPrice * volatilityFactor;

  // Apply event impact if event occurred
  if (event) {
    newPrice *= event.priceImpact;
  }

  // Floor price at $1.00/hr
  newPrice = Math.max(1.00, newPrice);

  // Round to 2 decimals
  return Math.round(newPrice * 100) / 100;
};

// Process player decision
export const processDecision = (
  state: GameState,
  action: DecisionAction,
  gpusAmount?: number
): { newState: GameState; decision: Decision } => {
  const decision: Decision = {
    id: `decision-${state.week}-${Date.now()}`,
    week: state.week,
    action,
    scoreImpact: 0,
    timestamp: new Date(),
  };

  const newState = { ...state };

  switch (action) {
    case 'buy_now': {
      if (!gpusAmount || gpusAmount <= 0) {
        throw new Error('Invalid GPU amount');
      }

      const price = state.lockedPrice || state.currentPrice;
      const costPerHour = price;
      // Assume 720 hours/month, 12-month commitment
      const totalCost = costPerHour * 720 * 12 * gpusAmount;

      if (totalCost > state.budget) {
        throw new Error('Insufficient budget');
      }

      // Calculate score impact based on timing
      const basePrice = GAME_CONFIG.baseH100Price;
      const priceRatio = price / basePrice;

      let scoreImpact = 0;
      if (priceRatio < 0.90) {
        // Excellent timing (>10% below base)
        scoreImpact = 15;
      } else if (priceRatio < 1.00) {
        // Good timing
        scoreImpact = 10;
      } else if (priceRatio > 1.20) {
        // Poor timing (>20% above base)
        scoreImpact = -10;
      } else if (priceRatio > 1.10) {
        // Bad timing
        scoreImpact = -5;
      }

      // Bonus for using locked rate
      if (state.lockedPrice && price === state.lockedPrice) {
        scoreImpact += 5;
      }

      decision.gpusPurchased = gpusAmount;
      decision.priceAtPurchase = price;
      decision.amountSpent = totalCost;
      decision.scoreImpact = scoreImpact;

      newState.budget -= totalCost;
      newState.gpusOwned += gpusAmount;
      newState.score += scoreImpact;
      newState.lockedPrice = undefined; // Consume lock
      newState.lockedWeeks = undefined;

      break;
    }

    case 'wait': {
      // No action, small penalty for indecision
      decision.scoreImpact = -2;
      newState.score -= 2;
      break;
    }

    case 'lock_rate': {
      if (state.lockedPrice) {
        throw new Error('Rate already locked');
      }

      // Lock current price for 4 weeks
      newState.lockedPrice = state.currentPrice;
      newState.lockedWeeks = GAME_CONFIG.lockRateDuration;
      decision.scoreImpact = 5; // Small bonus for planning
      newState.score += 5;
      break;
    }
  }

  newState.decisions.push(decision);

  return { newState, decision };
};

// Advance to next week
export const advanceWeek = (state: GameState): GameState => {
  if (state.week >= GAME_CONFIG.totalWeeks) {
    return {
      ...state,
      isGameOver: true,
    };
  }

  // Generate event
  const event = generateEvent(state.week + 1);

  // Calculate new price
  const newPrice = calculateNewPrice(state.currentPrice, event);

  // Decrement locked weeks
  const newLockedWeeks = state.lockedWeeks ? state.lockedWeeks - 1 : undefined;
  const stillLocked = newLockedWeeks && newLockedWeeks > 0;

  const newState: GameState = {
    ...state,
    week: state.week + 1,
    currentPrice: newPrice,
    lockedWeeks: stillLocked ? newLockedWeeks : undefined,
    lockedPrice: stillLocked ? state.lockedPrice : undefined,
    events: event ? [...state.events, event] : state.events,
  };

  // Check if game is over
  if (newState.week >= GAME_CONFIG.totalWeeks) {
    newState.isGameOver = true;
  }

  return newState;
};

// Calculate final grade
export const calculateGrade = (score: number): string => {
  if (score >= 100) return 'Expert Procurement Officer';
  if (score >= 75) return 'Strategic Buyer';
  if (score >= 50) return 'Learning the Market';
  return 'Needs More Practice';
};

// Save game state to localStorage
export const saveGame = (state: GameState): void => {
  localStorage.setItem('gpuwise_simulator_state', JSON.stringify(state));
};

// Load game state from localStorage
export const loadGame = (): GameState | null => {
  const saved = localStorage.getItem('gpuwise_simulator_state');
  if (!saved) return null;

  try {
    return JSON.parse(saved) as GameState;
  } catch {
    return null;
  }
};

// Reset game
export const resetGame = (): void => {
  localStorage.removeItem('gpuwise_simulator_state');
};
```

---

## ✅ FILES CREATED SO FAR:
```
✅ docs/02-simulator.md           (Documentation)
✅ src/types/simulator.ts          (TypeScript types)
✅ src/lib/simulator/gameEngine.ts (Core logic)
```

---

## 🎯 NEXT FILES TO CREATE:

In the next message, I'll provide:
1. `src/components/simulator/GameBoard.tsx` (Main UI)
2. `src/components/simulator/DecisionPanel.tsx` (Buttons)
3. `src/components/simulator/ScoreCard.tsx` (Score display)
4. `src/pages/Simulator.tsx` (Page component)

---

## 💬 CONFIRMATION:

**Have you created these 3 files?**
```
□ docs/02-simulator.md
□ src/types/simulator.ts
□ src/lib/simulator/gameEngine.ts
