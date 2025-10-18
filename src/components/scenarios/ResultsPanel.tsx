/**
 * ResultsPanel Component
 * Displays detailed scenario analysis results
 */

import { Scenario } from '@/types/scenario';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Download, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { exportToExcel } from '@/lib/integrations/sheets';
import { toast } from 'sonner';

interface ResultsPanelProps {
  scenario: Scenario;
  onClose: () => void;
}

const ResultsPanel = ({ scenario, onClose }: ResultsPanelProps) => {
  const handleExport = () => {
    try {
      exportToExcel('scenario');
      toast.success('Scenario analysis exported!');
    } catch (error) {
      toast.error('Failed to export');
    }
  };

  const getImpactIcon = (change: string) => {
    if (change.includes('+')) {
      return <TrendingUp className="w-5 h-5 text-red-500" />;
    } else if (change.includes('-')) {
      return <TrendingDown className="w-5 h-5 text-green-500" />;
    }
    return <AlertCircle className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{scenario.icon}</span>
            <div>
              <h2 className="text-2xl font-bold">{scenario.name}</h2>
              <p className="text-sm text-gray-600">Scenario Analysis</p>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="font-semibold mb-3">📋 Scenario Overview</h3>
            <p className="text-gray-700">{scenario.description}</p>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline">{scenario.category}</Badge>
              <Badge variant="outline">{scenario.probability} probability</Badge>
              <Badge variant="outline">{scenario.confidence}% confidence</Badge>
            </div>
          </div>

          {/* Projected Impact */}
          <div>
            <h3 className="font-semibold mb-3">📊 Projected Impact</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getImpactIcon(scenario.impact.h100_price_change)}
                  <div>
                    <div className="font-semibold">H100 GPUs</div>
                    <div className="text-xs text-gray-600">Current market leader</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${scenario.impact.h100_price_change.includes('+') ? 'text-red-600' : 'text-green-600'}`}>
                    {scenario.impact.h100_price_change}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getImpactIcon(scenario.impact.a100_price_change)}
                  <div>
                    <div className="font-semibold">A100 GPUs</div>
                    <div className="text-xs text-gray-600">Previous generation</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${scenario.impact.a100_price_change.includes('+') ? 'text-red-600' : 'text-green-600'}`}>
                    {scenario.impact.a100_price_change}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getImpactIcon(scenario.impact.l40s_price_change)}
                  <div>
                    <div className="font-semibold">L40S GPUs</div>
                    <div className="text-xs text-gray-600">Mid-range option</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${scenario.impact.l40s_price_change.includes('+') ? 'text-red-600' : 'text-green-600'}`}>
                    {scenario.impact.l40s_price_change}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Conditions */}
          <div>
            <h3 className="font-semibold mb-3">🌡️ Market Conditions</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">📦</div>
                <div className="text-xs text-gray-600 mb-1">Availability</div>
                <div className="font-semibold capitalize">{scenario.impact.availability}</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-2">📈</div>
                <div className="text-xs text-gray-600 mb-1">Volatility</div>
                <div className="font-semibold capitalize">{scenario.impact.volatility}</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="text-xs text-gray-600 mb-1">Timeline</div>
                <div className="font-semibold">{scenario.impact.timeline}</div>
              </div>
            </div>
          </div>

          {/* Strategic Recommendation */}
          <div>
            <h3 className="font-semibold mb-3">💡 Strategic Recommendation</h3>
            <div className={`p-4 rounded-lg border-l-4 ${
              scenario.recommendation.urgency === 'critical' ? 'bg-red-50 border-red-500' :
              scenario.recommendation.urgency === 'high' ? 'bg-orange-50 border-orange-500' :
              scenario.recommendation.urgency === 'medium' ? 'bg-yellow-50 border-yellow-500' :
              'bg-blue-50 border-blue-500'
            }`}>
              <div className="flex items-start gap-3 mb-3">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  scenario.recommendation.urgency === 'critical' ? 'bg-red-200 text-red-900' :
                  scenario.recommendation.urgency === 'high' ? 'bg-orange-200 text-orange-900' :
                  scenario.recommendation.urgency === 'medium' ? 'bg-yellow-200 text-yellow-900' :
                  'bg-blue-200 text-blue-900'
                }`}>
                  {scenario.recommendation.urgency.toUpperCase()} URGENCY
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-900">
                  {scenario.recommendation.risk_level.toUpperCase()} RISK
                </div>
              </div>
              
              <p className="font-medium mb-2">{scenario.recommendation.action}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-700 mt-3">
                <div>
                  <span className="font-semibold">Timeline:</span> {scenario.recommendation.timeline}
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div>
            <h3 className="font-semibold mb-3">🔍 Key Insights</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Confidence level of {scenario.confidence}% based on historical patterns and market indicators</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Market volatility expected to be {scenario.impact.volatility} during this scenario</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Impact timeline estimated at {scenario.impact.timeline} from trigger event</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Probability assessment: {scenario.probability} likelihood based on current market conditions</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleExport} className="flex-1" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Analysis
            </Button>
            <Button onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultsPanel;
