/**
 * ZapierIntegration Component
 * UI for configuring and testing Zapier webhooks
 */

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { sendZapierEvent, isValidZapierWebhook, ZapierEventType } from '@/lib/integrations/zapier';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Loader2, ExternalLink, Zap } from 'lucide-react';

const ZapierIntegration = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Load saved webhook from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('zapier_webhook_url');
    if (saved) {
      setWebhookUrl(saved);
      setIsValid(isValidZapierWebhook(saved));
    }
  }, []);

  // Save webhook to localStorage
  const handleSaveWebhook = () => {
    if (!webhookUrl.trim()) {
      toast.error('Please enter a webhook URL');
      return;
    }

    if (!isValidZapierWebhook(webhookUrl)) {
      toast.error('Invalid Zapier webhook URL');
      setIsValid(false);
      return;
    }

    localStorage.setItem('zapier_webhook_url', webhookUrl);
    setIsValid(true);
    toast.success('Zapier webhook saved!');
  };

  // Send test event
  const handleSendEvent = async (eventType: ZapierEventType) => {
    if (!isValid || !webhookUrl) {
      toast.error('Please configure your Zapier webhook first');
      return;
    }

    setIsSending(true);

    try {
      const result = await sendZapierEvent(webhookUrl, eventType);

      if (result.success) {
        toast.success('✅ Event sent to Zapier! Check your Zap history to verify.');
      } else {
        toast.error(result.error || 'Failed to send event');
      }
    } catch (error: any) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#FF4A00] flex items-center justify-center">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              Zapier Integration
              {isValid && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  ✅ LIVE
                </Badge>
              )}
            </h3>
            <p className="text-sm text-gray-600">
              Connect to 5,000+ apps via webhooks
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-sm text-blue-800">
          <strong>Connect to:</strong> Gmail • Sheets • Airtable • Notion • Salesforce • Slack • 5,000+ more apps
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          🔧 Quick Setup (5 minutes)
        </h4>
        <div className="space-y-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-[60px]">Step 1:</span>
            <span>Go to zapier.com → Create free account</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-[60px]">Step 2:</span>
            <span>Click "Create Zap" → Search "Webhooks by Zapier"</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-[60px]">Step 3:</span>
            <span>Choose "Catch Hook" → Click Continue</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-[60px]">Step 4:</span>
            <span>Copy the webhook URL Zapier shows you</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-[60px]">Step 5:</span>
            <span>Paste URL below → Click Save → Send test event</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-[60px]">Step 6:</span>
            <span>In Zapier, click "Find new records" → See your data!</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-[60px]">Step 7:</span>
            <span>Add action (Gmail, Sheets, etc.) → Turn on Zap</span>
          </div>
        </div>
        
          href="https://zapier.com/apps/webhook/integrations"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
        >
          📚 Read Zapier Webhooks Documentation
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Webhook Configuration */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Zapier Webhook URL
        </label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              value={webhookUrl}
              onChange={(e) => {
                setWebhookUrl(e.target.value);
                setIsValid(isValidZapierWebhook(e.target.value));
              }}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              className={`pr-10 ${
                webhookUrl && (isValid ? 'border-green-500' : 'border-red-500')
              }`}
            />
            {webhookUrl && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValid ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          <Button onClick={handleSaveWebhook} variant="outline">
            Save
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Your webhook URL is stored locally and never sent to our servers
        </p>
      </div>

      {/* Test Event Buttons */}
      <div className="space-y-3">
        <h4 className="font-medium">Send Test Events</h4>
        
        <Button
          onClick={() => handleSendEvent('price_alert')}
          disabled={!isValid || isSending}
          className="w-full justify-start bg-green-600 hover:bg-green-700"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <span className="mr-2">💰</span>
          )}
          Send Price Alert Event
        </Button>

        <Button
          onClick={() => handleSendEvent('market_summary')}
          disabled={!isValid || isSending}
          className="w-full justify-start bg-blue-600 hover:bg-blue-700"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <span className="mr-2">📊</span>
          )}
          Send Market Summary Event
        </Button>

        <Button
          onClick={() => handleSendEvent('scenario_completed')}
          disabled={!isValid || isSending}
          className="w-full justify-start bg-purple-600 hover:bg-purple-700"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <span className="mr-2">🎯</span>
          )}
          Send Scenario Completed Event
        </Button>
      </div>

      {/* Event Data Preview */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Event Data Structure</h4>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
          <div className="mb-3">
            <div className="text-gray-500">// Price Alert Event</div>
            <div>{'{'}</div>
            <div className="ml-4">"event_type": "price_alert",</div>
            <div className="ml-4">"gpu_model": "H100",</div>
            <div className="ml-4">"provider": "Vast.ai",</div>
            <div className="ml-4">"price": "$2.45/hr",</div>
            <div className="ml-4">"change": "-12%",</div>
            <div className="ml-4">"recommendation": "Strong buy",</div>
            <div className="ml-4">"timestamp": "2025-10-08T10:30:00Z"</div>
            <div>{'}'}</div>
          </div>
          <div className="text-gray-500 text-xs">
            💡 Use these fields in your Zap actions!
          </div>
        </div>
      </div>

      {/* Popular Workflows */}
      <div className="mt-6 space-y-3">
        <h4 className="font-medium">💡 Popular Workflows</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2 p-2 bg-gray-50 rounded">
            <span>📧</span>
            <div>
              <strong>Email Alerts:</strong> GPUWISE → Zapier → Gmail
              <div className="text-xs text-gray-600">Get instant email notifications</div>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 bg-gray-50 rounded">
            <span>📊</span>
            <div>
              <strong>Price Tracker:</strong> GPUWISE → Zapier → Google Sheets
              <div className="text-xs text-gray-600">Build historical price database</div>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 bg-gray-50 rounded">
            <span>💬</span>
            <div>
              <strong>Team Updates:</strong> GPUWISE → Zapier → Slack
              <div className="text-xs text-gray-600">Keep team informed automatically</div>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 bg-gray-50 rounded">
            <span>📝</span>
            <div>
              <strong>Documentation:</strong> GPUWISE → Zapier → Notion
              <div className="text-xs text-gray-600">Auto-create market analysis pages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Notice */}
      <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          ⚠️ <strong>Note:</strong> Due to browser security, we can't verify delivery in the UI. 
          After sending, check your Zapier dashboard → Your Zap → Zap History to confirm the event was received.
        </p>
      </div>

      {/* Power User Tip */}
      <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-xs text-purple-800">
          🚀 <strong>Pro Tip:</strong> Create multiple Zaps for different event types! 
          One Zap for price alerts → Email, another for market summaries → Sheets.
        </p>
      </div>
    </Card>
  );
};

export default ZapierIntegration;
