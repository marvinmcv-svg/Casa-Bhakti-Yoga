"use client";

import { useState } from "react";
import { useContent } from "@/hooks/use-content";
import { useLanguage } from "@/lib/i18n";
import { ChapterIcon } from "@/components/motion/chapter-icon";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { motion, AnimatePresence } from "framer-motion";
import type { ClassSchedule } from "@/hooks/use-site-data";

const DAYS = [0, 1, 2, 3, 4, 5, 6]; // Sun..Sat

export function Schedule() {
  const { c, data } = useContent();
  const { t, lang } = useLanguage();
  const [activeDay, setActiveDay] = useState(0);

  const schedule: ClassSchedule[] = data?.schedule ?? [];
  const daySchedule = schedule
    .filter((s) => s.dayOfWeek === activeDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <section id="schedule" className="bg-secondary/40 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterIcon id="schedule" label={c("schedule.eyebrow", "004 — Schedule")} />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitText
              as="h2"
              text={c("schedule.title", "Weekly schedule")}
              split="word"
              className="font-serif text-4xl font-light leading-[1.05] text-espresso sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {c("schedule.body")}
            </p>
          </div>
        </div>

        {/* Day tabs */}
        <div className="mt-16 flex gap-1 overflow-x-auto pb-2 scrollbar-elegant">
          {DAYS.map((d) => {
            const hasClasses = schedule.some((s) => s.dayOfWeek === d);
            return (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`relative shrink-0 px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-colors sm:px-6 sm:text-xs ${
                  activeDay === d
                    ? "text-cream"
                    : "text-muted-foreground hover:text-espresso"
                }`}
              >
                {activeDay === d && (
                  <motion.div
                    layoutId="day-pill"
                    className="absolute inset-0 -z-10 rounded-sm bg-clay"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="flex flex-col items-center gap-0.5">
                  {t(`label.${dayName(d)}`)}
                  <span
                    className={`h-1 w-1 rounded-full ${
                      hasClasses ? "bg-clay" : "bg-transparent"
                    } ${activeDay === d ? "bg-cream" : ""}`}
                  />
                </span>
              </button>
            );
          })}
        </div>

        {/* Schedule list */}
        <div className="mt-8 min-h-[320px] border-t border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {daySchedule.length === 0 ? (
                <div className="py-20 text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {t("schedule.noClasses")}
                </div>
              ) : (
                daySchedule.map((s, i) => {
                  const clsName = lang === "en" ? s.classType?.nameEn : s.classType?.nameEs;
                  const instructor = lang === "en" ? s.instructorEn : s.instructorEs;
                  const levelLabel = s.classType ? t(`label.level.${s.classType.level}`) : "";
                  return (
                    <Reveal
                      key={s.id}
                      delay={i * 0.05}
                      y={20}
                      className="group grid grid-cols-12 items-center gap-4 border-b border-border py-5 transition-colors hover:bg-cream/60"
                    >
                      <div className="col-span-3 sm:col-span-2">
                        <div className="font-serif text-lg text-clay sm:text-xl">
                          {s.startTime}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          {s.endTime}
                        </div>
                      </div>
                      <div className="col-span-9 sm:col-span-6">
                        <div className="font-serif text-lg text-espresso sm:text-xl">
                          {clsName}
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {instructor} · {levelLabel} · {s.classType?.durationMin} min
                        </div>
                      </div>
                      <div className="col-span-12 flex items-center gap-2 sm:col-span-4 sm:justify-end">
                        {s.online && (
                          <span className="rounded-full border border-sage/40 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-sage">
                            {t("label.online")}
                          </span>
                        )}
                        <a
                          href="https://wa.me/59167394998"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] uppercase tracking-[0.2em] text-clay opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          {t("cta.book")} →
                        </a>
                      </div>
                    </Reveal>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function dayName(d: number) {
  return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][d];
}
