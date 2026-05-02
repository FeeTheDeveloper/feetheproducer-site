import type { LicenseTier } from "@/lib/data/licensing";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type PricingCardProps = {
  tier: LicenseTier;
  className?: string;
};

export function PricingCard({ tier, className }: PricingCardProps) {
  const isHighlight = Boolean(tier.highlight);

  return (
    <article
      id={tier.id}
      className={cn(
        "relative flex flex-col rounded-2xl border bg-ink-elevated/70 p-7 backdrop-blur transition-all duration-300",
        isHighlight
          ? "border-gold shadow-gold lg:-translate-y-3 lg:scale-[1.02]"
          : "border-white/10 hover:border-gold/40",
        className
      )}
    >
      {isHighlight ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-4 py-1 text-[10px] font-semibold uppercase tracking-widerx text-ink shadow-gold">
          Most Popular
        </span>
      ) : null}

      <header>
        <p className="text-xs font-semibold uppercase tracking-widerx text-gold">
          {tier.format}
        </p>
        <h3 className="mt-2 font-display text-3xl leading-tight text-bone md:text-4xl">
          {tier.name}
        </h3>
        <p className="mt-2 text-sm text-white/70">{tier.tagline}</p>
      </header>

      <div className="my-6 flex items-baseline gap-2">
        <span className="font-display text-6xl leading-none text-gold-gradient">
          ${tier.price}
        </span>
        <span className="text-xs uppercase tracking-widerx text-white/50">
          USD
        </span>
      </div>

      <ul className="mb-6 space-y-3 text-sm">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-white/85">
            <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mb-6 rounded-xl border border-white/5 bg-ink/40 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widerx text-white/50">
          Usage Rights
        </p>
        <ul className="mt-2 space-y-1.5 text-xs text-white/65">
          {tier.rights.map((right) => (
            <li key={right} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-red-bright" />
              <span>{right}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <Button
          variant={isHighlight ? "gold" : "outline"}
          size="md"
          className="w-full"
          href="/contact"
        >
          {tier.id === "exclusive" ? "Inquire Now" : `Get ${tier.name}`}
        </Button>
      </div>
    </article>
  );
}
