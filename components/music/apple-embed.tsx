import { cn } from "@/lib/cn";

type AppleEmbedProps = {
  src: string;
  title: string;
  className?: string;
};

export function AppleEmbed({ src, title, className }: AppleEmbedProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[660px] overflow-hidden rounded-[20px] border border-white/10 bg-ink/70 p-3",
        className
      )}
    >
      <iframe
        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
        className="block w-full"
        frameBorder="0"
        height={175}
        loading="lazy"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src={src}
        style={{
          width: "100%",
          maxWidth: "660px",
          overflow: "hidden",
          borderRadius: "10px",
          border: 0
        }}
        title={title}
      />
    </div>
  );
}
