import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://casabhakti.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Casa Bhakti — Templo de Yoga & Vedanta · Santa Cruz, Bolivia",
    template: "%s · Casa Bhakti",
  },
  description:
    "Casa Bhakti es un templo de Yoga & Vedanta en Santa Cruz de la Sierra, Bolivia. Clases de Hatha Yoga, meditación, kirtan, filosofía Vedanta y formación de profesores en la tradición de Swami Sivananda.",
  keywords: [
    "Casa Bhakti", "yoga Bolivia", "yoga Santa Cruz", "kirtan", "Vedanta",
    "Sivananda", "Bhakti Yoga", "meditación", "formación yoga Bolivia",
  ],
  authors: [{ name: "Casa Bhakti" }],
  creator: "Casa Bhakti",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Casa Bhakti — Templo de Yoga & Vedanta",
    description: "Yoga, meditación, kirtan y Vedanta en Santa Cruz, Bolivia.",
    siteName: "Casa Bhakti",
    type: "website",
    locale: "es_BO",
    alternateLocale: "en_US",
    images: [
      {
        url: "/media/hero-yoga-retreat.jpg",
        width: 1200,
        height: 630,
        alt: "Casa Bhakti — Templo de Yoga & Vedanta, Santa Cruz, Bolivia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa Bhakti — Templo de Yoga & Vedanta",
    description: "Yoga, meditación, kirtan y Vedanta en Santa Cruz, Bolivia.",
    images: ["/media/hero-yoga-retreat.jpg"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-BO": "/",
      "en-US": "/",
    },
  },
  category: "health",
};

// Structured data for rich search results (LocalBusiness / HealthAndBeautyBusiness)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Casa Bhakti",
  alternateName: "Casa Bhakti — Templo de Yoga & Vedanta",
  description:
    "Templo de Yoga & Vedanta en Santa Cruz de la Sierra, Bolivia. Clases de Hatha Yoga, meditación, kirtan y formación de profesores en la tradición de Swami Sivananda.",
  url: SITE_URL,
  image: `${SITE_URL}/media/hero-yoga-retreat.jpg`,
  telephone: "+59167394998",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santa Cruz de la Sierra",
    addressCountry: "BO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -17.7833,
    longitude: -63.1821,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:15",
      closes: "20:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/casabhakti.scz/",
    "https://www.facebook.com/casabhaktiscz",
  ],
  priceRange: "50-450 Bs",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${jost.variable} antialiased bg-background text-foreground grain-overlay`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-clay focus:px-5 focus:py-2.5 focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-cream"
        >
          Saltar al contenido
        </a>
        <Providers>{children}</Providers>
        <Toaster />
        <SonnerToaster position="top-center" richColors />
      </body>
    </html>
  );
}
