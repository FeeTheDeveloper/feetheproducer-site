import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export function BookingCta() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(208,0,0,0.25)_0%,transparent_70%)]"
        aria-hidden
      />
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-red/40 bg-gradient-to-br from-red/15 via-ink to-ink p-8 shadow-ember md:p-14">
          <div
            className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-red-gradient opacity-25 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-gold-gradient opacity-15 blur-3xl"
            aria-hidden
          />

          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widerx text-gold">
                Booking · Custom Production · Sync
              </p>
              <h2 className="mt-3 font-display text-4xl leading-[0.95] text-bone md:text-5xl lg:text-6xl">
                Need a custom record?
                <br />
                <span className="text-gold-gradient">
                  Let's build it together.
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-sm text-white/75 md:text-base">
                Custom production, artist collaborations, sync placements, and
                exclusive buyouts. Tell us about the project — we'll make it
                hit.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button href="/contact" variant="gold" size="lg">
                Book a Session
              </Button>
              <Button
                href={`mailto:${SITE.email}`}
                external
                variant="outline"
                size="lg"
              >
                {SITE.email}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
