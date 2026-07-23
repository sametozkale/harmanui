/**
 * Source-code generation — delegates to per-family specs.
 */

import type { Customization } from "../theme/customization";
import { formatExample } from "../registry/families/_code";
import { SPECS } from "../registry/families/specs";
import type { FamilyTab, PreviewProps } from "../registry/types";
import { DEFAULT_CUSTOMIZATION } from "../theme/customization";
import { getCustomizeVisibility, getPreviewMotionOptions } from "../theme/customize-capabilities";

export interface GenerateArgs {
  familyId: string;
  tab: FamilyTab;
  itemId?: string;
  props: PreviewProps;
  customization: Customization;
}

/** Generate a self-contained TSX example for the current selection. */
export function generateCode({
  familyId,
  tab,
  itemId,
  props,
  customization,
}: GenerateArgs): string {
  const spec = SPECS[familyId];
  if (!spec) return "";

  const item = { id: itemId ?? "", label: "", props };
  const motionOptions = getPreviewMotionOptions(familyId, tab.id, customization, itemId);
  const visibility = getCustomizeVisibility(familyId, tab.id, itemId);
  const built = spec.code(tab.component, item, {
    style: {},
    className: "",
    customization: customization ?? DEFAULT_CUSTOMIZATION,
    motionOptions,
    visibility,
  });

  return formatExample(built, {
    familyId,
    tabId: tab.id,
    itemId,
    customization: customization ?? DEFAULT_CUSTOMIZATION,
  });
}
