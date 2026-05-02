import Link from "next/link";

import { Wordmark } from "@/components/ui/Logo";
import { NAV_ITEMS, SITE } from "@/lib/site";

const SOCIAL_LINKS: Array<{ href: string; label: string }> = [
  { href: SITE.social.instagram, label: "Instagram" },
  { href: SITE.social.youtube, label: "YouTube" },
  { href: SITE.social.spotify, label: "Spotify" },
  { href: SITE.social.apple, label: "Apple Music" },
  { href: SITE.social.soundcloud, label: "SoundCloud" },
  { href: SITE.social.tiktok, label: "TikTok" }
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-12 border-t border-white/10 bg-ink/80">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Wordmark />
            <p className="mt-4 max-w-md text-sm text-white/65">
              {SITE.legalName} — veteran-owned music production brand. Built
              for beats, releases, licensing, and artist collaboration.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-block text-sm font-semibold uppercase tracking-widerx text-gold hover:underline"
            >
              {SITE.email}
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widerx text-white/50">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widerx text-white/50">
              Listen & Follow
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 text-sm text-white/80">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="uppercase tracking-widerx text-gold/70">
            Veteran-Owned · Built Loud · Built Premium
          </p>
        </div>
      </div>
    </footer>
  );
}
