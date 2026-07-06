import type { Course } from "@/lib/data";

/**
 * Hand-drawn icon set, one per course. Consistent construction:
 * 48px grid, 1.7 stroke, ink line-work with a single gold accent
 * so the set reads as a family rather than mixed clip-art.
 */
export default function CourseIcon({
  icon,
  className = "h-12 w-12",
}: {
  icon: Course["icon"];
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-hidden": true as const,
  };
  const line = {
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const accent = {
    stroke: "#F59E0B",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "wordpress":
      return (
        <svg {...common}>
          <rect x="6" y="9" width="36" height="30" rx="4" {...line} />
          <path d="M6 17h36" {...line} />
          <circle cx="11.5" cy="13" r="1.2" fill="#F59E0B" stroke="none" />
          <circle cx="16" cy="13" r="1.2" fill="currentColor" stroke="none" />
          <path d="M12 24h10M12 29h7" {...line} />
          <rect x="27" y="23" width="9" height="9" rx="2" {...accent} />
        </svg>
      );
    case "copywriting":
      return (
        <svg {...common}>
          <path d="M30 8l10 10-20 20-12 2 2-12L30 8z" {...line} />
          <path d="M26 12l10 10" {...line} />
          <path d="M10 40h28" {...accent} />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="16" {...line} />
          <circle cx="24" cy="24" r="9" {...line} />
          <circle cx="24" cy="24" r="2.4" fill="#F59E0B" stroke="none" />
          <path d="M35 13l6-6M38 14l3-1 1-3" {...accent} />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path
            d="M24 8c8.8 0 16 6.9 16 15.4S32.8 38.8 24 38.8c-2.6 0-5-.6-7.2-1.6L8 40l2.6-8A14.9 14.9 0 018 23.4C8 14.9 15.2 8 24 8z"
            {...line}
          />
          <path d="M17 21h14M17 27h9" {...accent} />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <rect x="10" y="6" width="20" height="36" rx="5" {...line} />
          <path d="M17 6.5h6" {...line} />
          <path d="M18 20l8 4.5-8 4.5V20z" {...accent} />
          <path d="M35 16c2 2.2 3 4.9 3 8s-1 5.8-3 8" {...line} />
        </svg>
      );
    case "freelancing":
      return (
        <svg {...common}>
          <path d="M24 42V22" {...line} />
          <path
            d="M24 22c-6 0-11-5-11-12 7 0 11 4 11 12zM24 22c6 0 11-5 11-12-7 0-11 4-11 12z"
            {...line}
          />
          <path d="M14 42h20" {...line} />
          <path d="M24 32c3.5 0 6.5 2 8 5" {...accent} />
        </svg>
      );
  }
}
