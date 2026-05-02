import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <div
        className="absolute inset-0 -z-10 bg-stage-glow opacity-90"
        aria-hidden
      />
      <div className="container-page text-center">
        <p className="font-display text-7xl text-gold-gradient md:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl text-bone md:text-5xl">
          Off the grid.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          That page isn't in the catalog. Let's get you back to where the beats
          live.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="gold" size="md">
            Back to Home
          </Button>
          <Button href="/beats" variant="outline" size="md">
            Shop Beats
          </Button>
        </div>
      </div>
    </section>
  );
}
