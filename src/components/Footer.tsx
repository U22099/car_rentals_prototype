"use client";

import Logo from "@/utils/logo";
import EmailIcon from "@mui/icons-material/Email";

interface FooterProps {
  brandName: string;
  email?: string;
}

export default function Footer({
  brandName,
  email = "u22099dandev@gmail.com",
}: FooterProps) {
  const year = new Date().getFullYear();

  const subject = "Inquiry: Fleet Reservation & Concierge Booking";
  const body = `Hello ${brandName} Team,\n\nI am reaching out regarding a vehicle reservation from your exotic fleet.\n\nPlease share current availability and booking details for an upcoming reservation.\n\nBest regards,`;

  const mailUrl = `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  return (
    <footer className="border-t border-zinc-800/60 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4 group">
              <Logo />
              <div className="flex flex-col">
                <span className="text-white font-semibold tracking-wide text-[15px]">
                  {brandName}
                </span>
                <span className="text-[10px] tracking-[0.18em] uppercase text-zinc-500">
                  Luxury &amp; Exotic Automotive
                </span>
              </div>
            </div>
            <p className="text-zinc-500 text-[13px] leading-relaxed max-w-xs">
              Premier exotic supercar rentals, VIP chauffeur transfers, and
              concierge fleet delivery for discerning clients in Miami, LA, and
              London.
            </p>
          </div>

          {/* Fleet Navigation Column */}
          <div>
            <h4 className="text-zinc-400 text-[11px] tracking-[0.18em] uppercase font-semibold mb-5">
              Fleet &amp; Services
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Exotic & Supercar Fleet", href: "/#fleet" },
                { name: "Ultra-Luxury Sedans", href: "/#fleet" },
                { name: "Executive SUVs & Chauffeur", href: "/#fleet" },
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

          {/* Fleet Desk / Email Column */}
          <div>
            <h4 className="text-zinc-400 text-[11px] tracking-[0.18em] uppercase font-semibold mb-5">
              Reservation Desk
            </h4>
            <p className="text-zinc-500 text-[13px] leading-relaxed mb-5">
              Direct email reservations. Fully insured fleet, instant handover
              confirmation, and white-glove hotel/airport delivery.
            </p>
            <a
              href={mailUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 rounded-xl text-white text-[13px] font-medium transition-all duration-200"
            >
              <EmailIcon sx={{ fontSize: 16 }} />
              Inquire via Email
            </a>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-zinc-800/50 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-[12px]">
            © {year} {brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              "Rental Terms",
              "Driver Requirements",
              "Security Deposit Policy",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-zinc-600 text-[12px] hover:text-zinc-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
