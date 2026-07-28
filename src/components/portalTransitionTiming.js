const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scale = reducedMotion ? 0.15 : 1;

// CLOSE: the vortex grows from the clicked object until it swallows the
// screen. HOLD: briefly fully covered — the route swap happens here, hidden.
// OPEN: the vortex shrinks back down to that same point, so the new page
// reads as emerging from inside it, outward — not just fading in.
export const CLOSE_MS = 550 * scale;
export const HOLD_MS = 90 * scale;
export const OPEN_MS = 550 * scale;
export const TOTAL_MS = CLOSE_MS + HOLD_MS + OPEN_MS;
