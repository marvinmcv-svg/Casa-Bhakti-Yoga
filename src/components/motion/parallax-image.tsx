"use client";

import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  speed?: number; // 0 = none, 0.3 = strong
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  speed = 0.12,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Reduced scale range (1.08 vs 1.12) — subtler but smoother, less repaint area
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        // will-change promotes to a GPU layer so y/scale don't trigger layout/paint
        style={{ y, scale, willChange: "transform" }}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

export { type MotionValue };
