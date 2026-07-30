import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Checkout Canceled",
  robots: { index: false, follow: false }
};

export default function DownloadCancelPage() {
  return (
    <Section className="pt-24 md:pt-32">
      <SectionHeading
        eyebrow="Checkout Canceled"
        title={
          <>
            No charge made.
            <br />
            <span className="text-gold-gradient">Ready when you are.</span>
          </>
        }
        description="Your card was not charged. Head back to the catalog whenever you're ready to buy."
      />

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/downloads" variant="gold" size="md">
          Back to Downloads
        </Button>
      </div>
    </Section>
  );
}
