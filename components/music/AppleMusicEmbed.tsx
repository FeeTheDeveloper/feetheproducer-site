import type { Release } from "@/lib/data/releases";

export function AppleMusicEmbed({
  release,
}: {
  release: Pick<Release, "artist" | "embedUrl" | "title">;
}) {
  return (
    <iframe
      className="apple-music-embed"
      title={`Listen to ${release.title} by ${release.artist} on Apple Music`}
      allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
      frameBorder="0"
      height="175"
      loading="lazy"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
      src={release.embedUrl}
    />
  );
}
