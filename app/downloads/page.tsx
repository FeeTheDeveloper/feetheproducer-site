import type { Metadata } from "next";

import { DownloadCard } from "@/components/cards/DownloadCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { downloads } from "@/lib/data/downloads";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download music directly from Fee The Producer — purchase or grab free tracks straight from the source, no streaming required."
};

export default function DownloadsPage() {
  return (
    <Section className="pt-24 md:pt-32">
      <SectionHeading
        eyebrow="Direct Downloads"
        title={
          <>
            Own the music.
            <br />
            <span className="text-gold-gradient">No streaming required.</span>
          </>
        }
        description="Purchase or download tracks directly — yours to keep, no platform needed."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {downloads.map((track) => (
          <DownloadCard key={track.slug} track={track} />
        ))}
      </div>
    </Section>
  );
}
