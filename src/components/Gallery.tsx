"use client";

import { useState } from "react";
import type { Vehicle } from "@/lib/properties";

interface PropertyGridProps {
  properties: Vehicle[];
  activeId: string;
  currency: string;
  onSelect: (property: Vehicle) => void;
}

const CATEGORIES = [
  "All Vehicles",
  "Executive SUV",
  "Luxury Sedan",
  "Supercar",
  "Security & Escort",
];

export default function PropertyGrid({
  properties,
  activeId,
  currency,
  onSelect,
}: PropertyGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Vehicles");

  const filtered =
    selectedCategory === "All Vehicles"
      ? properties
      : properties.filter((item) => item.category === selectedCategory);

  return (
    <section id="fleet" className="px-6 md:px-10 py-16 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-1">
            Available Fleet
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Select a Vehicle
          </h2>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-accent-primary text-accent-contrast"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((vehicle) => {
          const isSelected = vehicle.id === activeId;
          const formatPrice = (n: number) => n.toLocaleString("en-US");

          return (
            <div
              key={vehicle.id}
              onClick={() => {
                onSelect(vehicle);
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border bg-zinc-900/60 ${
                isSelected
                  ? "border-accent-primary ring-1 ring-accent-primary"
                  : "border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="aspect-16/10 w-full overflow-hidden bg-zinc-950">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-medium">
                      {vehicle.category}
                    </span>
                    <h3 className="text-base font-semibold text-white mt-0.5">
                      {vehicle.name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base font-bold text-white block">
                      {currency}{formatPrice(vehicle.pricePerDay)}
                    </span>
                    <span className="text-[11px] text-zinc-400 block">/ day</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-zinc-800/80 text-xs text-zinc-400">
                  <span>{vehicle.seats} Seats</span>
                  <span>·</span>
                  <span>{vehicle.transmission}</span>
                  <span>·</span>
                  <span>{vehicle.engine.split(" ")[0]}</span>
                </div>

                <button
                  type="button"
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isSelected
                      ? "bg-accent-primary text-accent-contrast"
                      : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                  }`}
                >
                  {isSelected ? "Selected" : "Select & Configure"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
