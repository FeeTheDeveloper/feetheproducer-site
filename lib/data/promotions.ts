import type { ReleasePromotion } from "@/lib/types/music";

export const PROMOTIONS: ReleasePromotion[] = [];

export function getPromotionsForRelease(releaseId: string): ReleasePromotion[] {
  return PROMOTIONS.filter((promotion) => promotion.releaseId === releaseId);
}
