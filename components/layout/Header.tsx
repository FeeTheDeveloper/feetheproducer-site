"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { NAV_ITEMS, SITE } from "@/lib/site";
import { ArrowIcon } from "@/components/ui/Icons";
export function Header() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);
  const items = NAV_ITEMS.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={pathname === item.href ? "page" : undefined}
      onClick={() => {
        if (menu.current) menu.current.open = false;
      }}
    >
      {item.label}
    </Link>
  ));
  return (
    <header className="site-header">
      <div className="container-page header-inner">
        <Link
          href="/"
          className="brand-link"
          aria-label="Fee The Producer home"
        >
          <Image
            src={SITE.images.logo}
            alt=""
            width={76}
            height={76}
            priority
          />
          <span>
            FEE THE PRODUCER<small>MUSIC PRODUCTION</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {items}
        </nav>
        <Link className="header-cta" href="/contact">
          Let’s create <ArrowIcon />
        </Link>
        <details
          className="mobile-menu"
          ref={menu}
          onKeyDown={(event) => {
            if (event.key === "Escape" && menu.current) {
              menu.current.open = false;
              menu.current.querySelector("summary")?.focus();
            }
          }}
        >
          <summary aria-label="Toggle navigation">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {items}
            <Link href="/contact">
              Start a project <ArrowIcon />
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
