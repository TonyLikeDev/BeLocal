import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryTabs from '@/components/CategoryTabs';
import FilterBar, { Filters } from '@/components/FilterBar';
import ActivityCard from '@/components/ActivityCard';
import useWishlist from '@/hooks/useWishlist';
import { toast } from '@/hooks/use-toast';
import { activities } from '@/data/activities';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const wishlist = useWishlist();
  const [filters, setFilters] = useState<Filters>({
    sortBy: '',
    location: '',
    minRating: 0,
    priceRange: '',
    hasDiscount: false,
  });

  // Filter and sort activities
  const filteredActivities = activities
    .filter((activity) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const categoryMap: Record<string, string[]> = {
          food: ['Food & Drink'],
          tours: ['Tours'],
          water: ['Water Sports'],
          adventure: ['Adventure'],
          cycling: ['Cycling'],
          culture: ['Culture'],
          arts: ['Arts & Crafts'],
        };
        if (!categoryMap[selectedCategory]?.includes(activity.category)) {
          return false;
        }
      }

      // Location filter
      if (filters.location && activity.location !== filters.location) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && activity.rating < filters.minRating) {
        return false;
      }

      // Discount filter
      if (filters.hasDiscount && !activity.originalPrice) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const priceRanges: Record<string, [number, number]> = {
          '$': [0, 25],
          '$$': [25, 50],
          '$$$': [50, 100],
          '$$$$': [100, Infinity],
        };
        const [min, max] = priceRanges[filters.priceRange] || [0, Infinity];
        if (activity.price < min || activity.price >= max) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryTabs 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      <FilterBar filters={filters} onFiltersChange={setFilters} />

      <main className="container mx-auto px-4 py-8">
        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {filteredActivities.length} activities found
          </h2>
        </div>

        {/* Activity Grid */}
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredActivities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ActivityCard 
                  activity={activity} 
                  isSaved={wishlist.items.includes(activity.id)}
                  onToggleSave={async (activityId) => {
                    try {
                      if (!wishlist.items.includes(activityId)) {
                        await wishlist.add(activityId);
                        toast({ title: 'Saved', description: 'Added to your wishlist' });
                      } else {
                        await wishlist.remove(activityId);
                        toast({ title: 'Removed', description: 'Removed from wishlist' });
                      }
                    } catch (err: any) {
                      toast({ title: 'Error', description: err?.message || 'Could not update wishlist' });
                    }
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">No activities found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to find more activities
            </p>
          </div>
        )}
      </main>

      {/* Why Choose Us */}
      <section className="bg-white border-t">
        <div className="container mx-auto px-4 py-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">Why Choose Us</h3>
          <p className="text-muted-foreground mb-8">Here are the reasons to choose us when traveling in Da Nang</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg bg-muted/10">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-white border text-emerald-500 text-xl">📍</div>
              <h4 className="font-semibold mb-2">30+ authentic local experiences</h4>
              <p className="text-sm text-muted-foreground mb-4">Skip the tourist traps. With beLocal, you’ll step into the real Đà Nẵng, wandering hidden alleys, soaking up street vibes, and living everyday moments just like the locals.</p>
              <button className="text-sm text-emerald-600 border border-emerald-200 px-3 py-1 rounded">Learn more</button>
            </div>

            <div className="p-6 rounded-lg bg-muted/10">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-white border text-emerald-500 text-xl">🧑‍💼</div>
              <h4 className="font-semibold mb-2">100% verified local hosts</h4>
              <p className="text-sm text-muted-foreground mb-4">Every guide and host is a true local, officially verified by local authorities. They’ll share authentic stories, bring you closer to the culture, and make sure your journey feels safe and personal.</p>
              <button className="text-sm text-emerald-600 border border-emerald-200 px-3 py-1 rounded">Learn more</button>
            </div>

            <div className="p-6 rounded-lg bg-muted/10">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-white border text-emerald-500 text-xl">💲</div>
              <h4 className="font-semibold mb-2">Clear, All-Inclusive Pricing</h4>
              <p className="text-sm text-muted-foreground mb-4">What you see is exactly what you pay for, so you can relax and enjoy every moment with peace of mind.</p>
              <button className="text-sm text-emerald-600 border border-emerald-200 px-3 py-1 rounded">Learn more</button>
            </div>

            <div className="p-6 rounded-lg bg-muted/10">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-white border text-emerald-500 text-xl">🤝</div>
              <h4 className="font-semibold mb-2">Travel That Gives Back</h4>
              <p className="text-sm text-muted-foreground mb-4">Each booking helps support local livelihoods, creating opportunities for families, keeping traditions alive, and protecting the environment we all share.</p>
              <button className="text-sm text-emerald-600 border border-emerald-200 px-3 py-1 rounded">Learn more</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">All Activities</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Popular Tours</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Food Experiences</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Adventure</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Da Nang</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Hoi An</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Hue</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Ho Chi Minh City</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cancellation Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Become a Host</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 BeLocal.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
