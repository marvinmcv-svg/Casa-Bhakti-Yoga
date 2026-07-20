"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Flower2 } from "lucide-react";

// Premium preloader: orchestrates a refined entrance.
// Shows a lotus mark with a draw-in ring, then curtain-lifts away.
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
          {/* Curtain lift (two panels) */}
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
              className="relative flex h-20 w-20 items-center justify-center"
            >
              {/* Drawing ring */}
              <svg
                className="absolute inset-0"
                viewBox="0 0 80 80"
                fill="none"
              >
                <motion.circle
                  cx="40"
                  cy="40"
                  r="38"
                  stroke="var(--clay)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: [0.215, 0.61, 0.355, 1] }}
                  style={{ rotate: -90, transformOrigin: "center" }}
                />
              </svg>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Flower2
                  size={28}
                  className="text-clay"
                  strokeWidth={1}
                />
              </motion.div>
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
