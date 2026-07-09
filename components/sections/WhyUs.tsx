import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import { features } from "@/lib/data";

const icons: Record<string, React.ReactNode> = {
  team: (
    <path d="M8 21v-1.5A4.5 4.5 0 0112.5 15h0a4.5 4.5 0 014.5 4.5V21M12.5 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
  ),
  equipment: (
    <path d="M12 3v6m0 0a4 4 0 00-4 4v8h8v-8a4 4 0 00-4-4zm-7 9H3m18 0h-2" />
  ),
  leaf: (
    <path d="M5 19C5 9 12 5 20 5c0 8-4 15-14 15 0 0-1-1-1-1zm0 0c3-5 6-8 10-10" />
  ),
  pricing: (
    <path d="M12 3v18M8 7.5h6a2.5 2.5 0 010 5H9.5a2.5 2.5 0 000 5H16" />
  ),
  clock: <path d="M12 7v5l3.5 2.5M12 21a9 9 0 110-18 9 9 0 010 18z" />,
  detail: (
    <path d="M10.5 17a6.5 6.5 0 110-13 6.5 6.5 0 010 13zm4.7-1.8L21 21" />
  ),
  home: <path d="M4 11l8-7 8 7M6.5 9.5V20h11V9.5M10 20v-5h4v5" />,
  guarantee: (
    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3zm-3 9l2.2 2.2L15.5 10" />
  ),
};

/**
 * Why choose us — doubles as the About section; the intro carries
 * the brand story, the grid carries the proof.
 */
export default function WhyUs() {
  return (
    <section
      id="about"
      className="on-dark grain relative overflow-hidden bg-navy py-24 lg:py-36"
      aria-label="About us and why choose us"
    >
      {/* One warm light source, top right — the room's window */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-gold/[0.07] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow dark>Why choose us</Eyebrow>
            </Reveal>
            <TextReveal
              text="Cleaning is our craft. Trust is our standard."
              highlight="craft."
              delay={0.1}
              className="mt-6 max-w-xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl"
            />
          </div>
          <Reveal delay={0.25}>
            <p className="max-w-lg text-base leading-relaxed text-white/60 lg:mt-14">
              O&amp;F Pristine Solution exists for one reason: your time and
              peace of mind are worth more than a chore list. We bring
              hotel-standard housekeeping discipline into Nigerian homes and
              businesses — trained teams, professional equipment, eco-friendly
              products and a guarantee we actually honour.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 4) * 0.08} className="h-full">
              <div className="sheen group flex h-full flex-col bg-navy p-7 transition-colors duration-500 hover:bg-navy-soft/60">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-gold"
                  aria-hidden
                >
                  {icons[feature.icon]}
                </svg>
                <h3 className="mt-5 font-display text-lg font-medium leading-snug text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-white/55">
                  {feature.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
