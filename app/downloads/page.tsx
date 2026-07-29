import type { Metadata } from "next";
import Link from "next/link";

import { DownloadCard } from "@/components/cards/DownloadCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { downloads } from "@/lib/data/downloads";
import { getDisplayPrice } from "@/lib/stripe";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Buy Fee The Producer singles direct — own the MP3, no subscription or streaming platform required."
};

export default async function DownloadsPage() {
  const tracks = await Promise.all(
    downloads.map(async (track) => ({
      track,
      displayPrice: await getDisplayPrice(track.stripePriceId, track.price)
    }))
  );

  return (
    <Section className="pt-24 md:pt-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Buy The Music"
          title={
            <>
              Own the music.
              <br />
              <span className="text-gold-gradient">No streaming required.</span>
            </>
          }
          description="Every single, sold direct — pay once, keep the file. Prices and sales run through Stripe."
        />
        <Link
          href="/streaming"
          className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widerx text-gold hover:underline md:self-end"
        >
          Prefer to stream first?
          <span aria-hidden>-&gt;</span>
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map(({ track, displayPrice }) => (
          <DownloadCard key={track.slug} track={track} displayPrice={displayPrice} />
        ))}
      </div>
    </Section>
  );
}
