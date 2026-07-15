import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { credits } from "@/lib/data/credits";

export function Credits() {
  if (credits.length === 0) {
    return null;
  }

  return (
    <Section id="credits" tone="panel">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Performance Credits"
          title={
            <>
              On stage. On screen.
              <br />
              <span className="text-gold-gradient">Behind the kit.</span>
            </>
          }
          description="Live and session drumming for established artists — the same discipline that drives the records."
        />
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {credits.map((credit) => (
          <article
            key={credit.slug}
            className="relative flex flex-col overflow-hidden rounded-[32px] border border-gold/20 bg-ink-elevated/80 shadow-panel"
          >
            {/* Typographic header — Tubi has no embed player and its poster
                art can't be hotlinked, so the card carries the billing. */}
            <div className="relative overflow-hidden border-b border-white/10 bg-red-gradient p-8 md:p-10">
              <div
                className="absolute inset-0 bg-stage-glow mix-blend-screen"
                aria-hidden
              />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="gold">{credit.role.toUpperCase()}</Badge>
                  <Badge tone="muted" className="border-white/25 bg-ink/50 text-white/85">
                    {credit.platformLabel}
                  </Badge>
                </div>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-widerx text-white/75">
                  {credit.artist} · {credit.year}
                </p>
                <h3 className="mt-2 font-display text-4xl leading-none text-bone md:text-5xl">
                  {credit.title}
                </h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-8">
              <p className="text-sm text-white/72 md:text-base">
                {credit.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button href={credit.episodeUrl} external variant="gold" size="md">
                  {credit.ctaLabel}
                </Button>
                <Button href="/contact" variant="outline" size="md">
                  Book Fee
                </Button>
              </div>

              {credit.socialProof && credit.socialProof.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {credit.socialProof.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold uppercase tracking-widerx text-white/70 transition hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                    >
                      {link.label}
                      <span aria-hidden>-&gt;</span>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
