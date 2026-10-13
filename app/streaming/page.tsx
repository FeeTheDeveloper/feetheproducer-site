import type { Metadata } from "next";
import { ReleaseCard } from "@/components/cards/ReleaseCard";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { ArrowIcon } from "@/components/ui/Icons";
import { releases } from "@/lib/data/releases";
import { SITE } from "@/lib/site";
export const metadata: Metadata = {
  title: "The music",
  description:
    "The current Fee The Producer catalog on Apple Music, with videos and content on YouTube.",
};
export default function StreamingPage() {
  const sorted = [...releases].sort((a, b) =>
    b.releaseDate.localeCompare(a.releaseDate),
  );
  return (
    <>
      <section className="container-page page-intro">
        <p className="eyebrow">THE LISTENING ROOM</p>
        <h1>
          A sound.
          <br />
          <em>A signature.</em>
        </h1>
        <div className="intro-bottom">
          <p>
            Find your next repeat. Explore the current catalog on Apple Music.
          </p>
          <a
            href={SITE.social.apple}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Full catalog on Apple Music <ArrowIcon />
          </a>
        </div>
      </section>
      <section
        className="container-page catalog-section catalog-page"
        aria-label="Current Apple Music releases"
      >
        <div className="release-grid">
          {sorted.map((release) => (
            <ReleaseCard key={release.slug} release={release} />
          ))}
        </div>
        <a
          href={SITE.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="featured-video"
        >
          <div>
            <p className="eyebrow">FEE THE PRODUCER ON YOUTUBE</p>
            <h3>
              Into the frame. <span>Videos &amp; content.</span>
            </h3>
          </div>
          <span className="video-link">
            Visit the channel <ArrowIcon />
          </span>
        </a>
      </section>
      <ProjectCta />
    </>
  );
}
