/**
 * Per-component Customize panel visibility.
 *
 * Resolves which token controls are meaningful from registry metadata,
 * capability profiles, and fine-grained overrides. Preview/codegen should
 * filter style output with {@link filterStyleEntries} using the same visibility.
 */

import { FAMILIES } from "../registry/families";
import type {
  CapabilityProfileId,
  ComponentFamily,
  FamilyTab,
  PreviewItem,
} from "../registry/types";
import type { PreviewMotionOptions } from "./customization";

export type {
  CapabilityProfileId,
  CustomizeStyleTarget,
} from "../registry/types";

export type CustomizeControlKey =
  | "fontFamily"
  | "fontSize"
  | "fontWeight"
  | "letterSpacing"
  | "wrap"
  | "colorOverride"
  | "background"
  | "text"
  | "border"
  | "customPadding"
  | "paddingX"
  | "paddingY"
  | "gap"
  | "radius"
  | "innerRadius"
  | "borderWidth"
  | "shadowPreset"
  | "shadowColor"
  | "shadowOpacity"
  | "duration"
  | "easing"
  | "hover"
  | "soundEnabled"
  | "soundVolume"
  | "soundCue";

export type CustomizeSectionKey =
  | "typography"
  | "color"
  | "layout"
  | "shadow"
  | "motion"
  | "sound";

export type CustomizeVisibility = Record<CustomizeControlKey, boolean>;

const SECTION_CONTROLS: Record<CustomizeSectionKey, CustomizeControlKey[]> = {
  typography: ["fontFamily", "fontSize", "fontWeight", "letterSpacing", "wrap"],
  color: ["colorOverride", "background", "text", "border"],
  layout: [
    "customPadding",
    "paddingX",
    "paddingY",
    "gap",
    "radius",
    "innerRadius",
    "borderWidth",
  ],
  shadow: ["shadowPreset", "shadowColor", "shadowOpacity"],
  motion: ["duration", "easing", "hover"],
  sound: ["soundEnabled", "soundVolume", "soundCue"],
};

const ALL_ON: CustomizeVisibility = {
  fontFamily: true,
  fontSize: true,
  fontWeight: true,
  letterSpacing: true,
  wrap: true,
  colorOverride: true,
  background: true,
  text: true,
  border: true,
  customPadding: true,
  paddingX: true,
  paddingY: true,
  gap: true,
  radius: true,
  innerRadius: false,
  borderWidth: true,
  shadowPreset: true,
  shadowColor: true,
  shadowOpacity: true,
  duration: true,
  easing: true,
  hover: true,
  soundEnabled: true,
  soundVolume: true,
  soundCue: true,
};

const TYPOGRAPHY_OFF: Partial<CustomizeVisibility> = {
  fontFamily: false,
  fontSize: false,
  fontWeight: false,
  letterSpacing: false,
  wrap: false,
};

function profile(overrides: Partial<CustomizeVisibility>): CustomizeVisibility {
  return { ...ALL_ON, ...overrides };
}

const PROFILES: Record<CapabilityProfileId, CustomizeVisibility> = {
  "interactive-control": ALL_ON,

  "group-filtered": profile({
    fontFamily: false,
    fontSize: false,
    fontWeight: false,
    letterSpacing: false,
    wrap: false,
    gap: false,
    radius: false,
    customPadding: false,
    paddingX: false,
    paddingY: false,
    colorOverride: false,
    background: false,
    text: false,
    border: false,
    borderWidth: false,
    shadowPreset: false,
    shadowColor: false,
    shadowOpacity: false,
    duration: false,
    easing: false,
    hover: false,
    soundEnabled: false,
    soundVolume: false,
    soundCue: false,
  }),

  "group-unfiltered": profile({
    fontWeight: false,
    letterSpacing: false,
    wrap: false,
    customPadding: false,
    paddingX: false,
    paddingY: false,
    borderWidth: false,
    hover: false,
  }),

  "selection-control": ALL_ON,

  "form-field": profile({
    hover: false,
  }),

  "container-surface": profile({
    hover: false,
  }),

  "fussionary-accordion": profile({
    wrap: false,
    customPadding: false,
    paddingX: false,
    paddingY: false,
    border: false,
    borderWidth: false,
    innerRadius: false,
    duration: false,
    easing: false,
    hover: false,
    soundEnabled: false,
    soundVolume: false,
    soundCue: false,
  }),

  /** Overlay triggers are styled like interactive buttons. */
  "overlay-trigger-wrapper": ALL_ON,

  "split-attachment": profile({
    fontFamily: false,
    fontWeight: false,
    letterSpacing: false,
    wrap: false,
    shadowPreset: false,
    shadowColor: false,
    shadowOpacity: false,
    hover: false,
  }),

  "non-text-metric": profile({
    fontFamily: false,
    fontSize: false,
    fontWeight: false,
    letterSpacing: false,
    wrap: false,
  }),

  "typography-native": ALL_ON,
};

