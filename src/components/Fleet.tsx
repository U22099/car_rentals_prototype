import { Vehicle, listing } from "@/lib/properties";
import React, { useState } from "react";


const CATEGORIES = ["All", "Executive SUV", "Luxury Sedan", "Supercar", "Security & Escort"];

function formatPrice(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return n.toLocaleString("en-US");
}

export default function Fleet({ currency, activeVehicle, setActiveVehicle}: {
    currency: string;
    activeVehicle: Vehicle;
    setActiveVehicle: React.Dispatch<React.SetStateAction<Vehicle>>,
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setActiveVehicle(vehicle);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("id", vehicle.id);
      window.history.pushState({}, "", url.toString());
    }
    setTimeout(() => {
      document
        .getElementById("booking")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const filtered =
    selectedCategory === "All"
      ? listing
      : listing.filter((v) => v.category === selectedCategory);
  return (
    <section
      id="fleet"
      className="px-4 sm:px-6 md:px-10 py-8 sm:py-14 max-w-6xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-medium mb-1">
            Available Fleet
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Select a Vehicle
          </h2>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-accent-primary text-accent-contrast"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {filtered.map((vehicle) => {
          const isSelected = vehicle.id === activeVehicle.id;
          return (
            <button
              key={vehicle.id}
              onClick={() => handleSelectVehicle(vehicle)}
              className={`rounded-xl overflow-hidden text-left transition-all duration-200 border cursor-pointer group ${
                isSelected
                  ? "border-accent-primary/80"
                  : "border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {/* Image */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-900">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Readability gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />

                {/* Category badge - top left */}
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/70 backdrop-blur-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-200 font-medium">
                  {vehicle.category}
                </span>

                {/* Price - bottom right over image */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-right">
                  <span className="block text-white font-bold text-xs sm:text-[15px] drop-shadow-lg">
                    {currency}
                    {formatPrice(vehicle.pricePerDay)}
                  </span>
                  <span className="block text-zinc-300 text-[9px] sm:text-[10px] drop-shadow">
                    / day
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="px-3.5 py-2.5 sm:px-4 sm:py-3.5 bg-zinc-900/60">
                <h3 className="text-xs sm:text-[14px] font-semibold text-white">
                  {vehicle.name}
                </h3>
                <div className="flex items-center gap-2 sm:gap-2.5 mt-1 sm:mt-1.5 text-[10px] sm:text-[11px] text-zinc-500">
                  <span>{vehicle.seats} seats</span>
                  <span>·</span>
                  <span>{vehicle.transmission}</span>
                  <span>·</span>
                  <span>{vehicle.horsepower} hp</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
