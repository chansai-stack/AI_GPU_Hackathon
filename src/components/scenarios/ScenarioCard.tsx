/**
 * ScenarioCard Component
 * Displays individual scenario with key metrics
 */

import { Scenario } from '@/types/scenario';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, Zap } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
  onAnalyze: (scenario: Scenario) => void;
}

const ScenarioCard = ({ scenario, onAnalyze }: ScenarioCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      supply: 'bg-orange-100 text-orange-800 border-orange-200',
      demand: 'bg-blue-100 text-blue-800 border-blue-200',
      technology: 'bg-purple-100 text-purple-800 border-purple-200',
      market: 'bg-green-100 text-green-800 border-green-200',
    };
    return colors[category as keyof typeof colors] || colors.market;
  };

  const getProbabilityColor = (probability: string) => {
    if (probability === 'high') return 'bg-red-100 text-red-800';
    if (probability === 'medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getUrgencyIcon = (urgency: string) => {
    if (urgency === 'critical') return <AlertTriangle className="w-4 h-4 text-red-600" />;
    if (urgency === 'high') return <TrendingUp className="w-4 h-4 text-orange-600" />;
    return <Zap className="w-4 h-4 text-blue-600" />;
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{scenario.icon}</div>
          <div>
            <h3 className="text-lg font-semibold">{scenario.name}</h3>
            <Badge variant="outline" className={`text-xs mt-1 ${getCategoryColor(scenario.category)}`}>
              {scenario.category.toUpperCase()}
            </Badge>
          </div>
        </div>
        <Badge className={getProbabilityColor(scenario.probability)}>
          {scenario.probability.toUpperCase()} probability
        </Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4">
        {scenario.description}
      </p>

      {/* Impact Summary */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">H100 Impact:</span>
          <span className={`font-semibold ${scenario.impact.h100_price_change.includes('+') ? 'text-red-600' : 'text-green-600'}`}>
            {scenario.impact.h100_price_change}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Timeline:</span>
          <span className="font-medium">{scenario.impact.timeline}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Confidence:</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  scenario.confidence >= 80 ? 'bg-green-500' :
                  scenario.confidence >= 60 ? 'bg-yellow-500' :
                  'bg-orange-500'
                }`}
                style={{ width: `${scenario.confidence}%` }}
              />
            </div>
            <span className="font-semibold text-xs">{scenario.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Quick Recommendation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          {getUrgencyIcon(scenario.recommendation.urgency)}
          <div className="flex-1">
            <div className="text-xs font-semibold text-blue-900 mb-1">
              Recommended Action
            </div>
            <div className="text-xs text-blue-800">
              {scenario.recommendation.action.substring(0, 100)}
              {scenario.recommendation.action.length > 100 ? '...' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Analyze Button */}
      <Button
        onClick={() => onAnalyze(scenario)}
        className="w-full"
        variant="outline"
      >
        📊 Analyze Scenario
      </Button>
    </Card>
  );
};

export default ScenarioCard;
