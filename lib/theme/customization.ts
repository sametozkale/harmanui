/**
 * Customization state for the playground.
 *
 * A single {@link Customization} object is the source of truth for a component
 * preview. It drives three things that must always stay in sync:
 *   1. the live preview (via {@link buildPreviewStyle} + {@link buildPreviewClassName})
 *   2. the generated source code (see `lib/codegen`)
 *   3. the shareable URL (via {@link encodeCustomization} / {@link decodeCustomization})
 *
 * Every field maps to a concrete CSS property or Tailwind class, so what the
 * user sees is exactly what the copied code produces.
 */

import type { CSSProperties } from "react";
import {
  type OklchColor,
  encodeColor,
  decodeColor,
  formatOklch,
} from "./oklch";
import {
  DEFAULT_SOUND_CUE,
  sounds,
  type SoundName,
} from "@/lib/sound";

export type FontFamilyKey = "inter" | "system" | "serif" | "mono";
export type ShadowPreset = "none" | "sm" | "md" | "lg" | "custom";
export type EasingKey = "linear" | "standard" | "emphasized" | "spring-ish";
export type HoverAnimation = "none" | "lift" | "scale" | "glow";

export interface Customization {
  typography: {
    fontFamily: FontFamilyKey;
    fontSize: number; // px
    fontWeight: number; // 300–800
    letterSpacing: number; // px (may be negative)
    wrap: boolean; // false → nowrap
  };
  color: {
    /** When false, each variant keeps its native HeroUI color. */
    override: boolean;
    background: OklchColor;
    text: OklchColor;
    border: OklchColor;
  };
  layout: {
    paddingX: number; // px
    paddingY: number; // px
    gap: number; // px
    radius: number; // outer radius, px
    innerRadius: number; // inner radius, px
    borderWidth: number; // px
    customPadding: boolean; // when false, keep HeroUI size-based padding
  };
  shadow: {
    preset: ShadowPreset;
    color: OklchColor;
    opacity: number; // 0–1
  };
  motion: {
    duration: number; // ms
    easing: EasingKey;
    hover: HoverAnimation;
  };
  /** Interface SFX — reflected in generated code when the Sound section is visible. */
  sound: {
    enabled: boolean;
    volume: number; // 0–1
    cue: SoundName;
  };
}

export const FONT_STACKS: Record<FontFamilyKey, string> = {
  inter: "var(--font-inter)",
  system:
    "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono: "var(--font-mono)",
};

export const FONT_LABELS: Record<FontFamilyKey, string> = {
  inter: "Inter",
  system: "System",
  serif: "Serif",
  mono: "Mono",
};

