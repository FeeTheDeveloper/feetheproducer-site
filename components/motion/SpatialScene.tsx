"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotion } from "./MotionProvider";
export function SpatialScene({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const { enabled } = useMotion();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    let inView = false;
    const sync = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  useEffect(() => {
    const element = ref.current;
    const target = plane.current;
    if (!element || !target || !enabled || !visible) return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      target.style.setProperty("--scene-x", `${x}deg`);
      target.style.setProperty("--scene-y", `${y}deg`);
      frame = 0;
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType === "touch") return;
      const bounds = element.getBoundingClientRect();
      x = Math.max(
        -4,
        Math.min(4, (0.5 - (event.clientY - bounds.top) / bounds.height) * 8),
      );
      y = Math.max(
        -5,
        Math.min(5, ((event.clientX - bounds.left) / bounds.width - 0.5) * 10),
      );
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const reset = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(frame);
      target.style.removeProperty("--scene-x");
      target.style.removeProperty("--scene-y");
    };
  }, [enabled, visible]);
  return (
    <div
      ref={ref}
      className={`spatial-scene ${className}`}
      data-active={enabled && visible ? "true" : "false"}
    >
      <div ref={plane} className="spatial-plane">
        {children}
      </div>
    </div>
  );
}
