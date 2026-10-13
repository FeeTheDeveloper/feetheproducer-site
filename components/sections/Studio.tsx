import Image from "next/image";
import { SpatialScene } from "@/components/motion/SpatialScene";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";
import { SITE } from "@/lib/site";

export const services = [
  {
    title: "Custom production",
    detail:
      "From the first idea to a sound that feels like you. Beats, composition, and arrangement built around the record.",
  },
  {
    title: "Live instrumentation",
    detail:
      "Drums, keys, and musical detail. The human feel at the heart of the production.",
  },
  {
    title: "Creative collaboration",
    detail:
      "Bring a voice, a reference, or a rough idea. Let’s find the direction together.",
  },
];

export function Studio({ full = false }: { full?: boolean }) {
  return (
    <section
      className={`studio-section ${full ? "studio-full" : ""}`}
      id="studio"
    >
      <div className="container-page studio-grid">
        <div className="studio-art">
          <SpatialScene className="character-scene">
            <Image
              src={SITE.images.studio}
              alt="Illustrated black-and-gold studio character wearing headphones and playing a production keyboard"
              width={1254}
              height={1254}
              sizes="(max-width: 760px) 92vw, 46vw"
              className="character-image"
            />
          </SpatialScene>
          <p className="art-caption">
            THE STUDIO CHARACTER <span>Original digital artwork</span>
          </p>
        </div>
        <div className="studio-copy">
          <p className="eyebrow">THE CREATIVE ROOM</p>
          <h2>
            Your vision.
            <br />
            <em>Our next record.</em>
          </h2>
          <p className="section-description">
            Great music starts with a feeling. We give it rhythm, texture, and a
            world of its own.
          </p>
          <div className="service-list">
            {services.map((service) => (
              <div key={service.title} className="service-row">
                <h3>{service.title}</h3>
                {full ? <p>{service.detail}</p> : null}
              </div>
            ))}
          </div>
          <Button href="/contact" variant="outline">
            Let’s build your sound <ArrowIcon />
          </Button>
        </div>
      </div>
    </section>
  );
}
