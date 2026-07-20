/**
 * The component registry.
 *
 * `SIDEBAR` drives the left navigation (grouped by component family, never by
 * variant). `FAMILIES` holds the fully-specified, ready families that power the
 * middle preview + code generation. Families listed in {@link FAMILIES} are
 * playable in the playground; the rest of the catalog is marked "soon".
 */

import type { SidebarCategory, SidebarItem } from "./types";
import { FAMILIES } from "./families";

export { GITHUB_REPO, KIT_NAME } from "./registry-constants";
export { FAMILIES } from "./families";

const item = (id: string, label: string): SidebarItem => ({
  id,
  label,
  status: id in FAMILIES ? "ready" : "soon",
});

/**
 * The full HeroUI v3 catalog, grouped by family into eight buckets. Every
 * family is a single entry — variants (Button / ButtonGroup / IconButton, etc.)
 * live in the middle tab menu, never here. Items present in {@link FAMILIES}
 * are playable; the rest stay catalogued as "soon".
 */
export const SIDEBAR: SidebarCategory[] = [
  {
    id: "buttons",
    title: "Buttons",
    icon: "buttons",
    accent: "text-blue-500",
    items: [
      item("button", "Button"),
      item("toggle-button", "Toggle Button"),
      item("close-button", "Close Button"),
    ],
  },
  {
    id: "inputs",
    title: "Inputs",
    icon: "inputs",
    accent: "text-violet-500",
    items: [
      item("input", "Input"),
      item("textarea", "Textarea"),
      item("number-field", "Number Field"),
      item("search-field", "Search Field"),
      item("input-otp", "OTP Input"),
    ],
  },
  {
    id: "forms",
    title: "Forms",
    icon: "forms",
    accent: "text-emerald-500",
    items: [
      item("checkbox", "Checkbox"),
      item("radio-group", "Radio Group"),
      item("switch", "Switch"),
      item("select", "Select"),
      item("combo-box", "Combobox"),
      item("autocomplete", "Autocomplete"),
      item("slider", "Slider"),
      item("date-picker", "Date Picker"),
      item("date-range-picker", "Date Range Picker"),
      item("date-field", "Date Field"),
      item("time-field", "Time Field"),
      item("calendar", "Calendar"),
      item("color", "Color"),
      item("form-primitives", "Form Primitives"),
      item("form", "Form"),
    ],
  },
  {
    id: "overlays",
    title: "Overlays",
    icon: "overlays",
    accent: "text-amber-500",
    items: [
      item("modal", "Modal"),
      item("drawer", "Drawer"),
      item("popover", "Popover"),
      item("tooltip", "Tooltip"),
      item("dropdown", "Dropdown Menu"),
      item("alert-dialog", "Alert Dialog"),
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    icon: "navigation",
    accent: "text-rose-500",
    items: [
      item("tabs", "Tabs"),
      item("breadcrumbs", "Breadcrumbs"),
      item("pagination", "Pagination"),
      item("link", "Link"),
      item("menu", "Menu"),
      item("toolbar", "Toolbar"),
    ],
  },
  {
    id: "data",
    title: "Data Display",
    icon: "data",
    accent: "text-cyan-500",
    items: [
      item("table", "Table"),
      item("avatar", "Avatar"),
      item("badge", "Badge"),
      item("chip", "Chip"),
      item("card", "Card"),
      item("list-box", "List Box"),
      item("tag-group", "Tag Group"),
      item("meter", "Meter"),
      item("progress-circle", "Progress"),
      item("kbd", "Keyboard Key"),
    ],
  },
  {
    id: "feedback",
    title: "Feedback",
    icon: "feedback",
    accent: "text-orange-500",
    items: [
      item("alert", "Alert"),
      item("toast", "Toast"),
      item("spinner", "Spinner"),
      item("skeleton", "Skeleton"),
      item("empty-state", "Empty State"),
      item("scroll-shadow", "Scroll Shadow"),
    ],
  },
  {
    id: "layout",
    title: "Layout Primitives",
    icon: "layout",
    accent: "text-fuchsia-500",
    items: [
      item("accordion", "Accordion"),
      item("disclosure", "Disclosure"),
      item("separator", "Separator"),
      item("surface", "Surface"),
      item("typography", "Typography"),
      item("fieldset", "Fieldset"),
    ],
  },
];
