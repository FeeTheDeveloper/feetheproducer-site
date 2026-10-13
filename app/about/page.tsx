import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { SITE } from "@/lib/site";
export const metadata: Metadata = {
  title: "About Fee",
  description:
    "Meet Fee The Producer — musician, composer, writer, drummer, and keys player.",
};
export default function AboutPage() {
  return (
    <>
      <section className="container-page page-intro">
        <p className="eyebrow">THE ARTIST / THE PRODUCER</p>
        <h1>
          Musicianship.
          <br />
          <em>At the center.</em>
        </h1>
      </section>
      <section className="container-page about-grid">
        <div className="about-emblem">
          <Image
            src={SITE.images.logo}
            alt="Fee The Producer LLC Music Production emblem"
            width={1254}
            height={1254}
            sizes="(max-width: 760px) 90vw, 40vw"
          />
        </div>
        <div>
          <p className="eyebrow">FEE THE PRODUCER</p>
          <h2>
            Rhythm is
            <br />
            <em>the foundation.</em>
          </h2>
          <p>
            Fee The Producer is a Philadelphia-born musician, composer, writer,
            drummer, and keys player, with a sound shaped by soul, jazz, and
            live instrumentation.
          </p>
          <p>
            Drums and keys give the music its pulse. Composition and arrangement
            give it space. The aim is a record with feeling, intention, and a
            character of its own.
          </p>
          <p>
            Explore the releases, visit the YouTube channel, or start a
            conversation about your next project.
          </p>
          <Button href="/streaming" variant="outline">
            Hear the music ↗
          </Button>
        </div>
      </section>
      <ProjectCta />
    </>
  );
}
