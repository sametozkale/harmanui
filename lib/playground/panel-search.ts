export function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function matchesPanelSearch(
  query: string,
  ...labels: Array<string | undefined | null>
): boolean {
  const normalized = normalizeSearchQuery(query);
  if (!normalized) return true;
  return labels.some((label) => label?.toLowerCase().includes(normalized));
}
