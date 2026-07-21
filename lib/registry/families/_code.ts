/**
 * Shared code-generation helpers for family specs.
 */

import {
  type Customization,
  styleEntries,
  buildPreviewClassName,
  type PreviewMotionOptions,
} from "@/lib/theme/customization";
import {
  getCustomizeVisibility,
  sectionHasVisibleControls,
} from "@/lib/theme/customize-capabilities";
import { BUTTON_GROUP_STYLE_OMIT, type CodeBuilt } from "./_spec";

export interface FormatExampleOptions {
  familyId: string;
  tabId: string;
  itemId?: string;
  customization: Customization;
}

function styleLiteralFromEntries(entries: Array<[string, string | number]>): string {
  if (entries.length === 0) {
    return "{} as React.CSSProperties";
  }
  const lines = entries.map(([k, v]) => {
    const key = /^[a-zA-Z][a-zA-Z0-9]*$/.test(k) ? k : `"${k}"`;
    const value = typeof v === "number" ? String(v) : `"${v}"`;
    return `        ${key}: ${value},`;
  });
  return `{\n${lines.join("\n")}\n      } as React.CSSProperties`;
}

export function styleLiteral(c: Customization): string {
  return styleLiteralFromEntries(styleEntries(c));
}

export function attrs(
  pairs: Array<[string, string | number | boolean | undefined]>,
): string {
  return pairs
    .filter(([, v]) => v !== undefined && v !== false && v !== "md")
    .map(([k, v]) =>
      v === true ? `        ${k}` : `        ${k}=${typeof v === "number" ? `{${v}}` : `"${v}"`}`,
    )
    .join("\n");
}

export function codeCtx(
  customization: Customization,
  motionOptions?: PreviewMotionOptions,
) {
  const className = buildPreviewClassName(customization, motionOptions);
  const style = styleLiteral(customization);
  return {
    className,
    style,
    styleAttr: `        style={${style}}`,
    classAttr: `        className="${className}"`,
  };
}

export function buttonGroupStyleLiteral(c: Customization): string {
  const entries = styleEntries(c).filter(([k]) => !BUTTON_GROUP_STYLE_OMIT.has(k));
  return styleLiteralFromEntries(entries);
}

/** HeroUI ButtonGroup anatomy — separators live inside buttons 2 and 3. */
export const BUTTON_GROUP_CHILDREN_JSX = `        <Button>First</Button>
        <Button>
          <ButtonGroup.Separator />
          Second
        </Button>
        <Button>
          <ButtonGroup.Separator />
          Third
        </Button>`;

export function toggleButtonGroupChildrenJsx(variant?: string): string {
  const variantAttr = variant ? ` variant="${variant}"` : "";
  return `        <ToggleButton id="left"${variantAttr}>
          Left
        </ToggleButton>
        <ToggleButton id="center"${variantAttr}>
          <ToggleButtonGroup.Separator />
          Center
        </ToggleButton>
        <ToggleButton id="right"${variantAttr}>
          <ToggleButtonGroup.Separator />
          Right
        </ToggleButton>`;
}

export function buttonGroupCodeCtx(
  customization: Customization,
  _motionOptions?: PreviewMotionOptions,
) {
  const style = buttonGroupStyleLiteral(customization);
  const hasStyle = style !== "{} as React.CSSProperties";
  return {
    className: "",
    style,
    styleAttr: hasStyle ? `        style={${style}}` : "",
    classAttr: "",
  };
}

const INTRINSIC_STYLE_OMIT = new Set([
  "gap",
  "--radius",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "letterSpacing",
  "whiteSpace",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "paddingBottom",
  "backgroundColor",
  "color",
  "borderColor",
  "borderStyle",
  "borderWidth",
  "boxShadow",
]);

/** Fixed-geometry components — mirror {@link intrinsicPreviewCtx} in codegen. */
export function intrinsicCodeCtx(
  customization: Customization,
  motionOptions?: PreviewMotionOptions,
) {
  const entries = styleEntries(customization).filter(
    ([key]) => !INTRINSIC_STYLE_OMIT.has(key),
  );
  const style = styleLiteralFromEntries(entries);
  return {
    className: "",
    style,
    styleAttr: entries.length ? `        style={${style}}` : "",
    classAttr: "",
  };
}

function shouldEmitInteractionSound(options: FormatExampleOptions): boolean {
  const visibility = getCustomizeVisibility(
    options.familyId,
    options.tabId,
    options.itemId,
  );
  return sectionHasVisibleControls("sound", visibility);
}

function interactionSoundPreamble(customization: Customization): string[] {
  const { sound } = customization;
  return [
    `import type { PointerEvent } from "react";`,
    `import {`,
    `  playInteractionSound,`,
    `  shouldPlayInteractionSound,`,
    `  type InteractionSoundSettings,`,
    `} from "@/lib/interaction-sound";`,
    ``,
    `const interactionSound: InteractionSoundSettings = {`,
    `  enabled: ${sound.enabled},`,
    `  cue: "${sound.cue}",`,
    `  volume: ${sound.volume},`,
    `};`,
    ``,
    `function handleInteractionSound(event: PointerEvent<HTMLDivElement>) {`,
    `  if (!shouldPlayInteractionSound(event.target)) return;`,
    `  playInteractionSound(interactionSound);`,
    `}`,
  ];
}

function wrapJsxWithInteractionSound(jsx: string): string {
  const indented = jsx
    .split("\n")
    .map((line) => (line ? `        ${line}` : line))
    .join("\n");
  return `<div onPointerDownCapture={handleInteractionSound}>\n${indented}\n      </div>`;
}

export function formatExample(
  built: CodeBuilt,
  options?: FormatExampleOptions,
): string {
  const includeSound = options ? shouldEmitInteractionSound(options) : false;

  const importLines = [
    ...(built.preamble ?? []),
    ...(includeSound ? interactionSoundPreamble(options!.customization) : []),
    `import { ${[...new Set(built.hero)].join(", ")} } from "@heroui/react";`,
  ];
  if (built.icons?.length) {
    importLines.push(`import { HugeiconsIcon } from "@hugeicons/react";`);
    importLines.push(
      `import { ${[...new Set(built.icons)].join(", ")} } from "@hugeicons/core-free-icons";`,
    );
  }

  const jsx = includeSound ? wrapJsxWithInteractionSound(built.jsx) : built.jsx;

  const body = built.wrapExample
    ? built.wrapExample(jsx)
    : `  return (\n      ${jsx}\n  );`;

  return (
    `${importLines.join("\n")}\n\n` +
    `export function Example() {\n` +
    body +
    `\n}\n`
  );
}
