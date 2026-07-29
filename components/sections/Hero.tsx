import Image from "next/image";

import { ExplicitBadge } from "@/components/cards/ReleaseCard";
import { BeatPlayer } from "@/components/music/beat-player";
import { PlatformLinks } from "@/components/music/platform-links";
import { ReleaseCta } from "@/components/music/release-cta";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  featuredRelease,
  formatFeaturing,
  liveReleases,
  releases
} from "@/lib/data/releases";

function formatReleaseDate(input: string) {
  return new Date(`${input}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export function Hero() {
  const release = featuredRelease;
  const featuring = formatFeaturing(release);
  const isUpcoming = release.status === "presave";

  return (
    <section className="relative overflow-hidden pt-12 md:pt-20">
      <div className="absolute inset-0 -z-10 bg-stage-glow" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(208,0,0,0.35)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="gold">Veteran-Owned Artist</Badge>
              <Badge tone="red">
                {isUpcoming ? "New Single" : "Latest Release"}: {release.title}
              </Badge>
            </div>

            <h1 className="mt-6 font-display text-5xl leading-[0.92] text-bone sm:text-6xl md:text-7xl lg:text-[80px]">
              <span className="flex items-center gap-4">
                {release.title}
                {release.explicit ? (
                  <ExplicitBadge className="h-8 w-8 rounded-lg text-base md:h-10 md:w-10 md:text-lg" />
                ) : null}
              </span>
              {featuring ? (
                <span className="mt-3 block text-2xl leading-tight text-gold-gradient sm:text-3xl md:text-4xl">
                  {featuring}
                </span>
              ) : null}
            </h1>

            <p className="mt-6 max-w-xl text-base text-white/75 md:text-lg">
              {release.description}
              {isUpcoming
                ? ` Dropping ${formatReleaseDate(release.releaseDate)}.`
                : ""}
            </p>

            {release.previewAudio ? (
              <BeatPlayer
                src={release.previewAudio}
                title={`${release.title} — 30-second preview`}
                size="lg"
                className="mt-8 max-w-xl"
              />
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ReleaseCta release={release} size="lg" />
              <Button
                href={`/streaming/${release.slug}`}
                variant="outline"
                size="lg"
              >
                Release Details
              </Button>
            </div>

            {release.status === "live" && release.links.length > 0 ? (
              <PlatformLinks links={release.links} className="mt-6" />
            ) : null}

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-widerx text-white/50">
                  Records
                </dt>
                <dd className="mt-1 font-display text-2xl text-gold">
                  {releases.length}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widerx text-white/50">
                  Streaming Now
                </dt>
                <dd className="mt-1 font-display text-2xl text-gold">
                  {liveReleases.length}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widerx text-white/50">
                  Brand
                </dt>
                <dd className="mt-1 font-display text-2xl text-gold">FTP</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-square">
              <div
                className="absolute inset-0 rounded-[36px] bg-red-gradient opacity-40 blur-3xl animate-pulse-glow"
                aria-hidden
              />
              <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-gold/25 bg-ink/80 shadow-gold">
                <Image
                  src={release.coverArt}
                  alt={`${release.title} cover art`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, (min-width: 768px) 24rem, 85vw"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute -bottom-4 left-1/2 h-2 w-3/4 -translate-x-1/2 rounded-full bg-gold/30 blur-2xl"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 overflow-hidden border-y border-white/10 bg-ink/60 py-4">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="flex shrink-0 items-center gap-12">
              {[
                "Fee The Producer",
                "Veteran-Owned",
                "Independent Artist",
                ...releases.map((item) => item.title),
                "Philadelphia Soul",
                "Custom Production",
                "Built With Discipline"
              ].map((item) => (
                <span
                  key={`${idx}-${item}`}
                  className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widerx text-white/50"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
