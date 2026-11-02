/**
 * The Billboard — the hero.
 *
 * SERVER COMPONENT. No 'use client', no import from motion.tsx or
 * client-hooks.ts. The <h1>, the role rotation, the indexed intro paragraph,
 * the CTAs, the metric strip and the LCP portrait are all in the server HTML.
 *
 * Two deliberate omissions:
 *  · No <Reveal> above the fold. Chrome registers no LCP candidate until the
 *    element paints at meaningful opacity, so a reveal on the portrait or the
 *    h1 pushes LCP out by the full transition duration, by construction.
 *  · No count-up on the metric strip. The old script animated those numbers
 *    from 0, which meant the real figures were absent from the document.
 *    They are static text here.
 */
import Image from "next/image";
import type { CSSProperties } from "react";

import { KeyArt, Kicker } from "@/components/series/chrome";
import { numbers, palettes, profile } from "@/content/portfolio/data";

const GRID_MASK =
  "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 70%)";

/** The first three of the eight ranked metrics. */
const heroNumbers = numbers.slice(0, 3);

export function Billboard() {
  return (
    <section
      id="top"
      aria-labelledby="billboard-h"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-[calc(var(--sv-nav-h)+3rem)] [@media(max-height:500px)_and_(orientation:landscape)]:min-h-0"
    >
      {/* ------------------------------------------------------ atmosphere */}
      <KeyArt palette={palettes.cool} instanceKey="billboard" className="z-art" />

      {/* Anup's signature 60px grid, kept verbatim and masked to the centre. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-art"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          WebkitMaskImage: GRID_MASK,
          maskImage: GRID_MASK,
        }}
      />

      {/* Two halos. `closest-side` ties the falloff to the element box, so one
          declaration holds at every viewport and nothing pays for a 120px
          blur filter. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-[-12%] z-[2] h-[80vh] w-[70vw] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(var(--sv-accent) / 0.28), rgb(var(--sv-accent) / 0.06) 55%, transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-18%] left-[-10%] z-[2] h-[80vh] w-[70vw] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(var(--sv-violet) / 0.20), rgb(var(--sv-violet) / 0.05) 55%, transparent)",
        }}
      />

      {/* Readability scrim over the band where copy meets the portrait on
          narrow viewports, and the section handoff at the bottom edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-scrim bg-gradient-to-b from-ink/70 via-ink/35 to-ink/85 md:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-scrim h-48 bg-gradient-to-t from-ink to-transparent"
      />

      {/* ------------------------------------------------------------ copy */}
      <div className="relative z-copy mx-auto grid w-full max-w-shell grid-cols-1 items-center gap-12 px-gutter md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
        <div className="max-w-[46rem]">
          {/* Series tag lockup. */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accentHot" aria-hidden />
            <Kicker className="tracking-lab-4">
              {profile.studio} &middot; {profile.location}
            </Kicker>
          </div>

          {/* The page's only <h1>. Never animated from opacity 0. */}
          <h1
            id="billboard-h"
            className="mt-6 font-display text-hero font-semibold text-txt1"
          >
            {profile.fullName}
          </h1>

          {/* All five roles are real text nodes. CSS cycles them, and under
              prefers-reduced-motion they collapse to a static middot list. */}
          <div
            className="sv-roles mt-6 font-display text-xl text-accentHot sm:text-2xl"
          >
            {profile.roleRotation.map((role, i) => (
              <span key={role} style={{ "--i": i } as CSSProperties}>
                {role}
              </span>
            ))}
          </div>

          {/* Indexed copy — verbatim. */}
          <p className="mt-7 max-w-[56ch] text-base text-txt2 sm:text-lg">
            {profile.intro}
          </p>

          {/* ------------------------------------------------------- CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-7 py-3 font-medium text-ink shadow-glow transition-[background-color,box-shadow,transform] duration-220 ease-sv hover:bg-accentHot hover:shadow-glowLg"
            >
              Start a conversation
            </a>
            <a
              href="#projects"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full px-7 py-3 font-medium text-txt1 ring-1 ring-white/20 transition-[color,box-shadow] duration-220 ease-sv hover:text-accentHot hover:ring-accent/60"
            >
              See the Originals
            </a>
          </div>

          {/* ------------------------------------------------ metric strip */}
          <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-8">
            {heroNumbers.map((n) => (
              <li key={n.rank} className="min-w-[8rem]">
                <p className="font-display text-3xl font-semibold leading-none text-txt1 sm:text-4xl">
                  {n.value}
                </p>
                <p className="mt-2 max-w-[18ch] text-meta uppercase tracking-lab-1 text-txt3">
                  {n.title}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* -------------------------------------------------------- portrait
            Full opacity on the first painted frame. The conic ring is the
            identity mark; no mask-image falloff — it fights a circular crop. */}
        <div className="order-first justify-self-center md:order-none md:justify-self-end">
          <div
            className="relative aspect-square w-[60vw] max-w-[380px] rounded-full p-[3px]"
            style={{
              background:
                "conic-gradient(from 180deg, rgb(var(--sv-accent)), rgb(var(--sv-violet)), rgb(var(--sv-gold)), rgb(var(--sv-accent)))",
            }}
          >
            <div className="h-full w-full overflow-hidden rounded-full bg-ink2 shadow-card">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                width={profile.portrait.width}
                height={profile.portrait.height}
                sizes="(max-width: 768px) 60vw, 380px"
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
