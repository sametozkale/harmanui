"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Layers02Icon } from "@hugeicons/core-free-icons";
import { PLAYGROUND_SURFACE_SHELL_CLASS } from "@/components/playground/constants";
import { Reveal, revealDelay } from "@/components/motion/page-reveal";
import { ArrowRight } from "@/lib/icons";

export function MoleculesComingSoon() {
  return (
    <div className="flex flex-1 items-center justify-center px-12 py-8">
      <Reveal delay={revealDelay(0)} y={20} className="w-full max-w-md">
        <div className={`w-full p-10 text-center ${PLAYGROUND_SURFACE_SHELL_CLASS}`}>
          <Reveal delay={revealDelay(1)} y={10}>
            <div className="mx-auto mb-5 flex size-11 items-center justify-center rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-zinc-100">
              <HugeiconsIcon
                icon={Layers02Icon}
                className="size-5 text-zinc-500"
                strokeWidth={1.75}
                aria-hidden
              />
            </div>
          </Reveal>

          <Reveal delay={revealDelay(2)} y={10}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              Coming soon
            </p>
            <h1 className="font-title mt-3 text-[22px] font-semibold text-zinc-900">
              Molecules
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-zinc-500">
              Composed patterns built from the atoms you already customize. Forms, cards, and
              navigation blocks with the same playground and copy-to-code workflow.
            </p>
          </Reveal>

          <Reveal delay={revealDelay(3)} y={10}>
            <Link
              href="/"
              className="group mt-6 inline-flex h-9 cursor-pointer items-center gap-0 rounded-xl bg-primary px-4 text-[13px] font-medium text-white transition hover:gap-1.5 hover:bg-primary/90 active:scale-[0.97]"
            >
              Explore atoms
              <ArrowRight
                className="size-0 opacity-0 transition-all duration-200 group-hover:size-3.5 group-hover:opacity-100"
                strokeWidth={2.25}
              />
            </Link>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
}
