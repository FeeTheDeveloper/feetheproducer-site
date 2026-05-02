import type { Metadata } from "next";

import { BeatCard } from "@/components/cards/BeatCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BEATS } from "@/lib/data/beats";

export const metadata: Metadata = {
  title: "Beats",
  description:
    "Browse the official Fee The Producer beat catalog — premium trap, drill, hip-hop, R&B, and cinematic instrumentals. Lease or own exclusive."
};

export default function BeatsPage() {
  const genres = Array.from(new Set(BEATS.map((beat) => beat.genre)));

  return (
    <>
      <Section className="pt-24 md:pt-32">
        <SectionHeading
          eyebrow="The Catalog"
          title={
            <>
              Beats built for
              <br />
              <span className="text-gold-gradient">artists who win.</span>
            </>
          }
          description="Premium instrumentals across trap, drill, hip-hop, R&B, and cinematic. Every beat ships clean, mix-ready, and tagged with usage you'll actually understand."
        />

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widerx text-white/50">
            Genres:
          </span>
          {["All", ...genres].map((genre) => (
            <span
              key={genre}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widerx text-white/80"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BEATS.map((beat) => (
            <div key={beat.id} id={beat.id} className="scroll-mt-24">
              <BeatCard beat={beat} />
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 rounded-3xl border border-gold/30 bg-ink-elevated/60 p-8 text-sm shadow-panel md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="font-display text-2xl text-bone md:text-3xl">
              Need a custom beat or exclusive?
            </h2>
            <p className="mt-2 max-w-lg text-white/70">
              Custom production and exclusive buyouts available. Tell us the
              vibe, the artist, and the timeline — we'll build it.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="gold" size="md">
              Request Custom
            </Button>
            <Button href="/licensing" variant="outline" size="md">
              Licensing Tiers
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
