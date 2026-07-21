/**
 * Preview data for the original 15 HeroUI families.
 */
import { KIT_NAME } from '../registry-constants';
import type {
  ComponentFamily,
  FamilyTab,
  PreviewGroup,
  PreviewItem,
  PreviewProps,
} from "../types";
import { g, it, makeFamily, familyTab, COLORS_SOFT } from './_builders';

/** Official HeroUI doc avatar assets — stable CDN URLs for image previews. */
const AVATAR_IMG = {
  john: "https://img.heroui.chat/image/avatar?w=400&h=400&u=3",
  blue: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
} as const;

const AVATAR_COLOR_INITIALS: Record<string, string> = {
  default: "DF",
  accent: "AC",
  success: "SU",
  warning: "WA",
  danger: "DA",
};

const BUTTON_VARIANTS = [
  { id: "primary", label: "Primary" },
  { id: "secondary", label: "Secondary" },
  { id: "tertiary", label: "Tertiary" },
  { id: "outline", label: "Outline" },
  { id: "ghost", label: "Ghost" },
  { id: "danger", label: "Danger" },
  { id: "danger-soft", label: "Danger soft" },
] as const;

const buttonFamily: ComponentFamily = {
  id: "button",
  name: "Button",
  description:
    "Primary actions like save, submit, and confirm — seven variants and three sizes.",
  install: `npx ${KIT_NAME} add button`,
  githubPath: "components/registry/button/Button.tsx",
  tabs: [
    {
      id: "button",
      label: "Button",
      component: "Button",
      groups: [
        {
          id: "variants",
          label: "Variants",
          layout: "row",
          items: BUTTON_VARIANTS.map((v) => ({
            id: `variant-${v.id}`,
            label: v.label,
            props: { variant: v.id, label: v.label },
          })),
        },
        {
          id: "sizes",
          label: "Sizes",
          layout: "row",
          items: [
            { id: "size-sm", label: "Small", props: { variant: "primary", size: "sm", label: "Small" } },
            { id: "size-md", label: "Medium", props: { variant: "primary", size: "md", label: "Medium" } },
            { id: "size-lg", label: "Large", props: { variant: "primary", size: "lg", label: "Large" } },
          ],
        },
        {
          id: "states",
          label: "States",
          layout: "row",
          items: [
            { id: "state-default", label: "Default", props: { variant: "primary", label: "Default" } },
            { id: "state-disabled", label: "Disabled", props: { variant: "primary", isDisabled: true, label: "Disabled" } },
            { id: "state-loading", label: "Loading", props: { variant: "primary", loading: true, label: "Loading" } },
          ],
        },
      ],
    },
    {
      id: "button-group",
      label: "Button Group",
      component: "ButtonGroup",
      groups: [
        {
          id: "variants",
          label: "Variants",
          layout: "grid",
          items: [
            { id: "group-primary", label: "Primary", props: { variant: "primary" } },
            { id: "group-secondary", label: "Secondary", props: { variant: "secondary" } },
            { id: "group-outline", label: "Outline", props: { variant: "outline" } },
            { id: "group-ghost", label: "Ghost", props: { variant: "ghost" } },
          ],
        },
        {
          id: "sizes",
          label: "Sizes",
          layout: "grid",
          items: [
            { id: "group-sm", label: "Small", props: { variant: "outline", size: "sm" } },
            { id: "group-md", label: "Medium", props: { variant: "outline", size: "md" } },
            { id: "group-lg", label: "Large", props: { variant: "outline", size: "lg" } },
          ],
        },
      ],
    },
    {
      id: "icon-button",
      label: "Icon Button",
      component: "Button",
      iconOnly: true,
      groups: [
        {
          id: "variants",
          label: "Variants",
          layout: "row",
          items: BUTTON_VARIANTS.map((v, i) => ({
            id: `icon-${v.id}`,
            label: v.label,
            props: {
              variant: v.id,
              isIconOnly: true,
              icon: (["plus", "heart", "search", "settings", "bell", "trash", "check"] as const)[i],
            },
          })),
        },
        {
          id: "sizes",
          label: "Sizes",
          layout: "row",
          items: [
            { id: "icon-sm", label: "Small", props: { variant: "secondary", isIconOnly: true, size: "sm", icon: "settings" } },
            { id: "icon-md", label: "Medium", props: { variant: "secondary", isIconOnly: true, size: "md", icon: "settings" } },
            { id: "icon-lg", label: "Large", props: { variant: "secondary", isIconOnly: true, size: "lg", icon: "settings" } },
          ],
        },
      ],
    },
  ],
};

