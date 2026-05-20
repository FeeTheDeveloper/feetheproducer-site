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
    releaseDate: "2026-05-20",
    description:
      "Active release rollout for Fee The Producer, wired for Apple Music, Spotify, and Amazon Music from one command-center source of truth.",
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
  },
  {
    id: "throne-szn",
    title: "Throne SZN",
    artist: "Fee The Producer",
    type: "Beat Tape",
    releaseDate: "2025-09-12",
    description:
      "A 9-track instrumental tape engineered for late-night drives and locked-in studio sessions.",
    streamingLinks: [
      {
        platform: "spotify",
        label: "Listen on Spotify",
        url: "#",
        isPrimary: false
      },
      {
        platform: "apple_music",
        label: "Listen on Apple Music",
        url: "#",
        isPrimary: true
      },
      {
        platform: "youtube_music",
        label: "Listen on YouTube Music",
        url: "#",
        isPrimary: false
      }
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
      {
        platform: "spotify",
        label: "Listen on Spotify",
        url: "#",
        isPrimary: true
      },
      {
        platform: "apple_music",
        label: "Listen on Apple Music",
        url: "#",
        isPrimary: false
      },
      {
        platform: "tidal",
        label: "Listen on Tidal",
        url: "#",
        isPrimary: false
      }
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
      "Slow tempo, smooth keys, and 808s built for the after-hours bag, a producer playground after midnight.",
    streamingLinks: [
      {
        platform: "spotify",
        label: "Listen on Spotify",
        url: "#",
        isPrimary: true
      },
      {
        platform: "soundcloud",
        label: "Listen on SoundCloud",
        url: "#",
        isPrimary: false
      },
      {
        platform: "youtube_music",
        label: "Listen on YouTube Music",
        url: "#",
        isPrimary: false
      }
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
      {
        platform: "spotify",
        label: "Listen on Spotify",
        url: "#",
        isPrimary: true
      },
      {
        platform: "apple_music",
        label: "Listen on Apple Music",
        url: "#",
        isPrimary: false
      }
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
      {
        platform: "spotify",
        label: "Listen on Spotify",
        url: "#",
        isPrimary: true
      },
      {
        platform: "apple_music",
        label: "Listen on Apple Music",
        url: "#",
        isPrimary: false
      },
      {
        platform: "youtube_music",
        label: "Listen on YouTube Music",
        url: "#",
        isPrimary: false
      },
      {
        platform: "tidal",
        label: "Listen on Tidal",
        url: "#",
        isPrimary: false
      }
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
      {
        platform: "spotify",
        label: "Listen on Spotify",
        url: "#",
        isPrimary: true
      },
      {
        platform: "soundcloud",
        label: "Listen on SoundCloud",
        url: "#",
        isPrimary: false
      }
    ]
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
