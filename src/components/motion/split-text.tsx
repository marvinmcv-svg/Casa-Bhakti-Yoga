"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ElementType } from "react";

interface SplitTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  split?: "char" | "word";
  once?: boolean;
}

const easeOutQuart = [0.215, 0.61, 0.355, 1] as const;

// Pre-created motion components (avoid creating during render)
const MOTION_TAGS: Record<string, ElementType> = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
  blockquote: motion.blockquote,
  div: motion.div,
};

export function SplitText({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.04,
  duration = 1.2,
  split = "char",
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.3 });

  const tokens = split === "char" ? Array.from(text) : text.split(" ");
  const tagKey = (typeof as === "string" ? as : "div") as string;
  const MotionTag: ElementType = MOTION_TAGS[tagKey] ?? motion.div;

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: "0.6em",
      rotateX: 90,
      transformOrigin: "bottom",
    },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration, ease: easeOutQuart },
    },
  };

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={{ perspective: 800 }}
    >
      {tokens.map((tok, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
          }}
        >
          <motion.span variants={child} style={{ display: "inline-block" }}>
            {tok === " " ? "\u00A0" : tok}
            {split === "word" && i < tokens.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
