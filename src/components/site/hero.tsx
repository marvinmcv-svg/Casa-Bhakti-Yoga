"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useContent } from "@/hooks/use-content";
import { ClayButton } from "@/components/motion/clay-button";
import { SplitText } from "@/components/motion/split-text";
import { useLanguage } from "@/lib/i18n";

const HERO_IMAGES = [
  "/media/hero-yoga-retreat.jpg",
  "/media/hero-yoga-meditation.jpg",
  "/media/hero-yoga-class.jpg",
  "/media/hero-kirtan.jpg",
];

export function Hero() {
  const { c } = useContent();
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const iv = setInterval(() => setIdx((p) => (p + 1) % HERO_IMAGES.length), 6500);
    return () => clearInterval(iv);
  }, []);

  const lines = [c("hero.line1", "Yoga"), c("hero.line2", "Vedanta"), c("hero.line3", "Bhakti")];

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-espresso"
    >
      {/* Parallax background slideshow */}
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 z-0">
        {HERO_IMAGES.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={false}
            animate={{ opacity: i === idx ? 1 : 0 }}
            transition={{ duration: 1.8, ease: [0.215, 0.61, 0.355, 1] }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/65" />
        <div className="absolute inset-0 bg-espresso/25" />
      </motion.div>

      {/* Spinning wave-circle accents */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute right-8 top-32 z-10 hidden text-cream/40 lg:block"
      >
        <div className="animate-spin-slow">
          <SpinningBadge />
        </div>
      </motion.div>

      {/* Connect line */}
      <div className="pointer-events-none absolute left-8 top-32 z-10 hidden h-40 w-px lg:block">
        <div className="h-full w-px origin-top animate-pulse-line bg-cream/50" />
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity, y: yText }}
        className="relative z-20 w-full px-5 pb-16 sm:px-8 sm:pb-24"
      >
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mb-6 text-[10px] uppercase tracking-[0.4em] text-cream/70"
          >
            Santa Cruz · Bolivia
          </motion.p>

          <h1 className="font-serif font-light leading-[0.92] text-cream [text-shadow:0_4px_40px_rgba(0,0,0,0.45)]">
            {lines.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <SplitText
                  as="span"
                  text={line}
                  delay={0.6 + li * 0.25}
                  stagger={0.05}
                  duration={1.3}
                  className={`block ${
                    li === 0
                      ? "text-[16vw] sm:text-[12vw] lg:text-[10rem] xl:text-[12rem]"
                      : li === 1
                      ? "text-[14vw] sm:text-[10vw] lg:text-[8rem] xl:text-[10rem] italic"
                      : "text-[12vw] sm:text-[8vw] lg:text-[6rem] xl:text-[8rem] text-gold [text-shadow:0_4px_40px_rgba(0,0,0,0.5)]"
                  }`}
                />
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-8 max-w-xl text-base text-cream/95 [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:text-lg"
          >
            {c("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <ClayButton href="#contact" variant="clay">
              {t("cta.book")}
            </ClayButton>
            <ClayButton href="#schedule" variant="cream" className="!text-clay">
              {t("cta.viewSchedule")}
            </ClayButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-cream/70"
        >
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-10 w-px bg-cream/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SpinningBadge() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="0.5" />
      <path
        id="circlePath"
        d="M 60,60 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
        fill="none"
      />
      <text className="fill-current" style={{ fontSize: "9px", letterSpacing: "0.3em" }}>
        <textPath href="#circlePath">
          CASA BHAKTI · YOGA · VEDANTA · BOLIVIA ·
        </textPath>
      </text>
      <circle cx="60" cy="60" r="6" fill="currentColor" className="text-clay" />
    </svg>
  );
}
