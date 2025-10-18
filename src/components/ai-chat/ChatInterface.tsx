/**
 * ChatInterface Component
 * Main chat UI with message history and input
 */

import { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatState } from '@/types/chat';
import { askAI, formatQuestionWithContext } from '@/lib/ai/geminiClient';
import MessageBubble from './MessageBubble';
import SuggestedQuestions from './SuggestedQuestions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Loader2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const ChatInterface = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        role: 'system',
        content: '👋 Welcome! I\'m your AI GPU market advisor. Ask me anything about procurement, pricing, or strategy.',
        timestamp: new Date(),
      },
    ],
    isLoading: false,
    error: null,
  });

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);

  // Send message
  const handleSendMessage = async (text?: string) => {
    const question = text || inputValue.trim();

    if (!question || chatState.isLoading) return;

    // Clear input
    setInputValue('');

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      // Get AI response
      const response = await askAI(formatQuestionWithContext(question));

      // Add AI message
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        confidence: response.confidence,
        timestamp: response.timestamp,
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false,
      }));

      if (response.error) {
        toast.error('AI response may be incomplete');
      }

    } catch (error: any) {
      console.error('Chat error:', error);
      
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));

      toast.error('Failed to get AI response. Please try again.');
    }
  };

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  // Reset conversation
  const handleReset = () => {
    setChatState({
      messages: [
        {
          id: '1',
          role: 'system',
          content: '👋 Conversation reset. How can I help you?',
          timestamp: new Date(),
        },
      ],
      isLoading: false,
      error: null,
    });
    toast.success('Conversation reset');
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">🤖 AI Market Analyst</h2>
          <p className="text-sm text-gray-600">
            Powered by Google Gemini • Ask anything about GPU markets
          </p>
        </div>
        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 overflow-hidden flex flex-col mb-4">
        <div className="flex-1 overflow-y-auto p-6">
          {chatState.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Loading indicator */}
          {chatState.isLoading && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
              <div className="bg-gray-100 rounded-lg px-4 py-3">
                <p className="text-sm text-gray-600">
                  Analyzing market data...
                </p>
              </div>
            </div>
          )}

          {/* Error message */}
          {chatState.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-800">
                ⚠️ {chatState.error}
              </p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions (show only if no user messages yet) */}
        {chatState.messages.filter(m => m.role === 'user').length === 0 && (
          <div className="border-t p-4 bg-gray-50">
            <SuggestedQuestions
              onQuestionClick={handleSuggestedQuestion}
              disabled={chatState.isLoading}
            />
          </div>
        )}

        {/* Input Area */}
        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about GPU pricing, timing, strategy..."
              disabled={chatState.isLoading}
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || chatState.isLoading}
              size="icon"
            >
              {chatState.isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </Card>

      {/* Info Footer */}
      <div className="text-center text-xs text-gray-500">
        <p>
          AI responses are generated in real-time and may not always be accurate.
          Always verify critical decisions with additional sources.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
