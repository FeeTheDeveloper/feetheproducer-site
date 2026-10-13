import Image from "next/image";
import type { Release } from "@/lib/data/releases";
import { SoundIcon } from "@/components/ui/Icons";

export function ReleaseArtwork({
  release,
  priority = false,
}: {
  release: Release;
  priority?: boolean;
}) {
  if (release.coverArt)
    return (
      <div className="release-artwork">
        <Image
          src={release.coverArt}
          alt={`${release.title} cover art`}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 44vw, 28vw"
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  return (
    <div
      className={`release-artwork designed-sleeve sleeve-${release.slug}`}
      role="img"
      aria-label={`${release.title} — Fee The Producer branded record sleeve`}
    >
      <span className="sleeve-brand">FEE THE PRODUCER</span>
      <div className="sleeve-grooves" aria-hidden="true" />
      <div className="sleeve-title">
        <SoundIcon />
        <span>{release.title}</span>
      </div>
      <span className="sleeve-footer">
        {release.type} <span>{release.releaseDate.slice(0, 4)}</span>
      </span>
    </div>
  );
}
