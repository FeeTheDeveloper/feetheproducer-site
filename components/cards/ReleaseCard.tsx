import Image from "next/image";
import Link from "next/link";

import { BeatPlayer } from "@/components/music/beat-player";
import { PlatformLinks } from "@/components/music/platform-links";
import { ReleaseCta } from "@/components/music/release-cta";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { formatFeaturing, type Release } from "@/lib/data/releases";

type ReleaseCardProps = {
  release: Release;
  className?: string;
};

export function ExplicitBadge({ className }: { className?: string }) {
  return (
    <span
      title="Explicit"
      aria-label="Explicit"
      className={cn(
        "inline-flex h-5 w-5 items-center justify-center rounded-[5px] border border-white/30 bg-white/10 text-[10px] font-bold leading-none text-white/85",
        className
      )}
    >
      E
    </span>
  );
}

export function ReleaseCard({ release, className }: ReleaseCardProps) {
  const featuring = formatFeaturing(release);
  const year = new Date(release.releaseDate).getFullYear();
  const isUpcoming = release.status === "presave";

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-ink-elevated/70 backdrop-blur transition-all duration-300 hover:border-gold/40 hover:shadow-panel",
        className
      )}
    >
      <Link
        href={`/releases/${release.slug}`}
        className="relative block aspect-square overflow-hidden bg-ink"
        aria-label={`${release.title} release page`}
      >
        <Image
          src={release.coverArt}
          alt={`${release.title} cover art`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widerx text-gold backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-glow" />
          {release.type} · {year}
        </span>
        {isUpcoming ? (
          <span className="absolute right-4 top-4 rounded-full bg-red-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-widerx text-white backdrop-blur">
            Coming Soon
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 font-display text-2xl leading-tight text-bone">
              {release.title}
              {release.explicit ? <ExplicitBadge /> : null}
            </h3>
            {featuring ? (
              <p className="mt-1 text-sm text-white/70">{featuring}</p>
            ) : null}
            <p className="mt-1 text-xs uppercase tracking-widerx text-gold/80">
              {release.role === "producer" && release.creditedArtist
                ? `${release.creditedArtist} · Produced by ${release.artist}`
                : release.artist}
            </p>
          </div>
          {release.featured ? <Badge tone="red">Featured</Badge> : null}
        </div>

        <p className="mt-3 text-sm text-white/70">{release.description}</p>

        {release.previewAudio ? (
          <BeatPlayer
            src={release.previewAudio}
            title="30-second preview"
            className="mt-5"
          />
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <ReleaseCta release={release} size="sm" />
          {release.videoUrl ? (
            <Button
              href={`/releases/${release.slug}#video`}
              variant="outline"
              size="sm"
            >
              Watch the Video
            </Button>
          ) : null}
        </div>

        {release.status === "live" && release.links.length > 0 ? (
          <PlatformLinks links={release.links} size="sm" className="mt-4" />
        ) : null}
      </div>
    </article>
  );
}
