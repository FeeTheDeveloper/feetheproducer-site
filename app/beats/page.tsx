import type { Metadata } from "next";

import { BeatCard } from "@/components/cards/BeatCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BEATS, getBeatGenres, getFeaturedBeats } from "@/lib/data/beats";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Beats",
  description:
    "Browse the Fee The Producer beat store with audio previews, licensing tiers, and direct inquiry paths for exclusives."
};

const beatCatalogStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Fee The Producer Beat Catalog",
  url: `${SITE.url}/beats`,
  itemListElement: BEATS.map((beat, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE.url}/beats/${beat.id}`,
    item: {
      "@type": "Product",
      name: beat.title,
      image: [`${SITE.url}${beat.coverImage}`],
      category: `${beat.genre} beat`,
      brand: {
        "@type": "Brand",
        name: SITE.name
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: beat.priceBasic,
        highPrice: beat.priceExclusive,
        offerCount: 3,
        availability: "https://schema.org/InStock"
      }
    }
  }))
};

export default function BeatsPage() {
  const genres = getBeatGenres();
  const featuredBeats = getFeaturedBeats(4);
  const catalogBeats = BEATS.filter(
    (beat) => !featuredBeats.some((featuredBeat) => featuredBeat.id === beat.id)
  );

  return (
    <>
      <JsonLd data={beatCatalogStructuredData} />

      <Section className="pt-24 md:pt-32">
        <SectionHeading
          eyebrow="Beat Store"
          title={
            <>
              Preview the catalog.
              <br />
              <span className="text-gold-gradient">Lock the right license.</span>
            </>
          }
          description="Every listing includes an audio preview, transparent pricing, and a direct path to the exact license level you need."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-gold/25 bg-white/[0.03] p-5 shadow-panel">
            <p className="text-[11px] font-semibold uppercase tracking-widerx text-gold">
              Available beats
            </p>
            <p className="mt-3 font-display text-5xl text-bone">{BEATS.length}</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widerx text-gold">
              Genres covered
            </p>
            <p className="mt-3 font-display text-5xl text-bone">{genres.length}</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widerx text-gold">
              License options
            </p>
            <p className="mt-3 font-display text-5xl text-bone">3</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widerx text-white/45">
            Genres
          </span>
          {genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widerx text-white/80"
            >
              {genre}
            </span>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured Picks"
            title={
              <>
                Fast lane records.
                <br />
                <span className="text-gold-gradient">Ready to move today.</span>
              </>
            }
            description="A quick shortlist of the beats getting the first call right now."
          />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredBeats.map((beat) => (
            <BeatCard key={beat.id} beat={beat} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Full Catalog"
            title={
              <>
                All beats.
                <br />
                <span className="text-gold-gradient">All preview-ready.</span>
              </>
            }
            description="Compare moods, BPM ranges, and price tiers before you commit."
          />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {catalogBeats.map((beat) => (
            <BeatCard key={beat.id} beat={beat} />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 rounded-[32px] border border-gold/25 bg-ink-elevated/70 p-8 shadow-panel md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="font-display text-3xl text-bone md:text-4xl">
              Need a custom record or an exclusive negotiation?
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              Start with the preview, then reach out for custom production,
              exclusive terms, sync-ready paperwork, or artist development.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="gold" size="md">
              Request Custom
            </Button>
            <Button href="/licensing" variant="outline" size="md">
              Review Licensing
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
