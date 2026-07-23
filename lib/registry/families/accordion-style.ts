/**
 * Harman accordion — maps playground tokens to compact primary CSS variables.
 */

import type { CSSProperties } from "react";
import type { CustomizeVisibility } from "@/lib/theme/customize-capabilities";
import {
  type Customization,
  EASINGS,
  FONT_STACKS,
  shadowValue,
} from "@/lib/theme/customization";
import { formatOklch } from "@/lib/theme/oklch";

export function harmanAccordionStyleEntries(
  c: Customization,
  visibility?: CustomizeVisibility,
): Array<[string, string | number]> {
  const entries: Array<[string, string | number]> = [];

  if (!visibility || visibility.gap) {
    entries.push(["--f-a-gap", `${Math.max(4, c.layout.gap - 2)}px`]);
  }
  if (!visibility || visibility.radius) {
    entries.push(["--f-a-radius", `${c.layout.radius + 2}px`]);
  }
  if (!visibility || visibility.fontSize) {
    entries.push(["--f-a-title-size", `${c.typography.fontSize}px`]);
    entries.push(["--f-a-body-size", `${Math.max(12, c.typography.fontSize - 1)}px`]);
  }
  if (!visibility || visibility.fontWeight) {
    entries.push(["--f-a-title-weight", c.typography.fontWeight]);
  }
  if (!visibility || visibility.letterSpacing) {
    entries.push(["--f-a-title-tracking", `${c.typography.letterSpacing}px`]);
  }
  if (!visibility || visibility.fontFamily) {
    entries.push(["fontFamily", FONT_STACKS[c.typography.fontFamily]]);
  }

  if (c.color.override && (!visibility || visibility.background || visibility.text)) {
    if (!visibility || visibility.background) {
      entries.push(["--f-a-card-bg", formatOklch(c.color.background)]);
    }
    if (!visibility || visibility.text) {
      entries.push(["--f-a-title-color", formatOklch(c.color.text)]);
      entries.push([
        "--f-a-body-color",
        formatOklch({
          ...c.color.text,
          l: Math.max(0.3, c.color.text.l * 0.55),
          c: c.color.text.c * 0.35,
        }),
      ]);
    }
  }

  if (!visibility || visibility.shadowPreset || visibility.shadowColor || visibility.shadowOpacity) {
    entries.push(["--f-a-card-shadow", shadowValue(c.shadow) ?? "none"]);
  }

  return entries;
}

export function harmanAccordionPreviewStyle(
  c: Customization,
  visibility?: CustomizeVisibility,
): CSSProperties {
  return Object.fromEntries(harmanAccordionStyleEntries(c, visibility)) as CSSProperties;
}

export function harmanAccordionStyleLiteral(
  c: Customization,
  visibility?: CustomizeVisibility,
): string {
  const lines = harmanAccordionStyleEntries(c, visibility).map(([k, v]) => {
    const key = /^[a-zA-Z][a-zA-Z0-9]*$/.test(k) ? k : `"${k}"`;
    const value = typeof v === "number" ? String(v) : `"${v}"`;
    return `        ${key}: ${value},`;
  });
  return `{\n${lines.join("\n")}\n      } as React.CSSProperties`;
}

/** @deprecated Use {@link harmanAccordionPreviewStyle} */
export const fussionaryAccordionPreviewStyle = harmanAccordionPreviewStyle;

/** @deprecated Use {@link harmanAccordionStyleLiteral} */
export const fussionaryAccordionStyleLiteral = harmanAccordionStyleLiteral;
