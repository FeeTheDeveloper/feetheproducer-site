import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { Studio } from "@/components/sections/Studio";
import { LivePerformance } from "@/components/sections/LivePerformance";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { ReleaseCard } from "@/components/cards/ReleaseCard";
import { AppleMusicEmbed } from "@/components/music/AppleMusicEmbed";
import { ArrowIcon, PlayIcon } from "@/components/ui/Icons";
import { featuredRelease, releases } from "@/lib/data/releases";
import { SITE } from "@/lib/site";
import "./merch/merch.css";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="listening-strip">
        <div className="container-page">
          <span className="eyebrow">FIND YOUR FREQUENCY</span>
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
        <div className="featured-listen">
          <div className="featured-listen-copy">
            <p className="eyebrow">NEW RELEASE / APPLE MUSIC</p>
            <h3>Don&apos;t Call It Nothing</h3>
            <p>
              The latest Fee The Producer single. Press play when you&apos;re
              ready.
            </p>
          </div>
          <AppleMusicEmbed release={featuredRelease} />
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
      <section className="home-merch container-page">
        <div className="home-merch-art">
          <Image src="/images/merch/core-hoodie.png" alt="Fee The Producer Core Hoodie, product mockup" width={1000} height={1000} sizes="(max-width: 760px) 50vw, 30vw" />
          <Image src="/images/merch/signature-snapback.png" alt="Fee The Producer black and red Signature Snapback, product mockup" width={1000} height={1000} sizes="(max-width: 760px) 40vw, 25vw" />
        </div>
        <div><p className="eyebrow">THE CORE COLLECTION / 01</p><h2>Wear the <em>signature.</em></h2><p>Studio staples in black, ivory and gold. Explore the first Fee The Producer merch collection, made to order with US shipping.</p><Link href="/merch" className="text-link">Shop the collection <ArrowIcon /></Link></div>
      </section>
      <section className="artist-statement container-page">
        <figure className="artist-photo artist-photo-wide">
          <Image
            src={SITE.images.artistConsole}
            alt="Fee The Producer at the mixing console in a recording studio"
            width={1630}
            height={965}
            sizes="(max-width: 600px) 92vw, (max-width: 1100px) 94vw, 1240px"
          />
          <figcaption><span>FEE THE PRODUCER</span><span>IN THE STUDIO / 01</span></figcaption>
        </figure>
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
