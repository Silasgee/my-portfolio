import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import { services } from "@/lib/data";

const icons: Record<string, React.ReactNode> = {
  "home-cleaning": (
    <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
      <path
        d="M5 14.5L16 5l11 9.5M8 12.5V26a1 1 0 001 1h5v-7h4v7h5a1 1 0 001-1V12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "commercial-cleaning": (
    <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
      <path
        d="M6 27V7a2 2 0 012-2h9a2 2 0 012 2v20M19 12h5a2 2 0 012 2v13M6 27h23M10.5 10h3m-3 5h3m-3 5h3m8.5-4h2m-2 5h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "executive-housekeeping": (
    <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
      <path
        d="M16 4l2.6 6.9L26 12l-6 4.8L21.8 25 16 20.9 10.2 25 12 16.8 6 12l7.4-1.1L16 4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function Services() {
  return (
    <section id="services" className="bg-cream py-24 lg:py-36" aria-label="Services">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <Eyebrow>Our services</Eyebrow>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <TextReveal
            text="Every space deserves to be pristine."
            highlight="pristine."
            className="max-w-2xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-navy sm:text-5xl"
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-navy/60">
              Three ways to work with us — from a single deep clean to a
              standing housekeeping plan that keeps your home perfect.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.12} className="h-full">
              <article
                className={`sheen sheen-gold group relative flex h-full flex-col rounded-[1.75rem] border p-8 transition-all duration-500 hover:-translate-y-2 ${
                  service.featured
                    ? "on-dark grain border-navy bg-navy text-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)]"
                    : "border-navy/[0.08] bg-white shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)] hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.3)]"
                }`}
              >
                {service.note && (
                  <span className="absolute right-6 top-6 rounded-full bg-gold px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-navy">
                    {service.note}
                  </span>
                )}

                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    service.featured ? "bg-gold/15 text-gold" : "bg-emerald/[0.08] text-emerald"
                  }`}
                >
                  {icons[service.slug]}
                </span>

                <h3
                  className={`mt-7 font-display text-2xl font-medium ${
                    service.featured ? "text-white" : "text-navy"
                  }`}
                >
                  {service.title}
                </h3>

                <p
                  className={`mt-1.5 font-display text-xl italic ${
                    service.featured ? "text-gold" : "text-emerald"
                  }`}
                >
                  {service.range}
                </p>

                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    service.featured ? "text-white/65" : "text-navy/60"
                  }`}
                >
                  {service.description}
                </p>

                <ul
                  className={`mt-6 grid flex-1 content-start gap-2.5 border-t pt-6 text-sm ${
                    service.featured
                      ? "rule-dark text-white/80"
                      : "rule-light text-navy/75"
                  } ${service.items.length > 4 ? "grid-cols-2" : ""}`}
                >
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg
                        className={`mt-1 h-3 w-3 shrink-0 ${
                          service.featured ? "text-gold" : "text-emerald"
                        }`}
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M1.5 6.5L4.5 9.5 10.5 2.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                    service.featured
                      ? "text-gold hover:text-amber-300"
                      : "text-emerald hover:text-emerald-deep"
                  }`}
                >
                  Book this service
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 8h10m0 0L9 4m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
