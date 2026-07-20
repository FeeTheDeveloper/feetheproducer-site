import { cn } from "@/lib/cn";
import type { StreamingLink } from "@/lib/data/releases";

type PlatformLinksProps = {
  links: StreamingLink[];
  className?: string;
  size?: "sm" | "md";
};

function PlatformIcon({
  platform,
  className
}: {
  platform: StreamingLink["platform"];
  className?: string;
}) {
  const classes = cn("h-4 w-4 shrink-0", className);

  switch (platform) {
    case "apple":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={classes}>
          <path
            fill="currentColor"
            d="M15.74 3.32a3.57 3.57 0 0 1 .86-1.58c.53-.61 1.39-1.06 2.13-1.08.1.84-.24 1.68-.76 2.29-.53.63-1.35 1.12-2.23 1.06ZM20.7 17.3c-.47 1.08-.7 1.57-1.3 2.46-.82 1.23-1.98 2.75-3.42 2.76-1.28.01-1.61-.82-3.35-.81-1.74.01-2.1.82-3.38.81-1.43-.01-2.54-1.38-3.36-2.61-2.28-3.38-2.52-7.36-1.12-9.52.99-1.54 2.56-2.44 4.04-2.44 1.5 0 2.45.82 3.69.82 1.2 0 1.93-.82 3.67-.82 1.33 0 2.74.72 3.73 1.96-3.28 1.8-2.74 6.5.8 7.39Z"
          />
        </svg>
      );
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={classes}>
          <path
            fill="currentColor"
            d="M12 2.03c-5.5 0-9.97 4.46-9.97 9.97S6.5 22 12 22s9.97-4.46 9.97-9.97S17.5 2.03 12 2.03Zm4.57 14.37a.62.62 0 0 1-.86.2c-2.37-1.45-5.35-1.78-8.85-.99a.62.62 0 1 1-.27-1.21c3.84-.88 7.11-.5 9.77 1.13.29.18.39.56.21.87Zm1.22-2.7a.77.77 0 0 1-1.06.26c-2.71-1.67-6.84-2.16-10.05-1.2a.76.76 0 1 1-.44-1.46c3.68-1.11 8.24-.57 11.29 1.31.36.22.47.69.26 1.09Zm.1-2.82c-3.24-1.93-8.58-2.11-11.67-1.18a.93.93 0 1 1-.53-1.79c3.55-1.06 9.45-.85 13.15 1.35a.93.93 0 1 1-.95 1.62Z"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={classes}>
          <path
            fill="currentColor"
            d="M12 3.25A8.75 8.75 0 1 0 20.75 12 8.76 8.76 0 0 0 12 3.25Zm0 15.86A7.11 7.11 0 1 1 19.11 12 7.12 7.12 0 0 1 12 19.11Zm0-11.37A4.26 4.26 0 1 0 16.26 12 4.26 4.26 0 0 0 12 7.74Zm-1.49 6.52V9.74L14.8 12Z"
          />
        </svg>
      );
    case "amazon":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={classes}>
          <path
            fill="currentColor"
            d="M18.81 17.84c-1.81 1.34-4.43 2.05-6.69 2.05-3.17 0-6.03-1.17-8.19-3.12-.17-.15-.02-.36.18-.24 2.34 1.36 5.24 2.18 8.23 2.18 2.01 0 4.23-.42 6.26-1.28.31-.14.58.21.21.41Zm.75-.86c-.23-.29-1.49-.14-2.06-.07-.17.02-.19-.13-.04-.24.97-.69 2.57-.49 2.76-.26.19.23-.05 1.82-.96 2.58-.14.12-.27.06-.21-.09.19-.48.74-1.63.51-1.92ZM14.37 8.56v-.68c0-.1.07-.16.16-.16h3.06c.1 0 .16.07.16.16v.58c0 .1-.08.22-.23.43l-1.58 2.26c.59-.01 1.22.07 1.75.37.12.07.15.18.16.28v.73c0 .1-.11.22-.22.16-.94-.49-2.19-.54-3.23 0-.11.06-.22-.06-.22-.16v-.69c0-.11 0-.3.12-.48l1.83-2.62h-1.59c-.1 0-.16-.06-.16-.16Zm-11.2 4.07H2.24c-.1 0-.16-.07-.16-.16V7.88c0-.1.07-.17.16-.17h.87c.1 0 .16.08.16.17v.61h.02c.23-.61.67-.9 1.24-.9.58 0 .94.29 1.2.9.23-.61.74-.9 1.29-.9.39 0 .81.16 1.07.52.29.39.23.96.23 1.46v2.91c0 .1-.08.16-.16.16h-.93c-.1 0-.16-.07-.16-.16V10.03c0-.2.02-.71-.03-.9-.08-.32-.31-.41-.62-.41-.25 0-.51.17-.61.44-.1.27-.09.71-.09.98v2.34c0 .1-.07.16-.16.16h-.93c-.1 0-.16-.07-.16-.16l-.01-2.44c0-.51.08-1.27-.65-1.27-.74 0-.72.84-.72 1.27v2.44c0 .1-.08.16-.16.16Zm16.9 7.17c-.31.26-.77.28-1.13.06-.35-.21-.58-.62-.58-1.04 0-.42.22-.83.58-1.04.36-.22.82-.2 1.13.06.21.17.33.42.33.69 0 .27-.12.52-.33.69Z"
          />
        </svg>
      );
  }
}

export function PlatformLinks({
  links,
  className,
  size = "md"
}: PlatformLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(
            "inline-flex items-center gap-2 rounded-full border font-semibold uppercase tracking-widerx transition",
            size === "md" ? "px-4 py-2.5 text-xs" : "px-3 py-2 text-[11px]",
            link.primary
              ? "border-gold/50 bg-gold/10 text-gold hover:border-gold hover:bg-gold/20"
              : "border-white/10 bg-white/[0.04] text-white/80 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
          )}
        >
          <PlatformIcon platform={link.platform} className="h-3.5 w-3.5" />
          {link.label}
        </a>
      ))}
    </div>
  );
}
