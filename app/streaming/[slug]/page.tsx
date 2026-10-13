import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReleaseArtwork } from "@/components/music/ReleaseArtwork";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";
import {
  getReleaseBySlug,
  releases,
} from "@/lib/data/releases";
import { SITE } from "@/lib/site";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return releases.map((release) => ({ slug: release.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const release = getReleaseBySlug((await params).slug);
  if (!release) return { title: "Release not found" };
  return {
    title: release.title,
    description: release.description,
    alternates: { canonical: `/streaming/${release.slug}` },
    openGraph: {
      title: `${release.title} | ${SITE.name}`,
      description: release.description,
      type: "music.song",
      images: [
        {
          url: release.coverArt || SITE.images.logo,
          alt: release.coverArt ? `${release.title} cover art` : SITE.name,
        },
      ],
    },
  };
}
export default async function ReleasePage({ params }: Props) {
  const release = getReleaseBySlug((await params).slug);
  if (!release) notFound();
  const date = new Date(`${release.releaseDate}T00:00:00Z`).toLocaleDateString(
    "en-US",
    { timeZone: "UTC", month: "long", day: "numeric", year: "numeric" },
  );
  return (
    <>
      <section className="container-page release-detail">
        <Link href="/streaming" className="text-link back-link">
          ← All records
        </Link>
        <div className="release-detail-grid">
          <ReleaseArtwork release={release} priority />
          <div className="release-detail-copy">
            <p className="eyebrow">
              {release.type} / {date}
            </p>
            <h1>
              {release.title}
              {release.explicit && (
                <span className="explicit" aria-label="Explicit">
                  E
                </span>
              )}
            </h1>
            <p className="feature-credit">
              {release.artist} · {release.genre}
            </p>
            <p>{release.description}</p>
            <div className="platform-buttons">
              {release.links.map((link) => (
                <Button
                  key={link.platform}
                  href={link.url}
                  external
                  variant={link.primary ? "gold" : "outline"}
                >
                  {link.label}
                  <ArrowIcon />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
