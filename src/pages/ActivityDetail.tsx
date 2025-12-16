import { useState } from 'react';
import useWishlist from '@/hooks/useWishlist';
import { toast } from '@/hooks/use-toast';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import LocationMap from '@/components/LocationMap';
import PaymentModal from '@/components/PaymentModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Calendar, 
  ChevronLeft, 
  Heart,
  Share2,
  CheckCircle2,
  User
} from 'lucide-react';
import { getActivityById, getActivityDetails } from '@/data/activities';

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(1);
  const wishlist = useWishlist();

  const activity = getActivityById(id || '');
  const details = getActivityDetails(id || '');

  if (!activity) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Activity not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const totalPrice = activity.price * guests;

  // Generate next 7 days for date selection
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return {
      value: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to activities
        </button>
      </div>

      <main className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Activity Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <img 
                src={activity.image} 
                alt={activity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-background/80 backdrop-blur-sm"
                  onClick={async () => {
                    try {
                      if (!wishlist.isSaved(activity.id)) {
                        await wishlist.add(activity.id);
                        toast({ title: 'Saved', description: 'Added to your wishlist' });
                      } else {
                        await wishlist.remove(activity.id);
                        toast({ title: 'Removed', description: 'Removed from wishlist' });
                      }
                    } catch (err: any) {
                      toast({ title: 'Error', description: err?.message || 'Could not update wishlist' });
                    }
                  }}
                >
                  <Heart className={`h-4 w-4 ${wishlist.isSaved(activity.id) ? 'fill-price text-price' : ''}`} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              {activity.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-price text-primary-foreground">
                  {Math.round((1 - activity.price / activity.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Title & Rating */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary">{activity.category}</Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-star text-star" />
                  <span className="font-semibold">{activity.rating}</span>
                  <span className="text-muted-foreground">({activity.reviewCount} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold">{activity.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {activity.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {activity.duration}
                </span>
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Hosted by {activity.host}
                </span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About this experience</h2>
              <div className="text-muted-foreground leading-relaxed">
                {/** Render description with simple parsing: paragraphs and bullet lists for numbered lines */}
                {(() => {
                  const text: string = details.description || '';
                  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l !== '');
                  const elements: any[] = [];
                  let i = 0;
                  while (i < lines.length) {
                    const line = lines[i];
                    // detect numbered list start (e.g., "1. Item")
                    if (/^\d+\./.test(line)) {
                      const items: string[] = [];
                      while (i < lines.length && /^\d+\./.test(lines[i])) {
                        // remove leading numbering
                        items.push(lines[i].replace(/^\d+\.\s*/, ''));
                        i++;
                      }
                      elements.push(
                        <ul className="list-disc pl-5 space-y-1" key={`list-${i}`}>
                            {items.map((it, idx) => (
                              <li key={idx} className="text-base text-muted-foreground">{it}</li>
                            ))}
                          </ul>
                      );
                      continue;
                    }

                    // detect bullet-like lines starting with - or •
                    if (/^[\-•]\s+/.test(line)) {
                      const items: string[] = [];
                      while (i < lines.length && (/^[\-•]\s+/.test(lines[i]))) {
                        items.push(lines[i].replace(/^[\-•]\s+/, ''));
                        i++;
                      }
                      elements.push(
                        <ul className="list-disc pl-5 space-y-1" key={`list-${i}`}>
                            {items.map((it, idx) => (
                              <li key={idx} className="text-base text-muted-foreground">{it}</li>
                            ))}
                          </ul>
                      );
                      continue;
                    }

                    // treat as paragraph or heading (e.g., Menu I:)
                    if (/^Menu\s+[I|V|X]+\:/i.test(line) || /Menu\s+II/i.test(line) || /Menu\s+I/i.test(line)) {
                      elements.push(
                        <p key={`p-${i}`} className="font-medium text-base text-foreground">{line}</p>
                      );
                      i++;
                      continue;
                    }

                    elements.push(
                      <p key={`p-${i}`} className="text-base text-muted-foreground">{line}</p>
                    );
                    i++;
                  }

                  return elements;
                })()}
              </div>
            </div>

            <Separator />

            {/* What You'll Do */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">What you'll do</h2>
              <ul className="space-y-3">
                {details.whatYouDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Schedule */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Schedule</h2>
              <div className="space-y-3">
                {details.schedule.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* What's Included */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">What's included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {details.includes.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Map Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Location</h2>
                <div className="mb-3 text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{details?.address ?? activity.address ?? 'Location not specified'}</span>
                </div>
                <div className="rounded-xl overflow-hidden border">
                  <LocationMap 
                    lat={details?.mapCoords?.lat ?? activity.lat ?? 16.047079} 
                    lng={details?.mapCoords?.lng ?? activity.lng ?? 108.206230}
                    locationName={activity.location}
                  />
                </div>
            </div>

            <Separator />

            {/* Reviews */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Guest Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-star text-star" />
                  <span className="font-bold text-lg">{activity.rating}</span>
                  <span className="text-muted-foreground">({activity.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {details.reviews.map((review, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-semibold text-primary">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{review.name}</span>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${
                                  i < review.rating 
                                    ? 'fill-star text-star' 
                                    : 'text-muted'
                                }`} 
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground text-sm">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="card-shadow">
                <CardContent className="p-6 space-y-6">
                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      ${activity.price}
                    </span>
                    {activity.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${activity.originalPrice}
                      </span>
                    )}
                    <span className="text-muted-foreground">/ person</span>
                  </div>

                  <Separator />

                  {/* Date Selection */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-medium">
                      <Calendar className="h-4 w-4" />
                      Select Date
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableDates.slice(0, 4).map((date) => (
                        <Button
                          key={date.value}
                          variant={selectedDate === date.value ? 'default' : 'outline'}
                          size="sm"
                          className="text-xs"
                          onClick={() => setSelectedDate(date.value)}
                        >
                          {date.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Guest Selection */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-medium">
                      <Users className="h-4 w-4" />
                      Guests
                    </label>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                      >
                        -
                      </Button>
                      <span className="text-xl font-semibold w-8 text-center">{guests}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                        disabled={guests >= 10}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Total Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      ${activity.price} × {guests} guest{guests > 1 ? 's' : ''}
                    </span>
                    <span className="text-xl font-bold">${totalPrice}</span>
                  </div>

                  {/* Book Button */}
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={() => setIsPaymentOpen(true)}
                    disabled={!selectedDate}
                  >
                    {selectedDate ? 'Book Now' : 'Select a date'}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Free cancellation up to 24 hours before scheduled arrival time
                  </p>

                  {/* Host Info */}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Hosted by {activity.host}</p>
                      <p className="text-sm text-muted-foreground">Local Expert • 5 years hosting</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <PaymentModal 
        open={isPaymentOpen} 
        onOpenChange={setIsPaymentOpen}
        amount={totalPrice}
        activityTitle={activity.title}
        activityId={activity.id}
        date={selectedDate}
        guests={guests}
      />
    </div>
  );
};

export default ActivityDetail;
