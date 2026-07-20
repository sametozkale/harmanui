/**
 * Huge Icons wrappers — lucide-like components for app chrome and previews.
 */

import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  Add01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  BotIcon,
  ChevronDownIcon,
  ColorsIcon,
  ComputerTerminal01Icon,
  Copy01Icon,
  CopyIcon,
  Delete02Icon,
  EaseInOutIcon,
  FavouriteIcon,
  FormIcon,
  GithubIcon as GithubBrandIcon,
  InputTextIcon,
  Layers02Icon,
  LayoutGridIcon,
  LayoutLeftIcon,
  MouseLeftClick01Icon,
  Navigation01Icon,
  Notification01Icon,
  Palette,
  Refresh01Icon,
  RotateLeft01Icon,
  Search01Icon,
  Cancel01Icon,
  Settings01Icon,
  SourceCodeIcon,
  SparklesIcon,
  TableIcon,
  TextFontIcon,
  Tick02Icon,
  VolumeHighIcon,
} from "@hugeicons/core-free-icons";
import type { CategoryIconKey, ControlIconKey, IconKey } from "@/lib/registry/types";

export type IconProps = {
  className?: string;
  strokeWidth?: number;
};

function createIcon(icon: IconSvgElement) {
  return function Icon({ className, strokeWidth = 1.75 }: IconProps) {
    return (
      <HugeiconsIcon icon={icon} className={className} strokeWidth={strokeWidth} aria-hidden />
    );
  };
}

/** Preview glyph data keyed by registry {@link IconKey}. */
export const PREVIEW_ICON_DATA: Record<IconKey, IconSvgElement> = {
  plus: Add01Icon,
  heart: FavouriteIcon,
  search: Search01Icon,
  settings: Settings01Icon,
  bell: Notification01Icon,
  trash: Delete02Icon,
  check: Tick02Icon,
  "arrow-right": ArrowRight01Icon,
};

/** Import names emitted by the code generator. */
export const PREVIEW_ICON_IMPORT: Record<IconKey, string> = {
  plus: "Add01Icon",
  heart: "FavouriteIcon",
  search: "Search01Icon",
  settings: "Settings01Icon",
  bell: "Notification01Icon",
  trash: "Delete02Icon",
  check: "Tick02Icon",
  "arrow-right": "ArrowRight01Icon",
};

export function PreviewHugeIcon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: IconKey;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <HugeiconsIcon
      icon={PREVIEW_ICON_DATA[name]}
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  );
}

/** Customize panel accordion glyphs keyed by {@link ControlIconKey}. */
export const CONTROL_ICON_DATA: Record<ControlIconKey, IconSvgElement> = {
  typography: TextFontIcon,
  color: ColorsIcon,
  layout: LayoutGridIcon,
  shadow: CopyIcon,
  motion: EaseInOutIcon,
  sound: VolumeHighIcon,
};

export function ControlHugeIcon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: ControlIconKey;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <HugeiconsIcon
      icon={CONTROL_ICON_DATA[name]}
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  );
}

/** Sidebar category glyphs keyed by {@link CategoryIconKey}. */
export const CATEGORY_ICON_DATA: Record<CategoryIconKey, IconSvgElement> = {
  buttons: MouseLeftClick01Icon,
  inputs: InputTextIcon,
  forms: FormIcon,
  overlays: Layers02Icon,
  navigation: Navigation01Icon,
  data: TableIcon,
  feedback: Notification01Icon,
  layout: LayoutLeftIcon,
};

export function CategoryHugeIcon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: CategoryIconKey;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <HugeiconsIcon
      icon={CATEGORY_ICON_DATA[name]}
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  );
}

export function SearchHugeIcon({
  className,
  strokeWidth = 1.75,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <HugeiconsIcon
      icon={Search01Icon}
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  );
}

export function ClearHugeIcon({
  className,
  strokeWidth = 1.75,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <HugeiconsIcon
      icon={Cancel01Icon}
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  );
}

export const ArrowRight = createIcon(ArrowRight01Icon);
export const ArrowUpRight = createIcon(ArrowUpRight01Icon);
export const Bot = createIcon(BotIcon);
export const Check = createIcon(Tick02Icon);
export const ChevronDown = createIcon(ChevronDownIcon);
export const Code2 = createIcon(SourceCodeIcon);
export const Copy = createIcon(Copy01Icon);
export const PaletteIcon = createIcon(Palette);
export const Reset = createIcon(Refresh01Icon);
export const RotateCcw = createIcon(RotateLeft01Icon);
export const Search = createIcon(Search01Icon);
export const Sparkles = createIcon(SparklesIcon);
export const Terminal = createIcon(ComputerTerminal01Icon);

export function GithubIcon({ className }: { className?: string }) {
  return <HugeiconsIcon icon={GithubBrandIcon} className={className} aria-hidden />;
}
