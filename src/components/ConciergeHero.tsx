"use client";

import Image from "next/image";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TikTokIcon from "./TikTokIcon";
import { brand } from "@/lib/properties";

interface ConciergeHeroProps {
  brandName: string;
}

export default function ConciergeHero({ brandName }: ConciergeHeroProps) {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative isolate min-h-[650px] sm:min-h-[690px] flex items-center px-5 sm:px-8 lg:px-12 py-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/toyota_land_cruiser_300_1789978397588.jpg"
          alt="Toyota Land Cruiser available for hire"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[57%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0b] via-[#0d0d0b]/88 to-[#0d0d0b]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/65 via-transparent to-[#0d0d0b]/30" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a747]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#e2c56e] font-semibold mb-5 animate-fadeIn">
            {brandName} <span className="text-white/45 px-1.5">/</span> Executive &amp; group vehicle hire
          </p>
          <h1 className="text-[42px] sm:text-6xl lg:text-[76px] font-semibold text-white leading-[1.02] max-w-[760px] animate-fadeInUp">
            The right vehicle<br className="hidden sm:block" /> for your next move.
          </h1>
          <p className="mt-5 sm:mt-6 text-[#d8d5cc] text-sm sm:text-base max-w-lg leading-relaxed animate-fadeInUp delay-100">
            From a Prado for the daily run to a bus for the whole team, find a vehicle that fits your plans. Tell us what you need and confirm availability directly on WhatsApp.
          </p>
          <p className="mt-4 text-sm sm:text-base font-serif italic text-[#e2c56e] animate-fadeInUp delay-100">
            Your Cargo, Our Priority.
          </p>
          <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3.5 animate-fadeInUp delay-200">
            <button
              type="button"
              onClick={scrollToBooking}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent-primary px-8 text-sm font-semibold text-accent-contrast shadow-[0_12px_35px_rgba(215,183,93,0.22)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white cursor-pointer"
            >
              Book a session
              <ArrowDownwardIcon sx={{ fontSize: 18 }} />
            </button>
            <a
              href={brand.socials.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow ${brandName} on TikTok: ${brand.socials.tiktok.handle}`}
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-[#d7b75d] hover:text-[#e2c56e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <TikTokIcon className="size-4 shrink-0 text-[#e2c56e]" />
              <span>Watch on TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
