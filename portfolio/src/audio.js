// Synthesizes a crisp, realistic mechanical switch click sound
export function playSwitchSound(muted) {
  if (muted) return
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    if (ctx.state === 'suspended') ctx.resume()

    const now = ctx.currentTime

    // Heavy mechanical switch snap
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'triangle'
    osc1.frequency.setValueAtTime(420, now)
    osc1.frequency.exponentialRampToValueAtTime(60, now + 0.05)
    gain1.gain.setValueAtTime(0.4, now)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.055)
    osc1.connect(gain1).connect(ctx.destination)
    osc1.start(now)
    osc1.stop(now + 0.06)

    // Metallic spring vibration
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(850, now + 0.01)
    osc2.frequency.exponentialRampToValueAtTime(320, now + 0.14)
    gain2.gain.setValueAtTime(0.2, now + 0.01)
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.15)
    osc2.connect(gain2).connect(ctx.destination)
    osc2.start(now + 0.01)
    osc2.stop(now + 0.16)
  } catch {}
}
