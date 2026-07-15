"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import type { Release } from "@/lib/data/releases";

type ReleaseCtaProps = {
  release: Release;
  size?: "sm" | "md" | "lg";
  className?: string;
};

// Date-driven label: renders "Pre-Save" until the release date, then flips to
// "Stream Now" on the client — no deploy needed on release day.
export function ReleaseCta({ release, size = "lg", className }: ReleaseCtaProps) {
  const [isOut, setIsOut] = useState(false);

  useEffect(() => {
    setIsOut(Date.now() >= new Date(release.releaseDate).getTime());
  }, [release.releaseDate]);

  if (release.status === "presave") {
    if (!release.presaveUrl) {
      return (
        <Button href="/#updates" variant="gold" size={size} className={className}>
          Get Release Alerts
        </Button>
      );
    }

    return (
      <Button
        href={release.presaveUrl}
        external
        variant="gold"
        size={size}
        className={className}
      >
        {isOut ? "Stream Now" : "Pre-Save"}
      </Button>
    );
  }

  const primary =
    release.links.find((link) => link.primary) ?? release.links[0];
  const href = release.presaveUrl || primary?.url;

  if (!href) {
    return null;
  }

  return (
    <Button href={href} external variant="gold" size={size} className={className}>
      Stream Now
    </Button>
  );
}
