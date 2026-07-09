"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * A patch of warm sunlight that trails the cursor across the page.
 * Desktop pointer devices only; disabled for touch and reduced motion.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.8 });

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.09]"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle at center, #F59E0B 0%, transparent 62%)",
      }}
    />
  );
}
