"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Premium custom cursor — uses mounted pattern to avoid hydration mismatch.
// Server renders null, client renders null until mounted, then checks hover support.
export function MagneticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.4 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsHover || reducedMotion) return;

    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el) return;
      const interactive = el.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]');
      setHovering(!!interactive);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHover);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", checkHover); };
  }, [x, y]);

  if (!mounted) return null;
  if (typeof window !== "undefined" && (!window.matchMedia("(hover: hover)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return null;

  return (
    <motion.div className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference" style={{ x: cursorX, y: cursorY }}>
      <motion.div className="flex items-center justify-center rounded-full bg-cream" animate={{ width: hovering ? 48 : 14, height: hovering ? 48 : 14, opacity: 1 }} transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }} style={{ x: "-50%", y: "-50%" }} />
    </motion.div>
  );
}
