import { getReleaseById } from "@/lib/data/releases";
import type { ReleaseCampaign } from "@/lib/types/music";

const lraRelease = getReleaseById("lra");
const lraStreamingLinks = lraRelease?.streamingLinks ?? [];

export const CAMPAIGNS: ReleaseCampaign[] = [
  {
    id: "lra-listen-now",
    name: "L.R.A. launch pulse",
    releaseId: "lra",
    streamingLinks: lraStreamingLinks,
    cta: "listen_now",
    status: "active",
    channel: "release_page",
    createdAt: "2026-05-20T00:00:00.000Z"
  },
  {
    id: "lra-stream-everywhere",
    name: "L.R.A. cross-platform push",
    releaseId: "lra",
    streamingLinks: lraStreamingLinks,
    cta: "stream_everywhere",
    status: "active",
    channel: "operator_panel",
    createdAt: "2026-05-20T00:00:00.000Z"
  },
  {
    id: "lra-follow-artist",
    name: "Fee The Producer follow funnel",
    releaseId: "lra",
    streamingLinks: lraStreamingLinks,
    cta: "follow_the_artist",
    status: "scheduled",
    channel: "dashboard_panel",
    createdAt: "2026-05-20T00:00:00.000Z"
  }
];

export function getCampaignsForRelease(releaseId: string): ReleaseCampaign[] {
  return CAMPAIGNS.filter((campaign) => campaign.releaseId === releaseId);
}

export function getLinkedCampaignCount(releaseId: string): number {
  return getCampaignsForRelease(releaseId).length;
}
