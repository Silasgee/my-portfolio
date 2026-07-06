"use client";

import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { reasons } from "@/lib/data";

/**
 * Editorial split layout: a sticky manifesto on the left,
 * numbered reasons reading like an index on the right.
 */
export default function WhyApex() {
  return (
    <section id="why-apex" className="bg-mist" aria-labelledby="why-title">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Why Apex Academy</Eyebrow>
          <TextReveal
            as="h2"
            id="why-title"
            text="Built for people who need results, not certificates on a shelf."
            highlight="results,"
            className="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/60">
              Most online courses end at the last video. Ours end at your
              first invoice. Everything about Apex — the curriculum, the
              mentors, the community — is designed around that difference.
            </p>
            <div className="mt-9">
              <MagneticButton href="#contact" variant="royal">
                Talk to an advisor
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <ol className="divide-y divide-ink/[0.08] border-y border-ink/[0.08]">
          {reasons.map((reason, i) => (
            <Reveal key={reason.number} delay={i * 0.08}>
              <li className="group flex gap-6 py-10 sm:gap-10">
                <span
                  aria-hidden
                  className="font-display text-xl italic text-gold sm:text-2xl"
                >
                  {reason.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-royal sm:text-[1.7rem]">
                    {reason.title}
                  </h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-ink/60">
                    {reason.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
