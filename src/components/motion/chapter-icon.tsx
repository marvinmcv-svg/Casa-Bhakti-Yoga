"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Hobokenyogi "chapter-icon": 5 wave-circles that fan out into a diagonal arc on scroll.
export function ChapterIcon({ id, label }: { id: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const rotations = [135, 150, 165, 180, 195];

  return (
    <div ref={ref} className="flex items-center gap-5">
      <div className="relative flex items-center" style={{ width: 120, height: 32 }}>
        {rotations.map((r, i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{
              left: 0,
              top: "50%",
              marginTop: -12,
            }}
            initial={{ rotate: 180, opacity: 0, scale: 0.4, x: 0 }}
            animate={
              inView
                ? {
                    rotate: r,
                    opacity: 0.28,
                    scale: 1,
                    x: i * 14,
                  }
                : { rotate: 180, opacity: 0, scale: 0.4, x: 0 }
            }
            transition={{
              duration: 1.2,
              delay: 0.1 * i,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            <WaveCircle />
          </motion.span>
        ))}
      </div>
      <motion.span
        className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {label}
      </motion.span>
    </div>
  );
}

function WaveCircle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1"
        className="text-clay"
      />
      <path
        d="M4 12 Q 8 6, 12 12 T 20 12"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-clay"
      />
    </svg>
  );
}
