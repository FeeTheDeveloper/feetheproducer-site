import Image from "next/image";
import Link from "next/link";

import { BeatPlayer } from "@/components/music/beat-player";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { type Beat } from "@/lib/data/beats";
import { formatCurrency } from "@/lib/format";

type BeatCardProps = {
  beat: Beat;
  className?: string;
};

const tierLabels = [
  { key: "priceBasic", label: "Basic" },
  { key: "pricePremium", label: "Premium" },
  { key: "priceExclusive", label: "Exclusive" }
] as const;

export function BeatCard({ beat, className }: BeatCardProps) {
  const hasBpm = beat.bpm > 0;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[30px] border border-gold/20 bg-black p-4 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-ember",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top,rgba(208,0,0,0.14),transparent_45%)] opacity-0 transition duration-300 group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-[24px] border border-gold/20 bg-ink">
        <div className="relative aspect-square overflow-hidden rounded-[24px]">
          <Image
            src={beat.coverImage}
            alt={`${beat.title} cover art`}
            fill
            sizes="(min-width: 1280px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.08)_0%,rgba(5,5,5,0.38)_55%,rgba(5,5,5,0.86)_100%)]" />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widerx text-gold/85">
              {beat.genre}
            </p>
            <p className="mt-1 text-sm text-white/72">{beat.mood}</p>
          </div>
          {beat.featured ? (
            <span className="rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-widerx text-black">
              Featured
            </span>
          ) : null}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/beats/${beat.id}`}
              className="font-display text-3xl leading-none text-bone transition hover:text-gold"
            >
              {beat.title}
            </Link>
            <p className="mt-2 text-xs uppercase tracking-widerx text-white/55">
              {beat.genre} / {beat.mood}
            </p>
          </div>
          {hasBpm ? (
            <span className="rounded-full border border-gold/25 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-widerx text-gold">
              {beat.bpm} BPM
            </span>
          ) : null}
        </div>

        <BeatPlayer
          src={beat.audioUrl}
          title={`${beat.title} preview`}
          className="mt-5"
        />

        <div className="mt-5 grid grid-cols-3 gap-2">
          {tierLabels.map((tier) => (
            <div
              key={tier.label}
              className="rounded-2xl border border-gold/15 bg-white/[0.03] p-3"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widerx text-white/45">
                {tier.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-bone">
                {formatCurrency(beat[tier.key])}
              </p>
            </div>
          ))}
        </div>

        <Button
          href={`/beats/${beat.id}#licensing`}
          variant="gold"
          size="sm"
          className="mt-5 w-full"
        >
          Buy License
        </Button>
      </div>
    </article>
  );
}
