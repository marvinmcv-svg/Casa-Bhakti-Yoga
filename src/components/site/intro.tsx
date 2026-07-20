"use client";

import { useContent } from "@/hooks/use-content";
import { useLanguage } from "@/lib/i18n";
import { ChapterIcon } from "@/components/motion/chapter-icon";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import Link from "next/link";

export function Intro() {
  const { c } = useContent();
  const { t } = useLanguage();

  return (
    <section id="about" className="relative bg-cream py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterIcon id="about" label={c("intro.eyebrow", "001 — About")} />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SplitText
              as="h2"
              text={c("intro.title", "Yoga is a way of seeing life.")}
              split="word"
              className="font-serif text-4xl font-light leading-[1.05] text-espresso sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.4} className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {c("intro.body")}
            </Reveal>

            <Reveal delay={0.5}>
              <Link
                href="#teachers"
                className="group mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-clay"
              >
                <span className="relative">
                  {c("intro.meetLink", "Meet our teachers")}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-clay transition-transform duration-500 group-hover:scale-x-0" />
                </span>
                <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
              </Link>
            </Reveal>

            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-10">
              {[
                { v: c("intro.stat1.value", "2018"), l: c("intro.stat1.label", "Founded") },
                { v: c("intro.stat2.value", "11+"), l: c("intro.stat2.label", "Years of practice") },
                { v: c("intro.stat3.value", "200h"), l: c("intro.stat3.label", "Teacher training") },
              ].map((s, i) => (
                <Reveal key={i} delay={0.2 + i * 0.1} y={20}>
                  <div>
                    <div className="font-serif text-3xl text-gradient-gold sm:text-4xl">{s.v}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {s.l}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <ClipReveal
              src="/media/about-yoga-practice.jpg"
              alt="Yoga practice at Casa Bhakti"
              className="aspect-[3/4] rounded-sm"
              direction="right"
              delay={0.2}
              priority
            />
            <Reveal delay={0.6}>
              <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span>Casa Bhakti</span>
                <span>Santa Cruz, BO</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
