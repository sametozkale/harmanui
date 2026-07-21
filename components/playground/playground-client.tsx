/**
 * Playground shell — owns all state and composes the three columns.
 *
 * Customization is stored per preview item (`family:tab:variant`). Switching
 * components restores that item's saved settings; URL `c` encodes only the
 * active item for sharing.
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  type Customization,
  buildPreviewStyle,
  buildPreviewClassName,
  encodeCustomization,
  decodeCustomization,
} from "@/lib/theme/customization";
import {
  customizationScopeKey,
  loadCustomizationsFromStorage,
  resolveCustomization,
  saveCustomizationsToStorage,
} from "@/lib/theme/customization-store";
import { getPreviewMotionOptions } from "@/lib/theme/customize-capabilities";
import { FAMILIES, GITHUB_REPO } from "@/lib/registry/registry";
import type { PreviewItem } from "@/lib/registry/types";
import { generateCode } from "@/lib/codegen/generate";
import { PLAYGROUND_PANEL_SHELL_CLASS, PLAYGROUND_STAGE_ROW_CLASS } from "./constants";
import { Sidebar } from "./sidebar";
import { PreviewStage, PreviewTabMenu } from "./preview";
import { CtaStrip } from "./cta-strip";
import { AboutButton } from "./about-button";
import { ViewGithubLink } from "./view-github-link";
import { CustomizationPanel } from "./customization-panel";
import { PlaygroundProviders } from "./providers";
import { Reveal, revealDelay } from "@/components/motion/page-reveal";

const DEFAULT_FAMILY = "button";

/** Merged families — old sidebar ids redirect to parent + tab. */
const LEGACY_FAMILY_ALIASES: Record<string, { family: string; tab: string }> = {
  "toggle-button-group": { family: "toggle-button", tab: "toggle-button-group" },
  "checkbox-group": { family: "checkbox", tab: "checkbox-group" },
  "switch-group": { family: "switch", tab: "switch-group" },
  "progress-bar": { family: "progress-circle", tab: "progress-bar" },
  "input-group": { family: "input", tab: "input-group" },
  "color-picker": { family: "color", tab: "color-picker" },
  "color-field": { family: "color", tab: "color-field" },
  "color-swatch-picker": { family: "color", tab: "color-swatch-picker" },
};

function resolveFamilyFromUrl(f: string | null, t: string | null) {
  const alias = f ? LEGACY_FAMILY_ALIASES[f] : undefined;
  const familyId = alias?.family ?? f;
  if (!familyId || !FAMILIES[familyId]) return null;
  const tabId =
    t && FAMILIES[familyId].tabs.some((tab) => tab.id === t)
      ? t
      : alias?.tab ?? FAMILIES[familyId].tabs[0].id;
  return { familyId, tabId };
}

function firstItemId(familyId: string, tabId: string): string {
  const tab = FAMILIES[familyId].tabs.find((t) => t.id === tabId);
  return tab?.groups[0]?.items[0]?.id ?? "";
}

function findItem(familyId: string, tabId: string, itemId: string): PreviewItem | undefined {
  const tab = FAMILIES[familyId].tabs.find((t) => t.id === tabId);
  for (const g of tab?.groups ?? []) {
    const found = g.items.find((i) => i.id === itemId);
    if (found) return found;
  }
  return tab?.groups[0]?.items[0];
}

