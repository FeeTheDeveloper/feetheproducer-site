import type { Metadata } from "next";
import { Studio } from "@/components/sections/Studio";
import { ProjectCta } from "@/components/sections/ProjectCta";
export const metadata: Metadata = {
  title: "The studio",
  description:
    "Custom production, live instrumentation, and creative collaboration with Fee The Producer.",
};
export default function StudioPage() {
  return (
    <>
      <section className="container-page page-intro">
        <p className="eyebrow">FEE THE PRODUCER / THE STUDIO</p>
        <h1>
          Built around
          <br />
          <em>your sound.</em>
        </h1>
        <p>
          Bring the idea. Bring the feeling. Let’s make something that sounds
          unmistakably like you.
        </p>
      </section>
      <Studio full />
      <section className="container-page process-section">
        <p className="eyebrow">FROM THE FIRST CONVERSATION</p>
        <h2>
          Space for the <em>whole idea.</em>
        </h2>
        <div className="process-grid">
          <div>
            <span>01 / THE BRIEF</span>
            <h3>Find the direction.</h3>
            <p>
              Share your references, the project, and where you want to take it.
            </p>
          </div>
          <div>
            <span>02 / THE SOUND</span>
            <h3>Build the record.</h3>
            <p>
              Shape the rhythm, instrumentation, and arrangement around that
              direction.
            </p>
          </div>
          <div>
            <span>03 / THE DETAILS</span>
            <h3>Make it yours.</h3>
            <p>
              Agree on revisions, deliverables, timing, and terms for your
              project.
            </p>
          </div>
        </div>
      </section>
      <ProjectCta />
    </>
  );
}
