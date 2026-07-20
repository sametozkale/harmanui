# Harman UI

Open-source **component discovery, documentation, and playground** for a UI kit
built on [HeroUI](https://heroui.com) (React Aria) and **Tailwind CSS v4**.

Browse **57 component families**, customize design tokens live, and copy the
exact production-ready source you just designed. The playground keeps preview,
generated code, and shareable URLs in sync from a single `Customization` state.

**Live repo:** [github.com/sametozkale/harmanui](https://github.com/sametozkale/harmanui)

## Features

- **Live playground** — preview updates instantly as you tweak typography, OKLCH
  color, layout, shadow, motion, and interaction sound.
- **OKLCH color system** — swatches, slider tracks, and generated code all use
  native `oklch()`.
- **Copy real code** — generated output matches the preview; sound setup is
  included when the Sound section is available for a component.
- **Shareable URLs** — family, tab, variant, and full customization state are
  encoded in the query string.
- **Searchable sidebars** — filter components and customization controls without
  losing context.
- **Registry-driven catalog** — eight sidebar buckets, variant tabs per family,
  and machine-readable metadata for future CLI / agent tooling.

## Tech stack

| Concern     | Choice                                              |
| ----------- | --------------------------------------------------- |
| Framework   | Next.js 16 (App Router) + TypeScript                |
| Components  | `@heroui/react` v3 (React Aria Components)          |
| Styling     | Tailwind CSS v4                                     |
| Icons       | Hugeicons + hand-drawn chrome glyphs                |
| Typography  | Geist + Open Runde (display)                        |
| Sound       | [Cuelume](https://www.npmjs.com/package/cuelume)      |

## Getting started

```bash
git clone https://github.com/sametozkale/harmanui.git
cd harmanui
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

Requires **Node.js 20+**.

## Routes

| Path         | Description                                      |
| ------------ | ------------------------------------------------ |
| `/`          | Atoms playground (main three-column experience)  |
| `/molecules` | Molecules section (placeholder)                  |
| `/about`     | Project overview and design principles           |

## Playground layout

The home page is a responsive **three-column grid**:

1. **Left sidebar** — searchable catalog grouped into eight categories (Buttons,
   Inputs, Forms, Overlays, Navigation, Data Display, Feedback, Layout
   Primitives). Families are listed once; variants live in the middle tab menu.
   The active item shows a small accent marker aligned with its category icon.
2. **Center stage** — family title, variant tab menu, live preview on a `#fafafa`
   surface, reset control, and a CTA strip with **Copy code** and
   `npx harman-ui add <component>`.
3. **Right panel** — searchable customization accordion (Typography, Color,
   Layout, Shadow, Motion, Sound). Controls are shown or hidden per component
   capability so irrelevant tokens never clutter the UI.

Footer row: **About** (left), CTA strip (center), **View on GitHub** (right on
xl screens). The header includes an Atoms / Molecules switch and
`npx harman-ui init`.

### One source of truth

A single [`Customization`](lib/theme/customization.ts) object drives:

```
Customization ──► buildPreviewStyle()   ──► live preview
              ──► generateCode()        ──► copied TSX
              ──► encodeCustomization() ──► URL query params
```

Preview and codegen read the same style entries, so copied code faithfully
reproduces what you see on screen.

## Catalog

| Category            | Examples                                              |
| ------------------- | ----------------------------------------------------- |
| Buttons             | Button, Toggle Button, Close Button                   |
| Inputs              | Input, Textarea, Number Field, Search Field, OTP      |
| Forms               | Checkbox, Select, Date Pickers, Slider, Form, Color  |
| Overlays            | Modal, Drawer, Popover, Tooltip, Dropdown, Alert Dialog |
| Navigation          | Tabs, Breadcrumbs, Pagination, Link, Menu, Toolbar    |
| Data Display        | Table, Avatar, Badge, Chip, Card, Progress, Kbd       |
| Feedback            | Alert, Toast, Spinner, Skeleton, Empty State        |
| Layout Primitives   | Accordion, Disclosure, Separator, Surface, Typography |

All **57** sidebar entries are playable in the playground today.

## Project structure

```
app/
  page.tsx                 Atoms playground (PlaygroundClient)
  about/page.tsx           About page
  molecules/page.tsx       Molecules placeholder
  globals.css              Tailwind v4, HeroUI, playground chrome
components/
  playground/              Sidebar, preview, customization panel, CTAs
  registry/button/         Copy-paste Button family source + meta.json
  about/                   About page content
  site-header.tsx          Global header (Atoms / Molecules, init CTA)
lib/
  theme/                   customization.ts, oklch.ts, capabilities
  codegen/                 generate.ts (Customization → TSX)
  registry/
    registry.ts            Sidebar catalog + exports
    families/              Per-family preview specs, renderers, codegen
  interaction-sound.ts     Shared sound API (Cuelume)
registry.json              shadcn-style registry manifest (Button today)
```

## Adding a component

1. Add preview + codegen data under `lib/registry/families/` and export the family
   from the families index.
2. Register the sidebar entry in [`lib/registry/registry.ts`](lib/registry/registry.ts).
   Items present in `FAMILIES` are marked `ready` automatically.
3. For copy-paste source, add `components/registry/<name>/` with component files
   and a `*.meta.json`, then extend [`registry.json`](registry.json) if needed.

The preview, customization panel, and code generator pick up new families from
the registry — no manual wiring in the playground shell.

## CLI and registry (planned)

[`registry.json`](registry.json) follows the shadcn registry format. The UI
already surfaces `npx harman-ui init` and `npx harman-ui add <component>` in
the playground; the install CLI itself is not shipped from this repo yet.

## Contributing

1. Fork and clone, then `npm install`.
2. Branch: `git checkout -b feat/<name>`.
3. Follow **Adding a component** above. Keep components accessible — they build
   on React Aria; do not re-implement focus or keyboard behavior.
4. Run `npm run build`, then open a PR with a short description and a playground
   screenshot.

Please keep the design language consistent: monochrome chrome, `#fafafa` preview
surfaces, concentric radii, and OKLCH tokens.

## License

[MIT](LICENSE) © Harman UI contributors. Built on HeroUI, React Aria, and
Tailwind CSS v4.
