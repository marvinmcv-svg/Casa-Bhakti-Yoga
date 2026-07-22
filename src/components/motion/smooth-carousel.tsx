"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SmoothCarouselProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  gap?: number;
  autoAdvance?: boolean;
  intervalMs?: number;
}

// Smooth scroll-snap carousel with arrow nav + gentle auto-advance.
// Replaces the drag slider with a calmer, more elegant motion.
export function SmoothCarousel({
  children,
  className = "",
  itemClassName = "",
  gap = 24,
  autoAdvance = true,
  intervalMs = 6000,
}: SmoothCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [paused, setPaused] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => updateArrows());
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [updateArrows]);

  // Gentle auto-advance
  useEffect(() => {
    if (!autoAdvance || paused) return;
    const iv = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      // If at end, wrap to start; else advance by ~one item
      const atEnd = el.scrollLeft >= maxScroll - 8;
      const target = atEnd ? 0 : el.scrollLeft + el.clientWidth * 0.8;
      smoothScrollTo(el, target);
    }, intervalMs);
    return () => clearInterval(iv);
  }, [autoAdvance, paused, intervalMs]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = el.scrollLeft + dir * el.clientWidth * 0.8;
    smoothScrollTo(el, Math.max(0, target));
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Track */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-elegant scroll-smooth"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            style={{
              marginRight: gap,
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
            className={`shrink-0 snap-start ${itemClassName}`}
          >
            {child}
          </div>
        ))}
        {/* Trailing spacer so last item can snap-start */}
        <div style={{ flexShrink: 0, width: 1 }} aria-hidden />
      </div>

      {/* Arrow nav — desktop only */}
      <button
        onClick={() => scrollBy(-1)}
        disabled={!canPrev}
        aria-label="Previous"
        className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-espresso shadow-lg backdrop-blur transition-all hover:bg-cream disabled:pointer-events-none disabled:opacity-0 lg:flex"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        aria-label="Next"
        className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-espresso shadow-lg backdrop-blur transition-all hover:bg-cream disabled:pointer-events-none disabled:opacity-0 lg:flex"
      >
        <ChevronRight size={22} />
      </button>

      {/* Hint */}
      <div className="pointer-events-none mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <SwipeIcon /> <span>swipe</span>
      </div>
    </div>
  );
}

// Smooth scroll with custom easing (calmer than native scroll-smooth)
function smoothScrollTo(el: HTMLElement, target: number) {
  const start = el.scrollLeft;
  const distance = target - start;
  if (Math.abs(distance) < 1) return;
  const duration = 700;
  const startTime = performance.now();
  const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

  function step(now: number) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    el.scrollLeft = start + distance * ease(t);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function SwipeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 11V6.5a1.5 1.5 0 0 1 3 0V11M12 11V4.5a1.5 1.5 0 0 1 3 0V11M15 11V6.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1-6 6h-2a6 6 0 0 1-5.6-3.8l-2.1-5.3a1.5 1.5 0 0 1 2.6-1.5L8 13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
