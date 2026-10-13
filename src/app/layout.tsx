import type { Metadata } from "next";
import { brand } from "@/lib/properties";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.name} | Fleet Management, Car Rental & General Supply`,
  description:
    `${brand.tagline} Fleet management, automobile lease, car rental & hire, wedding cars, airport transfers, corporate transport and general supply services.`,
  keywords: "Double I.Tanze, car hire, car rental Nigeria, wedding cars, airport pickup, corporate transport, Land Cruiser, Prado, Range Rover, G-Wagon, Mercedes Benz, Sprinter bus, Bulletproof SUV, Lexus, fleet management",
  openGraph: {
    title: `${brand.name} | Fleet Management & Car Rental`,
    description: `${brand.tagline} Luxury car rental, wedding cars, airport transfers and corporate transport. Request a vehicle on WhatsApp.`,
    images: "/logo.jpeg",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-bg-primary text-text-body antialiased">
        {children}
      </body>
    </html>
  );
}
