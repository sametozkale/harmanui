/**
 * FamilySpec — each HeroUI family owns its preview data, live render, and code template.
 */

import type { CSSProperties, ReactNode } from "react";
import type { Customization, PreviewMotionOptions } from "@/lib/theme/customization";
import type { ComponentFamily, PreviewItem } from "../types";

export interface SpecCtx {
  style: CSSProperties;
  className: string;
  customization: Customization;
  motionOptions?: PreviewMotionOptions;
}

export interface CodeBuilt {
  hero: string[];
  icons?: string[];
  jsx: string;
  /** Extra import lines before the @heroui/react import (e.g. toast imperative API). */
  preamble?: string[];
  /** Wrap Example body: (jsx) => string */
  wrapExample?: (jsx: string) => string;
}

export interface FamilySpec {
  family: ComponentFamily;
  render: (component: string, item: PreviewItem, ctx: SpecCtx) => ReactNode;
  code: (component: string, item: PreviewItem, ctx: SpecCtx) => CodeBuilt;
}

/** Forward runtime enum strings into strictly-typed HeroUI props. */
export const asEnum = (v: string | undefined) => v as never;

const BUTTON_GROUP_STYLE_OMIT = new Set([
  "gap",
  "--radius",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "paddingBottom",
  "backgroundColor",
  "color",
  "borderColor",
  "borderStyle",
  "borderWidth",
  "boxShadow",
]);

/** ButtonGroup owns seams, gap, and corner radii — strip layout/color tokens that break it. */
export function buttonGroupPreviewCtx(ctx: SpecCtx): SpecCtx {
  const style = Object.fromEntries(
    Object.entries(ctx.style).filter(([key]) => !BUTTON_GROUP_STYLE_OMIT.has(key)),
  ) as CSSProperties;
  const className = ctx.className
    .split(/\s+/)
    .filter(
      (token) =>
        token &&
        !token.startsWith("active:scale") &&
        !token.startsWith("hover:scale") &&
        !token.startsWith("hover:-translate"),
    )
    .join(" ");
  return { ...ctx, style, className };
}

const INTRINSIC_PREVIEW_STYLE_OMIT = new Set([
  "gap",
  "--radius",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "letterSpacing",
  "whiteSpace",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "paddingBottom",
  "backgroundColor",
  "color",
  "borderColor",
  "borderStyle",
  "borderWidth",
  "boxShadow",
]);

/** Fixed-geometry HeroUI parts (Avatar, Spinner, …) — customization must not reshape them. */
export function intrinsicPreviewCtx(ctx: SpecCtx): SpecCtx {
  const style = Object.fromEntries(
    Object.entries(ctx.style).filter(([key]) => !INTRINSIC_PREVIEW_STYLE_OMIT.has(key)),
  ) as CSSProperties;
  return { ...ctx, style, className: "" };
}
