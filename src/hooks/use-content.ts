"use client";

import { useLanguage } from "@/lib/i18n";
import { useSiteData } from "@/hooks/use-site-data";

// Returns a function c(key) that resolves the localized string from DB content.
export function useContent() {
  const { data } = useSiteData();
  const { lang } = useLanguage();

  function c(key: string, fallback = ""): string {
    const entry = data?.content?.[key];
    if (!entry) return fallback;
    return lang === "en" ? entry.en || entry.es || fallback : entry.es || entry.en || fallback;
  }

  return { c, data, lang };
}
