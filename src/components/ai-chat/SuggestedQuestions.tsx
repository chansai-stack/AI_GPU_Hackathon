/**
 * SuggestedQuestions Component
 * Quick-start prompts for users
 */

import { SUGGESTED_QUESTIONS, getRandomQuestions } from '@/lib/ai/prompts';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
  disabled?: boolean;
}

const SuggestedQuestions = ({ onQuestionClick, disabled }: SuggestedQuestionsProps) => {
  const [questions] = useState(() => getRandomQuestions(3));

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-purple-600" />
        <span className="text-sm font-medium text-gray-700">
          Suggested Questions
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {questions.map((q) => (
          <Button
            key={q.id}
            onClick={() => onQuestionClick(q.text)}
            disabled={disabled}
            variant="outline"
            size="sm"
            className="text-xs hover:bg-purple-50 hover:border-purple-300"
          >
            {q.icon && <span className="mr-1">{q.icon}</span>}
            {q.text}
          </Button>
        ))}
      </div>

      <div className="mt-2 text-xs text-gray-500">
        💡 Click a question or type your own below
      </div>
    </div>
  );
};

export default SuggestedQuestions;
