import Sparkle from "@/components/ui/Sparkle";

/**
 * Custom wordmark: "O&F" set in the display serif beside the sparkle
 * roundel, over a widely tracked "PRISTINE SOLUTION" caption.
 */
export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={`relative flex h-9 w-9 items-center justify-center rounded-full ${
          dark ? "bg-white/10" : "bg-navy"
        }`}
      >
        <Sparkle className="h-4 w-4" />
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-[1.35rem] font-semibold tracking-wide ${
            dark ? "text-white" : "text-navy"
          }`}
        >
          O&amp;F
        </span>
        <span
          className={`mt-1 block text-[0.55rem] font-bold uppercase tracking-[0.3em] ${
            dark ? "text-white/60" : "text-navy/60"
          }`}
        >
          Pristine Solution
        </span>
      </span>
    </span>
  );
}
