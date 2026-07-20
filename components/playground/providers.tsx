/**
 * Playground runtime providers — i18n for date/calendar fields.
 *
 * Toast uses a per-preview Toast.Provider in the toast family spec; a global
 * ToastProvider must not wrap the playground shell because HeroUI's region
 * only renders its children when the toast queue is active.
 */
"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@heroui/react";

export function PlaygroundProviders({ children }: { children: ReactNode }) {
  return <I18nProvider locale="en-US">{children}</I18nProvider>;
}
