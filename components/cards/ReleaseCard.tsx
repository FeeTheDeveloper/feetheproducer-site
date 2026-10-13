import Link from "next/link";
import { ReleaseArtwork } from "@/components/music/ReleaseArtwork";
import { ArrowIcon } from "@/components/ui/Icons";
import type { Release } from "@/lib/data/releases";
export function ReleaseCard({ release }: { release: Release }) {
  return (
    <article className="release-card">
      <Link href={`/streaming/${release.slug}`} className="release-card-link">
        <div className="record-sleeve">
          <div className="record-peek" aria-hidden="true" />
          <ReleaseArtwork release={release} />
          <span className="record-open" aria-hidden="true">
            <ArrowIcon />
          </span>
        </div>
        <div className="release-card-meta">
          <span className="eyebrow">
            {release.type} · {release.releaseDate.slice(0, 4)}
          </span>
          <h3>
            {release.title}
            {release.explicit && (
              <span className="explicit" aria-label="Explicit">
                E
              </span>
            )}
          </h3>
          <p>
            {release.artist} · {release.genre}
          </p>
        </div>
      </Link>
    </article>
  );
}
