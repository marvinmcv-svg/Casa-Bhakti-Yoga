"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

interface DragSliderProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  gap?: number;
}

// Drag carousel with velocity-based skew (hobokenyogi "drag slider" style)
export function DragSlider({
  children,
  className = "",
  itemClassName = "",
  gap = 24,
}: DragSliderProps) {
  const x = useMotionValue(0);
  const skew = useTransform(x, [-200, 0, 200], [-5, 0, 5]);
  const [grabbing, setGrabbing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: -9999, right: 0 }}
        dragElastic={0.08}
        dragMomentum={false}
        style={{ x, skew, willChange: "transform" }}
        onDragStart={() => setGrabbing(true)}
        onDragEnd={() => setGrabbing(false)}
        className={`flex cursor-grab active:cursor-grabbing ${grabbing ? "is-grabbing" : ""}`}
      >
        {children.map((child, i) => (
          <div
            key={i}
            style={{ marginRight: gap }}
            className={`shrink-0 ${itemClassName} ${
              grabbing ? "[transform:rotateZ(2deg)]" : ""
            }`}
          >
            {child}
          </div>
        ))}
      </motion.div>
      {/* Drag hint */}
      <div className="pointer-events-none mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <DragIcon /> <span>drag</span>
      </div>
    </div>
  );
}

function DragIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 6 L4 12 L8 18 M16 6 L20 12 L16 18"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { type MotionValue };
