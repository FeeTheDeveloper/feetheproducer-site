import Image from "next/image";

import { BeatPlayer } from "@/components/music/beat-player";
import { cn } from "@/lib/cn";
import { formatDownloadFeaturing, type DownloadTrack } from "@/lib/data/downloads";

type DownloadCardProps = {
  track: DownloadTrack;
  displayPrice: string;
  className?: string;
};

export function DownloadCard({ track, displayPrice, className }: DownloadCardProps) {
  const featuring = formatDownloadFeaturing(track);
  const canCheckout = Boolean(track.stripePriceId);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-ink-elevated/70 backdrop-blur transition-all duration-300 hover:border-gold/40 hover:shadow-panel",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-ink">
        <Image
          src={track.coverArt}
          alt={`${track.title} cover art`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-widerx text-ink backdrop-blur">
          {displayPrice}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl leading-tight text-bone">
          {track.title}
        </h3>
        {featuring ? (
          <p className="mt-1 text-sm text-white/70">{featuring}</p>
        ) : null}
        <p className="mt-1 text-xs uppercase tracking-widerx text-gold/80">
          {track.artist}
        </p>

        <BeatPlayer
          src={track.audioSrc}
          title="Preview"
          className="mt-5"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {canCheckout ? (
            <a
              href={`/api/checkout?slug=${track.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold uppercase tracking-widerx text-ink transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Buy &amp; Download — {displayPrice}
            </a>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold uppercase tracking-widerx text-white/40">
              Checkout Coming Soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
