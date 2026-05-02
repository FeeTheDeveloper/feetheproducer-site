import Link from "next/link";

import { BeatCard } from "@/components/cards/BeatCard";
import { ReleaseCard } from "@/components/cards/ReleaseCard";
import { Hero } from "@/components/sections/Hero";
import { LicensingTeaser } from "@/components/sections/LicensingTeaser";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { BookingCta } from "@/components/sections/BookingCta";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedBeats } from "@/lib/data/beats";
import { getFeaturedReleases } from "@/lib/data/releases";

export default function HomePage() {
  const featuredBeats = getFeaturedBeats(3);
  const featuredReleases = getFeaturedReleases(3);

  return (
    <>
      <Hero />

      <Section id="featured-beats">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured Beats"
            title={
              <>
                The catalog
                <br />
                <span className="text-gold-gradient">that hits.</span>
              </>
            }
            description="Hand-picked instrumentals from the FTP catalog. Lease for runs, buy exclusive for label-ready records."
          />
          <Link
            href="/beats"
            className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widerx text-gold hover:underline md:self-end"
          >
            View all beats
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBeats.map((beat) => (
            <BeatCard key={beat.id} beat={beat} />
          ))}
        </div>
      </Section>

      <Section id="latest-releases" tone="ember">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Latest Releases"
            title={
              <>
                Original projects.
                <br />
                <span className="text-gold-gradient">Pressed in gold.</span>
              </>
            }
            description="Beat tapes, EPs, and singles from the FTP roster. Stream everywhere — own the moment."
          />
          <Link
            href="/releases"
            className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widerx text-gold hover:underline md:self-end"
          >
            All releases
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredReleases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      </Section>

      <LicensingTeaser />

      <Section tone="default">
        <EmailCapture />
      </Section>

      <BookingCta />
    </>
  );
}
