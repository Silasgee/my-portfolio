/**
 * Central site configuration for O&F Pristine Solution.
 * Update the production URL and social handles here once live.
 */
export const site = {
  name: "O&F Pristine Solution",
  shortName: "O&F Pristine",
  url: "https://ofpristinesolution.ng",
  tagline: "Premium cleaning that gives you back your time",
  description:
    "O&F Pristine Solution is Nigeria's premium residential and commercial cleaning company. Trained professionals, eco-friendly products and hotel-standard attention to detail — for homes, offices and executive housekeeping.",
  phones: [
    { label: "0913 919 2450", href: "tel:+2349139192450" },
    { label: "0903 934 3495", href: "tel:+2349039343495" },
  ],
  whatsapp: {
    label: "0913 919 2450",
    href: "https://wa.me/2349139192450",
  },
  socials: [
    {
      label: "Instagram",
      handle: "@pristinesolution.ng",
      href: "https://instagram.com/pristinesolution.ng",
    },
    {
      label: "TikTok",
      handle: "@O&Fpristinesolution",
      href: "https://www.tiktok.com/@ofpristinesolution",
    },
  ],
  areaServed: "Calabar and across Cross River State",
} as const;

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

/** Builds a prefilled WhatsApp booking link. */
export function whatsappLink(message: string) {
  return `${site.whatsapp.href}?text=${encodeURIComponent(message)}`;
}

export const bookingMessage =
  "Hello O&F Pristine Solution! I'd like to book a cleaning. Could you share your availability?";
