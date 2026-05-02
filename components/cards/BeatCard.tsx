import type { Beat } from "@/lib/data/beats";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type BeatCardProps = {
  beat: Beat;
  className?: string;
};

export function BeatCard({ beat, className }: BeatCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-ink-elevated/70 p-5 backdrop-blur transition-all duration-300 hover:border-gold/40 hover:shadow-gold",
        className
      )}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red/5 via-transparent to-gold/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative mb-5 aspect-square overflow-hidden rounded-xl bg-ink ring-1 ring-white/10">
        <div className="absolute inset-0 bg-stage-glow opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-ink/60 backdrop-blur transition-transform duration-300 group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1 h-7 w-7 text-gold"
              aria-hidden
            >
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex h-10 items-center gap-1 px-3">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="block w-1 rounded-sm bg-gradient-to-t from-red/80 to-gold/80"
              style={{
                height: `${20 + Math.abs(Math.sin(i * 0.7)) * 60}%`,
                opacity: 0.6 + Math.abs(Math.cos(i * 0.5)) * 0.4
              }}
            />
          ))}
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-widerx text-gold backdrop-blur">
          {beat.duration}
        </span>
      </div>

      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl leading-tight text-bone">
            {beat.title}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-widerx text-white/60">
            {beat.genre} · {beat.mood}
          </p>
        </div>
        <Badge tone="gold">{beat.bpm} BPM</Badge>
      </div>

      <dl className="mb-5 grid grid-cols-2 gap-2 text-xs text-white/70">
        <div className="flex flex-col rounded-lg border border-white/5 bg-ink/40 px-3 py-2">
          <dt className="uppercase tracking-widerx text-white/40">Key</dt>
          <dd className="mt-0.5 font-semibold text-bone">{beat.key}</dd>
        </div>
        <div className="flex flex-col rounded-lg border border-white/5 bg-ink/40 px-3 py-2">
          <dt className="uppercase tracking-widerx text-white/40">Lease</dt>
          <dd className="mt-0.5 font-semibold text-gold">${beat.priceLease}</dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-col gap-2 sm:flex-row">
        <Button
          variant="gold"
          size="sm"
          className="flex-1"
          href={`/beats#${beat.id}`}
        >
          Lease ${beat.priceLease}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          href={`/licensing#exclusive`}
        >
          Buy ${beat.priceExclusive}
        </Button>
      </div>
    </article>
  );
}
