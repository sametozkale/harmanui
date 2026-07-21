/**
 * Registry type definitions.
 *
 * The registry is deliberately plain data (no JSX) so it can later be emitted
 * as JSON for an MCP server / `llms.txt`, and so the shape stays close to the
 * shadcn registry standard for a future `npx harman-ui add <component>` CLI.
 */

export type CategoryIconKey =
  | "buttons"
  | "inputs"
  | "forms"
  | "overlays"
  | "navigation"
  | "data"
  | "feedback"
  | "layout";

export type ControlIconKey =
  | "typography"
  | "color"
  | "layout"
  | "shadow"
  | "motion"
  | "sound";

export type IconKey =
  | "plus"
  | "heart"
  | "search"
  | "settings"
  | "arrow-right"
  | "check"
  | "trash"
  | "bell";

/** A left-sidebar bucket (e.g. "Buttons") holding component families. */
export interface SidebarCategory {
  id: string;
  title: string;
  icon: CategoryIconKey;
  /** Tailwind text-color class for the category's colored glyph. */
  accent: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  /** Family id — matches a {@link ComponentFamily} when `status` is "ready". */
  id: string;
  label: string;
  status: "ready" | "soon";
}

export interface PreviewProps {
  variant?: string;
  size?: string;
  color?: string;
  status?: string;
  animationType?: string;
  orientation?: string;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  /** Uncontrolled "on" state for switch / checkbox / toggle. */
  selected?: boolean;
  loading?: boolean;
  icon?: IconKey;
  label?: string;
  /** Progress value 0–100. */
  value?: number;
  /** Drawer / toast region placement. */
  placement?: string;
  /** Surface / badge shape hint. */
  shape?: string;
  /** Color swatch picker layout (grid | stack). */
  layout?: string;
  /** Free-form example content for typography, empty-state, etc. */
  content?: string;
  /** Typography text alignment. */
  align?: string;
  /** Typography font weight override. */
  weight?: string;
  /** Typography single-line truncation. */
  truncate?: boolean;
  /** Image URL for Avatar.Image and similar media previews. */
  src?: string;
  /** Accessible alt text for image previews. */
  alt?: string;
}

export interface PreviewItem {
  id: string;
  label: string;
  props: PreviewProps;
}

export interface PreviewGroup {
  id: string;
  label: string;
  /** Layout hint for the preview grid. */
  layout?: "row" | "grid";
  items: PreviewItem[];
}

export interface FamilyTab {
  id: string;
  label: string;
  /** The HeroUI component name used by the renderer + code generator. */
  component: string;
  /** True when items are icon-only buttons. */
  iconOnly?: boolean;
  groups: PreviewGroup[];
}

export interface ComponentFamily {
  id: string;
  name: string;
  description: string;
  install: string;
  githubPath: string;
  tabs: FamilyTab[];
}
