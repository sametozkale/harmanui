/** Shared #fafafa panel shell — sidebars + preview stage use the same inset. */
export const PLAYGROUND_SURFACE_CLASS = "rounded-3xl bg-[#fafafa] p-5";

/** Grid row 3 shell — fills the stage row and clips overflow. */
export const PLAYGROUND_STAGE_ROW_CLASS =
  "flex h-full min-h-0 max-h-full flex-col overflow-hidden";

/** Fixed shell around a panel search header + scrollable body. */
export const PLAYGROUND_PANEL_SHELL_CLASS = `flex min-h-0 flex-1 flex-col overflow-hidden ${PLAYGROUND_SURFACE_CLASS}`;

/** Scrollable body inside a panel shell (search stays outside this node). */
export const PLAYGROUND_PANEL_SCROLL_CLASS = "playground-scroll-pane min-h-0 flex-1";
