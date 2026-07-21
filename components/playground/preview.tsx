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
import { AnimatePresence, motion } from "framer-motion";
import { Header, ListBox, Select } from "@heroui/react";
import type { ComponentFamily, PreviewItem } from "@/lib/registry/types";
import type { Customization } from "@/lib/theme/customization";
import { renderPreview } from "@/components/registry/render";
import { Reset } from "@/lib/icons";
import { playPlaygroundSound, shouldPlayPreviewInteractionSound } from "@/lib/sound";
import { PLAYGROUND_SURFACE_CLASS, PLAYGROUND_CONTROL_HEIGHT_CLASS, PLAYGROUND_CONTROL_HEIGHT_IMPORTANT_CLASS, PLAYGROUND_TAB_MENU_COMPACT_CLASS, playgroundTabMenuButtonClass } from "./constants";

const previewPickerTriggerClass =
  `${PLAYGROUND_CONTROL_HEIGHT_IMPORTANT_CLASS} !min-w-[148px] !cursor-pointer !rounded-xl !border-0 !bg-white !py-2 !pl-3 !pr-7 !text-[13px] !font-medium !text-zinc-700 !shadow-[0_1px_2px_rgba(0,0,0,0.04)] !ring-1 !ring-[#f4f4f4] transition hover:!bg-white hover:!ring-[#eee] data-[focus-visible]:!bg-white data-[focus-visible]:!ring-2 data-[focus-visible]:!ring-zinc-900/10`;

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
  const showTabs = family.tabs.length > 1;
  const tab = family.tabs.find((t) => t.id === activeTabId) ?? family.tabs[0];

  return (
    <div className={`min-w-0 ${className}`}>
      <AnimatePresence initial={false}>
        {showTabs && (
          <motion.div
            key="tab-menu"
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: "auto", opacity: 1, marginBottom: 16 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden"
          >
            <div
              className={PLAYGROUND_TAB_MENU_COMPACT_CLASS}
              role="tablist"
              aria-label={`${family.name} variants`}
            >
              {family.tabs.map((t) => {
                const active = t.id === tab.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => onTabChange(t.id)}
                    className={playgroundTabMenuButtonClass(active)}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
          className={`flex ${PLAYGROUND_CONTROL_HEIGHT_CLASS} cursor-pointer items-center gap-1.5 rounded-xl px-2.5 text-[13px] font-medium text-zinc-500 transition hover:bg-zinc-100/80 hover:text-zinc-900 active:scale-[0.97]`}
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