const toggleButtonFamily: ComponentFamily = {
  id: "toggle-button",
  name: "Toggle Button",
  description:
    "Toggle filters, formatting, or view modes with clear on/off selected state.",
  install: `npx ${KIT_NAME} add toggle-button`,
  githubPath: "components/registry/toggle-button/ToggleButton.tsx",
  tabs: [
    familyTab("toggle-button", "Toggle Button", "ToggleButton", [
      g("variants", "Variants", [
        it("tb-default", "Default", { variant: "default", label: "Bold" }),
        it("tb-ghost", "Ghost", { variant: "ghost", label: "Bold" }),
      ]),
      g("sizes", "Sizes", [
        it("tb-sm", "Small", { variant: "default", size: "sm", label: "Small" }),
        it("tb-md", "Medium", { variant: "default", size: "md", label: "Medium" }),
        it("tb-lg", "Large", { variant: "default", size: "lg", label: "Large" }),
      ]),
      g("states", "States", [
        it("tb-off", "Default", { variant: "default", label: "Toggle" }),
        it("tb-on", "Selected", { variant: "default", selected: true, label: "Toggle" }),
        it("tb-disabled", "Disabled", { variant: "default", isDisabled: true, label: "Toggle" }),
      ]),
    ]),
    familyTab("toggle-button-group", "Toggle Button Group", "ToggleButtonGroup", [
      g("variants", "Variants", [
        it("tbg-default", "Default", { variant: "default", size: "md" }),
        it("tbg-ghost", "Ghost", { variant: "ghost", size: "md" }),
      ]),
      g("sizes", "Sizes", [
        it("tbg-sm", "Small", { variant: "default", size: "sm" }),
        it("tbg-md", "Medium", { variant: "default", size: "md" }),
        it("tbg-lg", "Large", { variant: "default", size: "lg" }),
      ]),
    ]),
  ],
};

const switchFamily: ComponentFamily = {
  id: "switch",
  name: "Switch",
  description: "Turn settings like notifications or dark mode on or off at a glance.",
  install: `npx ${KIT_NAME} add switch`,
  githubPath: "components/registry/switch/Switch.tsx",
  tabs: [
    familyTab("switch", "Switch", "Switch", [
      g("states", "States", [
        it("sw-off", "Off", { label: "Wi-Fi" }),
        it("sw-on", "On", { selected: true, label: "Wi-Fi" }),
        it("sw-disabled", "Disabled", { isDisabled: true, label: "Wi-Fi" }),
      ]),
      g("sizes", "Sizes", [
        it("sw-sm", "Small", { size: "sm", selected: true, label: "Small" }),
        it("sw-md", "Medium", { size: "md", selected: true, label: "Medium" }),
        it("sw-lg", "Large", { size: "lg", selected: true, label: "Large" }),
      ]),
    ]),
    familyTab("switch-group", "Switch Group", "SwitchGroup", [
      g("examples", "Examples", [
        it("sg-default", "Default", { label: "Notifications" }),
      ]),
    ]),
  ],
};

const checkboxFamily: ComponentFamily = {
  id: "checkbox",
  name: "Checkbox",
  description: "Select one or more options, individually or as a labeled group.",
  install: `npx ${KIT_NAME} add checkbox`,
  githubPath: "components/registry/checkbox/Checkbox.tsx",
  tabs: [
    familyTab("checkbox", "Checkbox", "Checkbox", [
      g("variants", "Variants", [
        it("cb-primary", "Primary", { variant: "primary", selected: true, label: "Accept terms" }),
        it("cb-secondary", "Secondary", { variant: "secondary", selected: true, label: "Subscribe" }),
      ]),
      g("states", "States", [
        it("cb-unchecked", "Unchecked", { variant: "primary", label: "Option" }),
        it("cb-checked", "Checked", { variant: "primary", selected: true, label: "Option" }),
        it("cb-disabled", "Disabled", { variant: "primary", isDisabled: true, label: "Option" }),
      ]),
    ]),
    familyTab("checkbox-group", "Checkbox Group", "CheckboxGroup", [
      g("variants", "Variants", [
        it("cg-primary", "Primary", { variant: "primary", label: "Preferences" }),
        it("cg-secondary", "Secondary", { variant: "secondary", label: "Preferences" }),
      ]),
    ]),
  ],
};

