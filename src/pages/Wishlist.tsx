import Header from '@/components/Header';
import ActivityCard from '@/components/ActivityCard';
import { activities, getActivityById } from '@/data/activities';
import useWishlist from '@/hooks/useWishlist';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const wishlist = useWishlist();
  const navigate = useNavigate();

  const savedActivities = wishlist.items.map((id) => getActivityById(id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

        {savedActivities.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">You haven't saved any activities yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedActivities.map((activity) => (
              <div key={activity!.id} className="animate-fade-in">
                <ActivityCard activity={activity!} isSaved onToggleSave={() => wishlist.remove(activity!.id)} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
