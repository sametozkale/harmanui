import { styleEntries, type Customization } from "./customization";
import type { CustomizeVisibility } from "./customize-capabilities";

function shadowControlsVisible(visibility: CustomizeVisibility): boolean {
  return (
    visibility.shadowPreset || visibility.shadowColor || visibility.shadowOpacity
  );
}

function isStyleEntryVisible(
  key: string,
  visibility: CustomizeVisibility,
): boolean {
  switch (key) {
    case "fontFamily":
      return visibility.fontFamily;
    case "fontSize":
      return visibility.fontSize;
    case "fontWeight":
      return visibility.fontWeight;
    case "letterSpacing":
      return visibility.letterSpacing;
    case "whiteSpace":
      return visibility.wrap;
    case "gap":
      return visibility.gap;
    case "--radius":
      return visibility.radius;
    case "paddingLeft":
    case "paddingRight":
      return visibility.customPadding && visibility.paddingX;
    case "paddingTop":
    case "paddingBottom":
      return visibility.customPadding && visibility.paddingY;
    case "backgroundColor":
      return visibility.colorOverride && visibility.background;
    case "color":
      return visibility.colorOverride && visibility.text;
    case "borderColor":
    case "borderStyle":
      return visibility.colorOverride && visibility.border;
    case "borderWidth":
      return visibility.colorOverride && visibility.borderWidth;
    case "boxShadow":
      return shadowControlsVisible(visibility);
    case "transitionProperty":
      return visibility.duration || visibility.easing || visibility.hover;
    case "transitionDuration":
      return visibility.duration;
    case "transitionTimingFunction":
      return visibility.easing;
    default:
      return true;
  }
}

export function filterStyleEntries(
  customization: Customization,
  visibility: CustomizeVisibility,
): Array<[string, string | number]> {
  return styleEntries(customization).filter(([key]) =>
    isStyleEntryVisible(key, visibility),
  );
}
