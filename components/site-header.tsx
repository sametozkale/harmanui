/**
 * Global site header.
 */
"use client";

import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { InstallInitButton } from "@/components/playground/install-init-button";
import { HeaderReveal, resetHeaderIntroBatch, revealDelay } from "@/components/motion/page-reveal";
import { HarmanLogo } from "./harman-logo";

const SECTIONS = [
  { id: "atoms", label: "Atoms", href: "/" },
  { id: "molecules", label: "Molecules", href: "/molecules" },
] as const;

function isSectionActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    resetHeaderIntroBatch();
  }

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md">
      <div className="relative flex h-16 w-full items-center justify-between px-12">
        <HeaderReveal delay={revealDelay(0)} y={8} className="relative z-10">
          <nav aria-label="Catalog">
            <div className="inline-flex h-9 gap-0.5 rounded-xl bg-[#fafafa] p-0.5">
              {SECTIONS.map((section) => {
                const active = isSectionActive(pathname, section.href);
                return (
                  <Link
                    key={section.id}
                    href={section.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex h-8 items-center rounded-[10px] px-3.5 text-[12.5px] font-medium tracking-[-0.01em] transition active:scale-[0.98] ${
                      active
                        ? "bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                        : "text-zinc-500 hover:text-zinc-800"
                    }`}
                  >
                    {section.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </HeaderReveal>

        <HeaderReveal delay={revealDelay(1)} y={8} className="relative z-10">
          <InstallInitButton />
        </HeaderReveal>

        <div className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center">
          <HeaderReveal delay={revealDelay(0.5)} y={8}>
            <Link href="/" aria-label="Harman UI home">
              <HarmanLogo />
            </Link>
          </HeaderReveal>
        </div>
      </div>
    </header>
  );
}
