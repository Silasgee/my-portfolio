"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import { faqs } from "@/lib/data";
import { site } from "@/lib/site";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="bg-cream py-24 lg:py-36" aria-label="Frequently asked questions">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <TextReveal
            text="Everything you'd like to know."
            highlight="know."
            delay={0.1}
            className="mt-6 font-display text-4xl font-medium leading-[1.08] tracking-tight text-navy sm:text-5xl"
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-navy/60">
              Can&apos;t find your answer? Message us on WhatsApp at{" "}
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald underline decoration-gold decoration-2 underline-offset-4 hover:text-emerald-deep"
              >
                {site.whatsapp.label}
              </a>{" "}
              — we reply within minutes.
            </p>
          </Reveal>
        </div>

        <div>
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={faq.question} delay={i * 0.06}>
                <div className="border-b rule-light">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={`font-display text-xl font-medium transition-colors ${
                          open ? "text-emerald" : "text-navy"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        aria-hidden
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          open
                            ? "rotate-45 border-gold bg-gold text-navy"
                            : "border-navy/15 text-navy"
                        }`}
                      >
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                          <path
                            d="M8 3v10M3 8h10"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 text-[0.95rem] leading-relaxed text-navy/65">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