export const EASINGS: Record<EasingKey, string> = {
  linear: "linear",
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  emphasized: "cubic-bezier(0.3, 0, 0, 1)",
  "spring-ish": "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

export const EASING_LABELS: Record<EasingKey, string> = {
  linear: "Linear",
  standard: "Standard",
  emphasized: "Emphasized",
  "spring-ish": "Springy",
};

/** Default state — chosen to visually match HeroUI's out-of-the-box look. */
export const DEFAULT_CUSTOMIZATION: Customization = {
  typography: {
    fontFamily: "inter",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.28,
    wrap: true,
  },
  color: {
    override: false,
    background: { l: 0.657, c: 0.188, h: 245.1 },
    text: { l: 0.99, c: 0, h: 0 },
    border: { l: 0.657, c: 0.188, h: 245.1 },
  },
  layout: {
    paddingX: 16,
    paddingY: 8,
    gap: 8,
    radius: 8,
    innerRadius: 6,
    borderWidth: 1,
    customPadding: false,
  },
  shadow: {
    preset: "none",
    color: { l: 0, c: 0, h: 0 },
    opacity: 0.12,
  },
  motion: {
    duration: 200,
    easing: "standard",
    hover: "none",
  },
  sound: {
    enabled: false,
    volume: 0.4,
    cue: DEFAULT_SOUND_CUE,
  },
};

/** Layered, natural box-shadow presets (shadows over borders). */
export function shadowValue(shadow: Customization["shadow"]): string | undefined {
  const tint = (a: number) =>
    formatOklch({ ...shadow.color, a: a * (shadow.opacity / 0.12) });
  switch (shadow.preset) {
    case "none":
      return undefined;
    case "sm":
      return `0 1px 2px ${tint(0.08)}, 0 1px 3px ${tint(0.06)}`;
    case "md":
      return `0 2px 4px ${tint(0.06)}, 0 4px 12px ${tint(0.1)}`;
    case "lg":
      return `0 4px 8px ${tint(0.06)}, 0 12px 28px ${tint(0.14)}`;
    case "custom":
      return `0 8px 24px ${formatOklch({ ...shadow.color, a: shadow.opacity })}`;
  }
}

/**
 * The single ordered source of truth for a preview's inline style. Both the
 * live preview ({@link buildPreviewStyle}) and the code generator read from
 * this, guaranteeing that what the user sees is exactly what they copy.
 *
 * Keys use the CSS-property casing React expects (`camelCase`, plus raw custom
 * properties like `--radius`); the code generator prints them as-is.
 */
export function styleEntries(c: Customization): Array<[string, string | number]> {
  const entries: Array<[string, string | number]> = [
    // HeroUI reads --radius for its border-radius; overriding the token keeps
    // corner rounding consistent with the component's internal geometry.
    ["--radius", `${c.layout.radius}px`],
    ["fontFamily", FONT_STACKS[c.typography.fontFamily]],
    ["fontSize", `${c.typography.fontSize}px`],
    ["fontWeight", c.typography.fontWeight],
    ["letterSpacing", `${c.typography.letterSpacing}px`],
    ["whiteSpace", c.typography.wrap ? "normal" : "nowrap"],
    ["gap", `${c.layout.gap}px`],
    ["transitionProperty", "transform, box-shadow, background-color, color, filter"],
    ["transitionDuration", `${c.motion.duration}ms`],
    ["transitionTimingFunction", EASINGS[c.motion.easing]],
  ];

  if (c.layout.customPadding) {
    entries.push(
      ["paddingLeft", `${c.layout.paddingX}px`],
      ["paddingRight", `${c.layout.paddingX}px`],
      ["paddingTop", `${c.layout.paddingY}px`],
      ["paddingBottom", `${c.layout.paddingY}px`],
    );
  }

  if (c.color.override) {
    entries.push(
      ["backgroundColor", formatOklch(c.color.background)],
      ["color", formatOklch(c.color.text)],
      ["borderColor", formatOklch(c.color.border)],
      ["borderStyle", "solid"],
      ["borderWidth", `${c.layout.borderWidth}px`],
    );
  }

  const shadow = shadowValue(c.shadow);
  if (shadow) entries.push(["boxShadow", shadow]);

  return entries;
}

/**
 * Build the inline `style` object applied to a previewed component. The exact
 * same entries are emitted by the code generator, so preview === copied code.
 */
export function buildPreviewStyle(c: Customization): CSSProperties {
  return Object.fromEntries(styleEntries(c)) as CSSProperties;
}

/** Hover/press micro-interaction classes derived from the motion controls. */
export interface PreviewMotionOptions {
  pressFeedback: boolean;
  hoverEffects: boolean;
}

export function buildPreviewClassName(
  c: Customization,
  motion: PreviewMotionOptions = { pressFeedback: false, hoverEffects: false },
): string {
  if (!motion.pressFeedback && !motion.hoverEffects) return "";

  const classes: string[] = [];
  if (motion.pressFeedback || motion.hoverEffects) classes.push("transition");
  if (motion.pressFeedback) classes.push("active:scale-[0.96]");

  if (motion.hoverEffects) {
    switch (c.motion.hover) {
      case "lift":
        classes.push("hover:-translate-y-0.5", "hover:shadow-md");
        break;
      case "scale":
        classes.push("hover:scale-[1.03]");
        break;
      case "glow":
        classes.push("hover:brightness-110", "hover:saturate-125");
        break;
    }
  }

  return classes.join(" ");
}

/* ------------------------------------------------------------------ *
 * URL serialization — compact, order-stable, lossy-free enough to share.
 * ------------------------------------------------------------------ */

export function encodeCustomization(c: Customization): string {
  const t = c.typography;
  const co = c.color;
  const l = c.layout;
  const s = c.shadow;
  const m = c.motion;
  const parts = [
    `t:${t.fontFamily},${t.fontSize},${t.fontWeight},${t.letterSpacing},${t.wrap ? 1 : 0}`,
    `c:${co.override ? 1 : 0},${encodeColor(co.background)},${encodeColor(co.text)},${encodeColor(co.border)}`,
    `l:${l.paddingX},${l.paddingY},${l.gap},${l.radius},${l.innerRadius},${l.borderWidth},${l.customPadding ? 1 : 0}`,
    `s:${s.preset},${encodeColor(s.color)},${s.opacity}`,
    `m:${m.duration},${m.easing},${m.hover}`,
    `x:${c.sound.enabled ? 1 : 0},${c.sound.volume},${c.sound.cue}`,
  ];
  return parts.join("|");
}

export function decodeCustomization(raw: string): Customization {
  const out: Customization = structuredClone(DEFAULT_CUSTOMIZATION);
  try {
    for (const seg of raw.split("|")) {
      const [key, body] = seg.split(":");
      const v = body.split(",");
      if (key === "t") {
        out.typography = {
          fontFamily: v[0] as FontFamilyKey,
          fontSize: Number(v[1]),
          fontWeight: Number(v[2]),
          letterSpacing: Number(v[3]),
          wrap: v[4] === "1",
        };
      } else if (key === "c") {
        out.color = {
          override: v[0] === "1",
          background: decodeColor(v[1]) ?? out.color.background,
          text: decodeColor(v[2]) ?? out.color.text,
          border: decodeColor(v[3]) ?? out.color.border,
        };
      } else if (key === "l") {
        out.layout = {
          paddingX: Number(v[0]),
          paddingY: Number(v[1]),
          gap: Number(v[2]),
          radius: Number(v[3]),
          innerRadius: Number(v[4]),
          borderWidth: Number(v[5]),
          customPadding: v[6] === "1",
        };
      } else if (key === "s") {
        out.shadow = {
          preset: v[0] as ShadowPreset,
          color: decodeColor(v[1]) ?? out.shadow.color,
          opacity: Number(v[2]),
        };
      } else if (key === "m") {
        out.motion = {
          duration: Number(v[0]),
          easing: v[1] as EasingKey,
          hover: v[2] as HoverAnimation,
        };
      } else if (key === "x") {
        const cue = v[2];
        out.sound = {
          enabled: v[0] === "1",
          volume: Number(v[1]),
          cue:
            cue && (sounds as readonly string[]).includes(cue)
              ? (cue as SoundName)
              : DEFAULT_SOUND_CUE,
        };
      }
    }
  } catch {
    return structuredClone(DEFAULT_CUSTOMIZATION);
  }
  return out;
}
