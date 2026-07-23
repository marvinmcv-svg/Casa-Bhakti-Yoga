"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

const easeOutQuart = [0.215, 0.61, 0.355, 1] as const;

interface ClayButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "clay" | "cream" | "outline";
  className?: string;
  type?: "button" | "submit";
  target?: string;
}

// 3-layer CTA button (hobokenyogi style): main span + ::before + ::after slide in
export function ClayButton({
  children,
  href,
  onClick,
  variant = "clay",
  className = "",
  type = "button",
  target,
}: ClayButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-500 ease-out-quart";
  const variants = {
    clay: "bg-clay text-cream",
    cream: "bg-cream text-espresso",
    outline: "border border-clay text-clay",
  };
  const hoverLayers = {
    clay: "bg-[oklch(0.5_0.11_45)]",
    cream: "bg-[oklch(0.93_0.02_75)]",
    outline: "bg-clay",
  };
  const hoverText =
    variant === "outline" ? "group-hover:text-cream" : "";

  const inner = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
    </span>
  );

  const layers = (
    <>
      <motion.span
        aria-hidden
        className={`absolute inset-0 z-0 ${hoverLayers[variant]} translate-y-full`}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.5, ease: easeOutQuart }}
      />
      <motion.span
        aria-hidden
        className={`absolute inset-0 z-[1] ${hoverLayers[variant]} translate-y-full`}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.5, ease: easeOutQuart, delay: 0.06 }}
      />
    </>
  );

  const cls = `${base} ${variants[variant]} ${hoverText} ${className}`;

  if (href) {
    return (
      <Link href={href} target={target} className={cls}>
        {layers}
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {layers}
      {inner}
    </button>
  );
}
