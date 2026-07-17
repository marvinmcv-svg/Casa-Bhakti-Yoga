"use client";

import { useLanguage } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-xs uppercase tracking-[0.2em]">
        <button
          onClick={() => setLang("es")}
          className={`transition-colors ${
            lang === "es" ? "text-clay" : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={lang === "es"}
        >
          ES
        </button>
        <span className="text-muted-foreground/40">/</span>
        <button
          onClick={() => setLang("en")}
          className={`transition-colors ${
            lang === "en" ? "text-clay" : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={lang === "en"}
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex items-center rounded-full border border-border bg-cream/60 p-1 backdrop-blur-sm">
      <AnimatePresence initial={false}>
        {lang === "es" && (
          <motion.div
            layoutId="lang-pill"
            className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-clay"
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            style={{ width: "calc(50% - 0.25rem)" }}
          />
        )}
        {lang === "en" && (
          <motion.div
            layoutId="lang-pill"
            className="absolute inset-y-1 right-1 rounded-full bg-clay"
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            style={{ width: "calc(50% - 0.25rem)" }}
          />
        )}
      </AnimatePresence>
      <button
        onClick={() => setLang("es")}
        className={`relative z-10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
          lang === "es" ? "text-cream" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={lang === "es"}
      >
        ES
      </button>
      <button
        onClick={() => setLang("en")}
        className={`relative z-10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
          lang === "en" ? "text-cream" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
