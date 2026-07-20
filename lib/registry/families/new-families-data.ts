/**
 * Preview data for HeroUI v3 families not yet in the core registry.
 * Plain data only — no JSX.
 */

import { KIT_NAME } from "../registry-constants";
import {
  COLORS_SOFT,
  SIZES_SM_MD_LG,
  VARIANT_PRIMARY_SECONDARY,
  g,
  it,
  makeFamily,
  familyTab,
} from "./_builders";

export const NEW_FAMILY_DEFINITIONS = [
  makeFamily({
    id: "close-button",
    name: "Close Button",
    component: "CloseButton",
    description: "A compact dismiss control for overlays, toasts, and panels.",
    groups: [
      g("examples", "Examples", [
        it("cb-default", "Default", {}),
      ]),
    ],
  }),

  /* ------------------------------------------------------------------ *
   * Inputs
   * ------------------------------------------------------------------ */
  {
    id: "input",
    name: "Input",
    description:
      "Single-line text inputs and grouped inputs with prefix or suffix adornments.",
    install: `npx ${KIT_NAME} add input`,
    githubPath: "components/registry/input/Input.tsx",
    tabs: [
      familyTab("input", "Input", "TextField", [
        g("variants", "Variants", [
          it("in-primary", "Primary", { variant: "primary", label: "Email" }),
          it("in-secondary", "Secondary", { variant: "secondary", label: "Email" }),
        ]),
        g("states", "States", [
          it("in-default", "Default", { variant: "primary", label: "Username" }),
          it("in-disabled", "Disabled", { variant: "primary", label: "Username", isDisabled: true }),
        ]),
      ]),
      familyTab("input-group", "Input Group", "InputGroup", [
        g("variants", "Variants", [
          it("ig-primary", "Primary", { variant: "primary", label: "example.com" }),
          it("ig-secondary", "Secondary", { variant: "secondary", label: "example.com" }),
        ]),
        g("states", "States", [
          it("ig-default", "Default", { variant: "primary", label: "example.com" }),
          it("ig-disabled", "Disabled", { variant: "primary", label: "example.com", isDisabled: true }),
        ]),
      ]),
    ],
  },
  makeFamily({
    id: "textarea",
    name: "Textarea",
    component: "TextArea",
    description: "A multi-line text input for longer free-form content.",
    groups: [
      g("variants", "Variants", [
        it("ta-primary", "Primary", { variant: "primary", label: "Message" }),
        it("ta-secondary", "Secondary", { variant: "secondary", label: "Message" }),
      ]),
      g("states", "States", [
        it("ta-default", "Default", { variant: "primary", label: "Notes" }),
        it("ta-disabled", "Disabled", { variant: "primary", label: "Notes", isDisabled: true }),
      ]),
    ],
  }),
  makeFamily({
    id: "number-field",
    name: "Number Field",
    component: "NumberField",
    description: "A numeric input with increment and decrement controls.",
    groups: [
      g("variants", "Variants", [
        it("nf-primary", "Primary", { variant: "primary", label: "Quantity" }),
        it("nf-secondary", "Secondary", { variant: "secondary", label: "Quantity" }),
      ]),
      g("states", "States", [
        it("nf-default", "Default", { variant: "primary", label: "Guests", value: 2 }),
        it("nf-disabled", "Disabled", { variant: "primary", label: "Guests", isDisabled: true }),
      ]),
    ],
  }),
  makeFamily({
    id: "search-field",
    name: "Search Field",
    component: "SearchField",
    description: "A search input with a built-in search icon and clear button.",
    groups: [
      g("variants", "Variants", [
        it("sf-primary", "Primary", { variant: "primary", label: "Search" }),
        it("sf-secondary", "Secondary", { variant: "secondary", label: "Search" }),
      ]),
      g("states", "States", [
        it("sf-default", "Default", { variant: "primary", label: "Search docs" }),
        it("sf-disabled", "Disabled", { variant: "primary", label: "Search docs", isDisabled: true }),
      ]),
    ],
  }),
  makeFamily({
    id: "input-otp",
    name: "OTP Input",
    component: "InputOTP",
    description: "A one-time password input with grouped character slots.",
    groups: [
      g("variants", "Variants", [
        it("otp-primary", "Primary", { variant: "primary" }),
        it("otp-secondary", "Secondary", { variant: "secondary" }),
      ]),
      g("states", "States", [
        it("otp-default", "Default", { variant: "primary" }),
        it("otp-disabled", "Disabled", { variant: "primary", isDisabled: true }),
      ]),
    ],
  }),

  /* ------------------------------------------------------------------ *
   * Forms
   * ------------------------------------------------------------------ */
  makeFamily({
    id: "select",
    name: "Select",
    component: "Select",
    description: "A dropdown for choosing a single value from a list.",
    groups: [
      g("variants", "Variants", [
        it("sl-primary", "Primary", { variant: "primary", label: "Country" }),
        it("sl-secondary", "Secondary", { variant: "secondary", label: "Country" }),
      ]),
      g("states", "States", [
        it("sl-default", "Default", { variant: "primary", label: "Country" }),
        it("sl-disabled", "Disabled", { variant: "primary", label: "Country", isDisabled: true }),
      ]),
    ],
  }),
  makeFamily({
    id: "combo-box",
    name: "Combobox",
    component: "ComboBox",
    description: "A text input combined with a filterable list of suggestions.",
    groups: [
      g("examples", "Examples", [
        it("cb-default", "Default", { label: "Fruit" }),
        it("cb-disabled", "Disabled", { label: "Fruit", isDisabled: true }),
      ]),
    ],
  }),
  makeFamily({
    id: "autocomplete",
    name: "Autocomplete",
    component: "Autocomplete",
    description: "A searchable select with typeahead filtering.",
    groups: [
      g("variants", "Variants", [
        it("ac-primary", "Primary", { variant: "primary", label: "City" }),
        it("ac-secondary", "Secondary", { variant: "secondary", label: "City" }),
      ]),
      g("states", "States", [
        it("ac-default", "Default", { variant: "primary", label: "City" }),
        it("ac-disabled", "Disabled", { variant: "primary", label: "City", isDisabled: true }),
      ]),
    ],
  }),
  makeFamily({
    id: "slider",
    name: "Slider",
    component: "Slider",
    description: "A control for selecting a value from a continuous range.",
    groups: [
      g("values", "Values", [
        it("sl-25", "25%", { value: 25 }),
        it("sl-50", "50%", { value: 50 }),
        it("sl-75", "75%", { value: 75 }),
      ]),
      g("orientation", "Orientation", [
        it("sl-h", "Horizontal", { orientation: "horizontal", value: 40 }),
        it("sl-v", "Vertical", { orientation: "vertical", value: 40 }),
      ]),
    ],
  }),
  makeFamily({
    id: "date-picker",
    name: "Date Picker",
    component: "DatePicker",
    description: "A date input with a popover calendar for picking dates.",
    groups: [
      g("examples", "Examples", [
        it("dp-default", "Default", { label: "Start date" }),
        it("dp-disabled", "Disabled", { label: "Start date", isDisabled: true }),
      ]),
    ],
  }),
  {
    id: "date-field",
    name: "Date Field",
    description: "Segmented date input fields for day, month, and year.",
    install: `npx ${KIT_NAME} add date-field`,
    githubPath: "components/registry/date-field/DateField.tsx",
    tabs: [
      familyTab("date-field", "Date Field", "DateField", [
        g("examples", "Examples", [
          it("df-default", "Default", { label: "Birth date" }),
          it("df-disabled", "Disabled", { label: "Birth date", isDisabled: true }),
        ]),
      ]),
      familyTab("date-input-group", "Date Input Group", "DateInputGroup", [
        g("variants", "Variants", [
          it("dig-primary", "Primary", { variant: "primary", label: "Birth date" }),
          it("dig-secondary", "Secondary", { variant: "secondary", label: "Birth date" }),
        ]),
        g("states", "States", [
          it("dig-default", "Default", { variant: "primary", label: "Birth date" }),
          it("dig-disabled", "Disabled", { variant: "primary", label: "Birth date", isDisabled: true }),
        ]),
      ]),
    ],
  },
  makeFamily({
    id: "time-field",
    name: "Time Field",
    component: "TimeField",
    description: "Segmented time input for hours and minutes.",
    groups: [
      g("examples", "Examples", [
        it("tf-default", "Default", { label: "Meeting time" }),
        it("tf-disabled", "Disabled", { label: "Meeting time", isDisabled: true }),
      ]),
    ],
  }),
  {
    id: "calendar",
    name: "Calendar",
    description: "A grid calendar for selecting a single date or date range.",
    install: `npx ${KIT_NAME} add calendar`,
    githubPath: "components/registry/calendar/Calendar.tsx",
    tabs: [
      familyTab("calendar", "Calendar", "Calendar", [
        g("examples", "Examples", [
          it("cal-default", "Default", { label: "Appointment" }),
        ]),
      ]),
      familyTab("range-calendar", "Range Calendar", "RangeCalendar", [
        g("examples", "Examples", [
          it("rc-default", "Default", { label: "Trip dates" }),
        ]),
      ]),
    ],
  },
  {
    id: "color",
    name: "Color",
    description:
      "Color pickers, fields, and swatch palettes for selecting and editing colors.",
    install: `npx ${KIT_NAME} add color-picker`,
    githubPath: "components/registry/color-picker/ColorPicker.tsx",
    tabs: [
      familyTab("color-picker", "Color Picker", "ColorPicker", [
        g("examples", "Examples", [
          it("cp-default", "Default", { label: "Brand color" }),
          it("cp-disabled", "Disabled", { label: "Brand color", isDisabled: true }),
        ]),
      ]),
      familyTab("color-field", "Color Field", "ColorField", [
        g("variants", "Variants", [
          it("cf-primary", "Primary", { variant: "primary", label: "Brand color" }),
          it("cf-secondary", "Secondary", { variant: "secondary", label: "Brand color" }),
        ]),
        g("states", "States", [
          it("cf-default", "Default", { variant: "primary", label: "Brand color" }),
          it("cf-disabled", "Disabled", { variant: "primary", label: "Brand color", isDisabled: true }),
        ]),
      ]),
      familyTab("color-input-group", "Color Input Group", "ColorInputGroup", [
        g("variants", "Variants", [
          it("cig-primary", "Primary", { variant: "primary", label: "Brand color" }),
          it("cig-secondary", "Secondary", { variant: "secondary", label: "Brand color" }),
        ]),
        g("states", "States", [
          it("cig-default", "Default", { variant: "primary", label: "Brand color" }),
          it("cig-disabled", "Disabled", { variant: "primary", label: "Brand color", isDisabled: true }),
        ]),
      ]),
      familyTab("color-swatch-picker", "Swatch Picker", "ColorSwatchPicker", [
        g("layout", "Layout", [
          it("csp-grid", "Grid", { layout: "grid", size: "md", variant: "circle" }),
          it("csp-stack", "Stack", { layout: "stack", size: "md", variant: "circle" }),
        ]),
        g("sizes", "Sizes", [
          it("csp-sm", "Small", { layout: "grid", size: "sm", variant: "circle" }),
          it("csp-md", "Medium", { layout: "grid", size: "md", variant: "circle" }),
          it("csp-lg", "Large", { layout: "grid", size: "lg", variant: "circle" }),
        ]),
        g("variants", "Shape", [
          it("csp-circle", "Circle", { layout: "grid", size: "md", variant: "circle" }),
          it("csp-square", "Square", { layout: "grid", size: "md", variant: "square" }),
        ]),
      ]),
    ],
  },
  makeFamily({
    id: "date-range-picker",
    name: "Date Range Picker",
    component: "DateRangePicker",
    description:
      "A composable start/end date picker built on DateField and RangeCalendar.",
    groups: [
      g("states", "States", [
        it("drp-default", "Default", { label: "Trip dates" }),
        it("drp-disabled", "Disabled", { label: "Trip dates", isDisabled: true }),
      ]),
    ],
  }),
  makeFamily({
    id: "form",
    name: "Form",
    component: "Form",
    description: "A semantic form wrapper with accessible validation support.",
    groups: [
      g("examples", "Examples", [
        it("fm-default", "Sign in", { label: "Sign in" }),
      ]),
    ],
  }),
  {
    id: "form-primitives",
    name: "Form Primitives",
    description: "Low-level form labels, descriptions, and validation messages.",
    install: `npx ${KIT_NAME} add form-primitives`,
    githubPath: "components/registry/form-primitives/FormPrimitives.tsx",
    tabs: [
      familyTab("label", "Label", "Label", [
        g("examples", "Examples", [
          it("lbl-default", "Required field", { label: "Email address" }),
        ]),
      ]),
      familyTab("description", "Description", "Description", [
        g("examples", "Examples", [
          it("desc-default", "Helper text", { label: "We never share your email." }),
        ]),
      ]),
      familyTab("error-message", "Error Message", "ErrorMessage", [
        g("examples", "Examples", [
          it("em-default", "Form error", { label: "Please fix the errors below." }),
        ]),
      ]),
      familyTab("field-error", "Field Error", "FieldError", [
        g("examples", "Examples", [
          it("fe-default", "Field error", { label: "Enter a valid email address." }),
        ]),
      ]),
      familyTab("header", "Header", "Header", [
        g("examples", "Examples", [
          it("hdr-default", "Section header", { label: "Mammals" }),
        ]),
      ]),
    ],
  },

  /* ------------------------------------------------------------------ *
   * Overlays
   * ------------------------------------------------------------------ */
  makeFamily({
    id: "modal",
    name: "Modal",
    component: "Modal",
    description: "A dialog overlay that focuses attention on a single task.",
    groups: [
      g("sizes", "Sizes", [
        it("mo-sm", "Small", { size: "sm", label: "Open modal" }),
        it("mo-md", "Medium", { size: "md", label: "Open modal" }),
        it("mo-lg", "Large", { size: "lg", label: "Open modal" }),
      ]),
      g("variants", "Backdrop", [
        it("mo-opaque", "Opaque", { variant: "opaque", label: "Open modal" }),
        it("mo-blur", "Blur", { variant: "blur", label: "Open modal" }),
        it("mo-transparent", "Transparent", { variant: "transparent", label: "Open modal" }),
      ]),
    ],
  }),
  makeFamily({
    id: "drawer",
    name: "Drawer",
    component: "Drawer",
    description: "A sliding panel overlay anchored to an edge of the screen.",
    groups: [
      g("placement", "Placement", [
        it("dr-bottom", "Bottom", { orientation: "bottom", label: "Open drawer" }),
        it("dr-right", "Right", { orientation: "right", label: "Open drawer" }),
        it("dr-left", "Left", { orientation: "left", label: "Open drawer" }),
      ]),
      g("variants", "Backdrop", [
        it("dr-opaque", "Opaque", { variant: "opaque", label: "Open drawer" }),
        it("dr-blur", "Blur", { variant: "blur", label: "Open drawer" }),
      ]),
    ],
  }),
  makeFamily({
    id: "popover",
    name: "Popover",
    component: "Popover",
    description: "A floating panel anchored to a trigger element.",
    groups: [
      g("examples", "Examples", [
        it("po-default", "Default", { label: "Open popover" }),
      ]),
    ],
  }),
  makeFamily({
    id: "tooltip",
    name: "Tooltip",
    component: "Tooltip",
    description: "A small overlay with contextual help on hover or focus.",
    groups: [
      g("examples", "Examples", [
        it("tt-default", "Default", { label: "Hover me" }),
      ]),
    ],
  }),
  makeFamily({
    id: "dropdown",
    name: "Dropdown Menu",
    component: "Dropdown",
    description: "A menu triggered by a button, with keyboard navigation.",
    groups: [
      g("examples", "Examples", [
        it("dd-default", "Default", { label: "Actions" }),
      ]),
    ],
  }),
  makeFamily({
    id: "alert-dialog",
    name: "Alert Dialog",
    component: "AlertDialog",
    description: "A modal dialog for critical confirmations and alerts.",
    groups: [
      g(
        "statuses",
        "Statuses",
        [
          it("ad-danger", "Danger", { status: "danger", label: "Delete item" }),
          it("ad-warning", "Warning", { status: "warning", label: "Discard changes" }),
          it("ad-success", "Success", { status: "success", label: "Confirm" }),
          it("ad-accent", "Accent", { status: "accent", label: "Continue" }),
        ],
        "grid",
      ),
      g("sizes", "Sizes", [
        it("ad-sm", "Small", { size: "sm", status: "danger", label: "Delete" }),
        it("ad-md", "Medium", { size: "md", status: "danger", label: "Delete" }),
        it("ad-lg", "Large", { size: "lg", status: "danger", label: "Delete" }),
      ]),
    ],
  }),

  /* ------------------------------------------------------------------ *
   * Navigation
   * ------------------------------------------------------------------ */
  makeFamily({
    id: "tabs",
    name: "Tabs",
    component: "Tabs",
    description: "Organize content into switchable tab panels.",
    groups: [
      g("variants", "Variants", [
        it("tb-primary", "Primary", { variant: "primary" }),
        it("tb-secondary", "Secondary", { variant: "secondary" }),
      ]),
      g("orientation", "Orientation", [
        it("tb-h", "Horizontal", { variant: "primary", orientation: "horizontal" }),
        it("tb-v", "Vertical", { variant: "primary", orientation: "vertical" }),
      ]),
    ],
  }),
  makeFamily({
    id: "breadcrumbs",
    name: "Breadcrumbs",
    component: "Breadcrumbs",
    description: "Shows the current page location within a hierarchy.",
    groups: [
      g("examples", "Examples", [
        it("bc-default", "Default", { label: "Settings" }),
      ]),
    ],
  }),
  makeFamily({
    id: "pagination",
    name: "Pagination",
    component: "Pagination",
    description: "Navigate between pages of content.",
    groups: [
      g("sizes", "Sizes", SIZES_SM_MD_LG.map((s) => ({
        id: `pg-${s.id}`,
        label: s.label,
        props: { size: s.id },
      }))),
    ],
  }),
  makeFamily({
    id: "menu",
    name: "Menu",
    component: "Menu",
    description: "A list of actions or options with keyboard support.",
    groups: [
      g("examples", "Examples", [
        it("mn-default", "Default", { label: "Edit" }),
        it("mn-danger", "Danger item", { variant: "danger", label: "Delete" }),
      ]),
    ],
  }),
  makeFamily({
    id: "toolbar",
    name: "Toolbar",
    component: "Toolbar",
    description: "A container grouping related controls and actions.",
    groups: [
      g("orientation", "Orientation", [
        it("tb-h", "Horizontal", { orientation: "horizontal" }),
        it("tb-v", "Vertical", { orientation: "vertical" }),
      ]),
      g("states", "States", [
        it("tb-detached", "Default", { orientation: "horizontal" }),
        it("tb-attached", "Attached", { orientation: "horizontal", selected: true }),
      ]),
    ],
  }),

  /* ------------------------------------------------------------------ *
   * Data display
   * ------------------------------------------------------------------ */
  makeFamily({
    id: "table",
    name: "Table",
    component: "Table",
    description: "A tabular data grid with scrollable content.",
    groups: [
      g("variants", "Variants", VARIANT_PRIMARY_SECONDARY.map((v) => ({
        id: `tbl-${v.id}`,
        label: v.label,
        props: { variant: v.id },
      }))),
    ],
  }),
  makeFamily({
    id: "badge",
    name: "Badge",
    component: "Badge",
    description: "A small status indicator anchored to another element.",
    groups: [
      g("variants", "Variants", [
        it("bd-primary", "Primary", { variant: "primary", label: "3" }),
        it("bd-secondary", "Secondary", { variant: "secondary", label: "3" }),
        it("bd-soft", "Soft", { variant: "soft", label: "3" }),
      ]),
      g("colors", "Colors", COLORS_SOFT.map((c) => ({
        id: `bd-${c.id}`,
        label: c.label,
        props: { variant: "soft", color: c.id, label: "5" },
      }))),
      g("sizes", "Sizes", SIZES_SM_MD_LG.map((s) => ({
        id: `bd-size-${s.id}`,
        label: s.label,
        props: { size: s.id, label: "9" },
      }))),
    ],
  }),
  makeFamily({
    id: "list-box",
    name: "List Box",
    component: "ListBox",
    description: "A static list of selectable options.",
    groups: [
      g("variants", "Variants", [
        it("lb-default", "Default", { variant: "default" }),
        it("lb-danger", "Danger", { variant: "danger" }),
      ]),
    ],
  }),
  makeFamily({
    id: "tag-group",
    name: "Tag Group",
    component: "TagGroup",
    description: "A group of removable tags for multi-value selections.",
    groups: [
      g("variants", "Variants", [
        it("tg-default", "Default", { variant: "default" }),
        it("tg-surface", "Surface", { variant: "surface" }),
      ]),
      g("sizes", "Sizes", SIZES_SM_MD_LG.map((s) => ({
        id: `tg-${s.id}`,
        label: s.label,
        props: { size: s.id },
      }))),
    ],
  }),
  makeFamily({
    id: "meter",
    name: "Meter",
    component: "Meter",
    description: "Displays a scalar measurement within a known range.",
    groups: [
      g("values", "Values", [
        it("mt-25", "25%", { value: 25 }),
        it("mt-60", "60%", { value: 60 }),
        it("mt-90", "90%", { value: 90 }),
      ]),
      g("colors", "Colors", COLORS_SOFT.map((c) => ({
        id: `mt-${c.id}`,
        label: c.label,
        props: { color: c.id, value: 60 },
      }))),
      g("sizes", "Sizes", SIZES_SM_MD_LG.map((s) => ({
        id: `mt-size-${s.id}`,
        label: s.label,
        props: { size: s.id, value: 60 },
      }))),
    ],
  }),
  makeFamily({
    id: "typography",
    name: "Typography",
    component: "Typography",
    description: "Semantic text styles for headings, body copy, and code.",
    groups: [
      g(
        "types",
        "Types",
        [
          it("ty-h1", "Heading 1", { variant: "h1", label: "Page title" }),
          it("ty-h2", "Heading 2", { variant: "h2", label: "Section title" }),
          it("ty-body", "Body", { variant: "body", label: "Body text for paragraphs." }),
          it("ty-code", "Code", { variant: "code", label: "npm install" }),
        ],
        "grid",
      ),
      g("colors", "Colors", [
        it("ty-default", "Default", { variant: "body", color: "default", label: "Default text" }),
        it("ty-muted", "Muted", { variant: "body", color: "muted", label: "Muted text" }),
      ]),
    ],
  }),

  /* ------------------------------------------------------------------ *
   * Feedback
   * ------------------------------------------------------------------ */
  makeFamily({
    id: "toast",
    name: "Toast",
    component: "Toast",
    description: "Brief, non-blocking notifications triggered imperatively.",
    groups: [
      g("examples", "Examples", [
        it("to-success", "Success", { status: "success", label: "Show success toast" }),
        it("to-danger", "Danger", { status: "danger", label: "Show danger toast" }),
        it("to-warning", "Warning", { status: "warning", label: "Show warning toast" }),
      ]),
      g("placement", "Placement", [
        it("to-bottom", "Bottom", { orientation: "bottom", label: "Show toast" }),
        it("to-top", "Top", { orientation: "top", label: "Show toast" }),
      ]),
    ],
  }),
  makeFamily({
    id: "empty-state",
    name: "Empty State",
    component: "EmptyState",
    description: "Placeholder content when there is nothing to display.",
    groups: [
      g("examples", "Examples", [
        it("es-default", "No results", { label: "No results found" }),
      ]),
    ],
  }),
  makeFamily({
    id: "scroll-shadow",
    name: "Scroll Shadow",
    component: "ScrollShadow",
    description: "Adds fade shadows to scrollable overflow content.",
    groups: [
      g("orientation", "Orientation", [
        it("ss-v", "Vertical", { orientation: "vertical" }),
        it("ss-h", "Horizontal", { orientation: "horizontal" }),
      ]),
    ],
  }),

  /* ------------------------------------------------------------------ *
   * Layout
   * ------------------------------------------------------------------ */
  makeFamily({
    id: "accordion",
    name: "Accordion",
    component: "Accordion",
    description: "A vertically stacked set of expandable sections.",
    groups: [
      g("variants", "Variants", [
        it("ac-default", "Default", { variant: "default" }),
        it("ac-surface", "Surface", { variant: "surface" }),
      ]),
    ],
  }),
  {
    id: "disclosure",
    name: "Disclosure",
    description: "Expandable sections with optional grouped keyboard navigation.",
    install: `npx ${KIT_NAME} add disclosure`,
    githubPath: "components/registry/disclosure/Disclosure.tsx",
    tabs: [
      familyTab("disclosure", "Disclosure", "Disclosure", [
        g("examples", "Examples", [
          it("dc-default", "Default", { label: "Shipping details" }),
        ]),
      ]),
      familyTab("disclosure-group", "Disclosure Group", "DisclosureGroup", [
        g("examples", "Examples", [
          it("dg-default", "Default", {}),
        ]),
      ]),
    ],
  },
  makeFamily({
    id: "surface",
    name: "Surface",
    component: "Surface",
    description: "A neutral container surface for grouping content.",
    groups: [
      g(
        "variants",
        "Variants",
        [
          it("su-default", "Default", { variant: "default" }),
          it("su-secondary", "Secondary", { variant: "secondary" }),
          it("su-tertiary", "Tertiary", { variant: "tertiary" }),
          it("su-transparent", "Transparent", { variant: "transparent" }),
        ],
        "grid",
      ),
    ],
  }),
  makeFamily({
    id: "fieldset",
    name: "Fieldset",
    component: "Fieldset",
    description: "Groups related form fields with a legend and actions.",
    groups: [
      g("states", "States", [
        it("fs-default", "Default", { label: "Account" }),
        it("fs-disabled", "Disabled", { label: "Account", isDisabled: true }),
      ]),
    ],
  }),
];
