"use client";

import { brand } from "@/lib/properties";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface HeroProps {
  brandName: string;
  location: string;
}

export default function Hero({ brandName, location }: HeroProps) {
  const scrollToFleet = () => {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={brand.hero_image}
          alt="Luxury automotive"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/85 via-bg-primary/75 to-bg-primary" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium">
          {location} · Direct WhatsApp Booking
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
          Executive &amp; Luxury Car Rentals
        </h1>

        <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto font-normal leading-relaxed">
          Pristine supercars, executive Land Cruisers, and everyday luxury road masters. Ready for Lagos, Abuja, and inter-state travel with optional vetted chauffeurs.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={scrollToFleet}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-accent-primary text-accent-contrast font-semibold text-xs uppercase tracking-wider hover:bg-accent-hover transition-colors cursor-pointer"
            id="hero-cta"
          >
            <span>View Fleet</span>
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      </div>
    </section>
  );
}
