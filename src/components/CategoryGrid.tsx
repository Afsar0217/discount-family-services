import React from 'react';
import { Button } from '@/components/ui/button';

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

const categories = [
  { name: 'Healthcare', displayName: 'Healthcare', icon: '🏥', color: 'from-red-500 to-pink-500' },
  { name: 'Automobiles', displayName: 'Automobile', icon: '🚗', color: 'from-gray-500 to-blue-500' },
  { name: 'Banking', displayName: 'Banking', icon: '🏦', color: 'from-blue-500 to-indigo-500' },
  { name: 'Bar', displayName: 'Bar', icon: '🍺', color: 'from-purple-500 to-violet-500' },
  { name: 'Construction', displayName: 'Construction', icon: '🏗️', color: 'from-orange-500 to-yellow-500' },
  { name: 'Events', displayName: 'Events', icon: '🎉', color: 'from-indigo-500 to-purple-500' },
  { name: 'Food', displayName: 'Food', icon: '🍱', color: 'from-orange-500 to-red-500' },
  { name: 'Fresh', displayName: 'Fresh', icon: '🥦', color: 'from-green-500 to-emerald-500' },
  { name: 'Laundry', displayName: 'Laundry', icon: '👕', color: 'from-blue-500 to-cyan-500' },
  { name: 'Salon', displayName: 'Salon', icon: '💇', color: 'from-pink-500 to-rose-500' },
  { name: 'Shopping', displayName: 'Shopping', icon: '🛍️', color: 'from-purple-500 to-pink-500' },
  { name: 'Travels', displayName: 'Travels', icon: '✈️', color: 'from-teal-500 to-cyan-500' }
];

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
      {categories.map((category) => (
        <Button
          key={category.name}
          onClick={() => onCategorySelect(category.name)}
          className={`h-16 sm:h-20 md:h-24 flex flex-col items-center justify-center bg-gradient-to-br ${category.color} hover:scale-105 transform transition-all duration-200 shadow-lg border-0 text-white font-semibold p-2`}
        >
          <div className="text-lg sm:text-xl md:text-2xl mb-1">{category.icon}</div>
          <div className="text-xs sm:text-sm leading-tight text-center">{category.displayName}</div>
        </Button>
      ))}
    </div>
  );
};

export default CategoryGrid;