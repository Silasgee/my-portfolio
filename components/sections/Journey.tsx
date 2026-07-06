"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import Reveal from "@/components/ui/Reveal";
import { journey } from "@/lib/data";

/**
 * The path from enrolling to earning, drawn as a gold thread
 * that fills as you scroll through the section.
 */
export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="journey"
      className="on-dark grain relative overflow-hidden bg-ink"
      aria-labelledby="journey-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[50rem] -translate-x-1/2 rounded-full bg-royal/15 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <div className="max-w-2xl">
          <Eyebrow dark>The learning journey</Eyebrow>
          <TextReveal
            as="h2"
            id="journey-title"
            text="From first lesson to first payment."
            highlight="payment."
            className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              A clear, four-stage path. No guessing what comes next — every
              student walks the same proven road at their own pace.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-20">
          {/* The thread: horizontal on desktop, vertical on mobile */}
          <div
            aria-hidden="true"
            className="absolute left-[1.4rem] top-3 h-[calc(100%-1.5rem)] w-px bg-white/10 lg:left-0 lg:top-[1.35rem] lg:h-px lg:w-full"
          >
            <motion.div
              style={
                reduceMotion
                  ? undefined
                  : { scaleY: lineScale, scaleX: lineScale }
              }
              className="h-full w-full origin-top bg-gold lg:origin-left"
            />
          </div>

          <ol className="grid gap-14 lg:grid-cols-4 lg:gap-8" role="list">
            {journey.map((stage, i) => (
              <Reveal key={stage.step} delay={i * 0.12}>
                <li className="relative pl-16 lg:pl-0 lg:pt-16">
                  <span className="absolute left-0 top-0 flex h-[2.8rem] w-[2.8rem] items-center justify-center rounded-full border border-gold/50 bg-ink font-display text-sm italic text-gold">
                    {stage.step}
                  </span>
                  <h3 className="font-display text-xl font-medium tracking-tight text-white sm:text-2xl">
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {stage.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
