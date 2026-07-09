import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern bookings and services provided by O&F Pristine Solution.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 2026">
      <h2>Bookings and quotes</h2>
      <p>
        Published prices are ranges. Your final quote depends on property
        size, condition and service requirements, and is confirmed after a
        free inspection — before any work begins. A booking is confirmed once
        you accept the quote and the date is agreed.
      </p>

      <h2>Access and preparation</h2>
      <p>
        Please ensure our team can access the property at the agreed time.
        You don&apos;t need to provide equipment or products — we bring
        everything.
      </p>

      <h2>Rescheduling and cancellation</h2>
      <p>
        Life happens. Reschedule or cancel free of charge up to 24 hours
        before your appointment by calling or messaging us on WhatsApp.
      </p>

      <h2>Satisfaction guarantee</h2>
      <p>
        If any area falls short of pristine, tell us within 24 hours of the
        service and we will return to make it right at no extra cost.
      </p>

      <h2>Liability</h2>
      <p>
        Our teams are trained and supervised, and we treat your property with
        care. In the unlikely event of damage caused by our team, report it
        within 24 hours and we will resolve it fairly and promptly.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Call 0913 919 2450 or 0903 934 3495.
      </p>
    </LegalPage>
  );
}
