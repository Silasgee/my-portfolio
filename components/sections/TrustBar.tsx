import { trustItems } from "@/lib/data";
import Sparkle from "@/components/ui/Sparkle";

/** A quiet hairline strip of what we stand behind. */
export default function TrustBar() {
  return (
    <section aria-label="What we offer" className="border-y border-navy/[0.08] bg-cream">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-6 md:justify-between md:px-10">
        {trustItems.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-navy/55"
          >
            <Sparkle className="h-2.5 w-2.5" color="#0F766E" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
