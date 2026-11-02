/**
 * Field Notes — the home page's front door to /blog, written in the
 * catalogue's vocabulary.
 *
 * NO 'use client' and ZERO JavaScript: plain links, a CSS grid, no rail, no
 * reveal. Nothing under app/blog/** or components/Blog* is imported or
 * touched, so the blog keeps its own styling entirely.
 *
 * `posts` is the contract with app/page.tsx, which narrows BlogPost down to
 * NotePreview on the server (use `toNotePreview` for that). The prop is
 * optional: with nothing passed, this component derives the previews itself
 * from lib/blog. lib/blog carries every post's full markdown `content`, so
 * this module must never be imported into a client component.
 */
import Link from "next/link";

import { KeyArt, Surface } from "@/components/series/chrome";
import type { Palette } from "@/content/portfolio/types";
import type { BlogPost } from "@/content/blogs/types";
import { getAllPosts, getCategoryBySlug } from "@/lib/blog";

const MAX_NOTES = 4;

export interface NotePreview {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO 'YYYY-MM-DD', straight from the post. Fed to <time dateTime>. */
  date: string;
  /** Display name of the post's first category, when it resolves. */
  category?: string;
  /** That category's hex colour, e.g. '#61DAFB'. */
  categoryColor?: string;
}

/** Server-side narrowing helper, exported so page.tsx does not re-derive it. */
export function toNotePreview(post: BlogPost): NotePreview {
  const category = post.categories[0]
    ? getCategoryBySlug(post.categories[0])
    : undefined;
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: category?.name,
    categoryColor: category?.color,
  };
}

/* ----------------------------------------------------------------- dates */
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Formatted from the string's own parts rather than `new Date(...)`: a
 * 'YYYY-MM-DD' literal parses as UTC midnight, which renders as the previous
 * day in every timezone west of Greenwich. Frozen input, frozen output.
 */
function formatNoteDate(date: string): string {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!parts) return date;
  const month = MONTHS[Number(parts[2]) - 1];
  if (!month) return date;
  return `${month} ${Number(parts[3])}, ${parts[1]}`;
}

/* ------------------------------------------------------------------- art */
const FALLBACK_ACCENT = "#00d4ff";

/**
 * Key art tinted with the category colour. No <img>: the post covers are
 * remote URLs on hosts that next.config.mjs does not whitelist, and
 * next/image throws on an unconfigured host rather than degrading.
 */
function notePalette(color?: string): Palette {
  const accent =
    color && /^#[0-9a-fA-F]{6}$/.test(color) ? color : FALLBACK_ACCENT;
  return {
    from: `${accent}30`,
    via: `${accent}5c`,
    to: "#0b0f18",
    accent,
  };
}

/* ----------------------------------------------------------------- cards */
function NoteCard({ note }: { note: NotePreview }) {
  return (
    <Surface seam className="h-full">
      <Link
        href={`/blog/${note.slug}`}
        className="flex h-full flex-col rounded-2xl"
      >
        <div className="relative aspect-[16/9]">
          <KeyArt
            palette={notePalette(note.categoryColor)}
            instanceKey={`note-${note.slug}`}
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          {note.category ? (
            <p className="flex items-center gap-2 text-kicker font-medium uppercase text-txt1">
              <span
                aria-hidden
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: note.categoryColor ?? FALLBACK_ACCENT }}
              />
              {note.category}
            </p>
          ) : null}
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight-display text-txt1">
            {note.title}
          </h3>
          <p className="line-clamp-3 text-meta text-txt2">{note.excerpt}</p>
          <p className="mt-auto pt-2 text-label uppercase text-txt3">
            <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
          </p>
        </div>
      </Link>
    </Surface>
  );
}

/* --------------------------------------------------------------- section */
export function FieldNotes({ posts }: { posts?: NotePreview[] }) {
  const notes = (posts ?? getAllPosts().map(toNotePreview)).slice(0, MAX_NOTES);

  return (
    <div className="sv-gutter mx-auto mt-12 w-full max-w-shell">
      {notes.length > 0 ? (
        <ul className="grid list-none gap-4 sm:grid-cols-2">
          {notes.map((note) => (
            <li key={note.slug}>
              <NoteCard note={note} />
            </li>
          ))}
        </ul>
      ) : null}

      <Surface
        seam
        className="mt-4 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <p className="max-w-[52ch] text-txt2">
          Longer write-ups of work that shipped: what broke, what the fix was,
          and the number it moved.
        </p>
        <Link
          href="/blog"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-accent/10 px-6 py-3 text-label font-medium uppercase text-accentHot ring-1 ring-accent/40 transition-[background-color,box-shadow] duration-220 ease-sv hover:bg-accent/20 hover:ring-accent"
        >
          Read all notes
          <span aria-hidden>&rarr;</span>
        </Link>
      </Surface>
    </div>
  );
}

export default FieldNotes;
