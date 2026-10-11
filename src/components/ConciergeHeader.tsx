"use client";

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import { brand } from "@/lib/properties";
import Logo from "@/utils/logo";
import TikTokIcon from "./TikTokIcon";
import { Facebook, Instagram } from "@mui/icons-material";

interface ConciergeHeaderProps {
  brandName: string;
  phone: string;
}

export default function ConciergeHeader({ brandName, phone }: ConciergeHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#04080f]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5 group min-w-0" aria-label={brandName}>
          <Logo size={44} />
          <div className="flex flex-col">
            <span className="text-[13px] sm:text-[15px] font-semibold tracking-wide text-white leading-tight">{brandName}</span>
            <span className="text-[9px] sm:text-[10px] text-[#1a8fff] leading-tight mt-0.5">{brand.tagline}</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-300">
          <a href="#fleet" className="hover:text-[#5abaff] transition-colors">
            Our Fleet
          </a>
          <a href="#booking" className="hover:text-[#5abaff] transition-colors">
            Book a Vehicle
          </a>
          <a href={`tel:+${phone}`} className="hover:text-[#5abaff] transition-colors flex items-center gap-1">
            <PhoneIcon sx={{ fontSize: 13 }} />
            Contact
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <a
            href={brand.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="grid place-items-center rounded-full size-11 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            <TikTokIcon />
          </a>
          <a
            href={brand.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className= "grid place-items-center rounded-full size-11 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            <Instagram sx={{ fontSize: 24 }} />
          </a>
          <a
            href={brand.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className= "grid place-items-center rounded-full size-11 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            <Facebook sx={{ fontSize: 24 }} />
          </a>
        </div>


        <button
          className="md:hidden grid place-items-center size-11 shrink-0 text-zinc-200 hover:text-[#5abaff]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#04080f] px-4 py-3 space-y-1 animate-slideDown">
          <a href="#fleet" onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center text-sm text-zinc-200 hover:text-[#5abaff]">
            Browse the fleet
          </a>
          <a href="#booking" onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center text-sm text-zinc-200 hover:text-[#5abaff]">
            Book a vehicle
          </a>
          <a href={`tel:+${phone}`} className="flex min-h-11 items-center gap-2 text-sm text-zinc-200 hover:text-[#5abaff]">
            <PhoneIcon sx={{ fontSize: 16 }} /> +{phone}
          </a>
          <div className="flex items-center gap-2 pt-3 border-t border-white/10">
            <a
            href={brand.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="grid place-items-center rounded-full size-11 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            <TikTokIcon />
          </a>
          <a
            href={brand.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className= "grid place-items-center rounded-full size-11 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            <Instagram sx={{ fontSize: 24 }} />
          </a>
          <a
            href={brand.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className= "grid place-items-center rounded-full size-11 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            <Facebook sx={{ fontSize: 24 }} />
          </a>
          </div>
        </div>
      )}
    </header>
  );
}
