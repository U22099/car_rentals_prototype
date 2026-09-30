"use client";

import { useState } from "react";
import Image from "next/image";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { rentalFleet } from "@/lib/fleet";

interface ConciergeGalleryProps {
  selectedVehicleId: string;
  onSelectVehicle: (id: string) => void;
}

export default function ConciergeGallery({
  selectedVehicleId,
  onSelectVehicle,
}: ConciergeGalleryProps) {
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const handleSelect = (id: string) => {
    onSelectVehicle(id);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="fleet" className="px-5 sm:px-8 lg:px-12 py-16 sm:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#d7b75d] font-semibold mb-2">
              Find your fit
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
              The Landpeace fleet
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
            Choose a vehicle to start your request. Final availability and rates are confirmed with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {rentalFleet.map((vehicle) => {
            const isSelected = selectedVehicleId === vehicle.id;
            const showImage = vehicle.image && !failedImages.includes(vehicle.id);
            const VehicleIcon = vehicle.name.includes("Bus")
              ? AirportShuttleIcon
              : DirectionsCarFilledIcon;

            return (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => handleSelect(vehicle.id)}
                aria-pressed={isSelected}
                className={`group min-w-0 overflow-hidden rounded-2xl border text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2c56e] ${
                  isSelected
                    ? "border-[#d7b75d] bg-[#211e16]"
                    : "border-white/10 bg-[#171715] hover:border-[#d7b75d]/70"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#22211d]">
                  {showImage ? (
                    <Image
                      src={vehicle.image}
                      alt={vehicle.imageNote ? `${vehicle.imageNote} for ${vehicle.name}` : vehicle.name}
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      onError={() => setFailedImages((current) => [...current, vehicle.id])}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(135deg,#27251f_0px,#27251f_1px,#1a1915_1px,#1a1915_15px)] text-[#d7b75d]">
                      <VehicleIcon sx={{ fontSize: 42 }} />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-300">
                        {vehicle.type}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                  {vehicle.imageNote && showImage && (
                    <span className="absolute top-3 right-3 rounded-full bg-black/65 px-3 py-1 text-[9px] uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm">
                      {vehicle.imageNote}
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
                    {vehicle.type}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-white text-base sm:text-lg font-semibold leading-snug">
                        {vehicle.name}
                      </h3>
                      <p className="text-zinc-400 text-xs mt-1">Availability on request</p>
                    </div>
                    <ArrowOutwardIcon
                      sx={{ fontSize: 19 }}
                      className="shrink-0 text-[#d7b75d] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <span className="inline-block text-[11px] text-[#e2c56e] mt-4 font-medium">
                    {isSelected ? "Selected for your request" : "Request this vehicle"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
