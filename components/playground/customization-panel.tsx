/**
 * The right-hand customization panel.
 *
 * Composes accordion groups (Typography, Color, Layout, Shadow, Motion) using
 * the same icon + title language as the sidebar. Controls shown depend on the
 * selected component family + tab — only tokens that affect the live preview
 * are surfaced.
 */
"use client";

import { useMemo, useState } from "react";
import {
  type Customization,
  type FontFamilyKey,
  type ShadowPreset,
  type EasingKey,
  type HoverAnimation,
  FONT_LABELS,
  EASING_LABELS,
} from "@/lib/theme/customization";
import {
  getCustomizeVisibility,
  isControlVisible,
  sectionHasVisibleControls,
  type CustomizeSectionKey,
  type CustomizeVisibility,
} from "@/lib/theme/customize-capabilities";
import type { OklchColor } from "@/lib/theme/oklch";
import {
  matchesPanelSearch,
  normalizeSearchQuery,
} from "@/lib/playground/panel-search";
import { ControlIcon } from "@/components/icons";
import { playPlaygroundSound, SOUND_OPTIONS } from "@/lib/sound";
import { Accordion, Slider, Segmented, Switch } from "./controls";
import { ColorField } from "./color-field";
import { SidebarSearch } from "./sidebar-search";
import { PlaygroundPanelScroll } from "./panel-scroll";

const FONT_OPTIONS = (Object.keys(FONT_LABELS) as FontFamilyKey[]).map((k) => ({
  value: k,
  label: FONT_LABELS[k],
}));

const SHADOW_OPTIONS: { value: ShadowPreset; label: string }[] = [
  { value: "none", label: "None" },
  { value: "sm", label: "SM" },
  { value: "md", label: "MD" },
  { value: "lg", label: "LG" },
  { value: "custom", label: "Custom" },
];

const EASING_OPTIONS = (Object.keys(EASING_LABELS) as EasingKey[]).map((k) => ({
  value: k,
  label: EASING_LABELS[k],
}));

const HOVER_OPTIONS: { value: HoverAnimation; label: string }[] = [
  { value: "none", label: "None" },
  { value: "lift", label: "Lift" },
  { value: "scale", label: "Scale" },
  { value: "glow", label: "Glow" },
];

function show(v: CustomizeVisibility, key: Parameters<typeof isControlVisible>[0]) {
  return isControlVisible(key, v);
}

const SECTION_LABELS: Record<CustomizeSectionKey, string> = {
  typography: "Typography",
  color: "Color",
  layout: "Layout",
  shadow: "Shadow",
  motion: "Motion",
  sound: "Sound",
};

function shouldShowControl(
  searchQuery: string,
  visibility: CustomizeVisibility,
  key: Parameters<typeof isControlVisible>[0],
  label: string,
  sectionTitle: string,
) {
  if (!show(visibility, key)) return false;
  if (!normalizeSearchQuery(searchQuery)) return true;
  if (matchesPanelSearch(searchQuery, sectionTitle)) return true;
  return matchesPanelSearch(searchQuery, label);
}

function shouldShowSection(
  searchQuery: string,
  section: CustomizeSectionKey,
  visibility: CustomizeVisibility,
  labels: string[],
) {
  if (!sectionHasVisibleControls(section, visibility)) return false;
  if (!normalizeSearchQuery(searchQuery)) return true;
  if (matchesPanelSearch(searchQuery, SECTION_LABELS[section])) return true;
  return labels.some((label) => matchesPanelSearch(searchQuery, label));
}

