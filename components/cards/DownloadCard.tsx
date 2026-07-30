import Image from "next/image";

import { BeatPlayer } from "@/components/music/beat-player";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { formatDownloadFeaturing, type DownloadTrack } from "@/lib/data/downloads";

type DownloadCardProps = {
  track: DownloadTrack;
  className?: string;
};

export function DownloadCard({ track, className }: DownloadCardProps) {
  const featuring = formatDownloadFeaturing(track);
  const purchaseUrl =
    track.purchaseUrl ?? (track.priceCents ? `/api/checkout/${track.slug}` : undefined);

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
        {track.price ? (
          <span className="absolute right-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-widerx text-ink backdrop-blur">
            {track.price}
          </span>
        ) : null}
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
          {purchaseUrl ? (
            track.purchaseUrl ? (
              <Button href={track.purchaseUrl} variant="gold" size="sm" external>
                Purchase &amp; Download
              </Button>
            ) : (
              <a
                href={purchaseUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold uppercase tracking-widerx text-ink shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Purchase &amp; Download
              </a>
            )
          ) : (
            <a
              href={track.audioSrc}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-white/[0.02] px-4 py-2 text-xs font-semibold uppercase tracking-widerx text-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:text-gold-warm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="h-4 w-4 fill-current"
              >
                <path d="M12 16l-5-5 1.41-1.41L11 13.17V4h2v9.17l2.59-2.58L17 11l-5 5zm-7 4h14v-2H5v2z" />
              </svg>
              Download
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
