import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-widerx text-gold">
          <span className="mr-3 inline-block h-px w-8 bg-gold align-middle" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl leading-[0.95] text-bone md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base text-white/70 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
