"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";
import { ClayButton } from "@/components/motion/clay-button";

const NAV = [
  { key: "nav.about", href: "#about" },
  { key: "nav.classes", href: "#classes" },
  { key: "nav.schedule", href: "#schedule" },
  { key: "nav.teachers", href: "#teachers" },
  { key: "nav.events", href: "#events" },
  { key: "nav.gallery", href: "#gallery" },
  { key: "nav.contact", href: "#contact" },
];

export function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-quart ${
          scrolled
            ? "bg-cream/85 backdrop-blur-md border-b border-border/60 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="#top"
            className={`font-serif text-xl tracking-wide transition-colors sm:text-2xl ${
              scrolled ? "text-espresso" : "text-cream"
            }`}
          >
            Casa Bhakti
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`group relative text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  scrolled
                    ? "text-espresso/80 hover:text-clay"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-clay transition-transform duration-500 ease-out-quart group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className={scrolled ? "" : "[&_button]:text-cream/80 [&_button:hover]:text-cream"}>
              <LanguageToggle compact />
            </div>
            <div className="hidden sm:block">
              <ClayButton
                href="#contact"
                variant="clay"
                className="!px-6 !py-2.5 !text-[10px]"
              >
                {t("cta.book")}
              </ClayButton>
            </div>
            <button
              onClick={() => setOpen(true)}
              className={`lg:hidden ${scrolled ? "text-espresso" : "text-cream"}`}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%", rotate: 0 }}
            animate={{ x: 0, rotate: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-espresso p-6 text-cream"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl">Casa Bhakti</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={26} />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-6">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-4xl text-cream/90 transition-colors hover:text-clay"
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex items-center justify-between">
              <LanguageToggle compact />
              <ClayButton href="#contact" variant="clay" onClick={() => setOpen(false)}>
                {t("cta.book")}
              </ClayButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
