import type { Metadata } from "next";
import { brand } from "@/lib/properties";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.name} | Executive Vehicle Hire`,
  description:
    `${brand.tagline} Executive cars and group vehicles for hire. Request a vehicle and confirm availability with our team on WhatsApp.`,
  keywords: "Landpeace Logistics, car hire, executive vehicle hire, Prado rental, Lexus GX 460, Hilux, Land Cruiser, Sprinter bus, Coastal bus, Lexus LX 600",
  openGraph: {
    title: `${brand.name} | Executive Vehicle Hire`,
    description: `${brand.tagline} Request executive and group vehicles directly on WhatsApp.`,
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
