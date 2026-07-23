"use client";

import { useContent } from "@/hooks/use-content";
import { ChapterIcon } from "@/components/motion/chapter-icon";
import { Reveal } from "@/components/motion/reveal";
import { DrawnSvg } from "@/components/motion/drawn-svg";
import { motion } from "framer-motion";

export function Philosophy() {
  const { c } = useContent();

  const paths = [
    { num: "01", title: c("philosophy.path1.title"), desc: c("philosophy.path1.desc"), svg: LOTUS_PATH },
    { num: "02", title: c("philosophy.path2.title"), desc: c("philosophy.path2.desc"), svg: HEART_PATH },
    { num: "03", title: c("philosophy.path3.title"), desc: c("philosophy.path3.desc"), svg: WAVE_PATH },
    { num: "04", title: c("philosophy.path4.title"), desc: c("philosophy.path4.desc"), svg: EYE_PATH },
  ];

  return (
    <section className="relative overflow-hidden bg-espresso py-24 text-cream sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterIcon id="philosophy" label={c("philosophy.eyebrow", "002 — Tradition")} variant="light" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl">
              {c("philosophy.title", "The four paths of yoga")}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-xl text-base leading-relaxed text-cream sm:text-lg">
              {c("philosophy.body")}
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((p, i) => (
            <Reveal
              key={i}
              delay={i * 0.12}
              y={50}
              rotateY={-8}
              className="group relative rounded-lg border border-cream/10 bg-cream/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:border-clay/30 hover:bg-cream/[0.06] lg:p-10"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-clay">{p.num}</span>
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                  className="text-cream/60"
                >
                  <DrawnSvg path={p.svg} width={48} height={48} duration={1.8} delay={0.2 + i * 0.1} strokeWidth={1} className="text-clay" />
                </motion.div>
              </div>
              <h3 className="font-serif text-2xl text-cream">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream">{p.desc}</p>
              <div className="mt-8 h-px w-0 bg-clay transition-all duration-700 group-hover:w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const LOTUS_PATH =
  "M24 42 C 10 42, 4 30, 10 20 C 14 26, 20 28, 24 22 C 28 28, 34 26, 38 20 C 44 30, 38 42, 24 42 Z M24 22 C 22 14, 24 6, 24 4 M14 30 C 10 28, 6 30, 4 34 M34 30 C 38 28, 42 30, 44 34";
const HEART_PATH =
  "M24 40 C 8 28, 8 14, 18 12 C 22 12, 24 16, 24 18 C 24 16, 26 12, 30 12 C 40 14, 40 28, 24 40 Z";
const WAVE_PATH =
  "M4 24 C 10 14, 18 34, 24 24 C 30 14, 38 34, 44 24 M4 30 C 10 20, 18 40, 24 30 C 30 20, 38 40, 44 30";
const EYE_PATH =
  "M4 24 C 12 12, 36 12, 44 24 C 36 36, 12 36, 4 24 Z M24 18 C 27 18, 30 21, 30 24 C 30 27, 27 30, 24 30 C 21 30, 18 27, 18 24 C 18 21, 21 18, 24 18 Z";
