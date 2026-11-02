import type { Metadata } from "next";
import Link from "next/link";

import { Billboard } from "@/components/series/Billboard";
import { FieldNotes } from "@/components/series/FieldNotes";
import { NumbersRail } from "@/components/series/NumbersRail";
import { OpeningCurtain } from "@/components/series/OpeningCurtain";
import { Originals } from "@/components/series/Originals";
import { SeriesNav } from "@/components/series/SeriesNav";
import { Stack } from "@/components/series/Stack";
import { Volumes } from "@/components/series/Volumes";
import { GhostMark, Kicker, SectionHead, Surface } from "@/components/series/chrome";
import { Reveal } from "@/components/series/motion";
import { revealDelay } from "@/lib/reveal";

import { credentials, highlights, profile } from "@/content/portfolio/data";
import { sectionsById } from "@/content/portfolio/sections";
import { jsonLdBlocks } from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Anup Singh | Senior Frontend Developer & React Engineer | Bangalore, India",
  alternates: {
    canonical: "https://www.anup-singh.in/",
  },
};

/** Shared wrapper so every section gets the same rhythm and scroll offset. */
function Section({
  anchor,
  children,
  className = "",
}: {
  anchor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={anchor}
      aria-labelledby={`${anchor}-h`}
      className={`relative scroll-mt-nav py-20 md:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {jsonLdBlocks.map((block) => (
        <script
          key={block["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

      {/* Fixed, and outside <main>: the curtain briefly puts a transform on
          <main>, which would make it the containing block for fixed children. */}
      <SeriesNav />

      <main id="main" className="sv">
        <Billboard />

        {/* ------------------------------------------------------- About */}
        <Section anchor={sectionsById.about.anchor}>
          <SectionHead meta={sectionsById.about} />
          <div className="sv-gutter mx-auto mt-12 grid w-full max-w-shell gap-10 lg:grid-cols-[1.4fr_1fr]">
            <Reveal className="space-y-5 text-lg leading-relaxed text-txt2">
              {profile.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </Reveal>
            <Reveal delay={120}>
              <Surface seam className="h-full p-7">
                <GhostMark className="absolute -right-4 -top-10">A</GhostMark>
                <dl className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                  {[
                    { label: "Location", value: profile.location },
                    { label: "Email", value: profile.email },
                    { label: "Languages", value: profile.languages.join(", ") },
                    { label: "Interests", value: profile.interests.join(", ") },
                  ].map((row) => (
                    <div key={row.label}>
                      <dt className="text-label uppercase text-txt3">{row.label}</dt>
                      <dd className="mt-2 text-txt1">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </Surface>
            </Reveal>
          </div>
        </Section>

        {/* ----------------------------------------------------- Volumes */}
        <Section anchor={sectionsById.volumes.anchor}>
          <SectionHead meta={sectionsById.volumes} />
          <Volumes />
        </Section>

        {/* --------------------------------------------------- Originals */}
        <Section anchor={sectionsById.originals.anchor}>
          <SectionHead meta={sectionsById.originals} />
          <Originals />
        </Section>

        {/* ----------------------------------------------------- Numbers.
            NumbersRail is the scroll container itself and must stay
            full-bleed — no max-w wrapper, or the numerals get cropped. */}
        <Section anchor={sectionsById.numbers.anchor}>
          <SectionHead meta={sectionsById.numbers} />
          <NumbersRail />
        </Section>

        {/* ------------------------------------------------------- Stack */}
        <Section anchor={sectionsById.stack.anchor}>
          <SectionHead meta={sectionsById.stack} />
          <Stack />
        </Section>

        {/* -------------------------------------------------- Highlights */}
        <Section anchor={sectionsById.highlights.anchor}>
          <SectionHead meta={sectionsById.highlights} />
          <ul className="sv-gutter mx-auto mt-12 grid w-full max-w-shell gap-5 md:grid-cols-3">
            {highlights.map((item, i) => (
              <Reveal as="li" key={item.id} delay={revealDelay(i)}>
                <Surface seam className="flex h-full flex-col p-7">
                  <Kicker className="text-gold">{item.laurel}</Kicker>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-txt1">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-txt2">{item.body}</p>
                  <p className="mt-6 flex items-baseline gap-2 border-t border-white/[0.07] pt-5">
                    <span className="font-display text-3xl font-bold text-gold">
                      {item.metric.value}
                    </span>
                    <span className="text-meta text-txt3">{item.metric.label}</span>
                  </p>
                </Surface>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* --------------------------------------------------- Education */}
        <Section anchor={sectionsById.education.anchor}>
          <SectionHead meta={sectionsById.education} />
          <ul className="sv-gutter mx-auto mt-12 grid w-full max-w-shell gap-5 md:grid-cols-2">
            {credentials.map((item, i) => (
              <Reveal as="li" key={item.school} delay={revealDelay(i)}>
                <Surface className="flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold text-txt1">
                      {item.degree}
                    </h3>
                    <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-label uppercase text-accentHot ring-1 ring-accent/25">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-txt2">{item.school}</p>
                  <p className="mt-1 text-meta text-txt3">
                    {item.place} · {item.year}
                  </p>
                </Surface>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* -------------------------------------------------- Field Notes */}
        <Section anchor={sectionsById.notes.anchor}>
          <SectionHead meta={sectionsById.notes} />
          <FieldNotes />
        </Section>

        {/* ----------------------------------------------------- Contact */}
        <Section anchor={sectionsById.contact.anchor} className="pb-28">
          <SectionHead meta={sectionsById.contact} />
          <Reveal className="sv-gutter mx-auto mt-10 w-full max-w-shell">
            <ul className="flex flex-wrap gap-4">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-[44px] items-center gap-3 rounded-xl bg-accent px-6 py-3 font-medium text-ink shadow-glow transition-colors duration-220 ease-sv hover:bg-accentHot"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex min-h-[44px] items-center gap-3 rounded-xl px-6 py-3 text-txt1 ring-1 ring-white/[0.12] transition-colors duration-220 ease-sv hover:ring-accent/50"
                >
                  {profile.phone}
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-3 rounded-xl px-6 py-3 text-txt1 ring-1 ring-white/[0.12] transition-colors duration-220 ease-sv hover:ring-accent/50"
                >
                  LinkedIn
                  <span className="sr-only"> — opens in a new tab</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-3 rounded-xl px-6 py-3 text-txt1 ring-1 ring-white/[0.12] transition-colors duration-220 ease-sv hover:ring-accent/50"
                >
                  GitHub
                  <span className="sr-only"> — opens in a new tab</span>
                </a>
              </li>
            </ul>
          </Reveal>
        </Section>

        {/* ------------------------------------------------------ Footer */}
        <footer className="border-t border-white/[0.07] py-12">
          <div className="sv-gutter mx-auto flex w-full max-w-shell flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-lg font-semibold text-txt1">
              {profile.firstName}
              <span className="text-accent">.</span>
              {profile.lastName}
            </p>
            <p className="max-w-[60ch] text-meta text-txt3">
              {profile.fullName} — {profile.role} and Frontend Developer in{" "}
              {profile.location}, specialising in React.js, Next.js, JavaScript,
              WordPress and PHP.
            </p>
            <Link
              href="/blog"
              className="text-meta text-txt2 underline-offset-4 hover:text-accentHot hover:underline"
            >
              Field Notes
            </Link>
          </div>
        </footer>
      </main>

      {/* Both fixed; both deliberately outside <main>. */}
      <div className="sv-grain" aria-hidden />
      <OpeningCurtain />
    </>
  );
}
