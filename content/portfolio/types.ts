/**
 * The type layer. Plain TypeScript, zero imports, no 'use client' — must be
 * consumable by the server page, the sitemap and client leaves alike.
 */

export type Palette = { from: string; via: string; to: string; accent: string };
export type Metric = { value: string; label: string };
export type Motif = "finance" | "hospitality" | "utility" | "campaign";

export interface Profile {
  fullName: string;
  firstName: string;
  lastName: string;
  role: string;
  /** Five real job titles. Rendered as text nodes, cycled by CSS only. */
  roleRotation: string[];
  studio: string;
  studioUrl: string;
  location: string;
  region: string;
  country: string;
  email: string;
  phone: string;
  /** Indexed copy — never reword. */
  intro: string;
  summary: string[];
  /**
   * Frozen literals. Never compute from Date.now(): server and client would
   * disagree across a month boundary, producing a hydration warning and a
   * visible flash.
   */
  experienceYears: string;
  careerStart: string;
  languages: string[];
  interests: string[];
  links: { linkedin: string; github: string; blog: string };
  portrait: { src: string; alt: string; width: number; height: number };
}

export interface Original {
  id: "cppib" | "fogodechao" | "enercare" | "milkpep";
  title: string;
  brand: string;
  domain: string;
  url: string;
  years: string;
  studio: string;
  credit: string;
  genre: string;
  logline: string;
  build: string[];
  metrics: Metric[];
  stack: string[];
  palette: Palette;
  motif: Motif;
}

export interface Episode {
  code: string;
  title: string;
  body: string;
  /**
   * Deliberately loose: absorbs whatever duration-ish fact the underlying
   * resume bullet already carries (a range, '6 months', '-50% bug-fix time'),
   * so the TV-shaped field holds a real value and nothing is invented.
   */
  runtime: string;
  tags: string[];
  originals?: Original["id"][];
}

export interface Volume {
  number: number;
  label: string;
  company: string;
  role: string;
  place: string;
  period: string;
  synopsis: string;
  palette: Palette;
  episodes: Episode[];
}

export interface Skill {
  name: string;
  mono: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: Skill[];
}

export interface Highlight {
  id: string;
  title: string;
  laurel: string;
  body: string;
  metric: Metric;
}

export interface Credential {
  degree: string;
  school: string;
  place: string;
  year: string;
  badge: string;
}

export interface NumberPick {
  rank: number;
  value: string;
  title: string;
  detail: string;
  palette: Palette;
}

/** The machine-readable resume mirror that feeds JSON-LD. */
export interface ExperienceRow {
  company: string;
  role: string;
  place: string;
  period: string;
  points: string[];
}

export type SectionId =
  | "about"
  | "volumes"
  | "originals"
  | "numbers"
  | "stack"
  | "highlights"
  | "education"
  | "notes"
  | "contact";

export interface SectionMeta {
  id: SectionId;
  /**
   * The PUBLIC hash, decoupled from the narrative id. components/BlogNav.tsx
   * and app/blog/page.tsx hard-code /#about, /#skills, /#experience,
   * /#projects and /#contact; renaming an id must never break those.
   */
  anchor: string;
  nav: string;
  kicker: string;
  heading: string;
  lede: string;
  kind: "section" | "route";
  href?: string;
}