export function PlaygroundClient() {
  const [familyId, setFamilyId] = useState(DEFAULT_FAMILY);
  const [tabId, setTabId] = useState(FAMILIES[DEFAULT_FAMILY].tabs[0].id);
  const [itemId, setItemId] = useState(
    FAMILIES[DEFAULT_FAMILY].tabs[0].groups[0].items[0].id,
  );
  const [customizations, setCustomizations] = useState<Record<string, Customization>>(
    {},
  );
  const hydrated = useRef(false);

  const customizationKey = useMemo(
    () => customizationScopeKey(familyId, tabId, itemId),
    [familyId, tabId, itemId],
  );

  const customization = useMemo(
    () => resolveCustomization(customizations, customizationKey),
    [customizations, customizationKey],
  );

  const handleCustomizationChange = useCallback(
    (next: Customization) => {
      setCustomizations((prev) => ({ ...prev, [customizationKey]: next }));
    },
    [customizationKey],
  );

  const handleResetCustomization = useCallback(() => {
    setCustomizations((prev) => {
      if (!(customizationKey in prev)) return prev;
      const next = { ...prev };
      delete next[customizationKey];
      return next;
    });
  }, [customizationKey]);

  // Read shareable state from the URL once, after mount (avoids hydration
  // mismatch — server always renders the defaults).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const f = params.get("f");
    const t = params.get("t");
    const v = params.get("v");
    const c = params.get("c");

    let nextFamily = DEFAULT_FAMILY;
    let nextTab = FAMILIES[DEFAULT_FAMILY].tabs[0].id;
    let nextItem = firstItemId(nextFamily, nextTab);

    const resolved = resolveFamilyFromUrl(f, t);
    if (resolved) {
      nextFamily = resolved.familyId;
      nextTab = resolved.tabId;
      nextItem =
        v && findItem(nextFamily, nextTab, v)
          ? v
          : firstItemId(nextFamily, nextTab);
      setFamilyId(nextFamily);
      setTabId(nextTab);
      setItemId(nextItem);
    }

    const stored = loadCustomizationsFromStorage();
    if (c) {
      stored[customizationScopeKey(nextFamily, nextTab, nextItem)] =
        decodeCustomization(c);
    }

    setCustomizations(stored);
    hydrated.current = true;
  }, []);

  // Persist per-item customizations locally.
  useEffect(() => {
    if (!hydrated.current) return;
    const id = setTimeout(() => saveCustomizationsToStorage(customizations), 300);
    return () => clearTimeout(id);
  }, [customizations]);

  // Write shareable state back to the URL (debounced).
  useEffect(() => {
    if (!hydrated.current) return;
    const id = setTimeout(() => {
      const params = new URLSearchParams();
      params.set("f", familyId);
      params.set("t", tabId);
      params.set("v", itemId);
      params.set("c", encodeCustomization(customization));
      window.history.replaceState(null, "", `?${params.toString()}`);
    }, 250);
    return () => clearTimeout(id);
  }, [familyId, tabId, itemId, customization]);

  const family = FAMILIES[familyId];
  const tab = family.tabs.find((t) => t.id === tabId) ?? family.tabs[0];
  const selectedItem = useMemo(
    () => findItem(familyId, tabId, itemId),
    [familyId, tabId, itemId],
  );

  const previewStyle = useMemo(() => buildPreviewStyle(customization), [customization]);
  const motionOptions = useMemo(
    () => getPreviewMotionOptions(familyId, tabId, customization, selectedItem?.id),
    [familyId, tabId, customization, selectedItem?.id],
  );
  const previewClassName = useMemo(
    () => buildPreviewClassName(customization, motionOptions),
    [customization, motionOptions],
  );
  const code = useMemo(
    () =>
      selectedItem
        ? generateCode({
            familyId,
            tab,
            itemId: selectedItem.id,
            props: selectedItem.props,
            customization,
          })
        : "",
    [familyId, tab, selectedItem, customization],
  );

  const handleSelectFamily = useCallback((id: string) => {
    setFamilyId(id);
    const first = FAMILIES[id].tabs[0];
    setTabId(first.id);
    setItemId(first.groups[0].items[0].id);
  }, []);

  const handleTabChange = useCallback(
    (id: string) => {
      setTabId(id);
      setItemId(firstItemId(familyId, id));
    },
    [familyId],
  );

  return (
    <div className="h-full min-h-0">
      <PlaygroundProviders>
        <div className="flex h-full min-h-0 flex-col overflow-hidden px-12 py-8">
        <div className="grid h-full min-h-0 flex-1 grid-cols-1 items-stretch gap-x-6 overflow-hidden [grid-template-rows:auto_auto_minmax(0,1fr)_auto] lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_320px]">
          {/* Row 1 — page title (middle column only) */}
          <Reveal
            delay={revealDelay(0)}
            className="col-start-1 row-start-1 mb-6 min-w-0 shrink-0 lg:col-start-2"
          >
            <h1 className="font-title text-[22px] font-semibold text-zinc-900">
              {family.name}
            </h1>
            <p className="mt-1 w-full truncate text-[13.5px] leading-relaxed text-zinc-500">
              {family.description}
            </p>
          </Reveal>

          {/* Row 2 — variant tabs (middle column) */}
          <div className="hidden lg:col-start-1 lg:row-start-2 lg:block" aria-hidden />
          <Reveal
            delay={revealDelay(1)}
            y={10}
            className="col-start-1 row-start-2 self-start lg:col-start-2"
          >
            <PreviewTabMenu
              family={family}
              activeTabId={tab.id}
              onTabChange={handleTabChange}
            />
          </Reveal>
          <div className="hidden xl:col-start-3 xl:row-start-2 xl:block" aria-hidden />

          {/* Row 3 — stage row (shared height across all columns) */}
          <Reveal
            delay={revealDelay(2)}
            y={18}
            className={`group/component-sidebar col-start-1 row-start-3 hidden min-h-0 ${PLAYGROUND_STAGE_ROW_CLASS} lg:col-start-1 lg:flex`}
          >
            <aside className="flex min-h-0 w-full flex-1 flex-col">
              <div className={PLAYGROUND_PANEL_SHELL_CLASS}>
                <Sidebar activeId={familyId} onSelect={handleSelectFamily} />
              </div>
            </aside>
          </Reveal>

          <Reveal
            delay={revealDelay(3)}
            y={18}
            className={`col-start-1 row-start-3 min-h-0 ${PLAYGROUND_STAGE_ROW_CLASS} lg:col-start-2`}
          >
            <PreviewStage
              family={family}
              activeTabId={tab.id}
              selectedItemId={itemId}
              onSelectItem={setItemId}
              previewStyle={previewStyle}
              previewClassName={previewClassName}
              customization={customization}
              sound={customization.sound}
              onReset={handleResetCustomization}
              className="h-full min-h-0"
            />
          </Reveal>

          <Reveal
            delay={revealDelay(4)}
            y={18}
            className={`group/customize-panel col-start-1 row-start-5 min-h-0 ${PLAYGROUND_STAGE_ROW_CLASS} lg:col-span-2 lg:max-h-[min(50vh,520px)] lg:row-start-5 xl:col-span-1 xl:max-h-full xl:col-start-3 xl:row-start-3`}
          >
            <aside className="flex min-h-0 h-full w-full flex-1 flex-col">
              <div className={PLAYGROUND_PANEL_SHELL_CLASS}>
                <CustomizationPanel
                  key={customizationKey}
                  familyId={familyId}
                  tabId={tab.id}
                  itemId={selectedItem?.id}
                  value={customization}
                  onChange={handleCustomizationChange}
                />
              </div>
            </aside>
          </Reveal>

          {/* Row 4 — About (sidebar) + CTA strip (middle) + GitHub (customize column, xl) */}
          <Reveal
            delay={revealDelay(5)}
            y={10}
            className="mt-3 hidden shrink-0 lg:col-start-1 lg:row-start-4 lg:flex"
          >
            <AboutButton />
          </Reveal>
          <Reveal
            delay={revealDelay(5.5)}
            y={10}
            className="col-start-1 row-start-4 lg:col-start-2"
          >
            <CtaStrip code={code} install={family.install} />
          </Reveal>
          <Reveal
            delay={revealDelay(6)}
            y={10}
            className="mt-3 hidden shrink-0 items-center justify-end xl:col-start-3 xl:row-start-4 xl:flex"
          >
            <ViewGithubLink href={GITHUB_REPO} />
          </Reveal>
        </div>
        </div>
      </PlaygroundProviders>
    </div>
  );
}
