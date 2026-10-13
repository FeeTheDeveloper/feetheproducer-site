import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";
export function ProjectCta() {
  return (
    <section className="project-cta container-page">
      <div>
        <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
        <h2>
          Let’s make it <em>resonate.</em>
        </h2>
      </div>
      <Button href="/contact">
        Start a conversation <ArrowIcon />
      </Button>
    </section>
  );
}
