import type { Metadata } from "next";
import Image from "next/image";

import { BookingCta } from "@/components/sections/BookingCta";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredRelease, releases } from "@/lib/data/releases";
import { SITE } from "@/lib/site";

function formatReleaseDay(input: string) {
  const date = new Date(`${input}T00:00:00Z`);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${month}.${day}`;
}

export const metadata: Metadata = {
  title: "About",
  description:
    "Fee The Producer is a Philadelphia-born musician, composer, writer, drummer, and keys player shaped by soul tradition, live musicianship, and authentic expression."
};

const focusAreas = [
  {
    title: "Philadelphia",
    description:
      "The sound is rooted in the city&apos;s soul tradition, rhythmic sharpness, and real lived experience."
  },
  {
    title: "Musicianship",
    description:
      "Built around live bands, studio sessions, instrumental craftsmanship, and years of performance discipline."
  },
  {
    title: "Composition",
    description:
      "Jazz influence, soul textures, live instrumentation, and modern production move together with intention."
  },
  {
    title: "Legacy",
    description:
      "Fee The Producer represents Philadelphia musicianship at its core: soul, composition, rhythm, and legacy in motion."
  }
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Badge tone="gold">Philadelphia / {SITE.legalName}</Badge>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] text-bone md:text-6xl lg:text-7xl">
              The artist behind
              <br />
              <span className="text-gold-gradient">Fee The Producer.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-white/75 md:text-lg">
              Fee The Producer is a Philadelphia-born musician, composer,
              writer, drummer, and keys player shaped by the city&apos;s rich soul
              tradition and the creative wave of the Neo-soul era. Coming up
              around elite musicians, live bands, studio sessions, and real
              instrumental craftsmanship, Fee developed a sound rooted in feel,
              discipline, musicianship, and authentic expression.
            </p>
            <p className="mt-4 max-w-2xl text-base text-white/65 md:text-lg">
              His work carries the spirit of Philadelphia: soulful, sharp,
              rhythmic, and built from lived experience. As a composer and
              producer, Fee blends live instrumentation, jazz influence, soul
              textures, and modern production into music that speaks with both
              elegance and grit.
            </p>
            <p className="mt-4 max-w-2xl text-base text-white/65 md:text-lg">
              His foundation on drums and keys gives the records a
              performance-driven quality, allowing each composition to move
              with rhythm, emotion, and intention.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/streaming" variant="gold" size="lg">
                Hear the Music
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Connect
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-square">
              <div
                className="absolute -inset-4 rounded-full bg-red-gradient opacity-30 blur-3xl"
                aria-hidden
              />
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-gold bg-ink shadow-gold">
                <Image
                  src={SITE.images.bio}
                  alt="Portrait of Fee The Producer"
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, (min-width: 768px) 24rem, 85vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-3 rounded-full border border-gold/40" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-gold/40 bg-ink-elevated px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widerx text-gold">
                Fee The Producer
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="panel">
        <SectionHeading
          eyebrow="Bio"
          title={
            <>
              Soul, rhythm,
              <br />
              <span className="text-gold-gradient">and lived expression.</span>
            </>
          }
          description="Philadelphia musicianship sits at the center of the work: performance, composition, feel, and discipline."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((item, index) => (
            <article
              key={item.title}
              className="relative flex flex-col rounded-2xl border border-white/10 bg-ink/40 p-6 backdrop-blur transition hover:border-gold/40"
            >
              <span className="font-display text-5xl text-gold-gradient">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl text-bone">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Badge tone="red">
              {featuredRelease.status === "presave"
                ? "New Single"
                : "Latest Release"}
            </Badge>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] text-bone md:text-5xl">
              {featuredRelease.title}
              <br />
              <span className="text-gold-gradient">
                {featuredRelease.type}.
              </span>
            </h2>
            <p className="mt-5 text-white/75">{featuredRelease.description}</p>
            <div className="mt-6">
              <Button
                href={`/streaming/${featuredRelease.slug}`}
                variant="gold"
                size="md"
              >
                Open the Release
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-ink/40 p-5">
              <p className="font-display text-4xl text-gold-gradient">
                {formatReleaseDay(featuredRelease.releaseDate)}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widerx text-white/60">
                Release date
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-ink/40 p-5">
              <p className="font-display text-4xl text-gold-gradient">
                {featuredRelease.type}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widerx text-white/60">
                Format
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-ink/40 p-5">
              <p className="font-display text-4xl text-gold-gradient">
                {releases.length}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widerx text-white/60">
                Records out
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-ink/40 p-5">
              <p className="font-display text-4xl text-gold-gradient">PHL</p>
              <p className="mt-1 text-xs uppercase tracking-widerx text-white/60">
                Home base
              </p>
            </div>
          </div>
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
