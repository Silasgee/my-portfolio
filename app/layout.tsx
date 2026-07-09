import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Albert_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { services, faqs } from "@/lib/data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const albert = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Premium Cleaning Services in Nigeria`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "cleaning services Calabar",
    "premium cleaning Calabar",
    "home cleaning Calabar",
    "commercial cleaning Cross River",
    "executive housekeeping Calabar",
    "post construction cleaning",
    "move in move out cleaning",
    "office cleaning Calabar",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Premium Cleaning Services in Nigeria`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Premium Cleaning Services in Nigeria`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

/** Structured data: local business, service catalog and FAQ. */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/#business`,
        name: site.name,
        url: site.url,
        description: site.description,
        telephone: "+2349139192450",
        priceRange: "₦40,000 – ₦200,000",
        areaServed: { "@type": "Country", name: "Nigeria" },
        sameAs: site.socials.map((s) => s.href),
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: { "@id": `${site.url}/#business` },
          },
          priceCurrency: "NGN",
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // suppressHydrationWarning: browser extensions (dark-mode themers,
  // Grammarly, translators) inject attributes into <html> before React
  // hydrates; this silences only attribute mismatches on this element.
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${albert.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#main"
          className="sr-only z-[110] rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
