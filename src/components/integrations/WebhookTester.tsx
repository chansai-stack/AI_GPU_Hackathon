/**
 * WebhookTester Component
 * Reusable component for testing any webhook
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface WebhookTesterProps {
  platform: 'discord' | 'slack' | 'zapier';
  webhookUrl: string;
  onUrlChange: (url: string) => void;
  onTest: () => Promise<boolean>;
  isValid: boolean;
  storageKey: string;
}

const WebhookTester = ({
  platform,
  webhookUrl,
  onUrlChange,
  onTest,
  isValid,
  storageKey,
}: WebhookTesterProps) => {
  const [isTesting, setIsTesting] = useState(false);
  const [lastTestResult, setLastTestResult] = useState<'success' | 'error' | null>(null);

  const platformConfig = {
    discord: {
      name: 'Discord',
      color: '#5865F2',
      placeholder: 'https://discord.com/api/webhooks/...',
    },
    slack: {
      name: 'Slack',
      color: '#E01E5A',
      placeholder: 'https://hooks.slack.com/services/...',
    },
    zapier: {
      name: 'Zapier',
      color: '#FF4A00',
      placeholder: 'https://hooks.zapier.com/hooks/catch/...',
    },
  };

  const config = platformConfig[platform];

  const handleTest = async () => {
    if (!isValid) {
      toast.error(`Please enter a valid ${config.name} webhook URL`);
      return;
    }

    setIsTesting(true);
    setLastTestResult(null);

    try {
      const result = await onTest();
      
      if (result) {
        setLastTestResult('success');
        toast.success(`✅ Test successful! Check your ${config.name} channel.`);
      } else {
        setLastTestResult('error');
        toast.error(`❌ Test failed. Check your webhook URL.`);
      }
    } catch (error) {
      setLastTestResult('error');
      toast.error('Network error. Please try again.');
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    if (!isValid) {
      toast.error('Invalid webhook URL');
      return;
    }

    localStorage.setItem(storageKey, webhookUrl);
    toast.success('Webhook URL saved!');
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{config.name} Webhook</h4>
          {isValid && (
            <Badge variant="outline" className="bg-green-50 text-green-700">
              ✅ Valid
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              value={webhookUrl}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder={config.placeholder}
              className={webhookUrl ? (isValid ? 'border-green-500' : 'border-red-500') : ''}
            />
            {webhookUrl && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValid ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
            )}
          </div>
          <Button onClick={handleSave} variant="outline" size="sm">
            Save
          </Button>
        </div>

        <Button
          onClick={handleTest}
          disabled={!isValid || isTesting}
          className="w-full"
          variant="outline"
        >
          {isTesting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Test Connection
            </>
          )}
        </Button>

        {lastTestResult && (
          <div
            className={`p-3 rounded-lg text-sm ${
              lastTestResult === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {lastTestResult === 'success' ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Connection successful!
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Connection failed. Please check your URL.
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default WebhookTester;
