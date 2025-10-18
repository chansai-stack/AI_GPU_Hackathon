# Zapier Integration - Documentation

Connect GPUWISE to 5,000+ apps via Zapier webhooks for unlimited workflow automation.

## 🎯 Overview

Zapier integration allows GPUWISE to trigger actions in thousands of apps. Send GPU market events to Gmail, Google Sheets, Airtable, Notion, CRMs, project management tools, and more.

### Key Features
- **5,000+ App Connections** - Gmail, Sheets, Airtable, Notion, Salesforce, etc.
- **Structured Data** - JSON payloads with all event details
- **3 Event Types** - Price alerts, market summaries, scenario completions
- **Custom Workflows** - Build any automation you need

---

## 🏗️ Architecture

### Flow DiagramGPUWISE Event → Zapier Webhook → Zapier Platform → Any App (Gmail, Sheets, etc.)

### Data FlowUser Action → Generate Event Data → Send to Zapier Webhook
↓
Zapier Catches Event
↓
User's Zap Processes
↓
Action in Connected App (Email, Sheet, etc.)

---

## 💡 Event Types

### 1. Price Alert Event 💰

**Triggers when:** GPU prices change significantly

**JSON Payload:**
```json{
"event_type": "price_alert",
"gpu_model": "H100",
"provider": "Vast.ai",
"price": "$2.45/hr",
"change": "-12%",
"recommendation": "Strong buy signal",
"timestamp": "2025-10-08T10:30:00Z",
"platform": "GPUWISE"
}

**Use cases:**
- Send email alert via Gmail
- Add row to Google Sheets price tracker
- Create task in Asana/Trello
- Post to company Slack (via Zapier's Slack action)

### 2. Market Summary Event 📊

**Triggers when:** Daily market analysis is generated

**JSON Payload:**
```json{
"event_type": "market_summary",
"market_temp": "87/100",
"h100_price": "$4.20/hr",
"h100_change": "+8.5%",
"a100_price": "$2.85/hr",
"a100_change": "-3.2%",
"recommendation": "Consider locking rates",
"timestamp": "2025-10-08T10:30:00Z",
"platform": "GPUWISE"
}

**Use cases:**
- Daily email digest via Gmail
- Update dashboard in Google Sheets
- Log to Airtable database
- Create Notion page with summary

### 3. Scenario Completed Event 🎯

**Triggers when:** Scenario analysis finishes

**JSON Payload:**
```json{
"event_type": "scenario_completed",
"scenario_name": "H200 Early Release",
"projected_impact": "+28% price increase",
"confidence": "85%",
"recommendation": "Lock rates now",
"timestamp": "2025-10-08T10:30:00Z",
"platform": "GPUWISE"
}

**Use cases:**
- Email findings to stakeholders
- Create strategy document in Google Docs
- Add to project tracker
- Notify team via communication tool

---

## 🔧 Setup Instructions

### Step 1: Create Zapier Account

1. Go to [zapier.com](https://zapier.com)
2. Sign up for free account
3. Verify email

### Step 2: Create a Zap

1. Click **"Create Zap"** (orange button)
2. For **Trigger**, search: **"Webhooks by Zapier"**
3. Select **"Webhooks by Zapier"**
4. Choose **"Catch Hook"**
5. Click **"Continue"**

### Step 3: Get Webhook URL

You'll see a webhook URL like:https://hooks.zapier.com/hooks/catch/123456/abcdef/

**Copy this URL!**

### Step 4: Configure in GPUWISE

1. Go to GPUWISE **Integrations** page
2. Find **Zapier Integration** section
3. Paste webhook URL
4. Click **Save**

### Step 5: Test the Connection

1. In GPUWISE, click **"Send Price Alert Event"**
2. Go back to Zapier tab
3. You should see: **"We found a request!"**
4. Click **"Continue"**
5. You'll see all the event data fields

### Step 6: Connect to an App

**Example: Send to Gmail**

1. Click **"+" to add Action step**
2. Search **"Gmail"**
3. Choose **"Send Email"**
4. Connect your Gmail account
5. Configure email:
   - **To:** your email
   - **Subject:** "GPU Alert from GPUWISE"
   - **Body:** Use webhook data fields: GPU Alert: {{gpu_model}}
 Provider: {{provider}}
 Price: {{price}}
 Change: {{change}} Recommendation:
 {{recommendation}} Timestamp: {{timestamp}}
6. Test the action
7. Turn on your Zap!

---

## 💻 Implementation Details

### Event Data Structure
```typescriptinterface ZapierEvent {
event_type: 'price_alert' | 'market_summary' | 'scenario_completed';
timestamp: string;
platform: 'GPUWISE';
// Event-specific fields
[key: string]: string | number;
}

