import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";

const bioHighlights = [
  "Philadelphia-born musician shaped by soul and Neo-soul",
  "Composer, writer, drummer, and keys player",
  "Live instrumentation, jazz influence, and soul textures"
];

export function Bio() {
  return (
    <Section id="bio" tone="panel">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Artist Bio"
            title={
              <>
                Fee The Producer.
                <br />
                <span className="text-gold-gradient">Philadelphia in motion.</span>
              </>
            }
            description="A Philadelphia-born musician, composer, writer, drummer, and keys player shaped by soul tradition, musicianship, and authentic expression."
          />

          <div className="mt-8 space-y-4 text-sm text-white/72 md:text-base">
            <p>
              Fee The Producer is a Philadelphia-born musician, composer,
              writer, drummer, and keys player shaped by the city&apos;s rich soul
              tradition and the creative wave of the Neo-soul era. Coming up
              around elite musicians, live bands, studio sessions, and real
              instrumental craftsmanship, Fee developed a sound rooted in feel,
              discipline, musicianship, and authentic expression.
            </p>
            <p>
              His work carries the spirit of Philadelphia: soulful, sharp,
              rhythmic, and built from lived experience. As a composer and
              producer, Fee blends live instrumentation, jazz influence, soul
              textures, and modern production into music that speaks with both
              elegance and grit.
            </p>
            <p>
              His foundation on drums and keys gives the records a
              performance-driven quality, allowing each composition to move
              with rhythm, emotion, and intention.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {bioHighlights.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/about" variant="gold" size="md">
              Read Full About
            </Button>
            <Button href="/contact" variant="outline" size="md">
              Contact Fee
            </Button>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
          <div
            className="absolute -inset-6 -z-10 rounded-[40px] bg-stage-glow opacity-80 blur-2xl"
            aria-hidden
          />
          <div className="relative aspect-square overflow-hidden rounded-[28px] border border-gold/30 bg-ink shadow-panel">
            <Image
              src={SITE.images.bio}
              alt="Fee The Producer portrait"
              fill
              sizes="(min-width: 1024px) 28rem, (min-width: 768px) 24rem, 90vw"
              className="object-cover"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"
              aria-hidden
            />
            <div className="absolute left-5 top-5">
              <Badge tone="gold">Fee The Producer</Badge>
            </div>
            <figcaption className="absolute inset-x-5 bottom-5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-widerx text-white/75">
              <span>Sound. Vision. Impact.</span>
              <span className="text-gold">FTP</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </Section>
  );
}
