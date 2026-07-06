"use client";

import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { stats } from "@/lib/data";

/** A quiet, confident band of numbers on ink. */
export default function Stats() {
  return (
    <section
      className="on-dark grain relative overflow-hidden bg-ink"
      aria-labelledby="stats-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-[-40%] h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow dark>The numbers</Eyebrow>
              <h2
                id="stats-title"
                className="mt-4 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl"
              >
                Proof, not promises.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Updated every cohort. We publish our outcomes because they are
              the product.
            </p>
          </div>
        </Reveal>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/10 pt-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div>
                <dd className="font-display text-5xl font-medium tracking-tight text-white sm:text-6xl">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </dd>
                <dt className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {stat.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
