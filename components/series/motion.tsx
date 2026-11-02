"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ Reveal */
/**
 * One module-level IntersectionObserver shared by every instance.
 *
 * The hidden state lives in CSS behind `html.sv-js`, not here. No JS, a
 * failed bundle, a crawler that does not execute, or an error before this
 * mounts all leave content fully visible. Serialising opacity:0 into server
 * HTML is how a redesign quietly de-indexes itself.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-shown", "");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
  );
  return observer;
}

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.setAttribute("data-shown", "");
      return;
    }
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ transitionDelay: `${delay}ms` }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Callers pass this so item 10 of a rail is not held back 700ms. */
export const revealDelay = (i: number) => Math.min(i, 5) * 70;

/* -------------------------------------------------------------------- Rail */
function RailArrows({ rail }: { rail: React.RefObject<HTMLUListElement> }) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    // 8px dead zone absorbs sub-pixel rounding.
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, [rail]);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    // A ResizeObserver on the scroller, not window resize: in App Router a
    // font swap can change layout without a window resize firing.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure, rail]);

  const page = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    // 80%, not 100%, so one card carries over as a continuity anchor.
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // The button IS the edge fade. Focus variants are mandatory: a hover-only
  // reveal leaves focusable but fully transparent buttons in the tab order.
  const base =
    "absolute top-6 bottom-8 z-20 w-gutter min-w-10 items-center justify-center text-2xl text-txt1 " +
    "hidden [@media(hover:hover)]:flex opacity-0 transition-opacity duration-220 ease-sv " +
    "group-hover/rail:opacity-100 focus-visible:opacity-100 group-focus-within/rail:opacity-100";

  return (
    <>
      {canLeft ? (
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => page(-1)}
          className={`${base} left-0 bg-gradient-to-r from-ink/90 to-transparent`}
        >
          <span aria-hidden>&#8249;</span>
        </button>
      ) : null}
      {canRight ? (
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => page(1)}
          className={`${base} right-0 bg-gradient-to-l from-ink/90 to-transparent`}
        >
          <span aria-hidden>&#8250;</span>
        </button>
      ) : null}
    </>
  );
}

/**
 * Native scroll-snap, so iOS momentum, trackpad, shift+wheel and
 * Tab-to-focus auto-scroll all work with no code. tabIndex + role=region +
 * a label is what lets a Firefox keyboard user arrow-scroll it at all, and
 * what stops a scrollbar-less region being an unannounced trap.
 */
export function Rail({
  ariaLabel,
  children,
  className = "",
}: {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  return (
    <div className={`group/rail relative ${className}`}>
      <ul
        ref={ref}
        className="sv-rail sv-gutter gap-4"
        tabIndex={0}
        role="region"
        aria-label={ariaLabel}
      >
        {children}
      </ul>
      <RailArrows rail={ref} />
    </div>
  );
}
