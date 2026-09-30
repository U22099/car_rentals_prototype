"use client";

import Logo from "@/utils/logo";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { brand } from "@/lib/properties";

interface ConciergeFooterProps {
  brandName: string;
  phone: string;
}

export default function ConciergeFooter({ brandName, phone }: ConciergeFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#10100e] mt-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 lg:gap-16">
          <div>
            <div className="flex items-center gap-3 mb-4 group">
              <Logo size={56} />
              <div className="flex flex-col">
                <span className="text-white font-semibold tracking-wide text-sm">{brandName}</span>
                <span className="text-[11px] text-[#d7b75d] mt-1">{brand.tagline}</span>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Executive vehicles and group transport for business, events, and everyday journeys.
            </p>
          </div>

          <div>
            <h4 className="text-[#d7b75d] text-[11px] tracking-[0.18em] uppercase font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-zinc-300 text-sm">
              <li><a href="#fleet" className="hover:text-[#e2c56e] transition-colors">Browse the fleet</a></li>
              <li><a href="#booking" className="hover:text-[#e2c56e] transition-colors">Request a vehicle</a></li>
              <li><a href="#booking" className="hover:text-[#e2c56e] transition-colors">Ask about availability</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#d7b75d] text-[11px] tracking-[0.18em] uppercase font-semibold mb-4">
              Talk to our team
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed mb-5 max-w-xs">
              Have a question or need a custom quote? Send your request on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(`Hello ${brandName}, I would like to ask about hiring a vehicle.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 px-5 rounded-full border border-[#d7b75d]/60 text-[#e2c56e] text-sm font-semibold hover:bg-[#d7b75d] hover:text-[#11100d] transition-colors"
            >
              <WhatsAppIcon sx={{ fontSize: 16 }} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-zinc-500 text-xs">© {year} {brandName}. All rights reserved.</p>
          <a href="#top" className="text-zinc-400 text-xs hover:text-[#e2c56e] transition-colors">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