const progressFamily: ComponentFamily = {
  id: "progress-circle",
  name: "Progress",
  description: "Track task, upload, or install progress as a ring or horizontal bar.",
  install: `npx ${KIT_NAME} add progress-circle`,
  githubPath: "components/registry/progress-circle/ProgressCircle.tsx",
  tabs: [
    familyTab("progress-circle", "Progress Circle", "ProgressCircle", [
      g("values", "Values", [
        it("pc-25", "25%", { value: 25 }),
        it("pc-50", "50%", { value: 50 }),
        it("pc-75", "75%", { value: 75 }),
        it("pc-100", "100%", { value: 100 }),
      ]),
      g("sizes", "Sizes", [
        it("pc-sm", "Small", { size: "sm", value: 60 }),
        it("pc-md", "Medium", { size: "md", value: 60 }),
        it("pc-lg", "Large", { size: "lg", value: 60 }),
      ]),
    ]),
    familyTab("progress-bar", "Progress Bar", "ProgressBar", [
      g("values", "Values", [
        it("pb-25", "25%", { value: 25 }),
        it("pb-50", "50%", { value: 50 }),
        it("pb-75", "75%", { value: 75 }),
      ]),
      g("colors", "Colors", [
        it("pb-accent", "Accent", { color: "accent", value: 60 }),
        it("pb-success", "Success", { color: "success", value: 60 }),
        it("pb-warning", "Warning", { color: "warning", value: 60 }),
        it("pb-danger", "Danger", { color: "danger", value: 60 }),
        it("pb-default", "Default", { color: "default", value: 60 }),
      ]),
      g("sizes", "Sizes", [
        it("pb-size-sm", "Small", { size: "sm", value: 60 }),
        it("pb-size-md", "Medium", { size: "md", value: 60 }),
        it("pb-size-lg", "Large", { size: "lg", value: 60 }),
      ]),
    ]),
  ],
};

