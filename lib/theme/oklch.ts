/**
 * OKLCH color utilities.
 *
 * Colors are stored in the OKLCH space — the modern, perceptually-uniform
 * color model — as plain numbers so they round-trip cleanly through URL state
 * and code generation. We never leave OKLCH: modern browsers render
 * `oklch()` natively, so swatches, slider tracks, and generated code all use
 * the same string produced by {@link formatOklch}.
 */

export interface OklchColor {
  /** Lightness, 0–1. */
  l: number;
  /** Chroma, 0–~0.4. */
  c: number;
  /** Hue, 0–360 (degrees). */
  h: number;
  /** Alpha, 0–1. Defaults to 1 when omitted. */
  a?: number;
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

const round = (n: number, dp: number) => {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
};

/** Format an {@link OklchColor} as a CSS `oklch()` string. */
export function formatOklch({ l, c, h, a = 1 }: OklchColor): string {
  const L = `${round(clamp(l, 0, 1) * 100, 1)}%`;
  const C = round(clamp(c, 0, 0.5), 3);
  const H = round(((h % 360) + 360) % 360, 1);
  const alpha = clamp(a, 0, 1);
  return alpha >= 1
    ? `oklch(${L} ${C} ${H})`
    : `oklch(${L} ${C} ${H} / ${round(alpha, 2)})`;
}

/** A CSS gradient describing the lightness axis for the current chroma/hue. */
export function lightnessTrack({ c, h }: OklchColor): string {
  const stops = [0, 0.5, 1].map(
    (l) => `${formatOklch({ l, c, h })} ${l * 100}%`,
  );
  return `linear-gradient(to right, ${stops.join(", ")})`;
}

/** A CSS gradient describing the chroma axis for the current lightness/hue. */
export function chromaTrack({ l, h }: OklchColor): string {
  const stops = [0, 0.2, 0.37].map(
    (c) => `${formatOklch({ l, c, h })} ${(c / 0.37) * 100}%`,
  );
  return `linear-gradient(to right, ${stops.join(", ")})`;
}

/** A full-spectrum hue gradient at the current lightness/chroma. */
export function hueTrack({ l, c }: OklchColor): string {
  const stops = [];
  for (let h = 0; h <= 360; h += 30) {
    stops.push(`${formatOklch({ l, c, h })} ${(h / 360) * 100}%`);
  }
  return `linear-gradient(to right, ${stops.join(", ")})`;
}

/** Serialize a color to a compact `l.c.h.a` token for URL state. */
export function encodeColor({ l, c, h, a = 1 }: OklchColor): string {
  return [round(l, 4), round(c, 4), round(h, 2), round(a, 3)].join("_");
}

/** Parse a compact `l_c_h_a` token back into an {@link OklchColor}. */
export function decodeColor(token: string): OklchColor | null {
  const parts = token.split("_").map(Number);
  if (parts.length < 3 || parts.some(Number.isNaN)) return null;
  const [l, c, h, a = 1] = parts;
  return { l, c, h, a };
}
