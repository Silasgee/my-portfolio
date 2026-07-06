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

/** Floating dashboard illustration — built in code, no stock imagery. */
function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const float = (delay: number) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, -10, 0] },
          transition: {
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Main card: course progress */}
      <motion.div
        {...float(0)}
        className="relative z-10 rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
              Your progress
            </p>
            <p className="mt-1 font-display text-xl text-white">
              Facebook Ads — Module 4
            </p>
          </div>
          <span className="rounded-full bg-royal/25 px-3 py-1 text-xs font-semibold text-blue-300">
            Live
          </span>
        </div>
        <div className="mt-5 space-y-3">
          {[
            { label: "Campaign structure", pct: 100 },
            { label: "Audience targeting", pct: 100 },
            { label: "Creatives that convert", pct: 62 },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-xs text-white/60">
                <span>{row.label}</span>
                <span>{row.pct}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className={`h-full rounded-full ${
                    row.pct === 100 ? "bg-gold" : "bg-royal"
                  }`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${row.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-ink">
            M
          </div>
          <div className="text-xs">
            <p className="font-semibold text-white">Mentor feedback</p>
            <p className="text-white/55">“Strong hook — ship it. Next: test 3 audiences.”</p>
          </div>
        </div>
      </motion.div>

      {/* Floating chip: payment received */}
      <motion.div
        {...float(1.2)}
        className="absolute right-0 -top-8 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-soft/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:-right-8"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 8.5L6 12l8-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-xs">
          <p className="font-semibold text-white">Client payment received</p>
          <p className="text-white/55">First freelance project · $450</p>
        </div>
      </motion.div>

      {/* Floating chip: certificate */}
      <motion.div
        {...float(2.4)}
        className="absolute -bottom-8 left-0 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-soft/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:-left-8"
      >
        <svg className="h-9 w-9" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path d="M16 4L29 28H3L16 4z" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M16 4l6.5 12H9.5L16 4z" fill="#F59E0B" />
        </svg>
        <div className="text-xs">
          <p className="font-semibold text-white">Certificate earned</p>
          <p className="text-white/55">WordPress Website Design</p>
        </div>
      </motion.div>
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
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="on-dark grain relative overflow-hidden bg-ink"
      aria-label="Introduction"
    >
      {/* Ambient gradient orbs */}
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: orbY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-40 top-[-10%] h-[34rem] w-[34rem] animate-orbit rounded-full bg-royal/25 blur-[130px]" />
        <div className="absolute right-[-15%] top-[30%] h-[30rem] w-[30rem] animate-orbit rounded-full bg-gold/[0.13] blur-[130px] [animation-delay:-8s]" />
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-28 pt-36 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12 lg:pb-36 lg:pt-44"
      >
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-gold"
          >
            <span aria-hidden className="h-px w-8 bg-gold" />
            The digital skills academy
          </motion.p>

          <TextReveal
            as="h1"
            text="Master the skills that pay."
            highlight="pay."
            delay={0.25}
            className="mt-6 max-w-xl font-display text-[2.75rem] font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-lg text-lg leading-relaxed text-white/70"
          >
            Websites. Copy. Ads. Content. Clients. Apex Academy turns beginners
            into paid digital professionals through mentor-led courses built
            around one thing: real income.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#courses" variant="gold">
              Explore courses
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
            <MagneticButton href="#journey" variant="ghost-dark">
              How it works
            </MagneticButton>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 1 }}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8"
          >
            {[
              ["4,200+", "students trained"],
              ["6", "career-ready courses"],
              ["4.9/5", "average rating"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl text-white">{value}</dd>
                <dd className="mt-0.5 text-xs uppercase tracking-[0.18em] text-white/50">
                  {label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-6 lg:mt-0"
        >
          <HeroVisual />
        </motion.div>
      </motion.div>
    </section>
  );
}