const extraFamilies: ComponentFamily[] = [
  toggleButtonFamily,
  switchFamily,
  checkboxFamily,
  makeFamily({
    id: "radio-group",
    name: "Radio Group",
    component: "RadioGroup",
    description: "Pick exactly one option from a short list, like plan or payment type.",
    groups: [
      g(
        "variants",
        "Variants",
        [
          it("rg-primary", "Primary", { variant: "primary" }),
          it("rg-secondary", "Secondary", { variant: "secondary" }),
        ],
        "grid",
      ),
    ],
  }),
  makeFamily({
    id: "chip",
    name: "Chip",
    component: "Chip",
    description: "Tag items with status, category, or filters in a compact pill.",
    groups: [
      g("variants", "Variants", [
        it("ch-primary", "Primary", { variant: "primary", label: "Primary" }),
        it("ch-secondary", "Secondary", { variant: "secondary", label: "Secondary" }),
        it("ch-soft", "Soft", { variant: "soft", label: "Soft" }),
        it("ch-tertiary", "Tertiary", { variant: "tertiary", label: "Tertiary" }),
      ]),
      g("colors", "Colors", [
        it("ch-accent", "Accent", { variant: "soft", color: "accent", label: "Accent" }),
        it("ch-success", "Success", { variant: "soft", color: "success", label: "Success" }),
        it("ch-warning", "Warning", { variant: "soft", color: "warning", label: "Warning" }),
        it("ch-danger", "Danger", { variant: "soft", color: "danger", label: "Danger" }),
        it("ch-default", "Default", { variant: "soft", color: "default", label: "Default" }),
      ]),
      g("sizes", "Sizes", [
        it("ch-sm", "Small", { size: "sm", label: "Small" }),
        it("ch-md", "Medium", { size: "md", label: "Medium" }),
        it("ch-lg", "Large", { size: "lg", label: "Large" }),
      ]),
    ],
  }),
  makeFamily({
    id: "avatar",
    name: "Avatar",
    component: "Avatar",
    description: "Represent people or teams with a photo, initials, or colored fallback.",
    groups: [
      g("basic", "Basic", [
        it("av-photo", "Photo", {
          src: AVATAR_IMG.john,
          alt: "John Doe",
          label: "JD",
        }),
        it("av-photo-soft", "Photo (soft)", {
          variant: "soft",
          src: AVATAR_IMG.blue,
          alt: "Blue",
          label: "B",
        }),
        it("av-fallback", "Fallback", { label: "JR" }),
      ]),
      g("variants", "Variants", [
        it("av-var-default", "Default", { variant: "default", label: "DF" }),
        it("av-var-soft", "Soft", { variant: "soft", label: "SF" }),
      ]),
      g(
        "colors",
        "Colors",
        COLORS_SOFT.map((c) =>
          it(`av-c-${c.id}`, c.label, {
            variant: "soft",
            color: c.id,
            label: AVATAR_COLOR_INITIALS[c.id],
          }),
        ),
      ),
      g("sizes", "Sizes", [
        it("av-s-sm", "Small", {
          size: "sm",
          src: AVATAR_IMG.john,
          alt: "John Doe",
          label: "JD",
        }),
        it("av-s-md", "Medium", {
          size: "md",
          src: AVATAR_IMG.john,
          alt: "John Doe",
          label: "JD",
        }),
        it("av-s-lg", "Large", {
          size: "lg",
          src: AVATAR_IMG.john,
          alt: "John Doe",
          label: "JD",
        }),
      ]),
      g("sizes-fallback", "Sizes (fallback)", [
        it("av-fs-sm", "Small", { size: "sm", variant: "soft", color: "accent", label: "S" }),
        it("av-fs-md", "Medium", { size: "md", variant: "soft", color: "accent", label: "M" }),
        it("av-fs-lg", "Large", { size: "lg", variant: "soft", color: "accent", label: "L" }),
      ]),
    ],
  }),
  makeFamily({
    id: "kbd",
    name: "Keyboard Key",
    component: "Kbd",
    description: "Displays a keyboard key or shortcut inline with text.",
    groups: [
      g("variants", "Variants", [
        it("kb-default", "Default", { variant: "default", label: "⌘ K" }),
        it("kb-light", "Light", { variant: "light", label: "⌘ K" }),
      ]),
    ],
  }),
  makeFamily({
    id: "alert",
    name: "Alert",
    component: "Alert",
    description: "Surface success, warnings, or errors inline without blocking the page.",
    groups: [
      g(
        "statuses",
        "Statuses",
        [
          it("al-accent", "Accent", { status: "accent", label: "Heads up" }),
          it("al-success", "Success", { status: "success", label: "Payment received" }),
          it("al-warning", "Warning", { status: "warning", label: "Storage almost full" }),
          it("al-danger", "Danger", { status: "danger", label: "Something went wrong" }),
          it("al-default", "Default", { status: "default", label: "A quick note" }),
        ],
        "grid",
      ),
    ],
  }),
  makeFamily({
    id: "spinner",
    name: "Spinner",
    component: "Spinner",
    description: "Signal that content or an action is still loading.",
    groups: [
      g("sizes", "Sizes", [
        it("sp-sm", "Small", { size: "sm" }),
        it("sp-md", "Medium", { size: "md" }),
        it("sp-lg", "Large", { size: "lg" }),
        it("sp-xl", "XL", { size: "xl" }),
      ]),
      g("colors", "Colors", [
        it("sp-accent", "Accent", { color: "accent" }),
        it("sp-success", "Success", { color: "success" }),
        it("sp-warning", "Warning", { color: "warning" }),
        it("sp-danger", "Danger", { color: "danger" }),
      ]),
    ],
  }),
  progressFamily,
  makeFamily({
    id: "separator",
    name: "Separator",
    component: "Separator",
    description: "A visual divider between content or groups.",
    groups: [
      g(
        "variants",
        "Variants",
        [
          it("se-default", "Default", { variant: "default" }),
          it("se-secondary", "Secondary", { variant: "secondary" }),
          it("se-tertiary", "Tertiary", { variant: "tertiary" }),
        ],
        "grid",
      ),
    ],
  }),
  makeFamily({
    id: "skeleton",
    name: "Skeleton",
    component: "Skeleton",
    description: "A placeholder preview shown while content is loading.",
    groups: [
      g(
        "animations",
        "Animations",
        [
          it("sk-pulse", "Pulse", { animationType: "pulse" }),
          it("sk-shimmer", "Shimmer", { animationType: "shimmer" }),
          it("sk-none", "None", { animationType: "none" }),
        ],
        "grid",
      ),
    ],
  }),
  makeFamily({
    id: "card",
    name: "Card",
    component: "Card",
    description: "Group related content, media, and actions in a scannable block.",
    groups: [
      g(
        "variants",
        "Variants",
        [
          it("ca-default", "Default", { variant: "default" }),
          it("ca-secondary", "Secondary", { variant: "secondary" }),
          it("ca-tertiary", "Tertiary", { variant: "tertiary" }),
        ],
        "grid",
      ),
    ],
  }),
  makeFamily({
    id: "link",
    name: "Link",
    component: "Link",
    description: "Navigate to pages, docs, or external URLs with accessible focus styles.",
    groups: [
      g("examples", "Examples", [
        it("lk-default", "Default", { label: "View documentation" }),
        it("lk-arrow", "With icon", { label: "Learn more", icon: "arrow-right" }),
      ]),
    ],
  }),
];



export const EXISTING_FAMILY_DEFINITIONS: ComponentFamily[] = [
  buttonFamily,
  ...extraFamilies,
];
