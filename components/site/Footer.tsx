import Logo from "@/components/site/Logo";
import { services } from "@/lib/data";
import { nav, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark grain relative overflow-hidden bg-navy" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              Nigeria&apos;s premium residential and commercial cleaning
              company. Trained professionals, eco-friendly products and
              hotel-standard attention to detail.
            </p>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
            >
              Chat on WhatsApp
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 8h10m0 0L9 4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <nav aria-label="Services">
            <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
              Services
            </h2>
            <ul className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    href="#services"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#pricing" className="text-sm text-white/60 transition-colors hover:text-white">
                  Pricing
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
              Company
            </h2>
            <ul className="mt-6 space-y-3">
              {nav
                .filter((item) => item.href !== "#top")
                .map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              <li>
                <a href="/privacy" className="text-sm text-white/60 transition-colors hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-white/60 transition-colors hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Contact and social media">
            <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
              Contact
            </h2>
            <ul className="mt-6 space-y-3">
              {site.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {phone.label}
                  </a>
                </li>
              ))}
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {social.label} <span className="text-white/35">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Oversized wordmark — the sign-off */}
        <p
          aria-hidden="true"
          className="mt-20 select-none overflow-hidden whitespace-nowrap font-display text-[15vw] font-medium leading-none tracking-tight text-white/[0.05] lg:text-[10rem]"
        >
          Pristine Solution
        </p>

        <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} O&amp;F Pristine Solution. All rights reserved.</p>
          <p>
            Your space, <span className="font-display text-sm italic text-gold">returned to perfect.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
