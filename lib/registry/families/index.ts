/**
 * Server-safe family catalog — preview data only, no renderers.
 */

import type { ComponentFamily } from "../types";
import { EXISTING_FAMILY_DEFINITIONS } from "./existing-families-data";
import { NEW_FAMILY_DEFINITIONS } from "./new-families-data";

const ALL_FAMILIES: ComponentFamily[] = [
  ...EXISTING_FAMILY_DEFINITIONS,
  ...NEW_FAMILY_DEFINITIONS,
];

export const FAMILIES: Record<string, ComponentFamily> = Object.fromEntries(
  ALL_FAMILIES.map((family) => [family.id, family]),
);
