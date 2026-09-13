export interface Category {
  name: string;
  count: number;
  description: string;
  image: string;
}

export interface Vehicle {
  name: string;
  price: string;
  fuelType: string;
  transmission: string;
  matchScore: number;
  image: string;
}

export interface Recommendation {
  name: string;
  matchPercent: number;
  price: string;
  reason: string;
}

export interface ComparisonMetric {
  label: string;
  car1Value: number;
  car2Value: number;
  car1Label: string;
  car2Label: string;
  winner: 'car1' | 'car2';
}

export const categories: Category[] = [
  {
    name: 'Hatchback',
    count: 48,
    description: 'Compact and nimble for city driving',
    image: 'https://images.pexels.com/photos/17078606/pexels-photo-17078606.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Sedan',
    count: 72,
    description: 'Elegant comfort for everyday journeys',
    image: 'https://images.pexels.com/photos/35628774/pexels-photo-35628774.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Crossover',
    count: 56,
    description: 'Versatile blend of car and SUV',
    image: 'https://images.pexels.com/photos/29057708/pexels-photo-29057708.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'SUV',
    count: 84,
    description: 'Spacious and capable for any terrain',
    image: 'https://images.pexels.com/photos/17612417/pexels-photo-17612417.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Full-Size SUV',
    count: 39,
    description: 'Maximum space for large families',
    image: 'https://images.pexels.com/photos/27497571/pexels-photo-27497571.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Pickup',
    count: 31,
    description: 'Built tough for work and adventure',
    image: 'https://images.pexels.com/photos/35706764/pexels-photo-35706764.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Hybrid',
    count: 45,
    description: 'Efficient power without compromise',
    image: 'https://images.pexels.com/photos/9799995/pexels-photo-9799995.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Electric',
    count: 67,
    description: 'Zero emissions, instant torque',
    image: 'https://images.pexels.com/photos/4678065/pexels-photo-4678065.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const recommendations: Recommendation[] = [
  {
    name: 'Hyundai Tucson',
    matchPercent: 94,
    price: 'Rs 58.2 Lakh',
    reason: 'Best overall value with premium features and excellent safety rating',
  },
  {
    name: 'Haval H6 HEV',
    matchPercent: 89,
    price: 'Rs 55.0 Lakh',
    reason: 'Hybrid efficiency with spacious interior and modern tech',
  },
  {
    name: 'Chery Tiggo 8 Pro',
    matchPercent: 85,
    price: 'Rs 52.5 Lakh',
    reason: '7-seat flexibility with advanced driver assistance',
  },
];

export const comparisonMetrics: ComparisonMetric[] = [
  {
    label: 'Price',
    car1Value: 55,
    car2Value: 70,
    car1Label: 'Rs 55.0L',
    car2Label: 'Rs 62.0L',
    winner: 'car1',
  },
  {
    label: 'Power',
    car1Value: 138,
    car2Value: 180,
    car1Label: '138 hp',
    car2Label: '180 hp',
    winner: 'car2',
  },
  {
    label: 'Fuel Economy',
    car1Value: 14,
    car2Value: 16,
    car1Label: '14 km/l',
    car2Label: '16 km/l',
    winner: 'car2',
  },
  {
    label: 'Space',
    car1Value: 75,
    car2Value: 80,
    car1Label: '475L boot',
    car2Label: '510L boot',
    winner: 'car2',
  },
  {
    label: 'Technology',
    car1Value: 85,
    car2Value: 90,
    car1Label: '8" display',
    car2Label: '10.2" display',
    winner: 'car2',
  },
  {
    label: 'Safety',
    car1Value: 92,
    car2Value: 88,
    car1Label: '5-star NCAP',
    car2Label: '4-star NCAP',
    winner: 'car1',
  },
];

export const trendingVehicles: Vehicle[] = [
  {
    name: 'Tesla Model 3',
    price: 'Rs 82.0 Lakh',
    fuelType: 'Electric',
    transmission: 'Automatic',
    matchScore: 96,
    image: 'https://images.pexels.com/photos/11822720/pexels-photo-11822720.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Hyundai Tucson',
    price: 'Rs 58.2 Lakh',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    matchScore: 94,
    image: 'https://images.pexels.com/photos/13767773/pexels-photo-13767773.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Toyota Corolla',
    price: 'Rs 55.0 Lakh',
    fuelType: 'Hybrid',
    transmission: 'CVT',
    matchScore: 91,
    image: 'https://images.pexels.com/photos/15194849/pexels-photo-15194849.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Honda Civic',
    price: 'Rs 62.0 Lakh',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    matchScore: 89,
    image: 'https://images.pexels.com/photos/27138933/pexels-photo-27138933.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Kia Sportage',
    price: 'Rs 65.5 Lakh',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    matchScore: 87,
    image: 'https://images.pexels.com/photos/31501638/pexels-photo-31501638.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Ford Ranger',
    price: 'Rs 48.0 Lakh',
    fuelType: 'Diesel',
    transmission: 'Manual',
    matchScore: 83,
    image: 'https://images.pexels.com/photos/10196543/pexels-photo-10196543.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const heroImage = 'https://images.pexels.com/photos/94272/sports-car-pkw-auto-vehicle-94272.jpeg?auto=compress&cs=tinysrgb&w=1920';
