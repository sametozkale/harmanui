/**
 * Middle preview panel: the pill tab menu + the #fafafa stage.
 *
 * Shows a single selected example inside the stage. A select in the top-left
 * corner picks the variant / size / state via a HeroUI Select; the selection drives
 * and the "Copy code" output. All examples reflect customization in real time.
 */
"use client";

import { useMemo, type PointerEvent } from "react";
import type { CSSProperties } from "react";
import { Header, ListBox, Select } from "@heroui/react";
import type { ComponentFamily, PreviewItem } from "@/lib/registry/types";
import type { Customization } from "@/lib/theme/customization";
import { renderPreview } from "@/components/registry/render";
import { Reset } from "@/lib/icons";
import { playPlaygroundSound, shouldPlayPreviewInteractionSound } from "@/lib/sound";
import { PLAYGROUND_SURFACE_CLASS } from "./constants";

const previewPickerTriggerClass =
  "!h-9 !min-w-[148px] !rounded-xl !border-0 !bg-white !py-2 !pl-3 !pr-7 !text-[13px] !font-medium !text-zinc-700 !shadow-[0_1px_2px_rgba(0,0,0,0.04)] !ring-1 !ring-[#f4f4f4] transition hover:!bg-white hover:!ring-zinc-300 data-[focus-visible]:!bg-white data-[focus-visible]:!ring-2 data-[focus-visible]:!ring-zinc-900/10";

function PreviewPicker({
  groups,
  value,
  onChange,
}: {
  groups: ComponentFamily["tabs"][number]["groups"];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <Select
      aria-label="Preview variant"
      selectedKey={value}
      onSelectionChange={(key) => {
        if (key != null) onChange(String(key));
      }}
      className="min-w-[148px]"
    >
      <Select.Trigger className={previewPickerTriggerClass}>
        <Select.Value className="!text-[13px] !font-medium !text-zinc-700" />
        <Select.Indicator className="!text-zinc-400" />
      </Select.Trigger>
      <Select.Popover placement="bottom start">
        <ListBox className="outline-none">
          {groups.map((group) => (
            <ListBox.Section key={group.id}>
              {groups.length > 1 && (
                <Header className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                  {group.label}
                </Header>
              )}
              {group.items.map((item) => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.label}>
                  {item.label}
                </ListBox.Item>
              ))}
            </ListBox.Section>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

export function PreviewTabMenu({
  family,
  activeTabId,
  onTabChange,
  className = "",
}: {
  family: ComponentFamily;
  activeTabId: string;
  onTabChange: (id: string) => void;
  className?: string;
}) {
  if (family.tabs.length <= 1) return null;

  const tab = family.tabs.find((t) => t.id === activeTabId) ?? family.tabs[0];

  return (
    <div
      className={`mb-4 inline-flex w-fit shrink-0 gap-1 self-start rounded-2xl bg-zinc-100/80 p-1 ${className}`}
    >
      {family.tabs.map((t) => {
        const active = t.id === tab.id;
        return (
          <button
            key={t.id}
            type="button"
            aria-pressed={active}
            onClick={() => onTabChange(t.id)}
            className={`rounded-xl px-4 py-2 text-[13px] font-medium transition active:scale-[0.98] ${
              active
                ? "bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.06)]"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export function PreviewStage({
  family,
  activeTabId,
  selectedItemId,
  onSelectItem,
  previewStyle,
  previewClassName,
  customization,
  sound,
  onReset,
  className = "",
}: {
  family: ComponentFamily;
  activeTabId: string;
  selectedItemId: string;
  onSelectItem: (id: string) => void;
  previewStyle: CSSProperties;
  previewClassName: string;
  customization: Customization;
  sound: Customization["sound"];
  onReset: () => void;
  className?: string;
}) {
  const tab = family.tabs.find((t) => t.id === activeTabId) ?? family.tabs[0];

  const pickerItems = useMemo(
    () => tab.groups.flatMap((group) => group.items),
    [tab],
  );
  const showPicker = pickerItems.length > 1;

  const selectedItem = useMemo((): PreviewItem | undefined => {
    for (const group of tab.groups) {
      const found = group.items.find((item) => item.id === selectedItemId);
      if (found) return found;
    }
    return tab.groups[0]?.items[0];
  }, [tab, selectedItemId]);

  const handlePreviewPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!shouldPlayPreviewInteractionSound(event.target)) return;
    playPlaygroundSound(sound);
  };

  return (
    <div
      className={`relative flex h-full min-h-[240px] flex-col items-center justify-center overflow-hidden ${PLAYGROUND_SURFACE_CLASS} ${className}`}
    >
      <div className="absolute right-5 top-5">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12.5px] font-medium text-zinc-500 transition hover:bg-white/70 hover:text-zinc-900 active:scale-[0.97]"
        >
          <Reset className="size-3.5" strokeWidth={2} />
          Reset
        </button>
      </div>

      {selectedItem && (
        <>
          {showPicker && (
            <div className="absolute left-5 top-5">
              <PreviewPicker
                groups={tab.groups}
                value={selectedItem.id}
                onChange={onSelectItem}
              />
            </div>
          )}

          <div
            className="flex items-center justify-center"
            onPointerDownCapture={handlePreviewPointerDown}
          >
            {renderPreview(family.id, tab.component, selectedItem, {
              style: previewStyle,
              className: previewClassName,
              customization,
            })}
          </div>
        </>
      )}
    </div>
  );
}

/** @deprecated Use {@link PreviewTabMenu} + {@link PreviewStage} in the playground grid. */
export function Preview({
  family,
  activeTabId,
  onTabChange,
  selectedItemId,
  onSelectItem,
  previewStyle,
  previewClassName,
  customization,
  sound,
  onReset,
}: {
  family: ComponentFamily;
  activeTabId: string;
  onTabChange: (id: string) => void;
  selectedItemId: string;
  onSelectItem: (id: string) => void;
  previewStyle: CSSProperties;
  previewClassName: string;
  customization: Customization;
  sound: Customization["sound"];
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PreviewTabMenu
        family={family}
        activeTabId={activeTabId}
        onTabChange={onTabChange}
      />
      <PreviewStage
        family={family}
        activeTabId={activeTabId}
        selectedItemId={selectedItemId}
        onSelectItem={onSelectItem}
        previewStyle={previewStyle}
        previewClassName={previewClassName}
        customization={customization}
        sound={sound}
        onReset={onReset}
        className="min-h-0 flex-1"
      />
    </div>
  );
}
