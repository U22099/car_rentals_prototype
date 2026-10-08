"use client";

import Logo from "@/utils/logo";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FlightIcon from "@mui/icons-material/Flight";
import CelebrationIcon from "@mui/icons-material/Celebration";
import StoreIcon from "@mui/icons-material/Store";
import { brand } from "@/lib/properties";

interface ConciergeFooterProps {
  brandName: string;
  phone: string;
}

const SERVICES = [
  { icon: CelebrationIcon, label: "Wedding Cars" },
  { icon: FlightIcon, label: "Airport Pickup & Drop-off" },
  { icon: BusinessCenterIcon, label: "Corporate Transport" },
  { icon: DirectionsCarFilledIcon, label: "Private Movement" },
  { icon: AirportShuttleIcon, label: "Hourly / Full Day Hire" },
  { icon: StoreIcon, label: "Auto Sales & General Supply" },
];

export default function ConciergeFooter({ brandName, phone }: ConciergeFooterProps) {
  const year = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(`Hello ${brandName}, I would like to ask about hiring a vehicle.`)}`;
  const whatsappUrl2 = `https://wa.me/${brand.phone2}?text=${encodeURIComponent(`Hello ${brandName}, I would like to ask about hiring a vehicle.`)}`;

  return (
    <footer className="border-t border-white/10 bg-[#04080f] mt-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 lg:gap-16">

          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4 group">
              <Logo size={56} />
              <div className="flex flex-col">
                <span className="text-white font-semibold tracking-wide text-sm">{brandName}</span>
                <span className="text-[11px] text-[#1a8fff] mt-1">{brand.tagline}</span>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Fleet management, automobile lease, car rental &amp; hire, and general supply services. Elegance in every journey.
            </p>
            {/* Services List */}
            <div className="mt-5 pt-4 border-t border-white/5">
              <span className="block text-[10px] tracking-[0.18em] uppercase text-zinc-400 font-semibold mb-3">
                Our Services
              </span>
              <ul className="space-y-2">
                {SERVICES.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-xs text-zinc-300">
                    <Icon sx={{ fontSize: 14, color: "#1a8fff" }} />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="text-[#1a8fff] text-[11px] tracking-[0.18em] uppercase font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-zinc-300 text-sm">
              <li><a href="#fleet" className="hover:text-[#5abaff] transition-colors">Browse the fleet</a></li>
              <li><a href="#booking" className="hover:text-[#5abaff] transition-colors">Request a vehicle</a></li>
              <li><a href="#booking" className="hover:text-[#5abaff] transition-colors">Ask about availability</a></li>
              <li><a href={`tel:+${phone}`} className="hover:text-[#5abaff] transition-colors flex items-center gap-1.5">
                <PhoneIcon sx={{ fontSize: 13, color: "#1a8fff" }} />
                <span>+{phone}</span>
              </a></li>
              <li><a href={`tel:+${brand.phone2}`} className="hover:text-[#5abaff] transition-colors flex items-center gap-1.5">
                <PhoneIcon sx={{ fontSize: 13, color: "#1a8fff" }} />
                <span>+{brand.phone2}</span>
              </a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-[#1a8fff] text-[11px] tracking-[0.18em] uppercase font-semibold mb-4">
              Talk to our team
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed mb-5 max-w-xs">
              Have a question or need a custom quote? Reach us on WhatsApp or by phone — we're ready to help.
            </p>
            <div className="flex flex-col gap-3 items-start">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 px-5 rounded-full border border-[#1a8fff]/60 text-[#5abaff] text-sm font-semibold hover:bg-[#1a8fff] hover:text-[#020a14] transition-colors"
              >
                <WhatsAppIcon sx={{ fontSize: 16 }} />
                WhatsApp — Line 1
              </a>
              <a
                href={whatsappUrl2}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 px-5 rounded-full border border-[#1a8fff]/40 text-zinc-300 text-sm font-medium hover:border-[#1a8fff]/70 hover:text-[#5abaff] transition-colors"
              >
                <WhatsAppIcon sx={{ fontSize: 16 }} />
                WhatsApp — Line 2
              </a>
              <div className="flex flex-col gap-1 mt-1">
                <a href={`tel:+${phone}`} className="text-xs text-zinc-400 hover:text-[#5abaff] transition-colors flex items-center gap-1.5">
                  <PhoneIcon sx={{ fontSize: 12 }} /> +{phone}
                </a>
                <a href={`tel:+${brand.phone2}`} className="text-xs text-zinc-400 hover:text-[#5abaff] transition-colors flex items-center gap-1.5">
                  <PhoneIcon sx={{ fontSize: 12 }} /> +{brand.phone2}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-zinc-500 text-xs">© {year} {brandName}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span className="text-zinc-500 text-xs italic">{brand.tagline}</span>
            <span className="text-white/20">|</span>
            <a href="#top" className="text-zinc-400 text-xs hover:text-[#5abaff] transition-colors">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
