import { cn } from "@/lib/cn";
import type { MusicRelease } from "@/lib/types/music";

type ReleaseEmbedProps = {
  release: MusicRelease;
  className?: string;
};

export function ReleaseEmbed({ release, className }: ReleaseEmbedProps) {
  if (!release.embed) {
    return null;
  }

  return (
    <section
      className={cn(
        "rounded-[28px] border border-white/8 bg-white/[0.03] p-5",
        className
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-widerx text-gold/70">
        Featured Player
      </p>
      <h3 className="mt-3 text-xl text-bone">Apple Music embed</h3>
      <p className="mt-2 text-sm text-white/62">
        Direct player for the current live release.
      </p>

      <div className="mt-4 w-full max-w-[660px] overflow-hidden rounded-[20px] border border-white/10 bg-ink/70 p-3">
        <iframe
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          className="block h-[175px] w-full rounded-[10px] border-0"
          height={release.embed.height ?? 175}
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src={release.embed.src}
          title={release.embed.title}
        />
      </div>
    </section>
  );
}
