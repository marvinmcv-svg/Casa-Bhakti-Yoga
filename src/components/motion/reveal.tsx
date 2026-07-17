"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";

const easeOutQuart = [0.215, 0.61, 0.355, 1] as const;

const MOTION_TAGS: Record<string, ElementType> = {
  div: motion.div,
  span: motion.span,
  article: motion.article,
  section: motion.section,
  li: motion.li,
  a: motion.a,
  button: motion.button,
  p: motion.p,
};

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  rotate?: number;
  rotateY?: number;
  scale?: number;
  blur?: boolean;
  once?: boolean;
  amount?: number;
}

export function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  duration = 0.8,
  y = 36,
  x = 0,
  rotate = 0,
  rotateY = 0,
  scale = 1,
  blur = false,
  once = true,
  amount = 0.2,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  const tagKey = (typeof as === "string" ? as : "div") as string;
  const MotionTag: ElementType = MOTION_TAGS[tagKey] ?? motion.div;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      x,
      rotate,
      rotateY,
      scale,
      filter: blur ? "blur(12px)" : "blur(0px)",
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      rotateY: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration, ease: easeOutQuart, delay },
    },
  };

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={{ perspective: 1000, willChange: "transform, opacity" }}
    >
      {children}
    </MotionTag>
  );
}
