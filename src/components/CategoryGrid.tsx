import React from 'react';
import { Button } from '@/components/ui/button';

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

const categories = [
  { name: 'Healthcare', icon: '🏥', color: 'from-red-500 to-pink-500' },
  { name: 'Banking', icon: '🏦', color: 'from-blue-500 to-indigo-500' },
  { name: 'Shopping', icon: '🛍️', color: 'from-purple-500 to-pink-500' },
  { name: 'Food', icon: '🍱', color: 'from-orange-500 to-red-500' },
  { name: 'Automobile', icon: '🚗', color: 'from-gray-500 to-blue-500' },
  { name: 'Fresh', icon: '🥦', color: 'from-green-500 to-emerald-500' },
  { name: 'Salon', icon: '💇', color: 'from-pink-500 to-rose-500' }
];

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Button
          key={category.name}
          onClick={() => onCategorySelect(category.name)}
          className={`h-24 flex flex-col items-center justify-center bg-gradient-to-br ${category.color} hover:scale-105 transform transition-all duration-200 shadow-lg border-0 text-white font-semibold`}
        >
          <div className="text-2xl mb-1">{category.icon}</div>
          <div className="text-sm">{category.name}</div>
        </Button>
      ))}
    </div>
  );
};

export default CategoryGrid;