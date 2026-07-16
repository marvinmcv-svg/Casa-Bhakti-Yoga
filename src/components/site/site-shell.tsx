"use client";

import { useSiteData } from "@/hooks/use-site-data";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Intro } from "@/components/site/intro";
import { Philosophy } from "@/components/site/philosophy";
import { QuoteSection } from "@/components/site/quote-section";
import { Classes } from "@/components/site/classes";
import { Schedule } from "@/components/site/schedule";
import { Teachers } from "@/components/site/teachers";
import { Events } from "@/components/site/events";
import { Gallery } from "@/components/site/gallery";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { motion } from "framer-motion";

export function SiteShell() {
  const { isLoading, isError } = useSiteData();

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream text-espresso">
        <p>Unable to load site content. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex-1">
        <Hero />
        <Intro />
        <Philosophy />
        <QuoteSection />
        <Classes />
        <Schedule />
        <Teachers />
        <Events />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-cream"
        >
          <div className="text-center">
            <div className="font-serif text-3xl text-clay">Casa Bhakti</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Loading…
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
