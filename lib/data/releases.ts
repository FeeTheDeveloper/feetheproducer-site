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
    id: "throne-szn",
    title: "Throne SZN",
    artist: "Fee The Producer",
    type: "Beat Tape",
    releaseDate: "2025-09-12",
    description:
      "A 9-track instrumental tape engineered for late-night drives and locked-in studio sessions.",
    streamingLinks: [
      { platform: "Spotify", href: "#" },
      { platform: "Apple Music", href: "#" },
      { platform: "YouTube", href: "#" }
    ],
    featured: true
  },
  {
    id: "gold-standard",
    title: "Gold Standard",
    artist: "Fee The Producer x V.A.",
    type: "EP",
    releaseDate: "2025-04-04",
    description:
      "A producer-led EP showcasing collaborations with rising artists across the trap and R&B spectrum.",
    streamingLinks: [
      { platform: "Spotify", href: "#" },
      { platform: "Apple Music", href: "#" },
      { platform: "Tidal", href: "#" }
    ],
    featured: true
  },
  {
    id: "after-hours-vol-1",
    title: "After Hours Vol. 1",
    artist: "Fee The Producer",
    type: "Beat Tape",
    releaseDate: "2024-11-22",
    description:
      "Slow tempo, smooth keys, and 808s built for the after-hours bag — a producer's playground.",
    streamingLinks: [
      { platform: "Spotify", href: "#" },
      { platform: "SoundCloud", href: "#" },
      { platform: "YouTube", href: "#" }
    ],
    featured: true
  },
  {
    id: "battlefield-single",
    title: "Battlefield",
    artist: "Fee The Producer",
    type: "Single",
    releaseDate: "2024-07-04",
    description:
      "A high-energy drill instrumental built for visuals, sync, and trailer placement.",
    streamingLinks: [
      { platform: "Spotify", href: "#" },
      { platform: "Apple Music", href: "#" }
    ]
  },
  {
    id: "veteran-mode",
    title: "Veteran Mode",
    artist: "Fee The Producer",
    type: "Album",
    releaseDate: "2024-03-15",
    description:
      "A full-length project chronicling the journey from service to studio. 12 tracks, no skips.",
    streamingLinks: [
      { platform: "Spotify", href: "#" },
      { platform: "Apple Music", href: "#" },
      { platform: "YouTube", href: "#" },
      { platform: "Tidal", href: "#" }
    ]
  },
  {
    id: "smoke-signals",
    title: "Smoke Signals",
    artist: "Fee The Producer ft. TBA",
    type: "Single",
    releaseDate: "2023-10-31",
    description:
      "A hazy, atmospheric trap cut featuring a special guest verse.",
    streamingLinks: [
      { platform: "Spotify", href: "#" },
      { platform: "SoundCloud", href: "#" }
    ]
  }
];

export function getFeaturedReleases(limit = 3): Release[] {
  return RELEASES.filter((release) => release.featured).slice(0, limit);
}
