/**
 * Discord Integration Logic
 * Handles webhook validation and alert sending
 */

import { AlertType, DiscordEmbed, DiscordWebhookPayload, AlertContent } from '@/types/integrations';
import { askAI } from '@/lib/ai/geminiClient';

// Discord embed color codes (decimal)
const ALERT_COLORS = {
  price: 5025616,      // Green
  supply: 16744272,    // Orange/Red
  brief: 3447003,      // Blue
};

// Alert titles
const ALERT_TITLES = {
  price: '🚨 GPU Price Alert',
  supply: '⚠️ Supply Critical Alert',
  brief: '📊 Daily Market Brief',
};

/**
 * Validate Discord webhook URL
 */
export const isValidDiscordWebhook = (url: string): boolean => {
  if (!url) return false;
  return url.includes('discord.com/api/webhooks/');
};

/**
 * Generate dynamic alert content using AI
 */
const generateAlertContent = async (alertType: AlertType): Promise<string> => {
  const prompts = {
    price: `Generate a realistic GPU price drop alert for Discord. Include:
- A specific GPU model (H100, A100, or L40S)
- Current price with realistic $/hr rate
- Percentage drop (8-15%)
- Provider (AWS, GCP, Azure, Vast.ai, Lambda)
- Region (US-East, US-West, EU-West)
- Available units (realistic number)
- Time window for opportunity (2-6 hours)
- Brief recommendation

Format as a Discord-friendly message. Make it feel urgent but professional. Keep under 200 words. Use current date: ${new Date().toLocaleDateString()}.`,

    supply: `Generate a realistic GPU supply warning alert for Discord. Include:
- A specific GPU model running low
- Critical availability status
- Specific numbers (only 2-5 units left)
- Which providers/regions are affected
- Projected price impact (percentage increase likely)
- Immediate action recommendation

Format as a Discord-friendly message. Make it feel important. Keep under 200 words. Use current date: ${new Date().toLocaleDateString()}.`,

    brief: `Generate a realistic daily GPU market brief for Discord. Include:
- Market temperature (75-95 out of 100)
- Price movements for H100, A100, L40S (realistic ±2-10% changes)
- 2-3 key market insights or events
- Overall trend (rising/falling/volatile)
- Recommendation for the day

Format as a Discord-friendly message with clear sections. Keep under 250 words. Use current date: ${new Date().toLocaleDateString()}.`,
  };

  try {
    const response = await askAI(prompts[alertType]);
    return response.answer;
  } catch (error) {
    console.error('AI generation failed, using fallback', error);
    return getFallbackContent(alertType);
  }
};

/**
 * Fallback content if AI fails
 */
const getFallbackContent = (alertType: AlertType): string => {
  const date = new Date().toLocaleDateString();
  
  const fallbacks = {
    price: `H100 prices dropped 12% on Vast.ai!

**Current:** $2.38/hr (was $2.71/hr)
**Region:** US-West
**Available:** 18 units
**Window:** Next 4 hours

💡 Strong buy signal - prices at weekly low. Act fast before capacity fills.

Generated: ${date}`,

    supply: `⚠️ **CRITICAL: H100 supply running low!**

**US-East:** Only 3 units left
**US-West:** 5 units remaining
**EU-West:** 2 units available

**Price Impact:** Likely 15-20% spike within 48 hours

💡 **Action:** Lock rates immediately if you need capacity this quarter.

Generated: ${date}`,

    brief: `**Market Temperature:** 87/100 🔥 (HOT)

**Price Movements:**
- H100: $4.18/hr (+8.5%) 📈
- A100: $2.85/hr (-3.2%) 📉
- L40S: $1.95/hr (stable) ➡️

**Key Insights:**
- Hyperscaler purchases tightening supply
- H200 rumors creating speculation
- Q1 capacity running low

💡 **Recommendation:** Consider locking rates within 2 weeks if you need guaranteed capacity.

Generated: ${date}`,
  };

  return fallbacks[alertType];
};

/**
 * Create Discord embed from alert content
 */
const createEmbed = (alertType: AlertType, content: string): DiscordEmbed => {
  return {
    title: ALERT_TITLES[alertType],
    description: content,
    color: ALERT_COLORS[alertType],
    timestamp: new Date().toISOString(),
    footer: {
      text: 'GPUWISE • AI-Generated Market Alert',
    },
  };
};

/**
 * Send alert to Discord webhook
 */
export const sendDiscordAlert = async (
  webhookUrl: string,
  alertType: AlertType
): Promise<{ success: boolean; error?: string }> => {
  // Validate webhook URL
  if (!isValidDiscordWebhook(webhookUrl)) {
    return {
      success: false,
      error: 'Invalid Discord webhook URL',
    };
  }

  try {
    // Generate content (AI or fallback)
    const content = await generateAlertContent(alertType);

    // Create embed
    const embed = createEmbed(alertType, content);

    // Prepare payload
    const payload: DiscordWebhookPayload = {
      username: 'GPUWISE Bot',
      embeds: [embed],
    };

    // Send webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord API returned ${response.status}`);
    }

    return { success: true };

  } catch (error: any) {
    console.error('Discord webhook error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send Discord alert',
    };
  }
};

/**
 * Test webhook connection
 */
export const testDiscordWebhook = async (webhookUrl: string): Promise<boolean> => {
  const result = await sendDiscordAlert(webhookUrl, 'brief');
  return result.success;
};
