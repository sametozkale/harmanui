/**
 * Code templates for the original 15 HeroUI families (behavior preserved).
 */

import { PREVIEW_ICON_IMPORT } from "@/lib/icons";
import type { PreviewItem } from "../types";
import {
  attrs,
  codeCtx,
  BUTTON_GROUP_CHILDREN_JSX,
  buttonGroupCodeCtx,
  intrinsicCodeCtx,
} from "./_code";
import type { CodeBuilt, SpecCtx } from "./_spec";
import { buildComponentCode } from "./new-codegen";

export const EXISTING_CODE: Record<
  string,
  (component: string, item: PreviewItem, ctx: SpecCtx) => CodeBuilt
> = {
  button: (component, item, ctx) => {
    const p = item.props;
    const { classAttr, styleAttr } = codeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);
    if (component === "ButtonGroup") {
      const c = buttonGroupCodeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);
      return {
        hero: ["ButtonGroup", "Button"],
        jsx: `<ButtonGroup\n${attrs([["variant", p.variant], ["size", p.size]])}${c.styleAttr ? `\n${c.styleAttr}` : ""}\n      >\n${BUTTON_GROUP_CHILDREN_JSX}\n      </ButtonGroup>`,
      };
    }
    if (p.isIconOnly && p.icon) {
      const iconImport = PREVIEW_ICON_IMPORT[p.icon];
      return {
        hero: ["Button"],
        icons: [iconImport],
        jsx: `<Button\n${attrs([["isIconOnly", true], ["aria-label", p.label ?? p.icon], ["variant", p.variant], ["size", p.size], ["isDisabled", p.isDisabled]])}\n${classAttr}\n${styleAttr}\n      >\n        <HugeiconsIcon icon={${iconImport}} className="size-4" />\n      </Button>`,
      };
    }
    const hero = ["Button"];
    if (p.loading) hero.push("Spinner");
    const inner = p.loading
      ? `        <Spinner size="sm" />\n        ${p.label ?? "Loading"}`
      : `        ${p.label ?? "Button"}`;
    return {
      hero,
      jsx: `<Button\n${attrs([["variant", p.variant], ["size", p.size], ["isDisabled", p.isDisabled || p.loading]])}\n${classAttr}\n${styleAttr}\n      >\n${inner}\n      </Button>`,
    };
  },
  "toggle-button": (component, item, ctx) => {
    if (component === "ToggleButtonGroup") {
      return buildComponentCode("ToggleButtonGroup", item, ctx);
    }
    const p = item.props;
    const { classAttr, styleAttr } = codeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);
    return {
      hero: ["ToggleButton"],
      jsx: `<ToggleButton\n${attrs([["variant", p.variant], ["size", p.size], ["defaultSelected", p.selected], ["isDisabled", p.isDisabled]])}\n${classAttr}\n${styleAttr}\n      >\n        ${p.label}\n      </ToggleButton>`,
    };
  },
  switch: (component, item, ctx) => {
    if (component === "SwitchGroup") {
      return buildComponentCode("SwitchGroup", item, ctx);
    }
    const p = item.props;
    const { classAttr, styleAttr } = codeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);
    return {
      hero: ["Switch"],
      jsx:
        `<Switch\n${attrs([["size", p.size], ["defaultSelected", p.selected], ["isDisabled", p.isDisabled]])}\n${classAttr}\n${styleAttr}\n      >\n` +
        `        <Switch.Content>\n` +
        `          <Switch.Control>\n` +
        `            <Switch.Thumb />\n` +
        `          </Switch.Control>\n` +
        `          ${p.label}\n` +
        `        </Switch.Content>\n` +
        `      </Switch>`,
    };
  },
  checkbox: (component, item, ctx) => {
    if (component === "CheckboxGroup") {
      return buildComponentCode("CheckboxGroup", item, ctx);
    }
    const p = item.props;
    const { classAttr, styleAttr } = codeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);
    return {
      hero: ["Checkbox"],
      jsx:
        `<Checkbox\n${attrs([["variant", p.variant], ["defaultSelected", p.selected], ["isDisabled", p.isDisabled]])}\n${classAttr}\n${styleAttr}\n      >\n` +
        `        <Checkbox.Content>\n` +
        `          <Checkbox.Control>\n` +
        `            <Checkbox.Indicator />\n` +
        `          </Checkbox.Control>\n` +
        `          ${p.label}\n` +
        `        </Checkbox.Content>\n` +
        `      </Checkbox>`,
    };
  },
  "radio-group": (_c, item, ctx) => {
    const p = item.props;
    const { classAttr, styleAttr } = codeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);
    return {
      hero: ["RadioGroup", "Label", "Radio"],
      jsx:
        `<RadioGroup\n${attrs([["variant", p.variant], ["defaultValue", "week"], ["aria-label", "Billing period"]])}\n${classAttr}\n${styleAttr}\n      >\n` +
        `        <Label>Billing period</Label>\n` +
        `        <Radio value="day">\n` +
        `          <Radio.Content>\n` +
        `            <Radio.Control>\n` +
        `              <Radio.Indicator />\n` +
        `            </Radio.Control>\n` +
        `            Daily\n` +
        `          </Radio.Content>\n` +
        `        </Radio>\n` +
        `        <Radio value="week">\n` +
        `          <Radio.Content>\n` +
        `            <Radio.Control>\n` +
        `              <Radio.Indicator />\n` +
        `            </Radio.Control>\n` +
        `            Weekly\n` +
        `          </Radio.Content>\n` +
        `        </Radio>\n` +
        `        <Radio value="month">\n` +
        `          <Radio.Content>\n` +
        `            <Radio.Control>\n` +
        `              <Radio.Indicator />\n` +
        `            </Radio.Control>\n` +
        `            Monthly\n` +
        `          </Radio.Content>\n` +
        `        </Radio>\n` +
        `      </RadioGroup>`,
    };
  },
  chip: (_c, item, ctx) => {
    const p = item.props;
    const { classAttr, styleAttr } = codeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);
    return {
      hero: ["Chip"],
      jsx: `<Chip\n${attrs([["variant", p.variant], ["color", p.color], ["size", p.size]])}\n${classAttr}\n${styleAttr}\n      >\n        ${p.label}\n      </Chip>`,
    };
  },
  avatar: (_c, item, ctx) => {
    const p = item.props;
    const { classAttr, styleAttr } = intrinsicCodeCtx(
      ctx.customization,
      ctx.motionOptions,
      ctx.visibility,
    );
    const imageLine = p.src
      ? `        <Avatar.Image src="${p.src}" alt="${p.alt ?? p.label ?? ""}" />\n`
      : "";
    return {
      hero: ["Avatar"],
      jsx:
        `<Avatar\n${attrs([["variant", p.variant], ["color", p.color], ["size", p.size]])}\n${classAttr}\n${styleAttr}\n      >\n` +
        imageLine +
        `        <Avatar.Fallback>${p.label}</Avatar.Fallback>\n      </Avatar>`,
    };
  },
  kbd: (_c, item, ctx) => {
    const p = item.props;
    const { classAttr, styleAttr } = intrinsicCodeCtx(
      ctx.customization,
      ctx.motionOptions,
      ctx.visibility,
    );
    return {
      hero: ["Kbd"],
      jsx: `<Kbd\n${attrs([["variant", p.variant]])}\n${classAttr}\n${styleAttr}\n      >\n        ${p.label}\n      </Kbd>`,
    };
  },
  alert: (_c, item, ctx) => {
    const p = item.props;
    const { classAttr, styleAttr } = codeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);
    return {
      hero: ["Alert"],
      jsx:
        `<Alert\n${attrs([["status", p.status]])}\n${classAttr}\n${styleAttr}\n      >\n` +
        `        <Alert.Indicator />\n` +
        `        <Alert.Content>\n` +
        `          <Alert.Title>${p.label}</Alert.Title>\n` +
        `          <Alert.Description>\n` +
        `            Here is some additional context about this message.\n` +
        `          </Alert.Description>\n` +
        `        </Alert.Content>\n` +
        `      </Alert>`,
    };
  },
  spinner: (_c, item, ctx) => {
    const p = item.props;
    const { classAttr, styleAttr } = intrinsicCodeCtx(
      ctx.customization,
      ctx.motionOptions,
      ctx.visibility,
    );
    return {
      hero: ["Spinner"],
      jsx: `<Spinner\n${attrs([["size", p.size], ["color", p.color]])}\n${classAttr}\n${styleAttr}\n      />`,
    };
  },
  "progress-circle": (component, item, ctx) => {
    if (component === "ProgressBar") {
      return buildComponentCode("ProgressBar", item, ctx);
    }
    const p = item.props;
    const { classAttr, styleAttr } = intrinsicCodeCtx(
      ctx.customization,
      ctx.motionOptions,
      ctx.visibility,
    );
    return {
      hero: ["ProgressCircle"],
      jsx:
        `<ProgressCircle\n${attrs([["value", p.value], ["size", p.size], ["color", p.color], ["aria-label", `${p.value ?? 0}% complete`]])}\n${classAttr}\n${styleAttr}\n      >\n` +
        `        <ProgressCircle.Track>\n` +
        `          <ProgressCircle.TrackCircle />\n` +
        `          <ProgressCircle.FillCircle />\n` +
        `        </ProgressCircle.Track>\n` +
        `      </ProgressCircle>`,
    };
  },
  separator: (_c, item, ctx) => {
    const p = item.props;
    const { classAttr, styleAttr } = intrinsicCodeCtx(
      ctx.customization,
      ctx.motionOptions,
      ctx.visibility,
    );
    return {
      hero: ["Separator"],
      jsx: `<Separator\n${attrs([["variant", p.variant]])}\n${classAttr}\n${styleAttr}\n      />`,
    };
  },
  skeleton: (_c, item, ctx) => {
    const p = item.props;
    const { styleAttr } = codeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);
    const className = ctx.className;
    return {
      hero: ["Skeleton"],
      jsx: `<Skeleton\n${attrs([["animationType", p.animationType]])}\n        className="h-4 w-full rounded-md ${className}"\n${styleAttr}\n      />`,
    };
  },
  card: (_c, item, ctx) => {
    const p = item.props;
    const { styleAttr } = codeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);
    const className = ctx.className;
    return {
      hero: ["Card"],
      jsx: `<Card\n${attrs([["variant", p.variant]])}\n        className="w-72 ${className}"\n${styleAttr}\n      >\n        <Card.Header>\n          <Card.Title>Project settings</Card.Title>\n          <Card.Description>Manage your team and preferences.</Card.Description>\n        </Card.Header>\n        <Card.Content>\n          Cards group related content and actions on a single surface.\n        </Card.Content>\n      </Card>`,
    };
  },
  link: (_c, item, ctx) => {
    const p = item.props;
    const { classAttr, styleAttr } = codeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);
    if (p.icon) {
      const iconImport = PREVIEW_ICON_IMPORT[p.icon];
      return {
        hero: ["Link"],
        icons: [iconImport],
        jsx: `<Link\n        href="#"\n${classAttr}\n${styleAttr}\n      >\n        ${p.label}\n        <HugeiconsIcon icon={${iconImport}} className="ml-1 inline size-3.5" />\n      </Link>`,
      };
    }
    return {
      hero: ["Link"],
      jsx: `<Link\n        href="#"\n${classAttr}\n${styleAttr}\n      >\n        ${p.label}\n      </Link>`,
    };
  },
};
