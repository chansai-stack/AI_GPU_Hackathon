/**
 * ArticleCard Component
 * Displays individual article preview
 */

import { Article } from '@/lib/learn/articles';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
}

const ArticleCard = ({ article, onClick }: ArticleCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      basics: 'bg-blue-100 text-blue-800 border-blue-200',
      market: 'bg-green-100 text-green-800 border-green-200',
      procurement: 'bg-purple-100 text-purple-800 border-purple-200',
      technology: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[category as keyof typeof colors];
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'beginner') return 'bg-green-100 text-green-800';
    if (difficulty === 'intermediate') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card
      className="p-5 hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => onClick(article)}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="text-3xl">{article.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold group-hover:text-purple-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {article.description}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant="outline" className={`text-xs ${getCategoryColor(article.category)}`}>
          {article.category.toUpperCase()}
        </Badge>
        <Badge variant="outline" className={`text-xs ${getDifficultyColor(article.difficulty)}`}>
          {article.difficulty}
        </Badge>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{article.readTime} min read</span>
        </div>
        <div className="flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          <span>Article</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {article.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default ArticleCard;
