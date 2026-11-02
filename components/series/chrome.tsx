/**
 * The presentational vocabulary: generated key art, section headings,
 * kickers, ghost marks, the card shell.
 *
 * NO 'use client'. These stay in the server tree so the text they render is
 * in the HTML. Pure functions of props, zero interactivity, zero image
 * assets — so every card gets art-directed artwork with no asset pipeline
 * and no CLS.
 */
import type { Motif, Palette, SectionMeta } from "@/content/portfolio/types";

/* ---------------------------------------------------------------- motifs */
/**
 * Accent line art replacing the old emoji project icons. `instanceKey` makes
 * gradient ids unique per instance — duplicate ids make one instance render
 * with another's fill, and useId() is unavailable in a server component.
 */
function Motif({
  motif,
  accent,
  instanceKey,
}: {
  motif: Motif;
  accent: string;
  instanceKey: string;
}) {
  const common = {
    viewBox: "0 0 400 300",
    preserveAspectRatio: "xMidYMid slice",
    className: "absolute inset-0 h-full w-full",
    "aria-hidden": true as const,
    fill: "none",
    stroke: accent,
    strokeOpacity: 0.35,
    strokeWidth: 1.5,
  };
  const gid = `m-${instanceKey}`;

  if (motif === "finance") {
    return (
      <svg {...common}>
        <g strokeOpacity={0.12}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="300" />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line key={`h${i}`} x1="0" y1={i * 100} x2="400" y2={i * 100} />
          ))}
        </g>
        <polyline points="20,250 90,250 90,200 160,200 160,150 230,150 230,95 300,95 300,50 380,50" />
        <circle cx="300" cy="95" r="4" fill={accent} fillOpacity={0.5} stroke="none" />
        <circle cx="380" cy="50" r="5" fill={accent} fillOpacity={0.7} stroke="none" />
      </svg>
    );
  }
  if (motif === "hospitality") {
    return (
      <svg {...common}>
        {[40, 90, 140, 190, 240].map((r, i) => (
          <circle key={r} cx="200" cy="300" r={r} strokeOpacity={0.3 - i * 0.04} />
        ))}
        <path d="M120 300 Q200 170 280 300" strokeOpacity={0.45} />
      </svg>
    );
  }
  if (motif === "utility") {
    return (
      <svg {...common}>
        <path d="M30 150 H120 M120 60 V240 M120 60 H210 M120 240 H210 M210 60 V110 M210 240 V190 M210 110 H300 M210 190 H300 M300 110 V40 M300 190 V260 M300 40 H370 M300 260 H370" />
        {[
          [120, 60],
          [120, 240],
          [210, 110],
          [210, 190],
          [300, 40],
          [300, 260],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill={accent} fillOpacity={0.45} stroke="none" />
        ))}
      </svg>
    );
  }
  return (
    <svg {...common}>
      <defs>
        <radialGradient id={gid}>
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="90" cy="150" r="12" fill={`url(#${gid})`} stroke="none" />
      {[40, 80, 120, 160, 200].map((r, i) => (
        <path
          key={r}
          d={`M90 ${150 - r} A ${r} ${r} 0 0 1 90 ${150 + r}`}
          strokeOpacity={0.4 - i * 0.06}
        />
      ))}
      {[60, 110, 160].map((r, i) => (
        <path
          key={`b${r}`}
          d={`M330 ${150 - r} A ${r} ${r} 0 0 0 330 ${150 + r}`}
          strokeOpacity={0.3 - i * 0.07}
        />
      ))}
    </svg>
  );
}

/* --------------------------------------------------------------- key art */
/**
 * One absolutely-positioned stack: a lit top-right corner falling off into a
 * diagonal base, a rotated light sweep, scanlines, children, and ALWAYS the
 * legibility scrim last — which is why white body text stays readable over
 * any palette.
 */
export function KeyArt({
  palette,
  motif,
  instanceKey,
  children,
  className = "",
}: {
  palette: Palette;
  motif?: Motif;
  instanceKey: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const background = [
    `radial-gradient(120% 90% at 85% 10%, ${palette.via}, transparent 60%)`,
    `radial-gradient(90% 80% at 0% 100%, ${palette.from}, transparent 70%)`,
    `linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
  ].join(", ");

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0" style={{ background }} />
      <div
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)`,
        }}
      />
      {motif ? <Motif motif={motif} accent={palette.accent} instanceKey={instanceKey} /> : null}
      <div className="absolute inset-0 bg-scanlines opacity-[0.16]" />
      {children}
      <div className="absolute inset-0 bg-scrim" />
    </div>
  );
}

/* --------------------------------------------------------------- lockups */
export function Kicker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-kicker font-medium uppercase text-accentHot ${className}`}>
      {children}
    </p>
  );
}

/** The only source of <h2> on the page. */
export function SectionHead({
  meta,
  className = "",
}: {
  meta: SectionMeta;
  className?: string;
}) {
  return (
    <header className={`sv-gutter mx-auto w-full max-w-shell ${className}`}>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-accentHot" aria-hidden />
        <Kicker>{meta.kicker}</Kicker>
      </div>
      <h2
        id={`${meta.anchor}-h`}
        className="mt-5 font-display text-section font-semibold text-txt1"
      >
        {meta.heading}
      </h2>
      <p className="mt-4 max-w-[52ch] text-txt2">{meta.lede}</p>
    </header>
  );
}

/** Oversized decorative glyph bleeding off a corner. Hidden from AT. */
export function GhostMark({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none select-none font-display text-ghost font-bold leading-none text-txt1/[0.07] ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * The one card shell. Rings, not borders: a ring is an inset box-shadow, so
 * it does not participate in layout and can be swapped on hover with zero
 * reflow.
 */
export function Surface({
  children,
  seam = false,
  className = "",
}: {
  children: React.ReactNode;
  seam?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-ink3 shadow-card ring-1 ring-white/[0.07] transition-[box-shadow,transform,--tw-ring-color] duration-420 ease-sv hover:ring-accent/40 hover:shadow-lift ${className}`}
    >
      {seam ? <span className="sv-seam" aria-hidden /> : null}
      {children}
    </div>
  );
}
