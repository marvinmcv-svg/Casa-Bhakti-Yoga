"use client";

import dynamic from "next/dynamic";

// Load ScrollProgress ONLY on the client — never SSR.
// Prevents hydration mismatch from Framer Motion's useScroll/useSpring.
const ScrollProgressClient = dynamic(
  () => import("./scroll-progress-client").then((m) => m.ScrollProgressClient),
  { ssr: false, loading: () => null }
);

export function ScrollProgress() {
  return <ScrollProgressClient />;
}
