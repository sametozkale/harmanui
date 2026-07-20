/**
 * Playground sound panel helpers — built on {@link interaction-sound}.
 */

import { sounds, type SoundName } from "cuelume";
import {
  DEFAULT_SOUND_CUE,
  playInteractionSound,
  shouldPlayInteractionSound,
  type InteractionSoundSettings,
} from "@/lib/interaction-sound";

export type { SoundName };
export { sounds };
export { shouldPlayInteractionSound as shouldPlayPreviewInteractionSound };

export type PlaygroundSoundSettings = InteractionSoundSettings;

export const SOUND_LABELS: Record<SoundName, string> = {
  chime: "Chime",
  sparkle: "Sparkle",
  droplet: "Droplet",
  bloom: "Bloom",
  whisper: "Whisper",
  tick: "Tick",
  press: "Press",
  release: "Release",
  toggle: "Toggle",
  success: "Success",
  error: "Error",
  page: "Page",
  loading: "Loading",
  ready: "Ready",
};

export const SOUND_OPTIONS = sounds.map((value) => ({
  value,
  label: SOUND_LABELS[value],
}));

export { DEFAULT_SOUND_CUE } from "@/lib/interaction-sound";

/** Playground helper — respects `enabled` unless `force` (sound panel previews). */
export function playPlaygroundSound(
  sound: PlaygroundSoundSettings,
  options?: { force?: boolean },
): void {
  playInteractionSound(sound, options);
}

/** @deprecated Use {@link playPlaygroundSound} */
export function playInterfaceSound(
  cue: SoundName = DEFAULT_SOUND_CUE,
  volume = 0.4,
): void {
  playInteractionSound({ enabled: true, cue, volume }, { force: true });
}

/** @deprecated Use {@link playPlaygroundSound} */
export function playTick(volume = 0.4): void {
  playInterfaceSound(DEFAULT_SOUND_CUE, volume);
}
