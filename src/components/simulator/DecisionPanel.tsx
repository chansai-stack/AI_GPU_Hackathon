/**
 * DecisionPanel Component
 * Handles player decision inputs (Buy, Wait, Lock)
 */

import { useState } from 'react';
import { GameState, DecisionAction } from '@/types/simulator';
import { processDecision } from '@/lib/simulator/gameEngine';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface DecisionPanelProps {
  gameState: GameState;
  onDecisionMade: (newState: GameState) => void;
}

const DecisionPanel = ({ gameState, onDecisionMade }: DecisionPanelProps) => {
  const [gpuAmount, setGpuAmount] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentPrice = gameState.lockedPrice || gameState.currentPrice;
  const costPerGPU = currentPrice * 720 * 12; // 720 hrs/month * 12 months
  const totalCost = costPerGPU * gpuAmount;
  const canAfford = totalCost <= gameState.budget;

  const handleDecision = async (action: DecisionAction) => {
    setIsProcessing(true);

    try {
      let result;

      if (action === 'buy_now') {
        result = processDecision(gameState, action, gpuAmount);
        toast.success(`Purchased ${gpuAmount} GPUs for $${Math.round(totalCost).toLocaleString()}!`);
      } else if (action === 'wait') {
        result = processDecision(gameState, action);
        toast.info('Waiting for next week...');
      } else if (action === 'lock_rate') {
        if (gameState.lockedPrice) {
          toast.error('You already have a locked rate!');
          setIsProcessing(false);
          return;
        }
        result = processDecision(gameState, action);
        toast.success(`Locked rate at $${currentPrice.toFixed(2)}/hr for 4 weeks!`);
      }

      if (result) {
        onDecisionMade(result.newState);
      }
    } catch (error: any) {
      toast.error(error.message || 'Decision failed');
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">
        🎯 Make Your Decision
      </h3>

      {/* GPU Amount Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          How many H100 GPUs?
        </label>
        
        <div className="flex items-center gap-4 mb-2">
          <Slider
            value={[gpuAmount]}
            onValueChange={(value) => setGpuAmount(value[0])}
            min={1}
            max={50}
            step={1}
            className="flex-1"
          />
          <Input
            type="number"
            value={gpuAmount}
            onChange={(e) => setGpuAmount(Number(e.target.value))}
            min={1}
            max={50}
            className="w-20"
          />
        </div>

        {/* Cost breakdown */}
        <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">Price per GPU:</span>
            <span className="font-medium">
              ${currentPrice.toFixed(2)}/hr
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">12-month cost per GPU:</span>
            <span className="font-medium">
              ${Math.round(costPerGPU).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="font-semibold">Total Cost ({gpuAmount} GPUs):</span>
            <span className={`font-bold ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.round(totalCost).toLocaleString()}
            </span>
          </div>
          {!canAfford && (
            <div className="text-red-600 text-xs">
              ⚠️ Exceeds budget by ${Math.round(totalCost - gameState.budget).toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Decision Buttons */}
      <div className="grid grid-cols-1 gap-3">
        <Button
          onClick={() => handleDecision('buy_now')}
          disabled={!canAfford || isProcessing}
          size="lg"
          className="w-full"
        >
          💰 Buy Now at ${currentPrice.toFixed(2)}/hr
        </Button>

        <Button
          onClick={() => handleDecision('lock_rate')}
          disabled={!!gameState.lockedPrice || isProcessing}
          variant="outline"
          size="lg"
          className="w-full"
        >
          🔒 Lock This Rate (4 weeks)
        </Button>

        <Button
          onClick={() => handleDecision('wait')}
          disabled={isProcessing}
          variant="ghost"
          size="lg"
          className="w-full"
        >
          ⏭️ Wait - See Next Week
        </Button>
      </div>

      {/* Action explanations */}
      <div className="mt-4 space-y-2 text-xs text-gray-600">
        <p>
          <strong>Buy Now:</strong> Purchase GPUs at current/locked price
        </p>
        <p>
          <strong>Lock Rate:</strong> Reserve current price for 4 weeks without buying
        </p>
        <p>
          <strong>Wait:</strong> Skip to next week to see if prices improve
        </p>
      </div>
    </Card>
  );
};

export default DecisionPanel;
