import { Suspense } from "react";
import type { Metadata } from "next";
import LandingPageClient from "./LandingPageClient";
import { listing, brand } from "@/lib/properties";

interface PageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;

  const brandName = brand.name ?? "Apex Luxury Auto";
  const currency = brand.currency ?? "₦";

  const vehicle =
    (params.id ? listing.find((p) => p.id === params.id) : null) ??
    listing[0];

  const priceFormatted = vehicle.pricePerDay.toLocaleString("en-US");
  const title = `${vehicle.name} — Luxury & Exotic Car Rental | ${brandName}`;
  const description = `Rent the ${vehicle.name} (${vehicle.category}) in ${vehicle.location}. From ${currency}${priceFormatted} / day. VIP Chauffeur, armed escort, & direct WhatsApp reservation.`;

  return {
    title,
    description,
    keywords: `luxury car rental, exotic supercar hire, rolls royce rental, lamborghini urus hire, maybach chauffeur, lagos luxury cars, ${vehicle.name}`,
    openGraph: {
      title,
      description: `${vehicle.location} · From ${currency}${priceFormatted}/day`,
      type: "website",
      images: [
        {
          url: vehicle.image,
          width: 1200,
          height: 630,
          alt: vehicle.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `${vehicle.location} · From ${currency}${priceFormatted}/day`,
      images: [vehicle.image],
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const brandName = brand.name ?? "Apex Luxury Auto";
  const currency = brand.currency ?? "₦";
  const phone = brand.phone ?? "2349033572229";
  const location = brand.location ?? "Lagos & Abuja";
  const initialPropertyId = params.id ?? null;

  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
      <LandingPageClient
        brandName={brandName}
        currency={currency}
        phone={phone}
        location={location}
        initialPropertyId={initialPropertyId}
      />
    </Suspense>
  );
}