"use client";

/**
 * The 2.4-second title card.
 *
 * Additive by construction: it never gates content, never locks scroll, never
 * wraps <main>, and never appears in server HTML. If this file were deleted the
 * page underneath would be byte-identical.
 *
 * The entry decision is NOT made here. The blocking head script in layout.tsx
 * sets `document.documentElement.dataset.svEntry` to 'play' or 'skip' before
 * first paint, reading prefers-reduced-motion and the sessionStorage flag. We
 * only read the attribute. Reading storage during render is an immediate
 * hydration mismatch in App Router, and the <html> attribute is the one place
 * React never hydrates.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { profile } from "@/content/portfolio/data";
import { useMounted } from "@/lib/client-hooks";

/** sessionStorage, not localStorage: once per visit, not once per lifetime. */
const STORAGE_KEY = "sv.intro";

/**
 * The beat table. Absolute marks from mount, not a chain of nested delays, so
 * the timeline is editable as data and the finished frame is just `beat = 5`.
 * Beat 0 is the resting frame that gives every transition a starting value.
 */
const BEATS: ReadonlyArray<{ at: number; beat: number }> = [
  { at: 0, beat: 1 }, // studio card
  { at: 550, beat: 2 }, // name
  { at: 1100, beat: 3 }, // role line
  { at: 1700, beat: 4 }, // accent rule draws, name lifts
  { at: 2400, beat: 5 }, // dismiss begins
];

/** Matches the opacity transition on .sv-curtain[data-exit]. */
const EXIT_MS = 900;
/** Backstop in case transitionend is never delivered (background tab, etc.). */
const EXIT_BACKSTOP_MS = 1200;
/** Scroll-to-dismiss is armed late so browser scroll restoration cannot fire it. */
const SCROLL_ARM_MS = 200;

const STYLE_ID = "sv-curtain-style";

/**
 * The whole choreography lives here as descendant rules keyed on data-beat.
 * It is injected into <head> rather than rendered inside the portal because the
 * `sv-enter` push-in on <main> outlives the curtain by ~100ms; if the <style>
 * unmounted with the curtain the keyframes would vanish mid-animation.
 *
 * Only the 10px studio label animates letter-spacing. The display-size name uses
 * transform + opacity exclusively — letter-spacing reflows every frame and is
 * genuinely expensive at clamp(3rem, 14vw, 9rem) on mobile. Nothing is blurred:
 * animating filter: blur() on a full-viewport fixed layer forces a full-screen
 * raster at exactly the moment the page is trying to paint.
 */
