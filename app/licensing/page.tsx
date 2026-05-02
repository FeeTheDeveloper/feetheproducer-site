import type { Metadata } from "next";

import { PricingCard } from "@/components/cards/PricingCard";
import { BookingCta } from "@/components/sections/BookingCta";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LICENSE_TIERS } from "@/lib/data/licensing";

export const metadata: Metadata = {
  title: "Licensing",
  description:
    "Beat licensing made clear. Basic Lease, Premium Lease, and Exclusive Rights — usage, streams, formats, and rights you can actually understand."
};

const FAQ = [
  {
    q: "Do I keep the rights forever?",
    a: "Lease agreements are non-exclusive and limited by stream count and use cases. Exclusive Rights give you full ownership of the master with no caps."
  },
  {
    q: "Can I monetize on YouTube?",
    a: "Premium Lease and Exclusive Rights both include YouTube monetization. Basic Lease is built for non-monetized content like demos and freestyles."
  },
  {
    q: "Do I have to credit Fee The Producer?",
    a: "Yes — every license requires a producer credit (Prod. Fee The Producer) on the release and on streaming platforms."
  },
  {
    q: "Can I use the beat for sync, film, or TV?",
    a: "Sync, film, TV, and brand placements require Exclusive Rights or a custom agreement. Reach out and we'll work it out."
  },
  {
    q: "What if I need a custom beat?",
    a: "Custom production is available — pricing scales with scope. Hit the contact form and tell us about the project."
  }
];

export default function LicensingPage() {
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <SectionHeading
          align="center"
          eyebrow="Licensing"
          title={
            <>
              Pick your tier.
              <br />
              <span className="text-gold-gradient">
                Lock the record in writing.
              </span>
            </>
          }
          description="Three flexible options built for artists at every level. Clear rights, real numbers, no hidden fine print."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {LICENSE_TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="text-xs uppercase tracking-widerx text-white/50">
            Need something custom?
          </p>
          <Button href="/contact" variant="outline" size="md">
            Request a Custom License
          </Button>
        </div>
      </Section>

      <Section tone="panel" className="py-16 md:py-24">
        <SectionHeading
          eyebrow="FAQ"
          title="Common licensing questions"
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-4">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/10 bg-ink/40 p-5 backdrop-blur transition open:border-gold/40"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-sm font-semibold uppercase tracking-widerx text-bone">
                {item.q}
                <span
                  aria-hidden
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 text-gold transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-white/75">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
