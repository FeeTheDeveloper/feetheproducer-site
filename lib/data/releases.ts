export type ReleaseType = "Single" | "EP" | "Album" | "Beat Tape" | "Collab";

export type StreamingLink = {
  platform: "Spotify" | "Apple Music" | "YouTube" | "SoundCloud" | "Tidal";
  href: string;
};

export type Release = {
  id: string;
  title: string;
  artist: string;
  type: ReleaseType;
  releaseDate: string;
  description: string;
  streamingLinks: StreamingLink[];
  featured?: boolean;
};

export const RELEASES: Release[] = [
  {
    id: "l-r-a",
    title: "L.R.A",
    artist: "Fee The Producer",
    type: "Single",
    releaseDate: "2026-05-14",
    description:
      "A jazz-rooted single built on live feel — drums, keys, and Philadelphia soul tradition.",
    streamingLinks: [
      { platform: "Apple Music", href: "https://music.apple.com/us/song/l-r-a/6769877047" },
      { platform: "Spotify", href: "https://open.spotify.com/artist/6eFd541mqXgVpKOiCHJq2y" },
      { platform: "YouTube", href: "https://www.youtube.com/results?search_query=Fee+The+Producer+L.R.A" }
    ],
    featured: true
  },
  {
    id: "koolin-it",
    title: "Koolin It",
    artist: "Fee The Producer",
    type: "Single",
    releaseDate: "2026-07-15",
    description:
      "Produced by Fee The Producer. Official video out now.",
    streamingLinks: [
      { platform: "Spotify", href: "https://open.spotify.com/track/5BglDixMDLH1cNn7jiRt89" },
      { platform: "YouTube", href: "https://www.youtube.com/watch?v=0CQak9UPKDo" }
    ],
    featured: true
  }
];

export function getFeaturedReleases(limit = 3): Release[] {
  return RELEASES.filter((release) => release.featured).slice(0, limit);
}
