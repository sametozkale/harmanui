/**
 * IconButton
 *
 * A Button that renders a single icon and no text label. It fixes
 * `isIconOnly` and *requires* an `aria-label`, so the control is always
 * announced correctly by assistive technology — the most common accessibility
 * miss with icon-only buttons.
 *
 * @example
 * <IconButton aria-label="Add item" variant="secondary">
 *   <Plus className="size-4" />
 * </IconButton>
 */
"use client";

import { Button, type ButtonProps } from "@heroui/react";

export interface IconButtonProps extends Omit<ButtonProps, "isIconOnly"> {
  /** Required — describes the action for screen readers. */
  "aria-label": string;
}

export function IconButton(props: IconButtonProps) {
  return <Button isIconOnly {...props} />;
}

IconButton.displayName = "IconButton";
