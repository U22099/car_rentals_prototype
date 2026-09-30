"use client";

import { useState } from "react";
import ConciergeHeader from "@/components/ConciergeHeader";
import ConciergeHero from "@/components/ConciergeHero";
import ConciergeGallery from "@/components/ConciergeGallery";
import ConciergeFlow from "@/components/ConciergeFlow";
import ConciergeFooter from "@/components/ConciergeFooter";
import { brand } from "@/lib/properties";

export default function ConciergePage() {
  const [selectedVehicleId, setSelectedVehicleId] = useState("prado");

  return (
    <main id="top" className="min-h-screen bg-bg-primary flex flex-col text-text-body">
      <ConciergeHeader brandName={brand.name} phone={brand.phone} />

      <ConciergeHero brandName={brand.name} />

      <ConciergeGallery
        selectedVehicleId={selectedVehicleId}
        onSelectVehicle={setSelectedVehicleId}
      />

      <div className="flex-1 flex items-center justify-center">
        <ConciergeFlow
          brandName={brand.name}
          phone={brand.phone}
          currency={brand.currency}
          selectedVehicleId={selectedVehicleId}
          onVehicleSelect={setSelectedVehicleId}
        />
      </div>

      <ConciergeFooter brandName={brand.name} phone={brand.phone} />
    </main>
  );
}
