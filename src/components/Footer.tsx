"use client";

import Logo from "@/utils/logo";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

interface FooterProps {
  brandName: string;
  phone: string;
}

export default function Footer({ brandName, phone }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/60 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div>
            <div className="flex items-center gap-3 mb-4 group">
              <Logo />
              <div className="flex flex-col">
                <span className="text-white font-semibold tracking-wide text-[15px]">{brandName}</span>
                <span className="text-[10px] tracking-[0.18em] uppercase text-zinc-500">
                  Luxury &amp; Exotic Automotive
                </span>
              </div>
            </div>
            <p className="text-zinc-500 text-[13px] leading-relaxed max-w-xs">
              Premier exotic supercar rentals, VIP chauffeur services, and executive convoy transport for discerning clients across Nigeria.
            </p>
          </div>

          <div>
            <h4 className="text-zinc-400 text-[11px] tracking-[0.18em] uppercase font-semibold mb-5">
              Fleet &amp; Services
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Supercar & Exotic Fleet", href: "/#fleet" },
                { name: "Ultra-Luxury Sedans", href: "/#fleet" },
                { name: "Executive & Armored SUVs", href: "/#fleet" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-zinc-500 text-[13px] hover:text-zinc-200 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-400 text-[11px] tracking-[0.18em] uppercase font-semibold mb-5">
              Fleet Desk
            </h4>
            <p className="text-zinc-500 text-[13px] leading-relaxed mb-5">
              Direct reservations via business WhatsApp. Verified vehicles, immediate handover confirmation.
            </p>
            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-whatsapp/10 hover:bg-brand-whatsapp/20 border border-brand-whatsapp/25 rounded-xl text-brand-whatsapp text-[13px] font-semibold transition-all duration-200"
            >
              <WhatsAppIcon sx={{ fontSize: 16 }} />
              WhatsApp Fleet Desk
            </a>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-[12px]">© {year} {brandName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Rental Terms", "Driver Requirements", "Security Deposit Policy"].map((item) => (
              <a key={item} href="#" className="text-zinc-600 text-[12px] hover:text-zinc-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}