const CURTAIN_CSS = `
.sv-curtain {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  background: #06080d;
  color: rgb(var(--sv-text-1));
  font-family: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;
  opacity: 1;
  transform: scale(1);
  transition: opacity ${EXIT_MS}ms var(--sv-ease-in), transform ${EXIT_MS}ms var(--sv-ease-in);
}
/* Both layers scale up while one fades out: a push-in through the card, not a crossfade. */
.sv-curtain[data-exit] {
  opacity: 0;
  transform: scale(1.03);
  pointer-events: none;
}

/* Letterbox bars retract on the last beat. */
.sv-curtain-bar {
  position: absolute;
  left: 0;
  right: 0;
  height: 6vh;
  background: #04050a;
  transition: transform var(--sv-d-4) var(--sv-ease);
}
.sv-curtain-bar[data-edge="top"] { top: 0; transform: translateY(0); }
.sv-curtain-bar[data-edge="bottom"] { bottom: 0; transform: translateY(0); }
.sv-curtain[data-beat="5"] .sv-curtain-bar[data-edge="top"] { transform: translateY(-100%); }
.sv-curtain[data-beat="5"] .sv-curtain-bar[data-edge="bottom"] { transform: translateY(100%); }

.sv-curtain-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(10px, 1.6vw, 18px);
  padding-inline: var(--sv-gutter);
  text-align: center;
}

/* Tracking expansion is what reads as a projected title card. Safe at 10px. */
.sv-curtain-studio {
  margin: 0;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(var(--sv-accent-hot));
  letter-spacing: 0.18em;
  opacity: 0;
  transition: opacity var(--sv-d-4) var(--sv-ease), letter-spacing var(--sv-d-4) var(--sv-ease);
}
.sv-curtain:not([data-beat="0"]) .sv-curtain-studio {
  opacity: 1;
  letter-spacing: 0.42em;
}

/* Compositor-only: scale + opacity. Never letter-spacing at this size. */
.sv-curtain-name {
  margin: 0;
  font-size: clamp(3rem, 14vw, 9rem);
  line-height: 0.9;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.035em;
  opacity: 0;
  transform: scale(1.06);
  will-change: transform, opacity;
  transition: opacity var(--sv-d-4) var(--sv-ease), transform var(--sv-d-4) var(--sv-ease);
}
.sv-curtain[data-beat="2"] .sv-curtain-name,
.sv-curtain[data-beat="3"] .sv-curtain-name,
.sv-curtain[data-beat="4"] .sv-curtain-name,
.sv-curtain[data-beat="5"] .sv-curtain-name {
  opacity: 1;
  transform: scale(1);
}
/* One element reacting to a later beat than its own entrance: the name lifts
   as the rule draws under it. */
.sv-curtain[data-beat="4"] .sv-curtain-name,
.sv-curtain[data-beat="5"] .sv-curtain-name {
  transform: scale(1) translateY(-4px);
}

.sv-curtain-role {
  margin: 0;
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: rgb(var(--sv-text-2));
  opacity: 0;
  transform: translateY(12px);
  transition: opacity var(--sv-d-3) var(--sv-ease), transform var(--sv-d-3) var(--sv-ease);
}
.sv-curtain[data-beat="3"] .sv-curtain-role,
.sv-curtain[data-beat="4"] .sv-curtain-role,
.sv-curtain[data-beat="5"] .sv-curtain-role {
  opacity: 1;
  transform: none;
}

.sv-curtain-rule {
  display: block;
  width: min(220px, 42vw);
  height: 1px;
  background: rgb(var(--sv-accent));
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform var(--sv-d-3) var(--sv-ease);
}
.sv-curtain[data-beat="4"] .sv-curtain-rule,
.sv-curtain[data-beat="5"] .sv-curtain-rule {
  transform: scaleX(1);
}

.sv-curtain-skip {
  position: absolute;
  top: calc(6vh + 12px);
  right: var(--sv-gutter);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: 0 16px;
  border: 1px solid rgb(255 255 255 / 0.16);
  border-radius: 6px;
  background: transparent;
  color: rgb(var(--sv-text-2));
  font-family: inherit;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--sv-d-2) var(--sv-ease), color var(--sv-d-1) var(--sv-ease),
    border-color var(--sv-d-1) var(--sv-ease);
}
.sv-curtain:not([data-beat="0"]) .sv-curtain-skip { opacity: 1; }
.sv-curtain-skip:hover {
  color: rgb(var(--sv-text-1));
  border-color: rgb(var(--sv-accent-hot) / 0.6);
}
.sv-curtain-skip:focus-visible {
  outline: 2px solid rgb(var(--sv-accent-hot));
  outline-offset: 3px;
}

/* The one-shot push-in on <main>, underneath the curtain. */
@keyframes sv-enter {
  from { opacity: 0.4; transform: scale(1.02); }
  to { opacity: 1; transform: none; }
}
.sv-enter { animation: sv-enter 1000ms var(--sv-ease) both; }

/* Defensive only: the head script sets data-sv-entry='skip' under reduced
   motion, so this component never mounts in the first place. */
@media (prefers-reduced-motion: reduce) {
  .sv-curtain, .sv-curtain * { transition-duration: 0.01ms !important; }
  .sv-enter { animation: none; }
}
`;

function injectStyleOnce() {
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = CURTAIN_CSS;
  document.head.appendChild(el);
}

