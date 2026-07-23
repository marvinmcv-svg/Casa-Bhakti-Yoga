"use client";

import { useState } from "react";
import { useContent } from "@/hooks/use-content";
import { useLanguage } from "@/lib/i18n";
import { ChapterIcon } from "@/components/motion/chapter-icon";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/hooks/use-site-data";

export function Testimonials() {
  const { c, data } = useContent();
  const { lang } = useLanguage();
  const testimonials: Testimonial[] = data?.testimonials ?? [];
  const [idx, setIdx] = useState(0);
  if (testimonials.length === 0) return null;
  const current = testimonials[idx % testimonials.length];
  const next = () => setIdx((p) => (p + 1) % testimonials.length);
  const prev = () => setIdx((p) => (p - 1 + testimonials.length) % testimonials.length);
  const quote = lang === "en" ? current.quoteEn : current.quoteEs;
  const role = lang === "en" ? current.authorRoleEn : current.authorRoleEs;

  return (
    <section id="testimonials" className="relative overflow-hidden bg-cream py-24 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay/5 blur-[100px]" />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center">
          <div className="flex justify-center"><ChapterIcon id="testimonials" label={c("testimonials.eyebrow", "006 — Voices")} /></div>
          <SplitText as="h2" text={c("testimonials.title", "Words from our community")} split="word" className="mt-8 font-serif text-4xl font-light leading-[1.1] text-espresso sm:text-5xl lg:text-6xl" />
          <Reveal delay={0.3}><p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{c("testimonials.body")}</p></Reveal>
        </div>
        <div className="mt-16">
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }} className="relative">
              <Quote className="mx-auto mb-8 h-12 w-12 text-clay/20" />
              <blockquote className="mx-auto max-w-4xl text-center">
                <p className="font-serif text-3xl font-light italic leading-[1.35] text-espresso sm:text-4xl lg:text-5xl">&ldquo;{quote}&rdquo;</p>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-secondary ring-2 ring-clay/20">{current.authorImage ? <img src={current.authorImage} alt={current.authorName} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center font-serif text-xl text-clay">{current.authorName.charAt(0)}</div>}</div>
                  <div className="text-left"><div className="font-serif text-xl text-espresso">{current.authorName}</div>{role && <div className="text-[10px] uppercase tracking-[0.25em] text-clay">{role}</div>}<div className="mt-1 flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={11} className={i < current.rating ? "fill-clay text-clay/70" : "text-muted-foreground/20"} />))}</div></div>
                </div>
              </blockquote>
            </motion.div>
          </AnimatePresence>
          {testimonials.length > 1 && (
            <div className="mt-12 flex items-center justify-center gap-6">
              <button onClick={prev} aria-label="Previous" className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-clay"><ChevronLeft size={20} /></button>
              <div className="flex gap-2">{testimonials.map((_, i) => (<button key={i} onClick={() => setIdx(i)} aria-label={`Go to testimonial ${i + 1}`} className={`h-1 rounded-full transition-all duration-500 ${i === idx % testimonials.length ? "w-8 bg-clay" : "w-1.5 bg-border hover:bg-clay/40"}`} />))}</div>
              <button onClick={next} aria-label="Next" className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-clay"><ChevronRight size={20} /></button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
