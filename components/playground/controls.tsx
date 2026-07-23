/**
 * Low-level, accessible control primitives used by the customization panel.
 * Switch uses HeroUI's compound Switch so panel toggles match the catalog.
 */
"use client";

import { useId, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Switch as HeroSwitch, Slider as HeroSlider } from "@heroui/react";
import { ChevronDown } from "@/lib/icons";
import {
  PLAYGROUND_CUSTOMIZE_TAB_MENU_CLASS,
  PLAYGROUND_CUSTOMIZE_TAB_MENU_SCROLL_CLASS,
  playgroundTabMenuButtonClass,
} from "./constants";

const SIDEBAR_SECTION_EASE = [0.2, 0, 0, 1] as const;
const SIDEBAR_SECTION_TRANSITION = { duration: 0.28, ease: SIDEBAR_SECTION_EASE };

/* --------------------------------- Row ---------------------------------- */

export function ControlRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-medium text-zinc-700">{label}</span>
        {value != null && (
          <span className="text-[12px] tabular-nums text-zinc-400">{value}</span>
        )}
      </div>
      {children}
    </div>
  );
}

/* -------------------------------- Slider -------------------------------- */

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  displayValue,
  track,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  displayValue?: string;
  /** Custom CSS background for the track (e.g. an OKLCH axis gradient). */
  track?: string;
  onChange: (value: number) => void;
}) {
  const customTrack = Boolean(track);

  return (
    <ControlRow label={label} value={displayValue ?? `${value}${unit}`}>
      <HeroSlider
        aria-label={label}
        value={value}
        minValue={min}
        maxValue={max}
        step={step}
        onChange={(next) => onChange(typeof next === "number" ? next : next[0])}
        className="customize-slider !gap-0 ![grid-template-areas:'track'] ![grid-template-columns:1fr] ![grid-template-rows:auto]"
      >
        <HeroSlider.Track
          style={customTrack ? { background: track } : undefined}
          className={customTrack ? "!border-x-transparent" : undefined}
        >
          <HeroSlider.Fill className={customTrack ? "!opacity-0" : undefined} />
          <HeroSlider.Thumb />
        </HeroSlider.Track>
      </HeroSlider>
    </ControlRow>
  );
}

/* ------------------------------- Segmented ------------------------------ */

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: ReadonlyArray<{ value: T; label: ReactNode }>;
  value: T;
  onChange: (value: T) => void;
}) {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
      behavior: "smooth",
    });
  }, [value]);

  return (
    <ControlRow label={label ?? ""}>
      <div className={PLAYGROUND_CUSTOMIZE_TAB_MENU_SCROLL_CLASS}>
        <div role="group" aria-label={label} className={PLAYGROUND_CUSTOMIZE_TAB_MENU_CLASS}>
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                ref={active ? activeRef : undefined}
                type="button"
                aria-pressed={active}
                onClick={() => onChange(opt.value)}
                className={playgroundTabMenuButtonClass(
                  active,
                  "min-w-max shrink-0 basis-0 flex-1 whitespace-nowrap",
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </ControlRow>
  );
}

/* -------------------------------- Switch -------------------------------- */

export function Switch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <HeroSwitch
      isSelected={checked}
      onChange={onChange}
      className="!flex-row w-full items-center justify-between gap-0"
    >
      <span className="text-[13px] font-medium text-zinc-700">{label}</span>
      <HeroSwitch.Content className="gap-0">
        <HeroSwitch.Control>
          <HeroSwitch.Thumb />
        </HeroSwitch.Control>
      </HeroSwitch.Content>
    </HeroSwitch>
  );
}

/* ------------------------------- Accordion ------------------------------ */

export function Accordion({
  icon,
  title,
  accent = "text-zinc-500",
  defaultOpen = false,
  expanded,
  children,
}: {
  icon: ReactNode;
  title: string;
  /** Tailwind text-color class for the colored glyph. */
  accent?: string;
  defaultOpen?: boolean;
  /** When set, overrides the internal open state (e.g. while searching). */
  expanded?: boolean;
  children: ReactNode;
}) {
  const [openInternal, setOpenInternal] = useState(defaultOpen);
  const open = expanded ?? openInternal;
  const id = useId();
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          if (expanded === undefined) setOpenInternal((current) => !current);
        }}
        className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl p-2.5 text-left transition hover:bg-zinc-100/80"
      >
        <span className={`flex size-5 items-center justify-center ${accent}`}>
          {icon}
        </span>
        <span className="font-title flex-1 text-[14px] font-semibold text-zinc-900">
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={SIDEBAR_SECTION_TRANSITION}
          className="inline-flex opacity-0 transition-opacity duration-200 group-hover/customize-panel:opacity-100"
        >
          <ChevronDown className="size-4 shrink-0 text-zinc-400" strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="section"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SIDEBAR_SECTION_TRANSITION}
            className="overflow-hidden"
          >
            <div className="space-y-4 pb-3 pt-3 pl-2.5 pr-0.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
