"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Client-only scroll progress bar. Loaded via next/dynamic with ssr: false.
export function ScrollProgressClient() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-clay via-gold to-sage"
      style={{ scaleX }}
    />
  );
}
