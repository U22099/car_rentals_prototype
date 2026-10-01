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
    id: "prado",
    name: "Toyota Prado",
    type: "Executive SUV",
    image: "/toyota_prado_txl_1789978414377.jpg",
    budgetId: "standard",
  },
  {
    id: "gx-460",
    name: "Lexus GX 460",
    type: "Premium SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=85&auto=format&fit=crop",
    imageNote: "Representative image",
    budgetId: "executive",
  },
  {
    id: "hilux",
    name: "Toyota Hilux",
    type: "Pickup truck",
    image: "/toyota_hilux_1789978454695.jpg",
    budgetId: "standard",
  },
  {
    id: "land-cruiser",
    name: "Toyota Land Cruiser",
    type: "Full-size SUV",
    image: "/toyota_land_cruiser_300_1789978397588.jpg",
    budgetId: "executive",
  },
  {
    id: "sprinter",
    name: "Sprinter Bus",
    type: "Group transport",
    image: "/sprinter_bus.png",
    imageNote: "Representative image",
    budgetId: "group",
  },
  {
    id: "hummer-bus",
    name: "Toyota HiAce",
    type: "Group transport",
    image: "/toyoto_hiace.png",
    imageNote: "Representative image",
    budgetId: "group",
  },
  {
    id: "lx-600",
    name: "Lexus LX 600",
    type: "Flagship SUV",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=85&auto=format&fit=crop",
    imageNote: "Representative image",
    budgetId: "premium",
  },
  {
    id: "cadillac-escalade",
    name: "Cadillac Escalade",
    type: "Luxury SUV",
    image: "/cadillac_escalade.png",
    imageNote: "Representative image",
    budgetId: "premium",
  },
];
