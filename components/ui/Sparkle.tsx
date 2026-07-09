/**
 * The brand mark: a four-point sparkle — the universal shorthand for
 * "just cleaned". Used in the logo, preloader, badges and favicons.
 */
export default function Sparkle({
  className = "h-5 w-5",
  color = "#F59E0B",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 1.5c.9 5.6 4.9 9.6 10.5 10.5C16.9 12.9 12.9 16.9 12 22.5 11.1 16.9 7.1 12.9 1.5 12 7.1 11.1 11.1 7.1 12 1.5z"
        fill={color}
      />
    </svg>
  );
}
