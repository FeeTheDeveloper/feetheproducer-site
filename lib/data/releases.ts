export type ReleaseStatus = "presave" | "live";

export interface StreamingLink {
  platform: "apple" | "spotify" | "youtube" | "amazon";
  label: string;
  url: string;
  primary?: boolean;
}

export interface Release {
  slug: string;
  title: string;
  artist: string;
  role: "artist" | "producer"; // producer = placement credit, framed "Produced by FTP"
  creditedArtist?: string; // primary artist when role === "producer"
  featuring?: string[];
  explicit?: boolean;
  type: "Single" | "EP" | "Album";
  releaseDate: string; // ISO date
  status: ReleaseStatus;
  featured: boolean; // drives homepage hero
  description: string;
  coverArt: string;
  previewAudio?: string; // 30s clip in /public/audio — never the full unreleased track
  videoUrl?: string; // YouTube embed URL
  presaveUrl?: string; // DistroKid hyperfollow link pre-release
  appleEmbedUrl?: string;
  links: StreamingLink[];
}

export const releases: Release[] = [
  {
    slug: "koolin-it",
    title: "Koolin It",
    artist: "Fee The Producer",
    role: "artist",
    featuring: ["Don Twan", "Lab Spitta", "Luh Semi"],
    type: "Single",
    releaseDate: "2026-07-15",
    status: "live",
    featured: true,
    description:
      "Koolin It — the official single from Fee The Producer featuring Don Twan, Lab Spitta & Luh Semi. Official video out now on YouTube. Stream on Spotify and all major platforms.",
    coverArt: "/images/covers/koolin-it-cover.png",
    videoUrl: "https://www.youtube.com/embed/0CQak9UPKDo",
    presaveUrl: "https://distrokid.com/hyperfollow/feetheproducer1/koolin-it/",
    links: [
      {
        platform: "spotify",
        label: "Spotify",
        url: "https://open.spotify.com/track/5BglDixMDLH1cNn7jiRt89",
        primary: true,
      },
      {
        platform: "youtube",
        label: "YouTube",
        url: "https://www.youtube.com/watch?v=0CQak9UPKDo",
      },
    ],
  },
  {
    slug: "l-r-a",
    title: "L.R.A.",
    artist: "Fee The Producer",
    role: "artist",
    type: "Single",
    releaseDate: "2026-05-14",
    status: "live",
    featured: true,
    description:
      "A jazz-rooted single built on live feel — drums, keys, and Philadelphia soul tradition.",
    coverArt: "/images/covers/lra-cover.png",
    previewAudio: "/audio/L.R.A..m4a",
    presaveUrl: "https://distrokid.com/hyperfollow/feetheproducer1/lra-2/",
    appleEmbedUrl: "https://embed.music.apple.com/us/song/l-r-a/6769877047",
    links: [
      {
        platform: "apple",
        label: "Apple Music",
        url: "https://music.apple.com/us/song/l-r-a/6769877047",
        primary: true,
      },
      {
        platform: "spotify",
        label: "Spotify",
        url: "https://open.spotify.com/search/Fee%20The%20Producer%20L.R.A",
      },
      {
        platform: "youtube",
        label: "YouTube",
        url: "https://www.youtube.com/results?search_query=Fee+The+Producer+L.R.A",
      },
      {
        platform: "amazon",
        label: "Amazon Music",
        url: "https://music.amazon.com/albums/B0H1XS65L3",
      },
    ],
  },
  {
    slug: "im-gone",
    title: "I'm Gone",
    artist: "Fee The Producer",
    role: "artist",
    featuring: ["Luh Semi", "A.P 223"],
    explicit: true,
    type: "Single",
    releaseDate: "2026-07-29",
    status: "live",
    featured: false,
    description:
      "I'm Gone — Fee The Producer links up with Luh Semi & A.P 223 for the official single. Streaming now everywhere.",
    coverArt: "/images/covers/im_gone_cover.png",
    presaveUrl:
      "https://distrokid.com/hyperfollow/feetheproducer/im-gone-feat-luh-semi--ap-223/",
    links: [],
  },
  {
    slug: "rolling",
    title: "Rolling",
    artist: "Fee The Producer",
    role: "artist",
    featuring: ["Ray Nathan"],
    type: "Single",
    // Placeholder release date — update to the actual date if it differs.
    releaseDate: "2026-07-29",
    status: "live",
    featured: false,
    description:
      "Rolling — Fee The Producer links up with Ray Nathan for the official single. Streaming now everywhere.",
    coverArt: "/images/covers/rolling_cover.png",
    presaveUrl: "https://distrokid.com/hyperfollow/feetheproducer1/rolling/",
    links: [],
  },
];

export const featuredRelease = releases.find((r) => r.featured) ?? releases[0];
export const liveReleases = releases.filter((r) => r.status === "live");
export const upcomingReleases = releases.filter((r) => r.status === "presave");
export const artistReleases = releases.filter((r) => r.role === "artist");
export const placements = releases.filter((r) => r.role === "producer");

export function getReleaseBySlug(slug: string): Release | undefined {
  return releases.find((release) => release.slug === slug);
}

export function formatFeaturing(release: Release): string | null {
  if (!release.featuring || release.featuring.length === 0) {
    return null;
  }

  if (release.featuring.length === 1) {
    return `feat. ${release.featuring[0]}`;
  }

  return `feat. ${release.featuring.slice(0, -1).join(", ")} & ${
    release.featuring[release.featuring.length - 1]
  }`;
}
