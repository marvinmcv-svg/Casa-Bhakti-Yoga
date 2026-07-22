"use client";

import { useState } from "react";
import { useContent } from "@/hooks/use-content";
import { useLanguage } from "@/lib/i18n";
import { ChapterIcon } from "@/components/motion/chapter-icon";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Star, X } from "lucide-react";
import type { Video as VideoType } from "@/hooks/use-site-data";

function toEmbedUrl(url: string): { src: string; isEmbed: boolean } {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return { src: `https://www.youtube.com/embed/${ytMatch[1]}`, isEmbed: true };
  const vmMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vmMatch) return { src: `https://player.vimeo.com/video/${vmMatch[1]}`, isEmbed: true };
  return { src: url, isEmbed: false };
}

export function Videos() {
  const { c, data } = useContent();
  const { lang } = useLanguage();
  const videos: VideoType[] = data?.videos ?? [];
  const [active, setActive] = useState<VideoType | null>(null);
  if (videos.length === 0) return null;
  const featured = videos.find((v) => v.featured) ?? videos[0];
  const others = videos.filter((v) => v.id !== featured.id);
  const title = (v: VideoType) => lang === "en" ? v.titleEn : v.titleEs;
  const desc = (v: VideoType) => lang === "en" ? v.descriptionEn : v.descriptionEs;
  const source = (v: VideoType) => lang === "en" ? v.sourceEn : v.sourceEs;

  return (
    <section id="videos" className="bg-espresso py-24 text-cream sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterIcon id="videos" label={c("videos.eyebrow", "009 — Watch")} variant="light" />
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7"><SplitText as="h2" text={c("videos.title", "Moving images")} split="word" className="font-serif text-4xl font-light leading-[1.05] text-cream sm:text-5xl lg:text-6xl" /></div>
          <div className="lg:col-span-5"><p className="max-w-md text-base leading-relaxed text-cream sm:text-lg">{c("videos.body")}</p></div>
        </div>
        <Reveal delay={0.2} y={40} className="mt-16">
          <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-black" onClick={() => setActive(featured)}>
            {featured.posterUrl ? <img src={featured.posterUrl} alt={title(featured)} className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60" /> : <video src={featured.videoUrl} className="h-full w-full object-cover opacity-80" muted />}
            <div className="absolute inset-0 flex items-center justify-center"><motion.div whileHover={{ scale: 1.1 }} className="flex h-20 w-20 items-center justify-center rounded-full bg-cream/90 text-espresso shadow-2xl"><Play size={28} className="fill-espresso ml-1" /></motion.div></div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-espresso to-transparent p-6 sm:p-8">
              <div className="flex items-center gap-2">{featured.featured && <Star size={14} className="fill-clay text-clay" />}<span className="text-[10px] uppercase tracking-[0.25em] text-cream/60">{source(featured) || (lang === "en" ? "Featured" : "Destacado")}</span></div>
              <h3 className="mt-2 font-serif text-2xl text-cream sm:text-3xl">{title(featured)}</h3>
              {desc(featured) && <p className="mt-2 max-w-2xl text-sm text-cream/70">{desc(featured)}</p>}
            </div>
          </div>
        </Reveal>
        {others.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.1} y={30}>
                <button onClick={() => setActive(v)} className="group relative block aspect-video w-full overflow-hidden rounded-md bg-black text-left">
                  {v.posterUrl ? <img src={v.posterUrl} alt={title(v)} className="h-full w-full object-cover opacity-75 transition-all duration-500 group-hover:scale-105 group-hover:opacity-50" /> : <video src={v.videoUrl} className="h-full w-full object-cover opacity-75" muted />}
                  <div className="absolute inset-0 flex items-center justify-center"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/80 text-espresso transition-transform duration-300 group-hover:scale-110"><Play size={18} className="fill-espresso ml-0.5" /></div></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-espresso to-transparent p-4"><div className="text-[9px] uppercase tracking-[0.2em] text-cream/50">{source(v)}</div><div className="mt-1 font-serif text-base text-cream">{title(v)}</div></div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/90 p-4 backdrop-blur-md sm:p-8">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl">
              <button onClick={() => setActive(null)} className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20" aria-label="Close"><X size={18} /></button>
              <div className="overflow-hidden rounded-lg bg-black shadow-2xl">
                {(() => { const { src, isEmbed } = toEmbedUrl(active.videoUrl); return isEmbed ? <div className="aspect-video w-full"><iframe src={src} title={title(active)} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div> : <video src={src} className="aspect-video w-full" controls autoPlay poster={active.posterUrl} playsInline />; })()}
              </div>
              <div className="mt-4"><h3 className="font-serif text-2xl text-cream">{title(active)}</h3>{desc(active) && <p className="mt-2 text-sm text-cream/70">{desc(active)}</p>}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
