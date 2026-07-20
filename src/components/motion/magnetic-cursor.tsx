"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Premium custom cursor: a small clay dot that follows the mouse with spring physics,
// and grows when hovering interactive elements. Desktop only (hidden on touch).
export function MagneticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  const springConfig = { damping: 28, stiffness: 450, mass: 0.4 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    if (!visible) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el) return;
      const interactive = el.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
      );
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHover);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
      style={{ x: cursorX, y: cursorY }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-cream"
        animate={{
          width: hovering ? 48 : 14,
          height: hovering ? 48 : 14,
          opacity: 1,
        }}
        transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ x: "-50%", y: "-50%" }}
      />
    </motion.div>
  );
}
