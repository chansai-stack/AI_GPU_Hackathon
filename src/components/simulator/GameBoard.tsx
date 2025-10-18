/**
 * GameBoard Component
 * Main UI container for the GPU Market Simulator
 */

import { useState, useEffect } from 'react';
import { GameState } from '@/types/simulator';
import {
  initializeGame,
  advanceWeek,
  saveGame,
  loadGame,
  resetGame,
  calculateGrade,
} from '@/lib/simulator/gameEngine';
import DecisionPanel from './DecisionPanel';
import ScoreCard from './ScoreCard';
import MarketEvents from './MarketEvents';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const GameBoard = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Try to load saved game, otherwise start new
    const savedGame = loadGame();
    return savedGame || initializeGame();
  });

  const [showResult, setShowResult] = useState(false);

  // Auto-save game state
  useEffect(() => {
    saveGame(gameState);
  }, [gameState]);

  // Handle new game
  const handleNewGame = () => {
    resetGame();
    setGameState(initializeGame());
    setShowResult(false);
  };

  // Handle decision made
  const handleDecisionMade = (newState: GameState) => {
    // Update state with decision
    setGameState(newState);

    // Small delay before advancing week
    setTimeout(() => {
      const nextWeekState = advanceWeek(newState);
      setGameState(nextWeekState);

      // Check if game is over
      if (nextWeekState.isGameOver) {
        setShowResult(true);
      }
    }, 1000);
  };

  // Game over screen
  if (showResult || gameState.isGameOver) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            🎉 Game Complete!
          </h2>
          
          <div className="space-y-4 mb-8">
            <div className="text-6xl font-bold text-purple-600">
              {gameState.score}
            </div>
            <div className="text-xl text-gray-600">
              {calculateGrade(gameState.score)}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div>
              <div className="text-2xl font-bold">
                {gameState.gpusOwned}
              </div>
              <div className="text-sm text-gray-600">
                GPUs Purchased
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                ${Math.round(gameState.budget).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                Budget Remaining
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {gameState.decisions.length}
              </div>
              <div className="text-sm text-gray-600">
                Decisions Made
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Performance Summary</h3>
            <div className="text-left space-y-2 bg-gray-50 p-4 rounded">
              {gameState.decisions
                .filter(d => d.action === 'buy_now')
                .map((decision, idx) => (
                  <div key={decision.id} className="text-sm">
                    <span className="font-medium">Week {decision.week}:</span> 
                    {' '}Bought {decision.gpusPurchased} GPUs at ${decision.priceAtPurchase}/hr
                    {' '}
                    <span className={decision.scoreImpact > 0 ? 'text-green-600' : 'text-red-600'}>
                      ({decision.scoreImpact > 0 ? '+' : ''}{decision.scoreImpact} pts)
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <Button
            onClick={handleNewGame}
            className="mt-8 w-full"
            size="lg"
          >
            🎮 Play Again
          </Button>
        </Card>
      </div>
    );
  }

  // Active game screen
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">GPU Market Simulator</h1>
          <p className="text-gray-600">
            Week {gameState.week} of 12 • Act as CTO making procurement decisions
          </p>
        </div>
        <Button
          onClick={handleNewGame}
          variant="outline"
        >
          New Game
        </Button>
      </div>

      {/* Main game area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Score and events */}
        <div className="space-y-6">
          <ScoreCard gameState={gameState} />
          <MarketEvents events={gameState.events.slice(-5)} />
        </div>

        {/* Right column - Market info and decisions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Market Status */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              📊 Current Market Status
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">
                  H100 Price
                </div>
                <div className="text-3xl font-bold text-purple-600">
                  ${gameState.currentPrice.toFixed(2)}/hr
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  ~${Math.round(gameState.currentPrice * 720)}/month per GPU
                </div>
              </div>

              <div className="bg-teal-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">
                  Your Budget
                </div>
                <div className="text-3xl font-bold text-teal-600">
                  ${Math.round(gameState.budget / 1000)}K
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  of $500K initial budget
                </div>
              </div>
            </div>

            {/* Locked rate indicator */}
            {gameState.lockedPrice && (
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600">🔒</span>
                  <div className="text-sm">
                    <strong>Rate Locked:</strong> ${gameState.lockedPrice.toFixed(2)}/hr
                    {' '}for {gameState.lockedWeeks} more weeks
                  </div>
                </div>
              </div>
            )}

            {/* Week progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>Week {gameState.week} / 12</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${(gameState.week / 12) * 100}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Decision Panel */}
          <DecisionPanel
            gameState={gameState}
            onDecisionMade={handleDecisionMade}
          />

          {/* Help text */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Watch for market events and price trends. 
              Buying at the right time can save millions. Lock rates when prices are low!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
