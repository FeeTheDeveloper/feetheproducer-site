"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PlayIcon } from "@/components/ui/Icons";
import { livePerformance } from "@/lib/data/performance";

export function PerformanceScreen() {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setReady(true);
    const element = video.current;
    if (!element) return;
    const pauseWhenHidden = () => {
      if (document.hidden) element.pause();
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      element.pause();
    };
  }, []);

  async function play() {
    const element = video.current;
    if (!element) return;
    setError(false);
    try {
      await element.play();
      element.focus();
    } catch {
      setError(true);
    }
  }

  return (
    <div className="performance-arena" data-playing={playing}>
      <Image
        src={livePerformance.arena}
        alt=""
        fill
        sizes="100vw"
        className="arena-environment"
      />
      <div className="arena-shade" aria-hidden="true" />
      <div className="arena-monitor">
        <div className="monitor-masthead">
          <span>CENTER CIRCLE</span>
          <span>THE LIVE SESSION</span>
        </div>
        <div className="monitor-picture">
          <video
            ref={video}
            controls
            playsInline
            tabIndex={0}
            preload="none"
            poster={livePerformance.poster}
            src={livePerformance.video}
            aria-label="Payroll Giovanni performing live with Bylugphonics"
            aria-describedby="performance-context"
            onPlay={() => {
              setStarted(true);
              setPlaying(true);
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onError={() => setError(true)}
          >
            Watch the full episode using the Tubi link below.
          </video>
          {ready && !started && !error && (
            <button
              type="button"
              className="performance-play"
              onClick={play}
              aria-label="Play Payroll Giovanni live with Bylugphonics"
            >
              <span className="performance-play-icon"><PlayIcon /></span>
              <span>Watch the performance</span>
            </button>
          )}
        </div>
        <div className="monitor-credit">
          <span>{livePerformance.artist}</span>
          <span>LIVE WITH <strong>BYLUGPHONICS</strong></span>
        </div>
      </div>
      <p className="arena-note">A stadium-inspired viewing room</p>
      {error && (
        <p className="performance-error" role="status">
          The clip couldn’t play. Try the video controls or <a href={livePerformance.sourceUrl} target="_blank" rel="noopener noreferrer">watch the episode on Tubi ↗</a>.
        </p>
      )}
    </div>
  );
}
