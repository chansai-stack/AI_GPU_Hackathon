/**
 * MarketEvents Component
 * Displays recent market events
 */

import { GameEvent } from '@/types/simulator';
import { Card } from '@/components/ui/card';
import { AlertCircle, TrendingUp, TrendingDown, Zap } from 'lucide-react';

interface MarketEventsProps {
  events: GameEvent[];
}

const MarketEvents = ({ events }: MarketEventsProps) => {
  const getEventIcon = (impact: number) => {
    if (impact > 1.1) return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (impact < 0.9) return <TrendingDown className="w-4 h-4 text-green-500" />;
    return <Zap className="w-4 h-4 text-yellow-500" />;
  };

  const getEventColor = (impact: number) => {
    if (impact > 1.1) return 'border-l-red-500 bg-red-50';
    if (impact < 0.9) return 'border-l-green-500 bg-green-50';
    return 'border-l-yellow-500 bg-yellow-50';
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-blue-500" />
        Market Events
      </h3>

      {events.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">
          No events yet. Markets are stable.
        </p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className={`p-3 border-l-4 rounded ${getEventColor(event.priceImpact)}`}
            >
              <div className="flex items-start gap-2">
                {getEventIcon(event.priceImpact)}
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {event.title}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {event.description}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="text-gray-500">
                      Week {event.week}
                    </span>
                    <span className={`font-semibold ${
                      event.priceImpact > 1 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {event.priceImpact > 1 ? '+' : ''}
                      {Math.round((event.priceImpact - 1) * 100)}% price impact
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default MarketEvents;
