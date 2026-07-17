"use client";

import { useState } from "react";
import { useContent } from "@/hooks/use-content";
import { useLanguage } from "@/lib/i18n";
import { ChapterIcon } from "@/components/motion/chapter-icon";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { ClayButton } from "@/components/motion/clay-button";
import { Phone, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const { c } = useContent();
  const { t, lang } = useLanguage();
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const message = String(data.get("message") ?? "");
    // Open WhatsApp with prefilled message
    const text = encodeURIComponent(
      `${lang === "en" ? "Hello Casa Bhakti" : "Hola Casa Bhakti"} — ${name}. ${message}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/59167394998?text=${text}`, "_blank");
      setSending(false);
      form.reset();
      toast.success(lang === "en" ? "Opening WhatsApp…" : "Abriendo WhatsApp…");
    }, 500);
  };

  return (
    <section id="contact" className="bg-secondary/40 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterIcon id="contact" label={c("contact.eyebrow", "008 — Visit")} />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SplitText
              as="h2"
              text={c("contact.title", "Come practice with us")}
              split="word"
              className="font-serif text-4xl font-light leading-[1.05] text-espresso sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.3} className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {c("contact.body")}
            </Reveal>

            <div className="mt-10 space-y-5">
              <ContactRow
                icon={<MapPin size={18} />}
                label={t("contact.address")}
                value={c("contact.address", "Santa Cruz de la Sierra, Bolivia")}
              />
              <ContactRow
                icon={<Phone size={18} />}
                label={c("contact.phone1", "+591 67394998")}
                value={c("contact.phone2", "+591 67409052")}
                href="https://wa.me/59167394998"
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={c("contact.instagramUrl", "https://www.instagram.com/casabhakti.scz/")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full border border-border bg-cream px-5 py-3 transition-colors hover:border-clay"
              >
                <Instagram size={16} className="text-clay" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-espresso">
                  {c("contact.instagram", "@casabhakti.scz")}
                </span>
              </a>
              <a
                href={c("contact.facebookUrl", "https://www.facebook.com/casabhaktiscz")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full border border-border bg-cream px-5 py-3 transition-colors hover:border-clay"
              >
                <Facebook size={16} className="text-clay" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-espresso">Facebook</span>
              </a>
              <a
                href="https://wa.me/59167394998"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full border border-border bg-cream px-5 py-3 transition-colors hover:border-clay"
              >
                <MessageCircle size={16} className="text-clay" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-espresso">WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.2} y={40}>
              <form
                onSubmit={onSubmit}
                className="rounded-sm border border-border bg-cream p-6 sm:p-8"
              >
                <h3 className="font-serif text-2xl text-espresso">
                  {lang === "en" ? "Send a message" : "Envía un mensaje"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {lang === "en"
                    ? "We'll open WhatsApp with your message ready to send."
                    : "Abriremos WhatsApp con tu mensaje listo para enviar."}
                </p>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {t("contact.name")}
                    </label>
                    <input
                      name="name"
                      required
                      className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-clay"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {t("contact.email")}
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-clay"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {t("contact.message")}
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-clay"
                    />
                  </div>
                  <ClayButton type="submit" variant="clay" className="w-full sm:w-auto">
                    {sending
                      ? "…"
                      : lang === "en"
                      ? "Send via WhatsApp"
                      : "Enviar por WhatsApp"}
                  </ClayButton>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 text-clay">{icon}</div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        {value && value !== label && (
          <div className="mt-0.5 text-sm text-espresso">{value}</div>
        )}
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-70">
        {content}
      </a>
    );
  }
  return content;
}
