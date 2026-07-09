"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Logo from "@/components/site/Logo";
import MagneticButton from "@/components/ui/MagneticButton";
import { nav, site } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Close the menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-navy/[0.07] bg-cream/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto grid h-[4.75rem] max-w-7xl grid-cols-[1fr_auto] items-center px-6 md:px-10 lg:grid-cols-[1fr_auto_1fr]"
        >
          <a
            href="#top"
            aria-label="O&F Pristine Solution — home"
            onClick={() => setOpen(false)}
            className="justify-self-start"
          >
            <Logo dark={open} />
          </a>

          {/* Desktop links, centered */}
          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative text-sm font-medium text-navy/70 transition-colors hover:text-navy"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden justify-self-end lg:block">
            <MagneticButton href="#contact" variant="navy" className="!px-6 !py-2.5">
              Book Cleaning
            </MagneticButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] justify-self-end rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-[2px] w-6 rounded transition-all duration-300 ${
                open ? "translate-y-[7px] rotate-45 bg-white" : "bg-navy"
              }`}
            />
            <span
              className={`h-[2px] w-6 rounded transition-opacity duration-300 ${
                open ? "opacity-0" : "bg-navy"
              }`}
            />
            <span
              className={`h-[2px] w-6 rounded transition-all duration-300 ${
                open ? "-translate-y-[7px] -rotate-45 bg-white" : "bg-navy"
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="on-dark grain fixed inset-0 -z-10 flex flex-col justify-between overflow-y-auto bg-navy px-6 pb-10 pt-28 lg:hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-[2rem] font-medium text-white"
                  >
                    <span className="text-xs font-sans font-semibold tracking-[0.2em] text-gold/70">
                      0{i + 1}
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mt-10 space-y-4"
            >
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-gold py-4 text-base font-semibold text-navy"
              >
                Book Cleaning
              </a>
              <p className="text-center text-xs tracking-wide text-white/50">
                {site.phones[0].label} · {site.phones[1].label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
