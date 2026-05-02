import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LICENSE_TIERS } from "@/lib/data/licensing";

export function LicensingTeaser() {
  return (
    <Section tone="panel">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Licensing"
          title={
            <>
              Lease, license,
              <br />
              <span className="text-gold-gradient">or own the master.</span>
            </>
          }
          description="Three flexible tiers built for artists at every level — from demo runs to label-ready exclusive deals. Clear rights, no hidden fine print."
        />
        <div className="space-y-4">
          {LICENSE_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink/40 p-5 backdrop-blur transition hover:border-gold/40"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widerx text-gold">
                  {tier.format}
                </p>
                <h3 className="mt-1 font-display text-2xl text-bone">
                  {tier.name}
                </h3>
                <p className="mt-1 text-xs text-white/60">{tier.tagline}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl text-gold-gradient">
                  ${tier.price}
                </p>
                <p className="text-[10px] uppercase tracking-widerx text-white/50">
                  USD
                </p>
              </div>
            </div>
          ))}
          <div className="pt-2">
            <Button href="/licensing" variant="gold" size="md">
              See full licensing
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
