import Link from "next/link";

import { Wordmark } from "@/components/ui/Logo";
import { NAV_ITEMS, SITE } from "@/lib/site";

const SOCIAL_LINKS: Array<{ href: string; label: string }> = [
  { href: SITE.social.instagram, label: "Instagram" },
  { href: SITE.social.youtube, label: "YouTube" },
  { href: SITE.social.spotify, label: "Spotify" },
  { href: SITE.social.soundcloud, label: "SoundCloud" }
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-white/10 bg-ink/90">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_0.7fr_0.9fr_0.9fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-md text-sm text-white/65">
              Premium beats, music releases, and licensing by Fee The Producer.
              Veteran-owned music brand built for artists who need records that
              move.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widerx text-white/45">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widerx text-white/45">
              Contact
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <a
                href={`mailto:${SITE.email}`}
                className="block transition hover:text-gold"
              >
                {SITE.email}
              </a>
              <a href={SITE.url} className="block transition hover:text-gold">
                {SITE.domain}
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widerx text-white/45">
              Social
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
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

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center">
          <p>
            Copyright {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="uppercase tracking-widerx text-gold/70">
            Veteran-owned music platform
          </p>
        </div>
      </div>
    </footer>
  );
}
