/**
 * Supabase Edge Function - AI Chat
 * Handles communication with Google Gemini API
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get question from request
    const { question } = await req.json();

    if (!question || typeof question !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid question' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // System prompt for GPU market expertise
    const systemPrompt = `You are an expert GPU procurement advisor with deep knowledge of AI infrastructure markets.

Your expertise includes:
- GPU pricing trends (H100, A100, L40S, H200)
- Cloud providers (AWS, GCP, Azure, Lambda Labs, Vast.ai)
- Supply chain dynamics
- Product roadmaps
- Cost optimization

Guidelines:
- Be concise (under 300 words)
- Provide actionable advice
- Include confidence level (High/Medium/Low)
- Focus on business outcomes
- Use specific examples

Format responses with:
1. **Direct Answer:** Clear recommendation
2. **Key Factors:** Important considerations  
3. **Confidence:** High/Medium/Low
4. **Action:** What to do next`;

    // Combine system prompt with user question
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${question}\n\nProvide your expert response:`;

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error('AI service returned an error');
    }

    const data = await response.json();

    // Extract answer from Gemini response
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) {
      throw new Error('No response from AI');
    }

    // Return formatted response
    return new Response(
      JSON.stringify({ 
        answer,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Edge function error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process request',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
