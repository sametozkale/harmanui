/**
 * Harman accordion — maps playground tokens to compact primary CSS variables.
 */

import type { CSSProperties } from "react";
import {
  type Customization,
  EASINGS,
  FONT_STACKS,
  shadowValue,
} from "@/lib/theme/customization";
import { formatOklch } from "@/lib/theme/oklch";

export function harmanAccordionStyleEntries(
  c: Customization,
): Array<[string, string | number]> {
  const entries: Array<[string, string | number]> = [
    ["--f-a-gap", `${Math.max(4, c.layout.gap - 2)}px`],
    ["--f-a-radius", `${c.layout.radius + 2}px`],
    ["--f-a-title-size", `${c.typography.fontSize}px`],
    ["--f-a-body-size", `${Math.max(12, c.typography.fontSize - 1)}px`],
    ["--f-a-title-weight", c.typography.fontWeight],
    ["--f-a-title-tracking", `${c.typography.letterSpacing}px`],
    ["fontFamily", FONT_STACKS[c.typography.fontFamily]],
  ];

  if (c.color.override) {
    entries.push(
      ["--f-a-card-bg", formatOklch(c.color.background)],
      ["--f-a-title-color", formatOklch(c.color.text)],
      [
        "--f-a-body-color",
        formatOklch({
          ...c.color.text,
          l: Math.max(0.3, c.color.text.l * 0.55),
          c: c.color.text.c * 0.35,
        }),
      ],
    );
  }

  entries.push(["--f-a-card-shadow", shadowValue(c.shadow) ?? "none"]);
  return entries;
}

export function harmanAccordionPreviewStyle(c: Customization): CSSProperties {
  return Object.fromEntries(harmanAccordionStyleEntries(c)) as CSSProperties;
}

export function harmanAccordionStyleLiteral(c: Customization): string {
  const lines = harmanAccordionStyleEntries(c).map(([k, v]) => {
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
