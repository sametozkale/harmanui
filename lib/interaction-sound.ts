/**
 * Interaction sound helpers — shared by the playground preview and generated code.
 *
 * Copy this file into your app (or keep the `@/lib/interaction-sound` import)
 * when using Harman UI's "Copy code" output with sound enabled.
 */

import { type SoundName } from "cuelume";
import { RECIPES } from "@/lib/cuelume-recipes";

export type { SoundName };

export type InteractionSoundSettings = {
  enabled: boolean;
  cue: SoundName;
  volume: number;
};

/** Default cue — crisp, neutral preview feedback. */
export const DEFAULT_SOUND_CUE: SoundName = "tick";

const SOURCE_STOP_PADDING = 0.05;
const CLEANUP_MARGIN = 0.05;
const INAUDIBLE_GAIN = 0.001;

let sharedContext: AudioContext | null = null;

/** Interactive targets that should trigger interface SFX. */
export const INTERACTION_SOUND_SELECTOR = [
  "button:not(:disabled)",
  "a[href]",
  "input:not(:disabled)",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  '[role="button"]:not([aria-disabled="true"])',
  '[role="switch"]:not([aria-disabled="true"])',
  '[role="checkbox"]:not([aria-disabled="true"])',
  '[role="radio"]:not([aria-disabled="true"])',
  '[role="slider"]',
  '[role="tab"]:not([aria-disabled="true"])',
  '[role="menuitem"]:not([aria-disabled="true"])',
  '[role="option"]',
  '[data-slot="trigger"]',
].join(", ");

export function shouldPlayInteractionSound(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest(INTERACTION_SOUND_SELECTOR));
}

type ToneLayer = {
  kind: "tone";
  waveform: OscillatorType;
  frequency: number;
  detune?: number;
  glideTo?: number;
  glideTime?: number;
  offset?: number;
  attack: number;
  decay: number;
  peak: number;
};

type NoiseLayer = {
  kind: "noise";
  filterType: BiquadFilterType;
  filterFrequency: number;
  filterQ?: number;
  offset?: number;
  attack: number;
  decay: number;
  peak: number;
};

type SoundLayer = ToneLayer | NoiseLayer;

type Shimmer = {
  delay: number;
  feedback: number;
  wet: number;
  lowpass: number;
};

type SoundRecipe = {
  masterGain: number;
  layers: SoundLayer[];
  shimmer?: Shimmer;
};

function getAudioContext(): AudioContext | null {
  if (sharedContext) return sharedContext;
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  try {
    sharedContext = new Ctor();
  } catch {
    return null;
  }
  return sharedContext;
}

function renderTone(
  context: AudioContext,
  destination: AudioNode,
  layer: ToneLayer,
  startTime: number,
) {
  const oscillator = context.createOscillator();
  oscillator.type = layer.waveform;
  oscillator.frequency.setValueAtTime(layer.frequency, startTime);
  if (layer.detune) oscillator.detune.value = layer.detune;
  if (layer.glideTo !== undefined) {
    const glideTime = layer.glideTime ?? layer.attack + layer.decay;
    oscillator.frequency.exponentialRampToValueAtTime(
      layer.glideTo,
      startTime + glideTime,
    );
  }
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(layer.peak, startTime + layer.attack);
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    startTime + layer.attack + layer.decay,
  );
  oscillator.connect(gain).connect(destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + layer.attack + layer.decay + SOURCE_STOP_PADDING);
}

function renderNoise(
  context: AudioContext,
  destination: AudioNode,
  layer: NoiseLayer,
  startTime: number,
) {
  const duration = layer.attack + layer.decay + SOURCE_STOP_PADDING;
  const length = Math.max(1, Math.floor(duration * context.sampleRate));
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = 2 * Math.random() - 1;
  const source = context.createBufferSource();
  source.buffer = buffer;
  const filter = context.createBiquadFilter();
  filter.type = layer.filterType;
  filter.frequency.value = layer.filterFrequency;
  if (layer.filterQ !== undefined) filter.Q.value = layer.filterQ;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(layer.peak, startTime + layer.attack);
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    startTime + layer.attack + layer.decay,
  );
  source.connect(filter).connect(gain).connect(destination);
  source.start(startTime);
  source.stop(startTime + duration);
}

function attachShimmer(
  context: AudioContext,
  source: AudioNode,
  destination: AudioNode,
  shimmer: Shimmer,
) {
  const delay = context.createDelay(1);
  delay.delayTime.value = shimmer.delay;
  const feedbackFilter = context.createBiquadFilter();
  feedbackFilter.type = "lowpass";
  feedbackFilter.frequency.value = shimmer.lowpass;
  const feedbackGain = context.createGain();
  feedbackGain.gain.value = shimmer.feedback;
  const wetGain = context.createGain();
  wetGain.gain.value = shimmer.wet;
  source.connect(delay);
  delay.connect(feedbackFilter);
  feedbackFilter.connect(feedbackGain);
  feedbackGain.connect(delay);
  feedbackFilter.connect(wetGain);
  wetGain.connect(destination);
  return [delay, feedbackFilter, feedbackGain, wetGain];
}

function sourceEnd(recipe: SoundRecipe) {
  return Math.max(
    ...recipe.layers.map(
      (layer) =>
        (layer.offset ?? 0) + layer.attack + layer.decay + SOURCE_STOP_PADDING,
    ),
  );
}

function shimmerTail(shimmer?: Shimmer) {
  if (!shimmer || shimmer.feedback <= 0) return 0;
  if (shimmer.feedback >= 1) return shimmer.delay;
  return (
    shimmer.delay *
    (1 + Math.ceil(Math.log(INAUDIBLE_GAIN) / Math.log(shimmer.feedback)))
  );
}

function renderRecipe(context: AudioContext, recipe: SoundRecipe, volume: number) {
  const now = context.currentTime;
  const master = context.createGain();
  master.gain.value = recipe.masterGain * volume;
  master.connect(context.destination);
  const shimmerNodes = recipe.shimmer
    ? attachShimmer(context, master, context.destination, recipe.shimmer)
    : [];
  for (const layer of recipe.layers) {
    const startTime = now + (layer.offset ?? 0);
    if (layer.kind === "tone") renderTone(context, master, layer, startTime);
    else renderNoise(context, master, layer, startTime);
  }
  const cleanupAfterMs =
    (sourceEnd(recipe) + shimmerTail(recipe.shimmer) + CLEANUP_MARGIN) * 1000;
  setTimeout(() => {
    master.disconnect();
    for (const node of shimmerNodes) node.disconnect();
  }, cleanupAfterMs);
}

/** Play a Cuelume cue at the given volume (0–1). */
export function playInteractionSound(
  settings: InteractionSoundSettings,
  options?: { force?: boolean },
): void {
  if (!options?.force && !settings.enabled) return;

  const normalized = Math.max(0, Math.min(1, settings.volume));
  if (normalized <= 0) return;
  if (typeof navigator !== "undefined" && navigator.userActivation?.hasBeenActive === false)
    return;

  const context = getAudioContext();
  if (!context) return;
  const recipe = RECIPES[settings.cue] as unknown as SoundRecipe;

  const playNow = () => renderRecipe(context, recipe, normalized);
  if (context.state === "running") {
    playNow();
  } else {
    void context.resume().then(() => {
      if (context.state === "running") playNow();
    });
  }
}
