import { createStreamingLink } from "@/lib/music";
import type { MusicRelease, StreamingPlatformLink } from "@/lib/types/music";

type ReleaseSeed = Omit<MusicRelease, "streamingLinks"> & {
  streamingLinks: Array<
    Pick<StreamingPlatformLink, "platform" | "label" | "url" | "isPrimary"> &
      Partial<
        Pick<
          StreamingPlatformLink,
          "active" | "createdAt" | "icon"
        >
      >
  >;
};

const releaseSeeds: ReleaseSeed[] = [
  {
    id: "lra",
    title: "L.R.A.",
    artist: "Fee The Producer",
    type: "Single",
    releaseDate: "2026-05-14",
    description:
      "L.R.A. - Single is released under 12310735 Records DK in the Jazz genre and credits alfreddie postell as composer.",
    embed: {
      provider: "apple_music",
      title: "L.R.A. by Fee The Producer on Apple Music",
      src: "https://embed.music.apple.com/us/song/l-r-a/6769877047",
      height: 175
    },
    streamingLinks: [
      {
        platform: "apple_music",
        label: "Listen on Apple Music",
        url: "https://music.apple.com/us/song/l-r-a/6769877047",
        isPrimary: true
      },
      {
        platform: "spotify",
        label: "Follow on Spotify",
        url: "https://open.spotify.com/artist/6eFd541mqXgVpKOiCHJq2y?si=qYBlUAg3QXW8T6UtVSszUw",
        isPrimary: false
      },
      {
        platform: "amazon_music",
        label: "Listen on Amazon Music",
        url: "https://music.amazon.com/albums/B0H1XS65L3?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_dKyJYRaayvvlPhmBki0phQay1",
        isPrimary: false
      }
    ],
    featured: true
  }
];

export const RELEASES: MusicRelease[] = releaseSeeds.map((release) => ({
  ...release,
  streamingLinks: release.streamingLinks.map((link) =>
    createStreamingLink({
      ...link,
      id: `${release.id}-${link.platform}`
    })
  )
}));

export function getFeaturedReleases(limit = 3): MusicRelease[] {
  return RELEASES.filter((release) => release.featured).slice(0, limit);
}

export function getReleaseById(id: string): MusicRelease | undefined {
  return RELEASES.find((release) => release.id === id);
}
