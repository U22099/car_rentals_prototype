"use client";

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

interface HeaderProps {
  brandName: string;
}

export default function Header({ brandName }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const phone = "2349033572229";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent("Hello! I would like to inquire about reserving a vehicle.")}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-lg font-semibold tracking-wider text-white uppercase">
          {brandName}
        </a>

        <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-zinc-400">
          <a href="/#fleet" className="hover:text-white transition-colors">
            Fleet
          </a>
          <a href="/#booking" className="hover:text-white transition-colors">
            Reserve
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-accent-primary text-accent-contrast hover:bg-accent-hover transition-colors"
          >
            <WhatsAppIcon sx={{ fontSize: 16 }} />
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
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-4 space-y-3 text-sm">
          <a
            href="/#fleet"
            onClick={() => setMobileOpen(false)}
            className="block text-zinc-300 hover:text-white py-1"
          >
            Fleet
          </a>
          <a
            href="/#booking"
            onClick={() => setMobileOpen(false)}
            className="block text-zinc-300 hover:text-white py-1"
          >
            Reserve
          </a>
          <div className="pt-2 border-t border-zinc-800">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-accent-primary text-accent-contrast hover:bg-accent-hover font-medium text-xs uppercase tracking-wider"
            >
              <WhatsAppIcon sx={{ fontSize: 16 }} />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}