# Discord Integration - Documentation

Real-time GPU market alerts delivered to Discord channels via webhooks.

## 🎯 Overview

The Discord integration sends AI-generated market alerts directly to Discord channels. Alerts include price drops, supply warnings, and market briefs.

### Key Features
- **Real-time Alerts** - Instant notifications in Discord
- **AI-Generated Content** - Unique messages every time
- **Rich Embeds** - Formatted, color-coded messages
- **3 Alert Types** - Price, Supply, Market Brief

---

## 🏗️ Architecture

### Flow Diagram
```
User Clicks Alert → Generate AI Content → Format Discord Embed → Send Webhook → Discord Channel
```

### Components

1. **Frontend Component** (`DiscordIntegration.tsx`)
   - Webhook URL input
   - Alert type buttons
   - Status indicators

2. **Integration Logic** (`discord.ts`)
   - Webhook validation
   - Content generation
   - Embed formatting
   - Error handling

3. **Discord API**
   - Receives webhook POST
   - Renders embed in channel
   - Notifies users

---

## 💡 Alert Types

### 1. Price Alert 🚨
**When to use:** GPU prices drop significantly

**Content includes:**
- GPU model (H100, A100, L40S)
- Current price and change percentage
- Provider and region
- Available units
- Time window for opportunity
- Recommendation

**Example:**
```
🚨 GPU Price Alert

H100 prices dropped 12% on Vast.ai!

Current: $2.38/hr (was $2.71/hr)
Region: US-West
Available: 18 units

💡 Strong buy signal - act within 4 hours.
```

### 2. Supply Warning ⚠️
**When to use:** GPU availability critically low

**Content includes:**
- GPU model running low
- Critical availability status
- Specific numbers (units left)
- Affected providers
- Projected price impact
- Immediate action needed

**Example:**
```
⚠️ Supply Critical Alert

H100 supply running low!

US-East: Only 3 units left
US-West: 5 units remaining

Prices likely to spike 15-20% within 48 hours.

💡 Lock rates immediately if you need capacity.
```

### 3. Market Brief 📊
**When to use:** Daily market summary

**Content includes:**
- Market temperature (0-100)
- Price movements for multiple GPUs
- Key market insights
- Overall trend
- Daily recommendation

**Example:**
```
📊 Daily Market Brief

Market Temperature: 87/100 (HOT)

H100: $4.18/hr (+8.5%)
A100: $2.85/hr (-3.2%)
L40S: $1.95/hr (stable)

💡 Recommendation: Consider locking rates within 2 weeks.
```

---

## 🔧 Setup Instructions

### Step 1: Create Discord Webhook

