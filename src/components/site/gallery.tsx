"use client";

import { useContent } from "@/hooks/use-content";
import { useLanguage } from "@/lib/i18n";
import { ChapterIcon } from "@/components/motion/chapter-icon";
import { SplitText } from "@/components/motion/split-text";
import { DragSlider } from "@/components/motion/drag-slider";
import { MarqueeText } from "@/components/motion/marquee-text";
import { Reveal } from "@/components/motion/reveal";
import type { GalleryItem } from "@/hooks/use-site-data";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Gallery() {
  const { c, data } = useContent();
  const { lang } = useLanguage();
  const items: GalleryItem[] = data?.gallery ?? [];
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section id="gallery" className="overflow-hidden bg-cream py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterIcon id="gallery" label={c("gallery.eyebrow", "007 — Gallery")} />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitText
              as="h2"
              text={c("gallery.title", "Life at the temple")}
              split="word"
              className="font-serif text-4xl font-light leading-[1.05] text-espresso sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {c("gallery.body")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        {items.length > 0 && (
          <DragSlider className="pl-5 sm:pl-8" itemClassName="w-[78vw] sm:w-[50vw] lg:w-[32vw] xl:w-[26vw]">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setLightbox(item)}
                className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-secondary"
              >
                <img
                  src={item.imageUrl}
                  alt={lang === "en" ? item.captionEn : item.captionEs}
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-quart group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-3 text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="text-[9px] uppercase tracking-[0.3em] text-clay">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-1 font-serif text-lg">
                    {lang === "en" ? item.captionEn : item.captionEs}
                  </div>
                </div>
              </button>
            ))}
          </DragSlider>
        )}
      </div>

      {/* Marquee */}
      <div className="mt-20 border-y border-border py-6">
        <MarqueeText
          text={lang === "en" ? "Casa Bhakti · Yoga · Vedanta · Devotion · Santa Cruz" : "Casa Bhakti · Yoga · Vedanta · Bhakti · Santa Cruz"}
          className="font-serif text-3xl text-espresso/80 sm:text-4xl"
        />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/90 p-6 backdrop-blur"
          >
            <motion.img
              src={lightbox.imageUrl}
              alt={lang === "en" ? lightbox.captionEn : lightbox.captionEs}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              className="max-h-[85vh] max-w-[90vw] rounded-sm object-contain"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 text-cream/80 hover:text-cream"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
