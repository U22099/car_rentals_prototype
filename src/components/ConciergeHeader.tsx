"use client";

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Logo from "@/utils/logo";
import { Mail } from "@mui/icons-material";

interface ConciergeHeaderProps {
  brandName: string;
}

export default function ConciergeHeader({
  brandName
}: ConciergeHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const recipientEmail = "u22099dandev@gmail.com";
  const subject = "Inquiry: Luxury Vehicle Reservation";
  const body =
    "Hello Apex Auto Team,\n\nI saw your listing on your website and would like to inquire about reserving a vehicle from your fleet.\n\nPlease let me know the availability and booking process.\n\nBest regards,";

  const mailUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <a
          href="/concierge"
          className="flex items-center gap-2.5 group"
          aria-label={brandName}
        >
          <Logo />
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold tracking-wide text-white">
              {brandName}
            </span>
            <span className="text-[9px] uppercase tracking-[0.22em] text-zinc-500">
              Private Fleet Concierge
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-400">
          <a
            href="#consultation"
            className="hover:text-white transition-colors"
          >
            Start Session
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <a
            href={mailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-accent-primary text-accent-contrast hover:bg-accent-hover transition-colors"
          >
            <Mail sx={{ fontSize: 16 }} />
            Email Us
          </a>
        </div>

        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-dark border-t border-border-subtle px-5 py-4 space-y-3 animate-slideDown">
          <a
            href="#consultation"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-zinc-300 hover:text-white py-1"
          >
            Start Session
          </a>
          <div className="pt-2 border-t border-border-subtle">
            <a
              href={mailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-accent-primary text-accent-contrast hover:bg-accent-hover transition-colors"
            >
              <Mail sx={{ fontSize: 16 }} />
              Email Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
