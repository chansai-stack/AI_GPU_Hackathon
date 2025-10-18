/**
 * AI Chat Page
 * Entry point for AI market analyst feature
 */

import ChatInterface from '@/components/ai-chat/ChatInterface';

const AIChat = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ChatInterface />
    </div>
  );
};

export default AIChat;
