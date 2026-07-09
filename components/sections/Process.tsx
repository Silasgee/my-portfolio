"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import { processSteps } from "@/lib/data";

/**
 * The journey from booking to a pristine space — a horizontal
 * timeline whose gold line fills as you scroll (vertical on mobile).
 */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section className="bg-cream py-24 lg:py-36" aria-label="How it works">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <Eyebrow>Our process</Eyebrow>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <TextReveal
            text="From booking to bliss, in five steps."
            highlight="bliss,"
            className="max-w-xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-navy sm:text-5xl"
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-navy/60">
              A clear, supervised process — so you always know exactly what
              happens, when, and to what standard.
            </p>
          </Reveal>
        </div>

        <ol ref={ref} className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          {/* Track + animated progress line */}
          <div
            aria-hidden
            className="absolute left-[1.05rem] top-0 h-full w-px bg-navy/10 md:left-0 md:top-[1.05rem] md:h-px md:w-full"
          />
          <motion.span
            aria-hidden
            style={reduceMotion ? undefined : { scaleX: progress }}
            className="absolute left-0 top-[1.05rem] hidden h-px w-full origin-left bg-gold md:block"
          />
          <motion.span
            aria-hidden
            style={reduceMotion ? undefined : { scaleY: progress }}
            className="absolute left-[1.05rem] top-0 h-full w-px origin-top bg-gold md:hidden"
          />

          {processSteps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 md:block md:pr-4">
              <Reveal delay={i * 0.1}>
                <span className="relative z-10 flex h-[2.15rem] w-[2.15rem] shrink-0 items-center justify-center rounded-full border border-navy/15 bg-cream font-display text-sm font-semibold text-navy transition-colors duration-500">
                  {i + 1}
                </span>
              </Reveal>
              <Reveal delay={i * 0.1 + 0.08}>
                <div className="md:mt-6">
                  <h3 className="font-display text-xl font-medium text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