export function CustomizationPanelSections({
  familyId,
  tabId,
  value: c,
  onChange,
  searchQuery,
}: {
  familyId: string;
  tabId: string;
  value: Customization;
  onChange: (next: Customization) => void;
  searchQuery: string;
}) {
  const visibility = useMemo(
    () => getCustomizeVisibility(familyId, tabId),
    [familyId, tabId],
  );
  const searching = normalizeSearchQuery(searchQuery).length > 0;
  const expandWhileSearching = searching ? true : undefined;

  const setColor = (key: "background" | "text" | "border", color: OklchColor) =>
    onChange({
      ...c,
      color: { ...c.color, override: true, [key]: color },
    });

  const typographyLabels = [
    "Font family",
    "Font size",
    "Font weight",
    "Letter spacing",
    "Text wrapping",
  ];
  const colorLabels = [
    "Override variant colors",
    "Background",
    "Text",
    "Border",
  ];
  const layoutLabels = [
    "Custom padding",
    "Padding X",
    "Padding Y",
    "Gap",
    "Radius (outer)",
    "Radius (inner)",
    "Border width",
  ];
  const shadowLabels = ["Preset", "Shadow color", "Opacity"];
  const motionLabels = ["Duration", "Easing", "Hover animation"];
  const soundLabels = [
    "Interface SFX",
    "Cue",
    "Volume",
    "Cuelume interaction sounds",
    ...SOUND_OPTIONS.map((opt) => opt.label),
  ];

  const visibleSections = [
    shouldShowSection(searchQuery, "typography", visibility, typographyLabels),
    shouldShowSection(searchQuery, "color", visibility, colorLabels),
    shouldShowSection(searchQuery, "layout", visibility, layoutLabels),
    shouldShowSection(searchQuery, "shadow", visibility, shadowLabels),
    shouldShowSection(searchQuery, "motion", visibility, motionLabels),
    shouldShowSection(searchQuery, "sound", visibility, soundLabels),
  ].some(Boolean);

  return (
    <div>
        {shouldShowSection(searchQuery, "typography", visibility, typographyLabels) && (
          <Accordion
            icon={<ControlIcon name="typography" className="size-5" />}
            title="Typography"
            accent="text-blue-500"
            defaultOpen
            expanded={expandWhileSearching}
          >
            {shouldShowControl(
              searchQuery,
              visibility,
              "fontFamily",
              "Font family",
              SECTION_LABELS.typography,
            ) && (
              <Segmented
                label="Font family"
                options={FONT_OPTIONS}
                value={c.typography.fontFamily}
                onChange={(fontFamily) =>
                  onChange({ ...c, typography: { ...c.typography, fontFamily } })
                }
              />
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "fontSize",
              "Font size",
              SECTION_LABELS.typography,
            ) && (
              <Slider
                label="Font size"
                value={c.typography.fontSize}
                min={10}
                max={22}
                unit="px"
                onChange={(fontSize) =>
                  onChange({ ...c, typography: { ...c.typography, fontSize } })
                }
              />
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "fontWeight",
              "Font weight",
              SECTION_LABELS.typography,
            ) && (
              <Slider
                label="Font weight"
                value={c.typography.fontWeight}
                min={300}
                max={800}
                step={100}
                onChange={(fontWeight) =>
                  onChange({ ...c, typography: { ...c.typography, fontWeight } })
                }
              />
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "letterSpacing",
              "Letter spacing",
              SECTION_LABELS.typography,
            ) && (
              <Slider
                label="Letter spacing"
                value={c.typography.letterSpacing}
                min={-2}
                max={4}
                step={0.1}
                unit="px"
                displayValue={`${c.typography.letterSpacing.toFixed(1)}px`}
                onChange={(letterSpacing) =>
                  onChange({ ...c, typography: { ...c.typography, letterSpacing } })
                }
              />
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "wrap",
              "Text wrapping",
              SECTION_LABELS.typography,
            ) && (
              <Switch
                label="Text wrapping"
                checked={c.typography.wrap}
                onChange={(wrap) =>
                  onChange({ ...c, typography: { ...c.typography, wrap } })
                }
              />
            )}
          </Accordion>
        )}

        {shouldShowSection(searchQuery, "color", visibility, colorLabels) && (
          <Accordion
            icon={<ControlIcon name="color" className="size-5" />}
            title="Color"
            accent="text-rose-500"
            expanded={expandWhileSearching}
          >
            {shouldShowControl(
              searchQuery,
              visibility,
              "colorOverride",
              "Override variant colors",
              SECTION_LABELS.color,
            ) && (
              <Switch
                label="Override variant colors"
                checked={c.color.override}
                onChange={(override) =>
                  onChange({ ...c, color: { ...c.color, override } })
                }
              />
            )}
            {(shouldShowControl(
              searchQuery,
              visibility,
              "background",
              "Background",
              SECTION_LABELS.color,
            ) ||
              shouldShowControl(
                searchQuery,
                visibility,
                "text",
                "Text",
                SECTION_LABELS.color,
              ) ||
              shouldShowControl(
                searchQuery,
                visibility,
                "border",
                "Border",
                SECTION_LABELS.color,
              )) && (
              <div
                className={
                  c.color.override ? "space-y-1" : "space-y-1 opacity-60"
                }
              >
                {shouldShowControl(
                  searchQuery,
                  visibility,
                  "background",
                  "Background",
                  SECTION_LABELS.color,
                ) && (
                  <ColorField
                    label="Background"
                    color={c.color.background}
                    onChange={(color) => setColor("background", color)}
                  />
                )}
                {shouldShowControl(
                  searchQuery,
                  visibility,
                  "text",
                  "Text",
                  SECTION_LABELS.color,
                ) && (
                  <ColorField
                    label="Text"
                    color={c.color.text}
                    onChange={(color) => setColor("text", color)}
                  />
                )}
                {shouldShowControl(
                  searchQuery,
                  visibility,
                  "border",
                  "Border",
                  SECTION_LABELS.color,
                ) && (
                  <ColorField
                    label="Border"
                    color={c.color.border}
                    onChange={(color) => setColor("border", color)}
                  />
                )}
              </div>
            )}
          </Accordion>
        )}

        {shouldShowSection(searchQuery, "layout", visibility, layoutLabels) && (
          <Accordion
            icon={<ControlIcon name="layout" className="size-5" />}
            title="Layout"
            accent="text-amber-500"
            expanded={expandWhileSearching}
          >
            {shouldShowControl(
              searchQuery,
              visibility,
              "customPadding",
              "Custom padding",
              SECTION_LABELS.layout,
            ) && (
              <Switch
                label="Custom padding"
                checked={c.layout.customPadding}
                onChange={(customPadding) =>
                  onChange({ ...c, layout: { ...c.layout, customPadding } })
                }
              />
            )}
            {(shouldShowControl(
              searchQuery,
              visibility,
              "paddingX",
              "Padding X",
              SECTION_LABELS.layout,
            ) ||
              shouldShowControl(
                searchQuery,
                visibility,
                "paddingY",
                "Padding Y",
                SECTION_LABELS.layout,
              )) && (
              <div
                className={
                  c.layout.customPadding ? "space-y-4" : "space-y-4 opacity-60"
                }
              >
                {shouldShowControl(
                  searchQuery,
                  visibility,
                  "paddingX",
                  "Padding X",
                  SECTION_LABELS.layout,
                ) && (
                  <Slider
                    label="Padding X"
                    value={c.layout.paddingX}
                    min={0}
                    max={40}
                    unit="px"
                    onChange={(paddingX) =>
                      onChange({
                        ...c,
                        layout: { ...c.layout, paddingX, customPadding: true },
                      })
                    }
                  />
                )}
                {shouldShowControl(
                  searchQuery,
                  visibility,
                  "paddingY",
                  "Padding Y",
                  SECTION_LABELS.layout,
                ) && (
                  <Slider
                    label="Padding Y"
                    value={c.layout.paddingY}
                    min={0}
                    max={28}
                    unit="px"
                    onChange={(paddingY) =>
                      onChange({
                        ...c,
                        layout: { ...c.layout, paddingY, customPadding: true },
                      })
                    }
                  />
                )}
              </div>
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "gap",
              "Gap",
              SECTION_LABELS.layout,
            ) && (
              <Slider
                label="Gap"
                value={c.layout.gap}
                min={0}
                max={24}
                unit="px"
                onChange={(gap) => onChange({ ...c, layout: { ...c.layout, gap } })}
              />
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "radius",
              "Radius (outer)",
              SECTION_LABELS.layout,
            ) && (
              <Slider
                label="Radius (outer)"
                value={c.layout.radius}
                min={0}
                max={28}
                unit="px"
                onChange={(radius) =>
                  onChange({ ...c, layout: { ...c.layout, radius } })
                }
              />
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "innerRadius",
              "Radius (inner)",
              SECTION_LABELS.layout,
            ) && (
              <Slider
                label="Radius (inner)"
                value={c.layout.innerRadius}
                min={0}
                max={24}
                unit="px"
                onChange={(innerRadius) =>
                  onChange({ ...c, layout: { ...c.layout, innerRadius } })
                }
              />
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "borderWidth",
              "Border width",
              SECTION_LABELS.layout,
            ) && (
              <Slider
                label="Border width"
                value={c.layout.borderWidth}
                min={0}
                max={6}
                unit="px"
                onChange={(borderWidth) =>
                  onChange({ ...c, layout: { ...c.layout, borderWidth } })
                }
              />
            )}
          </Accordion>
        )}

        {shouldShowSection(searchQuery, "shadow", visibility, shadowLabels) && (
          <Accordion
            icon={<ControlIcon name="shadow" className="size-5" />}
            title="Shadow"
            accent="text-indigo-500"
            expanded={expandWhileSearching}
          >
            {shouldShowControl(
              searchQuery,
              visibility,
              "shadowPreset",
              "Preset",
              SECTION_LABELS.shadow,
            ) && (
              <Segmented
                label="Preset"
                options={SHADOW_OPTIONS}
                value={c.shadow.preset}
                onChange={(preset) =>
                  onChange({ ...c, shadow: { ...c.shadow, preset } })
                }
              />
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "shadowColor",
              "Shadow color",
              SECTION_LABELS.shadow,
            ) && (
              <ColorField
                label="Shadow color"
                color={c.shadow.color}
                withAlpha={false}
                onChange={(color) =>
                  onChange({ ...c, shadow: { ...c.shadow, color } })
                }
              />
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "shadowOpacity",
              "Opacity",
              SECTION_LABELS.shadow,
            ) && (
              <Slider
                label="Opacity"
                value={c.shadow.opacity}
                min={0}
                max={0.5}
                step={0.01}
                displayValue={`${Math.round(c.shadow.opacity * 100)}%`}
                onChange={(opacity) =>
                  onChange({ ...c, shadow: { ...c.shadow, opacity } })
                }
              />
            )}
          </Accordion>
        )}

        {shouldShowSection(searchQuery, "motion", visibility, motionLabels) && (
          <Accordion
            icon={<ControlIcon name="motion" className="size-5" />}
            title="Motion"
            accent="text-violet-500"
            expanded={expandWhileSearching}
          >
            {shouldShowControl(
              searchQuery,
              visibility,
              "duration",
              "Duration",
              SECTION_LABELS.motion,
            ) && (
              <Slider
                label="Duration"
                value={c.motion.duration}
                min={0}
                max={600}
                step={10}
                unit="ms"
                onChange={(duration) =>
                  onChange({ ...c, motion: { ...c.motion, duration } })
                }
              />
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "easing",
              "Easing",
              SECTION_LABELS.motion,
            ) && (
              <Segmented
                label="Easing"
                options={EASING_OPTIONS}
                value={c.motion.easing}
                onChange={(easing) =>
                  onChange({ ...c, motion: { ...c.motion, easing } })
                }
              />
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "hover",
              "Hover animation",
              SECTION_LABELS.motion,
            ) && (
              <Segmented
                label="Hover animation"
                options={HOVER_OPTIONS}
                value={c.motion.hover}
                onChange={(hover) =>
                  onChange({ ...c, motion: { ...c.motion, hover } })
                }
              />
            )}
          </Accordion>
        )}

        {shouldShowSection(searchQuery, "sound", visibility, soundLabels) && (
          <Accordion
            icon={<ControlIcon name="sound" className="size-5" />}
            title="Sound"
            accent="text-teal-500"
            expanded={expandWhileSearching}
          >
            {shouldShowControl(
              searchQuery,
              visibility,
              "soundEnabled",
              "Interface SFX",
              SECTION_LABELS.sound,
            ) && (
              <Switch
                label="Interface SFX"
                checked={c.sound.enabled}
                onChange={(enabled) => {
                  if (enabled) playPlaygroundSound(c.sound, { force: true });
                  onChange({ ...c, sound: { ...c.sound, enabled } });
                }}
              />
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "soundCue",
              "Cue",
              SECTION_LABELS.sound,
            ) && (
              <div className={c.sound.enabled ? "space-y-2" : "space-y-2 opacity-60"}>
                <span className="text-[13px] font-medium text-zinc-700">Cue</span>
                <div className="grid grid-cols-2 gap-1 pr-0.5">
                  {SOUND_OPTIONS.filter(
                    (opt) =>
                      !searching ||
                      matchesPanelSearch(
                        searchQuery,
                        SECTION_LABELS.sound,
                        "Cue",
                        opt.label,
                      ),
                  ).map((opt) => {
                    const active = c.sound.cue === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          playPlaygroundSound(
                            { ...c.sound, cue: opt.value, enabled: true },
                            { force: true },
                          );
                          onChange({
                            ...c,
                            sound: { ...c.sound, cue: opt.value, enabled: true },
                          });
                        }}
                        className={`rounded-lg px-2.5 py-1.5 text-left text-[12px] font-medium transition active:scale-[0.97] ${
                          active
                            ? "bg-zinc-900 text-white"
                            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {shouldShowControl(
              searchQuery,
              visibility,
              "soundVolume",
              "Volume",
              SECTION_LABELS.sound,
            ) && (
              <div className={c.sound.enabled ? "" : "opacity-60"}>
                <Slider
                  label="Volume"
                  value={c.sound.volume}
                  min={0}
                  max={1}
                  step={0.05}
                  displayValue={`${Math.round(c.sound.volume * 100)}%`}
                  onChange={(volume) => {
                    playPlaygroundSound(
                      { ...c.sound, volume, enabled: true },
                      { force: true },
                    );
                    onChange({ ...c, sound: { ...c.sound, volume, enabled: true } });
                  }}
                />
              </div>
            )}
            {(!searching ||
              matchesPanelSearch(
                searchQuery,
                SECTION_LABELS.sound,
                "Cuelume interaction sounds",
              )) && (
              <p className="text-[12px] leading-relaxed text-zinc-400">
                Cuelume interaction sounds play when you press a component in the
                preview and are included in the copied code when this section is
                available for the selected component.
              </p>
            )}
          </Accordion>
        )}

        {searching && !visibleSections && (
          <p className="px-2.5 py-3 text-[13px] text-zinc-400">
            No customization options match your search.
          </p>
        )}
    </div>
  );
}

export function CustomizationPanel({
  familyId,
  tabId,
  value,
  onChange,
}: {
  familyId: string;
  tabId: string;
  value: Customization;
  onChange: (next: Customization) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <SidebarSearch
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search options…"
        aria-label="Search customization options"
      />
      <PlaygroundPanelScroll>
        <CustomizationPanelSections
          familyId={familyId}
          tabId={tabId}
          value={value}
          onChange={onChange}
          searchQuery={searchQuery}
        />
      </PlaygroundPanelScroll>
    </div>
  );
}
