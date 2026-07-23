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
      <article className="overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-500 group-hover:shadow-xl">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={teacher.imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-quart group-hover:scale-108"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
          {/* Name + role overlaid on image */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-cream">
            <h3 className="font-serif text-2xl">{name}</h3>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-gold">{role}</p>
          </div>
          {/* Bio reveals on hover */}
          <div className="absolute inset-0 flex items-end bg-espresso/80 p-5 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
            <p className="text-sm leading-relaxed text-cream/90">{bio}</p>
          </div>
        </div>
        {specialties && (
          <div className="p-4 text-center">
            <p className="text-xs italic text-muted-foreground">{specialties}</p>
          </div>
        )}
      </article>
    </Reveal>
  );
}
