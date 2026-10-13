import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE } from "@/lib/site";
export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Contact Fee The Producer about custom production, collaboration, and music licensing inquiries.",
};
export default function ContactPage() {
  return (
    <section className="container-page contact-page">
      <div className="contact-intro">
        <p className="eyebrow">LET’S MAKE SOMETHING</p>
        <h1>
          The next record
          <br />
          <em>starts here.</em>
        </h1>
        <p>
          Tell us what you’re hearing. Share your idea, references, and timeline
          to start the conversation.
        </p>
        <a className="contact-email" href={`mailto:${SITE.email}`}>
          {SITE.email} ↗
        </a>
        <div className="contact-topics">
          <span>Custom production</span>
          <span>Artist collaboration</span>
          <span>Licensing inquiries</span>
        </div>
      </div>
      <div className="contact-form-panel">
        <p className="eyebrow">YOUR PROJECT</p>
        <h2>
          Let’s hear <em>your idea.</em>
        </h2>
        <p className="form-description">
          This form prepares a draft in your email app. Review it and press send
          there to complete your inquiry.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
