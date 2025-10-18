/**
 * Zapier Integration Logic
 * Handles webhook validation and event sending
 */

export type ZapierEventType = 'price_alert' | 'market_summary' | 'scenario_completed';

interface ZapierEvent {
  event_type: ZapierEventType;
  timestamp: string;
  platform: 'GPUWISE';
  [key: string]: string | number;
}

/**
 * Validate Zapier webhook URL
 */
export const isValidZapierWebhook = (url: string): boolean => {
  if (!url) return false;
  return url.includes('hooks.zapier.com/hooks/catch/');
};

/**
 * Create price alert event
 */
const createPriceAlertEvent = (): ZapierEvent => {
  const gpuModels = ['H100', 'A100', 'L40S'];
  const providers = ['AWS', 'GCP', 'Azure', 'Vast.ai', 'Lambda Labs'];
  const regions = ['US-East', 'US-West', 'EU-West', 'EU-Central'];
  
  const model = gpuModels[Math.floor(Math.random() * gpuModels.length)];
  const provider = providers[Math.floor(Math.random() * providers.length)];
  const region = regions[Math.floor(Math.random() * regions.length)];
  const priceChange = -(Math.random() * 7 + 8); // -8% to -15%
  const basePrice = model === 'H100' ? 4.5 : model === 'A100' ? 2.8 : 1.9;
  const newPrice = basePrice * (1 + priceChange / 100);

  return {
    event_type: 'price_alert',
    gpu_model: model,
    provider: provider,
    region: region,
    price: `$${newPrice.toFixed(2)}/hr`,
    previous_price: `$${basePrice.toFixed(2)}/hr`,
    change: `${priceChange.toFixed(1)}%`,
    units_available: Math.floor(Math.random() * 30 + 10),
    recommendation: priceChange < -12 ? 'Strong buy signal - act within 4 hours' : 'Good timing for purchase',
    timestamp: new Date().toISOString(),
    platform: 'GPUWISE',
  };
};

/**
 * Create market summary event
 */
const createMarketSummaryEvent = (): ZapierEvent => {
  const marketTemp = Math.floor(Math.random() * 20 + 75); // 75-95
  const h100Change = (Math.random() * 15 - 5).toFixed(1); // -5% to +10%
  const a100Change = (Math.random() * 10 - 5).toFixed(1); // -5% to +5%
  const l40sChange = (Math.random() * 8 - 3).toFixed(1); // -3% to +5%

  return {
    event_type: 'market_summary',
    market_temp: `${marketTemp}/100`,
    market_status: marketTemp > 85 ? 'HOT' : marketTemp > 70 ? 'WARM' : 'COOL',
    h100_price: '$4.20/hr',
    h100_change: `${h100Change}%`,
    a100_price: '$2.85/hr',
    a100_change: `${a100Change}%`,
    l40s_price: '$1.95/hr',
    l40s_change: `${l40sChange}%`,
    recommendation: marketTemp > 85 
      ? 'High demand - consider locking rates within 2 weeks'
      : 'Moderate market - good time for flexible purchasing',
    timestamp: new Date().toISOString(),
    platform: 'GPUWISE',
  };
};

/**
 * Create scenario completed event
 */
const createScenarioEvent = (): ZapierEvent => {
  const scenarios = [
    {
      name: 'H200 Early Release',
      impact: '+28% price increase',
      confidence: '85%',
      recommendation: 'Lock H100 rates now before announcement',
    },
    {
      name: 'Supply Chain Disruption',
      impact: '+45% price spike',
      confidence: '72%',
      recommendation: 'Secure capacity immediately, prices volatile',
    },
    {
      name: 'New Hyperscaler Capacity',
      impact: '-15% price decrease',
      confidence: '90%',
      recommendation: 'Wait 2-3 weeks for better pricing',
    },
  ];

  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

  return {
    event_type: 'scenario_completed',
    scenario_name: scenario.name,
    projected_impact: scenario.impact,
    confidence: scenario.confidence,
    recommendation: scenario.recommendation,
    analysis_date: new Date().toLocaleDateString(),
    timestamp: new Date().toISOString(),
    platform: 'GPUWISE',
  };
};

/**
 * Get event data by type
 */
const getEventData = (eventType: ZapierEventType): ZapierEvent => {
  switch (eventType) {
    case 'price_alert':
      return createPriceAlertEvent();
    case 'market_summary':
      return createMarketSummaryEvent();
    case 'scenario_completed':
      return createScenarioEvent();
    default:
      return createPriceAlertEvent();
  }
};

/**
 * Send event to Zapier webhook
 */
export const sendZapierEvent = async (
  webhookUrl: string,
  eventType: ZapierEventType
): Promise<{ success: boolean; error?: string }> => {
  // Validate webhook URL
  if (!isValidZapierWebhook(webhookUrl)) {
    return {
      success: false,
      error: 'Invalid Zapier webhook URL',
    };
  }

  try {
    // Generate event data
    const eventData = getEventData(eventType);

    // Send to Zapier
    const response = await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors', // Required for Zapier webhooks
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    // With no-cors, we can't read response
    // Assume success if no error thrown
    return { success: true };

  } catch (error: any) {
    console.error('Zapier webhook error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send Zapier event',
    };
  }
};

/**
 * Test webhook connection
 */
export const testZapierWebhook = async (webhookUrl: string): Promise<boolean> => {
  const result = await sendZapierEvent(webhookUrl, 'price_alert');
  return result.success;
};
