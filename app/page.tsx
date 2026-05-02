import Link from "next/link";

import { BeatCard } from "@/components/cards/BeatCard";
import { EmailCapture } from "@/components/forms/email-capture";
import { ReleaseCard } from "@/components/cards/ReleaseCard";
import { BookingCta } from "@/components/sections/BookingCta";
import { Hero } from "@/components/sections/Hero";
import { LicensingTeaser } from "@/components/sections/LicensingTeaser";
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
                Beat previews ready.
                <br />
                <span className="text-gold-gradient">Licenses built to move.</span>
              </>
            }
            description="Preview the latest Fee The Producer beats, compare license tiers, and move from discovery to inquiry without leaving the catalog."
          />
          <Link
            href="/beats"
            className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widerx text-gold hover:underline md:self-end"
          >
            View full beat store
            <span aria-hidden>-&gt;</span>
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
            description="Beat tapes, EPs, and singles from the FTP roster. Stream everywhere music lives and keep the brand story moving."
          />
          <Link
            href="/releases"
            className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widerx text-gold hover:underline md:self-end"
          >
            All releases
            <span aria-hidden>-&gt;</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredReleases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      </Section>

      <LicensingTeaser />

      <Section>
        <EmailCapture />
      </Section>

      <Section className="pt-0">
        <div className="flex flex-col items-start gap-4 rounded-[32px] border border-gold/20 bg-white/[0.02] p-8 shadow-panel md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="font-display text-3xl text-bone md:text-4xl">
              Need a custom beat or brand-ready exclusive?
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              Start with the catalog, then reach out when you need a custom
              direction, exclusive terms, or a record built around your artist.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/beats" variant="gold" size="md">
              Browse Beats
            </Button>
            <Button href="/contact" variant="outline" size="md">
              Talk Licensing
            </Button>
          </div>
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
