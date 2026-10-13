"use client";

import { useState } from "react";
import type { Vehicle } from "@/lib/properties";
import { listing } from "@/lib/properties";
import PropertyBookingCard from "@/components/BookingCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Fleet from "@/components/Fleet";

interface LandingPageClientProps {
  brandName: string;
  currency: string;
  phone: string;
  location: string;
  initialPropertyId: string | null;
}

export default function LandingPageClient({
  brandName,
  currency,
  phone,
  location,
  initialPropertyId,
}: LandingPageClientProps) {
  const initialProp =
    (initialPropertyId
      ? listing.find((p) => p.id === initialPropertyId)
      : null) ?? listing[0];

  const [activeVehicle, setActiveVehicle] = useState<Vehicle>(initialProp);

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* ── HEADER ── */}
      <Header brandName={brandName} />

      {/* ── HERO ── */}
      <Hero brandName={brandName} location={location} />

      {/* ── FLEET GRID ── */}
      <Fleet
        currency={currency}
        activeVehicle={activeVehicle}
        setActiveVehicle={setActiveVehicle}
      />

      {/* ── BOOKING CARD ── */}
      <PropertyBookingCard
        property={activeVehicle}
        currency={currency}
        phone={phone}
        brandName={brandName}
      />

      <Footer brandName={brandName} />
    </main>
  );
}
