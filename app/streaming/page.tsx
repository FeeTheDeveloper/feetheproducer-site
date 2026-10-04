import type { Metadata } from "next";

import { ReleaseCard } from "@/components/cards/ReleaseCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { releases } from "@/lib/data/releases";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Streaming",
  description:
    "Explore selected Fee The Producer releases and the official Apple Music artist profile."
};

export default function StreamingPage() {
  const sorted = [...releases].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === "presave" ? -1 : 1;
    }

    return (
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
  });

  return (
    <Section className="pt-24 md:pt-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="The Discography"
          title={
            <>
              Selected records.
              <br />
              <span className="text-gold-gradient">
                Listen where they land.
              </span>
            </>
          }
          description="Selected singles, official videos, and listening links. Visit Apple Music for the current artist catalog."
        />
        <a
          href={SITE.social.apple}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widerx text-gold hover:underline md:self-end"
        >
          View Fee The Producer on Apple Music
          <span aria-hidden>-&gt;</span>
        </a>
      </div>

      <a
        href="https://music.apple.com/us/album/all-gas-no-breaks-feat-ray-nathan/6806901863?i=6806901864"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 block rounded-[28px] border border-gold/30 bg-white/[0.03] p-6 transition hover:border-gold/60"
      >
        <p className="text-xs font-semibold uppercase tracking-widerx text-gold">
          Latest on Apple Music · August 30, 2026
        </p>
        <h2 className="mt-3 font-display text-2xl text-bone md:text-3xl">
          All Gas No Breaks (feat. Ray Nathan)
        </h2>
        <p className="mt-2 text-sm text-white/70">Listen on Apple Music →</p>
      </a>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((release) => (
          <ReleaseCard key={release.slug} release={release} />
        ))}
      </div>
    </Section>
  );
}
