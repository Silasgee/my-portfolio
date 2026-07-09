import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How O&F Pristine Solution collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <h2>What we collect</h2>
      <p>
        When you book a cleaning or contact us, we collect the details you
        share with us: your name, phone number, property address and any notes
        about your space. We collect nothing else, and we never buy or scrape
        data about you.
      </p>

      <h2>How we use it</h2>
      <p>
        Your details are used only to schedule, deliver and follow up on your
        cleaning service — confirming appointments, sending quotes and
        coordinating our team&apos;s arrival. With your consent, we may
        occasionally share offers on WhatsApp; you can opt out with a single
        message.
      </p>

      <h2>Who we share it with</h2>
      <p>
        No one. We do not sell, rent or trade your personal information. Only
        the team assigned to your booking sees the details needed to do the
        job.
      </p>

      <h2>Your home, your privacy</h2>
      <p>
        Our staff sign confidentiality agreements. What we see in your home or
        office stays there — no photos are taken or shared without your
        written permission.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Call 0913 919 2450 or message us on
        Instagram @pristinesolution.ng.
      </p>
    </LegalPage>
  );
}
