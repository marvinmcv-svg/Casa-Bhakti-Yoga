"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ClipRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
  priority?: boolean;
}

// Premium image reveal: the container clips open (curtain effect)
// while the image scales down from 1.3 → 1, creating depth.
export function ClipReveal({
  src,
  alt,
  className = "",
  imgClassName = "",
  direction = "left",
  delay = 0,
  priority = false,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const clipPaths = {
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
    top: "inset(0 0 100% 0)",
    bottom: "inset(100% 0 0 0)",
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: clipPaths[direction] }}
        animate={inView ? { clipPath: "inset(0 0 0 0)" } : {}}
        transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1], delay }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`h-full w-full object-cover ${imgClassName}`}
          initial={{ scale: 1.3 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.215, 0.61, 0.355, 1], delay }}
          style={{ willChange: "transform" }}
        />
      </motion.div>
    </div>
  );
}
