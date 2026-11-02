"use client";

/**
 * The fixed header: skip link, wordmark, real anchor navigation, scroll-spy
 * and a keyboard-operable mobile menu. Replaces the old #nav markup and the
 * handlers public/script.js bound to it.
 *
 * Two rules drive the shape of this file:
 *
 *  · The links are real <a href="#anchor"> elements, never <button onClick>.
 *    Buttons would delete crawlable internal links, fragment URLs, middle
 *    click and link semantics, and this page's internal link graph is part of
 *    what it ranks on. Smooth scrolling comes from `scroll-behavior: smooth`
 *    plus `scroll-padding-top` in globals.css, so no click handler is needed.
 *  · backdrop-filter is budgeted to this one element, and only once the page
 *    has scrolled (or the mobile panel is open) — over the hero it buys
 *    nothing and costs a full-width composited blur on every frame.
 */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { navLinks } from "@/content/portfolio/sections";

/** The eight in-page sections the spy observes; 'notes' is a route, not an id. */
const spyIds = navLinks.filter((l) => l.kind === "section").map((l) => l.anchor);

export function SeriesNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  /* --- Scrolled state + scroll-position tiebreak -------------------------
     One passive, rAF-throttled listener. The initial value is read in the
     effect rather than during render: touching window.scrollY while
     rendering is a hydration mismatch by construction. */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 20);

      // Above the first section the spy band is empty: nothing is current.
      if (y < 80) {
        setActive(null);
        return;
      }
      // At the end of the document the last section can never fill the band,
      // so the observer alone would leave the final link unreachable.
      const doc = document.documentElement;
      if (y + window.innerHeight >= doc.scrollHeight - 2) {
        setActive(spyIds[spyIds.length - 1] ?? null);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* --- Scroll-spy --------------------------------------------------------
     One IntersectionObserver over the section elements. The band is the
     middle 5% of the viewport, so exactly one section is "current" for most
     of the scroll, and DOM order breaks the tie when two overlap. */
  useEffect(() => {
    const els = spyIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (visible.size === 0) return;
        const next = spyIds.find((id) => visible.has(id));
        if (next) setActive(next);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* --- Mobile panel: Escape, outside pointerdown ------------------------- */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close(true);
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      close(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, close]);

  /* --- Keep the collapsed panel out of the tab order ---------------------
     Applied through the DOM in an effect, never as a prop, so `inert` never
     reaches server HTML and the links stay in the document for crawlers. */
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (open) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [open]);

  const dressed = scrolled || open;

  return (
    <>
      <a className="sv-skip" href="#main">
        Skip to content
      </a>

      <header
        className={[
          "fixed inset-x-0 top-0 z-nav transition-[background-color,box-shadow] duration-420 ease-sv",
          dressed ? "sv-glass" : "bg-transparent",
        ].join(" ")}
      >
        <div
          className={[
            "mx-auto flex w-full max-w-shell items-center justify-between sv-gutter",
            "transition-[height] duration-420 ease-sv",
            scrolled ? "h-[60px]" : "h-nav",
          ].join(" ")}
        >
          <a
            href="#top"
            className="inline-flex min-h-[44px] items-center font-display text-base font-bold tracking-tight-display text-txt1 transition-colors duration-220 ease-sv hover:text-accent focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentHot"
          >
            A<span className="text-accent">.</span>Singh
          </a>

          <nav aria-label="Section navigation" className="hidden md:block">
            <ul className="flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive =
                  link.kind === "section" && active === link.anchor;
                const className = [
                  "relative inline-flex min-h-[44px] items-center px-3 text-label uppercase tracking-lab-2 transition-colors duration-220 ease-sv",
                  "focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentHot",
                  isActive ? "text-accent" : "text-txt2 hover:text-txt1",
                ].join(" ");
                const underline = (
                  <span
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute inset-x-3 bottom-2 h-px origin-left bg-accent transition-transform duration-220 ease-sv",
                      isActive ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                );

                return (
                  <li key={link.href}>
                    {link.kind === "route" ? (
                      <Link href={link.href} className={className}>
                        {link.label}
                        {underline}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={className}
                        aria-current={isActive ? "true" : undefined}
                      >
                        {link.label}
                        {underline}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="sv-menu"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded text-txt1 transition-colors duration-220 ease-sv hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentHot md:hidden"
          >
            <span className="sr-only">
              {open ? "Close navigation menu" : "Open navigation menu"}
            </span>
            <span aria-hidden="true" className="flex h-4 w-6 flex-col justify-between">
              <span
                className={[
                  "block h-px w-full origin-center bg-current transition-transform duration-220 ease-sv",
                  open ? "translate-y-[7px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-px w-full bg-current transition-opacity duration-220 ease-sv",
                  open ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-px w-full origin-center bg-current transition-transform duration-220 ease-sv",
                  open ? "-translate-y-[7px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>

        {/* Always in the DOM. Collapsed with max-height + opacity and taken out
            of the tab order with `inert` after mount, never removed. The
            html:not(.sv-js) escape hatch leaves it open when the entry-gate
            script never ran, so a no-JS phone still has working navigation. */}
        <div
          id="sv-menu"
          ref={panelRef}
          className={[
            "overflow-hidden transition-[max-height,opacity] duration-420 ease-sv md:hidden",
            "[html:not(.sv-js)_&]:max-h-none [html:not(.sv-js)_&]:opacity-100",
            open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <nav
            aria-label="Section navigation, mobile"
            className="sv-gutter pb-4 pt-1"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const isActive =
                  link.kind === "section" && active === link.anchor;
                const className = [
                  "flex min-h-[44px] items-center border-b border-white/5 text-label uppercase tracking-lab-2 transition-colors duration-220 ease-sv",
                  "focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentHot",
                  isActive ? "text-accent" : "text-txt2",
                ].join(" ");

                return (
                  <li key={link.href}>
                    {link.kind === "route" ? (
                      <Link
                        href={link.href}
                        className={className}
                        onClick={() => close(false)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={className}
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => close(false)}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default SeriesNav;
