import type { Metadata } from "next";

import { ReleaseCard } from "@/components/cards/ReleaseCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { releases } from "@/lib/data/releases";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "Every Fee The Producer release — new singles, official videos, and direct links to Apple Music, Spotify, YouTube Music, and Amazon Music."
};

export default function ReleasesPage() {
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
      <SectionHeading
        eyebrow="The Discography"
        title={
          <>
            The records.
            <br />
            <span className="text-gold-gradient">
              Streaming everywhere they land.
            </span>
          </>
        }
        description="New singles, official videos, and every live streaming destination — straight from the source."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((release) => (
          <ReleaseCard key={release.slug} release={release} />
        ))}
      </div>
    </Section>
  );
}
