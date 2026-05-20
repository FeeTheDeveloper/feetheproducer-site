import type { Metadata } from "next";

import { ReleaseCard } from "@/components/cards/ReleaseCard";
import { ReleaseCommandCenter } from "@/components/music/release-command-center";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCampaignsForRelease } from "@/lib/data/campaigns";
import { getPromotionsForRelease } from "@/lib/data/promotions";
import { getReleaseById, RELEASES } from "@/lib/data/releases";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "Listen to L.R.A. by Fee The Producer with live Apple Music, Spotify, and Amazon Music destinations."
};

export default function ReleasesPage() {
  const sorted = [...RELEASES].sort(
    (a, b) =>
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );
  const currentRelease = getReleaseById("lra") ?? sorted[0];
  const linkedCampaigns = currentRelease
    ? getCampaignsForRelease(currentRelease.id)
    : [];
  const linkedPromotions = currentRelease
    ? getPromotionsForRelease(currentRelease.id)
    : [];

  return (
    <Section className="pt-24 md:pt-32">
      <SectionHeading
        eyebrow="The Discography"
        title={
          <>
            Current release
            <br />
            <span className="text-gold-gradient">live across every stream.</span>
          </>
        }
        description="The public release catalog is trimmed back to one live record right now. L.R.A. carries the active Apple Music embed and the shared streaming destinations."
      />

      {currentRelease ? (
        <ReleaseCommandCenter
          release={currentRelease}
          campaigns={linkedCampaigns}
          promotions={linkedPromotions}
          className="mt-12"
        />
      ) : null}

      {sorted.length > 1 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      ) : null}
    </Section>
  );
}
