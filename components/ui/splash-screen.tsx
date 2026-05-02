"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

const VISIBLE_MS = 2500;
const FADE_MS = 700;
const STORAGE_KEY = "ftp:seenSplash";

type Stage = "hidden" | "visible" | "fading";

export function SplashScreen() {
  const [stage, setStage] = useState<Stage>("hidden");

  useEffect(() => {
    if (typeof window === "undefined") return;

    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      alreadySeen = false;
    }
    if (alreadySeen) return;

    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore quota / privacy mode errors
    }

    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    setStage("visible");

    const fadeTimer = window.setTimeout(() => setStage("fading"), VISIBLE_MS);
    const hideTimer = window.setTimeout(() => {
      setStage("hidden");
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    }, VISIBLE_MS + FADE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, []);

  if (stage === "hidden") return null;

  const isFading = stage === "fading";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Fee The Producer"
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink",
        "transition-opacity ease-out",
        isFading
          ? "pointer-events-none opacity-0"
          : "opacity-100"
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(208,0,0,0.45)_0%,rgba(208,0,0,0.12)_45%,rgba(0,0,0,0)_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(212,175,55,0.18)_0%,rgba(0,0,0,0)_70%)]"
      />

      <div className="relative flex flex-col items-center justify-center px-6">
        <div className="ftp-splash-logo relative">
          <span
            aria-hidden
            className="ftp-splash-glow pointer-events-none absolute inset-0 -z-10 rounded-full bg-gold/30 blur-3xl"
          />
          <img
            src={SITE.images.logo}
            alt={`${SITE.name} logo`}
            width={384}
            height={384}
            decoding="async"
            fetchPriority="high"
            className="h-56 w-56 select-none object-contain drop-shadow-[0_18px_40px_rgba(212,175,55,0.25)] sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96"
            draggable={false}
          />
        </div>

        <p className="ftp-splash-tagline mt-8 text-center text-[10px] font-semibold uppercase tracking-widerx text-gold sm:text-xs">
          Beats · Releases · Licensing
        </p>
      </div>

      <span
        aria-hidden
        className="ftp-splash-bar pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-gold to-transparent"
      />
    </div>
  );
}
