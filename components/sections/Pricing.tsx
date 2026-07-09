import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { priceList } from "@/lib/data";
import { whatsappLink } from "@/lib/site";

/**
 * Pricing set like a fine hotel menu: hairline rows, serif figures,
 * dot leaders. Ranges published upfront — quotes confirmed on inspection.
 */
export default function Pricing() {
  return (
    <section
      id="pricing"
      className="on-dark grain relative overflow-hidden bg-navy py-24 lg:py-36"
      aria-label="Pricing"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-emerald/[0.12] blur-[120px]"
      />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <div className="text-center">
          <Reveal className="flex justify-center">
            <Eyebrow dark>Service package price list</Eyebrow>
          </Reveal>
          <TextReveal
            text="Honest prices for exceptional standards."
            highlight="exceptional"
            delay={0.1}
            className="mx-auto mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl"
          />
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {priceList.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.12}>
              <div>
                <h3 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                  {group.group}
                  <span aria-hidden className="h-px flex-1 bg-white/15" />
                </h3>
                <dl className="mt-6 space-y-5">
                  {group.rows.map((row) => (
                    <div key={row.label} className="group">
                      <dt className="text-sm text-white/70 transition-colors group-hover:text-white">
                        {row.label}
                      </dt>
                      <dd className="mt-1 font-display text-xl italic text-white">
                        {row.range}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-col items-center gap-6 border-t rule-dark pt-10 text-center">
            <p className="max-w-xl text-sm leading-relaxed text-white/55">
              Final pricing depends on property size, condition and service
              requirements. Every booking starts with a free inspection and a
              precise quote — confirmed before any work begins.
            </p>
            <MagneticButton
              href={whatsappLink(
                "Hello O&F Pristine Solution! I'd like a free quote for a cleaning service."
              )}
              variant="gold"
              external
            >
              Get a tailored quote
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
