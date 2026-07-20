# Harman UI

An open-source **component discovery, documentation & playground** site for a
UI kit built on [HeroUI](https://heroui.com) (React Aria) and **Tailwind CSS v4**.

Browse components, customize their design tokens live — typography, color
(in **OKLCH**), layout, shadow and motion — and copy the exact, production-ready
source you just designed. Think of it as a showcase **plus** a code source,
similar to the shadcn/ui docs experience but with a much richer customization
panel.

- 🎛️ **Live customization** — every control updates the preview instantly.
- 🎨 **OKLCH color system** — swatches, slider tracks and generated code all
  speak native `oklch()`.
- 📋 **Copy real code** — what you see in the preview is exactly what you copy.
- 🔗 **Shareable URLs** — the full customization state is encoded in the query
  string.
- 🤖 **AI-agent ready** — machine-readable metadata + a shadcn-style registry.

## Tech stack

| Concern      | Choice                                             |
| ------------ | -------------------------------------------------- |
| Framework    | Next.js 16 (App Router) + TypeScript               |
| Components   | `@heroui/react` v3 (built on React Aria Components) |
| Styling      | Tailwind CSS v4 (design tokens as CSS variables)   |
| Icons        | Huge Icons + hand-drawn chrome glyphs              |

## Getting started

```bash
# install dependencies
npm install

# run the dev server (http://localhost:3000)
npm run dev

# production build
npm run build && npm start
```

Requires Node.js 20+.

## How it works

The playground is a **three-column layout** at [`/playground`](app/playground):

1. **Left sidebar** — component families grouped into buckets (Buttons, Inputs,
   Forms, Overlays, Navigation, Data Display, Feedback, Layout Primitives).
   Grouped by _family_, never by variant: `Button`, `ButtonGroup` and
   `IconButton` all live under a single **Button** entry.
2. **Middle panel** — a pill tab menu (`Button | Button Group | Icon Button`)
   over a `#fafafa` stage that renders **every variant** live and lets you
   select one to copy. A CTA strip underneath offers **Copy code**,
   **Install via CLI**, and **View on GitHub**.
3. **Right panel** — accordion control groups (Typography, Color, Layout,
   Shadow, Motion) that mutate a single `Customization` object.

### One source of truth

A single [`Customization`](lib/theme/customization.ts) object drives three
things that always stay in sync:

```
Customization ──► buildPreviewStyle()  ──► live preview
              ──► styleEntries()        ──► generated code (lib/codegen)
              ──► encodeCustomization() ──► shareable URL
```

Both the preview and the code generator read the **same** ordered
`styleEntries()`, which is why the copied code is a faithful reproduction of
what is on screen.

## Project structure

```
app/
  page.tsx              Landing page + global "Get Started" CTA
  playground/page.tsx   The 3-column playground
  globals.css           Tailwind v4 + HeroUI styles + chrome base styles
components/
  registry/button/      Copy-paste component source (+ button.meta.json)
  playground/           Sidebar, Preview, CtaStrip, CustomizationPanel, controls
  icons.tsx             Category / control / preview icons
  site-header.tsx
lib/
  theme/                oklch.ts, customization.ts (state + serialization)
  codegen/              generate.ts (state → TSX string)
  registry/             registry.ts + types.ts (sidebar + families)
registry.json           shadcn-style registry (for a future add-CLI)
```

## Adding a component

1. Create `components/registry/<name>/` with the component source (built on
   HeroUI), a short JSDoc header, and a `<name>.meta.json` describing its props
   and variants.
2. Add a `ComponentFamily` entry to [`lib/registry/registry.ts`](lib/registry/registry.ts)
   with its tabs, preview groups and variant items, and mark the sidebar item
   `status: "ready"`.
3. If it needs bespoke code output, extend
   [`lib/codegen/generate.ts`](lib/codegen/generate.ts).

That's it — the preview, customization panel and code generation all pick it up
automatically.

## AI-agent readiness

The architecture is intentionally compatible with future AI tooling:

- Each component ships a machine-readable `*.meta.json` (props, variants,
  descriptions).
- [`registry.json`](registry.json) follows the shadcn registry standard, so a
  future `npx harman-ui add <component>` CLI and an MCP server / `llms.txt`
  endpoint can expose every component to agents (Cursor, Claude Code, …).

_These are foundations only — the CLI and MCP server are not built yet._

## Contributing

Contributions are welcome!

1. Fork and clone the repo, then `npm install`.
2. Create a branch: `git checkout -b feat/<component>`.
3. Follow **Adding a component** above; keep components accessible (they build
   on React Aria — don't re-implement focus/keyboard behavior).
4. Run `npm run build` to typecheck, then open a pull request describing the
   change and including a screenshot of the playground.

Please keep the design language consistent: monochrome chrome, `#fafafa`
preview surfaces, concentric border radii, and OKLCH color tokens.

## License

[MIT](LICENSE) © Harman UI contributors. Built on HeroUI, React Aria and
Tailwind CSS v4.
