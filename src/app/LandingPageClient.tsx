"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/utils/logo";
import type { Vehicle } from "@/lib/properties";
import { listing } from "@/lib/properties";
import PropertyBookingCard from "@/components/BookingCard";
import Footer from "@/components/Footer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TuneIcon from "@mui/icons-material/Tune";

interface LandingPageClientProps {
  brandName: string;
  currency: string;
  phone: string;
  location: string;
  initialPropertyId: string | null;
}

const CATEGORIES = ["All", "Executive SUV", "Luxury Sedan", "Supercar", "Security & Escort"];

function formatPrice(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return n.toLocaleString("en-US");
}

export default function LandingPageClient({
  brandName,
  currency,
  phone,
  location,
  initialPropertyId,
}: LandingPageClientProps) {
  const initialProp =
    (initialPropertyId ? listing.find((p) => p.id === initialPropertyId) : null) ?? listing[0];

  const [activeVehicle, setActiveVehicle] = useState<Vehicle>(initialProp);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent("Hello! I would like to inquire about reserving a vehicle.")}`;

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setActiveVehicle(vehicle);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("id", vehicle.id);
      window.history.pushState({}, "", url.toString());
    }
    setTimeout(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const filtered =
    selectedCategory === "All"
      ? listing
      : listing.filter((v) => v.category === selectedCategory);

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <Logo />
            <span className="text-[15px] font-semibold tracking-wide text-white">{brandName}</span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-400">
            <a href="#fleet" className="hover:text-white transition-colors">Fleet</a>
            <a href="#booking" className="hover:text-white transition-colors">Reserve</a>
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-medium bg-accent-primary text-accent-contrast hover:bg-accent-hover transition-colors"
            >
              <WhatsAppIcon sx={{ fontSize: 14 }} />
              WhatsApp
            </a>
          </div>

          <button
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden glass-dark border-t border-border-subtle px-5 py-4 space-y-3 animate-slideDown">
            <a href="#fleet" onClick={() => setMobileOpen(false)} className="block text-sm text-zinc-300 hover:text-white py-1">Fleet</a>
            <a href="#booking" onClick={() => setMobileOpen(false)} className="block text-sm text-zinc-300 hover:text-white py-1">Reserve</a>
            <div className="pt-2 border-t border-border-subtle">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-accent-primary text-accent-contrast hover:bg-accent-hover font-medium text-sm"
              >
                <WhatsAppIcon sx={{ fontSize: 15 }} />
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-[72vh] sm:min-h-[85vh] flex items-end pb-8 sm:pb-16 px-4 sm:px-6 pt-12 sm:pt-14 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/rolls_royce_ghost_1789978376505.jpg"
            alt="Luxury automotive"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/70 to-bg-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-medium mb-2.5 sm:mb-4">
            {location} · Direct WhatsApp Booking
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.08] sm:leading-[1.05] max-w-2xl">
            Luxury &amp;<br />
            <span className="text-zinc-300">Exotic Car</span><br />
            Rentals.
          </h1>
          <p className="mt-3 sm:mt-5 text-zinc-400 text-xs sm:text-sm md:text-base max-w-md leading-relaxed">
            From supercars to executive SUVs. Verified fleet, optional chauffeur, instant WhatsApp confirmation.
          </p>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-6 sm:mt-8">
            <a
              href="#fleet"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-accent-primary text-accent-contrast font-semibold text-xs sm:text-[13px] hover:bg-accent-hover transition-colors"
            >
              Browse Fleet
              <ArrowForwardIcon sx={{ fontSize: 14 }} />
            </a>
          </div>
        </div>
      </section>

      {/* ── FLEET GRID ── */}
      <section id="fleet" className="px-4 sm:px-6 md:px-10 py-8 sm:py-14 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-medium mb-1">Available Fleet</p>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">Select a Vehicle</h2>
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
                      {currency}{formatPrice(vehicle.pricePerDay)}
                    </span>
                    <span className="block text-zinc-300 text-[9px] sm:text-[10px] drop-shadow">/ day</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-3.5 py-2.5 sm:px-4 sm:py-3.5 bg-zinc-900/60">
                  <h3 className="text-xs sm:text-[14px] font-semibold text-white">{vehicle.name}</h3>
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

      {/* ── BOOKING CARD ── */}
      <PropertyBookingCard
        property={activeVehicle}
        currency={currency}
        phone={phone}
        brandName={brandName}
      />

      <Footer brandName={brandName} phone={phone} />
    </main>
  );
}
