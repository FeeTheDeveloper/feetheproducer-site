import type { Metadata } from "next";
import Link from "next/link";

import { EmailCapture } from "@/components/forms/email-capture";
import { VideoEmbed } from "@/components/music/video-embed";
import { Credits } from "@/components/sections/Credits";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatFeaturing, getReleaseBySlug } from "@/lib/data/releases";

export const metadata: Metadata = {
  title: "Beats & Custom Production",
  description:
    "Custom production and placements from Fee The Producer — live instrumentation, Philadelphia soul, and records built from scratch for your project."
};

const services = [
  {
    title: "Custom Production",
    description:
      "Records built from scratch around your voice — live drums, keys, and arrangement, not loop-pack leftovers."
  },
  {
    title: "Placements",
    description:
      "Artist and label placements with production credit, from single records to full projects."
  },
  {
    title: "Sync & Brand",
    description:
      "Film, TV, ad campaigns, and brand work with sync-ready paperwork and fast turnaround."
  }
];

export default function BeatsPage() {
  const proofOfWork = getReleaseBySlug("koolin-it");
  const featuring = proofOfWork ? formatFeaturing(proofOfWork) : null;

  return (
    <>
      <Section className="pt-24 md:pt-32">
        <SectionHeading
          eyebrow="Custom Production"
          title={
            <>
              Production built
              <br />
              <span className="text-gold-gradient">for your record.</span>
            </>
          }
          description="Custom production and placements from Fee The Producer — live instrumentation, jazz-rooted arrangement, and Philadelphia soul, shaped around your sound."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 transition hover:border-gold/35"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widerx text-gold">
                {service.title}
              </p>
              <p className="mt-3 text-sm text-white/70">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="gold" size="md">
            Start the Brief
          </Button>
          <Button href="/releases" variant="outline" size="md">
            Hear the Records
          </Button>
        </div>
      </Section>

      {proofOfWork?.videoUrl ? (
        <Section tone="ember" className="pt-0">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Proof of Work"
              title={
                <>
                  {proofOfWork.title}
                  <br />
                  <span className="text-gold-gradient">
                    Produced by Fee The Producer.
                  </span>
                </>
              }
              description={
                featuring
                  ? `${featuring} — the official video, produced end to end by Fee The Producer.`
                  : "The official video, produced end to end by Fee The Producer."
              }
            />
            <Link
              href={`/releases/${proofOfWork.slug}`}
              className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widerx text-gold hover:underline md:self-end"
            >
              Open release page
              <span aria-hidden>-&gt;</span>
            </Link>
          </div>

          <VideoEmbed
            src={proofOfWork.videoUrl}
            title={`${proofOfWork.title} — official video`}
            className="mt-12"
          />
        </Section>
      ) : null}

      <Credits />

      <Section className="pt-0">
        <EmailCapture />
      </Section>
    </>
  );
}
