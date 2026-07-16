"use client";

import { useContent } from "@/hooks/use-content";
import { useLanguage } from "@/lib/i18n";
import { ChapterIcon } from "@/components/motion/chapter-icon";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { ClayButton } from "@/components/motion/clay-button";
import { motion } from "framer-motion";
import type { EventItem } from "@/hooks/use-site-data";

export function Events() {
  const { c, data } = useContent();
  const { t, lang } = useLanguage();
  const events: EventItem[] = data?.events ?? [];

  const featured = events.filter((e) => e.featured).slice(0, 2);
  const upcoming = events.filter((e) => !e.featured).slice(0, 4);

  return (
    <section id="events" className="bg-espresso py-24 text-cream sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="[&_*]:!text-cream/70">
          <ChapterIcon id="events" label={c("events.eyebrow", "006 — Events")} />
        </div>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="lg:max-w-2xl">
            <SplitText
              as="h2"
              text={c("events.title", "Special gatherings")}
              split="word"
              className="font-serif text-4xl font-light leading-[1.05] text-cream sm:text-5xl lg:text-6xl"
            />
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70 sm:text-lg">
              {c("events.body")}
            </p>
          </div>
        </div>

        {/* Featured events */}
        {featured.length > 0 && (
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {featured.map((ev, i) => (
              <FeaturedEventCard key={ev.id} event={ev} lang={lang} t={t} delay={i * 0.1} />
            ))}
          </div>
        )}

        {/* Upcoming list */}
        {upcoming.length > 0 && (
          <div className="mt-12 border-t border-cream/10 pt-12">
            <h3 className="mb-8 text-[10px] uppercase tracking-[0.3em] text-cream/50">
              {lang === "en" ? "More gatherings" : "Más encuentros"}
            </h3>
            <div className="space-y-2">
              {upcoming.map((ev, i) => (
                <Reveal key={ev.id} delay={i * 0.06} y={20}>
                  <CompactEvent event={ev} lang={lang} t={t} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <Reveal delay={0.2} className="mt-12">
          <ClayButton
            href="https://wa.me/59167394998"
            target="_blank"
            variant="cream"
            className="!text-clay"
          >
            {t("cta.moreInfo")}
          </ClayButton>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedEventCard({
  event,
  lang,
  t: _t,
  delay,
}: {
  event: EventItem;
  lang: "es" | "en";
  t: (k: string) => string;
  delay: number;
}) {
  const title = lang === "en" ? event.titleEn : event.titleEs;
  const desc = lang === "en" ? event.descriptionEn : event.descriptionEs;
  const location = lang === "en" ? event.locationEn : event.locationEs;
  const price = lang === "en" ? event.priceEn : event.priceEs;
  const date = new Date(event.date);

  return (
    <Reveal delay={delay} y={50} rotateY={6} className="perspective-1000">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        className="group relative h-full overflow-hidden rounded-sm bg-espresso/40"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={event.imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-quart group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-col items-center bg-cream/95 px-3 py-2 text-espresso backdrop-blur">
            <span className="text-[9px] uppercase tracking-[0.2em] text-clay">
              {date.toLocaleDateString(lang === "en" ? "en-US" : "es-BO", { month: "short" })}
            </span>
            <span className="font-serif text-2xl leading-none">{date.getDate()}</span>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="font-serif text-2xl text-cream sm:text-3xl">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">{desc}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-cream/60">
            <span>{location}</span>
            <span className="h-1 w-1 rounded-full bg-clay" />
            <span>{price}</span>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

function CompactEvent({
  event,
  lang,
}: {
  event: EventItem;
  lang: "es" | "en";
  t: (k: string) => string;
}) {
  const title = lang === "en" ? event.titleEn : event.titleEs;
  const location = lang === "en" ? event.locationEn : event.locationEs;
  const price = lang === "en" ? event.priceEn : event.priceEs;
  const date = new Date(event.date);
  const locale = lang === "en" ? "en-US" : "es-BO";

  return (
    <a
      href="https://wa.me/59167394998"
      target="_blank"
      rel="noopener noreferrer"
      className="group grid grid-cols-12 items-center gap-4 border-b border-cream/10 py-5 transition-colors hover:bg-cream/5"
    >
      <div className="col-span-3 sm:col-span-2">
        <div className="font-serif text-2xl text-clay">
          {date.getDate()}
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-cream/50">
          {date.toLocaleDateString(locale, { month: "short", year: "numeric" })}
        </div>
      </div>
      <div className="col-span-9 sm:col-span-6">
        <div className="font-serif text-lg text-cream sm:text-xl">{title}</div>
        <div className="mt-0.5 text-xs text-cream/50">{location}</div>
      </div>
      <div className="col-span-12 text-xs uppercase tracking-[0.2em] text-cream/60 sm:col-span-4 sm:text-right">
        {price} <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
      </div>
    </a>
  );
}
