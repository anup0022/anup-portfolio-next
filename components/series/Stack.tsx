/**
 * The Stack — six grouped panels, every skill expandable to the evidence
 * that backs it.
 *
 * NO 'use client', and no import from motion.tsx: this section ships ZERO
 * JavaScript. The disclosure is a native <details>/<summary>, so it is
 * keyboard-operable for free, needs no state and no hook, and — the point —
 * every evidence string is in the DOM whether the row is open or shut.
 *
 * Skill strings are indexed copy. They are rendered exactly as they appear
 * in content/portfolio/data.ts, in that order, and must not be reworded.
 */
import type { ReactNode } from "react";

import { Surface } from "@/components/series/chrome";
import { evidence, stack } from "@/content/portfolio/data";

/* ----------------------------------------------------------------- icons */
/**
 * The six icons carried over from the pre-redesign markup, restroked from
 * `var(--accent-cyan)` to `currentColor` so the accent token drives them.
 * Keyed by SkillGroup.id; a group with no entry simply renders no icon.
 */
const groupIcons: Record<string, ReactNode> = {
  languages: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  frontend: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </>
  ),
  backend: (
    <>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </>
  ),
  cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
  other: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  ),
};

function GroupIcon({ id }: { id: string }) {
  const glyph = groupIcons[id];
  if (!glyph) return null;
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {glyph}
    </svg>
  );
}

/* ------------------------------------------------------------------ atoms */
/** The two-character mono tile. Decorative: the row is named by the skill. */
function MonoTile({ mono }: { mono: string }) {
  return (
    <span
      aria-hidden
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ink4 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-accent ring-1 ring-accent/20"
    >
      {mono}
    </span>
  );
}

/**
 * The disclosure.
 *
 * The body animates `grid-template-rows: 0fr -> 1fr` — the modern height
 * animation — but ONLY the `transition-property` sits behind
 * `@supports (grid-template-rows: 0fr)`. The rows themselves are declared
 * unconditionally, so an engine that reports support yet animates it badly
 * (older Safari) simply snaps open; it can never end up with an open row
 * collapsed to zero. `group-open` outranks the closed state on specificity,
 * so the open height does not depend on Tailwind's class ordering.
 */
function SkillRow({
  name,
  mono,
  notes,
}: {
  name: string;
  mono: string;
  notes: string[];
}) {
  return (
    <details className="group/skill rounded-xl bg-ink2/60 ring-1 ring-white/[0.05] transition-[background-color,box-shadow] duration-220 ease-sv hover:ring-accent/30 open:bg-ink4/50 open:ring-accent/25">
      <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-3 px-3 py-2 [&::-webkit-details-marker]:hidden">
        <MonoTile mono={mono} />
        <span className="text-sm text-txt1">{name}</span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-auto h-4 w-4 shrink-0 text-txt3 transition-transform duration-220 ease-sv group-open/skill:rotate-180"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <div className="grid grid-rows-[0fr] duration-420 ease-sv group-open/skill:grid-rows-[1fr] motion-reduce:transition-none supports-[grid-template-rows:0fr]:transition-[grid-template-rows]">
        <div className="min-h-0 overflow-hidden">
          <ul className="space-y-1.5 px-3 pb-3 pl-[56px] pt-1">
            {notes.map((note) => (
              <li
                key={note}
                className="relative pl-4 text-meta text-txt2 before:absolute before:left-0 before:top-[0.62em] before:h-1 before:w-1 before:rounded-full before:bg-accent before:content-['']"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}

/** A skill with no evidence is a plain chip, not an empty disclosure. */
function SkillChip({ name, mono }: { name: string; mono: string }) {
  return (
    <div className="flex min-h-[44px] items-center gap-3 rounded-xl bg-ink2/40 px-3 py-2 ring-1 ring-white/[0.04]">
      <MonoTile mono={mono} />
      <span className="text-sm text-txt1">{name}</span>
    </div>
  );
}

/* --------------------------------------------------------------- section */
export function Stack() {
  return (
    <div className="sv-gutter mx-auto mt-12 w-full max-w-shell">
      <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group) => (
          <li key={group.id}>
            <Surface seam className="flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink4 text-accent ring-1 ring-accent/20"
                >
                  <GroupIcon id={group.id} />
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight-display text-txt1">
                  {group.title}
                </h3>
              </div>
              <ul className="mt-5 flex flex-col gap-1.5">
                {group.skills.map((skill) => {
                  const notes = evidence[skill.name];
                  return (
                    <li key={skill.name}>
                      {notes && notes.length > 0 ? (
                        <SkillRow name={skill.name} mono={skill.mono} notes={notes} />
                      ) : (
                        <SkillChip name={skill.name} mono={skill.mono} />
                      )}
                    </li>
                  );
                })}
              </ul>
            </Surface>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stack;
