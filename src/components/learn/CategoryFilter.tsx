/**
 * CategoryFilter Component
 * Filter articles by category
 */

import { Button } from '@/components/ui/button';
import { ArticleCategory } from '@/lib/learn/articles';

interface CategoryFilterProps {
  selectedCategory: ArticleCategory | 'all';
  onCategoryChange: (category: ArticleCategory | 'all') => void;
  counts: Record<string, number>;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange, counts }: CategoryFilterProps) => {
  const categories: { id: ArticleCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Articles', icon: '📚' },
    { id: 'basics', label: 'GPU Basics', icon: '🎓' },
    { id: 'market', label: 'Market Dynamics', icon: '📈' },
    { id: 'procurement', label: 'Procurement', icon: '🛒' },
    { id: 'technology', label: 'Technology', icon: '🚀' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          size="sm"
          className="gap-2"
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
          <span className="ml-1 text-xs opacity-70">({counts[category.id]})</span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
