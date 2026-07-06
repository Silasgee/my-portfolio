"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/** Animates a number from 0 when it scrolls into view. */
export default function CountUp({
  value,
  suffix = "",
  decimals = 0,
  className = "",
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 45,
    damping: 22,
    mass: 1,
  });

  // Server HTML carries the final value (SEO / no-JS); on the client we
  // rewind to zero before the spring counts up.
  useEffect(() => {
    if (!reduceMotion && !inView && ref.current) {
      ref.current.textContent = `0${suffix}`;
    }
  }, [reduceMotion, inView, suffix]);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    if (reduceMotion) return;
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          latest.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) + suffix;
      }
    });
  }, [spring, suffix, decimals, reduceMotion]);

  const finalText =
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix;

  return (
    <span ref={ref} className={className}>
      {finalText}
    </span>
  );
}
