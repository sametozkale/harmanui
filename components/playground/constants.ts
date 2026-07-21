/** Shared height for preview picker, panel search inputs, and reset control. */
export const PLAYGROUND_CONTROL_HEIGHT_CLASS = "h-9 min-h-9";

/** Same as above, for HeroUI trigger overrides that need !important. */
export const PLAYGROUND_CONTROL_HEIGHT_IMPORTANT_CLASS = "!h-9 !min-h-9";

/** Shared #fafafa inset shell — preview stage, sidebars, about panel. */
export const PLAYGROUND_SURFACE_SHELL_CLASS = "rounded-3xl bg-[#fafafa]";

/** Shared #fafafa panel shell — sidebars + preview stage use the same inset. */
export const PLAYGROUND_SURFACE_CLASS = `${PLAYGROUND_SURFACE_SHELL_CLASS} p-5`;

/** Grid row 3 shell — fills the stage row and clips overflow. */
export const PLAYGROUND_STAGE_ROW_CLASS =
  "flex h-full min-h-0 max-h-full flex-col overflow-hidden";

/** Fixed shell around a panel search header + scrollable body. */
export const PLAYGROUND_PANEL_SHELL_CLASS = `flex min-h-0 flex-1 flex-col overflow-hidden ${PLAYGROUND_SURFACE_CLASS}`;

/** Scrollable body inside a panel shell (search stays outside this node). */
export const PLAYGROUND_PANEL_SCROLL_CLASS = "playground-scroll-pane min-h-0 flex-1";

/** Pill switch tab menu — preview variant picker (on #fafafa stage). */
export const PLAYGROUND_TAB_MENU_COMPACT_CLASS =
  "inline-flex h-9 w-fit shrink-0 gap-0.5 rounded-xl bg-[#fafafa] p-0.5";

/** Pill switch tab menu — customization panel segmented controls (on #fafafa sidebar). */
export const PLAYGROUND_CUSTOMIZE_TAB_MENU_CLASS =
  "flex h-9 w-full gap-0.5 rounded-xl bg-zinc-100 p-0.5";

export function playgroundTabMenuButtonClass(active: boolean, className = ""): string {
  return `flex h-8 cursor-pointer items-center justify-center rounded-[10px] px-3.5 text-[12.5px] font-medium tracking-[-0.01em] transition active:scale-[0.98] ${
    active
      ? "bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
      : "text-zinc-500 hover:text-zinc-800"
  } ${className}`.trim();
}
