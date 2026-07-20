"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "@/lib/icons";
import { KIT_NAME } from "@/lib/registry/registry";

const INSTALL_CMD = `npx ${KIT_NAME} init`;

export function InstallInitButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy init command"
      className="group flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-zinc-100 bg-white px-3.5 text-[13px] font-medium text-zinc-700 transition hover:border-zinc-200 active:scale-[0.97] md:h-9"
      title="Copy init command"
    >
      <Terminal className="size-4 text-zinc-400" strokeWidth={2} />
      <span className="font-geist-mono text-[12.5px] text-zinc-600">{INSTALL_CMD}</span>
      {copied ? (
        <Check className="size-3.5 text-emerald-500" strokeWidth={2.5} />
      ) : (
        <Copy
          className="size-3.5 text-zinc-400 transition group-hover:text-zinc-600"
          strokeWidth={2}
        />
      )}
    </button>
  );
}
