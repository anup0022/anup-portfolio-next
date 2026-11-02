"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * SSR-safe media query. The third useSyncExternalStore argument is the whole
 * point: it is what prevents the hydration mismatch that the common
 * useState + useEffect + matchMedia pattern produces. Never call
 * window.matchMedia during render.
 *
 * SSR therefore always emits the reduced/touch/no-hover branch and upgrades
 * after hydration. Where the decision is purely visual, prefer a CSS media
 * query and use no JS at all.
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback
  );
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useFinePointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");

/** Any component whose output must not appear in server HTML returns null until true. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
