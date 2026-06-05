/**
 * Tiny WebAudio beep helper — no asset files required.
 * Used by timers so the user gets an audible cue.
 */
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

export function beep(frequency = 880, duration = 0.16, type: OscillatorType = "sine", volume = 0.25) {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") void audio.resume();

  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0, audio.currentTime);
  gain.gain.linearRampToValueAtTime(volume, audio.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + duration);
}

/** A short multi-tone flourish for "time is up". */
export function alarm() {
  beep(660, 0.18, "square", 0.22);
  setTimeout(() => beep(880, 0.18, "square", 0.22), 180);
  setTimeout(() => beep(1180, 0.28, "square", 0.22), 360);
}

/** Soft tick for countdown final seconds. */
export function tick() {
  beep(1320, 0.05, "sine", 0.14);
}

export function vibrate(pattern: number | number[] = 60) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* unsupported */
  }
}
