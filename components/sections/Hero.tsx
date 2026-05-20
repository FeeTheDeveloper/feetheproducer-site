import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

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
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="gold">Veteran-Owned Artist</Badge>
              <Badge tone="red">Current Release: L.R.A.</Badge>
            </div>

            <h1 className="mt-6 font-display text-5xl leading-[0.92] text-bone sm:text-6xl md:text-7xl lg:text-[88px]">
              <span className="block">Fee The</span>
              <span className="text-gold-gradient">Producer</span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-white/75 md:text-lg">
              One live release, one clear voice, and one place to connect with
              the artist behind it. Listen to L.R.A. and get to know Fee The
              Producer beyond the extra catalog noise.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/releases" variant="gold" size="lg">
                Listen to L.R.A.
              </Button>
              <Button href="/about" variant="outline" size="lg">
                Read the Bio
              </Button>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-widerx text-white/50">
                  Focus
                </dt>
                <dd className="mt-1 font-display text-2xl text-gold">1 Release</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widerx text-white/50">
                  Status
                </dt>
                <dd className="mt-1 font-display text-2xl text-gold">Live</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widerx text-white/50">
                  Brand
                </dt>
                <dd className="mt-1 font-display text-2xl text-gold">FTP</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-square">
              <div
                className="absolute inset-0 rounded-full bg-red-gradient opacity-40 blur-3xl animate-pulse-glow"
                aria-hidden
              />
              <div className="relative h-full w-full overflow-hidden rounded-full border border-gold/25 bg-ink/80 shadow-gold">
                <Image
                  src={SITE.images.logo}
                  alt="Fee The Producer logo"
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, (min-width: 768px) 24rem, 85vw"
                  className="object-cover"
                />
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
                "Fee The Producer",
                "Veteran-Owned",
                "Independent Artist",
                "L.R.A.",
                "Artist Bio",
                "Direct Streaming",
                "Current Release",
                "Built With Discipline"
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
