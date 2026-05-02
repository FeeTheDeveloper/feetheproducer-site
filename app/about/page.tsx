import type { Metadata } from "next";

import { BookingCta } from "@/components/sections/BookingCta";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.legalName} is a veteran-owned music production brand built for beats, releases, licensing, and artist collaboration.`
};

const PILLARS = [
  {
    title: "Beats",
    description:
      "Premium instrumentals built for artists who want to sound like the moment they're chasing — every pack mixed, mastered, and ready."
  },
  {
    title: "Releases",
    description:
      "Original projects pushed across every major streaming platform. Beat tapes, EPs, and singles with the FTP signature."
  },
  {
    title: "Licensing",
    description:
      "Transparent licensing tiers — from basic leases to full exclusive buyouts. Real rights, written clearly, no fine print."
  },
  {
    title: "Collaboration",
    description:
      "Custom production, artist collaborations, sync placements, and brand partnerships. Built loud, built premium."
  }
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Badge tone="gold">Veteran-Owned · {SITE.legalName}</Badge>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] text-bone md:text-6xl lg:text-7xl">
              Built in the studio.
              <br />
              <span className="text-gold-gradient">Pressed in gold.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/75 md:text-lg">
              {SITE.legalName} is a veteran-owned music production brand
              focused on the four things that move records: beats, releases,
              licensing, and artist collaboration. Every track that leaves the
              lab carries the same standard — clean, intentional, and built to
              hit.
            </p>
            <p className="mt-4 max-w-xl text-base text-white/65 md:text-lg">
              We work with independent artists, labels, and brands across trap,
              drill, hip-hop, R&B, and cinematic. Whether you need a one-off
              lease, a full exclusive buyout, or a custom production session —
              we ship it premium, every time.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/beats" variant="gold" size="lg">
                Shop Beats
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Work With Us
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-square">
              <div
                className="absolute inset-0 rounded-full bg-red-gradient opacity-30 blur-3xl"
                aria-hidden
              />
              <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-gold bg-ink shadow-gold">
                <div className="absolute inset-3 rounded-full border border-gold/40" />
                <div className="absolute inset-6 rounded-full bg-red-gradient opacity-90" />
                <div className="absolute inset-10 rounded-full border border-gold/30" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="font-display text-7xl tracking-widerx text-bone drop-shadow-[0_3px_0_rgba(0,0,0,0.45)] md:text-8xl">
                    FTP
                  </span>
                  <span className="mt-2 text-[10px] font-semibold uppercase tracking-widerx text-gold">
                    Fee The Producer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="panel">
        <SectionHeading
          eyebrow="What We Do"
          title={
            <>
              Four pillars.
              <br />
              <span className="text-gold-gradient">One standard.</span>
            </>
          }
          description="Everything FTP ships falls into one of four lanes — and every lane is held to the same premium standard."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, index) => (
            <article
              key={pillar.title}
              className="relative flex flex-col rounded-2xl border border-white/10 bg-ink/40 p-6 backdrop-blur transition hover:border-gold/40"
            >
              <span className="font-display text-5xl text-gold-gradient">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl text-bone">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">{pillar.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Badge tone="red">The Mission</Badge>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] text-bone md:text-5xl">
              Premium sound.
              <br />
              <span className="text-gold-gradient">Built with discipline.</span>
            </h2>
            <p className="mt-5 text-white/75">
              Discipline is the difference. Every beat, every release, every
              license — it's all run with the same focus we carried in service.
              Show up, do the work, ship it clean. That's the standard.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-ink/40 p-5">
              <p className="font-display text-4xl text-gold-gradient">100+</p>
              <p className="mt-1 text-xs uppercase tracking-widerx text-white/60">
                Beats in catalog
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-ink/40 p-5">
              <p className="font-display text-4xl text-gold-gradient">20+</p>
              <p className="mt-1 text-xs uppercase tracking-widerx text-white/60">
                Releases shipped
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-ink/40 p-5">
              <p className="font-display text-4xl text-gold-gradient">1M+</p>
              <p className="mt-1 text-xs uppercase tracking-widerx text-white/60">
                Streams across platforms
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-ink/40 p-5">
              <p className="font-display text-4xl text-gold-gradient">100%</p>
              <p className="mt-1 text-xs uppercase tracking-widerx text-white/60">
                Veteran-owned
              </p>
            </div>
          </div>
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
