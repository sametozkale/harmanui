/**
 * Low-level, accessible control primitives used by the customization panel.
 * Switch uses HeroUI's compound Switch so panel toggles match the catalog.
 */
"use client";

import { useId, useState, type ReactNode } from "react";
import { Switch as HeroSwitch, Slider as HeroSlider } from "@heroui/react";
import { ChevronDown } from "@/lib/icons";

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
  return (
    <ControlRow label={label ?? ""}>
      <div
        role="group"
        aria-label={label}
        className="flex gap-0.5 rounded-xl bg-zinc-100 p-0.5"
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(opt.value)}
              className={`flex-1 cursor-pointer rounded-[10px] px-2.5 py-1.5 text-[12px] font-medium transition active:scale-[0.97] ${
                active
                  ? "bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.08)]"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
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
        <ChevronDown
          className={`size-4 shrink-0 text-zinc-400 opacity-0 transition-[opacity,transform] duration-200 group-hover/customize-panel:opacity-100 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>
      <div
        id={id}
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
        style={{ gridTemplateRows: open ? "minmax(0, max-content)" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-4 pb-5 pt-3 pl-2.5 pr-0.5">{children}</div>
        </div>
      </div>
    </div>
  );
}
