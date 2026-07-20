/**
 * Button
 *
 * A curated, documented surface over HeroUI's accessible Button (built on
 * React Aria Components). Triggers an action or event. Supports seven visual
 * variants (`primary`, `secondary`, `tertiary`, `outline`, `ghost`, `danger`,
 * `danger-soft`) and three sizes (`sm`, `md`, `lg`).
 *
 * Accessibility, focus management and keyboard behavior are inherited from
 * React Aria — do not re-implement them here.
 *
 * @example
 * <Button variant="primary" size="md">Save changes</Button>
 */
"use client";

import {
  Button as HeroButton,
  type ButtonProps,
  BUTTON_GROUP_CHILD,
} from "@heroui/react";

export type { ButtonProps };

export function Button({
  [BUTTON_GROUP_CHILD]: isButtonGroupChild,
  ...props
}: ButtonProps) {
  return (
    <HeroButton
      {...props}
      {...(isButtonGroupChild ? { [BUTTON_GROUP_CHILD]: true as const } : {})}
    />
  );
}

Button.displayName = "Button";
