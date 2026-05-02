import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book Fee The Producer for custom production, exclusive beats, sync placements, and artist collaborations."
};

const QUICK_LINKS = [
  {
    label: "Booking",
    description: "Sessions, custom beats, and exclusive buyouts.",
    href: `mailto:${SITE.email}`,
    cta: SITE.email
  },
  {
    label: "Sync · Film · TV",
    description: "Placements, trailers, and ad campaigns.",
    href: `mailto:${SITE.email}`,
    cta: "Pitch a placement"
  },
  {
    label: "Press / Media",
    description: "Interviews, features, and brand partnerships.",
    href: `mailto:${SITE.email}`,
    cta: "Reach the team"
  }
];

export default function ContactPage() {
  return (
    <Section className="pt-24 md:pt-32">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="lg:sticky lg:top-28">
          <Badge tone="gold">Booking · Custom · Sync</Badge>
          <SectionHeading
            className="mt-4"
            title={
              <>
                Let's build
                <br />
                <span className="text-gold-gradient">something loud.</span>
              </>
            }
            description="Tell us about the project. Custom beats, exclusive buyouts, sync placements, artist collaborations, brand work — we read every message."
          />

          <div className="mt-10 space-y-4">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink/40 p-5 backdrop-blur transition hover:border-gold/40"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widerx text-gold">
                    {link.label}
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    {link.description}
                  </p>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-widerx text-white/80">
                  {link.cta} →
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-ink-elevated/70 p-6 shadow-panel backdrop-blur md:p-10">
          <h2 className="font-display text-3xl text-bone md:text-4xl">
            Send a Message
          </h2>
          <p className="mt-2 text-sm text-white/65">
            Form sends directly to the FTP team. We respond within 1–2 business
            days.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
