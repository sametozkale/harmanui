/**
 * CTA strip — sits directly beneath the #fafafa stage.
 *
 * Per-component "Copy code" and "Install via CLI" actions.
 */
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";
import { Copy, Check, Terminal } from "@/lib/icons";

const FOOTER_LINK_CLASS =
  "flex h-10 shrink-0 cursor-pointer items-center rounded-xl px-3.5 text-[13px] font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.97] md:h-9";

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return { copied, copy };
}

export function CtaStrip({
  code,
  install,
}: {
  code: string;
  install: string;
}) {
  const codeCopy = useCopy();
  const cliCopy = useCopy();

  return (
    <div className="mt-3 flex w-full shrink-0 flex-wrap items-center justify-between gap-2.5">
      <div className="flex flex-wrap items-center gap-2.5">
        <Button
          variant="tertiary"
          onPress={() => codeCopy.copy(code)}
          className="!rounded-xl !bg-[#f4f4f4]"
        >
          {codeCopy.copied ? (
            <Check className="size-4" strokeWidth={2.5} />
          ) : (
            <Copy className="size-4" strokeWidth={2} />
          )}
          Copy code
        </Button>

        <button
          type="button"
          onClick={() => cliCopy.copy(install)}
          aria-label="Copy install command"
          className="group flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-zinc-100 bg-white px-3.5 text-[13px] font-medium text-zinc-700 transition hover:border-zinc-200 active:scale-[0.97] md:h-9"
          title="Copy install command"
        >
          <Terminal className="size-4 text-zinc-400" strokeWidth={2} />
          <span className="font-geist-mono text-[12.5px] text-zinc-600">{install}</span>
          {cliCopy.copied ? (
            <Check className="size-3.5 text-emerald-500" strokeWidth={2.5} />
          ) : (
            <Copy className="size-3.5 text-zinc-400 transition group-hover:text-zinc-600" strokeWidth={2} />
          )}
        </button>
      </div>

      <Link href="/how-to-use" className={FOOTER_LINK_CLASS}>
        How to use
      </Link>
    </div>
  );
}