1. Open Discord server (or create one for testing)
2. Go to **Server Settings** → **Integrations**
3. Click **Webhooks** → **New Webhook**
4. Name it: "GPUWISE Bot"
5. Choose a channel (e.g., #gpu-alerts)
6. Click **Copy Webhook URL**

**Webhook URL format:**
```
https://discord.com/api/webhooks/123456789/abcdefghijklmnop
```

### Step 2: Configure in GPUWISE

1. Go to **Integrations** page
2. Find **Discord Alerts** section
3. Paste your webhook URL
4. Click **Test Now** to verify

### Step 3: Test Alerts

- Click **"💰 Price Drop Alert"** - See price notification
- Click **"⚠️ Supply Warning"** - See supply alert
- Click **"📊 Market Brief"** - See daily summary

---

## 💻 Implementation Details

### Discord Embed Structure
```typescript
interface DiscordEmbed {
  title: string;           // Alert title
  description: string;     // AI-generated content
  color: number;          // Decimal color code
  timestamp: string;      // ISO timestamp
  footer: {
    text: string;         // "GPUWISE • AI-Generated Alert"
  };
}
```

### Color Codes
```typescript
const COLORS = {
  price: 5025616,      // Green (#4CAF50)
  supply: 16744272,    // Red/Orange (#FF6F00)
  brief: 3447003,      // Blue (#3498DB)
};
```

### Webhook Request Format
```typescript
const webhookPayload = {
  username: 'GPUWISE Bot',
  embeds: [embed]
};

fetch(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(webhookPayload)
});
```

---

## 🎨 Dynamic Content Generation

### With Gemini AI (Recommended)
```typescript
const generateDynamicAlert = async (alertType: string) => {
  const prompts = {
    price: `Generate a realistic GPU price drop alert. Include:
    - Specific GPU model (H100, A100, or L40S)
    - Current price with $/hr rate
    - Percentage drop (8-15%)
    - Provider (AWS, GCP, Azure, Vast.ai, Lambda)
    - Region
    - Available units
    - Time window
    - Brief recommendation
    
    Keep under 200 words. Make it urgent but professional.`,
    
    supply: `Generate a realistic GPU supply warning. Include:
    - GPU model running low
    - Critical numbers (2-5 units left)
    - Affected providers/regions
    - Projected price impact
    - Immediate action recommendation
    
    Keep under 200 words. Make it important.`,
    
    brief: `Generate a daily GPU market brief. Include:
    - Market temperature (75-95 out of 100)
    - Price movements for H100, A100, L40S
    - 2-3 key insights
    - Overall trend
    - Daily recommendation
    
    Keep under 250 words.`
  };

  const response = await askAI(prompts[alertType]);
  return response.answer;
};
```

### Fallback (Without AI)
```typescript
const getFallbackContent = (type: string) => {
  const templates = {
    price: `H100 prices dropped 12% on Vast.ai!
    
Current: $2.38/hr (was $2.71/hr)
Region: US-West
Available: 18 units

💡 Strong buy signal - act within 4 hours.`,
    
    supply: `⚠️ CRITICAL: H100 supply running low!

US-East: Only 3 units left
US-West: 5 units remaining

Prices likely to spike 15-20% within 48 hours.

💡 Lock rates immediately if you need capacity.`,
    
    brief: `Market Temperature: 87/100 (HOT)

H100: $4.18/hr (+8.5%)
A100: $2.85/hr (-3.2%)
L40S: $1.95/hr (stable)

💡 Consider locking rates within 2 weeks.`
  };
  
  return templates[type];
};
```

---

## 🧪 Testing

### Manual Test Cases

**Test 1: Valid Webhook**
```
1. Paste valid Discord webhook URL
2. Click "Test Now"
3. ✅ See success toast
4. ✅ Message appears in Discord channel
```

**Test 2: Invalid Webhook**
```
1. Paste invalid URL (e.g., "https://google.com")
2. Click "Test Now"
3. ✅ See error message
4. ✅ No message sent
```

**Test 3: All Alert Types**
```
1. Send Price Alert
2. ✅ Green embed appears
3. Send Supply Alert
4. ✅ Orange embed appears
5. Send Market Brief
6. ✅ Blue embed appears
```

**Test 4: Multiple Sends**
```
1. Click same alert button 3 times
2. ✅ Each message is different (if using AI)
3. ✅ All messages appear in Discord
```

---

## 🔐 Security

### Webhook URL Protection
- Stored in localStorage (client-side demo)
- Never sent to server
- User controls their own webhook

### Validation
```typescript
const isValidDiscordWebhook = (url: string): boolean => {
  return url.includes('discord.com/api/webhooks/');
};
```

### Rate Limiting
- Client-side: Prevent spam clicks
- Discord limits: 30 requests per minute
- Add 1-second cooldown between sends

---

## ⚡ Performance

### Response Times
- **Webhook send:** < 500ms
- **With AI generation:** 2-3 seconds
- **Without AI (fallback):** < 1 second

### Optimizations
- Generate AI content before formatting
- Cache webhook validation
- Use async/await properly

---

## 🐛 Troubleshooting

### Issue: "Failed to send"
**Causes:**
- Invalid webhook URL
- Network error
- Discord API down

**Solutions:**
1. Verify webhook URL is correct
2. Check Discord server is accessible
3. Try again after 1 minute

### Issue: Message not appearing
**Causes:**
- Wrong channel permissions
- Webhook deleted in Discord
- CORS blocking request

**Solutions:**
1. Verify webhook still exists in Discord
2. Check channel permissions
3. Use `mode: 'no-cors'` in fetch

### Issue: Content looks broken
**Causes:**
- Invalid markdown
- Missing embed fields
- Character encoding

**Solutions:**
1. Validate embed structure
2. Escape special characters
3. Test with simple content first

---

## 🚀 Future Enhancements

### Planned Features

1. **Scheduled Alerts**
   - Morning brief (9 AM)
   - Evening wrap (6 PM)
   - Weekly summary

2. **Custom Alert Rules**
   - Price threshold triggers
   - Availability notifications
   - Event-based alerts

3. **Multi-Channel**
   - Different webhooks for different alerts
   - Team-specific channels
   - Priority routing

4. **Alert History**
   - Track sent alerts
   - View in dashboard
   - Analytics

5. **Rich Interactions**
   - Discord buttons
   - Slash commands
   - Bot responses

---

## 📊 Analytics

### Metrics to Track
- Alerts sent (by type)
- Success/failure rate
- Response times
- User engagement

### Sample Data
```typescript
interface DiscordMetrics {
  totalSent: number;
  priceAlerts: number;
  supplyAlerts: number;
  marketBriefs: number;
  successRate: number;
  avgResponseTime: number;
}
```

---

## 📚 Related Documentation

- [Setup Guide](01-setup.md) - Initial configuration
- [AI Chat](03-ai-chat.md) - AI content generation
- [Slack Integration](05-slack-integration.md) - Similar webhook setup

---

## 🔗 External Resources

- [Discord Webhooks Guide](https://discord.com/developers/docs/resources/webhook)
- [Discord Embed Limits](https://discord.com/developers/docs/resources/channel#embed-limits)
- [Webhook Best Practices](https://discord.com/developers/docs/resources/webhook#webhooks-resource)

---

**Next:** [Slack Integration →](05-slack-integration.md)
