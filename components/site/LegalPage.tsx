import type { ReactNode } from "react";
import Logo from "@/components/site/Logo";
import { site } from "@/lib/site";

/** Shared shell for the privacy and terms pages. */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-navy/[0.08] bg-cream">
        <div className="mx-auto flex h-[4.75rem] max-w-4xl items-center justify-between px-6">
          <a href="/" aria-label="O&F Pristine Solution — home">
            <Logo />
          </a>
          <a
            href="/#contact"
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-navy-soft"
          >
            Book Cleaning
          </a>
        </div>
      </header>
      <main id="main" className="bg-cream">
        <article className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald">
            {site.name}
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-navy/50">Last updated: {updated}</p>
          <div className="mt-10 max-w-2xl space-y-4 leading-relaxed text-navy/70 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-navy">
            {children}
          </div>
          <a
            href="/"
            className="mt-14 inline-flex items-center gap-2 text-sm font-semibold text-emerald hover:text-emerald-deep"
          >
            <svg className="h-3.5 w-3.5 rotate-180" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10m0 0L9 4m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to home
          </a>
        </article>
      </main>
    </>
  );
}
