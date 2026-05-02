import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { BeatCard } from "@/components/cards/BeatCard";
import { BeatPlayer } from "@/components/music/beat-player";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  BEATS,
  getBeatById,
  getRelatedBeats,
  type Beat
} from "@/lib/data/beats";
import { LICENSE_TIERS } from "@/lib/data/licensing";
import { formatCurrency } from "@/lib/format";
import { SITE } from "@/lib/site";

type BeatDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getBeatDescription(
  title: string,
  genre: string,
  bpm: number,
  mood: string
) {
  if (bpm > 0) {
    return `${title} is a ${genre} beat at ${bpm} BPM with a ${mood.toLowerCase()} feel from Fee The Producer.`;
  }

  return `${title} is a ${genre} beat with a ${mood.toLowerCase()} feel from Fee The Producer.`;
}

function getBeatFactLine(beat: Beat) {
  return beat.bpm > 0 ? `${beat.genre} / ${beat.bpm} BPM` : beat.genre;
}

function getAudioEncodingFormat(src: string) {
  if (src.endsWith(".m4a") || src.endsWith(".mp4")) {
    return "audio/mp4";
  }

  if (src.endsWith(".mp3")) {
    return "audio/mpeg";
  }

  return "audio/wav";
}

export function generateStaticParams() {
  return BEATS.map((beat) => ({ id: beat.id }));
}

export async function generateMetadata({
  params
}: BeatDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const beat = getBeatById(id);

  if (!beat) {
    return {
      title: "Beat Not Found"
    };
  }

  const title = `${beat.title} Beat`;
  const description = getBeatDescription(
    beat.title,
    beat.genre,
    beat.bpm,
    beat.mood
  );

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE.url}/beats/${beat.id}`
    },
    openGraph: {
      title: `${beat.title} | Fee The Producer`,
      description,
      url: `${SITE.url}/beats/${beat.id}`,
      images: [
        {
          url: beat.coverImage,
          width: 1280,
          height: 1280,
          alt: `${beat.title} cover art`
        }
      ]
    },
    twitter: {
      title: `${beat.title} | Fee The Producer`,
      description,
      images: [beat.coverImage]
    }
  };
}

export default async function BeatDetailPage({ params }: BeatDetailPageProps) {
  const { id } = await params;
  const beat = getBeatById(id);

  if (!beat) {
    notFound();
  }

  const relatedBeats = getRelatedBeats(beat, 3);
  const beatFacts = [
    { label: "Genre", value: beat.genre },
    { label: "Mood", value: beat.mood }
  ];

  if (beat.bpm > 0) {
    beatFacts.splice(1, 0, { label: "BPM", value: String(beat.bpm) });
  }

  const licensingOptions = LICENSE_TIERS.map((tier) => ({
    ...tier,
    price:
      tier.id === "basic"
        ? beat.priceBasic
        : tier.id === "premium"
          ? beat.pricePremium
          : beat.priceExclusive
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${beat.title} beat license`,
    description: getBeatDescription(
      beat.title,
      beat.genre,
      beat.bpm,
      beat.mood
    ),
    sku: beat.id,
    category: `${beat.genre} beat`,
    url: `${SITE.url}/beats/${beat.id}`,
    image: [`${SITE.url}${beat.coverImage}`],
    brand: {
      "@type": "Brand",
      name: SITE.name
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Genre",
        value: beat.genre
      },
      ...(beat.bpm > 0
        ? [
            {
              "@type": "PropertyValue",
              name: "BPM",
              value: beat.bpm
            }
          ]
        : []),
      {
        "@type": "PropertyValue",
        name: "Mood",
        value: beat.mood
      }
    ],
    subjectOf: {
      "@type": "AudioObject",
      name: `${beat.title} audio preview`,
      contentUrl: `${SITE.url}${beat.audioUrl}`,
      encodingFormat: getAudioEncodingFormat(beat.audioUrl)
    },
    offers: licensingOptions.map((tier) => ({
      "@type": "Offer",
      price: tier.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/beats/${beat.id}#licensing`,
      category: tier.name
    }))
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <Section className="pt-24 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-ink-elevated/80 shadow-panel">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={beat.coverImage}
                alt={`${beat.title} cover art`}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.12)_0%,rgba(5,5,5,0.46)_45%,rgba(5,5,5,0.92)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-widerx text-gold">
                  {getBeatFactLine(beat)}
                </p>
                <h1 className="mt-3 font-display text-5xl leading-none text-bone md:text-6xl">
                  {beat.title}
                </h1>
                <p className="mt-3 max-w-lg text-sm text-white/75 md:text-base">
                  {getBeatDescription(
                    beat.title,
                    beat.genre,
                    beat.bpm,
                    beat.mood
                  )}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-[32px] border border-gold/20 bg-white/[0.03] p-6 shadow-panel md:p-8">
              <p className="text-xs font-semibold uppercase tracking-widerx text-gold">
                Beat detail
              </p>
              <h2 className="mt-3 font-display text-4xl leading-none text-bone md:text-5xl">
                Preview it.
                <br />
                <span className="text-gold-gradient">Pick the license.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-white/72 md:text-base">
                Compare the tiers below, stream the preview, and move into the
                right license path for your next record.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {beatFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-2xl border border-white/10 bg-ink/60 p-4"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-widerx text-white/45">
                      {fact.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-bone">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>

              <BeatPlayer
                src={beat.audioUrl}
                title={`${beat.title} preview`}
                size="lg"
                className="mt-6"
              />

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="#licensing" variant="gold" size="md">
                  Buy License
                </Button>
                <Button href="/contact" variant="outline" size="md">
                  Request Custom
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="licensing" className="pt-0">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widerx text-gold">
              Licensing options
            </p>
            <h2 className="mt-3 font-display text-4xl leading-none text-bone md:text-5xl">
              Choose the tier
              <br />
              <span className="text-gold-gradient">that fits the record.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm text-white/72 md:text-base">
            Basic for fast-release momentum, Premium for serious campaign use,
            and Exclusive when you want the beat off the market.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {licensingOptions.map((tier) => (
            <article
              key={tier.id}
              className="rounded-[28px] border border-white/10 bg-ink-elevated/75 p-6 shadow-panel"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widerx text-gold">
                    {tier.name}
                  </p>
                  <h3 className="mt-3 font-display text-4xl leading-none text-bone">
                    {formatCurrency(tier.price)}
                  </h3>
                </div>
                {tier.highlight ? (
                  <span className="rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-widerx text-ink">
                    Best Value
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-sm text-white/70">{tier.tagline}</p>

              <ul className="mt-6 space-y-3 text-sm text-white/80">
                {tier.features.slice(0, 5).map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2">
                <Button type="button" variant="gold" size="sm">
                  Add to Cart
                </Button>
                <Button href="/contact" variant="ghost" size="sm">
                  Ask About Terms
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widerx text-gold">
              Related beats
            </p>
            <h2 className="mt-3 font-display text-4xl leading-none text-bone md:text-5xl">
              Keep digging.
              <br />
              <span className="text-gold-gradient">The next one is close.</span>
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedBeats.map((relatedBeat) => (
            <BeatCard key={relatedBeat.id} beat={relatedBeat} />
          ))}
        </div>
      </Section>
    </>
  );
}
