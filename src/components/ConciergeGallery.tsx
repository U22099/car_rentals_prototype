"use client";

import { useState } from "react";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";

const GALLERY_TIERS = [
  {
    title: "Exotic Supercars",
    subtitle: "High-octane presence for red carpets & personal thrill",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80&auto=format&fit=crop",
    examples: "Ferrari · Lamborghini · McLaren",
    badge: "Supercar",
    Icon: SpeedIcon,
  },
  {
    title: "Ultra-Luxury Chauffeur",
    subtitle: "Presidential rear-lounge luxury with vetted drivers",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80&auto=format&fit=crop",
    examples: "Rolls-Royce Ghost · Maybach · Bentley",
    badge: "Chauffeur Saloon",
    Icon: DirectionsCarFilledIcon,
  },
  {
    title: "Prestige & Armored SUVs",
    subtitle: "Dominant road presence and multi-terrain capability",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80&auto=format&fit=crop",
    examples: "Land Cruiser 300 · Range Rover · G-Wagon",
    badge: "Executive 4WD",
    Icon: SecurityIcon,
  },
  {
    title: "Daily Luxury & Protocol",
    subtitle: "Reliable Nigerian road masters for daily errands & convoys",
    image: "/toyota_prado_txl_1789978414377.jpg",
    examples: "Toyota Prado · Lexus ES350 · Hilux Escort",
    badge: "Road Masters",
    Icon: DirectionsCarFilledIcon,
  },
  {
    title: "VIP Delegation & Group",
    subtitle: "High-capacity transport for weddings & corporate teams",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80&auto=format&fit=crop",
    examples: "Toyota HiAce VIP · Coaster Bus",
    badge: "Group Transport",
    Icon: AirlineSeatReclineExtraIcon,
  },
];

export default function ConciergeGallery() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="px-4 sm:px-6 md:px-10 py-8 sm:py-14 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-2 sm:gap-4">
        <div>
          <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-zinc-500 font-semibold mb-1 sm:mb-2">
            Fleet Spectrum
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Available Vehicle Calibers
          </h2>
        </div>
        <p className="text-zinc-500 text-xs sm:text-[13px] max-w-xs">
          150+ verified vehicles across Lagos, Abuja & nationwide partners.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
        {GALLERY_TIERS.map((tier, idx) => {
          const BadgeIcon = tier.Icon;
          const isSelected = activeIdx === idx;
          return (
            <div
              key={tier.title}
              onMouseEnter={() => setActiveIdx(idx)}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                isSelected
                  ? "border-accent-primary/60 -translate-y-0.5 shadow-lg"
                  : "border-zinc-800 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="aspect-[3/4] sm:aspect-[4/5] w-full relative bg-zinc-900">
                <img
                  src={tier.image}
                  alt={tier.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                {/* Strong gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                  <span className="inline-flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] uppercase tracking-wider text-zinc-200 font-medium">
                    <BadgeIcon sx={{ fontSize: 10 }} />
                    {tier.badge}
                  </span>
                </div>

                {/* Text content — readable on dark gradient */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 space-y-0.5 sm:space-y-1">
                  <h3 className="text-white font-semibold text-xs sm:text-[14px] leading-tight">{tier.title}</h3>
                  <p className="text-zinc-300 text-[9px] sm:text-[11px] leading-tight line-clamp-2">{tier.subtitle}</p>
                  <p className="text-zinc-400 text-[8px] sm:text-[10px] pt-0.5 font-mono truncate">{tier.examples}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
