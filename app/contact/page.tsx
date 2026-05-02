import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Fee The Producer for custom production, beat licensing, exclusives, collaborations, and sync-ready inquiries."
};

const QUICK_LINKS = [
  {
    label: "Licensing",
    description: "Beat leases, exclusives, and licensing questions.",
    href: `mailto:${SITE.email}`,
    cta: SITE.email
  },
  {
    label: "Custom Production",
    description: "Built-from-scratch records, artist development, and sessions.",
    href: `mailto:${SITE.email}`,
    cta: "Start the brief"
  },
  {
    label: "Sync and Brand",
    description: "Film, TV, ad campaigns, and brand-ready placements.",
    href: `mailto:${SITE.email}`,
    cta: "Pitch the placement"
  }
];

export default function ContactPage() {
  return (
    <Section className="pt-24 md:pt-32">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div className="lg:sticky lg:top-28">
          <Badge tone="gold">Contact / Licensing / Custom Work</Badge>
          <SectionHeading
            className="mt-4"
            title={
              <>
                Let&apos;s build
                <br />
                <span className="text-gold-gradient">the next record.</span>
              </>
            }
            description="Send the project details, choose the service you need, and the FTP team can take it from beat inquiry to custom production."
          />

          <div className="mt-10 space-y-4">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-ink/40 p-5 backdrop-blur transition duration-300 hover:border-gold/35 hover:bg-white/[0.03]"
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
                  {link.cta}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-ink-elevated/75 p-6 shadow-panel backdrop-blur md:p-10">
          <h2 className="font-display text-3xl text-bone md:text-4xl">
            Send a Message
          </h2>
          <p className="mt-2 text-sm text-white/65">
            Contact requests post through the live inquiry route and are ready
            for direct email delivery when the provider is connected.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
