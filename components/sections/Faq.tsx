"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import Reveal from "@/components/ui/Reveal";
import { faqs } from "@/lib/data";
import { site } from "@/lib/site";

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-b border-ink/[0.08]">
      <h3>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
        >
          <span
            className={`font-display text-lg font-medium tracking-tight transition-colors duration-300 sm:text-xl ${
              open ? "text-royal" : "text-ink"
            }`}
          >
            {question}
          </span>
          <span
            aria-hidden
            className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              open ? "rotate-45 border-gold bg-gold/10" : "border-ink/15"
            }`}
          >
            <span className={`absolute h-3 w-[1.5px] ${open ? "bg-gold" : "bg-ink/60"}`} />
            <span className={`absolute h-[1.5px] w-3 ${open ? "bg-gold" : "bg-ink/60"}`} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-label={question}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={
              reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }
            }
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 leading-relaxed text-ink/60">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-mist" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <TextReveal
            as="h2"
            id="faq-title"
            text="Questions, answered honestly."
            highlight="honestly."
            className="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-ink/60">
              Can&apos;t find what you&apos;re looking for? Message us on{" "}
              <a
                href={site.whatsappHref}
                className="font-semibold text-royal underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>{" "}
              — a real human replies within a few hours.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-ink/[0.08]">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              {...faq}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
