import type { Metadata } from "next";
import ConciergeHeader from "@/components/ConciergeHeader";
import ConciergeHero from "@/components/ConciergeHero";
import ConciergeGallery from "@/components/ConciergeGallery";
import ConciergeFlow from "@/components/ConciergeFlow";
import ConciergeFooter from "@/components/ConciergeFooter";
import { brand } from "@/lib/properties";

export const metadata: Metadata = {
  title: `Private Fleet Concierge — Sourced On Demand | ${brand.name}`,
  description: `Alternative bespoke car rental concierge. Direct sourcing for exotic supercars, luxury sedans, Land Cruisers, Prados, and armed escort convoys across Nigeria via WhatsApp.`,
};

export default function ConciergePage() {
  const brandName = brand.name ?? "Apex Luxury Auto";
  const phone = brand.phone ?? "2349033572229";
  const currency = brand.currency ?? "₦";

  return (
    <main className="min-h-screen bg-bg-primary flex flex-col text-text-body">
      <ConciergeHeader brandName={brandName} phone={phone} />

      <ConciergeHero brandName={brandName} phone={phone} />

      <ConciergeGallery />

      <div className="flex-1 flex items-center justify-center">
        <ConciergeFlow
          brandName={brandName}
          phone={phone}
          currency={currency}
        />
      </div>

      <ConciergeFooter brandName={brandName} phone={phone} />
    </main>
  );
}
