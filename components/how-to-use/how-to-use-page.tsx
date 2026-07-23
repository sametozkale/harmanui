"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  Add01Icon,
  ColorsIcon,
  ComponentIcon,
  ComputerTerminal01Icon,
  Copy01Icon,
  DashboardSquare01Icon,
  LayoutGridIcon,
  Link01Icon,
  Search01Icon,
  SourceCodeIcon,
} from "@hugeicons/core-free-icons";
import { GITHUB_REPO, KIT_NAME } from "@/lib/registry/registry";
import { GithubIcon } from "@/components/icons";
import { Reveal, revealDelay } from "@/components/motion/page-reveal";
import { ArrowRight, Check, Copy } from "@/lib/icons";
import { PLAYGROUND_SURFACE_SHELL_CLASS } from "@/components/playground/constants";

const INIT_CMD = `npx ${KIT_NAME} init`;

type PathId = "full-kit" | "single-component";

type FlowStep = {
  icon: IconSvgElement;
  title: string;
  detail: string;
};

type UsagePath = {
  id: PathId;
  icon: IconSvgElement;
  title: string;
  body: string;
  steps: ReadonlyArray<FlowStep>;
  code: string;
  outcome: string;
};

const PATHS: Record<PathId, UsagePath> = {
  "full-kit": {
    id: "full-kit",
    icon: DashboardSquare01Icon,
    title: "Build your whole product on the kit",
    body: "Start fresh. Init once, set your tokens in the playground, then add components as you build each screen.",
    steps: [
      {
        icon: ComputerTerminal01Icon,
        title: "Init in your repo",
        detail: `Run ${INIT_CMD} at the project root.`,
      },
      {
        icon: ColorsIcon,
        title: "Set your system look",
        detail: "Tune color, radius, and type on Button or Input in the playground.",
      },
      {
        icon: Add01Icon,
        title: "Add what each screen needs",
        detail: "button, input, modal, table. One command per family.",
      },
      {
        icon: LayoutGridIcon,
        title: "Compose pages",
        detail: "Import from components/ui. Every control shares the same tokens.",
      },
      {
        icon: Link01Icon,
        title: "Share with your team",
        detail: "Copy the playground URL. Tokens travel with the link.",
      },
    ],
    code: INIT_CMD,
    outcome: "A full product UI with one consistent design system.",
  },
  "single-component": {
    id: "single-component",
    icon: ComponentIcon,
    title: "Customize one component for your project",
    body: "Already have an app? Design a single control here, copy the code, and paste it in.",
    steps: [
      {
        icon: Search01Icon,
        title: "Pick a family",
        detail: "Button, Input, Modal, or anything in the left sidebar.",
      },
      {
        icon: ColorsIcon,
        title: "Customize in the panel",
        detail: "Switch variants in the center. Adjust tokens on the right.",
      },
      {
        icon: Copy01Icon,
        title: "Copy code",
        detail: "The output matches the preview. Styles included.",
      },
      {
        icon: SourceCodeIcon,
        title: "Paste in your app",
        detail: "Drop into any page. Fix import paths if needed.",
      },
    ],
    code: `npx ${KIT_NAME} add button`,
    outcome: "One component in your current app, no migration.",
  },
};

function Glyph({ icon, className = "size-4" }: { icon: IconSvgElement; className?: string }) {
  return <HugeiconsIcon icon={icon} className={className} strokeWidth={1.75} aria-hidden />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">{children}</h2>
  );
}

function DocCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full cursor-pointer items-start justify-between gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-3.5 py-2.5 text-left transition hover:border-zinc-200 hover:bg-white active:scale-[0.99]"
      aria-label="Copy command"
    >
      <code className="font-geist-mono text-[12px] leading-relaxed whitespace-pre-wrap text-zinc-700">
        {code}
      </code>
      {copied ? (
        <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
      ) : (
        <Copy
          className="mt-0.5 size-3.5 shrink-0 text-zinc-400 transition group-hover:text-zinc-600"
          strokeWidth={2}
        />
      )}
    </button>
  );
}

function FlowTimeline({ steps }: { steps: ReadonlyArray<FlowStep> }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ol
      className="mt-5 space-y-0"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isActive = hoveredIndex === null ? index === 0 : hoveredIndex === index;

        return (
          <li
            key={step.title}
            className={`relative ${isLast ? "" : "pb-6"}`}
            onMouseEnter={() => setHoveredIndex(index)}
          >
            {!isLast ? (
              <span
                className="absolute top-[calc(1rem+2.25rem)] bottom-0 left-[calc(1rem+1.125rem)] w-px -translate-x-1/2 bg-zinc-200"
                aria-hidden
              />
            ) : null}
            <div
              className={`relative flex items-start gap-3 rounded-2xl border border-zinc-100 p-4 transition-colors duration-200 ${
                isActive ? "bg-[#fafafa]" : "bg-white"
              }`}
            >
              <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-soft-foreground)]">
                <Glyph icon={step.icon} className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-title text-[15px] font-medium leading-snug text-zinc-900">
                  {step.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">{step.detail}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function PathPicker({
  active,
  onSelect,
}: {
  active: PathId;
  onSelect: (id: PathId) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(Object.keys(PATHS) as PathId[]).map((id, index) => {
        const path = PATHS[id];
        const selected = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`cursor-pointer rounded-2xl border p-4 text-left transition active:scale-[0.98] ${
              selected
                ? "border-[#e4e4e4] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                : "border-zinc-100 bg-white hover:border-zinc-200"
            }`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              Path {index + 1}
            </p>
            <div className="mt-3 flex size-8 items-center justify-center rounded-lg bg-zinc-50 text-zinc-600">
              <Glyph icon={path.icon} />
            </div>
            <h3 className="font-title mt-3 text-[15px] font-medium text-zinc-900">{path.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{path.body}</p>
          </button>
        );
      })}
    </div>
  );
}

