import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  getActiveStreamingLinks,
  getPrimaryStreamingLink,
  getReleaseStreamingReadiness,
  STREAMING_PLATFORM_META
} from "@/lib/music";
import type {
  CampaignCtaOption,
  MusicRelease,
  PromotionCardType,
  ReleaseCampaign,
  ReleasePromotion
} from "@/lib/types/music";

import { StreamingLinks } from "./streaming-links";

type ReleaseCommandCenterProps = {
  release: MusicRelease;
  campaigns: ReleaseCampaign[];
  promotions: ReleasePromotion[];
  className?: string;
};

const campaignCtaLabel: Record<CampaignCtaOption, string> = {
  listen_now: "Listen Now",
  stream_everywhere: "Stream Everywhere",
  follow_the_artist: "Follow the Artist"
};

const promotionTypeLabel: Record<PromotionCardType, string> = {
  cross_platform_streaming_cta: "Cross-platform CTA",
  multi_platform_release_card: "Release promotion card",
  unified_release_links: "Unified release links"
};

const readinessLabel = {
  ready: "Streaming Ready",
  partial: "Partially Linked",
  pending: "Linking Pending"
} as const;

function MetricTile({
  label,
  value,
  accent = "default"
}: {
  label: string;
  value: string;
  accent?: "default" | "gold";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/8 bg-white/[0.03] p-4",
        accent === "gold" && "border-gold/20 bg-gold/10"
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-widerx text-white/50">
        {label}
      </p>
      <p className="mt-2 text-2xl font-display text-bone">{value}</p>
    </div>
  );
}

