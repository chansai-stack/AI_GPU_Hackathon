# AI Chat Integration - Documentation

AI-powered market analyst using Google Gemini for intelligent GPU market insights.

## 🎯 Overview

The AI Chat feature provides users with an intelligent assistant that can:
- Answer questions about GPU markets
- Provide procurement recommendations
- Explain market trends and events
- Offer strategic advice with confidence scores

### Powered By
- **Google Gemini Pro** - Advanced language model
- **Supabase Edge Functions** - Serverless API layer
- **Custom Prompt Engineering** - GPU market expertise

---

## 🏗️ Architecture

### Flow Diagram
```
User Question → React Component → Supabase Edge Function → Gemini API
                                                              ↓
User Interface ← Format Response ← Process Response ← API Response
```

### Components

1. **Frontend (React)**
   - ChatInterface.tsx - Main UI
   - MessageBubble.tsx - Individual messages
   - SuggestedQuestions.tsx - Quick prompts

2. **Backend (Supabase Edge Function)**
   - Handles API calls to Gemini
   - Adds context and prompt engineering
   - Processes responses
   - Adds confidence scoring

3. **AI Layer (Gemini)**
   - Processes natural language
   - Generates market insights
   - Provides recommendations

---

## 💡 Key Features

### 1. Natural Language Processing
Users can ask questions in plain English:
- "Should I buy H100s now or wait?"
- "What's causing GPU prices to rise?"
- "How do I plan for H200 release?"

### 2. Confidence Scoring
Every AI response includes confidence level:
- **High (85-100%):** Strong consensus, clear data
- **Medium (60-84%):** Good analysis, some uncertainty
- **Low (0-59%):** Limited data, speculative

### 3. Context-Aware Responses
AI understands GPU market context:
- Current pricing trends
- Supply chain dynamics
- Product roadmaps
- Market events

### 4. Suggested Questions
Pre-written prompts help users explore:
- "Best time to buy GPUs?"
- "H100 vs A100 comparison?"
- "Impact of supply shortages?"

---

## 🔧 Implementation Details

### Prompt Engineering

**System Prompt (added to every request):**
```
You are an expert GPU procurement advisor with deep knowledge of:
- AI infrastructure and GPU markets
- Pricing trends for H100, A100, L40S GPUs
- Cloud provider offerings (AWS, GCP, Azure, Vast.ai, Lambda)
- Supply chain dynamics
- Product roadmaps (H200, B100)

Provide practical, actionable advice. Always include:
1. Direct answer to the question
2. Key factors to consider
3. Confidence level (High/Medium/Low)
4. Recommended action

Keep responses concise (under 300 words) and business-focused.
```

### Confidence Calculation
```typescript
// Extract confidence from AI response
const calculateConfidence = (text: string): number => {
  // Look for explicit confidence statements
  if (text.includes('Confidence: High') || text.includes('Very confident')) {
    return 90;
  }
  if (text.includes('Confidence: Medium') || text.includes('Moderately confident')) {
    return 70;
  }
  if (text.includes('Confidence: Low') || text.includes('Limited data')) {
    return 40;
  }
  
  // Default to medium
  return 70;
};
```

### Response Formatting

Responses are structured with:
- **Answer:** Main response text
- **Confidence:** 0-100 score
- **Timestamp:** When generated
- **Sources:** (if applicable)

---

## 🎨 UI/UX Design

### Chat Interface

**Layout:**
```
┌─────────────────────────────────────┐
│  🤖 AI Market Analyst              │
├─────────────────────────────────────┤
│                                     │
│  [User Message]                     │
│                                     │
│           [AI Response]             │
│           Confidence: 85%           │
│                                     │
│  [User Message]                     │
│                                     │
│           [AI Response]             │
│           Confidence: 75%           │
│                                     │
├─────────────────────────────────────┤
│  💡 Suggested Questions:            │
│  [Button] [Button] [Button]         │
├─────────────────────────────────────┤
│  [Input Field]              [Send]  │
└─────────────────────────────────────┘
```

### Message Types

1. **User Messages**
   - Right-aligned
   - Blue background
   - Sent timestamp

2. **AI Messages**
   - Left-aligned
   - Gray background
   - Confidence badge
   - Markdown formatted

3. **System Messages**
   - Centered
   - Light background
   - Informational

---

## 🧪 Testing

### Test Cases

**Test 1: Basic Question**
```
Input: "Should I buy GPUs now?"
Expected: Response with recommendation + confidence score
```

**Test 2: Complex Query**
```
Input: "Compare H100 and A100 for training LLMs with 70B parameters"
Expected: Detailed comparison with specific use case advice
```

**Test 3: Market Trends**
```
Input: "Why are GPU prices rising?"
Expected: Explanation of market factors with confidence
```

**Test 4: Error Handling**
```
Input: [Random string]
Expected: Graceful response asking for clarification
```

### Edge Cases

- Empty message
- Very long message (>1000 chars)
- API timeout
- Network error
- Rate limiting

---

## 🔐 Security & Privacy

### API Key Protection
- Gemini API key stored in Supabase secrets
- Never exposed to client
- Edge function acts as proxy

### Rate Limiting
- Max 20 requests per minute per user
- Implement on edge function level
- Clear error messages when limited

### Data Privacy
- Conversations not stored by default
- Optional: Store in Supabase for user
- No PII sent to Gemini

---

## ⚡ Performance

### Response Times
- **Target:** < 3 seconds per response
- **Average:** 1.5-2.5 seconds
- **Max acceptable:** 5 seconds

### Optimizations
- Use Gemini Pro (faster than Ultra)
- Limit response length (300 words)
- Stream responses if > 2 seconds
- Cache common questions (future)

---

## 📊 Monitoring

### Metrics to Track
- Average response time
- Error rate
- Confidence score distribution
- Popular questions
- User satisfaction

### Error Types
- API timeouts
- Invalid API key
- Rate limit exceeded
- Network errors
- Invalid responses

---

## 🚀 Future Enhancements

### Planned Features

1. **Conversation History**
   - Store chat history in Supabase
   - Resume previous conversations
   - Export chat transcripts

2. **Streaming Responses**
   - Show AI typing in real-time
   - Better UX for long responses
   - Implement with SSE

3. **Multi-turn Context**
   - Remember previous messages
   - Better follow-up questions
   - Conversation context

4. **Custom Personas**
   - CTO mode (budget-focused)
   - Engineer mode (technical)
   - Executive mode (high-level)

5. **Voice Input**
   - Speech-to-text
   - Voice questions
   - Accessibility feature

6. **Advanced Analysis**
   - Chart generation
   - Data visualization
   - Market forecasts

---

## 🐛 Troubleshooting

### Issue: "API key not configured"
**Cause:** Gemini API key not set in edge function
**Fix:**
```bash
supabase secrets set GEMINI_API_KEY=your_key
```

### Issue: Slow responses
**Cause:** Network latency or long generation
**Fix:** 
- Add loading state
- Implement streaming
- Reduce max tokens

### Issue: Generic responses
**Cause:** Insufficient prompt engineering
**Fix:**
- Enhance system prompt
- Add more context
- Provide examples

### Issue: Rate limiting errors
**Cause:** Too many requests
**Fix:**
- Implement client-side throttling
- Show clear error message
- Add retry logic

---

## 📚 Related Documentation

- [Setup Guide](01-setup.md) - Configure Gemini API
- [Simulator](02-simulator.md) - Ask AI about simulator results
- [Scenarios](08-scenarios.md) - Get AI analysis of scenarios

---

**Next:** [Discord Integration →](04-discord-integration.md)
