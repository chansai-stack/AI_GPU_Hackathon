# GPU Market Simulator - Documentation

The signature feature of GPUWISE - an interactive 12-week procurement game.

## 🎯 Overview

The GPU Market Simulator teaches procurement strategy through hands-on experience. Players act as a CTO with a $500K budget making weekly GPU purchasing decisions over 12 weeks.

### Key Learning Outcomes
- Understanding market timing and volatility
- Risk management in procurement
- Budget planning and allocation
- Impact of external events on pricing

---

## 🏗️ Architecture

### Components Structure
```
Simulator (Page)
├── GameBoard (Main UI)
│   ├── DecisionPanel (Buy/Wait/Lock controls)
│   ├── MarketEvents (Event feed)
│   └── ScoreCard (Metrics display)
└── Game Engine (Logic layer)
    ├── State Management
    ├── Event Generator
    └── Price Calculator
```

### State Flow
```
User Action → Decision Handler → Game Engine → State Update → UI Re-render
     ↓              ↓                  ↓            ↓            ↓
  Click Buy → Validate → Calculate → Update Week → Show Result
```

---

## 🎮 Game Mechanics

### Initial State
- **Budget:** $500,000
- **Week:** 1 of 12
- **GPUs Owned:** 0
- **Score:** 0
- **Base H100 Price:** $4.50/hr

### Weekly Cycle

1. **Player sees current market:**
   - Current H100 price (fluctuates ±10%)
   - Available units
   - Current budget
   - Week number

2. **Player makes decision:**
   - **Buy Now** - Purchase GPUs at current price
   - **Wait** - Skip this week, see next week
   - **Lock Rate** - Reserve future capacity at current price

3. **Random event triggers** (30% chance):
   - Major hyperscaler announces capacity
   - Supply chain disruption
   - New GPU model leaked
   - Market crash/surge

4. **Week advances:**
   - Prices recalculate based on volatility
   - Score updates based on decisions
   - Budget adjusts

5. **Repeat until Week 12**

### Scoring System
```typescript
Score Calculation:
- Good timing (buying at low): +15 points
- Bad timing (buying at peak): -10 points
- Locked favorable rate: +20 points
- Budget efficiency: up to +10 points
- Risk management: up to +5 points

Final Grade:
100+: Expert Procurement Officer
75-99: Strategic Buyer
50-74: Learning the Market
<50: Needs More Practice
```

---

## 💻 Implementation

### Core Game Engine

**File:** `src/lib/simulator/gameEngine.ts`

**Responsibilities:**
- Manage game state
- Process player decisions
- Calculate outcomes
- Generate random events
- Update scores

### Price Volatility Model
```typescript
// Weekly price change formula
newPrice = currentPrice * (1 + volatility * randomFactor)

// Where:
// volatility = 0.10 (10% max swing)
// randomFactor = -1 to +1 (random)

// Event multipliers:
// Supply shock: 1.25x (25% increase)
// New capacity: 0.85x (15% decrease)
// Market crash: 0.70x (30% decrease)
```

### Event Probability
```typescript
// Each week: 30% chance of event
const events = [
  { type: 'supply_shock', probability: 0.10, impact: 1.25 },
  { type: 'new_capacity', probability: 0.10, impact: 0.85 },
  { type: 'leak_h200', probability: 0.05, impact: 1.15 },
  { type: 'market_crash', probability: 0.05, impact: 0.70 }
];
```

---

## 🎨 UI Components

### GameBoard Component
- Displays market overview
- Shows current week progress
- Renders decision buttons
- Shows event notifications

### DecisionPanel Component
- Three primary actions: Buy, Wait, Lock
- Purchase amount slider
- Budget preview
- Confirmation dialog

### MarketEvents Component
- Event feed (last 5 events)
- Color-coded by impact (red/green)
- Animated entrance
- Timestamp display

### ScoreCard Component
- Current score
- Budget remaining
- GPUs owned
- Week progress (1-12)
- Performance grade

---

## 🧪 Testing the Simulator

### Manual Test Cases

