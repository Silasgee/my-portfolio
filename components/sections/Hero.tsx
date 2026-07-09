"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Sparkle from "@/components/ui/Sparkle";

/**
 * The hero scene is drawn in code, not stock photography: an arched
 * window pouring late-afternoon light into a pristine room, dust
 * motes dissolving as they rise. Light is the brand.
 */
function SunlitRoom() {
  const motes = [
    { left: "18%", top: "38%", size: 5, delay: 0 },
    { left: "34%", top: "52%", size: 4, delay: 2.2 },
    { left: "48%", top: "30%", size: 6, delay: 4.1 },
    { left: "58%", top: "58%", size: 4, delay: 1.3 },
    { left: "70%", top: "42%", size: 5, delay: 5.4 },
    { left: "26%", top: "66%", size: 3, delay: 3.2 },
    { left: "62%", top: "24%", size: 3, delay: 6.6 },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] md:block">
      {/* Arched window, hairline-framed, filled with warm light */}
      <div className="absolute right-[12%] top-[16%] h-[62%] w-[min(30vw,360px)]">
        <div className="absolute inset-0 rounded-t-full border border-navy/[0.12] bg-gradient-to-b from-gold/[0.22] via-gold/[0.07] to-transparent" />
        <div className="absolute inset-3 rounded-t-full border border-navy/[0.07]" />
        {/* Glazing bars */}
        <div className="absolute inset-x-1/2 top-3 bottom-0 w-px bg-navy/[0.09]" />
        <div className="absolute inset-x-3 top-1/2 h-px bg-navy/[0.09]" />
      </div>

      {/* Light shaft falling from the window to the floor */}
      <div className="absolute right-[15%] top-[46%] h-[38%] w-[min(24vw,300px)] origin-top-right animate-shaft bg-gradient-to-b from-gold/[0.15] to-transparent [clip-path:polygon(22%_0,96%_0,82%_100%,-18%_100%)]" />

      {/* Floor line */}
      <div className="absolute bottom-[16%] left-[-6%] right-0 h-px bg-navy/[0.1]" />
      {/* Floor sheen where the light lands */}
      <div className="absolute bottom-[16%] right-[8%] h-px w-[40%] bg-gold/50 blur-[1px]" />

      {/* Console table with vase — a quiet interior cue */}
      <svg
        viewBox="0 0 220 160"
        className="absolute bottom-[16%] left-[24%] w-[min(15vw,190px)]"
        fill="none"
      >
        <rect x="10" y="92" width="180" height="5" rx="2.5" fill="#0F172A" fillOpacity="0.85" />
        <rect x="26" y="97" width="4" height="62" fill="#0F172A" fillOpacity="0.85" />
        <rect x="170" y="97" width="4" height="62" fill="#0F172A" fillOpacity="0.85" />
        {/* Vase */}
        <path
          d="M96 92c0-10 4-14 4-24 0-7-6-10-6-16 0-5 5-8 10-8s10 3 10 8c0 6-6 9-6 16 0 10 4 14 4 24h-16z"
          fill="#0F766E"
          fillOpacity="0.9"
        />
        {/* Stems */}
        <path d="M104 46c0-14 8-22 18-26" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
        <path d="M104 46c0-12-6-20-14-24" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="124" cy="18" rx="5" ry="9" transform="rotate(28 124 18)" fill="#0F766E" fillOpacity="0.75" />
        <ellipse cx="88" cy="20" rx="4.5" ry="8" transform="rotate(-24 88 20)" fill="#0F766E" fillOpacity="0.75" />
      </svg>

      {/* Dust motes catching the light, rising and dissolving */}
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute animate-drift rounded-full bg-gold/70"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}

      {/* One deliberate sparkle — the just-cleaned glint */}
      <motion.span
        className="absolute right-[24%] top-[30%]"
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1, 0.7] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkle className="h-6 w-6" />
      </motion.span>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden bg-cream"
      aria-label="Introduction"
    >
      <motion.div style={reduceMotion ? undefined : { y: sceneY }} className="absolute inset-0">
        <SunlitRoom />
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-36 md:px-10 lg:pb-28 lg:pt-40"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 rounded-full border border-navy/10 bg-white/70 py-2 pl-3 pr-5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy/70 backdrop-blur"
        >
          <Sparkle className="h-3.5 w-3.5" />
          Trusted residential &amp; commercial cleaning experts
        </motion.p>

        <TextReveal
          as="h1"
          text="Premium cleaning that gives you back your time."
          highlight="time."
          delay={0.3}
          className="mt-8 max-w-[800px] font-display text-[3rem] font-medium leading-[1.04] tracking-tight text-navy sm:text-6xl lg:text-[5rem]"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-navy/65"
        >
          Transform your home, office or commercial property into a spotless
          environment — with trained professionals committed to excellence,
          hygiene and attention to detail.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#contact" variant="navy">
            Book Cleaning
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10m0 0L9 4m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MagneticButton>
          <MagneticButton href="#pricing" variant="ghost-light">
            Get Free Quote
          </MagneticButton>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 1 }}
          className="mt-16 flex max-w-2xl flex-wrap gap-x-12 gap-y-4 border-t border-navy/10 pt-8"
        >
          {[
            ["500+", "spaces made pristine"],
            ["5.0", "average client rating"],
            ["100%", "satisfaction guarantee"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-3xl font-medium text-navy">{value}</dd>
              <dd className="mt-0.5 text-[0.65rem] uppercase tracking-[0.2em] text-navy/50">
                {label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
