import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: "default" | "ember" | "gold" | "panel";
};

const toneStyles: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "",
  ember:
    "relative overflow-hidden before:absolute before:inset-0 before:bg-stage-glow before:opacity-70 before:pointer-events-none",
  gold:
    "relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold/70 before:to-transparent",
  panel:
    "relative bg-ink-elevated/40 backdrop-blur"
};

export function Section({
  id,
  children,
  className,
  innerClassName,
  tone = "default"
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28",
        toneStyles[tone],
        className
      )}
    >
      <div className={cn("container-page relative z-10", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
