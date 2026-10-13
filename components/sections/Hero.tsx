import Image from "next/image";
import { SpatialScene } from "@/components/motion/SpatialScene";
import { MotionToggle } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { ArrowIcon, PlayIcon, SoundIcon } from "@/components/ui/Icons";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero">
      <div className="container-page">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="gold-line" /> INDEPENDENT SOUND. DISTINCTIVE
              SOUL.
            </p>
            <h1>
              Feel every
              <br />
              <em>frequency.</em>
            </h1>
            <p className="hero-description">
              Original records. Intentional production.
              <br />
              Music that stays with you.
            </p>
            <div className="hero-actions">
              <Button href="/streaming">
                <PlayIcon /> Explore the music
              </Button>
              <Button href="/contact" variant="ghost">
                Start a project <ArrowIcon />
              </Button>
            </div>
            <div className="hero-signoff">
              <SoundIcon />
              <span>SOUND. SOUL. SIGNATURE.</span>
            </div>
          </div>
          <SpatialScene className="emblem-scene">
            <div className="emblem-floor" aria-hidden="true" />
            <div className="hero-record" aria-hidden="true">
              <div className="record-label">
                <SoundIcon />
              </div>
            </div>
            <div className="emblem-object">
              <Image
                src={SITE.images.logo}
                alt="Fee The Producer LLC — gold and silver FP headphones emblem, Music Production"
                width={1254}
                height={1254}
                priority
                sizes="(max-width: 760px) 86vw, 42vw"
              />
            </div>
          </SpatialScene>
        </div>
        <div className="hero-bottom">
          <a href="#selected-records" className="discover-link">
            <span aria-hidden="true">↓</span> Discover the sound
          </a>
          <MotionToggle />
        </div>
      </div>
    </section>
  );
}
