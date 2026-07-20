"use client";

import { ClearSearchIcon, SearchIcon } from "@/components/icons";

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
    <div className="relative z-10 mb-3 shrink-0 bg-[#fafafa] pb-1">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          role="searchbox"
          enterKeyHint="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          className={`h-9 w-full rounded-xl bg-white pl-9 text-[13px] text-zinc-700 ring-1 ring-zinc-100 transition placeholder:text-zinc-400 focus:ring-zinc-300 focus:outline-none ${
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
