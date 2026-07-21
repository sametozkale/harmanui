"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const PAGE_EASE = [0.2, 0, 0, 1] as const;

export const PAGE_REVEAL_TRANSITION = {
  duration: 0.5,
  ease: PAGE_EASE,
} as const;

/** Resets on full page reload; persists across client-side navigations. */
let headerIntroPlayedThisLoad = false;
let headerIntroBatchResolved = false;
let headerIntroBatchShouldAnimate = false;

/** Call once per header mount so all HeaderReveal instances share one decision. */
export function resetHeaderIntroBatch() {
  headerIntroBatchResolved = false;
}

function resolveHeaderIntroAnimation(reduceMotion: boolean | null): boolean {
  if (!headerIntroBatchResolved) {
    headerIntroBatchResolved = true;
    headerIntroBatchShouldAnimate = !reduceMotion && !headerIntroPlayedThisLoad;
    if (headerIntroBatchShouldAnimate) {
      headerIntroPlayedThisLoad = true;
    }
  }
  return headerIntroBatchShouldAnimate;
}

/** Stagger delay in seconds — step 0 is the first beat. */
export function revealDelay(step: number, gap = 0.07): number {
  return 0.04 + step * gap;
}

/**
 * Header-only reveal — plays on full page reload, skipped on client navigations.
 *
 * Renders a static shell until mount to keep SSR and hydration aligned.
 */
export function HeaderReveal({
  children,
  delay = 0,
  y = 8,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(resolveHeaderIntroAnimation(reduceMotion));
    setMounted(true);
  }, [reduceMotion]);

  if (!mounted || reduceMotion || !shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...PAGE_REVEAL_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Page content reveal — runs on every mount (route change included).
 */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...PAGE_REVEAL_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
}
