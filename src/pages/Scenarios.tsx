/**
 * Scenarios Page
 * Strategic what-if modeling for GPU procurement
 */

import { useState } from 'react';
import { Scenario } from '@/types/scenario';
import { SCENARIOS } from '@/lib/scenarios/scenarioEngine';
import ScenarioCard from '@/components/scenarios/ScenarioCard';
import ResultsPanel from '@/components/scenarios/ResultsPanel';
import { Card } from '@/components/ui/card';

const Scenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const handleAnalyze = (scenario: Scenario) => {
    setSelectedScenario(scenario);
  };

  const handleClose = () => {
    setSelectedScenario(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🎯 Scenario Studio</h1>
          <p className="text-gray-600">
            Model potential market events and understand their impact on GPU pricing
          </p>
        </div>

        {/* Info Banner */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 mb-1">
                Strategic "What-If" Modeling
              </h3>
              <p className="text-sm text-purple-800">
                Explore 5 pre-built scenarios covering supply shocks, technology releases, and market changes. 
                Each scenario includes AI-powered analysis with confidence scores and strategic recommendations.
              </p>
            </div>
          </div>
        </Card>

        {/* How It Works */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4">📚 How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">1️⃣</div>
              <div className="font-semibold mb-1">Select Scenario</div>
              <div className="text-xs text-gray-600">Choose a what-if event to model</div>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">2️⃣</div>
              <div className="font-semibold mb-1">Review Impact</div>
              <div className="text-xs text-gray-600">See projected price changes</div>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">3️⃣</div>
              <div className="font-semibold mb-1">Get Recommendations</div>
              <div className="text-xs text-gray-600">Strategic guidance with confidence</div>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl mb-2">4️⃣</div>
              <div className="font-semibold mb-1">Export Analysis</div>
              <div className="text-xs text-gray-600">Save to Excel for sharing</div>
            </div>
          </div>
        </Card>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCENARIOS.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onAnalyze={handleAnalyze}
            />
          ))}
        </div>

        {/* Coming Soon */}
        <Card className="p-6 mt-6 bg-yellow-50 border-yellow-200">
          <h3 className="font-semibold mb-2 text-yellow-900">🚧 Coming Soon</h3>
          <p className="text-sm text-yellow-800 mb-3">
            <strong>Custom Scenarios:</strong> Build your own what-if models with adjustable parameters. 
            Compare multiple scenarios side-by-side. Historical validation of past scenario accuracy.
          </p>
          <p className="text-xs text-yellow-700">
            These features are planned for Q1 2026 as part of GPUWISE's product roadmap.
          </p>
        </Card>
      </div>

      {/* Results Modal */}
      {selectedScenario && (
        <ResultsPanel
          scenario={selectedScenario}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Scenarios;
```

---

## ✅ SCENARIO STUDIO COMPLETE!

**Files created:**
```
✅ docs/08-scenarios.md
✅ src/types/scenario.ts
✅ src/lib/scenarios/scenarioEngine.ts
✅ src/components/scenarios/ScenarioCard.tsx
✅ src/components/scenarios/ResultsPanel.tsx
✅ src/pages/Scenarios.tsx
```

---

## 🧪 TESTING CHECKLIST:
```
Scenarios Page:
□ Navigate to /scenarios
□ See 5 scenario cards
□ Each card shows description, impact, confidence
□ Categories labeled correctly

Scenario Analysis:
□ Click "Analyze Scenario" on any card
□ Modal opens with detailed analysis
□ See price projections for H100, A100, L40S
□ Recommendations displayed
□ Confidence score shown

Export:
□ In results modal, click "Export Analysis"
□ Excel file downloads
□ Contains scenario data
□ File opens correctly

All Scenarios:
□ Test H200 Early Release scenario
□ Test Supply Chain Disruption
□ Test New Hyperscaler Capacity
□ Test Market Crash
□ Test H200 Production Issues
□ All display correctly
