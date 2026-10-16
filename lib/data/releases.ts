// Verified against the owner-selected Apple Music artist profile on 2026-10-13.
// Refresh using docs/CATALOG_SOURCE.json; preserve canonical titles and URLs.
export interface StreamingLink {
  platform: "apple";
  label: "Apple Music";
  url: string;
  primary: boolean;
}

export interface Release {
  slug: string;
  appleSongId: string;
  title: string;
  artist: string;
  explicit: boolean;
  type: "Single" | "EP" | "Album";
  releaseDate: string;
  status: "live";
  featured: boolean;
  genre: string;
  description: string;
  coverArt: string;
  links: StreamingLink[];
}

export const releases: Release[] = [
  {
    slug: "dont-call-it-nothing",
    appleSongId: "6823479049",
    title: "Don't Call It Nothing",
    artist: "Fee The Producer",
    explicit: true,
    type: "Single",
    releaseDate: "2026-10-15",
    status: "live",
    featured: false,
    genre: "R&B/Soul",
    description:
      "Don't Call It Nothing — R&B/Soul single by Fee The Producer. Listen on Apple Music.",
    coverArt: "/images/covers/apple-dont-call-it-nothing.jpg",
    links: [
      {
        platform: "apple",
        label: "Apple Music",
        url: "https://music.apple.com/us/album/dont-call-it-nothing/6823479048?i=6823479049",
        primary: true,
      },
    ],
  },
  {
    slug: "the-band-room",
    appleSongId: "6822257258",
    title: "The Band Room",
    artist: "Fee The Producer",
    explicit: false,
    type: "Single",
    releaseDate: "2026-10-12",
    status: "live",
    featured: true,
    genre: "Jazz",
    description:
      "The Band Room — Jazz single by Fee The Producer. Listen on Apple Music.",
    coverArt: "/images/covers/apple-the-band-room.jpg",
    links: [
      {
        platform: "apple",
        label: "Apple Music",
        url: "https://music.apple.com/us/album/the-band-room/6822257257?i=6822257258",
        primary: true,
      },
    ],
  },
  {
    slug: "neva-give-up",
    appleSongId: "6822143526",
    title: "Neva Give Up (feat. Dave Watson)",
    artist: "Fee The Producer",
    explicit: false,
    type: "Single",
    releaseDate: "2026-10-12",
    status: "live",
    featured: false,
    genre: "R&B/Soul",
    description:
      "Neva Give Up (feat. Dave Watson) — R&B/Soul single by Fee The Producer. Listen on Apple Music.",
    coverArt: "/images/covers/apple-neva-give-up.jpg",
    links: [
      {
        platform: "apple",
        label: "Apple Music",
        url: "https://music.apple.com/us/album/neva-give-up-feat-dave-watson/6822143525?i=6822143526",
        primary: true,
      },
    ],
  },
  {
    slug: "back-from-venus",
    appleSongId: "6820309022",
    title: "Back From Venus",
    artist: "Fee The Producer",
    explicit: true,
    type: "Single",
    releaseDate: "2026-10-06",
    status: "live",
    featured: false,
    genre: "Hip-Hop/Rap",
    description:
      "Back From Venus — Hip-Hop/Rap single by Fee The Producer. Listen on Apple Music.",
    coverArt: "/images/covers/apple-back-from-venus.jpg",
    links: [
      {
        platform: "apple",
        label: "Apple Music",
        url: "https://music.apple.com/us/album/back-from-venus/6820309021?i=6820309022",
        primary: true,
      },
    ],
  },
  {
    slug: "all-gas-no-breaks",
    appleSongId: "6806901864",
    title: "All Gas No Breaks (feat. Ray Nathan)",
    artist: "Fee The Producer",
    explicit: true,
    type: "Single",
    releaseDate: "2026-08-30",
    status: "live",
    featured: false,
    genre: "Hip-Hop/Rap",
    description:
      "All Gas No Breaks (feat. Ray Nathan) — Hip-Hop/Rap single by Fee The Producer. Listen on Apple Music.",
    coverArt: "/images/covers/apple-all-gas-no-breaks.jpg",
    links: [
      {
        platform: "apple",
        label: "Apple Music",
        url: "https://music.apple.com/us/album/all-gas-no-breaks-feat-ray-nathan/6806901863?i=6806901864",
        primary: true,
      },
    ],
  },
  {
    slug: "rolling",
    appleSongId: "6794165344",
    title: "Rolling (feat. Ray-Nathan)",
    artist: "Fee The Producer",
    explicit: true,
    type: "Single",
    releaseDate: "2026-07-23",
    status: "live",
    featured: false,
    genre: "Hip-Hop/Rap",
    description:
      "Rolling (feat. Ray-Nathan) — Hip-Hop/Rap single by Fee The Producer. Listen on Apple Music.",
    coverArt: "/images/covers/apple-rolling.jpg",
    links: [
      {
        platform: "apple",
        label: "Apple Music",
        url: "https://music.apple.com/us/album/rolling-feat-ray-nathan/6794165343?i=6794165344",
        primary: true,
      },
    ],
  },
];

export const featuredRelease =
  releases.find((release) => release.featured) ?? releases[0];

export function getReleaseBySlug(slug: string): Release | undefined {
  return releases.find((release) => release.slug === slug);
}
