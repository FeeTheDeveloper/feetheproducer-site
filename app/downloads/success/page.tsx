import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { downloads } from "@/lib/data/downloads";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Thank You"
};

type SuccessPageProps = {
  searchParams: Promise<{ track?: string; session_id?: string }>;
};

export default async function DownloadSuccessPage({ searchParams }: SuccessPageProps) {
  const { track: slug, session_id: sessionId } = await searchParams;
  const track = downloads.find((t) => t.slug === slug);

  if (!track || !sessionId) {
    notFound();
  }

  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") {
    notFound();
  }

  return (
    <Section className="pt-24 md:pt-32">
      <SectionHeading
        eyebrow="Purchase Complete"
        title={
          <>
            You own it now.
            <br />
            <span className="text-gold-gradient">{track.title}</span>
          </>
        }
        description="Thanks for the support — your download is ready below."
      />

      <div className="mt-8">
        <a
          href={track.audioSrc}
          download
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold uppercase tracking-widerx text-ink shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Download {track.title}
        </a>
      </div>
    </Section>
  );
}
