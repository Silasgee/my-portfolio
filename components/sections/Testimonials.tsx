"use client";

import { useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function Card({
  quote,
  name,
  role,
  course,
}: (typeof testimonials)[number]) {
  return (
    <figure className="flex w-[20rem] shrink-0 flex-col justify-between rounded-3xl border border-ink/[0.08] bg-white p-7 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.12)] sm:w-[24rem]">
      <blockquote className="text-[0.95rem] leading-relaxed text-ink/75">
        <span aria-hidden className="mb-3 block font-display text-4xl leading-none text-gold">
          “
        </span>
        {quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/[0.07] pt-5">
        <span
          aria-hidden
          className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-display text-sm text-gold"
        >
          {initials(name)}
        </span>
        <div>
          <p className="text-sm font-bold text-ink">{name}</p>
          <p className="text-xs text-ink/50">
            {role} · <span className="text-royal">{course}</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Two counter-scrolling marquee rows that pause on hover.
 * Reduced-motion users get a static responsive grid instead.
 */
export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const rowA = testimonials.slice(0, 3);
  const rowB = testimonials.slice(3);

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-white"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-36">
        <div className="max-w-2xl">
          <Eyebrow>Student stories</Eyebrow>
          <TextReveal
            as="h2"
            id="testimonials-title"
            text="Real students. Real invoices."
            highlight="invoices."
            className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl"
          />
        </div>
      </div>

      {reduceMotion ? (
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} {...t} />
          ))}
        </div>
      ) : (
        <div className="space-y-6 py-16">
          {[rowA, rowB].map((row, i) => (
            <div
              key={i}
              className="group relative flex overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              }}
            >
              <div
                className={`flex animate-marquee gap-6 pr-6 group-hover:[animation-play-state:paused] ${
                  i === 1 ? "[animation-direction:reverse]" : ""
                }`}
              >
                {/* Row duplicated for a seamless loop; clones hidden from AT */}
                {[...row, ...row].map((t, j) => (
                  <div key={j} aria-hidden={j >= row.length}>
                    <Card {...t} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
