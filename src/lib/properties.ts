export interface Vehicle {
  id: string;
  name: string;
  category: "Executive SUV" | "Luxury Sedan" | "Supercar" | "Security & Escort";
  location: string;
  pricePerDay: number;
  pricePerNight: number;
  securityDeposit: number;
  cleaningFee: number;
  serviceFeePerNight: number;
  chauffeurFeePerDay: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  amenities: string[];
  seats: number;
  guests: number;
  horsepower: number;
  acceleration: string;
  transmission: string;
  topSpeed: string;
  engine: string;
}

export type Property = Vehicle;

export const listing: Vehicle[] = [
  {
    id: "rolls-royce-ghost",
    name: "Rolls-Royce Ghost",
    category: "Luxury Sedan",
    location: "Lagos & Abuja",
    pricePerDay: 1850000,
    pricePerNight: 1850000,
    securityDeposit: 400000,
    cleaningFee: 400000,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 50000,
    rating: 4.98,
    reviewCount: 42,
    image: "/rolls_royce_ghost_1789978376505.jpg",
    images: [
      "/rolls_royce_ghost_1789978376505.jpg",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1000&q=80&auto=format&fit=crop",
    ],
    amenities: [
      "VIP Chauffeur Available",
      "Starlight Headliner",
      "Champagne Cooler",
      "Airport Tarmac Delivery",
      "Comprehensive Insurance",
    ],
    seats: 4,
    guests: 4,
    horsepower: 563,
    acceleration: "4.6s (0–60)",
    transmission: "Automatic",
    topSpeed: "155 mph",
    engine: "6.75L Twin-Turbo V12",
  },
  {
    id: "lamborghini-urus",
    name: "Lamborghini Urus",
    category: "Supercar",
    location: "Lagos (VI & Ikoyi)",
    pricePerDay: 1600000,
    pricePerNight: 1600000,
    securityDeposit: 400000,
    cleaningFee: 400000,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 50000,
    rating: 4.97,
    reviewCount: 56,
    image: "/lamborghini_urus_1789978487701.jpg",
    images: [
      "/lamborghini_urus_1789978487701.jpg",
    ],
    amenities: [
      "High-Performance Super SUV",
      "Bang & Olufsen 3D Sound",
      "Akrapovic Exhaust",
      "All-Wheel Drive",
      "White-Glove Delivery",
    ],
    seats: 5,
    guests: 5,
    horsepower: 657,
    acceleration: "3.1s (0–60)",
    transmission: "8-Speed Dual-Clutch",
    topSpeed: "190 mph",
    engine: "4.0L Bi-Turbo V8",
  },
  {
    id: "ferrari-f8-tributo",
    name: "Ferrari F8 Tributo Spider",
    category: "Supercar",
    location: "Lagos (VI & Lekki)",
    pricePerDay: 2200000,
    pricePerNight: 2200000,
    securityDeposit: 500000,
    cleaningFee: 500000,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 50000,
    rating: 4.99,
    reviewCount: 38,
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=85&auto=format&fit=crop",
    ],
    amenities: [
      "Retractable Hardtop",
      "Carbon Ceramic Brakes",
      "Full PPF Protected",
      "Flatbed Delivery",
      "Direct Handover",
    ],
    seats: 2,
    guests: 2,
    horsepower: 710,
    acceleration: "2.9s (0–60)",
    transmission: "7-Speed Dual-Clutch",
    topSpeed: "211 mph",
    engine: "3.9L Twin-Turbo V8",
  },
  {
    id: "mercedes-s-class",
    name: "Mercedes-Benz S580",
    category: "Luxury Sedan",
    location: "Lagos & Abuja",
    pricePerDay: 850000,
    pricePerNight: 850000,
    securityDeposit: 250000,
    cleaningFee: 250000,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 30000,
    rating: 4.95,
    reviewCount: 74,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=85&auto=format&fit=crop",
    ],
    amenities: [
      "Executive Rear Lounge",
      "Burmester 3D Surround",
      "Chauffeur Service Included",
      "Airport VIP Transfer",
      "Acoustic Glass",
    ],
    seats: 4,
    guests: 4,
    horsepower: 496,
    acceleration: "4.4s (0–60)",
    transmission: "9-Speed Auto",
    topSpeed: "155 mph",
    engine: "4.0L Bi-Turbo V8",
  },
  {
    id: "toyota-land-cruiser-300",
    name: "Toyota Land Cruiser 300 VXR",
    category: "Executive SUV",
    location: "Lagos & Abuja",
    pricePerDay: 350000,
    pricePerNight: 350000,
    securityDeposit: 150000,
    cleaningFee: 150000,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 25000,
    rating: 4.96,
    reviewCount: 98,
    image: "/toyota_land_cruiser_300_1789978397588.jpg",
    images: [
      "/toyota_land_cruiser_300_1789978397588.jpg",
    ],
    amenities: [
      "Flagship VIP SUV",
      "JBL Premium Sound",
      "All-Terrain 4WD",
      "Rear Passenger Screens",
      "Convoy Travel Ready",
    ],
    seats: 7,
    guests: 7,
    horsepower: 409,
    acceleration: "6.7s (0–60)",
    transmission: "10-Speed Auto",
    topSpeed: "130 mph",
    engine: "3.5L Twin-Turbo V6",
  },
  {
    id: "toyota-prado-txl",
    name: "Toyota Prado TXL",
    category: "Executive SUV",
    location: "Lagos, Abuja & Port Harcourt",
    pricePerDay: 180000,
    pricePerNight: 180000,
    securityDeposit: 80000,
    cleaningFee: 80000,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 20000,
    rating: 4.95,
    reviewCount: 164,
    image: "/toyota_prado_txl_1789978414377.jpg",
    images: [
      "/toyota_prado_txl_1789978414377.jpg",
    ],
    amenities: [
      "Nigerian Road Master",
      "Executive Leather Interior",
      "Tinted Privacy Glass",
      "Chilled Glovebox",
      "Professional Driver Available",
    ],
    seats: 7,
    guests: 7,
    horsepower: 280,
    acceleration: "8.2s (0–60)",
    transmission: "6-Speed Auto",
    topSpeed: "115 mph",
    engine: "4.0L V6",
  },
  {
    id: "lexus-es350",
    name: "Lexus ES350 F-Sport",
    category: "Luxury Sedan",
    location: "Lagos & Abuja",
    pricePerDay: 120000,
    pricePerNight: 120000,
    securityDeposit: 60000,
    cleaningFee: 60000,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 15000,
    rating: 4.93,
    reviewCount: 110,
    image: "/lexus_es350_1789978430936.jpg",
    images: [
      "/lexus_es350_1789978430936.jpg",
    ],
    amenities: [
      "Quiet Executive Comfort",
      "Mark Levinson Audio",
      "Ventilated Leather Seats",
      "Fuel Efficient & Smooth",
      "Ideal for Meetings & Airport",
    ],
    seats: 5,
    guests: 5,
    horsepower: 302,
    acceleration: "6.6s (0–60)",
    transmission: "8-Speed Auto",
    topSpeed: "131 mph",
    engine: "3.5L V6",
  },
  {
    id: "toyota-hilux-adventure",
    name: "Toyota Hilux Adventure",
    category: "Security & Escort",
    location: "Lagos, Abuja & Nationwide",
    pricePerDay: 110000,
    pricePerNight: 110000,
    securityDeposit: 50000,
    cleaningFee: 50000,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 15000,
    rating: 4.91,
    reviewCount: 88,
    image: "/toyota_hilux_1789978454695.jpg",
    images: [
      "/toyota_hilux_1789978454695.jpg",
    ],
    amenities: [
      "Convoy & Security Escort",
      "Heavy Luggage Bed",
      "Rugged 4WD Suspension",
      "Interstate Travel Approved",
      "Armed Detail Ready",
    ],
    seats: 5,
    guests: 5,
    horsepower: 201,
    acceleration: "9.8s (0–60)",
    transmission: "6-Speed Auto",
    topSpeed: "112 mph",
    engine: "2.8L Turbo Diesel",
  },
];

export interface brandProperties {
  name: string;
  tagline: string;
  phone: string;
  location: string;
  currency: string;
  hero_image: string;
}

export const brand: brandProperties = {
  name: "Apex Auto",
  tagline: "Executive & Luxury Car Rentals",
  phone: "2349033572229",
  location: "Lagos & Abuja",
  currency: "₦",
  hero_image: "/rolls_royce_ghost_1789978376505.jpg",
};
