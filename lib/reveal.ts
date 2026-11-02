/**
 * Plain module — deliberately NOT 'use client'.
 *
 * A non-component function exported from a 'use client' module reaches a
 * server component as a client-reference proxy, not a callable, and blows up
 * at render time with "x is not a function". Shared helpers that both sides
 * call therefore have to live outside the client boundary.
 */

/** Capped so item 10 of a rail is not held back 700ms. */
export const revealDelay = (i: number) => Math.min(i, 5) * 70;
