import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
export const metadata: Metadata = { title: "Licensing inquiries" };
export default function LicensingPage() {
  return (
    <section className="container-page page-intro">
      <p className="eyebrow">MUSIC / LICENSING</p>
      <h1>
        The right sound.
        <br />
        <em>The right conversation.</em>
      </h1>
      <p>
        For licensing inquiries, share the record, intended use, distribution,
        and timeline. Availability, permissions, and terms are confirmed for
        each project.
      </p>
      <Button href="/contact">Discuss your project ↗</Button>
    </section>
  );
}
