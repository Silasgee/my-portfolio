"use client";

import { motion, useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import { testimonials } from "@/lib/data";

function Stars({ rating, name }: { rating: number; name: string }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars from ${name}`}
    >
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" className="h-3.5 w-3.5 text-gold" fill="currentColor" aria-hidden>
          <path d="M8 1l2 4.3 4.7.6-3.5 3.2.9 4.6L8 11.5l-4.1 2.2.9-4.6L1.3 5.9 6 5.3 8 1z" />
        </svg>
      ))}
    </div>
  );
}

/** Monogram avatar — honest, no fake stock faces. */
function Monogram({ name, index }: { name: string; index: number }) {
  const palettes = ["bg-emerald text-white", "bg-navy text-gold", "bg-gold text-navy"];
  return (
    <span
      aria-hidden
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold ${palettes[index % palettes.length]}`}
    >
      {name.charAt(0)}
    </span>
  );
}

export default function Testimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="testimonials" className="bg-cream py-24 lg:py-36" aria-label="Testimonials">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <Eyebrow>Client stories</Eyebrow>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <TextReveal
            text="Trusted in homes like yours."
            highlight="yours."
            className="max-w-xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-navy sm:text-5xl"
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-navy/60">
              From Lekki to Maitama — what clients say after the team leaves
              and the light comes in.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.1}>
              <motion.figure
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={{
                  duration: 6 + (i % 3) * 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
                className="sheen sheen-gold rounded-[1.5rem] border border-navy/[0.07] bg-white p-7 shadow-[0_24px_50px_-35px_rgba(15,23,42,0.4)]"
              >
                <Stars rating={t.rating} name={t.name} />
                <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-navy/75">
                  “{t.review}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t rule-light pt-5">
                  <Monogram name={t.name} index={i} />
                  <div>
                    <p className="text-sm font-semibold text-navy">{t.name}</p>
                    <p className="text-xs text-navy/50">{t.location}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
