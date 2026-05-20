import type {
  MusicRelease,
  StreamingPlatform,
  StreamingPlatformLink
} from "@/lib/types/music";

type StreamingPlatformMeta = {
  label: string;
  shortLabel: string;
  icon: StreamingPlatform;
};

type StreamingLinkSeed = Pick<
  StreamingPlatformLink,
  "platform" | "label" | "url" | "isPrimary"
> &
  Partial<
    Pick<
      StreamingPlatformLink,
      "id" | "icon" | "active" | "createdAt"
    >
  >;

export const STREAMING_PLATFORM_META: Record<
  StreamingPlatform,
  StreamingPlatformMeta
> = {
  apple_music: {
    label: "Apple Music",
    shortLabel: "Apple",
    icon: "apple_music"
  },
  spotify: {
    label: "Spotify",
    shortLabel: "Spotify",
    icon: "spotify"
  },
  amazon_music: {
    label: "Amazon Music",
    shortLabel: "Amazon",
    icon: "amazon_music"
  },
  youtube_music: {
    label: "YouTube Music",
    shortLabel: "YouTube",
    icon: "youtube_music"
  },
  soundcloud: {
    label: "SoundCloud",
    shortLabel: "SoundCloud",
    icon: "soundcloud"
  },
  audiomack: {
    label: "Audiomack",
    shortLabel: "Audiomack",
    icon: "audiomack"
  },
  tidal: {
    label: "Tidal",
    shortLabel: "Tidal",
    icon: "tidal"
  }
};

export function createStreamingLink(
  seed: StreamingLinkSeed
): StreamingPlatformLink {
  const meta = STREAMING_PLATFORM_META[seed.platform];

  return {
    id: seed.id ?? `${seed.platform}-${seed.label.toLowerCase().replace(/\s+/g, "-")}`,
    platform: seed.platform,
    label: seed.label,
    url: seed.url,
    isPrimary: seed.isPrimary,
    icon: seed.icon ?? meta.icon,
    active: seed.active ?? Boolean(seed.url && seed.url !== "#"),
    createdAt: seed.createdAt ?? "2026-05-20T00:00:00.000Z"
  };
}

export function getActiveStreamingLinks(
  links: StreamingPlatformLink[]
): StreamingPlatformLink[] {
  return links.filter((link) => link.active);
}

export function getPrimaryStreamingLink(
  links: StreamingPlatformLink[]
): StreamingPlatformLink | null {
  const activeLinks = getActiveStreamingLinks(links);

  if (activeLinks.length === 0) {
    return null;
  }

  return (
    activeLinks.find((link) => link.isPrimary) ??
    activeLinks[0] ??
    null
  );
}

export function getReleaseStreamingReadiness(release: MusicRelease) {
  const activeLinks = getActiveStreamingLinks(release.streamingLinks);
  const hasPrimary = activeLinks.some((link) => link.isPrimary);
  const totalCount = release.streamingLinks.length;
  const activeCount = activeLinks.length;

  return {
    totalCount,
    activeCount,
    hasPrimary,
    linkedPlatforms: activeLinks.map((link) => link.platform),
    status:
      activeCount === 0
        ? "pending"
        : activeCount === totalCount && hasPrimary
          ? "ready"
          : "partial"
  } as const;
}
