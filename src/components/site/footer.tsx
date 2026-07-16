"use client";

import Link from "next/link";
import { useState } from "react";
import { useContent } from "@/hooks/use-content";
import { useLanguage } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";
import { Instagram, Facebook, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

const FOOTER_NAV = [
  { key: "nav.about", href: "#about" },
  { key: "nav.classes", href: "#classes" },
  { key: "nav.schedule", href: "#schedule" },
  { key: "nav.teachers", href: "#teachers" },
  { key: "nav.events", href: "#events" },
  { key: "nav.gallery", href: "#gallery" },
  { key: "nav.contact", href: "#contact" },
];

export function Footer() {
  const { c } = useContent();
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success(
      lang === "en" ? "Thank you for subscribing ✦" : "Gracias por suscribirte ✦"
    );
    setEmail("");
  };

  return (
    <footer className="mt-auto bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl">Casa Bhakti</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">
              {c("footer.tagline", "Templo de Yoga & Vedanta · Santa Cruz, Bolivia")}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={c("contact.instagramUrl", "https://www.instagram.com/casabhakti.scz/")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-clay hover:bg-clay"
              >
                <Instagram size={16} />
              </a>
              <a
                href={c("contact.facebookUrl", "https://www.facebook.com/casabhaktiscz")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-clay hover:bg-clay"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-cream/40">
              {lang === "en" ? "Explore" : "Explora"}
            </h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {t(item.key)}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-cream/40">
              {c("footer.newsletterTitle", "Join our circle")}
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-cream/60">
              {t("contact.newsletterDesc")}
            </p>
            <form onSubmit={subscribe} className="mt-5 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("contact.email")}
                className="flex-1 rounded-full border border-cream/20 bg-cream/5 px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-clay"
              />
              <button
                type="submit"
                className="rounded-full bg-clay px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-clay/80"
              >
                {t("cta.subscribe")}
              </button>
            </form>
            <div className="mt-6">
              <LanguageToggle />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-[10px] uppercase tracking-[0.2em] text-cream/40 sm:flex-row sm:items-center">
          <div>
            © {new Date().getFullYear()} Casa Bhakti. {t("footer.rights")}
          </div>
          <div className="flex items-center gap-4">
            <span>{c("footer.address", "Santa Cruz de la Sierra, Bolivia")}</span>
            <Link
              href="/?admin=1"
              className="transition-colors hover:text-clay"
              aria-label={t("footer.admin")}
            >
              {t("footer.admin")} →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
