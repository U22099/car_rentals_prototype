import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apex Luxury Auto — Exotic & Executive Car Rentals",
  description:
    "Reserve exotic supercars, ultra-luxury sedans, and armored executive SUVs with VIP chauffeur options. Instant direct WhatsApp confirmation.",
  keywords: "luxury car rental, exotic supercars, rolls royce, lamborghini, maybach, chauffeur service, lagos car rental",
  openGraph: {
    title: "Apex Luxury Auto — Exotic & Executive Car Rentals",
    description: "Reserve exotic supercars and luxury chauffeur saloons directly via WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full bg-bg-primary text-text-body antialiased">
        {children}
      </body>
    </html>
  );
}