**Test 1: Complete Game Flow**
```
1. Start new game
2. ✅ Verify initial state (Week 1, $500K, 0 GPUs)
3. Click "Buy Now" with 10 GPUs
4. ✅ Verify budget decreased
5. ✅ Verify GPU count increased
6. Advance through all 12 weeks
7. ✅ Verify final score calculated
8. ✅ Verify grade displayed
```

**Test 2: Event Triggering**
```
1. Play multiple rounds
2. ✅ Verify events appear randomly
3. ✅ Verify prices change after events
4. ✅ Verify event notifications display
```

**Test 3: Budget Constraints**
```
1. Try to buy more GPUs than budget allows
2. ✅ Verify error message
3. ✅ Verify transaction blocked
4. ✅ Verify budget unchanged
```

**Test 4: Lock Rate Feature**
```
1. Click "Lock Rate"
2. ✅ Verify confirmation modal
3. Confirm lock
4. ✅ Verify locked price stored
5. Wait 2 weeks
6. ✅ Verify can buy at locked price
```

---

## 🔧 Configuration

### Adjustable Parameters
```typescript
// In src/lib/simulator/gameEngine.ts

export const GAME_CONFIG = {
  // Game length
  TOTAL_WEEKS: 12,
  
  // Budget
  STARTING_BUDGET: 500000,
  
  // Pricing
  BASE_H100_PRICE: 4.50,
  PRICE_VOLATILITY: 0.10,
  
  // Events
  EVENT_PROBABILITY: 0.30,
  
  // Scoring
  PERFECT_TIMING_BONUS: 15,
  POOR_TIMING_PENALTY: -10,
  LOCK_RATE_BONUS: 20
};
```

### Difficulty Levels (Future Enhancement)
```typescript
// Easy: Lower volatility, more budget
// Medium: Default settings
// Hard: Higher volatility, market crashes, less budget
```

---

## 📊 Data Persistence

### LocalStorage Schema
```typescript
interface SimulatorState {
  week: number;
  budget: number;
  gpusOwned: number;
  score: number;
  currentPrice: number;
  lockedPrice?: number;
  events: GameEvent[];
  decisions: Decision[];
}

// Stored in localStorage as:
localStorage.setItem('gpuwise_simulator_state', JSON.stringify(state));
```

### Save/Load Functionality

- **Auto-save:** After each decision
- **Load on mount:** Restore previous game
- **Reset:** Clear state, start fresh

---

## 🎯 Learning Outcomes

After completing the simulator, users understand:

1. **Market Timing**
   - Recognizing price trends
   - Identifying buying opportunities
   - Avoiding peak pricing

2. **Risk Management**
   - Balancing urgency vs cost
   - Using rate locks strategically
   - Budget allocation strategies

3. **External Factors**
   - How supply shocks affect prices
   - Impact of new product announcements
   - Market volatility patterns

4. **Strategic Planning**
   - Long-term capacity planning
   - Budget distribution over time
   - Contingency planning

---

## 🐛 Known Issues & Solutions

### Issue: Prices go negative
**Cause:** Extreme random volatility
**Fix:** Add floor price check (min $1.00/hr)

### Issue: Events stack too much
**Cause:** Multiple events in sequence
**Fix:** Cool-down period between events (2 weeks)

### Issue: Score becomes negative
**Cause:** Poor decisions early on
**Fix:** Add minimum score of 0

---

## 🚀 Future Enhancements

### Planned Features

1. **Multi-GPU Support**
   - A100, L40S, H200 options
   - Different pricing models
   - Portfolio management

2. **Difficulty Levels**
   - Easy/Medium/Hard modes
   - Adjustable volatility
   - Variable budgets

3. **Leaderboard**
   - Compare scores with others
   - Weekly challenges
   - Achievement badges

4. **Advanced Scenarios**
   - Market crash mode
   - H200 release timing
   - Supply shortage challenge

5. **Tutorial Mode**
   - Guided first playthrough
   - Tips and explanations
   - Best practices coaching

---

## 📚 Related Documentation

- [Architecture Overview](architecture.md)
- [AI Chat Integration](03-ai-chat.md) - Ask questions about simulator results
- [Scenario Studio](08-scenarios.md) - More advanced "what-if" modeling

---

**Next:** [AI Chat Integration →](03-ai-chat.md)
