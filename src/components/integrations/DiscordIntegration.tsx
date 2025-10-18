/**
 * DiscordIntegration Component
 * UI for configuring and testing Discord webhooks
 */

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { sendDiscordAlert, isValidDiscordWebhook } from '@/lib/integrations/discord';
import { AlertType } from '@/types/integrations';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Loader2, ExternalLink } from 'lucide-react';

const DiscordIntegration = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Load saved webhook from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('discord_webhook_url');
    if (saved) {
      setWebhookUrl(saved);
      setIsValid(isValidDiscordWebhook(saved));
    }
  }, []);

  // Save webhook to localStorage
  const handleSaveWebhook = () => {
    if (!webhookUrl.trim()) {
      toast.error('Please enter a webhook URL');
      return;
    }

    if (!isValidDiscordWebhook(webhookUrl)) {
      toast.error('Invalid Discord webhook URL');
      setIsValid(false);
      return;
    }

    localStorage.setItem('discord_webhook_url', webhookUrl);
    setIsValid(true);
    toast.success('Discord webhook saved!');
  };

  // Send test alert
  const handleSendAlert = async (alertType: AlertType) => {
    if (!isValid || !webhookUrl) {
      toast.error('Please configure your Discord webhook first');
      return;
    }

    setIsSending(true);

    try {
      const result = await sendDiscordAlert(webhookUrl, alertType);

      if (result.success) {
        toast.success('✅ Alert sent to Discord! Check your channel.');
      } else {
        toast.error(result.error || 'Failed to send alert');
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
          <div className="w-12 h-12 rounded-lg bg-[#5865F2] flex items-center justify-center">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              Discord Alerts
              {isValid && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  ✅ LIVE
                </Badge>
              )}
            </h3>
            <p className="text-sm text-gray-600">
              Real-time GPU market alerts in Discord channels
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-sm text-blue-800">
          <strong>Features:</strong> Webhooks • AI-generated content • 3 alert types • Rich embeds
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          🔧 Setup Instructions
        </h4>
        <div className="space-y-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-[60px]">Step 1:</span>
            <span>Open your Discord server → Server Settings → Integrations</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-[60px]">Step 2:</span>
            <span>Click "Webhooks" → "New Webhook"</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-[60px]">Step 3:</span>
            <span>Name it "GPUWISE Bot" → Choose channel → Copy Webhook URL</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold min-w-[60px]">Step 4:</span>
            <span>Paste the URL below and click Save</span>
          </div>
        </div>
        
          href="https://discord.com/developers/docs/resources/webhook"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
        >
          📚 Read Discord Webhook Documentation
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Webhook Configuration */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Discord Webhook URL
        </label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              value={webhookUrl}
              onChange={(e) => {
                setWebhookUrl(e.target.value);
                setIsValid(isValidDiscordWebhook(e.target.value));
              }}
              placeholder="https://discord.com/api/webhooks/..."
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

      {/* Alert Buttons */}
      <div className="space-y-3">
        <h4 className="font-medium">Test Alerts</h4>
        
        <Button
          onClick={() => handleSendAlert('price')}
          disabled={!isValid || isSending}
          className="w-full justify-start bg-green-600 hover:bg-green-700"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <span className="mr-2">💰</span>
          )}
          Send Price Drop Alert
        </Button>

        <Button
          onClick={() => handleSendAlert('supply')}
          disabled={!isValid || isSending}
          className="w-full justify-start bg-orange-600 hover:bg-orange-700"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <span className="mr-2">⚠️</span>
          )}
          Send Supply Warning
        </Button>

        <Button
          onClick={() => handleSendAlert('brief')}
          disabled={!isValid || isSending}
          className="w-full justify-start bg-blue-600 hover:bg-blue-700"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <span className="mr-2">📊</span>
          )}
          Send Market Brief
        </Button>
      </div>

      {/* Alert Descriptions */}
      <div className="mt-6 space-y-2 text-xs text-gray-600">
        <p>
          <strong>💰 Price Alert:</strong> Notify about significant GPU price drops
        </p>
        <p>
          <strong>⚠️ Supply Warning:</strong> Alert when GPU availability is critically low
        </p>
        <p>
          <strong>📊 Market Brief:</strong> Daily summary of GPU market conditions
        </p>
      </div>

      {/* AI Notice */}
      <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-xs text-purple-800">
          🤖 <strong>AI-Powered:</strong> Each alert is uniquely generated by Gemini AI with current market context. No two alerts are exactly the same!
        </p>
      </div>
    </Card>
  );
};

export default DiscordIntegration;
