# ANUP SINGH — THE SERIES

A cinematic, streaming-inspired portfolio for **Anup Singh**: Senior Software
Engineer and Frontend Developer in Bangalore, with 9.5+ years building
high-performance web applications in React, Next.js, JavaScript, WordPress
and PHP.

Every section is an episode, every client brand is an Original, and the whole
site plays like a series.

> A personal portfolio with a fictional streaming-platform look. It is not
> affiliated with Netflix or any other streaming service and uses none of
> their logos.
>
> The design is adapted from
> [Sushmitadasari/Portfolio_series](https://github.com/Sushmitadasari/Portfolio_series).

## Run it locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Production build:

```bash
npm run build
npm run preview
```

The static site is written to `dist/` and deploys to any static host.

> **Deploying:** this is a Vite SPA, not a Next.js app. If the host was
> previously set to the Next.js preset it must be changed to **Vite**
> (build `npm run build`, output directory `dist`), or the deploy will fail.

## Updating the content

**All content lives in one file:
[`src/data/portfolio.ts`](src/data/portfolio.ts).** Every component reads
from it.

| To change… | Edit |
| --- | --- |
| Name, intro, email, LinkedIn, GitHub | `profile` |
| A client project, or a new one | `projects` (appears in Originals, the overlay, the resume sheet and the counts) |
| Achievements | `achievements` |
| Skills and their "where it shipped" notes | `skillCategories`, `skillEvidence` |
| Seasons and episodes (My Journey) | `seasons` |
| Top 10 row | `topPicks` |
| ▶ Play Intro highlight reel | `introSlides` |
| Profile order (Recruiter / Developer / Creative) | `viewerProfiles` |
| Opening studio card text | `profile.originalLabel` |
| Hero genre badge | `profile.genreBadge` |

**Resume PDF:** `profile.resumePdf` is empty, so the download button and the
PDF viewer hide themselves and the resume renders inline from the data. Drop
a PDF in `public/assets/` and point `resumePdf` at it to switch them back on.

**Certifications:** `certifications` is an empty array, so the certifications
rail and that resume section are hidden. Add entries and they reappear.

## Photo

`pic1.jpeg` is the high-resolution source and `pic.png` is the matching
cutout. To regenerate the portrait assets:

```bash
npm run images      # rebuild the WebP portraits + social image
npm run cutout      # remove the background from pic1.jpeg -> pic.png
npm run portrait    # both, in order
```

`npm run cutout` uses macOS Vision (`scripts/cutout.swift`) to generate the
matte offline, then `scripts/defringe.mjs` cleans the edge colour. It needs
the Swift toolchain, so it is macOS-only; `npm run images` works anywhere.

Currently `pic.png` is a copy of the photo **with** its background, so the
portrait renders as a full frame rather than a cutout.

## What's inside

```
src/
  data/portfolio.ts        ← single source of truth
  App.tsx                  ← stages: opening → profile select → home; overlays
  components/              ← Hero, Seasons, Originals, Skills, Achievements, Resume…
  hooks/                   ← media queries, smooth scroll, section progress
scripts/
  build-images.mjs         ← portrait + social image pipeline
  cutout.swift             ← Vision background removal (macOS)
  defringe.mjs             ← matte edge cleanup
```
