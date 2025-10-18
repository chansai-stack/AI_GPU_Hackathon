/**
 * Integrations - Type Definitions
 */

export type AlertType = 'price' | 'supply' | 'brief';

export interface WebhookConfig {
  url: string;
  platform: 'discord' | 'slack' | 'zapier';
  isValid: boolean;
}

export interface DiscordEmbed {
  title: string;
  description: string;
  color: number;
  timestamp: string;
  footer: {
    text: string;
  };
}

export interface DiscordWebhookPayload {
  username: string;
  embeds: DiscordEmbed[];
}

export interface AlertContent {
  title: string;
  description: string;
  color: number;
}
