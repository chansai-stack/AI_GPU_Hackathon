/**
 * Simulator Page
 * Entry point for the GPU Market Simulator feature
 */

import GameBoard from '@/components/simulator/GameBoard';

const Simulator = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <GameBoard />
    </div>
  );
};

export default Simulator;
```

---

## ✅ SIMULATOR FEATURE COMPLETE!

**Files created:**
```
✅ docs/02-simulator.md
✅ src/types/simulator.ts
✅ src/lib/simulator/gameEngine.ts
✅ src/components/simulator/GameBoard.tsx
✅ src/components/simulator/DecisionPanel.tsx
✅ src/components/simulator/ScoreCard.tsx
✅ src/components/simulator/MarketEvents.tsx
✅ src/pages/Simulator.tsx
```

---

## 🧪 TESTING CHECKLIST:
```
□ Can start a new game
□ Prices change each week
□ Can buy GPUs (budget decreases)
□ Can lock rates (lock indicator shows)
□ Can wait (week advances)
□ Events appear randomly
□ Score updates correctly
□ Game ends at week 12
□ Final results screen shows
□ Can start new game from results
