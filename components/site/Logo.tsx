/** Apex wordmark: gold summit mark + serif wordmark. */
export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        className="h-8 w-8"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path d="M16 4L29 28H3L16 4z" fill="#0F172A" />
        <path d="M16 4l6.5 12H9.5L16 4z" fill="#F59E0B" />
        <path
          d="M16 4L29 28H3L16 4z"
          stroke={dark ? "#F8FAFC" : "#0F172A"}
          strokeOpacity={dark ? 0.4 : 0}
          strokeWidth="1"
        />
      </svg>
      <span
        className={`font-display text-lg font-semibold tracking-tight ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        Apex&nbsp;Academy
      </span>
    </span>
  );
}
