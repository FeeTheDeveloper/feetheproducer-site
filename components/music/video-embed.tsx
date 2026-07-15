import { cn } from "@/lib/cn";

type VideoEmbedProps = {
  src: string;
  title: string;
  className?: string;
};

export function VideoEmbed({ src, title, className }: VideoEmbedProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[24px] border border-white/10 bg-ink/70 shadow-panel",
        className
      )}
    >
      <div className="relative aspect-video w-full">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
