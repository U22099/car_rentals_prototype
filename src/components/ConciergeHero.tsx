"use client";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import TuneIcon from "@mui/icons-material/Tune";

interface ConciergeHeroProps {
  brandName: string;
  phone: string;
}

export default function ConciergeHero({ brandName, phone }: ConciergeHeroProps) {
  const scrollToConsultation = () => {
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[72vh] sm:min-h-[85vh] flex items-end pb-8 sm:pb-16 px-4 sm:px-6 pt-12 sm:pt-14 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85&auto=format&fit=crop"
          alt="Luxury automotive fleet"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/70 to-bg-primary/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 mt-4 sm:mt-8 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/8 border border-white/15 mb-3 sm:mb-6 animate-fadeIn">
          <TuneIcon sx={{ fontSize: 12 }} />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-medium">
            Private Fleet Concierge
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.08] sm:leading-[1.05] max-w-2xl animate-fadeInUp delay-100">
          Sourced &amp;<br />
          <span className="text-zinc-300">Delivered</span><br />
          On Demand.
        </h1>

        <p className="mt-3 sm:mt-5 text-zinc-400 text-xs sm:text-sm md:text-base max-w-md leading-relaxed animate-fadeInUp delay-200">
          Skip the listings. Whether you need a Ferrari for a gala, a Land Cruiser for executive protocol, or a Prado for interstate travel — our private desk sources everything directly on WhatsApp.
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 text-[11px] sm:text-xs text-zinc-400 animate-fadeInUp delay-200">
          <span className="flex items-center gap-1">
            <ShieldOutlinedIcon sx={{ fontSize: 13 }} />
            Armed Escort Ready
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <DirectionsCarOutlinedIcon sx={{ fontSize: 13 }} />
            Supercars to Daily Executive
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6 sm:mt-8 animate-fadeInUp delay-300">
          <button
            onClick={scrollToConsultation}
            id="concierge-start-session"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-accent-primary text-accent-contrast font-semibold text-xs sm:text-[13px] hover:bg-accent-hover transition-colors cursor-pointer"
          >
            Start Sourcing Session
            <ArrowDownwardIcon sx={{ fontSize: 14 }} />
          </button>
        </div>
      </div>
    </section>
  );
}
