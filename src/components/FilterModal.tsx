import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, DollarSign } from 'lucide-react';
import type { Filters } from './FilterBar';

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const locations = [
  'Da Nang',
  'Hoi An',
  'Hue',
  'Ho Chi Minh City',
  'Hanoi',
  'Nha Trang',
];

const ratingOptions = [
  { value: '4.5', label: '4.5 & above' },
  { value: '4', label: '4.0 & above' },
  { value: '3.5', label: '3.5 & above' },
  { value: '3', label: '3.0 & above' },
];

const priceRanges = [
  { value: '$', label: 'Budget' },
  { value: '$$', label: 'Mid-range' },
  { value: '$$$', label: 'Premium' },
  { value: '$$$$', label: 'Luxury' },
];

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'rating', label: 'Highest Rating' },
  { value: 'distance', label: 'Distance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

const FilterModal = ({ open, onOpenChange, filters, onFiltersChange }: FilterModalProps) => {
  const handleReset = () => {
    onFiltersChange({
      sortBy: '',
      location: '',
      minRating: 0,
      priceRange: '',
      hasDiscount: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Filter Activities</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Sort By */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              Sort by
            </Label>
            <RadioGroup 
              value={filters.sortBy} 
              onValueChange={(value) => onFiltersChange({ ...filters, sortBy: value })}
            >
              {sortOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                  <Label htmlFor={`sort-${option.value}`} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Location */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <Button
                  key={location}
                  variant={filters.location === location ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFiltersChange({ 
                    ...filters, 
                    location: filters.location === location ? '' : location 
                  })}
                >
                  {location}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Rating */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Star className="h-4 w-4" />
              Rating
            </Label>
            <div className="flex flex-wrap gap-2">
              {ratingOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filters.minRating === parseFloat(option.value) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFiltersChange({ 
                    ...filters, 
                    minRating: filters.minRating === parseFloat(option.value) ? 0 : parseFloat(option.value)
                  })}
                  className="gap-1"
                >
                  <Star className="h-3 w-3 fill-star text-star" />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price Range
            </Label>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={filters.priceRange === range.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFiltersChange({ 
                    ...filters, 
                    priceRange: filters.priceRange === range.value ? '' : range.value 
                  })}
                >
                  {range.value} - {range.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Discount */}
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="discount" 
              checked={filters.hasDiscount}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, hasDiscount: checked as boolean })
              }
            />
            <Label htmlFor="discount" className="cursor-pointer">
              Show only discounted activities
            </Label>
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            Reset All
          </Button>
          <Button onClick={() => onOpenChange(false)} className="flex-1">
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
