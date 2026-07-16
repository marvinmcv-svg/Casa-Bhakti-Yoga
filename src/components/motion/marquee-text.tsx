"use client";

interface MarqueeTextProps {
  text: string;
  className?: string;
  repeat?: number;
}

// Horizontal scrolling-text drift (hobokenyogi "join/book" style)
export function MarqueeText({
  text,
  className = "",
  repeat = 6,
}: MarqueeTextProps) {
  const items = Array.from({ length: repeat }, (_, i) => i);
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee">
        {items.concat(items).map((_, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-6">{text}</span>
            <span className="text-clay">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