/** Default profile when a family has a single tab (tab id === family id). */
const FAMILY_PROFILE: Record<string, CapabilityProfileId> = {
  button: "interactive-control",
  "toggle-button": "interactive-control",
  "close-button": "interactive-control",
  switch: "selection-control",
  checkbox: "selection-control",
  "progress-circle": "non-text-metric",
  input: "form-field",
  textarea: "form-field",
  "number-field": "form-field",
  "search-field": "form-field",
  "input-otp": "form-field",
  select: "form-field",
  "combo-box": "form-field",
  autocomplete: "form-field",
  slider: "split-attachment",
  "date-picker": "form-field",
  "date-field": "form-field",
  "time-field": "form-field",
  "date-range-picker": "form-field",
  calendar: "container-surface",
  color: "overlay-trigger-wrapper",
  form: "container-surface",
  "form-primitives": "form-field",
  modal: "overlay-trigger-wrapper",
  drawer: "overlay-trigger-wrapper",
  popover: "overlay-trigger-wrapper",
  tooltip: "overlay-trigger-wrapper",
  dropdown: "overlay-trigger-wrapper",
  "alert-dialog": "overlay-trigger-wrapper",
  tabs: "container-surface",
  breadcrumbs: "typography-native",
  pagination: "interactive-control",
  menu: "container-surface",
  toolbar: "container-surface",
  table: "container-surface",
  badge: "interactive-control",
  "list-box": "container-surface",
  "tag-group": "group-unfiltered",
  meter: "non-text-metric",
  typography: "typography-native",
  toast: "overlay-trigger-wrapper",
  "empty-state": "container-surface",
  "scroll-shadow": "container-surface",
  accordion: "container-surface",
  disclosure: "container-surface",
  surface: "container-surface",
  fieldset: "container-surface",
  "radio-group": "group-unfiltered",
  chip: "interactive-control",
  avatar: "non-text-metric",
  kbd: "non-text-metric",
  alert: "container-surface",
  spinner: "non-text-metric",
  separator: "non-text-metric",
  skeleton: "split-attachment",
  card: "container-surface",
  link: "typography-native",
};

/** Item-specific profile overrides (variant rows in the playground). */
const ITEM_PROFILE: Record<string, CapabilityProfileId> = {
  "accordion:ac-default": "fussionary-accordion",
  "accordion:ac-surface": "fussionary-accordion",
};

/** Tab-specific profile overrides for multi-tab families. */
const TAB_PROFILE: Record<string, CapabilityProfileId> = {
  "button:button-group": "group-filtered",
  "button:icon-button": "interactive-control",
  "toggle-button:toggle-button-group": "group-filtered",
  "switch:switch-group": "group-unfiltered",
  "checkbox:checkbox-group": "group-unfiltered",
  "progress-circle:progress-bar": "non-text-metric",
  "input:input-group": "form-field",
  "calendar:range-calendar": "container-surface",
  "date-field:date-input-group": "form-field",
  "disclosure:disclosure-group": "container-surface",
  "color:color-field": "form-field",
  "color:color-input-group": "form-field",
  "color:color-swatch-picker": "selection-control",
  "color:color-picker": "interactive-control",
};

/** Controls hidden for fixed-geometry components (Avatar, Spinner, Separator, …). */
const INTRINSIC_CONTROL_OVERRIDES: Partial<CustomizeVisibility> = {
  fontFamily: false,
  fontSize: false,
  fontWeight: false,
  letterSpacing: false,
  wrap: false,
  colorOverride: false,
  background: false,
  text: false,
  border: false,
  customPadding: false,
  paddingX: false,
  paddingY: false,
  gap: false,
  radius: false,
  innerRadius: false,
  borderWidth: false,
  shadowPreset: false,
  shadowColor: false,
  shadowOpacity: false,
  hover: false,
};

