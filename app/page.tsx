import Link from "next/link";

import { ReleaseCard } from "@/components/cards/ReleaseCard";
import { EmailCapture } from "@/components/forms/email-capture";
import { ReleaseEmbed } from "@/components/music/release-embed";
import { Bio } from "@/components/sections/Bio";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedReleases } from "@/lib/data/releases";

export default function HomePage() {
  const currentRelease = getFeaturedReleases(1)[0];

  return (
    <>
      <Hero />

      {currentRelease ? (
        <Section id="current-release" tone="ember">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Current Release"
              title={
                <>
                  One release.
                  <br />
                  <span className="text-gold-gradient">One clear focus.</span>
                </>
              }
              description="The site now centers a single live release instead of a catalog. L.R.A. is the active record and the main destination."
            />
            <Link
              href="/releases"
              className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widerx text-gold hover:underline md:self-end"
            >
              Open release page
              <span aria-hidden>-&gt;</span>
            </Link>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-start">
            <ReleaseCard release={currentRelease} />
            <ReleaseEmbed release={currentRelease} />
          </div>
        </Section>
      ) : null}

      <Bio />

      <Section>
        <EmailCapture />
      </Section>

      <Section className="pt-0">
        <div className="flex flex-col items-start gap-4 rounded-[32px] border border-gold/20 bg-white/[0.02] p-8 shadow-panel md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="font-display text-3xl text-bone md:text-4xl">
              Want to connect with Fee The Producer?
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              Start with the release, read the bio, and reach out directly for
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
