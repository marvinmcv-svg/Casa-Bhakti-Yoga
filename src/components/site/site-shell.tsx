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
import { Testimonials } from "@/components/site/testimonials";
import { Videos } from "@/components/site/videos";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { ShirleyWidget } from "@/components/site/shirley-widget";
import { WhatsAppWidget } from "@/components/site/whatsapp-widget";
import { Preloader } from "@/components/motion/preloader";
import { MagneticCursor } from "@/components/motion/magnetic-cursor";
import { ScrollProgress } from "@/components/motion/scroll-progress";

export function SiteShell() {
  const { isError } = useSiteData();

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream text-espresso">
        <p>Unable to load site content. Please refresh.</p>
      </div>
    );
  }

  return (
    <>
      <Preloader />
      <MagneticCursor />
      <ScrollProgress />
      <div className="flex min-h-screen flex-col bg-cream">
        <Header />
        <main id="main-content" className="flex-1">
          <Hero />
          <Intro />
          <Philosophy />
          <QuoteSection />
          <Classes />
          <Schedule />
          <Teachers />
          <Testimonials />
          <Events />
          <Videos />
          <Gallery />
          <Contact />
        </main>
        <Footer />
        <ShirleyWidget />
        <WhatsAppWidget />
      </div>
    </>
  );
}
