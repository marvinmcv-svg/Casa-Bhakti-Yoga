"use client";

import Link from "next/link";
import { Flower2 } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-espresso px-5 text-center text-cream">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay/10 blur-[120px]" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-clay/30 text-clay"
        >
          <Flower2 size={28} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif text-7xl font-light leading-none text-cream sm:text-9xl"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-6 max-w-md text-base leading-relaxed text-cream/70"
        >
          Esta página se perdió en el silencio.
          <br />
          <span className="text-cream/50">
            This page wandered into the silence.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-clay px-8 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-cream transition-all hover:bg-clay/90"
          >
            Volver al inicio →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
