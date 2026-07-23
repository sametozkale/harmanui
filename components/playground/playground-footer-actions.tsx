"use client";

import Link from "next/link";
import { FeedbackModal } from "./feedback-modal";

const FOOTER_LINK_CLASS =
  "flex h-10 cursor-pointer items-center rounded-xl px-3.5 text-[13px] font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.97] md:h-9";

export function PlaygroundFooterActions() {
  return (
    <div className="flex w-full min-w-0 items-center gap-1">
      <Link href="/about" className={FOOTER_LINK_CLASS}>
        About
      </Link>
      <FeedbackModal />
    </div>
  );
}
