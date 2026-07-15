import Link from "next/link";

import { ReleaseCard } from "@/components/cards/ReleaseCard";
import { EmailCapture } from "@/components/forms/email-capture";
import { VideoEmbed } from "@/components/music/video-embed";
import { Bio } from "@/components/sections/Bio";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  featuredRelease,
  formatFeaturing,
  releases
} from "@/lib/data/releases";

export default function HomePage() {
  const latestVideoRelease = releases.find((release) => release.videoUrl);
  const otherReleases = releases.filter(
    (release) => release.slug !== featuredRelease.slug
  );

  return (
    <>
      <Hero />

      {latestVideoRelease?.videoUrl ? (
        <Section id="latest-video" tone="ember">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Latest Video"
              title={
                <>
                  {latestVideoRelease.title}
                  <br />
                  <span className="text-gold-gradient">
                    Official video out now.
                  </span>
                </>
              }
              description={[
                formatFeaturing(latestVideoRelease),
                latestVideoRelease.description
              ]
                .filter(Boolean)
                .join(" — ")}
            />
            <Link
              href={`/releases/${latestVideoRelease.slug}`}
              className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widerx text-gold hover:underline md:self-end"
            >
              Open release page
              <span aria-hidden>-&gt;</span>
            </Link>
          </div>

          <VideoEmbed
            src={latestVideoRelease.videoUrl}
            title={`${latestVideoRelease.title} — official video`}
            className="mt-12"
          />
        </Section>
      ) : null}

      {otherReleases.length > 0 ? (
        <Section id="catalog">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="The Catalog"
              title={
                <>
                  {releases.length} records.
                  <br />
                  <span className="text-gold-gradient">More on the way.</span>
                </>
              }
              description="Singles, videos, and previews — every record with a direct path to where it streams."
            />
            <Link
              href="/releases"
              className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widerx text-gold hover:underline md:self-end"
            >
              See all releases
              <span aria-hidden>-&gt;</span>
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {otherReleases.map((release) => (
              <ReleaseCard key={release.slug} release={release} />
            ))}
          </div>
        </Section>
      ) : null}

      <Bio />

      <Section id="updates">
        <EmailCapture />
      </Section>

      <Section className="pt-0">
        <div className="flex flex-col items-start gap-4 rounded-[32px] border border-gold/20 bg-white/[0.02] p-8 shadow-panel md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="font-display text-3xl text-bone md:text-4xl">
              Want to connect with Fee The Producer?
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              Listen to the records, read the bio, and reach out directly for
              collaboration, media, or booking conversations.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/about" variant="gold" size="md">
              Read About Fee
            </Button>
            <Button href="/contact" variant="outline" size="md">
              Contact
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
