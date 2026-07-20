/**
 * Client-only family specs — live render + code templates.
 */
"use client";

import type { ComponentFamily } from "../types";
import type { FamilySpec } from "./_spec";
import { EXISTING_FAMILY_DEFINITIONS } from "./existing-families-data";
import { NEW_FAMILY_DEFINITIONS } from "./new-families-data";
import { EXISTING_RENDERERS } from "./existing-renderers";
import { EXISTING_CODE } from "./existing-codegen";
import { NEW_RENDERERS } from "./new-renderers";
import { NEW_CODE } from "./new-codegen";

type FamilyRenderer = NonNullable<(typeof EXISTING_RENDERERS)[string]>;
type FamilyCodegen = NonNullable<(typeof EXISTING_CODE)[string]>;

function wireFamily(
  family: ComponentFamily,
  renderers: Record<string, FamilyRenderer | undefined>,
  codegens: Record<string, FamilyCodegen | undefined>,
): FamilySpec {
  const render = renderers[family.id];
  const code = codegens[family.id];
  if (!render || !code) {
    throw new Error(
      `Missing renderer or codegen for family "${family.id}"`,
    );
  }
  return { family, render, code };
}

export const ALL_SPECS: FamilySpec[] = [
  ...EXISTING_FAMILY_DEFINITIONS.map((f) =>
    wireFamily(f, EXISTING_RENDERERS, EXISTING_CODE),
  ),
  ...NEW_FAMILY_DEFINITIONS.map((f) =>
    wireFamily(f, NEW_RENDERERS, NEW_CODE),
  ),
];

export const SPECS: Record<string, FamilySpec> = Object.fromEntries(
  ALL_SPECS.map((spec) => [spec.family.id, spec]),
);
