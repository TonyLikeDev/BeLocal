import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal, Star, MapPin, Percent, TrendingUp, X } from 'lucide-react';
import FilterModal from './FilterModal';

export interface Filters {
  sortBy: string;
  location: string;
  minRating: number;
  priceRange: string;
  hasDiscount: boolean;
}

interface FilterBarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const quickFilters = [
  { id: 'recommended', label: 'Recommended', icon: TrendingUp },
  { id: 'rating', label: 'Highest Rated', icon: Star },
  { id: 'distance', label: 'Nearest', icon: MapPin },
  { id: 'discount', label: 'Discounts', icon: Percent },
];

const FilterBar = ({ filters, onFiltersChange }: FilterBarProps) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const activeFiltersCount = [
    filters.location,
    filters.minRating > 0,
    filters.priceRange,
    filters.hasDiscount,
  ].filter(Boolean).length;

  return (
    <>
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Button 
              variant="outline" 
              size="sm"
              className="shrink-0 gap-2"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            <div className="h-6 w-px bg-border shrink-0" />

            {quickFilters.map((filter) => {
              const isActive = filters.sortBy === filter.id || 
                (filter.id === 'discount' && filters.hasDiscount);
              
              return (
                <Button
                  key={filter.id}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  className="shrink-0 gap-2"
                  onClick={() => {
                    if (filter.id === 'discount') {
                      onFiltersChange({ ...filters, hasDiscount: !filters.hasDiscount });
                    } else {
                      onFiltersChange({ 
                        ...filters, 
                        sortBy: filters.sortBy === filter.id ? '' : filter.id 
                      });
                    }
                  }}
                >
                  <filter.icon className="h-4 w-4" />
                  {filter.label}
                </Button>
              );
            })}

            {/* Active filter badges */}
            {filters.location && (
              <Badge variant="secondary" className="shrink-0 gap-1 pr-1">
                {filters.location}
                <button 
                  onClick={() => onFiltersChange({ ...filters, location: '' })}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {filters.minRating > 0 && (
              <Badge variant="secondary" className="shrink-0 gap-1 pr-1">
                <Star className="h-3 w-3 fill-star text-star" />
                {filters.minRating}+
                <button 
                  onClick={() => onFiltersChange({ ...filters, minRating: 0 })}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      </div>

      <FilterModal 
        open={isFilterModalOpen} 
        onOpenChange={setIsFilterModalOpen}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
    </>
  );
};

export default FilterBar;
