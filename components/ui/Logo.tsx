import { cn } from "@/lib/cn";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "h-8 w-8 text-[10px]",
  md: "h-10 w-10 text-xs",
  lg: "h-14 w-14 text-sm"
};

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-ink ring-2 ring-gold/70 shadow-gold",
        sizeMap[size],
        className
      )}
      aria-hidden
    >
      <span className="absolute inset-1 rounded-full bg-red-gradient opacity-90" />
      <span className="relative z-10 font-display tracking-widerx text-bone">
        FTP
      </span>
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
