"use client";

import { useState, type FormEvent } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { site, whatsappLink } from "@/lib/site";
import { services } from "@/lib/data";

const inputClasses =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/35 transition-colors focus:border-gold/60 focus:bg-white/[0.09] focus:outline-none";

/**
 * The booking form composes a WhatsApp message — bookings land where
 * the business actually operates, with zero backend to maintain.
 */
function BookingForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Hello O&F Pristine Solution! I'd like to book a cleaning.`,
      ``,
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Service: ${data.get("service")}`,
      `Property: ${data.get("property") || "—"}`,
      `Preferred date: ${data.get("date") || "Flexible"}`,
      data.get("message") ? `Notes: ${data.get("message")}` : "",
    ].filter((line, i) => line !== "" || i === 1);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" aria-label="Booking form">
      <div>
        <label htmlFor="bf-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
          Your name
        </label>
        <input id="bf-name" name="name" required autoComplete="name" placeholder="Ada Obi" className={inputClasses} />
      </div>
      <div>
        <label htmlFor="bf-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
          Phone / WhatsApp
        </label>
        <input
          id="bf-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="0803 000 0000"
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="bf-service" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
          Service
        </label>
        <select id="bf-service" name="service" required className={`${inputClasses} appearance-none`}>
          {services.map((s) => (
            <option key={s.slug} value={s.title} className="text-navy">
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="bf-property" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
          Property type / size
        </label>
        <input
          id="bf-property"
          name="property"
          placeholder="e.g. Three bedroom, Lekki"
          className={inputClasses}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="bf-date" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
          Preferred date
        </label>
        <input id="bf-date" name="date" type="date" className={`${inputClasses} [color-scheme:dark]`} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="bf-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
          Anything we should know?
        </label>
        <textarea
          id="bf-message"
          name="message"
          rows={3}
          placeholder="Condition of the space, access notes, pets…"
          className={`${inputClasses} resize-none`}
        />
      </div>
      <div className="sm:col-span-2">
        <MagneticButton type="submit" variant="gold" className="w-full sm:w-auto">
          Send booking via WhatsApp
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.4 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-.9-.3-1.6-.6-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2.2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.4z" />
          </svg>
        </MagneticButton>
        <p className="mt-3 text-xs leading-relaxed text-white/45" aria-live="polite">
          {sent
            ? "WhatsApp opened with your booking details — press send there and we'll confirm shortly."
            : "Opens WhatsApp with your details prefilled. We typically reply within minutes."}
        </p>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="bg-cream pb-24 pt-24 lg:pb-32 lg:pt-36" aria-label="Contact and booking">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <Eyebrow>Book your cleaning</Eyebrow>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <TextReveal
            text="Your pristine space is one message away."
            highlight="pristine"
            className="max-w-2xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-navy sm:text-5xl"
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.25fr]">
          {/* Contact channels */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-[1.75rem] border border-navy/[0.08] bg-white p-8 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)]">
                <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-emerald">
                  Speak to us
                </h3>
                <ul className="mt-5 space-y-3">
                  {site.phones.map((phone) => (
                    <li key={phone.href}>
                      <a
                        href={phone.href}
                        className="font-display text-2xl font-medium text-navy transition-colors hover:text-emerald"
                      >
                        {phone.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t rule-light pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-emerald">
                    Follow us
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    {site.socials.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-baseline gap-2 text-navy/70 transition-colors hover:text-navy"
                        >
                          <span className="font-semibold">{social.label}</span>
                          <span className="text-navy/45 group-hover:text-emerald">{social.handle}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-6 border-t rule-light pt-6 text-sm leading-relaxed text-navy/55">
                  Serving {site.areaServed}. Weekends and evening slots
                  available for commercial clients.
                </p>
              </div>

              {/* Service area map */}
              <div className="relative min-h-56 flex-1 overflow-hidden rounded-[1.75rem] border border-navy/[0.08] bg-fog shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)]">
                {/* Quiet fallback shown until (or if) the map loads */}
                <div
                  aria-hidden
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-navy/40"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
                    <path
                      d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11zm0-8.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                    Lagos, Nigeria
                  </p>
                </div>
                <iframe
                  title="O&F Pristine Solution service area — Lagos, Nigeria"
                  src="https://www.google.com/maps?q=Lagos,+Nigeria&z=10&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>

          {/* Booking form on navy */}
          <Reveal delay={0.15} className="h-full">
            <div className="on-dark grain relative h-full overflow-hidden rounded-[1.75rem] bg-navy p-8 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.6)] sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/[0.08] blur-[90px]"
              />
              <div className="relative">
                <h3 className="font-display text-2xl font-medium text-white">
                  Request a booking
                </h3>
                <p className="mt-2 text-sm text-white/55">
                  Tell us about your space — we&apos;ll confirm availability and
                  your exact quote.
                </p>
                <div className="mt-8">
                  <BookingForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
