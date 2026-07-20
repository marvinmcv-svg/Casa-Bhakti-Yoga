"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

const easeOutQuart = [0.215, 0.61, 0.355, 1] as const;

interface StaggerProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  once?: boolean;
}

// Staggered reveal for groups of elements (lines, cards, etc.)
export function Stagger({
  children,
  className = "",
  itemClassName = "",
  delay = 0,
  stagger = 0.08,
  y = 24,
  once = true,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.2 });

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOutQuart },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children.map((child, i) => (
        <motion.div key={i} className={itemClassName} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
