"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * A brief curtain: the sparkle mark blooms, then the navy panel lifts
 * away like a sheet being pulled off furniture. Kept under a second.
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-navy"
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }
          }
          aria-hidden="true"
        >
          <motion.svg
            className="h-14 w-14"
            viewBox="0 0 24 24"
            fill="none"
            initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <path
              d="M12 1.5c.9 5.6 4.9 9.6 10.5 10.5C16.9 12.9 12.9 16.9 12 22.5 11.1 16.9 7.1 12.9 1.5 12 7.1 11.1 11.1 7.1 12 1.5z"
              fill="#F59E0B"
            />
          </motion.svg>
          <motion.p
            className="text-[0.6rem] font-bold uppercase tracking-[0.42em] text-white/60"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            O&amp;F Pristine Solution
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
