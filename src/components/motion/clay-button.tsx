"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";

const easeOutQuart = [0.215, 0.61, 0.355, 1] as const;

interface ClayButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "clay" | "cream" | "outline";
  className?: string;
  type?: "button" | "submit";
  target?: string;
  glow?: boolean;
}

// Premium CTA: gradient fill, sheen sweep on hover, subtle lift + glow.
export function ClayButton({
  children,
  href,
  onClick,
  variant = "clay",
  className = "",
  type = "button",
  target,
  glow = false,
}: ClayButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-xs font-medium uppercase tracking-[0.25em] transition-all duration-500 ease-out-quart";

  const variants = {
    clay:
      "bg-gradient-to-br from-[oklch(0.58_0.12_45)] to-[oklch(0.48_0.10_40)] text-cream shadow-lg shadow-clay/25",
    cream:
      "bg-gradient-to-br from-cream to-[oklch(0.94_0.015_75)] text-espresso shadow-lg shadow-espresso/10",
    outline:
      "border border-clay/50 bg-clay/5 text-clay backdrop-blur-sm",
  };

  // Magnetic hover: translate slightly toward cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    el.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
  };
  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  const inner = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
    </span>
  );

  // Sheen sweep
  const sheen = (
    <span
      aria-hidden
      className="absolute inset-0 z-[2] -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out-quart group-hover:translate-x-full"
    />
  );

  const glowRing = glow ? (
    <span
      aria-hidden
      className="absolute inset-0 -z-10 rounded-full bg-clay/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
    />
  ) : null;

  const cls = `${base} ${variants[variant]} hover:-translate-y-0.5 ${className}`;

  const motionProps = {
    ref: ref as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        className={cls}
        {...motionProps}
      >
        {sheen}
        {glowRing}
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} {...motionProps}>
      {sheen}
      {glowRing}
      {inner}
    </button>
  );
}
