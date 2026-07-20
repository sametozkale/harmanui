/**
 * Icon set for the playground.
 *
 * Sidebar, customize-panel, preview, and utility icons come from Huge Icons.
 */

import { CategoryHugeIcon, ClearHugeIcon, ControlHugeIcon, PreviewHugeIcon, SearchHugeIcon } from "@/lib/icons";
import type { CategoryIconKey, ControlIconKey, IconKey } from "@/lib/registry/types";

export { GithubIcon } from "@/lib/icons";

export function PreviewIcon({
  name,
  className,
}: {
  name: IconKey;
  className?: string;
}) {
  return <PreviewHugeIcon name={name} className={className} strokeWidth={1.75} />;
}

/** Sidebar category glyphs (Huge Icons). */
export function CategoryIcon({
  name,
  className,
}: {
  name: CategoryIconKey;
  className?: string;
}) {
  return <CategoryHugeIcon name={name} className={className} strokeWidth={1.75} />;
}

/** Right-panel customize accordion glyphs (Huge Icons). */
export function ControlIcon({
  name,
  className,
}: {
  name: ControlIconKey;
  className?: string;
}) {
  return <ControlHugeIcon name={name} className={className} strokeWidth={1.75} />;
}

/** Panel search fields (Huge Icons). */
export function SearchIcon({ className }: { className?: string }) {
  return <SearchHugeIcon className={className} strokeWidth={1.75} />;
}

export function ClearSearchIcon({ className }: { className?: string }) {
  return <ClearHugeIcon className={className} strokeWidth={1.75} />;
}
