import { getReleaseById } from "@/lib/data/releases";
import type { ReleasePromotion } from "@/lib/types/music";

const lraRelease = getReleaseById("lra");
const lraStreamingLinks = lraRelease?.streamingLinks ?? [];

export const PROMOTIONS: ReleasePromotion[] = [
  {
    id: "lra-cross-platform-cta",
    title: "L.R.A. cross-platform CTA block",
    releaseId: "lra",
    streamingLinks: lraStreamingLinks,
    cta: "stream_everywhere",
    cardType: "cross_platform_streaming_cta",
    active: true,
    createdAt: "2026-05-20T00:00:00.000Z"
  },
  {
    id: "lra-release-promo-card",
    title: "L.R.A. multi-platform release promotion card",
    releaseId: "lra",
    streamingLinks: lraStreamingLinks,
    cta: "listen_now",
    cardType: "multi_platform_release_card",
    active: true,
    createdAt: "2026-05-20T00:00:00.000Z"
  },
  {
    id: "lra-unified-release-links",
    title: "Fee The Producer unified release links",
    releaseId: "lra",
    streamingLinks: lraStreamingLinks,
    cta: "follow_the_artist",
    cardType: "unified_release_links",
    active: true,
    createdAt: "2026-05-20T00:00:00.000Z"
  }
];

export function getPromotionsForRelease(releaseId: string): ReleasePromotion[] {
  return PROMOTIONS.filter((promotion) => promotion.releaseId === releaseId);
}
