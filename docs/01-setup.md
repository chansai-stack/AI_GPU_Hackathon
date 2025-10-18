# Setup Guide - GPUWISE

Complete installation and configuration guide for running GPUWISE locally.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Supabase Configuration](#supabase-configuration)
- [Gemini AI Setup](#gemini-ai-setup)
- [Environment Variables](#environment-variables)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
```bash
# Node.js (18.x or higher)
node --version  # Should show v18.x.x or higher

# npm (comes with Node.js)
npm --version   # Should show 9.x.x or higher
```

**Install Node.js:** Download from [nodejs.org](https://nodejs.org)

### Required Accounts (All Free Tier)

1. **Supabase Account** - [supabase.com](https://supabase.com)
2. **Google AI Studio** - [ai.google.dev](https://ai.google.dev)

---

## Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/gpuwise.git
cd gpuwise
```

### 2. Install Dependencies
```bash
npm install
```

**Key Dependencies Installed:**
- `react` - UI framework
- `typescript` - Type safety
- `@supabase/supabase-js` - Backend client
- `tailwindcss` - Styling
- `recharts` - Data visualization
- `lucide-react` - Icons

### 3. Project Structure
```
gpuwise/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── integrations/    # Discord, Slack, Zapier handlers
│   ├── lib/             # Utilities and helpers
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript type definitions
├── supabase/
│   └── functions/       # Edge Functions
├── public/              # Static assets
└── docs/               # Documentation
```

---

## Supabase Configuration

### 1. Create Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in:
   - **Name:** GPUWISE
   - **Database Password:** (generate strong password)
   - **Region:** Choose closest to you
4. Click **"Create New Project"** (takes 2 minutes)

### 2. Get API Keys

1. In your project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 3. Deploy Edge Function (for AI Chat)
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy the chat-ai function
supabase functions deploy chat-ai
```

**Edge Function Code** (create `supabase/functions/chat-ai/index.ts`):
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

serve(async (req) => {
  const { question } = await req.json()
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: question }]
        }]
      })
    }
  )
  
  const data = await response.json()
  const answer = data.candidates[0].content.parts[0].text
  
  return new Response(
    JSON.stringify({ answer }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

### 4. Set Edge Function Secrets
```bash
# Set your Gemini API key for the edge function
supabase secrets set GEMINI_API_KEY=your_gemini_api_key
```

---

## Gemini AI Setup

### 1. Get API Key

1. Go to [ai.google.dev](https://ai.google.dev)
2. Click **"Get API Key"**
3. Click **"Create API Key in New Project"**
4. Copy the generated key

### 2. Test API Key
```bash
curl \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY"
```

**Expected Response:** JSON with generated text

---

## Environment Variables

### 1. Create Environment File
```bash
cp .env.example .env
```

### 2. Edit `.env` File
```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. `.env.example` Template
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Configuration  
VITE_GEMINI_API_KEY=your_gemini_api_key

# Optional: Integration Webhooks (stored in localStorage for demo)
# Users configure these in the app UI
```

---

## Running the Application

### Development Server
```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Verification

### ✅ Checklist

Run through these steps to verify everything works:

**1. Application Loads**
```bash
npm run dev
# Open http://localhost:5173
# ✅ Should see GPUWISE landing page
```

**2. Navigate Pages**
```
✅ Dashboard loads
✅ Simulator loads
✅ AI Chat loads
✅ Integrations page loads
✅ Learn Hub loads
```

**3. Test AI Chat (requires setup)**
```
✅ Type a question in AI Chat
✅ Get a response from Gemini
✅ Confidence score displays
```

**4. Check Console**
```
✅ No errors in browser console
✅ Supabase client initialized
✅ No CORS errors
```

---

## Troubleshooting

### Issue: "Failed to fetch" in AI Chat

**Cause:** Edge function not deployed or API key not set

**Fix:**
```bash
supabase functions deploy chat-ai
supabase secrets set GEMINI_API_KEY=your_key
```

### Issue: Blank page on load

**Cause:** Environment variables not set

**Fix:**
1. Check `.env` file exists
2. Verify all variables are set
3. Restart dev server: `npm run dev`

### Issue: Supabase connection error

**Cause:** Incorrect URL or key

**Fix:**
1. Go to Supabase Dashboard → Settings → API
2. Copy exact URL and anon key
3. Update `.env` file
4. Restart server

### Issue: Build fails

**Cause:** TypeScript errors or missing dependencies

**Fix:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check
```

### Issue: Port 5173 already in use

**Fix:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

---

## Next Steps

✅ Setup complete! Now you can:

1. **Explore the codebase** - Check `src/` directory
2. **Build Feature #2** - [GPU Simulator](02-simulator.md)
3. **Configure integrations** - Set up Discord, Slack webhooks
4. **Customize branding** - Update colors, copy, images

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)

---

**Need help?** Open an issue or reach out at [your-email]

**Next:** [GPU Simulator Implementation →](02-simulator.md)
