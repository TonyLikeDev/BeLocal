import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Compass, 
  Utensils, 
  Camera, 
  Waves, 
  Mountain, 
  Bike, 
  Music, 
  Palette 
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: Compass },
  { id: 'food', label: 'Food & Drink', icon: Utensils },
  { id: 'tours', label: 'Tours', icon: Camera },
  { id: 'water', label: 'Water Sports', icon: Waves },
  { id: 'adventure', label: 'Adventure', icon: Mountain },
  { id: 'cycling', label: 'Cycling', icon: Bike },
  { id: 'culture', label: 'Culture', icon: Music },
  { id: 'arts', label: 'Arts & Crafts', icon: Palette },
];

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <Button
                key={category.id}
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                className={`shrink-0 gap-2 ${
                  isActive 
                    ? '' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