function PathFlowPanel({ pathId }: { pathId: PathId }) {
  const path = PATHS[pathId];

  return (
    <motion.section
      key={pathId}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="space-y-4"
    >
      <SectionLabel>The flow</SectionLabel>
      <div className="space-y-4 rounded-2xl border border-zinc-100 bg-white p-5">
        <p className="text-[14px] leading-relaxed text-zinc-600">{path.body}</p>
        <FlowTimeline key={pathId} steps={path.steps} />
      </div>
    </motion.section>
  );
}

function PathCommands({ activePath }: { activePath: PathId }) {
  const pathOrder: PathId[] = ["full-kit", "single-component"];

  return (
    <section className="space-y-4">
      <SectionLabel>Commands</SectionLabel>
      <div className="grid gap-3 sm:grid-cols-2">
        {pathOrder.map((id, index) => {
          const path = PATHS[id];
          const selected = activePath === id;

          return (
            <article
              key={id}
              className={`rounded-2xl border p-4 transition-colors ${
                selected
                  ? "border-zinc-200 bg-white"
                  : "border-zinc-100 bg-white"
              }`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                Path {index + 1}
              </p>
              <h3 className="font-title mt-1 text-[15px] font-medium text-zinc-900">{path.title}</h3>
              <div className="mt-3">
                <DocCodeBlock code={path.code} />
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">
                <span className="font-medium text-zinc-700">You end up with: </span>
                {path.outcome}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function HowToUsePageContent() {
  const [activePath, setActivePath] = useState<PathId>("full-kit");

  return (
    <div className="px-12 pt-8 pb-12">
      <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_320px]">
        <Reveal
          delay={revealDelay(0)}
          y={20}
          className={`col-start-1 lg:col-start-2 ${PLAYGROUND_SURFACE_SHELL_CLASS} p-10`}
        >
          <div className="space-y-10">
            <Reveal delay={revealDelay(1)} y={10}>
              <header className="min-w-0 space-y-3">
                <h1 className="font-title text-[22px] font-semibold text-zinc-900">How to use</h1>
                <p className="w-full text-[13.5px] leading-relaxed text-zinc-500">
                  Two ways to work with Harman UI. Pick a path, follow the flow, copy the commands.
                </p>
              </header>
            </Reveal>

            <Reveal delay={revealDelay(2)} y={10}>
              <section className="space-y-4">
                <SectionLabel>Choose your path</SectionLabel>
                <PathPicker active={activePath} onSelect={setActivePath} />
              </section>
            </Reveal>

            <Reveal delay={revealDelay(3)} y={10}>
              <AnimatePresence mode="wait">
                <PathFlowPanel pathId={activePath} />
              </AnimatePresence>
            </Reveal>

            <Reveal delay={revealDelay(4)} y={10}>
              <PathCommands activePath={activePath} />
            </Reveal>

            <Reveal delay={revealDelay(5)} y={10}>
              <section className="rounded-2xl border border-zinc-100 bg-white p-5">
                <p className="font-title text-[17px] font-medium tracking-[-0.01em] text-zinc-900">
                  Open the playground
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                  Path 1 builds the system. Path 2 ships one component. Both start on the same page.
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
                  <Link
                    href="/about"
                    className="inline-flex h-9 cursor-pointer items-center rounded-xl border border-zinc-100 bg-white px-4 text-[13px] font-medium text-zinc-700 transition hover:border-zinc-200 hover:bg-zinc-50 active:scale-[0.97]"
                  >
                    About the project
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
                </div>
              </section>
            </Reveal>

            <Reveal delay={revealDelay(6)} y={10}>
              <section className="rounded-2xl bg-[#f5f5f5] p-5">
                <p className="font-title text-[15px] font-medium text-zinc-900">CLI note</p>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                  <code className="font-geist-mono text-[12px] text-zinc-700">npx {KIT_NAME} init</code>{" "}
                  and{" "}
                  <code className="font-geist-mono text-[12px] text-zinc-700">npx {KIT_NAME} add</code>{" "}
                  show in the UI today. The registry CLI is still rolling out. Copy code works now.
                </p>
              </section>
            </Reveal>
          </div>
        </Reveal>

        <Reveal
          delay={revealDelay(7.5)}
          y={8}
          className="col-start-1 mt-12 flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 lg:col-start-2"
        >
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
        </Reveal>
      </div>
    </div>
  );
}
