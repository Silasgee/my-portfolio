"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * A brief curtain: the apex mark draws in, then the panel lifts away.
 * Kept under a second so it feels like intent, not a wait.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduceMotion ? 80 : 1150);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }
          }
          aria-hidden="true"
        >
          <motion.svg
            className="h-16 w-16"
            viewBox="0 0 32 32"
            fill="none"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.path
              d="M16 4L29 28H3L16 4z"
              stroke="#F59E0B"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M16 4l6.5 12H9.5L16 4z"
              fill="#F59E0B"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
