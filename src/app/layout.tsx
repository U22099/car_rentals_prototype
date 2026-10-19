import type { Metadata, Viewport } from "next";
import { brand } from "@/lib/properties";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doubleitanze.com.ng";
const ogImage = "/logo.jpeg";

const description = `${brand.tagline} Fleet management, automobile lease, car rental & hire, wedding cars, airport transfers, corporate transport and general supply services in Nigeria.`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a8fff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} | Fleet Management, Car Rental & General Supply`,
    template: `%s | ${brand.name}`,
  },
  description,
  applicationName: brand.name,
  keywords: [
    "Double I.Tanze",
    "car hire Nigeria",
    "car rental Nigeria",
    "fleet management",
    "automobile lease",
    "wedding cars",
    "airport pickup",
    "airport transfers",
    "corporate transport",
    "Land Cruiser",
    "Prado",
    "Range Rover",
    "G-Wagon",
    "Mercedes Benz",
    "Sprinter bus",
    "bulletproof SUV",
    "Lexus",
  ],
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: brand.name,
    title: `${brand.name} | Fleet Management & Car Rental`,
    description: `${brand.tagline} Luxury car rental, wedding cars, airport transfers and corporate transport. Request a vehicle on WhatsApp.`,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${brand.name} - Fleet management and luxury car rental`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | Fleet Management & Car Rental`,
    description: `${brand.tagline} Luxury car rental, wedding cars, airport transfers and corporate transport.`,
    images: [ogImage],
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  category: "automotive",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: brand.name,
  description,
  url: siteUrl,
  image: `${siteUrl}${ogImage}`,
  logo: `${siteUrl}/logo.jpeg`,
  areaServed: { "@type": "Country", name: "Nigeria" },
  telephone: brand.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.address,
    addressLocality: brand.city,
    addressCountry: "NG",
  },
  sameAs: [brand.socials.facebook, brand.socials.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-bg-primary text-text-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
