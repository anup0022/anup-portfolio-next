/**
 * The Numbers — eight ranked metrics, each tile standing in front of a giant
 * outlined numeral.
 *
 * NO 'use client'. Every string is server-rendered; the only client leaf is
 * <Reveal>, which takes the already-rendered tile as children.
 *
 * The ranking is REAL: an <ol>, so source order carries it semantically. The
 * numerals are aria-hidden decoration — the accessible content is the tile
 * beside them. Eight single-digit ranks, no padding to ten, so there is no
 * two-digit numeral needing a special-cased size.
 *
 * The horizontal scroller is a plain CSS scroll-snap container (`.sv-rail`)
 * rather than the <Rail> client component, because <Rail> renders a <ul> and
 * would destroy the <ol> ranking semantics.
 */
import { KeyArt } from "@/components/series/chrome";
import { Reveal } from "@/components/series/motion";
import { revealDelay } from "@/lib/reveal";
import { numbers } from "@/content/portfolio/data";

export function NumbersRail() {
  return (
    <div
      role="region"
      aria-label="Ranked career metrics, scrollable"
      tabIndex={0}
      className="sv-rail sv-gutter mt-4"
    >
      <ol className="flex items-end gap-0">
        {numbers.map((n, i) => (
          <Reveal
            as="li"
            key={n.rank}
            delay={revealDelay(i)}
            className="group flex shrink-0 snap-start items-end"
          >
            <span
              aria-hidden
              className="sv-outline select-none font-display text-ghost font-bold leading-[0.78] -mr-5 transition-[color,-webkit-text-stroke-color] duration-420 ease-sv sm:-mr-7 [@media(hover:hover)]:group-hover:[-webkit-text-stroke-color:rgb(var(--sv-accent)/0.8)]"
            >
              {n.rank}
            </span>

            <div className="relative z-10 h-[240px] w-[150px] overflow-hidden rounded-xl shadow-[-12px_0_30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 transition-[transform,box-shadow,--tw-ring-color] duration-420 ease-sv sm:h-[280px] sm:w-[180px] [@media(hover:hover)]:group-hover:-translate-y-2 [@media(hover:hover)]:group-hover:ring-white/25">
              <KeyArt palette={n.palette} instanceKey={`number-${n.rank}`} />

              <div className="absolute inset-x-0 bottom-0 z-copy flex flex-col gap-2 p-4">
                <p className="font-display text-4xl font-semibold leading-none text-txt1">
                  {n.value}
                </p>
                <h3 className="text-[12px] uppercase leading-snug tracking-lab-2 text-txt1">
                  {n.title}
                </h3>
                <p className="text-meta leading-snug text-txt3">{n.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export default NumbersRail;
