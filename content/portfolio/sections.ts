/**
 * The section registry — the one join point between section ids, public
 * anchors, nav labels and headings. page.tsx, SeriesNav and BlogNav all read
 * from here so the three can never drift.
 *
 * CUT FROM THE STREAMING METAPHOR, and why (recorded so it is not
 * re-litigated):
 *
 *  · A "Who's watching?" profile gate that permutes section order. Cut: it is
 *    a blocking interstitial between a recruiter and the content they came
 *    for, it produces four near-duplicate index states on a page that ranks,
 *    and reordering nine sections conveys nothing the nav does not. The
 *    scroll-spy nav is the affordance instead.
 *  · A "Continue Watching" rail with per-section progress. Cut: resume-where-
 *    you-left-off is the metaphor at its most strained on a one-page site,
 *    and the bars would measure scroll position, not interest.
 *  · Poster treatment for Education. Cut: two degrees from 2013 and 2016 are
 *    not titles. They render as plain credential cards.
 *  · A card -> detail modal for the Originals. Cut: with four Originals and
 *    all copy on the card, a modal adds a focus trap, a scroll lock and an
 *    aria surface for zero content gain — and it is the classic way detail
 *    text leaves the indexed document.
 *  · Custom cursor, animated film grain, pinned horizontal scroll, a
 *    smooth-scroll library. Cut for cost on mid-range mobile.
 */
import type { SectionId, SectionMeta } from "./types";
import { originalsMeta, skillCount, volumeMeta } from "./data";

/**
 * `anchor` is the contract with the rest of the site and MUST NOT CHANGE:
 * components/BlogNav.tsx and app/blog/page.tsx hard-code /#about, /#skills,
 * /#experience, /#projects and /#contact. `volumes` therefore ships under
 * #experience and `originals` under #projects.
 */
export const sections: SectionMeta[] = [
  {
    id: "about",
    anchor: "about",
    nav: "About",
    kicker: "BEHIND THE WORK",
    heading: "Nine and a half years, in one page",
    lede: "A senior engineer in Bangalore who ships for brands you have heard of, and leads the team that ships with him.",
    kind: "section",
  },
  {
    id: "volumes",
    anchor: "experience",
    nav: "Career",
    kicker: volumeMeta,
    heading: "Volumes",
    lede: "Four tenures since 2017. Every episode below is one line from the resume, with the number it earned.",
    kind: "section",
  },
  {
    id: "originals",
    anchor: "projects",
    nav: "Originals",
    kicker: originalsMeta,
    heading: "Originals",
    lede: "Four named brands, built and maintained at GALE. All four are live.",
    kind: "section",
  },
  {
    id: "numbers",
    anchor: "numbers",
    nav: "Numbers",
    kicker: "THE RECORD",
    heading: "The Numbers",
    lede: "Eight measured outcomes, ranked. No rounding up.",
    kind: "section",
  },
  {
    id: "stack",
    anchor: "skills",
    nav: "Stack",
    kicker: "TOOLS OF RECORD",
    heading: "The Stack",
    lede: `${skillCount} tools, grouped. Open any one to see where it actually shipped.`,
    kind: "section",
  },
  {
    id: "highlights",
    anchor: "achievements",
    nav: "Highlights",
    kicker: "SELECTED WORK",
    heading: "Highlights",
    lede: "Three pieces of engineering whose value was measured after the fact.",
    kind: "section",
  },
  {
    id: "education",
    anchor: "education",
    nav: "Education",
    kicker: "ACADEMIC RECORD",
    heading: "Education & Credentials",
    lede: "Two degrees, both first class.",
    kind: "section",
  },
  {
    id: "notes",
    anchor: "notes",
    nav: "Field Notes",
    kicker: "WRITING",
    heading: "Field Notes",
    lede: "Long-form writing on the web platform, performance and the things that break in production.",
    kind: "route",
    href: "/blog",
  },
  {
    id: "contact",
    anchor: "contact",
    nav: "Contact",
    kicker: "GET IN TOUCH",
    heading: "Let's build something worth shipping",
    lede: "Open to senior engineering and team-lead work, contract or permanent.",
    kind: "section",
  },
];

export const sectionsById = Object.fromEntries(
  sections.map((s) => [s.id, s])
) as Record<SectionId, SectionMeta>;

/**
 * Every section renders exactly one <h2>, from <SectionHead>, in this order.
 * The pre-redesign page had 7; this is the asserted count for the smoke test.
 */
export const H2_COUNT = sections.length;

export const navLinks = sections.map((s) => ({
  href: s.kind === "route" ? s.href! : `#${s.anchor}`,
  label: s.nav,
  anchor: s.anchor,
  kind: s.kind,
}));

/** The same list from a non-home route, where hashes need the / prefix. */
export const crossRouteNavLinks = sections.map((s) => ({
  href: s.kind === "route" ? s.href! : `/#${s.anchor}`,
  label: s.nav,
}));
