/**
 * ButtonGroup
 *
 * Groups related buttons into a single visually-connected control. Shares
 * `variant` and `size` with its children and manages the seams (borders,
 * radii) between them. Use `ButtonGroup.Separator` for an explicit divider.
 *
 * Built on HeroUI's ButtonGroup (React Aria). Keyboard navigation between
 * grouped buttons is handled for you.
 *
 * @example
 * <ButtonGroup variant="outline">
 *   <Button>Day</Button>
 *   <Button>Week</Button>
 *   <Button>Month</Button>
 * </ButtonGroup>
 */
"use client";

import {
  ButtonGroup as HeroButtonGroup,
  type ButtonGroupProps,
} from "@heroui/react";

export type { ButtonGroupProps };

export const ButtonGroup = HeroButtonGroup;
