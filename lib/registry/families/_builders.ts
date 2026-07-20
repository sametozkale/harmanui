/**
 * Shared builders for family preview data.
 */

import { KIT_NAME } from "../registry-constants";
import type {
  ComponentFamily,
  FamilyTab,
  PreviewGroup,
  PreviewItem,
  PreviewProps,
} from "../types";

export const it = (id: string, label: string, props: PreviewProps): PreviewItem => ({
  id,
  label,
  props,
});

export const g = (
  id: string,
  label: string,
  items: PreviewItem[],
  layout: "row" | "grid" = "row",
): PreviewGroup => ({ id, label, layout, items });

export function familyTab(
  id: string,
  label: string,
  component: string,
  groups: PreviewGroup[],
  extras?: { iconOnly?: boolean },
): FamilyTab {
  return { id, label, component, groups, ...extras };
}

export function makeFamily(o: {
  id: string;
  name: string;
  component: string;
  description: string;
  groups: PreviewGroup[];
  githubPath?: string;
}): ComponentFamily {
  return {
    id: o.id,
    name: o.name,
    description: o.description,
    install: `npx ${KIT_NAME} add ${o.id}`,
    githubPath:
      o.githubPath ?? `components/registry/${o.id}/${o.name.replace(/\s+/g, "")}.tsx`,
    tabs: [{ id: o.id, label: o.name, component: o.component, groups: o.groups }],
  };
}

export const VARIANT_PRIMARY_SECONDARY = [
  { id: "primary", label: "Primary" },
  { id: "secondary", label: "Secondary" },
] as const;

export const SIZES_SM_MD_LG = [
  { id: "sm", label: "Small" },
  { id: "md", label: "Medium" },
  { id: "lg", label: "Large" },
] as const;

export const COLORS_SOFT = [
  { id: "accent", label: "Accent" },
  { id: "success", label: "Success" },
  { id: "warning", label: "Warning" },
  { id: "danger", label: "Danger" },
  { id: "default", label: "Default" },
] as const;
