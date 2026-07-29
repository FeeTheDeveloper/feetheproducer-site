import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ExplicitBadge } from "@/components/cards/ReleaseCard";
import { AppleEmbed } from "@/components/music/apple-embed";
import { BeatPlayer } from "@/components/music/beat-player";
import { PlatformLinks } from "@/components/music/platform-links";
import { ReleaseCta } from "@/components/music/release-cta";
import { VideoEmbed } from "@/components/music/video-embed";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  formatFeaturing,
  getReleaseBySlug,
  releases
} from "@/lib/data/releases";
import { SITE } from "@/lib/site";

type ReleasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatReleaseDate(input: string) {
  return new Date(`${input}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export function generateStaticParams() {
  return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({
  params
}: ReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);

  if (!release) {
    return {
      title: "Release Not Found"
    };
  }

  const featuring = formatFeaturing(release);
  const title = featuring
    ? `${release.title} (${featuring})`
    : release.title;
  const description = release.description;
  const coverUrl = `${SITE.url}${release.coverArt}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE.url}/streaming/${release.slug}`
    },
    openGraph: {
      type: "music.song",
      title: `${title} | ${release.artist}`,
      description,
      url: `${SITE.url}/streaming/${release.slug}`,
      images: [
        {
          url: coverUrl,
          width: 1024,
          height: 1024,
          alt: `${release.title} cover art`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${release.artist}`,
      description,
      images: [coverUrl]
    }
  };
}

export default async function ReleasePage({ params }: ReleasePageProps) {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);

  if (!release) {
    notFound();
  }

  const featuring = formatFeaturing(release);
  const isUpcoming = release.status === "presave";

  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-ink-elevated/80 shadow-panel">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={release.coverArt}
                alt={`${release.title} cover art`}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0)_0%,rgba(5,5,5,0.25)_60%,rgba(5,5,5,0.85)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-widerx text-gold">
                  {release.type} · {formatReleaseDate(release.releaseDate)}
                </p>
                <h1 className="mt-3 flex items-center gap-3 font-display text-5xl leading-none text-bone md:text-6xl">
                  {release.title}
                  {release.explicit ? (
                    <ExplicitBadge className="h-7 w-7 rounded-md text-sm" />
                  ) : null}
                </h1>
                {featuring ? (
                  <p className="mt-2 text-base text-white/80 md:text-lg">
                    {featuring}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-gold/20 bg-white/[0.03] p-6 shadow-panel md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={isUpcoming ? "red" : "gold"}>
                {isUpcoming ? "Coming Soon" : "Streaming Now"}
              </Badge>
              {release.featured ? <Badge tone="gold">Featured</Badge> : null}
            </div>

            <h2 className="mt-4 font-display text-4xl leading-none text-bone md:text-5xl">
              {isUpcoming ? (
                <>
                  Out {formatReleaseDate(release.releaseDate)}.
                  <br />
                  <span className="text-gold-gradient">Lock it in early.</span>
                </>
              ) : (
                <>
                  Press play.
                  <br />
                  <span className="text-gold-gradient">Pick your platform.</span>
                </>
              )}
            </h2>

            <p className="mt-4 max-w-2xl text-sm text-white/72 md:text-base">
              {release.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-ink/60 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widerx text-white/45">
                  {release.role === "producer" ? "Produced by" : "Artist"}
                </p>
                <p className="mt-2 text-sm font-semibold text-bone">
                  {release.role === "producer" && release.creditedArtist
                    ? `${release.creditedArtist} · ${release.artist}`
                    : release.artist}
                </p>
              </div>
              {featuring ? (
                <div className="rounded-2xl border border-white/10 bg-ink/60 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widerx text-white/45">
                    Featuring
                  </p>
                  <p className="mt-2 text-sm font-semibold text-bone">
                    {release.featuring?.join(", ")}
                  </p>
                </div>
              ) : null}
            </div>

            {release.previewAudio ? (
              <BeatPlayer
                src={release.previewAudio}
                title="30-second preview"
                size="lg"
                className="mt-6"
              />
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ReleaseCta release={release} size="md" />
              {release.videoUrl ? (
                <Button href="#video" variant="outline" size="md">
                  Watch the Video
                </Button>
              ) : null}
            </div>

            {release.status === "live" && release.links.length > 0 ? (
              <PlatformLinks links={release.links} className="mt-6" />
            ) : null}

            {release.appleEmbedUrl ? (
              <AppleEmbed
                src={release.appleEmbedUrl}
                title={`${release.title} by ${release.artist} on Apple Music`}
                className="mt-6"
              />
            ) : null}
          </div>
        </div>
      </Section>

      {release.videoUrl ? (
        <Section id="video" className="pt-0">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widerx text-gold">
                Official Video
              </p>
              <h2 className="mt-3 font-display text-4xl leading-none text-bone md:text-5xl">
                {release.title}
                <br />
                <span className="text-gold-gradient">on screen.</span>
              </h2>
            </div>
          </div>

          <VideoEmbed
            src={release.videoUrl}
            title={`${release.title} — official video`}
            className="mt-10"
          />
        </Section>
      ) : null}
    </>
  );
}
