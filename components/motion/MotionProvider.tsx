"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
const MotionContext = createContext({
  enabled: false,
  reduced: false,
  toggle: () => {},
});
export const useMotion = () => useContext(MotionContext);
export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    sync();
    try {
      setPaused(localStorage.getItem("fp-motion-paused") === "true");
    } catch {
      /* Storage is optional. */
    }
    setReady(true);
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  const enabled = ready && !paused && !reduced;
  function toggle() {
    const next = !paused;
    setPaused(next);
    try {
      localStorage.setItem("fp-motion-paused", String(next));
    } catch {
      /* Storage is optional. */
    }
  }
  return (
    <MotionContext.Provider value={{ enabled, reduced, toggle }}>
      <div data-motion={enabled ? "running" : "paused"}>{children}</div>
    </MotionContext.Provider>
  );
}
export function MotionToggle() {
  const { enabled, reduced, toggle } = useMotion();
  return (
    <button
      type="button"
      className="motion-toggle"
      onClick={toggle}
      disabled={reduced}
      aria-pressed={enabled}
      aria-label={
        reduced
          ? "Motion reduced by your device setting"
          : enabled
            ? "Pause visual motion"
            : "Enable visual motion"
      }
    >
      <span className="motion-indicator" aria-hidden="true">
        {enabled ? "Ⅱ" : "▷"}
      </span>
      <span>
        {reduced ? "Reduced motion" : enabled ? "Motion on" : "Motion off"}
      </span>
    </button>
  );
}
