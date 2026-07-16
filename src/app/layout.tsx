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

export const metadata: Metadata = {
  title: "Casa Bhakti — Templo de Yoga & Vedanta · Santa Cruz, Bolivia",
  description:
    "Casa Bhakti es un templo de Yoga & Vedanta en Santa Cruz de la Sierra, Bolivia. Clases de Hatha Yoga, meditación, kirtan, filosofía Vedanta y formación de profesores en la tradición de Swami Sivananda.",
  keywords: [
    "Casa Bhakti", "yoga Bolivia", "yoga Santa Cruz", "kirtan", "Vedanta",
    "Sivananda", "Bhakti Yoga", "meditación", "formación yoga Bolivia",
  ],
  authors: [{ name: "Casa Bhakti" }],
  openGraph: {
    title: "Casa Bhakti — Templo de Yoga & Vedanta",
    description: "Yoga, meditación, kirtan y Vedanta en Santa Cruz, Bolivia.",
    siteName: "Casa Bhakti",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${jost.variable} antialiased bg-background text-foreground grain-overlay`}
      >
        <Providers>{children}</Providers>
        <Toaster />
        <SonnerToaster position="top-center" richColors />
      </body>
    </html>
  );
}
