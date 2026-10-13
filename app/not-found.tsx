import { Button } from "@/components/ui/Button";
export default function NotFound() {
  return (
    <section className="container-page page-intro">
      <p className="eyebrow">404 / Off the record</p>
      <h1>
        This page has
        <br />
        <em>left the mix.</em>
      </h1>
      <p>Explore the music or get in touch to start something new.</p>
      <Button href="/streaming">Explore the music</Button>
    </section>
  );
}
