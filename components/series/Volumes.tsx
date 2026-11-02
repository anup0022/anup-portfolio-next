"use client";

/**
 * The career timeline: four Volumes as a tab strip, each panel a rail of
 * Episode cards. The one genuinely stateful section on the page.
 *
 * SSR CONTRACT — the reason this file is written the way it is:
 * every volume header and all twelve episode bodies are rendered into the
 * server HTML. The inactive panels are hidden with the `hidden` attribute
 * ONLY after mount (useMounted), so a crawler, a no-JS reader and a failed
 * bundle all get the complete, readable timeline. If the only path to an
 * episode's text were a tab click, that text would have left the indexed
 * document.
 *
 * Nothing here serialises opacity:0 into server HTML. Reveal's resting state
 * lives in CSS behind `html.sv-js`, and the panel crossfade is driven by
 * state that is false on the server.
 */

import { useCallback, useEffect, useRef, useState } from "react";

import { GhostMark, KeyArt, Surface } from "@/components/series/chrome";
import { Rail, Reveal } from "@/components/series/motion";
import { revealDelay } from "@/lib/reveal";
import { originals, volumes } from "@/content/portfolio/data";
import type { Episode, Volume } from "@/content/portfolio/types";
import { usePrefersReducedMotion, useMounted } from "@/lib/client-hooks";

/* ----------------------------------------------------------------- dates */

const MONTHS: Record<string, string> = {
  jan: "01",
  feb: "02",
  mar: "03",
  apr: "04",
  may: "05",
  jun: "06",
  jul: "07",
  aug: "08",
  sep: "09",
  oct: "10",
  nov: "11",
  dec: "12",
};

/** 'Aug 2022' -> '2022-08'. Anything else -> null, and we render plain text. */
function isoMonth(value: string): string | null {
  const match = value.trim().match(/^([A-Za-z]{3,9})\s+(\d{4})$/);
  if (!match) return null;
  const month = MONTHS[match[1].slice(0, 3).toLowerCase()];
  return month ? `${match[2]}-${month}` : null;
}

/**
 * Renders a period string, wrapping only the halves that yield a real ISO
 * value in <time>. 'Present', '6 months' and '-50% bug-fix time' stay plain
 * text rather than carrying a wrong dateTime. The ' - ' separator is
 * preserved verbatim from the data module.
 */
function PeriodText({ value }: { value: string }) {
  const parts = value.split(/\s-\s/);

  if (parts.length !== 2) {
    const iso = isoMonth(value);
    return iso ? <time dateTime={iso}>{value}</time> : <>{value}</>;
  }

  const [start, end] = parts;
  const isoStart = isoMonth(start);
  const isoEnd = isoMonth(end);

  return (
    <>
      {isoStart ? <time dateTime={isoStart}>{start}</time> : start}
      {" - "}
      {isoEnd ? <time dateTime={isoEnd}>{end}</time> : end}
    </>
  );
}

/* ----------------------------------------------------------------- cards */

const brandById = new Map(originals.map((o) => [o.id, o.brand]));

/** Hex + 2-digit alpha. Every palette value in the data module is 6-digit hex. */
const alpha = (hex: string, aa: string) => `${hex}${aa}`;

