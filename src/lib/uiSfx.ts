// Tiny original UI sound effects — square-wave blips synthesized live via the
// Web Audio API. Not sampled or transcribed from any existing game.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq: number, startOffset: number, dur: number, type: OscillatorType, peak: number) {
  const c = getCtx();
  if (!c) return;
  const start = c.currentTime + startOffset;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(peak, start + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

// Cursor-move blip, like moving the selection in a menu.
export function playHoverBlip() {
  tone(880, 0, 0.045, "square", 0.045);
}

// Two-note confirm chime, like selecting a menu item.
export function playConfirmChime() {
  tone(660, 0, 0.09, "square", 0.055);
  tone(990, 0.08, 0.16, "square", 0.055);
}
