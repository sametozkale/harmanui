"use client";

import { useEffect, useRef, useState } from "react";
import { PLAYGROUND_PANEL_SCROLL_CLASS } from "./constants";

/** Scroll distance (px) over which the top fade reaches full strength. */
const FADE_SCROLL_DISTANCE = 48;

export function PlaygroundPanelScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeOpacity, setFadeOpacity] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateFade = () => {
      setFadeOpacity(Math.min(el.scrollTop / FADE_SCROLL_DISTANCE, 1));
    };

    updateFade();
    el.addEventListener("scroll", updateFade, { passive: true });
    return () => el.removeEventListener("scroll", updateFade);
  }, []);

  return (
    <div className="relative min-h-0 flex-1">
      <div ref={scrollRef} className={PLAYGROUND_PANEL_SCROLL_CLASS}>
        {children}
      </div>
      <div
        aria-hidden
        className="playground-panel-scroll-fade pointer-events-none absolute inset-x-0 top-0 z-10 transition-opacity duration-300 ease-out"
        style={{ opacity: fadeOpacity }}
      />
    </div>
  );
}
