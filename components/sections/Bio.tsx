import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/about" variant="gold" size="md">
              Read Full About
            </Button>
            <Button href="/contact" variant="outline" size="md">
              Contact Fee
            </Button>
          </div>
        </div>

        <div className="rounded-[32px] border border-gold/15 bg-ink-elevated/75 p-6 shadow-panel md:p-8">
          <Badge tone="gold">Fee The Producer</Badge>
          <div className="mt-6 space-y-4">
            {bioHighlights.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <span className="mt-1.5 h-2 w-2 rounded-full bg-gold" />
                <p className="text-sm text-white/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
