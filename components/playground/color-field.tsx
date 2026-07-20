/**
 * OKLCH color field.
 *
 * A collapsible swatch that expands into Lightness / Chroma / Hue / Alpha
 * sliders. The whole thing operates natively in OKLCH — the swatch, the slider
 * tracks, and the printed value all use CSS `oklch()`, so no color conversion
 * ever happens and generated code carries the exact same string.
 */
"use client";

import { useState } from "react";
import { ChevronDown } from "@/lib/icons";
import {
  type OklchColor,
  formatOklch,
  lightnessTrack,
  chromaTrack,
  hueTrack,
} from "@/lib/theme/oklch";
import { Slider } from "./controls";

export function ColorField({
  label,
  color,
  onChange,
  withAlpha = true,
}: {
  label: string;
  color: OklchColor;
  onChange: (color: OklchColor) => void;
  withAlpha?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const css = formatOklch(color);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2.5 py-1 text-left"
      >
        <span
          className="size-6 shrink-0 rounded-lg ring-1 ring-inset ring-black/10"
          style={{
            backgroundImage: `linear-gradient(${css}, ${css}), repeating-conic-gradient(#d4d4d8 0% 25%, #fff 0% 50%)`,
            backgroundSize: "100% 100%, 10px 10px",
          }}
        />
        <span className="flex-1 text-[13px] font-medium text-zinc-700">{label}</span>
        <span className="font-mono text-[11px] tabular-nums text-zinc-400">{css}</span>
        <ChevronDown
          className={`size-3.5 text-zinc-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 pb-1 pt-2">
            <Slider
              label="Lightness"
              value={Math.round(color.l * 100)}
              min={0}
              max={100}
              unit="%"
              track={lightnessTrack(color)}
              onChange={(v) => onChange({ ...color, l: v / 100 })}
            />
            <Slider
              label="Chroma"
              value={color.c}
              min={0}
              max={0.37}
              step={0.005}
              displayValue={color.c.toFixed(3)}
              track={chromaTrack(color)}
              onChange={(v) => onChange({ ...color, c: v })}
            />
            <Slider
              label="Hue"
              value={Math.round(color.h)}
              min={0}
              max={360}
              unit="°"
              track={hueTrack(color)}
              onChange={(v) => onChange({ ...color, h: v })}
            />
            {withAlpha && (
              <Slider
                label="Alpha"
                value={color.a ?? 1}
                min={0}
                max={1}
                step={0.01}
                displayValue={`${Math.round((color.a ?? 1) * 100)}%`}
                track={`linear-gradient(to right, transparent, ${formatOklch({ ...color, a: 1 })})`}
                onChange={(v) => onChange({ ...color, a: v })}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
