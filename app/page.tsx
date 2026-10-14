import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Studio } from "@/components/sections/Studio";
import { LivePerformance } from "@/components/sections/LivePerformance";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { ReleaseCard } from "@/components/cards/ReleaseCard";
import { ArrowIcon, PlayIcon } from "@/components/ui/Icons";
import { releases } from "@/lib/data/releases";
import { SITE } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="listening-strip">
        <div className="container-page">
          <span className="eyebrow">FIND YOUR FREQUENCY</span>
          <a href={SITE.social.apple} target="_blank" rel="noopener noreferrer">
            Apple Music <span>↗</span>
          </a>
          <a
            href={SITE.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube <span>↗</span>
          </a>
        </div>
      </div>
      <section className="catalog-section container-page" id="selected-records">
        <div className="section-header">
          <div>
            <p className="eyebrow">THE DISCOGRAPHY</p>
            <h2>
              Records with <em>feeling.</em>
            </h2>
          </div>
          <Link href="/streaming" className="text-link">
            Explore the catalog <ArrowIcon />
          </Link>
        </div>
        <div className="release-grid">
          {releases.slice(0, 3).map((release) => (
            <ReleaseCard key={release.slug} release={release} />
          ))}
        </div>
        <a
          href={SITE.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="featured-video"
        >
          <span className="video-play">
            <PlayIcon />
          </span>
          <div>
            <span className="eyebrow">IN THE FRAME / YOUTUBE</span>
            <h3>
              More than the record. <span>Videos &amp; content.</span>
            </h3>
          </div>
          <span className="video-link">
            Visit the channel <ArrowIcon />
          </span>
        </a>
      </section>
      <LivePerformance />
      <Studio />
      <section className="artist-statement container-page">
        <p className="eyebrow">THE ARTIST BEHIND THE SOUND</p>
        <h2>
          Rooted in soul.
          <br />
          Driven by <em>feeling.</em>
        </h2>
        <div>
          <p>
            A musician first. Fee The Producer brings drums, keys, and a love of
            musical detail into every creative conversation.
          </p>
          <Link className="text-link" href="/about">
            Meet Fee The Producer <ArrowIcon />
          </Link>
        </div>
      </section>
      <ProjectCta />
    </>
  );
}
