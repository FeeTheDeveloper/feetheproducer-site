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
    releaseDate: "2026-07-15", // TODO: replace with the confirmed DistroKid release date once processing clears
    status: "live", // video is live now
    featured: false,
    description:
      "Produced by Fee The Producer. Official video out now.",
    coverArt: "/images/covers/koolin-it.png",
    previewAudio: "/audio/koolin-it-preview.mp3",
    videoUrl: "https://www.youtube.com/embed/0CQak9UPKDo",
    // HyperFollow auto-routes to every store as DistroKid processing clears.
    presaveUrl: "https://distrokid.com/hyperfollow/feetheproducer1/koolin-it/",
    links: [],
  },
  {
    slug: "im-gone",
    title: "I'm Gone",
    artist: "Fee The Producer",
    role: "artist",
    featuring: ["Luh Semi", "A.P."],
    explicit: true,
    type: "Single",
    releaseDate: "2026-07-15",
    status: "presave", // flip to "live" on release day and populate links[]
    featured: true,
    description:
      "The new single from Fee The Producer featuring Luh Semi and A.P. — out July 15, 2026.",
    coverArt: "/images/covers/im-gone.png",
    // DistroKid hyperfollow is the universal CTA: it auto-routes to every store
    // as they go live, so no manual link-chasing on release day.
    presaveUrl: "", // TODO: grab from DistroKid > Promote
    previewAudio: "/audio/im-gone-preview.mp3",
    links: [],
  },
  {
    slug: "l-r-a",
    title: "L.R.A.",
    artist: "Fee The Producer",
    role: "artist",
    type: "Single",
    releaseDate: "2026-05-14",
    status: "live",
    featured: false,
    description:
      "A jazz-rooted single built on live feel — drums, keys, and Philadelphia soul tradition.",
    coverArt: "/images/covers/fee_the_producer.png",
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
        url: "https://open.spotify.com/artist/6eFd541mqXgVpKOiCHJq2y",
      },
      {
        platform: "youtube",
        label: "YouTube Music",
        url: "https://music.youtube.com/channel/UCH7T-ComR_PAbSH9cbJ8r5Q",
      },
      {
        platform: "amazon",
        label: "Amazon Music",
        url: "https://music.amazon.com/albums/B0H1XS65L3",
      },
    ],
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
