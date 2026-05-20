import type { ReleaseCampaign } from "@/lib/types/music";

export const CAMPAIGNS: ReleaseCampaign[] = [];

export function getCampaignsForRelease(releaseId: string): ReleaseCampaign[] {
  return CAMPAIGNS.filter((campaign) => campaign.releaseId === releaseId);
}

export function getLinkedCampaignCount(releaseId: string): number {
  return getCampaignsForRelease(releaseId).length;
}