/** Fine-grained control overrides on top of a profile. */
const CONTROL_OVERRIDES: Record<string, Partial<CustomizeVisibility>> = {
  avatar: INTRINSIC_CONTROL_OVERRIDES,
  spinner: INTRINSIC_CONTROL_OVERRIDES,
  separator: INTRINSIC_CONTROL_OVERRIDES,
  kbd: INTRINSIC_CONTROL_OVERRIDES,
  "progress-circle:progress-circle": INTRINSIC_CONTROL_OVERRIDES,
};

const PRESS_FEEDBACK_PROFILES = new Set<CapabilityProfileId>([
  "interactive-control",
  "overlay-trigger-wrapper",
]);

export interface RegistryCustomizeContext {
  family: ComponentFamily;
  tab: FamilyTab;
  item?: PreviewItem;
}

export function findRegistryCustomizeContext(
  familyId: string,
  tabId: string,
  itemId?: string,
): RegistryCustomizeContext | null {
  const family = FAMILIES[familyId];
  if (!family) return null;

  const tab = family.tabs.find((entry) => entry.id === tabId) ?? family.tabs[0];
  if (!tab) return null;

  let item: PreviewItem | undefined;
  if (itemId) {
    for (const group of tab.groups) {
      item = group.items.find((entry) => entry.id === itemId);
      if (item) break;
    }
  }

  return { family, tab, item };
}

function resolveProfileId(
  familyId: string,
  tabId: string,
  itemId?: string,
  registry?: RegistryCustomizeContext | null,
): CapabilityProfileId {
  const ctx = registry ?? findRegistryCustomizeContext(familyId, tabId, itemId);
  const tabKey = `${familyId}:${tabId}`;
  const itemKey = itemId ? `${familyId}:${itemId}` : "";

  return (
    ctx?.item?.customizeProfile ??
    ctx?.tab.customizeProfile ??
    ITEM_PROFILE[itemKey] ??
    TAB_PROFILE[tabKey] ??
    FAMILY_PROFILE[familyId] ??
    "interactive-control"
  );
}

function isIconOnlyContext(ctx: RegistryCustomizeContext | null): boolean {
  if (!ctx) return false;
  return (
    ctx.tab.iconOnly === true ||
    ctx.tab.component === "CloseButton" ||
    ctx.item?.props.isIconOnly === true
  );
}

function applyRegistryAutoRules(
  visibility: CustomizeVisibility,
  ctx: RegistryCustomizeContext | null,
): CustomizeVisibility {
  if (!ctx) return visibility;

  if (isIconOnlyContext(ctx)) {
    return { ...visibility, ...TYPOGRAPHY_OFF };
  }

  return visibility;
}

export function getPreviewMotionOptions(
  familyId: string,
  tabId: string,
  customization: { motion: { hover: string } },
  itemId?: string,
): PreviewMotionOptions {
  const visibility = getCustomizeVisibility(familyId, tabId, itemId);
  const profileId = resolveProfileId(familyId, tabId, itemId);

  return {
    pressFeedback: PRESS_FEEDBACK_PROFILES.has(profileId),
    hoverEffects: visibility.hover && customization.motion.hover !== "none",
  };
}

export function getCustomizeVisibility(
  familyId: string,
  tabId: string,
  itemId?: string,
): CustomizeVisibility {
  const registry = findRegistryCustomizeContext(familyId, tabId, itemId);
  const tabKey = `${familyId}:${tabId}`;
  const itemKey = itemId ? `${familyId}:${itemId}` : "";
  const profileId = resolveProfileId(familyId, tabId, itemId, registry);
  const base = PROFILES[profileId];
  const familyOverrides = CONTROL_OVERRIDES[familyId];
  const tabOverrides = CONTROL_OVERRIDES[tabKey];
  const itemOverrides = CONTROL_OVERRIDES[itemKey];

  return applyRegistryAutoRules(
    {
      ...base,
      ...familyOverrides,
      ...tabOverrides,
      ...itemOverrides,
    },
    registry,
  );
}

export function sectionHasVisibleControls(
  section: CustomizeSectionKey,
  visibility: CustomizeVisibility,
): boolean {
  return SECTION_CONTROLS[section].some((key) => visibility[key]);
}

export function isControlVisible(
  key: CustomizeControlKey,
  visibility: CustomizeVisibility,
): boolean {
  return visibility[key];
}