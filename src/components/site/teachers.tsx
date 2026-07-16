"use client";

import { useContent } from "@/hooks/use-content";
import { useLanguage } from "@/lib/i18n";
import { ChapterIcon } from "@/components/motion/chapter-icon";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import type { Teacher as TeacherType } from "@/hooks/use-site-data";

export function Teachers() {
  const { c, data } = useContent();
  const { lang } = useLanguage();
  const teachers: TeacherType[] = data?.teachers ?? [];

  return (
    <section id="teachers" className="bg-cream py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterIcon id="teachers" label={c("teachers.eyebrow", "005 — Teachers")} />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitText
              as="h2"
              text={c("teachers.title", "Guides on the path")}
              split="word"
              className="font-serif text-4xl font-light leading-[1.05] text-espresso sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {c("teachers.body")}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher, i) => (
            <TeacherCard key={teacher.id} teacher={teacher} lang={lang} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeacherCard({
  teacher,
  lang,
  delay,
}: {
  teacher: TeacherType;
  lang: "es" | "en";
  delay: number;
}) {
  const name = lang === "en" ? teacher.nameEn : teacher.nameEs;
  const role = lang === "en" ? teacher.roleEn : teacher.roleEs;
  const bio = lang === "en" ? teacher.bioEn : teacher.bioEs;
  const specialties = lang === "en" ? teacher.specialtiesEn : teacher.specialtiesEs;

  return (
    <Reveal delay={delay} y={40} className="group">
      <article className="overflow-hidden rounded-sm bg-card">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={teacher.imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-quart group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute bottom-4 left-4 right-4 translate-y-4 text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm leading-relaxed text-cream/90">{bio}</p>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-serif text-2xl text-espresso">{name}</h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-clay">{role}</p>
          {specialties && (
            <p className="mt-3 text-xs text-muted-foreground">{specialties}</p>
          )}
        </div>
      </article>
    </Reveal>
  );
}
