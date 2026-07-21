"use client";

import { ClearSearchIcon, SearchIcon } from "@/components/icons";
import { PLAYGROUND_CONTROL_HEIGHT_CLASS } from "./constants";

export function SidebarSearch({
  value,
  onChange,
  placeholder = "Search…",
  "aria-label": ariaLabel = "Search",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  "aria-label"?: string;
}) {
  const hasValue = value.length > 0;

  return (
    <div className="relative z-10 mb-3 shrink-0 overflow-visible bg-[#fafafa] px-0.5 pt-0.5 pb-1.5">
      <div className="relative overflow-visible">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          role="searchbox"
          enterKeyHint="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          className={`box-border ${PLAYGROUND_CONTROL_HEIGHT_CLASS} w-full appearance-none rounded-xl border border-solid border-[#f4f4f4] bg-white pl-9 text-[13px] text-zinc-700 shadow-none transition-[border-color] placeholder:text-zinc-400 hover:border-[#eee] focus:border-[#eee] focus:outline-none ${
            hasValue ? "pr-9" : "pr-3"
          }`}
        />
        {hasValue && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onChange("")}
            className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 active:scale-[0.97]"
          >
            <ClearSearchIcon className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
