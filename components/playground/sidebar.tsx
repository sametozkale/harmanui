/**
 * Left sidebar — component families grouped into collapsible buckets.
 *
 * Grouped by family, never by variant (Button, ButtonGroup and IconButton all
 * live under a single "Button" entry; their variants live in the tab menu).
 * First category is open by default; the rest start collapsed.
 */
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SIDEBAR } from "@/lib/registry/registry";
import { CategoryIcon } from "@/components/icons";
import { ChevronDown } from "@/lib/icons";
import {
  matchesPanelSearch,
  normalizeSearchQuery,
} from "@/lib/playground/panel-search";
import { PlaygroundPanelScroll } from "./panel-scroll";
import { SidebarSearch } from "./sidebar-search";

const CATEGORY_EASE = [0.2, 0, 0, 1] as const;
const CATEGORY_TRANSITION = { duration: 0.28, ease: CATEGORY_EASE };

function categoryIdForFamily(familyId: string): string | undefined {
  return SIDEBAR.find((cat) => cat.items.some((item) => item.id === familyId))?.id;
}

export function Sidebar({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(SIDEBAR.map((cat, i) => [cat.id, i < 1])),
  );

  const searching = normalizeSearchQuery(searchQuery).length > 0;

  const filteredSidebar = useMemo(() => {
    if (!searching) return SIDEBAR;

    return SIDEBAR.map((cat) => {
      const categoryMatches = matchesPanelSearch(searchQuery, cat.title);
      const items = cat.items.filter(
        (item) => categoryMatches || matchesPanelSearch(searchQuery, item.label),
      );
      return { ...cat, items };
    }).filter((cat) => cat.items.length > 0);
  }, [searchQuery, searching]);

  const activeCategoryId = categoryIdForFamily(activeId);
  const effectiveOpen = useMemo(() => {
    if (!activeCategoryId || open[activeCategoryId]) return open;
    return { ...open, [activeCategoryId]: true };
  }, [open, activeCategoryId]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <SidebarSearch
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search components…"
        aria-label="Search components"
      />

      <PlaygroundPanelScroll>
        <nav aria-label="Components" className="flex flex-col gap-1">
        {filteredSidebar.length === 0 ? (
          <p className="px-2.5 py-3 text-[13px] text-zinc-400">No components match your search.</p>
        ) : (
          filteredSidebar.map((cat) => {
            const expanded = searching ? true : (effectiveOpen[cat.id] ?? false);
            const panelId = `sidebar-${cat.id}`;

            return (
              <div key={cat.id}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpen((prev) => ({ ...prev, [cat.id]: !prev[cat.id] }))
                  }
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl p-2.5 text-left transition hover:bg-zinc-100/80"
                >
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center ${cat.accent}`}
                  >
                    <CategoryIcon name={cat.icon} className="size-5" />
                  </span>
                  <span className="font-title flex-1 text-[14px] font-semibold text-zinc-900">
                    {cat.title}
                  </span>
                  <motion.span
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={CATEGORY_TRANSITION}
                    className="inline-flex opacity-0 transition-opacity duration-200 group-hover/component-sidebar:opacity-100"
                  >
                    <ChevronDown
                      className="size-4 shrink-0 text-zinc-400"
                      strokeWidth={2}
                    />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={panelId}
                      key="items"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={CATEGORY_TRANSITION}
                      className="overflow-hidden"
                    >
                      <ul className="flex w-full flex-col gap-0.5 pb-3 pt-0.5">
                        {cat.items.map((item) => {
                          const ready = item.status === "ready";
                          const active = ready && item.id === activeId;
                          return (
                            <li key={item.id} className="w-full">
                              <button
                                type="button"
                                disabled={!ready}
                                onClick={() => ready && onSelect(item.id)}
                                aria-current={active ? "page" : undefined}
                                className={`group relative flex w-full items-center justify-between gap-3 rounded-xl py-1.5 pr-2.5 pl-10 text-left text-[14px] whitespace-nowrap transition ${
                                  active
                                    ? "cursor-pointer bg-white font-medium text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                                    : ready
                                      ? "cursor-pointer text-zinc-400 hover:bg-white/70 hover:text-zinc-700"
                                      : "cursor-not-allowed text-zinc-300"
                                }`}
                              >
                                {active ? (
                                  <span
                                    className={`absolute top-1/2 left-[17px] size-1.5 -translate-y-1/2 rounded-[2px] bg-current ${cat.accent}`}
                                    aria-hidden
                                  />
                                ) : null}
                                <span>{item.label}</span>
                                {!ready && (
                                  <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
                                    Soon
                                  </span>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
        </nav>
      </PlaygroundPanelScroll>
    </div>
  );
}
