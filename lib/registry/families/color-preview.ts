/** Shared palette + default for color component previews and codegen. */
export const COLOR_PREVIEW_SWATCHES = [
  "#F43F5E",
  "#D946EF",
  "#8B5CF6",
  "#3B82F6",
  "#06B6D4",
  "#10B981",
  "#84CC16",
] as const;

export const COLOR_PREVIEW_DEFAULT = "#8B5CF6";

export function colorSwatchPickerItemsJsx(): string {
  return COLOR_PREVIEW_SWATCHES.map(
    (color) =>
      `        <ColorSwatchPicker.Item color="${color}">\n` +
      `          <ColorSwatchPicker.Swatch />\n` +
      `          <ColorSwatchPicker.Indicator />\n` +
      `        </ColorSwatchPicker.Item>`,
  ).join("\n");
}
