"use client";

import { useState, type FormEvent } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { courses } from "@/lib/data";
import { site } from "@/lib/site";

const inputClasses =
  "w-full rounded-2xl border border-ink/[0.12] bg-white px-5 py-3.5 text-sm text-ink placeholder:text-ink/35 transition-colors duration-300 focus:border-royal hover:border-ink/25";

/**
 * Enrollment enquiry form. Client-side only by design: it composes a
 * pre-filled WhatsApp message — the channel this audience actually uses —
 * with a mailto fallback. Swap `handleSubmit` for an API route later.
 */
export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      `Hi Apex Academy! I'm ${data.get("name")}.`,
      `I'm interested in: ${data.get("course")}.`,
      data.get("message") ? `Message: ${data.get("message")}` : "",
      `You can also reach me at ${data.get("email")}.`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `${site.whatsappHref}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
  }

  return (
    <section id="contact" className="bg-white" aria-labelledby="contact-title">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <div className="on-dark grain relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 sm:px-10 md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-royal/25 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -right-24 h-[24rem] w-[24rem] rounded-full bg-gold/10 blur-[120px]"
          />

          <div className="relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <Eyebrow dark>Enroll now</Eyebrow>
              <TextReveal
                as="h2"
                id="contact-title"
                text="Your first client is waiting."
                highlight="waiting."
                className="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl"
              />
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
                  Tell us which skill you want to master and we&apos;ll reply
                  on WhatsApp with cohort dates, pricing and a payment plan
                  that fits.
                </p>
                <dl className="mt-10 space-y-4 text-sm">
                  <div className="flex items-center gap-4">
                    <dt className="w-20 shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                      WhatsApp
                    </dt>
                    <dd>
                      <a
                        href={site.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 transition-colors hover:text-white"
                      >
                        {site.whatsapp}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center gap-4">
                    <dt className="w-20 shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                      Email
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${site.email}`}
                        className="text-white/80 transition-colors hover:text-white"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              {sent ? (
                <div
                  className="flex h-full flex-col items-start justify-center rounded-3xl border border-white/10 bg-white/[0.04] p-10"
                  role="status"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink">
                    <svg className="h-5 w-5" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path
                        d="M2 8.5L6 12l8-8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-medium text-white">
                    Message on its way.
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                    We&apos;ve opened WhatsApp with your enquiry. If it
                    didn&apos;t open, message us directly at {site.whatsapp} —
                    we reply within a few hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 text-sm font-semibold text-gold underline-offset-4 hover:underline"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-9"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-white/60"
                      >
                        Full name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Ama Boateng"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-white/60"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={inputClasses}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <label
                      htmlFor="contact-course"
                      className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-white/60"
                    >
                      Course of interest
                    </label>
                    <select
                      id="contact-course"
                      name="course"
                      required
                      defaultValue=""
                      className={`${inputClasses} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230F172A' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E")] bg-[position:right_1.25rem_center] bg-no-repeat pr-12`}
                    >
                      <option value="" disabled>
                        Choose a course…
                      </option>
                      {courses.map((course) => (
                        <option key={course.slug} value={course.title}>
                          {course.title}
                        </option>
                      ))}
                      <option value="Not sure yet">Not sure yet — advise me</option>
                    </select>
                  </div>
                  <div className="mt-5">
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-white/60"
                    >
                      Message <span className="normal-case text-white/35">(optional)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder="Tell us where you're starting from…"
                      className={`${inputClasses} resize-none`}
                    />
                  </div>
                  <div className="mt-7">
                    <MagneticButton type="submit" variant="gold" className="w-full sm:w-auto">
                      Send via WhatsApp
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
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-white/40">
                    No spam, ever. Your details go straight to the admissions
                    team and nowhere else.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