export function ReleaseCommandCenter({
  release,
  campaigns,
  promotions,
  className
}: ReleaseCommandCenterProps) {
  const readiness = getReleaseStreamingReadiness(release);
  const activeLinks = getActiveStreamingLinks(release.streamingLinks);
  const primaryLink = getPrimaryStreamingLink(release.streamingLinks);
  const livePromotions = promotions.filter((promotion) => promotion.active);

  return (
    <div
      className={cn(
        "grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]",
        className
      )}
    >
      <article className="rounded-[32px] border border-gold/15 bg-ink-elevated/75 p-6 shadow-panel backdrop-blur md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widerx text-gold/70">
              Current Release
            </p>
            <h2 className="mt-3 text-4xl text-bone md:text-5xl">
              {release.title}
            </h2>
            <p className="mt-2 text-sm uppercase tracking-widerx text-gold/80">
              {release.artist}
            </p>
            <p className="mt-4 max-w-3xl text-sm text-white/72 md:text-base">
              {release.description}
            </p>
          </div>

          <Badge
            tone={
              readiness.status === "ready"
                ? "gold"
                : readiness.status === "partial"
                  ? "muted"
                  : "red"
            }
            className={cn(
              readiness.status === "ready" && "border-gold/40 bg-gold/10 text-gold",
              readiness.status === "partial" && "border-white/15 bg-white/[0.06] text-white/75"
            )}
          >
            {readinessLabel[readiness.status]}
          </Badge>
        </div>

        <StreamingLinks
          links={release.streamingLinks}
          releaseTitle={release.title}
          className="mt-6"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <MetricTile
            label="Active Platforms"
            value={String(readiness.activeCount)}
            accent="gold"
          />
          <MetricTile
            label="Linked Campaigns"
            value={String(campaigns.length)}
          />
          <MetricTile
            label="Live Promotions"
            value={String(livePromotions.length)}
          />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl text-bone">Campaign Integration</h3>
              <Badge tone="muted" className="border-white/10 bg-white/[0.05]">
                {campaigns.length} linked
              </Badge>
            </div>
            <p className="mt-2 text-sm text-white/62">
              Campaigns now bind to a release ID and inherit the unified
              streaming destinations directly from the release model.
            </p>

            <div className="mt-4 space-y-3">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="rounded-2xl border border-white/8 bg-ink/60 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold uppercase tracking-widerx text-bone">
                      {campaign.name}
                    </p>
                    <Badge tone="muted" className="border-white/10 bg-white/[0.04]">
                      {campaign.status}
                    </Badge>
                    <Badge tone="gold">{campaignCtaLabel[campaign.cta]}</Badge>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-widerx text-white/45">
                    {campaign.channel.replaceAll("_", " ")} / {campaign.streamingLinks.length} links attached
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl text-bone">Promotion Integration</h3>
              <Badge tone="muted" className="border-white/10 bg-white/[0.05]">
                {livePromotions.length} live
              </Badge>
            </div>
            <p className="mt-2 text-sm text-white/62">
              Promotion cards share the same release links for cross-platform
              CTAs, multi-platform release cards, and unified destination blocks.
            </p>

            <div className="mt-4 space-y-3">
              {livePromotions.map((promotion) => (
                <div
                  key={promotion.id}
                  className="rounded-2xl border border-white/8 bg-ink/60 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold uppercase tracking-widerx text-bone">
                      {promotion.title}
                    </p>
                    <Badge tone="gold">
                      {promotionTypeLabel[promotion.cardType]}
                    </Badge>
                    <Badge tone="muted" className="border-white/10 bg-white/[0.04]">
                      {campaignCtaLabel[promotion.cta]}
                    </Badge>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-widerx text-white/45">
                    {promotion.streamingLinks.length} shared release links
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>

      <aside className="space-y-6">
        <section className="rounded-[28px] border border-white/10 bg-ink-elevated/80 p-5 shadow-panel backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl text-bone">Operator Panel</h3>
            <Badge
              tone={readiness.status === "pending" ? "red" : "gold"}
              className={cn(
                readiness.status === "partial" && "border-white/15 bg-white/[0.06] text-white/75"
              )}
            >
              {readinessLabel[readiness.status]}
            </Badge>
          </div>

          <div className="mt-4 space-y-3 text-sm text-white/72">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
              <span>Release streaming readiness</span>
              <span className="font-semibold uppercase tracking-widerx text-gold">
                {readiness.activeCount}/{readiness.totalCount} active
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
              <span>Active streaming platforms</span>
              <span className="font-semibold uppercase tracking-widerx text-gold">
                {activeLinks.length}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
              <span>Linked campaign count</span>
              <span className="font-semibold uppercase tracking-widerx text-gold">
                {campaigns.length}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {activeLinks.map((link) => (
              <Badge
                key={link.id}
                tone={link.isPrimary ? "gold" : "muted"}
                className={cn(
                  "border-white/10 bg-white/[0.05] text-white/80",
                  link.isPrimary && "border-gold/40 bg-gold/10 text-gold"
                )}
              >
                {STREAMING_PLATFORM_META[link.platform].label}
              </Badge>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-gold/15 bg-ink-elevated/80 p-5 shadow-panel backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widerx text-gold/70">
                Dashboard Panel
              </p>
              <h3 className="mt-2 text-xl text-bone">Streaming Destinations</h3>
            </div>
            {primaryLink ? <Badge tone="gold">Primary Platform</Badge> : null}
          </div>

          <div className="mt-4 space-y-3">
            {release.streamingLinks.map((link) => (
              <div
                key={link.id}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold uppercase tracking-widerx text-bone">
                        {STREAMING_PLATFORM_META[link.platform].label}
                      </p>
                      <Badge
                        tone={link.active ? "gold" : "red"}
                        className={cn(
                          link.active && "border-gold/40 bg-gold/10 text-gold"
                        )}
                      >
                        {link.active ? "Active" : "Pending"}
                      </Badge>
                      {link.isPrimary ? <Badge tone="muted">Primary</Badge> : null}
                    </div>
                    <p className="mt-2 text-xs text-white/55">{link.label}</p>
                  </div>

                  <Button
                    href={link.url}
                    external
                    variant={link.isPrimary ? "gold" : "outline"}
                    size="sm"
                    className={cn(!link.active && "pointer-events-none opacity-50")}
                  >
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
