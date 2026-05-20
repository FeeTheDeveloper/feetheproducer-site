export type ReleaseType = "Single" | "EP" | "Album" | "Beat Tape" | "Collab";

export type StreamingPlatform =
  | "apple_music"
  | "spotify"
  | "amazon_music"
  | "youtube_music"
  | "soundcloud"
  | "audiomack"
  | "tidal";

export type StreamingPlatformIcon = StreamingPlatform;

export type StreamingPlatformLink = {
  id: string;
  platform: StreamingPlatform;
  label: string;
  url: string;
  isPrimary: boolean;
  icon: StreamingPlatformIcon;
  active: boolean;
  createdAt: string;
};

export type MusicReleaseEmbed = {
  provider: "apple_music";
  title: string;
  src: string;
  height?: number;
};

export type MusicRelease = {
  id: string;
  title: string;
  artist: string;
  type: ReleaseType;
  releaseDate: string;
  description: string;
  streamingLinks: StreamingPlatformLink[];
  embed?: MusicReleaseEmbed;
  featured?: boolean;
};

export type CampaignCtaOption =
  | "listen_now"
  | "stream_everywhere"
  | "follow_the_artist";

export type CampaignStatus = "draft" | "scheduled" | "active";

export type ReleaseCampaign = {
  id: string;
  name: string;
  releaseId: MusicRelease["id"];
  streamingLinks: StreamingPlatformLink[];
  cta: CampaignCtaOption;
  status: CampaignStatus;
  channel: "release_page" | "operator_panel" | "dashboard_panel";
  createdAt: string;
};

export type PromotionCardType =
  | "cross_platform_streaming_cta"
  | "multi_platform_release_card"
  | "unified_release_links";

export type ReleasePromotion = {
  id: string;
  title: string;
  releaseId: MusicRelease["id"];
  streamingLinks: StreamingPlatformLink[];
  cta: CampaignCtaOption;
  cardType: PromotionCardType;
  active: boolean;
  createdAt: string;
};
