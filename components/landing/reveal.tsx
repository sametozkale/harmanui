/**
 * Scroll-triggered reveal for editorial pages.
 *
 * Content renders visible by default (SSR / no-JS safe). On mount, elements
 * still below the fold are hidden and revealed once via IntersectionObserver.
 * Respects prefers-reduced-motion by never hiding anything.
 */
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Transition delay in ms, applied when the element reveals. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    setHidden(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      } ${className}`}
      style={hidden ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
