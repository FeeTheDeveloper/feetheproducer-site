"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Logo";
import { NAV_ITEMS } from "@/lib/site";
import { cn } from "@/lib/cn";

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
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
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
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widerx transition-colors",
                  active
                    ? "bg-white/5 text-gold"
                    : "text-white/70 hover:text-bone"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-bone lg:hidden"
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
        <div className="border-t border-white/10 bg-ink/95 backdrop-blur-xl lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
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
                    "rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-widerx transition-colors",
                    active
                      ? "bg-white/5 text-gold"
                      : "text-white/80 hover:bg-white/5 hover:text-bone"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 px-1">
              <Button href="/beats" variant="gold" size="md" className="w-full">
                Shop Beats
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
