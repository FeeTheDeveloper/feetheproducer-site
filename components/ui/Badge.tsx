import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  tone?: "gold" | "red" | "muted";
  className?: string;
};

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  gold: "border-gold/40 bg-gold/10 text-gold",
  red: "border-red/50 bg-red/15 text-red-bright",
  muted: "border-white/10 bg-white/5 text-white/70"
};

export function Badge({ children, tone = "gold", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widerx",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
