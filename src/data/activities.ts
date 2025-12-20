import type { Activity } from '@/components/ActivityCard';

export const activities: Activity[] = [
  {
    id: '1',
    title: 'Da Nang Family Cooking Class - with Local Family in Da Nang',
    image: 'https://image.cookly.me/tr:h-544,w-824,pr-true,rt-auto/images/authentic-local-da-nang-family-cooking-class_dQzjQQl.JPG',
    location: 'Da Nang',
    rating: 5,
    reviewCount: 124,
    duration: '3 hours',
    price: 45,
    originalPrice: 60,
    category: 'Tours',
    host: 'Local Guide Minh',
    lat: 16.0401621337601,
    lng: 108.221312477909,
    address: '61 Han Thuyen, Hoa Cuong Bac, Hai Chau, Da Nang',
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
    lat: 16.0711,
    lng: 108.2569,
    address: 'Son Tra Peninsula, Tho Quang, Son Tra, Da Nang',
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
    lat: 15.8801,
    lng: 108.3380,
    address: 'Hoi An Ancient Town, Minh An, Hoi An, Quang Nam',
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
    lat: 16.0484,
    lng: 108.2188,
    address: 'Marble Mountains (Ngu Hanh Son), Hoa Hai, Ngu Hanh Son, Da Nang',
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
    lat: 15.8786,
    lng: 108.3358,
    address: 'Central Market, Hoi An (Cho Hoi An), Hoi An, Quang Nam',
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
    lat: 16.1285,
    lng: 108.2123,
    address: 'Hai Van Pass, Da Nang',
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
    lat: 15.8805,
    lng: 108.3385,
    address: 'Cam Chau Craft Village, Hoi An, Quang Nam',
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
    lat: 16.0590,
    lng: 108.2330,
    address: 'My Khe Beach, Phuoc My, Son Tra, Da Nang',
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
    description: `Learn how to cook authentic Vietnamese dishes in a local family's home in Da Nang. Choose from two different menus, each featuring a variety of local dishes.

Experience the authentic culture and local life of Vietnam with a cooking class in a local home. Learn how to cook traditional Vietnamese dishes from a friendly local family host.

Spend time with your host at their home and receive step-by-step instructions on how to cook simple yet delicious authentic Vietnamese cuisine. Take a hands-on approach to your lesson and then enjoy your own dishes for lunch or dinner.

Gain insight into local life, culture, and stories from your host, who is also fluent in English and Chinese.

Choose from 2 different menus, each featuring a variety of traditional Vietnamese dishes.

Menu I:

1. Bánh Xèo – Crispy & Savory Vietnamese Crêpes / Pancakes is a popular dish in the center and south of Vietnam. The name means "sizzling pancakes or crêpes" and refers to the sound the batter makes when it hits the hot skillet. Serve these shrimp-studded crêpes with lettuce, fresh mint and basil, and nuoc cham dipping sauce.

2. Phở Cuốn / Gỏi Cuốn – Vietnamese fresh or dried rice paper rolls, a long-standing traditional dish from Northern Vietnam. Rolled pho is made from pho rice paper, wrapped with stir-fried beef with onions, shrimp or pork, cilantro, and lettuce. It is served with sweet and sour fish sauce with chopped garlic or peanut sauce.

3. Rau Muống Xào Tỏi – Vietnamese stir-fried morning glory with garlic, a very common and fresh green vegetable dish served daily with rice in Vietnamese meals.

4. Fruit Salad – Mango or pomelo salad mixed with carrot and sweet-and-sour fish sauce.

Menu II:

1. Bánh Xèo – Crispy & Savory Vietnamese Crêpes / Pancakes, served with fresh herbs and nuoc cham dipping sauce.

2. Fruit Salad – Mango or pomelo salad mixed with carrot and sweet-and-sour fish sauce.

3. Phở Bò – Vietnamese beef flat noodle soup, one of Vietnam’s most famous dishes. Originating in Northern Vietnam in the early 20th century, it features a rich broth made from beef bones, rice flat noodles (Bánh Phở), herbs, and tender beef. Garnished with coriander leaves, green onions, and white onions, and served with basil, bean sprouts, and lime juice.`
,
    whatYouDo: [
      'Experience the warmth of Vietnamese hospitality in a local family\'s home',
      'Learn how to cook authentic Vietnamese dishes from a local family',
      'The dishes are featuring a variety of local dishes of the different regions of Vietnam',
      'Discover the real secrets of the famous Vietnamese cuisine from a local family',
      'Enjoy a meal of your own creation of the great cuisine works',
    ],
    schedule: [
      '06:00 - Meet at pickup point',
      '06:30 - Arrive at Nam O village',
      '07:00 - Fishing demonstration and participation',
      '08:30 - Fresh seafood breakfast',
      '09:00 - Return to Da Nang',
    ],
    includes: [
      'Cooking lesson with a local family',
      'Lunch or dinner of the dishes prepared',
      'All ingredients for cooking',
      'English and Chinese speaking host',
      'Tea-Break and deserts',
    ],
    reviews: [
      { name: 'Sarah M.', rating: 5, comment: 'An incredible authentic experience! The local fishermen were so welcoming.', date: '2 weeks ago' },
      { name: 'John D.', rating: 5, comment: 'Much better than typical tourist activities. Highly recommend!', date: '1 month ago' },
      { name: 'Mai T.', rating: 4, comment: 'Great experience but early morning start was tough. Worth it though!', date: '1 month ago' },
    ],
    mapCoords: { lat: 16.0401621337601, lng: 108.221312477909 },
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
