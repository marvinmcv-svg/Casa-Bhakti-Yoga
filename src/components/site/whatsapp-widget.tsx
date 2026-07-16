"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const WHATSAPP_URL = "https://wa.me/59167394998";

export function WhatsAppWidget() {
  const { lang } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem("cb-wa-tooltip-dismissed") === "1";
    } catch {
      return false;
    }
  });

  // Show tooltip after 4 seconds (if not dismissed)
  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setShowTooltip(true), 4000);
    return () => clearTimeout(t);
  }, [dismissed]);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      lang === "es"
        ? "Hola Casa Bhakti 🙏 Me gustaría reservar una clase. ¿Me pueden ayudar?"
        : "Hi Casa Bhakti 🙏 I'd like to book a class. Can you help me?"
    );
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank");
    setShowTooltip(false);
    try {
      localStorage.setItem("cb-wa-tooltip-dismissed", "1");
    } catch {}
  };

  const dismissTooltip = () => {
    setShowTooltip(false);
    setDismissed(true);
    try {
      localStorage.setItem("cb-wa-tooltip-dismissed", "1");
    } catch {}
  };

  return (
    <div className="fixed bottom-6 left-6 z-[54] sm:bottom-8 sm:left-8">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="absolute bottom-full left-0 mb-3 w-60 rounded-2xl rounded-bl-sm bg-espresso p-4 text-cream shadow-2xl"
          >
            <button
              onClick={dismissTooltip}
              className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-cream/50 transition-colors hover:bg-cream/10 hover:text-cream"
              aria-label="Dismiss"
            >
              ✕
            </button>
            <div className="mb-1 flex items-center gap-2">
              <span className="flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-sage opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-cream/60">
                {lang === "es" ? "Reservas abiertas" : "Bookings open"}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-cream/90">
              {lang === "es"
                ? "¿List@ para practicar? Escríbenos y reserva tu clase en segundos. 🌿"
                : "Ready to practice? Message us and book your class in seconds. 🌿"}
            </p>
            <div className="absolute -bottom-1.5 left-4 h-3 w-3 rotate-45 bg-espresso" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.5 }}
        onClick={openWhatsApp}
        onMouseEnter={() => setShowTooltip(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/30 transition-all hover:scale-105 hover:bg-[#1da851]"
        aria-label={lang === "es" ? "Reservar por WhatsApp" : "Book on WhatsApp"}
      >
        {/* Pulsing ring */}
        {!dismissed && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        )}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="relative">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        {/* Hover label */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-espresso px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-cream opacity-0 transition-opacity group-hover:opacity-100">
          {lang === "es" ? "Reserva tu clase" : "Book a class"}
        </span>
      </motion.button>
    </div>
  );
}
