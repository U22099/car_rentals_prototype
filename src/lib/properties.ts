export interface Vehicle {
  id: string;
  name: string;
  category: "Executive SUV" | "Luxury Sedan" | "Supercar" | "Chauffeur & VIP";
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
    location: "Miami · Los Angeles · London",
    pricePerDay: 1850,
    pricePerNight: 1850,
    securityDeposit: 2500,
    cleaningFee: 250,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 350,
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
      "Airport Tarmac Handover",
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
    name: "Lamborghini Urus Performante",
    category: "Supercar",
    location: "Miami · Los Angeles · London",
    pricePerDay: 1600,
    pricePerNight: 1600,
    securityDeposit: 2000,
    cleaningFee: 200,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 300,
    rating: 4.97,
    reviewCount: 56,
    image: "/lamborghini_urus_1789978487701.jpg",
    images: ["/lamborghini_urus_1789978487701.jpg"],
    amenities: [
      "High-Performance Super SUV",
      "Bang & Olufsen 3D Sound",
      "Akrapovic Exhaust",
      "All-Wheel Drive",
      "White-Glove Hotel Delivery",
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
    location: "Miami · Los Angeles · London",
    pricePerDay: 2200,
    pricePerNight: 2200,
    securityDeposit: 3000,
    cleaningFee: 300,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 0,
    rating: 4.99,
    reviewCount: 38,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=85&auto=format&fit=crop",
    ],
    amenities: [
      "Retractable Hardtop",
      "Carbon Ceramic Brakes",
      "Full PPF Protected",
      "Flatbed Direct Delivery",
      "Zero Instant Booking Fee",
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
    name: "Mercedes-Maybach S580",
    category: "Luxury Sedan",
    location: "Miami · Los Angeles · London",
    pricePerDay: 1200,
    pricePerNight: 1200,
    securityDeposit: 1500,
    cleaningFee: 150,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 250,
    rating: 4.95,
    reviewCount: 74,
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=85&auto=format&fit=crop",
    ],
    amenities: [
      "Executive Rear Reclining Lounge",
      "Burmester 4D Surround Sound",
      "Chauffeur Service Included",
      "Airport VIP Transfer",
      "Acoustic Glass Privacy",
    ],
    seats: 4,
    guests: 4,
    horsepower: 496,
    acceleration: "4.4s (0–60)",
    transmission: "9-Speed Automatic",
    topSpeed: "155 mph",
    engine: "4.0L Bi-Turbo V8",
  },
  {
    id: "cadillac-escalade-esv",
    name: "Cadillac Escalade ESV Sport",
    category: "Executive SUV",
    location: "Miami · Los Angeles · London",
    pricePerDay: 850,
    pricePerNight: 850,
    securityDeposit: 1000,
    cleaningFee: 150,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 200,
    rating: 4.96,
    reviewCount: 88,
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=85&auto=format&fit=crop",
    ],
    amenities: [
      "AKG Studio 36-Speaker Audio",
      "Extended Luggage Capacity",
      "OLED Curved Displays",
      "VIP Chauffeur Ready",
      "Tinted Privacy Glass",
    ],
    seats: 7,
    guests: 7,
    horsepower: 420,
    acceleration: "5.9s (0–60)",
    transmission: "10-Speed Automatic",
    topSpeed: "130 mph",
    engine: "6.2L V8",
  },
  {
    id: "range-rover-autobiography",
    name: "Range Rover Autobiography",
    category: "Chauffeur & VIP",
    location: "Miami · Los Angeles · London",
    pricePerDay: 1100,
    pricePerNight: 1100,
    securityDeposit: 1500,
    cleaningFee: 150,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 250,
    rating: 4.97,
    reviewCount: 62,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85&auto=format&fit=crop",
    ],
    amenities: [
      "Executive Class Rear Seating",
      "Meridian Signature Sound",
      "All-Wheel Steering",
      "Airport Concierge Handover",
      "Full Premium Insurance",
    ],
    seats: 5,
    guests: 5,
    horsepower: 523,
    acceleration: "4.4s (0–60)",
    transmission: "8-Speed Automatic",
    topSpeed: "155 mph",
    engine: "4.4L Twin-Turbo V8",
  },
  {
    id: "porsche-911-gt3",
    name: "Porsche 911 GT3 (992)",
    category: "Supercar",
    location: "Miami · Los Angeles · London",
    pricePerDay: 1450,
    pricePerNight: 1450,
    securityDeposit: 2000,
    cleaningFee: 200,
    serviceFeePerNight: 0,
    chauffeurFeePerDay: 0,
    rating: 4.99,
    reviewCount: 45,
    image:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=85&auto=format&fit=crop",
    ],
    amenities: [
      "Naturally Aspirated Flat-6",
      "PDK Dual-Clutch Transmission",
      "Chrono Package",
      "Track-Ready Setup",
      "Direct Doorstep Delivery",
    ],
    seats: 2,
    guests: 2,
    horsepower: 502,
    acceleration: "3.2s (0–60)",
    transmission: "7-Speed PDK",
    topSpeed: "197 mph",
    engine: "4.0L Naturally Aspirated Flat-6",
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
  tagline: "Exotic & Luxury Fleet Booking Engine",
  phone: "+13055550199",
  location: "Miami · Los Angeles · London",
  currency: "$",
  hero_image: "/rolls_royce_ghost_1789978376505.jpg",
};
