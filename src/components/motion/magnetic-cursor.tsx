"use client";

import dynamic from "next/dynamic";

// Load MagneticCursor ONLY on the client — never SSR.
// This is the only bulletproof way to prevent the hydration mismatch
// caused by Framer Motion's useMotionValue/useSpring hooks, which
// produce different values on server vs client.
const MagneticCursorClient = dynamic(
  () => import("./magnetic-cursor-client").then((m) => m.MagneticCursorClient),
  { ssr: false, loading: () => null }
);

export function MagneticCursor() {
  return <MagneticCursorClient />;
}
