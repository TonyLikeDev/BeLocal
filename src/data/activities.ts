import type { Activity } from '@/components/ActivityCard';

export const activities: Activity[] = [
  {
    id: '1',
    title: 'Nam O Fishing Tour - Traditional Fishing Experience',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    location: 'Da Nang',
    rating: 4.8,
    reviewCount: 124,
    duration: '3 hours',
    price: 45,
    originalPrice: 60,
    category: 'Tours',
    host: 'Local Guide Minh',
  },
  {
    id: '2',
    title: 'Stand Up Paddleboard (SUP) at Son Tra Peninsula',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80',
    location: 'Da Nang',
    rating: 4.9,
    reviewCount: 89,
    duration: '2 hours',
    price: 35,
    category: 'Water Sports',
    host: 'Ocean Adventure',
  },
  {
    id: '3',
    title: 'Hoi An Ancient Town Walking Tour with Local Food',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
    location: 'Hoi An',
    rating: 4.7,
    reviewCount: 256,
    duration: '4 hours',
    price: 25,
    originalPrice: 35,
    category: 'Food & Drink',
    host: 'Hoi An Heritage',
  },
  {
    id: '4',
    title: 'Marble Mountains Hiking & Cave Exploration',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    location: 'Da Nang',
    rating: 4.6,
    reviewCount: 178,
    duration: '5 hours',
    price: 40,
    category: 'Adventure',
    host: 'Mountain Explorers',
  },
  {
    id: '5',
    title: 'Vietnamese Cooking Class with Market Tour',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
    location: 'Hoi An',
    rating: 4.9,
    reviewCount: 342,
    duration: '4 hours',
    price: 55,
    category: 'Food & Drink',
    host: 'Chef Lan',
  },
  {
    id: '6',
    title: 'Hai Van Pass Motorcycle Adventure',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    location: 'Da Nang',
    rating: 4.8,
    reviewCount: 198,
    duration: '6 hours',
    price: 75,
    originalPrice: 95,
    category: 'Adventure',
    host: 'Vietnam Riders',
  },
  {
    id: '7',
    title: 'Traditional Lantern Making Workshop',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80',
    location: 'Hoi An',
    rating: 4.5,
    reviewCount: 67,
    duration: '2 hours',
    price: 20,
    category: 'Arts & Crafts',
    host: 'Artisan Village',
  },
  {
    id: '8',
    title: 'Sunrise Yoga on My Khe Beach',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    location: 'Da Nang',
    rating: 4.7,
    reviewCount: 45,
    duration: '1.5 hours',
    price: 15,
    category: 'Culture',
    host: 'Zen Beach Studio',
  },
];

export const getActivityById = (id: string): Activity | undefined => {
  return activities.find((activity) => activity.id === id);
};

export const activityDetails: Record<string, {
  description: string;
  whatYouDo: string[];
  schedule: string[];
  includes: string[];
  reviews: { name: string; rating: number; comment: string; date: string }[];
  mapCoords: { lat: number; lng: number };
}> = {
  '1': {
    description: 'Experience the authentic fishing traditions of Nam O village. Join local fishermen as they use centuries-old techniques passed down through generations. This immersive tour takes you beyond the tourist spots to discover the real heart of Vietnamese coastal life.',
    whatYouDo: [
      'Meet local fishermen and learn traditional fishing techniques',
      'Cast nets and collect the catch with the community',
      'Learn about sustainable fishing practices',
      'Enjoy fresh seafood prepared by local families',
    ],
    schedule: [
      '06:00 - Meet at pickup point',
      '06:30 - Arrive at Nam O village',
      '07:00 - Fishing demonstration and participation',
      '08:30 - Fresh seafood breakfast',
      '09:00 - Return to Da Nang',
    ],
    includes: [
      'Round-trip transportation',
      'Fresh seafood breakfast',
      'Fishing equipment',
      'English-speaking guide',
      'Water and refreshments',
    ],
    reviews: [
      { name: 'Sarah M.', rating: 5, comment: 'An incredible authentic experience! The local fishermen were so welcoming.', date: '2 weeks ago' },
      { name: 'John D.', rating: 5, comment: 'Much better than typical tourist activities. Highly recommend!', date: '1 month ago' },
      { name: 'Mai T.', rating: 4, comment: 'Great experience but early morning start was tough. Worth it though!', date: '1 month ago' },
    ],
    mapCoords: { lat: 16.1028, lng: 108.1498 },
  },
};

// Generate default details for activities without specific details
export const getActivityDetails = (id: string) => {
  if (activityDetails[id]) return activityDetails[id];
  
  return {
    description: 'Experience an unforgettable adventure with our expert local guides. This carefully curated activity offers authentic experiences that go beyond typical tourist attractions.',
    whatYouDo: [
      'Meet your friendly local guide',
      'Explore hidden gems off the beaten path',
      'Learn about local culture and traditions',
      'Create lasting memories',
    ],
    schedule: [
      'Flexible timing based on your preference',
      'Duration as specified in activity details',
      'Pickup and drop-off available',
    ],
    includes: [
      'Professional local guide',
      'All necessary equipment',
      'Light refreshments',
      'Insurance coverage',
    ],
    reviews: [
      { name: 'Guest', rating: 5, comment: 'Amazing experience! Would definitely recommend.', date: '1 week ago' },
      { name: 'Traveler', rating: 4, comment: 'Great value for money. Very professional.', date: '2 weeks ago' },
    ],
    mapCoords: { lat: 16.0544, lng: 108.2022 },
  };
};