function EpisodeCard({
  episode,
  volume,
  index,
}: {
  episode: Episode;
  volume: Volume;
  index: number;
}) {
  const accent = volume.palette.accent;
  const instanceKey = episode.code.replace(/[^a-zA-Z0-9]+/g, "-");
  const episodeNo = episode.code.split("·")[1] ?? episode.code;
  const brands = (episode.originals ?? [])
    .map((id) => brandById.get(id))
    .filter((b): b is string => Boolean(b));

  return (
    <Reveal
      as="li"
      delay={revealDelay(index)}
      className="w-[80vw] shrink-0 snap-start sm:w-[48vw] lg:w-[30vw] xl:w-[26vw]"
    >
      <Surface seam className="flex h-full flex-col">
        <div className="relative aspect-[16/9] shrink-0">
          <KeyArt palette={volume.palette} instanceKey={instanceKey}>
            <GhostMark className="absolute -top-6 right-1 !text-[clamp(2.75rem,9vw,4.5rem)]">
              {episodeNo}
            </GhostMark>
          </KeyArt>
          <p className="absolute bottom-0 left-0 p-5 text-label uppercase tracking-lab-2 text-txt2">
            {episode.code}
          </p>
        </div>

        <div className="flex grow flex-col p-5 sm:p-6">
          <h4 className="font-display text-xl font-semibold leading-tight text-txt1 sm:text-2xl">
            {episode.title}
          </h4>

          <p className="mt-3 text-txt2">{episode.body}</p>

          <p className="mt-5">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-lab-1"
              style={{
                color: accent,
                backgroundColor: alpha(accent, "1f"),
                boxShadow: `inset 0 0 0 1px ${alpha(accent, "55")}`,
              }}
            >
              <PeriodText value={episode.runtime} />
            </span>
          </p>

          {brands.length > 0 ? (
            <div className="mt-5">
              <p className="text-label uppercase tracking-lab-2 text-txt3">
                Originals produced
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-meta text-txt2">
                {brands.map((brand) => (
                  <li key={brand}>{brand}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <ul className="mt-5 flex flex-wrap gap-2 pt-1">
            {episode.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[0.6875rem] tracking-lab-1 text-txt3 ring-1 ring-inset ring-white/[0.08]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Surface>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- panels */

function VolumePanel({
  volume,
  previous,
}: {
  volume: Volume;
  previous?: Volume;
}) {
  const accent = volume.palette.accent;
  /**
   * The narrative beat: V03 and V04 are the same studio. Derived from the
   * data rather than hard-coded, so it survives an edit to either tenure.
   */
  const promotion = previous && previous.company === volume.company ? previous : null;

  return (
    <div className="pt-8">
      <Reveal className="sv-gutter mx-auto w-full max-w-shell">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span
            className="text-label font-semibold uppercase tracking-lab-3"
            style={{ color: accent }}
          >
            {volume.label}
          </span>
          {promotion ? (
            <span
              className="rounded-full px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-lab-1"
              style={{
                color: accent,
                backgroundColor: alpha(accent, "1f"),
                boxShadow: `inset 0 0 0 1px ${alpha(accent, "55")}`,
              }}
            >
              Promotion
            </span>
          ) : null}
          <span className="text-meta text-txt3">
            {volume.episodes.length} episodes
          </span>
        </div>

        <h3 className="mt-3 font-display text-card-title font-semibold text-txt1">
          {volume.company}
          <span className="text-txt3"> — {volume.role}</span>
        </h3>

        <p className="mt-2 text-meta text-txt3">
          <PeriodText value={volume.period} /> · {volume.place}
        </p>

        {promotion ? (
          <p className="mt-3 max-w-[60ch] text-meta text-txt2">
            Same studio as {promotion.label}: promoted from {promotion.role} to{" "}
            {volume.role}.
          </p>
        ) : null}

        <p className="mt-4 max-w-[60ch] text-txt2">{volume.synopsis}</p>
      </Reveal>

      <Rail ariaLabel={`Episodes in ${volume.label}`} className="mt-2">
        {volume.episodes.map((episode, i) => (
          <EpisodeCard
            key={episode.code}
            episode={episode}
            volume={volume}
            index={i}
          />
        ))}
      </Rail>
    </div>
  );
}

/* ----------------------------------------------------------------- strip */

type Pill = { x: number; y: number; w: number; h: number; animate: boolean };

export function Volumes() {
  // The last volume is the current work, so it is the default selection.
  const [active, setActive] = useState(volumes.length - 1);
  const [entering, setEntering] = useState(false);
  const [pill, setPill] = useState<Pill | null>(null);

  const mounted = useMounted();
  const reduced = usePrefersReducedMotion();

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const stripRef = useRef<HTMLDivElement>(null);

  /**
   * The sliding indicator is measured, not computed: the tabs are
   * intrinsically sized (different company names), so there is no
   * percentage that works. useEffect, not useLayoutEffect — this component
   * is server-rendered and useLayoutEffect warns there. The first
   * measurement is applied with a 0ms duration so the pill does not fly in
   * from the left on load.
   */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const measure = () => {
      const button = tabRefs.current[active];
      if (!button) return;
      const next = {
        x: button.offsetLeft,
        y: button.offsetTop,
        w: button.offsetWidth,
        h: button.offsetHeight,
      };
      setPill((prev) =>
        prev &&
        prev.x === next.x &&
        prev.y === next.y &&
        prev.w === next.w &&
        prev.h === next.h
          ? prev
          : { ...next, animate: prev !== null }
      );
    };

    measure();

    // A ResizeObserver on the strip and its tabs, not window resize: a font
    // swap changes tab width without a resize event firing.
    const ro = new ResizeObserver(measure);
    ro.observe(strip);
    for (const button of tabRefs.current) {
      if (button) ro.observe(button);
    }
    return () => ro.disconnect();
  }, [active]);

  /**
   * After a tab change: let the incoming panel settle into its resting
   * transform (the crossfade), and reset that panel's rail to the start.
   * Runs after the panel has been un-hidden, so the scroller has layout.
   */
  useEffect(() => {
    const timer = window.setTimeout(() => setEntering(false), 20);

    const scroller = panelRefs.current[active]?.querySelector<HTMLElement>(
      '[role="region"]'
    );
    scroller?.scrollTo({ left: 0, behavior: reduced ? "auto" : "smooth" });

    return () => window.clearTimeout(timer);
  }, [active, reduced]);

  const select = useCallback(
    (index: number) => {
      if (index === active) return;
      setEntering(true);
      setActive(index);
    },
    [active]
  );

  /**
   * The keyboard contract role="tab" promises. Declaring the roles without
   * this is worse for assistive tech than plain buttons: roving tabindex,
   * ArrowLeft/ArrowRight with wrap, Home/End, and focus follows selection.
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const count = volumes.length;
    let next: number;

    switch (event.key) {
      case "ArrowRight":
        next = (active + 1) % count;
        break;
      case "ArrowLeft":
        next = (active - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const activeAccent = volumes[active].palette.accent;

  return (
    <div className="mt-12">
      <Reveal>
        {/*
          `.sv-rail > :last-child::after` is the rail's trailing scroll
          spacer. On a flex-column tab button it lands INSIDE the button and
          its `flex: 0 0 <gutter>` resolves against the cross axis, padding
          the last tab with a gutter of dead height. Suppress it there and
          hang the spacer off the strip's own ::after, where it is a real
          flex child of the scroller.
        */}
        <div
          ref={stripRef}
          role="tablist"
          aria-label="Career volumes"
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className={
            "sv-rail sv-gutter relative mx-auto w-full max-w-shell snap-none items-stretch gap-2 " +
            "[&>:last-child]:after:hidden " +
            "after:block after:w-gutter after:shrink-0 after:content-['']"
          }
        >
          <span
            aria-hidden
            className="pointer-events-none absolute z-0 rounded-2xl transition-[transform,width,height,background-color,box-shadow] ease-sv"
            style={{
              left: 0,
              top: pill?.y ?? 0,
              height: pill?.h ?? 0,
              width: pill?.w ?? 0,
              transform: `translateX(${pill?.x ?? 0}px)`,
              transitionDuration: pill?.animate ? "420ms" : "0ms",
              backgroundColor: alpha(activeAccent, "1c"),
              boxShadow: `inset 0 0 0 1px ${alpha(activeAccent, "66")}, 0 0 28px ${alpha(
                activeAccent,
                "26"
              )}`,
            }}
          />

          {volumes.map((volume, i) => {
            const isActive = i === active;
            return (
              <button
                key={volume.label}
                type="button"
                role="tab"
                id={`volume-tab-${volume.number}`}
                aria-selected={isActive}
                aria-controls={`volume-panel-${volume.number}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(i)}
                ref={(node) => {
                  tabRefs.current[i] = node;
                }}
                className={
                  "relative z-[1] flex min-h-[44px] shrink-0 flex-col justify-center gap-1 rounded-2xl px-5 py-3 text-left " +
                  "transition-colors duration-220 ease-sv " +
                  "ring-inset aria-selected:ring-1 aria-selected:ring-white/10 " +
                  (isActive ? "text-txt1" : "text-txt3 hover:text-txt2")
                }
              >
                <span
                  className="text-label font-semibold uppercase tracking-lab-3"
                  style={isActive ? { color: volume.palette.accent } : undefined}
                >
                  {volume.label}
                </span>
                <span className="font-display text-base font-semibold leading-none">
                  {volume.company}
                </span>
                <span className="text-[0.6875rem] leading-tight text-txt3">
                  <PeriodText value={volume.period} />
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/*
        Every panel is in the DOM, always. `hidden` is applied only once
        mounted === true, which is false on the server and on the first
        client render — so the server HTML carries all four volume headers
        and all twelve episode bodies, and hydration matches exactly.
      */}
      {volumes.map((volume, i) => {
        const isActive = i === active;
        return (
          <div
            key={volume.label}
            role="tabpanel"
            id={`volume-panel-${volume.number}`}
            aria-labelledby={`volume-tab-${volume.number}`}
            tabIndex={0}
            hidden={mounted && !isActive}
            ref={(node) => {
              panelRefs.current[i] = node;
            }}
            className={
              "outline-none transition-[opacity,transform] duration-420 ease-sv " +
              (isActive && entering
                ? "translate-x-6 opacity-0"
                : "translate-x-0 opacity-100")
            }
          >
            <VolumePanel
              volume={volume}
              previous={i > 0 ? volumes[i - 1] : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Volumes;
