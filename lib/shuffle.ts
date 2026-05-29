/**
 * Deterministic shuffle for the randomised portfolio.
 *
 * The studio flagged the randomised work grid as a "strong identity
 * feature" worth preserving. Naïve `Math.random()` shuffles on every
 * re-render, which makes the page feel broken. This helper uses a
 * seeded LCG so the shuffle is stable per session — but changes
 * between sessions, keeping the "alive" feel without the jank.
 */
export function shuffleStable<T>(arr: readonly T[], seed: number): T[] {
  const a = [...arr];
  let s = seed >>> 0 || 1; // Ensure non-zero
  for (let i = a.length - 1; i > 0; i--) {
    // 32-bit LCG (Numerical Recipes constants) — fast, deterministic
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Returns a session-stable seed. First call within a session generates
 * a new seed from the current minute (so it changes per session but
 * stays stable across re-renders). Subsequent calls read from
 * sessionStorage.
 *
 * SSR-safe: returns a fixed fallback during server rendering so the
 * first paint matches a known shuffle; the client effect re-seeds once
 * mounted. The minor flash-of-different-order is acceptable since the
 * tiles fade in with motion anyway.
 */
export function getSessionSeed(): number {
  if (typeof window === "undefined") return 1;
  const KEY = "ih:shuffle-seed";
  const stored = window.sessionStorage.getItem(KEY);
  if (stored) return parseInt(stored, 10) || 1;
  const seed = Math.floor(Date.now() / 60000); // changes once per minute
  window.sessionStorage.setItem(KEY, String(seed));
  return seed;
}
