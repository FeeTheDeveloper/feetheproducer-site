import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { downloads } from "@/lib/data/downloads";
import { getStripeClient } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: false }
};

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function DownloadSuccessPage({
  searchParams
}: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  let paid = false;
  let track: (typeof downloads)[number] | undefined;

  if (sessionId) {
    try {
      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
      track = downloads.find((item) => item.slug === session.metadata?.slug);
    } catch {
      paid = false;
    }
  }

  return (
    <Section className="pt-24 md:pt-32">
      <SectionHeading
        eyebrow={paid ? "Order Confirmed" : "Checkout"}
        title={
          paid ? (
            <>
              You&apos;re in.
              <br />
              <span className="text-gold-gradient">Enjoy the record.</span>
            </>
          ) : (
            <>We couldn&apos;t confirm that order.</>
          )
        }
        description={
          paid
            ? "Your download is ready below. A receipt is on its way from Stripe."
            : "If you completed a payment, check your email for a Stripe receipt, or reach out and we'll sort it out."
        }
      />

      <div className="mt-8 flex flex-wrap gap-3">
        {paid && track && sessionId ? (
          <a
            href={`/api/download?session_id=${sessionId}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold uppercase tracking-widerx text-ink transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Download {track.title}
          </a>
        ) : null}
        <Button href="/downloads" variant="outline" size="md">
          Back to Downloads
        </Button>
        {!paid ? (
          <Button href="/contact" variant="ghost" size="md">
            Contact Us
          </Button>
        ) : null}
      </div>
    </Section>
  );
}
