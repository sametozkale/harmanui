import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getCustomizeVisibility,
  sectionHasVisibleControls,
} from "./customize-capabilities";

describe("getCustomizeVisibility", () => {
  it("hides typography for icon-button tab", () => {
    const visibility = getCustomizeVisibility("button", "icon-button", "icon-primary");
    assert.equal(sectionHasVisibleControls("typography", visibility), false);
    assert.equal(visibility.fontFamily, false);
    assert.equal(visibility.fontSize, false);
  });

  it("shows typography for default button tab", () => {
    const visibility = getCustomizeVisibility("button", "button", "variant-primary");
    assert.equal(sectionHasVisibleControls("typography", visibility), true);
    assert.equal(visibility.fontFamily, true);
  });

  it("hides typography for close-button family", () => {
    const visibility = getCustomizeVisibility("close-button", "close-button", "cb-default");
    assert.equal(sectionHasVisibleControls("typography", visibility), false);
  });

  it("shows color and layout for modal overlay triggers", () => {
    const visibility = getCustomizeVisibility("modal", "modal", "mo-md");
    assert.equal(sectionHasVisibleControls("color", visibility), true);
    assert.equal(sectionHasVisibleControls("layout", visibility), true);
    assert.equal(visibility.background, true);
  });

  it("shows meaningful controls for progress bar tab", () => {
    const visibility = getCustomizeVisibility(
      "progress-circle",
      "progress-bar",
      "pb-50",
    );
    assert.equal(sectionHasVisibleControls("layout", visibility), true);
    assert.equal(sectionHasVisibleControls("color", visibility), true);
    assert.equal(sectionHasVisibleControls("typography", visibility), false);
  });

  it("limits accordion surface variant to Harman-supported controls", () => {
    const visibility = getCustomizeVisibility("accordion", "accordion", "ac-surface");
    assert.equal(sectionHasVisibleControls("typography", visibility), true);
    assert.equal(sectionHasVisibleControls("layout", visibility), true);
    assert.equal(visibility.customPadding, false);
    assert.equal(visibility.border, false);
    assert.equal(sectionHasVisibleControls("motion", visibility), false);
    assert.equal(sectionHasVisibleControls("sound", visibility), false);
  });

  it("hides typography controls for button-group tab", () => {
    const visibility = getCustomizeVisibility("button", "button-group", "group-sm");
    assert.equal(sectionHasVisibleControls("typography", visibility), false);
    assert.equal(sectionHasVisibleControls("color", visibility), false);
  });
});
