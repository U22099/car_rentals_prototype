export interface RentalVehicle {
  id: string;
  name: string;
  type: string;
  image?: string;
  imageNote?: string;
  budgetId: string;
}

export const rentalFleet: RentalVehicle[] = [
  {
    id: "land-cruiser",
    name: "Toyota Land Cruiser",
    type: "Full-size SUV",
    image: "/toyota_land_cruiser_300_1789978397588.jpg",
    budgetId: "executive",
  },
  {
    id: "prado",
    name: "Toyota Prado",
    type: "Executive SUV",
    image: "/toyota_prado_txl_1789978414377.jpg",
    budgetId: "standard",
  },
  {
    id: "hilux",
    name: "Toyota Hilux",
    type: "Pickup Truck",
    image: "/toyota_hilux_1789978454695.jpg",
    budgetId: "standard",
  },
  {
    id: "coaster",
    name: "Toyota Coaster Bus",
    type: "Group Transport",
    image: "/toyota_coaster_bus_1791486678493.jpg",
    budgetId: "group",
  },
  {
    id: "hiace",
    name: "Toyota Hiace Bus",
    type: "Group Transport",
    image: "/toyoto_hiace.png",
    budgetId: "group",
  },
  {
    id: "sienna",
    name: "Toyota Sienna",
    type: "Luxury Minivan",
    image: "https://images.unsplash.com/photo-1720545044233-d2ac77fa6030?w=1200&q=85&auto=format&fit=crop",
    budgetId: "standard",
  },
  {
    id: "lexus",
    name: "Lexus",
    type: "Luxury SUV",
    image: "https://images.unsplash.com/photo-1664427321044-b4057f77777e?w=1200&q=85&auto=format&fit=crop",
    imageNote: "Representative image",
    budgetId: "premium",
  },
  {
    id: "range-rover",
    name: "Range Rover",
    type: "Premium SUV",
    image: "/range_rover.jpg",
    budgetId: "premium",
  },
  {
    id: "g-wagon",
    name: "Mercedes G-Wagon",
    type: "Luxury SUV",
    image: "/mercedes_gwagon.jpg",
    budgetId: "premium",
  },
  {
    id: "mercedes-benz",
    name: "Mercedes Benz",
    type: "Executive Sedan",
    image: "/mercedes_s_class.jpg",
    budgetId: "executive",
  },
  {
    id: "sprinter",
    name: "Mercedes Sprinter Bus",
    type: "Group Transport",
    image: "/sprinter_bus.png",
    budgetId: "group",
  },
  {
    id: "bulletproof",
    name: "Bulletproof Vehicle / SUV",
    image: "/bulletproof_suv.jpeg",
    type: "Armoured SUV",
    budgetId: "premium",
  },
];

