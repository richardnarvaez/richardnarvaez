import type { RetroUiToneVariant } from "./notch.sprites"

// Tonos retro de 8 bits que suenan al alimentar al pet.
let retroUiAudioContext: AudioContext | null = null

export function closeNotchAudio() {
  if (!retroUiAudioContext) return
  void retroUiAudioContext.close().catch(() => {})
  retroUiAudioContext = null
}

function getRetroUiAudioContext() {
  if (typeof window === "undefined" || typeof window.AudioContext === "undefined") {
    return null
  }

  retroUiAudioContext ??= new window.AudioContext()
  return retroUiAudioContext
}

function scheduleRetroHeartTone(
  audioContext: AudioContext,
  variant: RetroUiToneVariant
) {
  const startTime = audioContext.currentTime + 0.01
  const notes =
    variant === "snack"
      ? ([
        { frequency: 740, duration: 0.06, gap: 0.02, gain: 0.055 },
        { frequency: 932, duration: 0.08, gap: 0, gain: 0.05 },
      ] as const)
      : variant === "fed"
        ? ([
          { frequency: 880, duration: 0.09, gap: 0.03, gain: 0.09 },
          { frequency: 1174, duration: 0.14, gap: 0.03, gain: 0.085 },
          { frequency: 1567, duration: 0.22, gap: 0, gain: 0.08 },
        ] as const)
        : ([
          { frequency: 659, duration: 0.11, gap: 0.025, gain: 0.07 },
          { frequency: 932, duration: 0.16, gap: 0.03, gain: 0.068 },
          { frequency: 1244, duration: 0.26, gap: 0, gain: 0.064 },
        ] as const)
  const leadWaveform: OscillatorType =
    variant === "fed" ? "square" : variant === "snack" ? "square" : "triangle"
  const sparkleWaveform: OscillatorType =
    variant === "fed" ? "triangle" : variant === "snack" ? "triangle" : "sine"
  const sparkleMultiplier = variant === "fed" ? 2 : variant === "snack" ? 1.75 : 1.5
  const attackTime = variant === "fed" ? 0.012 : variant === "snack" ? 0.008 : 0.018
  const sparkleAttackTime =
    variant === "fed" ? 0.01 : variant === "snack" ? 0.008 : 0.016

  let cursor = startTime

  for (const note of notes) {
    const noteStart = cursor
    const noteEnd = noteStart + note.duration
    const voiceGain = audioContext.createGain()
    const leadOscillator = audioContext.createOscillator()
    const sparkleOscillator = audioContext.createOscillator()
    const sparkleGain = audioContext.createGain()

    voiceGain.gain.setValueAtTime(0.0001, noteStart)
    voiceGain.gain.exponentialRampToValueAtTime(note.gain, noteStart + attackTime)
    voiceGain.gain.exponentialRampToValueAtTime(0.0001, noteEnd)
    voiceGain.connect(audioContext.destination)

    leadOscillator.type = leadWaveform
    leadOscillator.frequency.setValueAtTime(note.frequency, noteStart)
    leadOscillator.connect(voiceGain)

    sparkleOscillator.type = sparkleWaveform
    sparkleOscillator.frequency.setValueAtTime(note.frequency * sparkleMultiplier, noteStart)
    sparkleGain.gain.setValueAtTime(0.0001, noteStart)
    sparkleGain.gain.exponentialRampToValueAtTime(
      note.gain * (variant === "fed" ? 0.35 : variant === "snack" ? 0.22 : 0.5),
      noteStart + sparkleAttackTime
    )
    sparkleGain.gain.exponentialRampToValueAtTime(0.0001, noteEnd - 0.01)
    sparkleOscillator.connect(sparkleGain)
    sparkleGain.connect(voiceGain)

    if (variant === "fed-amber") {
      leadOscillator.detune.setValueAtTime(6, noteStart)
      sparkleOscillator.detune.setValueAtTime(-4, noteStart)
    }

    leadOscillator.start(noteStart)
    sparkleOscillator.start(noteStart)
    leadOscillator.stop(noteEnd)
    sparkleOscillator.stop(noteEnd)

    cursor = noteEnd + note.gap
  }
}

export function playRetroHeartTone(variant: RetroUiToneVariant) {
  const audioContext = getRetroUiAudioContext()
  if (!audioContext) return

  if (audioContext.state === "running") {
    scheduleRetroHeartTone(audioContext, variant)
    return
  }

  void audioContext
    .resume()
    .then(() => {
      if (audioContext.state !== "running") return
      scheduleRetroHeartTone(audioContext, variant)
    })
    .catch(() => {})
}
