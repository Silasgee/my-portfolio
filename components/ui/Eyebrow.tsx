/**
 * Small uppercase section label with a gold tick — the consistent
 * "you are here" marker at the top of every section.
 */
export default function Eyebrow({
  children,
  dark = false,
}: {
  children: string;
  dark?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] ${
        dark ? "text-gold" : "text-emerald"
      }`}
    >
      <span aria-hidden className="h-px w-8 bg-gold" />
      {children}
    </p>
  );
}
