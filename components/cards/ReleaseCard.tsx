import type { Release } from "@/lib/data/releases";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

type ReleaseCardProps = {
  release: Release;
  className?: string;
};

const platformLabel: Record<string, string> = {
  Spotify: "Spotify",
  "Apple Music": "Apple",
  YouTube: "YouTube",
  SoundCloud: "SoundCloud",
  Tidal: "Tidal"
};

function formatDate(input: string) {
  try {
    return new Date(input).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return input;
  }
}

export function ReleaseCard({ release, className }: ReleaseCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-ink-elevated/70 backdrop-blur transition-all duration-300 hover:border-gold/40 hover:shadow-panel",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-red-gradient opacity-90" />
        <div className="absolute inset-0 bg-stage-glow mix-blend-screen" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-gold bg-ink/70 backdrop-blur md:h-40 md:w-40">
            <span className="absolute inset-2 rounded-full border border-gold/40" />
            <span className="font-display text-3xl tracking-widerx text-gold md:text-4xl">
              FTP
            </span>
          </div>
        </div>
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widerx text-gold backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-glow" />
          {release.type}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widerx text-white/80 backdrop-blur">
          {formatDate(release.releaseDate)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl leading-tight text-bone">
          {release.title}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-widerx text-gold/80">
          {release.artist}
        </p>
        <p className="mt-3 text-sm text-white/70">{release.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {release.streamingLinks.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widerx text-white/80 transition hover:border-gold/60 hover:bg-gold/10 hover:text-gold"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {platformLabel[link.platform] ?? link.platform}
            </a>
          ))}
        </div>

        {release.featured ? (
          <div className="mt-5">
            <Badge tone="red">Featured</Badge>
          </div>
        ) : null}
      </div>
    </article>
  );
}
