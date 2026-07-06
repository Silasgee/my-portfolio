"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Variant = "royal" | "gold" | "ghost-dark" | "ghost-light";

const variants: Record<Variant, string> = {
  royal:
    "bg-royal text-white hover:bg-blue-500 shadow-[0_8px_30px_-8px_rgba(37,99,235,0.55)]",
  gold: "bg-gold text-ink hover:bg-amber-400 shadow-[0_8px_30px_-8px_rgba(245,158,11,0.55)]",
  "ghost-dark":
    "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  "ghost-light":
    "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/5",
};

/**
 * A button/link that gently leans toward the cursor.
 * Falls back to a plain hover state for touch and reduced-motion users.
 */
export default function MagneticButton({
  href,
  children,
  variant = "royal",
  className = "",
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.6 });

  function handleMove(e: MouseEvent) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {href ? (
        <a href={href} onClick={onClick} className={classes}>
          {children}
        </a>
      ) : (
        <button type={type ?? "button"} onClick={onClick} className={classes}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
