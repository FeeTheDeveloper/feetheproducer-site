import type { Metadata } from "next";

import { ReleaseCard } from "@/components/cards/ReleaseCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RELEASES } from "@/lib/data/releases";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "Listen to original Fee The Producer releases — beat tapes, EPs, singles, and albums. Stream on Spotify, Apple Music, YouTube, and more."
};

export default function ReleasesPage() {
  const sorted = [...RELEASES].sort(
    (a, b) =>
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );

  return (
    <Section className="pt-24 md:pt-32">
      <SectionHeading
        eyebrow="The Discography"
        title={
          <>
            Original music
            <br />
            <span className="text-gold-gradient">straight from the lab.</span>
          </>
        }
        description="Beat tapes, EPs, singles, and full-length projects. Stream everywhere music lives."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </div>
    </Section>
  );
}
