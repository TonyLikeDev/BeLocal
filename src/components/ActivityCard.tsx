import { Star, MapPin, Clock, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Activity {
  id: string;
  title: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: number;
  originalPrice?: number;
  category: string;
  host: string;
  lat?: number;
  lng?: number;
  address?: string;
}

interface ActivityCardProps {
  activity: Activity;
  isSaved?: boolean;
  onToggleSave?: (activityId: string) => void;
  onOpen?: (activityId: string) => void;
}

const ActivityCard = ({ activity, isSaved: isSavedProp, onToggleSave, onOpen }: ActivityCardProps) => {
  const [isLiked, setIsLiked] = useState(!!isSavedProp);
  const navigate = useNavigate();
  
  const discountPercent = activity.originalPrice 
    ? Math.round((1 - activity.price / activity.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="group overflow-hidden border-0 card-shadow hover:elevated-shadow transition-all duration-300 cursor-pointer"
      onClick={() => {
        if (onOpen) return onOpen(activity.id);
        navigate(`/activity/${activity.id}`);
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={activity.image} 
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <Badge className="absolute top-3 left-3 bg-price text-primary-foreground">
            -{discountPercent}%
          </Badge>
        )}

        {/* Category Badge */}
        <Badge variant="secondary" className="absolute top-3 right-12 bg-background/90 backdrop-blur-sm">
          {activity.category}
        </Badge>

        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleSave) {
              onToggleSave(activity.id);
            } else {
              setIsLiked(!isLiked);
            }
          }}
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              (onToggleSave ? isSavedProp : isLiked) ? 'fill-price text-price' : 'text-foreground'
            }`} 
          />
        </Button>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Location & Duration */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {activity.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {activity.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {activity.title}
        </h3>

        {/* Host */}
        <p className="text-sm text-muted-foreground">
          Hosted by <span className="text-foreground font-medium">{activity.host}</span>
        </p>

        {/* Rating & Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-star text-star" />
            <span className="font-semibold">{activity.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              ({activity.reviewCount} reviews)
            </span>
          </div>
          
          <div className="text-right">
            {activity.originalPrice && (
              <span className="text-sm text-muted-foreground line-through block">
                ${activity.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="font-bold text-lg text-primary">
              ${activity.price.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
