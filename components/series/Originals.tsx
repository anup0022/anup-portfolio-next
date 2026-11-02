/**
 * The Originals — the four client brands as poster cards.
 *
 * NO 'use client'. There is no detail modal: every word of copy (logline,
 * build claims, metrics, stack) lives in the card body, so the whole section
 * is static server HTML and nothing leaves the indexed document.
 *
 * ONE DOM tree, two layouts, switched purely in CSS. Below `lg` the list is
 * a snap rail; at `lg` and above the same four siblings, in the same source
 * order, become a 2x2 grid. No JS media branch, so no SSR/hydration subtree
 * swap and no CLS.
 */
import { GhostMark, KeyArt, Surface } from "@/components/series/chrome";
import { originals, profile } from "@/content/portfolio/data";
import type { Original } from "@/content/portfolio/types";

function ExternalIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 transition-transform duration-220 ease-sv [@media(hover:hover)]:group-hover/link:translate-x-0.5"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function OriginalCard({ original: o }: { original: Original }) {
  return (
    <li className="w-[84vw] shrink-0 snap-start sm:w-[62vw] lg:w-auto">
      <Surface className="group flex h-full flex-col [@media(hover:hover)]:hover:-translate-y-1">
        <article className="flex h-full flex-col">
          {/* ---- Key art -------------------------------------------------- */}
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <div className="absolute inset-0 transition-transform duration-1100 ease-sv [@media(hover:hover)]:group-hover:scale-[1.06]">
              <KeyArt palette={o.palette} motif={o.motif} instanceKey={`${o.id}-poster`} />
            </div>

            <GhostMark className="absolute -right-6 -top-10 z-scrim">
              {o.brand.charAt(0)}
            </GhostMark>

            <div className="absolute inset-x-0 bottom-0 z-copy p-5 sm:p-6">
              <p className="text-kicker font-medium uppercase text-accentHot">{o.genre}</p>
              <h3 className="mt-3 font-display text-card-title font-semibold text-txt1">
                {o.title}
              </h3>
              <p className="mt-2 text-meta text-txt3">
                {o.domain} &middot; {o.credit}
              </p>
            </div>
          </div>

          {/* ---- Body ----------------------------------------------------- */}
          <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
            <p className="text-txt2">{o.logline}</p>

            <ul className="flex flex-col gap-2">
              {o.build.map((claim) => (
                <li key={claim} className="flex gap-3 text-meta text-txt2">
                  <span aria-hidden className="mt-[0.45rem] h-px w-4 shrink-0 bg-accent/70" />
                  <span>{claim}</span>
                </li>
              ))}
            </ul>

            <ul className="grid grid-cols-2 gap-3">
              {o.metrics.map((m) => (
                <li
                  key={m.label}
                  className="rounded-xl bg-ink2/70 p-4 ring-1 ring-white/[0.06]"
                >
                  <p className="font-display text-3xl font-semibold leading-none text-accent">
                    {m.value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase leading-snug tracking-lab-2 text-txt3">
                    {m.label}
                  </p>
                </li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-2">
              {o.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-ink4/60 px-3 py-1.5 text-meta text-txt2 ring-1 ring-white/[0.06]"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-1">
              <a
                href={o.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex min-h-[44px] items-center gap-2 rounded-lg px-1 text-label uppercase text-txt1 transition-colors duration-220 ease-sv hover:text-accentHot"
              >
                <span>Visit {o.brand}</span>
                <span className="sr-only">
                  &nbsp;at {o.domain}, opens in a new tab
                </span>
                <ExternalIcon />
              </a>
            </div>
          </div>
        </article>
      </Surface>
    </li>
  );
}

export function Originals() {
  return (
    <div>
      <p className="sv-gutter mx-auto mt-6 w-full max-w-shell text-meta text-txt3">
        Produced at{" "}
        <a
          href={profile.studioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center text-txt1 underline decoration-accent/50 underline-offset-4 transition-colors duration-220 ease-sv hover:text-accentHot"
        >
          {profile.studio}
          <span className="sr-only">&nbsp;&mdash; opens gale.agency in a new tab</span>
        </a>
      </p>

      <ul className="mx-auto grid w-full max-w-shell grid-cols-1 gap-5 sv-gutter max-lg:flex max-lg:grid-cols-none max-lg:sv-rail lg:mt-8 lg:grid-cols-2">
        {originals.map((o) => (
          <OriginalCard key={o.id} original={o} />
        ))}
      </ul>
    </div>
  );
}

export default Originals;
