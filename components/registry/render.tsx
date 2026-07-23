/**
 * Preview renderer — delegates to per-family specs.
 */
"use client";

import type { CSSProperties, ReactNode } from "react";
import type { Customization } from "@/lib/theme/customization";
import { DEFAULT_CUSTOMIZATION } from "@/lib/theme/customization";
import type { CustomizeVisibility } from "@/lib/theme/customize-capabilities";
import { SPECS } from "@/lib/registry/families/specs";
import type { PreviewItem } from "@/lib/registry/types";

interface Ctx {
  style: CSSProperties;
  className: string;
  customization?: Customization;
  visibility?: CustomizeVisibility;
}

export function renderPreview(
  familyId: string,
  component: string,
  item: PreviewItem,
  { style, className, customization = DEFAULT_CUSTOMIZATION, visibility }: Ctx,
): ReactNode {
  const spec = SPECS[familyId];
  if (!spec) return null;
  return spec.render(component, item, { style, className, customization, visibility });
}
