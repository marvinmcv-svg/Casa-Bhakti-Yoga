"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Premium preloader: orchestrates a refined entrance.
// Shows the real Casa Bhakti logo with a draw-in ring, then curtain-lifts away.
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const t = setTimeout(
      () => setDone(true),
      prefersReduced ? 300 : 1800
    );
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {/* Curtain lift */}
          <motion.div
            className="absolute inset-0 bg-espresso"
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.85, 0, 0.15, 1], delay: 0.1 }}
          />

          {/* Center mark */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="relative flex h-24 w-24 items-center justify-center"
            >
              {/* Drawing ring around the logo */}
              <svg
                className="absolute inset-0"
                viewBox="0 0 96 96"
                fill="none"
              >
                <motion.circle
                  cx="48"
                  cy="48"
                  r="46"
                  stroke="var(--clay)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: [0.215, 0.61, 0.355, 1] }}
                  style={{ rotate: -90, transformOrigin: "center" }}
                />
              </svg>
              {/* Real Casa Bhakti logo */}
              <motion.img
                src="/media/casa-bhakti-logo.jpg"
                alt="Casa Bhakti"
                className="h-16 w-16 rounded-full object-cover ring-1 ring-clay/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 font-serif text-2xl tracking-wide text-cream"
            >
              Casa Bhakti
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-1 text-[9px] uppercase tracking-[0.4em] text-cream/40"
            >
              Yoga · Vedanta · Bolivia
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
