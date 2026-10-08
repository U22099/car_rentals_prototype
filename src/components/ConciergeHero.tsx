"use client";

import Image from "next/image";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PhoneIcon from "@mui/icons-material/Phone";
import { brand } from "@/lib/properties";

interface ConciergeHeroProps {
  brandName: string;
}

export default function ConciergeHero({ brandName }: ConciergeHeroProps) {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative isolate min-h-[680px] sm:min-h-[720px] flex items-center px-5 sm:px-8 lg:px-12 py-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/toyota_land_cruiser_300_1789978397588.jpg"
          alt="Luxury vehicle available for hire"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[57%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04080f] via-[#04080f]/90 to-[#04080f]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04080f]/70 via-transparent to-[#04080f]/30" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a8fff]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#5abaff] font-semibold mb-5 animate-fadeIn">
            {brandName} <span className="text-white/45 px-1.5">/</span> Fleet Management &amp; Car Hire
          </p>
          <h1 className="text-[40px] sm:text-6xl lg:text-[72px] font-semibold text-white leading-[1.02] max-w-[760px] animate-fadeInUp">
            Elegance in<br className="hidden sm:block" /> motion.
          </h1>
          <p className="mt-5 sm:mt-6 text-[#c8d8f0] text-sm sm:text-base max-w-lg leading-relaxed animate-fadeInUp delay-100">
            Premium fleet management, automobile lease, car rental &amp; hire. Wedding cars, airport transfers, corporate transport, private movement, and general supply — all at your service.
          </p>

          {/* Services pills */}
          <div className="mt-5 flex flex-wrap gap-2 animate-fadeInUp delay-100">
            {["Wedding Cars", "Airport Transfers", "Corporate Transport", "Private Movement", "Hourly / Full Day", "Auto Sales"].map((service) => (
              <span
                key={service}
                className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium border border-[#1a8fff]/40 bg-[#1a8fff]/10 text-[#5abaff] tracking-wide"
              >
                {service}
              </span>
            ))}
          </div>

          <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3.5 animate-fadeInUp delay-200">
            <button
              type="button"
              onClick={scrollToBooking}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent-primary px-8 text-sm font-semibold text-accent-contrast shadow-[0_12px_35px_rgba(26,143,255,0.28)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white cursor-pointer"
            >
              Book a vehicle
              <ArrowDownwardIcon sx={{ fontSize: 18 }} />
            </button>
            <a
              href={`tel:+${brand.phone}`}
              aria-label={`Call ${brandName}`}
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-[#1a8fff] hover:text-[#5abaff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <PhoneIcon sx={{ fontSize: 18 }} className="text-[#5abaff]" />
              <span>Call us now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
