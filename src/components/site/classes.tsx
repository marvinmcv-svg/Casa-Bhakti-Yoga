"use client";

import { useContent } from "@/hooks/use-content";
import { useLanguage } from "@/lib/i18n";
import { ChapterIcon } from "@/components/motion/chapter-icon";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { DragSlider } from "@/components/motion/drag-slider";
import { ClayButton } from "@/components/motion/clay-button";
import type { ClassType } from "@/hooks/use-site-data";

export function Classes() {
  const { c, data } = useContent();
  const { t, lang } = useLanguage();
  const classes: ClassType[] = data?.classes ?? [];

  const levelKey = (lvl: string) =>
    `label.level.${lvl}` as const;

  return (
    <section id="classes" className="bg-cream py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterIcon id="classes" label={c("classes.eyebrow", "003 — Classes")} />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitText
              as="h2"
              text={c("classes.title", "Practice with us")}
              split="word"
              className="font-serif text-4xl font-light leading-[1.05] text-espresso sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {c("classes.body")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        {classes.length > 0 ? (
          <DragSlider className="pl-5 sm:pl-8" itemClassName="w-[78vw] sm:w-[60vw] lg:w-[36vw] xl:w-[30vw]">
            {classes.map((cls) => (
              <ClassCard key={cls.id} cls={cls} c={c} t={t} lang={lang} levelKey={levelKey} />
            ))}
          </DragSlider>
        ) : null}
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
        <Reveal>
          <ClayButton href="#schedule" variant="outline">
            {t("cta.viewSchedule")}
          </ClayButton>
        </Reveal>
      </div>
    </section>
  );
}

function ClassCard({
  cls,
  c: _c,
  t,
  lang,
}: {
  cls: ClassType;
  c: (k: string, fb?: string) => string;
  t: (k: string) => string;
  lang: "es" | "en";
  levelKey: (lvl: string) => string;
}) {
  const name = lang === "en" ? cls.nameEn : cls.nameEs;
  const desc = lang === "en" ? cls.descriptionEn : cls.descriptionEs;
  const levelLabel = t(`label.level.${cls.level}`) || cls.level;

  return (
    <article className="group relative h-full overflow-hidden rounded-sm bg-card">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={cls.imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-quart group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-cream/90 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-espresso backdrop-blur">
            {levelLabel}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 text-cream sm:p-6">
          <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-cream/70">
            {cls.durationMin} min
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl">{name}</h3>
          <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-cream/80 opacity-0 transition-all duration-700 group-hover:max-h-40 group-hover:opacity-100">
            {desc}
          </p>
        </div>
      </div>
    </article>
  );
}
