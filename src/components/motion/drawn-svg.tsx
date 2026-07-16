"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface DrawnSvgProps {
  path: string;
  width?: number;
  height?: number;
  className?: string;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
}

// SVG path that "draws itself" on scroll into view (hobokenyogi drawSVG style)
export function DrawnSvg({
  path,
  width = 200,
  height = 200,
  className = "",
  duration = 2.5,
  delay = 0,
  strokeWidth = 1.5,
}: DrawnSvgProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
    >
      <motion.path
        d={path}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          inView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration, delay, ease: [0.215, 0.61, 0.355, 1] }}
      />
    </svg>
  );
}
