"use client";

import { useContent } from "@/hooks/use-content";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { DrawnSvg } from "@/components/motion/drawn-svg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function QuoteSection() {
  const { c } = useContent();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yLeft = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-cream py-24 sm:py-32"
    >
      {/* Floating circular images */}
      <motion.div
        style={{ y: yLeft }}
        className="pointer-events-none absolute left-[5%] top-1/2 hidden -translate-y-1/2 lg:block"
      >
        <div className="relative h-40 w-40 overflow-hidden rounded-full ring-1 ring-clay/30 xl:h-52 xl:w-52">
          <img src="/media/kirtan-02.png" alt="" className="h-full w-full object-cover" />
        </div>
      </motion.div>
      <motion.div
        style={{ y: yRight }}
        className="pointer-events-none absolute right-[5%] top-1/2 hidden -translate-y-1/2 lg:block"
      >
        <div className="relative h-40 w-40 overflow-hidden rounded-full ring-1 ring-clay/30 xl:h-52 xl:w-52">
          <img src="/media/kirtan-04.png" alt="" className="h-full w-full object-cover" />
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal delay={0.1} className="mb-8 flex justify-center text-clay">
          <DrawnSvg
            path="M40 4 C 20 4, 4 20, 4 40 C 4 60, 20 76, 40 76 C 60 76, 76 60, 76 40 C 76 20, 60 4, 40 4 Z M40 20 C 32 20, 24 28, 24 40 C 24 52, 32 60, 40 60"
            width={80}
            height={80}
            duration={2}
            strokeWidth={1}
          />
        </Reveal>

        <SplitText
          as="blockquote"
          text={c("quote.text", "Health is wealth. Peace of mind is happiness. Yoga shows the way.")}
          split="word"
          stagger={0.03}
          duration={1.1}
          className="font-serif text-3xl font-light italic leading-[1.25] text-espresso sm:text-4xl lg:text-5xl"
        />

        <Reveal delay={0.5}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-clay/40" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {c("quote.author", "Swami Sivananda")}
            </span>
            <div className="h-px w-12 bg-clay/40" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
