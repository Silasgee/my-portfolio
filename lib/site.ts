/**
 * Central site configuration. Update the URL and contact details here
 * once the production domain and channels are live.
 */
export const site = {
  name: "Apex Academy",
  url: "https://apexacademy.co",
  tagline: "Master the digital skills that pay",
  description:
    "Apex Academy teaches website design, copywriting, Facebook Ads, WhatsApp marketing, TikTok marketing and freelancing — practical, mentor-led courses that turn skills into income.",
  email: "hello@apexacademy.co",
  whatsapp: "+233200000000",
  whatsappHref: "https://wa.me/233200000000",
  socials: [
    { label: "Instagram", href: "https://instagram.com/apexacademy" },
    { label: "TikTok", href: "https://tiktok.com/@apexacademy" },
    { label: "YouTube", href: "https://youtube.com/@apexacademy" },
    { label: "X (Twitter)", href: "https://x.com/apexacademy" },
  ],
} as const;

export const nav = [
  { label: "Courses", href: "#courses" },
  { label: "Why Apex", href: "#why-apex" },
  { label: "Journey", href: "#journey" },
  { label: "Stories", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
] as const;
