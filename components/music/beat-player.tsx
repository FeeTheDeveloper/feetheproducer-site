"use client";

import { type ChangeEvent, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/cn";

type BeatPlayerProps = {
  src: string;
  title?: string;
  className?: string;
  size?: "sm" | "lg";
};

const PLAYER_EVENT = "ftp:beat-player-activated";

let activeAudio: HTMLAudioElement | null = null;

function formatTime(value: number): string {
  if (!Number.isFinite(value) || value <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function getMimeType(src: string): string | undefined {
  if (src.endsWith(".m4a") || src.endsWith(".mp4")) {
    return "audio/mp4";
  }

  if (src.endsWith(".mp3")) {
    return "audio/mpeg";
  }

  if (src.endsWith(".wav")) {
    return "audio/wav";
  }

  return undefined;
}

export function BeatPlayer({
  src,
  title,
  className,
  size = "sm"
}: BeatPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rangeId = useId();
  const playerId = useId();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) {
      return;
    }

    const stableAudio = audioElement;

    function syncTime() {
      setCurrentTime(stableAudio.currentTime);
    }

    function syncDuration() {
      setDuration(
        Number.isFinite(stableAudio.duration) ? stableAudio.duration : 0
      );
    }

    function handlePlay() {
      setIsPlaying(true);
      setHasError(false);
      activeAudio = stableAudio;
    }

    function handlePause() {
      setIsPlaying(false);

      if (activeAudio === stableAudio) {
        activeAudio = null;
      }
    }

    function handleEnded() {
      stableAudio.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);

      if (activeAudio === stableAudio) {
        activeAudio = null;
      }
    }

    function handleError() {
      setHasError(true);
      setIsPlaying(false);

      if (activeAudio === stableAudio) {
        activeAudio = null;
      }
    }

    function handlePlayerActivated(event: Event) {
      const customEvent = event as CustomEvent<{ playerId: string }>;

      if (customEvent.detail.playerId === playerId) {
        return;
      }

      if (!stableAudio.paused) {
        stableAudio.pause();
      }

      if (stableAudio.currentTime !== 0) {
        stableAudio.currentTime = 0;
      }

      setCurrentTime(0);
      setIsPlaying(false);
    }

    stableAudio.addEventListener("timeupdate", syncTime);
    stableAudio.addEventListener("loadedmetadata", syncDuration);
    stableAudio.addEventListener("durationchange", syncDuration);
    stableAudio.addEventListener("play", handlePlay);
    stableAudio.addEventListener("pause", handlePause);
    stableAudio.addEventListener("ended", handleEnded);
    stableAudio.addEventListener("error", handleError);
    window.addEventListener(PLAYER_EVENT, handlePlayerActivated as EventListener);

    return () => {
      stableAudio.removeEventListener("timeupdate", syncTime);
      stableAudio.removeEventListener("loadedmetadata", syncDuration);
      stableAudio.removeEventListener("durationchange", syncDuration);
      stableAudio.removeEventListener("play", handlePlay);
      stableAudio.removeEventListener("pause", handlePause);
      stableAudio.removeEventListener("ended", handleEnded);
      stableAudio.removeEventListener("error", handleError);
      window.removeEventListener(
        PLAYER_EVENT,
        handlePlayerActivated as EventListener
      );

      if (activeAudio === stableAudio) {
        activeAudio = null;
      }
    };
  }, [playerId]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (activeAudio === audio) {
      audio.pause();
      activeAudio = null;
    }

    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setHasError(false);
    audio.load();
  }, [src]);

  async function togglePlayback() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      const previousAudio = activeAudio;

      if (previousAudio && previousAudio !== audio) {
        previousAudio.pause();
        previousAudio.currentTime = 0;
      }

      window.dispatchEvent(
        new CustomEvent(PLAYER_EVENT, {
          detail: { playerId }
        })
      );

      activeAudio = audio;
      await audio.play();
    } catch {
      setHasError(true);
      setIsPlaying(false);
    }
  }

  function handleSeek(event: ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;

    if (!audio || duration <= 0) {
      return;
    }

    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  const buttonLabel = isPlaying ? "Pause" : "Play";
  const disabled = !src || hasError;
  const mimeType = getMimeType(src);

  return (
    <div
      className={cn(
        "rounded-2xl border border-gold/25 bg-black/80 p-4 backdrop-blur",
        size === "lg" ? "md:p-5" : "",
        className
      )}
    >
      <audio ref={audioRef} preload="metadata">
        <source src={src} type={mimeType} />
      </audio>

      {title ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widerx text-gold/80">
          {title}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={togglePlayback}
          disabled={disabled}
          aria-label={isPlaying ? "Pause track" : "Play track"}
          className={cn(
            "inline-flex min-w-[118px] items-center justify-center gap-2 rounded-full bg-gold-gradient px-4 py-3 text-xs font-semibold uppercase tracking-widerx text-black transition duration-300",
            disabled
              ? "cursor-not-allowed opacity-50"
              : "shadow-gold hover:-translate-y-0.5 hover:shadow-ember"
          )}
        >
          {isPlaying ? (
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-4 w-4 fill-current"
            >
              <path d="M7 5h3v14H7zm7 0h3v14h-3z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-4 w-4 fill-current"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          <span>{buttonLabel}</span>
        </button>

        <div className="min-w-0 flex-1">
          <input
            id={rangeId}
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(currentTime, duration || 0)}
            onChange={handleSeek}
            disabled={disabled || duration === 0}
            aria-label={title ? `${title} progress` : "Track progress"}
            className="audio-slider w-full"
          />

          <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-widerx text-white/55">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : "Preview"}</span>
          </div>
        </div>
      </div>

      {hasError ? (
        <p className="mt-3 text-xs font-semibold uppercase tracking-widerx text-red-bright">
          Audio file unavailable. Add the track under public/audio.
        </p>
      ) : null}
    </div>
  );
}
