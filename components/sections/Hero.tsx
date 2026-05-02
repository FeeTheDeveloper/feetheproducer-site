import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-20">
      <div className="absolute inset-0 -z-10 bg-stage-glow" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(208,0,0,0.35)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Badge tone="gold">Veteran-Owned · Producer</Badge>
              <Badge tone="red">New Beats Live</Badge>
            </div>

            <h1 className="mt-6 font-display text-5xl leading-[0.92] text-bone sm:text-6xl md:text-7xl lg:text-[88px]">
              <span className="block">Fee The</span>
              <span className="text-gold-gradient">Producer</span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-white/75 md:text-lg">
              Premium beats, original releases, and licensing built for artists
              who want to sound like the moment they're chasing. Crafted in the
              studio. Pressed in gold.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/beats" variant="gold" size="lg">
                Shop Beats
              </Button>
              <Button href="/releases" variant="outline" size="lg">
                Listen to Releases
              </Button>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-widerx text-white/50">
                  Beats
                </dt>
                <dd className="mt-1 font-display text-2xl text-gold">100+</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widerx text-white/50">
                  Releases
                </dt>
                <dd className="mt-1 font-display text-2xl text-gold">20+</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widerx text-white/50">
                  Streams
                </dt>
                <dd className="mt-1 font-display text-2xl text-gold">1M+</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-square">
              <div
                className="absolute inset-0 rounded-full bg-red-gradient blur-3xl opacity-40 animate-pulse-glow"
                aria-hidden
              />
              <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-gold bg-ink shadow-gold">
                <div className="absolute inset-3 rounded-full border border-gold/40" />
                <div className="absolute inset-6 rounded-full bg-red-gradient opacity-90" />
                <div className="absolute inset-10 rounded-full border border-gold/30" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="font-display text-7xl tracking-widerx text-bone drop-shadow-[0_3px_0_rgba(0,0,0,0.45)] md:text-8xl">
                    FTP
                  </span>
                  <span className="mt-2 text-[10px] font-semibold uppercase tracking-widerx text-gold">
                    Fee The Producer
                  </span>
                </div>
              </div>
              <div
                className="absolute -bottom-4 left-1/2 h-2 w-3/4 -translate-x-1/2 rounded-full bg-gold/30 blur-2xl"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 overflow-hidden border-y border-white/10 bg-ink/60 py-4">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="flex shrink-0 items-center gap-12">
              {[
                "Trap",
                "Drill",
                "Hip-Hop",
                "Trap Soul",
                "Boom Bap",
                "R&B",
                "Cinematic",
                "Sync · Film · TV"
              ].map((item) => (
                <span
                  key={`${idx}-${item}`}
                  className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widerx text-white/50"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