### Sending Events
```typescriptconst sendToZapier = async (webhookUrl: string, eventData: any) => {
const response = await fetch(webhookUrl, {
method: 'POST',
mode: 'no-cors',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(eventData)
});// With no-cors, assume success if no error
return { success: true };
};

---

## 🎨 Popular Zapier Workflows

### 1. Email Alerts via Gmail

**Trigger:** GPUWISE Price Alert
**Action:** Send email via Gmail
**Use case:** Get notified immediately about price drops

### 2. Price Tracking Spreadsheet

**Trigger:** GPUWISE Price Alert
**Action:** Add row to Google Sheets
**Fields:** Date, GPU, Price, Change, Provider
**Use case:** Build historical price database

### 3. Team Notifications

**Trigger:** GPUWISE Market Summary
**Action:** Post to Slack channel
**Use case:** Keep team informed of market conditions

### 4. CRM Integration

**Trigger:** GPUWISE Price Alert
**Action:** Create task in Salesforce/HubSpot
**Use case:** Follow up with customers about new pricing

### 5. Documentation

**Trigger:** GPUWISE Scenario Completed
**Action:** Create page in Notion
**Use case:** Document market analysis findings

---

## 🧪 Testing

### Test Cases

**Test 1: Webhook Receives Data**
Create Zap with Webhooks trigger
Copy webhook URL
Paste in GPUWISE
Click "Send Price Alert Event"
✅ Zapier shows "Request found"
✅ All fields visible (gpu_model, price, etc.)


**Test 2: Gmail Integration**
Complete Test 1
Add Gmail action
Map fields to email body
Test action in Zapier
✅ Receive test email
Turn on Zap
Send another event from GPUWISE
✅ Receive actual email with real data


**Test 3: Google Sheets**
Create Zap with Webhooks → Sheets
Map fields to columns
Send multiple events from GPUWISE
✅ Each event creates new row
✅ Data populates correctly


**Test 4: Multiple Event Types**
Send Price Alert → ✅ Zapier catches
Send Market Summary → ✅ Zapier catches
Send Scenario → ✅ Zapier catches
✅ Different fields for each type


---

## 🔐 Security

### Webhook URL Protection
- Stored locally in browser
- Never sent to GPUWISE servers
- User controls their own webhook

### Validation
```typescriptconst isValidZapierWebhook = (url: string): boolean => {
return url.includes('hooks.zapier.com/hooks/catch/');
};

### Data Privacy
- No sensitive data in events
- User controls what goes to Zapier
- Can customize data in Zap filters

---

## ⚡ Performance

### Response Times
- **Webhook trigger:** < 500ms
- **Zapier processing:** 1-5 seconds
- **Action execution:** Varies by app

### Rate Limits
- **Zapier Free:** 100 tasks/month
- **Zapier Starter:** 750 tasks/month
- **Client-side:** No rate limit

---

## 🐛 Troubleshooting

### Issue: "Zapier didn't find data"
**Cause:** No event sent yet
**Fix:** Send test event from GPUWISE first

### Issue: "Invalid webhook URL"
**Cause:** Wrong URL format
**Fix:** Ensure URL includes `hooks.zapier.com/hooks/catch/`

### Issue: "Zap not triggering"
**Cause:** Zap is turned off
**Fix:** Check Zap is ON in Zapier dashboard

### Issue: "Missing fields in action"
**Cause:** Event type doesn't include that field
**Fix:** Use correct event type for needed fields

---

## 🚀 Advanced Use Cases

### Multi-Step Zaps

**Example: Price Alert → Email + Sheets + Slack**Trigger: Webhooks by Zapier (GPUWISE Price Alert)
Action 1: Send email via Gmail
Action 2: Add row to Google Sheets
Action 3: Send Slack message
Action 4: Create calendar event

### Conditional Logic

**Example: Only alert for large price drops**Trigger: GPUWISE Price Alert
Filter: Only continue if "change" contains "-15%" or more
Action: Send urgent email

### Data Formatting

**Example: Clean up data for Sheets**Trigger: GPUWISE Price Alert
Formatter: Extract number from "$2.45/hr"
Action: Add to Sheets with clean number

---

## 📊 Popular App Connections

### Communication
- Gmail
- Slack
- Microsoft Teams
- Discord (via Zapier)
- SMS via Twilio

### Productivity
- Google Sheets
- Airtable
- Notion
- Google Docs
- Trello
- Asana

### CRM & Sales
- Salesforce
- HubSpot
- Pipedrive

### Analytics
- Google Analytics
- Mixpanel
- Amplitude

---

## 🎓 Example Zaps

### Example 1: Daily Email Digest

**Trigger:** Schedule (Daily at 9 AM)
**Action 1:** Webhooks - POST to GPUWISE API (future)
**Action 2:** Gmail - Send digest email

### Example 2: Price Drop Tracker

**Trigger:** GPUWISE Price Alert
**Filter:** Change is negative (price drop)
**Action:** Add row to "Price History" sheet

### Example 3: Team Dashboard

**Trigger:** GPUWISE Market Summary
**Action 1:** Update Google Sheets dashboard
**Action 2:** Post summary to Slack #market-updates
**Action 3:** Create task in Asana for review

---

## 📚 Related Documentation

- [Discord Integration](04-discord-integration.md) - Direct messaging
- [Slack Integration](05-slack-integration.md) - Team collaboration
- [Google Sheets Export](07-sheets-export.md) - Direct export

---

## 🔗 External Resources

- [Zapier Webhooks Documentation](https://zapier.com/apps/webhook/integrations)
- [Zapier App Directory](https://zapier.com/apps)
- [Create Your First Zap](https://zapier.com/learn/getting-started-guide/)

---

**Next:** [Google Sheets Export →](07-sheets-export.md)
