/**
 * ScoreCard Component
 * Displays current game statistics and score
 */

import { GameState } from '@/types/simulator';
import { Card } from '@/components/ui/card';
import { TrendingUp, Cpu, DollarSign, Trophy } from 'lucide-react';

interface ScoreCardProps {
  gameState: GameState;
}

const ScoreCard = ({ gameState }: ScoreCardProps) => {
  const budgetUsedPercent = ((500000 - gameState.budget) / 500000) * 100;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        Your Performance
      </h3>

      <div className="space-y-4">
        {/* Score */}
        <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-teal-50 rounded">
          <div className="text-sm text-gray-600 mb-1">
            Current Score
          </div>
          <div className="text-4xl font-bold text-purple-600">
            {gameState.score}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {gameState.score >= 75 ? '🔥 Excellent!' : 
             gameState.score >= 50 ? '👍 Good progress' : 
             '💪 Keep learning!'}
          </div>
        </div>

        {/* Stats grid */}
        <div className="space-y-3">
          {/* GPUs Owned */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">GPUs Owned</span>
            </div>
            <span className="font-semibold">{gameState.gpusOwned}</span>
          </div>

          {/* Budget */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Budget Left</span>
            </div>
            <span className="font-semibold">
              ${Math.round(gameState.budget / 1000)}K
            </span>
          </div>

          {/* Budget bar */}
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Budget Used</span>
              <span>{Math.round(budgetUsedPercent)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  budgetUsedPercent > 80 ? 'bg-red-500' :
                  budgetUsedPercent > 50 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${budgetUsedPercent}%` }}
              />
            </div>
          </div>

          {/* Decisions made */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Decisions</span>
            </div>
            <span className="font-semibold">
              {gameState.decisions.length}
            </span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="pt-3 border-t text-xs text-gray-600 space-y-1">
          <div>
            Purchases: {gameState.decisions.filter(d => d.action === 'buy_now').length}
          </div>
          <div>
            Rate Locks: {gameState.decisions.filter(d => d.action === 'lock_rate').length}
          </div>
          {gameState.gpusOwned > 0 && (
            <div>
              Avg Cost: ${Math.round((500000 - gameState.budget) / gameState.gpusOwned / 720 / 12 * 100) / 100}/hr
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ScoreCard;
