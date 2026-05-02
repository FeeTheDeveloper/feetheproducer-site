import Image from "next/image";

import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16"
};

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <span
      className={cn(
        "relative inline-flex overflow-hidden rounded-full ring-1 ring-gold/40 shadow-gold",
        sizeMap[size],
        className
      )}
      aria-hidden
    >
      <Image
        src={SITE.images.logo}
        alt=""
        fill
        sizes={
          size === "sm" ? "40px" : size === "md" ? "48px" : "64px"
        }
        className="object-cover"
      />
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Logo size="sm" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-base tracking-widerx text-bone">
          Fee The Producer
        </span>
        <span className="text-[10px] uppercase tracking-widerx text-gold/80">
          Beats · Releases · Licensing
        </span>
      </span>
    </span>
  );
}