export function OpeningCurtain() {
  const mounted = useMounted();
  const [active, setActive] = useState(false);
  const [beat, setBeat] = useState(0);
  const [exiting, setExiting] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const skipRef = useRef<HTMLButtonElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const dismissedRef = useRef(false);

  /* -- Decide, once, after mount. Nothing above this line reaches the server. */
  useEffect(() => {
    if (!mounted) return;
    if (document.documentElement.dataset.svEntry !== "play") return;

    injectStyleOnce();

    const main = document.querySelector("main");
    mainRef.current = main instanceof HTMLElement ? main : null;
    // Client-side only, so `inert` never reaches server HTML. React 18 does not
    // type or serialise the attribute, which is why it is set imperatively.
    mainRef.current?.setAttribute("inert", "");

    setActive(true);

    return () => {
      // Safety net: if this unmounts by any path, <main> must not stay inert.
      mainRef.current?.removeAttribute("inert");
    };
  }, [mounted]);

  /* -- Dismiss. Idempotent: all four escape hatches funnel through here. ---- */
  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    // Throws in some privacy modes; the key's presence is the whole flag.
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* no-op */
    }
    // Retires the pre-paint pseudo-element curtain in globals.css.
    try {
      document.documentElement.dataset.svEntry = "skip";
    } catch {
      /* no-op */
    }

    const main = mainRef.current;
    if (main) {
      main.removeAttribute("inert");
      main.classList.add("sv-enter");
      const clear = (event: AnimationEvent) => {
        if (event.target !== main || event.animationName !== "sv-enter") return;
        main.classList.remove("sv-enter");
        main.removeEventListener("animationend", clear);
      };
      main.addEventListener("animationend", clear);
    }

    // Focus was on the skip button; hand it back to the document.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setBeat(5);
    setExiting(true);
  }, []);

  /* -- The beat machine: absolute marks, one cleanup clears all of them. ---- */
  useEffect(() => {
    if (!active) return;
    const ids = BEATS.map(({ at, beat: next }) =>
      window.setTimeout(() => {
        if (next === 5) dismiss();
        else setBeat(next);
      }, at)
    );
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [active, dismiss]);

  /* -- Focus the skip button so Enter dismisses immediately. --------------- */
  useEffect(() => {
    if (!active) return;
    // preventScroll matters: a focus-induced scroll would trip hatch (4).
    skipRef.current?.focus({ preventScroll: true });
  }, [active]);

  /* -- Escape and scroll. Escape ONLY — a global Enter handler would fire
        from the focused skip button and dismiss twice. No scroll lock: we
        dismiss on scroll instead of blocking it, which removes the entire
        iOS position:fixed body-lock problem class. ------------------------- */
  useEffect(() => {
    if (!active || exiting) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      dismiss();
    };
    const onScroll = () => dismiss();

    window.addEventListener("keydown", onKeyDown);
    const arm = window.setTimeout(
      () => window.addEventListener("scroll", onScroll, { passive: true }),
      SCROLL_ARM_MS
    );

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(arm);
      window.removeEventListener("scroll", onScroll);
    };
  }, [active, exiting, dismiss]);

  /* -- Unmount when the exit transition ends, with a timer backstop. ------- */
  useEffect(() => {
    if (!exiting) return;
    const node = rootRef.current;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      setActive(false);
    };
    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== node || event.propertyName !== "opacity") return;
      finish();
    };

    node?.addEventListener("transitionend", onTransitionEnd);
    const backstop = window.setTimeout(finish, EXIT_BACKSTOP_MS);

    return () => {
      node?.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(backstop);
    };
  }, [exiting]);

  if (!mounted || !active) return null;

  const studioLine = `${profile.location.split(",")[0].trim()} · Since ${profile.careerStart}`;

  return createPortal(
    <div
      ref={rootRef}
      className="sv-curtain"
      data-beat={beat}
      data-exit={exiting ? "" : undefined}
      role="dialog"
      aria-modal="true"
      aria-label="Intro"
    >
      <div className="sv-curtain-bar" data-edge="top" aria-hidden="true" />
      <div className="sv-curtain-bar" data-edge="bottom" aria-hidden="true" />

      <button
        ref={skipRef}
        type="button"
        className="sv-curtain-skip"
        onClick={dismiss}
        aria-label="Skip intro"
      >
        Skip
      </button>

      <div className="sv-curtain-stage">
        {/* Every line here is aria-hidden and duplicated in the Billboard. The
            name is a <p>, never an <h1>: the page has exactly one <h1> and it
            belongs to the hero. */}
        <p className="sv-curtain-studio" aria-hidden="true">
          {studioLine}
        </p>
        <p className="sv-curtain-name" aria-hidden="true">
          {profile.fullName}
        </p>
        <span className="sv-curtain-rule" aria-hidden="true" />
        <p className="sv-curtain-role" aria-hidden="true">
          {profile.role}
        </p>
      </div>
    </div>,
    document.body
  );
}

export default OpeningCurtain;
