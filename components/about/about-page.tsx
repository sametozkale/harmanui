import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  AccessibilityIcon,
  ColorsIcon,
  SourceCodeIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { GITHUB_REPO, KIT_NAME } from "@/lib/registry/registry";
import { FoundationIcon, type FoundationId } from "@/components/about/foundation-icons";
import { GithubIcon } from "@/components/icons";
import { ArrowRight } from "@/lib/icons";
import { PLAYGROUND_SURFACE_SHELL_CLASS } from "@/components/playground/constants";

const BENEFITS: ReadonlyArray<{
  icon: IconSvgElement;
  title: string;
  body: string;
}> = [
  {
    icon: SparklesIcon,
    title: "Polished from the first screen",
    body: "Components start from a considered baseline, not a bare minimum. Your product looks closer to finished on day one, before you touch a single token.",
  },
  {
    icon: ColorsIcon,
    title: "A look that's actually yours",
    body: "Typography, OKLCH color, radius, shadow, and motion live in one panel. Tune until the interface matches your brand, not a generic library demo.",
  },
  {
    icon: SourceCodeIcon,
    title: "Playground to production",
    body: "What you see in the preview is what lands in your repo. Copy real TSX, share a URL with your team, or scaffold the kit with one init command.",
  },
  {
    icon: AccessibilityIcon,
    title: "Accessible without the audit",
    body: "Built on HeroUI and React Aria, so focus order, keyboard support, and screen reader behavior ship with every control. Better UX without reviewing each component yourself.",
  },
];

const FOUNDATIONS: ReadonlyArray<{
  id: FoundationId;
  name: string;
  detail: string;
}> = [
  {
    id: "heroui",
    name: "HeroUI + React Aria",
    detail: "Familiar interaction patterns with accessibility handled for you.",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    detail: "Utility tokens that compile clean and stay easy to override in your app.",
  },
  {
    id: "oklch",
    name: "OKLCH",
    detail: "Colors that stay balanced as you lighten, darken, or build a full palette.",
  },
  {
    id: "mit",
    name: "MIT",
    detail: "Free for commercial projects. No license surprises as you grow.",
  },
] as const;

export function AboutPageContent() {
  return (
    <div className="px-12 pt-8 pb-12">
      <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_320px]">
        <div className={`col-start-1 lg:col-start-2 ${PLAYGROUND_SURFACE_SHELL_CLASS} p-10`}>
          <div className="space-y-10">
            <header className="min-w-0 space-y-3">
              <h1 className="font-title text-[22px] font-semibold text-zinc-900">About</h1>
              <p className="w-full text-[13.5px] leading-relaxed text-zinc-500">
                Build interfaces that feel considered, not copied. Harman UI helps you design,
                customize, and ship HeroUI components that look like yours.
              </p>
            </header>

            <section className="space-y-4">
              <p className="text-[15px] leading-relaxed text-zinc-700">
                Most component libraries hand you blocks that still read as someone else's product.
                Harman UI gives you a full design workflow: browse 57 component families, tune
                typography, color, spacing, and motion in real time, then drop the exact code into
                your app.
              </p>
              <p className="text-[14px] leading-relaxed text-zinc-500">
                The payoff is an interface that feels intentional end to end. Buttons, forms, and
                navigation share one visual language. You move faster because you set the look once
                and every component follows. You ship with confidence because the preview and the
                copied source are the same artifact.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                What you get in your project
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {BENEFITS.map((benefit) => (
                  <article
                    key={benefit.title}
                    className="rounded-2xl border border-zinc-100 bg-white p-4"
                  >
                    <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-zinc-50 text-zinc-600">
                      <HugeiconsIcon
                        icon={benefit.icon}
                        className="size-4"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </div>
                    <h3 className="font-title text-[15px] font-medium text-zinc-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{benefit.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                Built on
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {FOUNDATIONS.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-zinc-100 bg-white px-4 py-4"
                  >
                    <div className="mb-3 flex h-7 items-center">
                      <FoundationIcon id={item.id} />
                    </div>
                    <p className="text-[13px] font-medium text-zinc-800">{item.name}</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-500">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-100 bg-white p-5">
              <p className="font-title text-[17px] font-medium tracking-[-0.01em] text-zinc-900">
                Start with a component. Leave with a system.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                Open the playground, pick what you need, and shape it until it feels right for your
                product. Copy the code, share the link with your team, or install the kit in your
                stack.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <Link
                  href="/"
                  className="group inline-flex h-9 cursor-pointer items-center gap-0 rounded-xl bg-primary px-4 text-[13px] font-medium text-white transition hover:gap-1.5 hover:bg-primary/90 active:scale-[0.97]"
                >
                  Open playground
                  <ArrowRight
                    className="size-0 opacity-0 transition-all duration-200 group-hover:size-3.5 group-hover:opacity-100"
                    strokeWidth={2.25}
                  />
                </Link>
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl border border-zinc-100 bg-white px-4 text-[13px] font-medium text-zinc-700 transition hover:border-zinc-200 hover:bg-zinc-50 active:scale-[0.97]"
                >
                  <GithubIcon className="size-4" />
                  View on GitHub
                </a>
                <code className="font-geist-mono text-[12px] text-zinc-400">
                  npx {KIT_NAME} init
                </code>
              </div>
            </section>
          </div>
        </div>

        <div className="col-start-1 mt-12 flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 lg:col-start-2">
          <p className="text-[12px] text-zinc-400">
            Harman UI © {new Date().getFullYear()}. All rights reserved.
          </p>
          <p className="text-[12px] text-zinc-400">
            Created by{" "}
            <a
              href="https://github.com/sametozkale"
              target="_blank"
              rel="noreferrer noopener"
              className="text-zinc-500 transition hover:text-zinc-700"
            >
              Samet Özkale
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
