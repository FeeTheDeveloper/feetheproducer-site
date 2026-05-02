"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { NAV_ITEMS } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/10 bg-ink/90 backdrop-blur-xl transition duration-300",
        scrolled ? "shadow-panel" : "shadow-[0_1px_0_rgba(255,255,255,0.04)]"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label="Fee The Producer home">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widerx transition duration-300",
                  active
                    ? "bg-white/5 text-gold shadow-[inset_0_0_0_1px_rgba(212,175,55,0.25)]"
                    : "text-white/72 hover:bg-white/5 hover:text-gold"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/beats" variant="gold" size="sm">
            Shop Beats
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-bone transition hover:border-gold/40 hover:text-gold lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-ink/95 lg:hidden">
          <nav className="container-page flex flex-col gap-2 py-4">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-widerx transition duration-300",
                    active
                      ? "bg-white/5 text-gold shadow-[inset_0_0_0_1px_rgba(212,175,55,0.2)]"
                      : "text-white/80 hover:bg-white/5 hover:text-gold"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <Button href="/beats" variant="gold" size="md" className="mt-2 w-full">
              Shop Beats
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
