import {
  DEFAULT_CUSTOMIZATION,
  type Customization,
  decodeCustomization,
  encodeCustomization,
} from "./customization";

const STORAGE_KEY = "harman-ui:customizations";

/** Stable key for a single playground preview item (family + tab + variant). */
export function customizationScopeKey(
  familyId: string,
  tabId: string,
  itemId: string,
): string {
  return `${familyId}:${tabId}:${itemId}`;
}

export function resolveCustomization(
  map: Record<string, Customization>,
  key: string,
): Customization {
  return map[key] ?? DEFAULT_CUSTOMIZATION;
}

export function loadCustomizationsFromStorage(): Record<string, Customization> {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const encoded = JSON.parse(raw) as Record<string, string>;
    const map: Record<string, Customization> = {};

    for (const [key, value] of Object.entries(encoded)) {
      map[key] = decodeCustomization(value);
    }

    return map;
  } catch {
    return {};
  }
}

export function saveCustomizationsToStorage(map: Record<string, Customization>): void {
  if (typeof window === "undefined") return;

  try {
    const encoded: Record<string, string> = {};
    for (const [key, value] of Object.entries(map)) {
      encoded[key] = encodeCustomization(value);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(encoded));
  } catch {
    // Ignore quota / private-mode failures.
  }
}
