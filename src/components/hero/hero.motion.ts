import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import createGlobe, { type Globe } from "cobe"
import { globeCenter } from "../passport/passportGlobeData"
import { getHeroSequenceRuntime, heroSequenceMotion } from "./hero.sequence"

gsap.registerPlugin(ScrollTrigger)

type HeroCleanupTask = () => void

let heroCleanupTasks: HeroCleanupTask[] = []
let heroAbortController: AbortController | null = null

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Tears down every ScrollTrigger, timeline, listener, timer, observer and the
 * WebGL globe created by initHeroOrbit. Safe to call multiple times.
 */
export function destroyHeroOrbit() {
  for (const task of heroCleanupTasks.splice(0)) task()
  heroAbortController?.abort()
  heroAbortController = null

  if (retroUiAudioContext) {
    void retroUiAudioContext.close().catch(() => {})
    retroUiAudioContext = null
  }
}

const introImageOpacity = 0.25
const orbitImageOpacity = 0.2
const introImageFilter = "blur(0px) saturate(1)"
const orbitImageFilter = "blur(14px) saturate(1.25)"
const scrollDebugParam = "debug-scroll"
const deviceNotchBaseWidthScale = 0.62
const deviceNotchBaseHeightScale = 0.75
const deviceNotchClosedWidthScale = 1.2
const deviceNotchClosedHeightScale = 1.1
const deviceNotchOpenBottomRadiusScale = 2.35
const notchIntroDelayMs = 1000
const heartReactionDurationMs = 2000
let retroUiAudioContext: AudioContext | null = null
const passportGlobeHeight = 420
const passportGlobeScale = 1.12
const passportGlobeSurfaceRadius = 0.8
const passportRotationEasing = 0.08
const passportRotationSettleEpsilon = 0.0015
const passportThetaLimit = 1.05
const passportDragPhiSensitivity = 0.01
const passportDragThetaSensitivity = 0.008
const passportGlobeDevicePixelRatioCap = 1.35
const passportGlobeMapSamples = 11000

function degToRad(value: number) {
  return (value * Math.PI) / 180
}

function locationToAngles(lat: number, lng: number): [number, number] {
  return [Math.PI - (degToRad(lng) - Math.PI / 2), degToRad(lat)]
}

const [passportInitialPhi, passportInitialTheta] = locationToAngles(
  globeCenter[1],
  globeCenter[0]
)

function clampPassportTheta(theta: number) {
  return Math.max(-passportThetaLimit, Math.min(passportThetaLimit, theta))
}

function getClosestWrappedAngle(current: number, target: number) {
  let delta = target - current

  while (delta > Math.PI) delta -= Math.PI * 2
  while (delta < -Math.PI) delta += Math.PI * 2

  return current + delta
}

function toRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "")
  const value = Number.parseInt(normalized, 16)

  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ]
}

function projectPassportMarker(
  coordinates: [number, number],
  phi: number,
  theta: number,
  width: number,
  height: number
) {
  const [lng, lat] = coordinates
  const lngRad = degToRad(lng)
  const latRad = degToRad(lat)
  const radius =
    (Math.min(width, height) / 2) * passportGlobeScale * passportGlobeSurfaceRadius

  const cosLat = Math.cos(latRad)
  const sinLat = Math.sin(latRad)
  const lngPlusPhi = lngRad + phi

  const x = cosLat * Math.cos(lngPlusPhi)
  const y =
    sinLat * Math.cos(theta) + cosLat * Math.sin(lngPlusPhi) * Math.sin(theta)
  const z =
    sinLat * Math.sin(theta) - cosLat * Math.sin(lngPlusPhi) * Math.cos(theta)

  return {
    x: width / 2 + x * radius,
    y: height / 2 - y * radius,
    depth: z,
    visible: z > 0.02,
  }
}

function getPercentFromInlineStyle(
  node: HTMLElement,
  property: "left" | "top",
  fallback: number
) {
  const rawValue = node.style[property]
  const parsedValue = Number.parseFloat(rawValue)

  return Number.isFinite(parsedValue) ? parsedValue : fallback
}

function getNumericDataset(node: HTMLElement, key: string, fallback: number) {
  const rawValue = node.dataset[key]
  const parsedValue = Number.parseFloat(rawValue ?? "")

  return Number.isFinite(parsedValue) ? parsedValue : fallback
}

function isMobileOrbitViewport() {
  return window.matchMedia("(max-width: 767px)").matches
}

function getProfileDatasetValue(
  node: HTMLElement,
  desktopKey: string,
  mobileKey: string,
  fallback: number
) {
  return getNumericDataset(
    node,
    isMobileOrbitViewport() ? mobileKey : desktopKey,
    fallback
  )
}

function getMarkerConfig(
  enabled: boolean,
  overrides?: { startColor?: string; endColor?: string; indent?: number }
) {
  if (!enabled) return false

  return {
    startColor: overrides?.startColor ?? "#38bdf8",
    endColor: overrides?.endColor ?? "#38bdf8",
    fontSize: "11px",
    fontWeight: "600",
    indent: overrides?.indent ?? 20,
  }
}

const deviceNotchMetrics = {
  baseHeight: 24,
  leftTopInnerX: 12.1115,
  leftTopControlX1: 16.5298,
  leftTopControlX2: 20.1115,
  leftBottomControlX1: 20.1115,
  leftBottomControlX2: 23.6932,
  leftBottomX: 28.1115,
  topInsetY: 2.01331,
  topCurveControlY2: 5.59504,
  topCurveEndY: 10.0133,
  bottomCurveStartY: 15.3078,
  bottomCurveControlY1: 19.7261,
  bottomY: 23.3078,
  rightTopInnerInset: 9.746,
  rightTopControlX1Inset: 14.164,
  rightTopControlX2Inset: 17.746,
  rightBottomControlX1Inset: 17.746,
  rightBottomControlX2Inset: 21.327,
  rightBottomInset: 25.746,
} as const

const notchToneClasses = [
  "hero-device-pixel--active",
  "hero-device-pixel--tone-1",
  "hero-device-pixel--tone-2",
  "hero-device-pixel--tone-3",
  "hero-device-pixel--tone-eye",
  "hero-device-pixel--tone-tongue",
  "hero-device-pixel--tone-eye-alert",
] as const

type NotchSpriteMode = "ambient" | "fed" | "fed-amber"
type RetroUiToneVariant = Exclude<NotchSpriteMode, "ambient"> | "snack"

const notchAnimationFrames = {
  idle: [
    [
      "033300000000",
      "300003330000",
      "333343303333",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
    [
      "303300000000",
      "030003330000",
      "333343303333",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
    [
      "003300000000",
      "330003330000",
      "333343303333",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
  ],
  bite: [
    [
      "033300000000",
      "300003330000",
      "333343303333",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
    [
      "033300000000",
      "300003330033",
      "333343303300",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
    [
      "033300000000",
      "300003330333",
      "333343303550",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
    [
      "033300000000",
      "300003330333",
      "333343303550",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
    [
      "033300000000",
      "300003330333",
      "333343303550",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
    [
      "033300000000",
      "300003330033",
      "333343303300",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
  ],
  biteLeft: [
    [
      "000000003330",
      "000033300003",
      "333303343333",
      "333333333333",
      "002300002300",
      "023300023300",
    ],
    [
      "000000003330",
      "330033300003",
      "003303343333",
      "333333333333",
      "002300002300",
      "023300023300",
    ],
    [
      "000000003330",
      "333033300003",
      "550303343333",
      "333333333333",
      "002300002300",
      "023300023300",
    ],
    [
      "000000003330",
      "333033300003",
      "550303343333",
      "333333333333",
      "002300002300",
      "023300023300",
    ],
    [
      "000000003330",
      "333033300003",
      "550303343333",
      "333333333333",
      "002300002300",
      "023300023300",
    ],
    [
      "000000003330",
      "330033300003",
      "003303343333",
      "333333333333",
      "002300002300",
      "023300023300",
    ],
  ],
  lookLeft: [
    [
      "033300000000",
      "300003330000",
      "333343303333",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
    [
      "033300000000",
      "300003330000",
      "333343303333",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
    [
      "003330000330",
      "330003330003",
      "333334303333",
      "333333333333",
      "003200002300",
      "003320023300",
    ],
    [
      "000000003330",
      "000033300003",
      "333303343333",
      "333333333333",
      "002300002300",
      "023300023300",
    ],
    [
      "000000003330",
      "000033300003",
      "333303343333",
      "333333333333",
      "002300002300",
      "023300023300",
    ],
    [
      "000000003330",
      "000033300003",
      "333303343333",
      "333333333333",
      "002300002300",
      "023300023300",
    ],
    [
      "000000003330",
      "000033300003",
      "333303343333",
      "333333333333",
      "002300002300",
      "023300023300",
    ],
    [
      "000000003330",
      "000033300003",
      "333303343333",
      "333333333333",
      "002300002300",
      "023300023300",
    ],
    [
      "003330000330",
      "330003330003",
      "333334303333",
      "333333333333",
      "003200002300",
      "003320023300",
    ],
    [
      "033300000000",
      "300003330000",
      "333343303333",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
    [
      "033300000000",
      "300003330000",
      "333343303333",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
  ],
  snack: [
    [
      "033300000000",
      "300003330000",
      "333333383333",
      "333333333333",
      "003200003200",
      "003320003320",
    ],
    [
      "033300000000",
      "300003330000",
      "333333383333",
      "333333333333",
      "000320003200",
      "003203003320",
    ],
    [
      "033300000000",
      "300003330000",
      "333333383333",
      "333333333333",
      "003000003200",
      "000323003320",
    ],
    [
      "033300000000",
      "300003330000",
      "333333383333",
      "333333333333",
      "000320003200",
      "003203003320",
    ],
  ],
  fed: [
    [
      "000000000000",
      "000550055000",
      "000555555000",
      "000055550000",
      "000005500000",
      "000000000000",
    ],
  ],
} as const

function initBrandCycles(root: HTMLElement, signal: AbortSignal) {
  if (prefersReducedMotion()) return

  const bubbles = Array.from(
    root.querySelectorAll<HTMLElement>("[data-brand-cycle-bubble]")
  )

  for (const bubble of bubbles) {
    if (bubble.dataset.brandCycleBound === "true") continue
    bubble.dataset.brandCycleBound = "true"

    const items = Array.from(
      bubble.querySelectorAll<HTMLElement>("[data-brand-cycle-item]")
    )

    if (items.length < 2) continue

    const dwellMs = getNumericDataset(bubble, "brandCycleDwell", 3200)
    const initialDelayMs = getNumericDataset(bubble, "brandCycleInitialDelay", 0)
    const transitionMs = getNumericDataset(bubble, "brandCycleTransitionMs", 180)
    let activeIndex = items.findIndex(
      (item) => item.dataset.brandCycleActive === "true"
    )

    if (activeIndex < 0) activeIndex = 0

    let cycleTimer = 0
    let shrinkTimer = 0
    let expandTimer = 0

    const applyActiveIndex = (nextIndex: number) => {
      activeIndex = nextIndex

      for (const [index, item] of items.entries()) {
        item.dataset.brandCycleActive = String(index === activeIndex)
      }
    }

    const clearTimers = () => {
      window.clearTimeout(cycleTimer)
      window.clearTimeout(shrinkTimer)
      window.clearTimeout(expandTimer)
    }

    const scheduleNextSwap = (delayMs: number) => {
      cycleTimer = window.setTimeout(() => {
        bubble.dataset.brandCycleTransitioning = "true"

        shrinkTimer = window.setTimeout(() => {
          applyActiveIndex((activeIndex + 1) % items.length)

          expandTimer = window.setTimeout(() => {
            bubble.dataset.brandCycleTransitioning = "false"
            scheduleNextSwap(dwellMs)
          }, transitionMs)
        }, transitionMs)
      }, delayMs)
    }

    bubble.dataset.brandCycleTransitioning = "false"
    applyActiveIndex(activeIndex)
    scheduleNextSwap(initialDelayMs)

    signal.addEventListener("abort", clearTimers, { once: true })
    document.addEventListener(
      "visibilitychange",
      () => {
        clearTimers()

        if (document.hidden) {
          bubble.dataset.brandCycleTransitioning = "false"
          return
        }

        bubble.dataset.brandCycleTransitioning = "false"
        scheduleNextSwap(180)
      },
      { signal }
    )
  }
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

function playRetroHeartTone(variant: RetroUiToneVariant) {
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

function buildDeviceNotchPath(
  width: number,
  height: number,
  bottomRadiusScale = 1
) {
  const safeWidth = Math.max(width, 72)
  const safeHeight = Math.max(height, 24)
  const bottomGap = deviceNotchMetrics.baseHeight - deviceNotchMetrics.bottomY
  const leftBottomStartX = deviceNotchMetrics.leftTopControlX2
  const rightBottomStartX = safeWidth - deviceNotchMetrics.rightTopControlX2Inset
  const bottomCornerHeight =
    (deviceNotchMetrics.bottomY - deviceNotchMetrics.bottomCurveStartY) *
    bottomRadiusScale
  const bottomControlOffset =
    (deviceNotchMetrics.bottomY - deviceNotchMetrics.bottomCurveControlY1) *
    bottomRadiusScale

  const rightTopInnerX = safeWidth - deviceNotchMetrics.rightTopInnerInset
  const rightTopControlX1 = safeWidth - deviceNotchMetrics.rightTopControlX1Inset
  const rightTopControlX2 = safeWidth - deviceNotchMetrics.rightTopControlX2Inset
  const bottomY = safeHeight - bottomGap
  const bottomCurveStartY = bottomY - bottomCornerHeight
  const bottomCurveControlY1 = bottomY - bottomControlOffset
  const leftBottomControlX1 =
    leftBottomStartX +
    (deviceNotchMetrics.leftBottomControlX1 - leftBottomStartX) *
    bottomRadiusScale
  const leftBottomControlX2 =
    leftBottomStartX +
    (deviceNotchMetrics.leftBottomControlX2 - leftBottomStartX) *
    bottomRadiusScale
  const leftBottomX =
    leftBottomStartX +
    (deviceNotchMetrics.leftBottomX - leftBottomStartX) * bottomRadiusScale
  const rightBottomControlX1 =
    rightBottomStartX -
    (deviceNotchMetrics.rightBottomControlX1Inset -
      deviceNotchMetrics.rightTopControlX2Inset) *
    bottomRadiusScale
  const rightBottomControlX2 =
    rightBottomStartX -
    (deviceNotchMetrics.rightBottomControlX2Inset -
      deviceNotchMetrics.rightTopControlX2Inset) *
    bottomRadiusScale
  const rightBottomX =
    rightBottomStartX -
    (deviceNotchMetrics.rightBottomInset - deviceNotchMetrics.rightTopControlX2Inset) *
    bottomRadiusScale

  return [
    `M0 0`,
    `V${deviceNotchMetrics.topInsetY}`,
    `H${deviceNotchMetrics.leftTopInnerX}`,
    `C${deviceNotchMetrics.leftTopControlX1} ${deviceNotchMetrics.topInsetY} ${deviceNotchMetrics.leftTopControlX2} ${deviceNotchMetrics.topCurveControlY2} ${deviceNotchMetrics.leftTopControlX2} ${deviceNotchMetrics.topCurveEndY}`,
    `V${bottomCurveStartY}`,
    `C${leftBottomControlX1} ${bottomCurveControlY1} ${leftBottomControlX2} ${bottomY} ${leftBottomX} ${bottomY}`,
    `H${rightBottomX}`,
    `C${rightBottomControlX2} ${bottomY} ${rightBottomControlX1} ${bottomCurveControlY1} ${rightBottomControlX1} ${bottomCurveStartY}`,
    `V${deviceNotchMetrics.topCurveEndY}`,
    `C${rightTopControlX2} ${deviceNotchMetrics.topCurveControlY2} ${rightTopControlX1} ${deviceNotchMetrics.topInsetY} ${rightTopInnerX} ${deviceNotchMetrics.topInsetY}`,
    `H${safeWidth}`,
    `V0`,
    `H0Z`,
  ].join("")
}

function applyNotchPixelFrame(
  pixelNodes: HTMLElement[],
  frame: readonly string[]
) {
  for (const pixelNode of pixelNodes) {
    const row = Number.parseInt(pixelNode.dataset.notchRow ?? "", 10)
    const column = Number.parseInt(pixelNode.dataset.notchColumn ?? "", 10)
    const tone = frame[row]?.[column] ?? "0"

    pixelNode.classList.remove(...notchToneClasses)

    if (tone === "0") continue

    pixelNode.classList.add("hero-device-pixel--active")

    if (tone === "1") pixelNode.classList.add("hero-device-pixel--tone-1")
    if (tone === "2") pixelNode.classList.add("hero-device-pixel--tone-2")
    if (tone === "3") pixelNode.classList.add("hero-device-pixel--tone-3")
    if (tone === "4") pixelNode.classList.add("hero-device-pixel--tone-eye")
    if (tone === "5") pixelNode.classList.add("hero-device-pixel--tone-tongue")
    if (tone === "8") pixelNode.classList.add("hero-device-pixel--tone-eye-alert")
  }
}

function initPassportGlobe(root: HTMLElement, signal: AbortSignal) {
  const frame = root.querySelector<HTMLElement>("[data-passport-globe-frame]")
  const canvas = root.querySelector<HTMLCanvasElement>("[data-passport-globe-canvas]")
  const markerNodes = Array.from(
    root.querySelectorAll<HTMLElement>("[data-passport-marker]")
  )
  const countryNodes = Array.from(
    root.querySelectorAll<HTMLElement>("[data-passport-country]")
  )
  const detail = root.querySelector<HTMLElement>("[data-passport-detail]")
  const detailCode = root.querySelector<HTMLElement>("[data-passport-detail-code]")
  const detailName = root.querySelector<HTMLElement>("[data-passport-detail-name]")
  const detailCountry = root.querySelector<HTMLElement>("[data-passport-detail-country]")
  const detailClose = root.querySelector<HTMLElement>("[data-passport-detail-close]")

  if (
    !frame ||
    !canvas ||
    !detail ||
    !detailCode ||
    !detailName ||
    !detailCountry ||
    !detailClose ||
    markerNodes.length === 0 ||
    frame.dataset.passportBound === "true"
  ) {
    return null
  }
  frame.dataset.passportBound = "true"

  const globeRef = { current: null as Globe | null }
  const animationFrameRef = { current: 0 }
  const isQueuedRef = { current: false }
  const isActiveRef = { current: false }
  const isDraggingRef = { current: false }
  const rotationRef = { current: passportInitialPhi }
  const targetRotationRef = { current: passportInitialPhi }
  const thetaRef = { current: passportInitialTheta }
  const targetThetaRef = { current: passportInitialTheta }
  const dragXRef = { current: null as number | null }
  const dragYRef = { current: null as number | null }
  const viewportWidthRef = { current: 0 }
  const viewportHeightRef = { current: passportGlobeHeight }
  const renderedWidthRef = { current: 0 }
  const renderedHeightRef = { current: 0 }
  const renderedPhiRef = { current: passportInitialPhi }
  const renderedThetaRef = { current: passportInitialTheta }

  const hideDetail = () => {
    detail.hidden = true
  }

  const showDetail = (markerNode: HTMLElement) => {
    detailCode.textContent = markerNode.dataset.placeCode ?? ""
    detailName.textContent = markerNode.dataset.placeName ?? ""
    detailCountry.textContent = markerNode.dataset.placeCountry ?? ""
    detail.hidden = false
  }

  const updateMarkers = () => {
    for (const markerNode of markerNodes) {
      const lng = Number.parseFloat(markerNode.dataset.lng ?? "0")
      const lat = Number.parseFloat(markerNode.dataset.lat ?? "0")
      const projected = projectPassportMarker(
        [lng, lat],
        rotationRef.current,
        thetaRef.current,
        viewportWidthRef.current,
        viewportHeightRef.current
      )

      if (!projected.visible) {
        markerNode.style.opacity = "0"
        markerNode.style.pointerEvents = "none"
        continue
      }

      markerNode.style.left = `${projected.x}px`
      markerNode.style.top = `${projected.y}px`
      markerNode.style.opacity = `${0.32 + projected.depth * 0.68}`
      markerNode.style.pointerEvents = "auto"
      markerNode.style.transform = `translate(-50%, -50%) scale(${
        0.84 + projected.depth * 0.28
      })`
      markerNode.style.zIndex = `${Math.round(projected.depth * 100)}`
    }
  }

  const updateSize = () => {
    viewportWidthRef.current = frame.clientWidth
    viewportHeightRef.current = frame.clientHeight || passportGlobeHeight
  }

  const cancelQueuedFrame = () => {
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = 0
    }
    isQueuedRef.current = false
  }

  const focusOnCoordinates = (lng: number, lat: number) => {
    const [phiTarget, thetaTarget] = locationToAngles(lat, lng)
    targetRotationRef.current = getClosestWrappedAngle(
      rotationRef.current,
      phiTarget
    )
    targetThetaRef.current = clampPassportTheta(thetaTarget - 0.24)
    queueRender()
  }

  const renderNow = () => {
    if (!globeRef.current) return

    globeRef.current.update({
      phi: rotationRef.current,
      theta: thetaRef.current,
      width: viewportWidthRef.current,
      height: viewportHeightRef.current,
    })

    updateMarkers()
    renderedPhiRef.current = rotationRef.current
    renderedThetaRef.current = thetaRef.current
    renderedWidthRef.current = viewportWidthRef.current
    renderedHeightRef.current = viewportHeightRef.current
  }

  const renderFrame = () => {
    animationFrameRef.current = 0
    isQueuedRef.current = false

    if (!globeRef.current) return

    const nextPhi =
      rotationRef.current +
      (targetRotationRef.current - rotationRef.current) * passportRotationEasing
    const nextTheta =
      thetaRef.current +
      (targetThetaRef.current - thetaRef.current) * passportRotationEasing
    const phiDelta = Math.abs(targetRotationRef.current - nextPhi)
    const thetaDelta = Math.abs(targetThetaRef.current - nextTheta)

    rotationRef.current =
      phiDelta <= passportRotationSettleEpsilon
        ? targetRotationRef.current
        : nextPhi
    thetaRef.current =
      thetaDelta <= passportRotationSettleEpsilon
        ? targetThetaRef.current
        : nextTheta

    const sizeChanged =
      renderedWidthRef.current !== viewportWidthRef.current ||
      renderedHeightRef.current !== viewportHeightRef.current
    const rotationChanged =
      Math.abs(rotationRef.current - renderedPhiRef.current) >
        passportRotationSettleEpsilon ||
      Math.abs(thetaRef.current - renderedThetaRef.current) >
        passportRotationSettleEpsilon

    if (sizeChanged || rotationChanged) {
      renderNow()
    }

    if (
      isDraggingRef.current ||
      (isActiveRef.current &&
        (sizeChanged ||
          phiDelta > passportRotationSettleEpsilon ||
          thetaDelta > passportRotationSettleEpsilon))
    ) {
      queueRender()
    }
  }

  function queueRender() {
    if (!globeRef.current || isQueuedRef.current) return
    if (!isActiveRef.current && !isDraggingRef.current) return

    isQueuedRef.current = true
    animationFrameRef.current = window.requestAnimationFrame(renderFrame)
  }

  const resizeObserver = new ResizeObserver(() => {
    updateSize()
    queueRender()
  })
  resizeObserver.observe(frame)
  updateSize()

  try {
    const devicePixelRatio = Math.min(
      window.devicePixelRatio || 1,
      passportGlobeDevicePixelRatioCap
    )

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio,
      width: viewportWidthRef.current,
      height: viewportHeightRef.current,
      phi: rotationRef.current,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.7,
      mapSamples: passportGlobeMapSamples,
      mapBrightness: 2,
      mapBaseBrightness: 0,
      baseColor: toRgb("#8c86b7"),
      markerColor: [1, 1, 1],
      glowColor: toRgb("#1b1f2d"),
      opacity: 0.64,
      scale: passportGlobeScale,
      offset: [0, 0],
      markers: [],
    })
    renderNow()
  } catch {
    // If WebGL/canvas init fails, keep the static layout without breaking hero init.
  }

  signal.addEventListener(
    "abort",
    () => {
      cancelQueuedFrame()
      resizeObserver.disconnect()
      globeRef.current?.destroy()
      globeRef.current = null
    },
    { once: true }
  )

  frame.addEventListener(
    "pointerdown",
    (event) => {
      isDraggingRef.current = true
      isActiveRef.current = true
      dragXRef.current = event.clientX
      dragYRef.current = event.clientY
      frame.setPointerCapture(event.pointerId)
      queueRender()
    },
    { signal }
  )

  frame.addEventListener("pointermove", (event) => {
    if (dragXRef.current === null || dragYRef.current === null) return

    const deltaX = event.clientX - dragXRef.current
    const deltaY = event.clientY - dragYRef.current
    dragXRef.current = event.clientX
    dragYRef.current = event.clientY
    targetRotationRef.current += deltaX * passportDragPhiSensitivity
    targetThetaRef.current = clampPassportTheta(
      targetThetaRef.current + deltaY * passportDragThetaSensitivity
    )
    queueRender()
  }, { signal })

  const endDrag = () => {
    isDraggingRef.current = false
    dragXRef.current = null
    dragYRef.current = null
    queueRender()
  }

  frame.addEventListener("pointerup", (event) => {
    endDrag()
    if (frame.hasPointerCapture(event.pointerId)) {
      frame.releasePointerCapture(event.pointerId)
    }
  }, { signal })
  frame.addEventListener("pointercancel", endDrag, { signal })
  frame.addEventListener("pointerleave", endDrag, { signal })

  for (const markerNode of markerNodes) {
    markerNode.addEventListener(
      "pointerdown",
      (event) => event.stopPropagation(),
      { signal }
    )
    markerNode.addEventListener(
      "click",
      (event) => {
        event.stopPropagation()
        const lng = Number.parseFloat(markerNode.dataset.lng ?? "0")
        const lat = Number.parseFloat(markerNode.dataset.lat ?? "0")
        focusOnCoordinates(lng, lat)
        showDetail(markerNode)
      },
      { signal }
    )
  }

  for (const countryNode of countryNodes) {
    countryNode.addEventListener(
      "click",
      () => {
        const lng = Number.parseFloat(countryNode.dataset.lng ?? "0")
        const lat = Number.parseFloat(countryNode.dataset.lat ?? "0")
        focusOnCoordinates(lng, lat)
      },
      { signal }
    )
  }

  detailClose.addEventListener("click", hideDetail, { signal })

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        cancelQueuedFrame()
      } else if (isActiveRef.current) {
        queueRender()
      }
    },
    { signal }
  )

  return {
    setActive(nextActive: boolean) {
      isActiveRef.current = nextActive

      if (nextActive) {
        targetRotationRef.current = rotationRef.current
        targetThetaRef.current = thetaRef.current
        renderNow()
        queueRender()
        return
      }

      rotationRef.current = targetRotationRef.current
      thetaRef.current = targetThetaRef.current

      if (!isDraggingRef.current) {
        cancelQueuedFrame()
      }
    },
  }
}

function initDeviceNotch(root: HTMLElement, signal: AbortSignal) {
  const notch = root.querySelector<HTMLElement>("[data-hero-device-notch]")
  const notchSvg = root.querySelector<SVGSVGElement>("[data-hero-device-notch-svg]")
  const notchPath = root.querySelector<SVGPathElement>("[data-hero-device-notch-path]")
  const notchContent = root.querySelector<HTMLElement>(".hero-device-top-shell__content")
  const notchTopRow = root.querySelector<HTMLElement>(".hero-device-top-shell__row")
  const notchLead = root.querySelector<HTMLElement>(".hero-device-top-shell__lead")
  const notchSprite = root.querySelector<HTMLElement>("[data-notch-sprite]")
  const notchContactTrigger = root.querySelector<HTMLElement>("[data-notch-contact-trigger]")
  const notchContactPanel = root.querySelector<HTMLElement>("[data-notch-contact-panel]")
  const notchFoodCounter = root.querySelector<HTMLElement>("[data-notch-food-counter]")
  const contactPreviewItems = Array.from(
    root.querySelectorAll<HTMLElement>("[data-contact-preview-item]")
  )
  const contactLinks = Array.from(root.querySelectorAll<HTMLElement>("[data-contact-link]"))
  const foodButtons = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-notch-food-item]")
  )
  const pixelNodes = Array.from(
    root.querySelectorAll<HTMLElement>("[data-notch-pixel]")
  )

  if (
    !notch ||
    !notchSvg ||
    !notchPath ||
    !notchContent ||
    !notchTopRow ||
    !notchLead ||
    !notchSprite ||
    !notchContactTrigger ||
    !notchContactPanel ||
    contactPreviewItems.length === 0 ||
    contactLinks.length === 0 ||
    pixelNodes.length === 0 ||
    notch.dataset.bound === "true"
  ) {
    return
  }
  notch.dataset.bound = "true"

  let baseWidth = 0
  let baseHeight = 0
  let isHovered = false
  let expandedMode: "none" | "contact" = "none"
  let activeAnimationTimeout = 0
  let fedResetTimeout = 0
  let introStartTimeout = 0
  let ambientCycleCount = 0
  let animationSession = 0
  let foodFeedCount = 0
  let isFoodReactionActive = false
  let currentFacing: "right" | "left" = "right"

  const updateFoodCounter = () => {
    if (notchFoodCounter) notchFoodCounter.textContent = String(foodFeedCount)
  }

  const notchState = {
    width: 0,
    height: 0,
  }

  const isCompactViewport = isMobileOrbitViewport
  const hoverCapability = window.matchMedia("(hover: hover) and (pointer: fine)")
  const canHover = () => hoverCapability.matches

  const getContactMetrics = () => {
    const topInset = isCompactViewport() ? 5 : 6
    const bottomInset = isCompactViewport() ? 5 : 6
    const rowHeight = notchTopRow.offsetHeight
    const panelGap = isCompactViewport() ? 10 : 12
    const targetWidth = baseWidth * 2.08 + (isCompactViewport() ? 72 : 160)
    const targetHeight = isCompactViewport() ? 152 : 200
    const panelHeight = Math.max(
      0,
      targetHeight - topInset - bottomInset - rowHeight - (panelGap * 2)
    )

    return {
      panelGap,
      panelHeight,
      targetHeight,
      targetWidth,
    }
  }

  const getTargetSize = () => {
    if (expandedMode === "contact") {
      const { targetHeight, targetWidth } = getContactMetrics()

      return { width: targetWidth, height: targetHeight }
    }

    return {
      width: baseWidth * deviceNotchClosedWidthScale,
      height: baseHeight * deviceNotchClosedHeightScale,
    }
  }

  const measureBaseSize = () => {
    const probe = notch.cloneNode(false) as HTMLElement

    probe.removeAttribute("data-hero-device-notch")
    probe.removeAttribute("data-bound")
    probe.removeAttribute("style")
    probe.dataset.contactOpen = "false"
    probe.style.visibility = "hidden"
    probe.style.pointerEvents = "none"
    probe.style.transition = "none"
    notch.parentElement?.append(probe)

    const measuredWidth = probe.offsetWidth
    const measuredHeight = probe.offsetHeight
    probe.remove()

    if (measuredWidth > 0 && measuredHeight > 0) {
      baseWidth = measuredWidth * deviceNotchBaseWidthScale
      baseHeight = measuredHeight * deviceNotchBaseHeightScale
    }
  }

  const renderNotchShape = () => {
    const bottomRadiusScale =
      expandedMode === "contact" ? deviceNotchOpenBottomRadiusScale : 1

    notch.style.width = `${notchState.width}px`
    notch.style.height = `${notchState.height}px`
    notchSvg.setAttribute("viewBox", `0 0 ${notchState.width} ${notchState.height}`)
    notchPath.setAttribute(
      "d",
      buildDeviceNotchPath(notchState.width, notchState.height, bottomRadiusScale)
    )
  }

  const applyState = (
    immediate = false,
    options?: { openingContact?: boolean }
  ) => {
    notch.dataset.contactOpen = expandedMode === "contact" ? "true" : "false"
    const targetSize = getTargetSize()
    const isOpeningContact = options?.openingContact === true
    const duration = immediate
      ? 0
      : isOpeningContact
        ? 0.36
        : expandedMode === "none"
          ? 0.2
          : 0.28
    const ease = immediate
      ? "none"
      : isOpeningContact
        ? "power3.out"
        : expandedMode === "none"
          ? "power2.out"
          : "power3.out"

    gsap.to(notchState, {
      width: targetSize.width,
      height: targetSize.height,
      duration,
      ease,
      overwrite: "auto",
      onUpdate: renderNotchShape,
    })
  }

  const applyHoverScale = (immediate = false) => {
    const isHoverActive =
      isHovered && expandedMode === "none" && !isFoodReactionActive
    const isContactOpen = expandedMode === "contact"
    const targetShadowY = isContactOpen ? 10 : isHoverActive ? 7 : 0
    const targetShadowBlur = isContactOpen ? 18 : isHoverActive ? 12 : 0
    const targetShadowAlpha = isContactOpen ? 0.28 : isHoverActive ? 0.2 : 0

    gsap.to(notch, {
      "--hero-device-notch-hover-scale": isHoverActive ? 1.02 : 1,
      "--hero-device-notch-shadow-y": targetShadowY,
      "--hero-device-notch-shadow-blur": targetShadowBlur,
      "--hero-device-notch-shadow-alpha": targetShadowAlpha,
      duration: immediate ? 0 : 0.18,
      ease: "power2.out",
      overwrite: "auto",
    })
  }

  const applyLeadTransition = (immediate = false) => {
    if (immediate) {
      gsap.set(notchLead, {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
      })
      return
    }

    gsap.to(notchLead, {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.18,
      ease: "power2.out",
      overwrite: "auto",
    })
  }

  const stopActiveAnimation = () => {
    animationSession += 1
    window.clearTimeout(activeAnimationTimeout)
    activeAnimationTimeout = 0
  }

  const stopFedReset = () => {
    window.clearTimeout(fedResetTimeout)
    fedResetTimeout = 0
  }

  const stopIntroAnimation = () => {
    window.clearTimeout(introStartTimeout)
    introStartTimeout = 0
    gsap.killTweensOf([notch, notchContent])
  }

  const setSpriteMode = (mode: NotchSpriteMode) => {
    notchSprite.dataset.notchMode = mode
  }

  const getOpenMouthFrame = () =>
    currentFacing === "left"
      ? notchAnimationFrames.biteLeft[2] ?? notchAnimationFrames.biteLeft[0]
      : notchAnimationFrames.bite[2] ?? notchAnimationFrames.bite[0]

  const applyContentState = (immediate = false) => {
    const isContactOpen = expandedMode === "contact"
    const contactMetrics = isContactOpen ? getContactMetrics() : null
    const panelHeight = contactMetrics?.panelHeight ?? 0
    const panelGap = contactMetrics?.panelGap ?? 0

    notch.dataset.contactOpen = isContactOpen ? "true" : "false"
    notchContactTrigger.setAttribute(
      "aria-label",
      isContactOpen ? "Close profile links" : "Open profile links"
    )
    notchContactTrigger.setAttribute("aria-expanded", String(isContactOpen))
    notchContactPanel.setAttribute("aria-hidden", String(!isContactOpen))

    gsap.to(notchSprite, {
      autoAlpha: 1,
      scale: 1,
      duration: immediate ? 0 : 0.18,
      ease: "power2.out",
      overwrite: "auto",
    })
    gsap.to(notchContactTrigger, {
      autoAlpha: isContactOpen ? 0 : 1,
      x: isContactOpen ? 10 : 0,
      scale: isContactOpen ? 0.94 : 1,
      pointerEvents: isContactOpen ? "none" : "auto",
      duration: immediate ? 0 : 0.18,
      ease: "power2.out",
      overwrite: "auto",
    })
    gsap.to(contactPreviewItems, {
      y: isContactOpen ? -4 : 0,
      scale: isContactOpen ? 0.9 : 1,
      rotate: isContactOpen ? 4 : 0,
      duration: immediate ? 0 : 0.18,
      ease: "power2.out",
      stagger: immediate ? 0 : 0.02,
      overwrite: "auto",
    })
    gsap.to(notchContactPanel, {
      autoAlpha: isContactOpen ? 1 : 0,
      y: isContactOpen ? 0 : 8,
      height: panelHeight,
      marginTop: isContactOpen ? panelGap : 0,
      marginBottom: isContactOpen ? panelGap : 0,
      pointerEvents: isContactOpen ? "auto" : "none",
      duration: immediate ? 0 : 0.22,
      ease: "power2.out",
      overwrite: "auto",
    })
    gsap.set(contactLinks, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
    })

    if (immediate) {
      applyLeadTransition(true)
      return
    }

    window.requestAnimationFrame(() => {
      applyLeadTransition()
    })
  }

  const applyCreatureFrame = (frame: readonly string[]) => {
    applyNotchPixelFrame(pixelNodes, frame)
  }

  const restoreCreatureLoop = () => {
    const hovered = canHover() && notch.matches(":hover")
    isHovered = hovered
    setSpriteMode("ambient")

    if (hovered) {
      applyCreatureFrame(getOpenMouthFrame())
      return
    }

    currentFacing = "right"
    applyCreatureFrame(notchAnimationFrames.idle[0])
    activeAnimationTimeout = window.setTimeout(scheduleAmbientLoop, 180)
  }

  const closeFedState = () => {
    if (expandedMode === "none") return

    expandedMode = "none"
    foodFeedCount = 0
    updateFoodCounter()
    isFoodReactionActive = false
    stopFedReset()
    stopActiveAnimation()
    applyState()
    applyHoverScale()
    applyContentState()
    restoreCreatureLoop()
  }

  const handlePointerEnter = (event: PointerEvent) => {
    if (!canHover() || event.pointerType === "touch") return

    isHovered = true
    if (isFoodReactionActive) return
    if (expandedMode === "none") {
      stopActiveAnimation()
      applyCreatureFrame(getOpenMouthFrame())
    }
    applyState()
    applyHoverScale()
  }

  const handlePointerLeave = (event: PointerEvent) => {
    if (!canHover() || event.pointerType === "touch") return

    isHovered = false
    if (isFoodReactionActive) return
    stopActiveAnimation()
    applyState()
    applyHoverScale()
    if (expandedMode === "none") {
      activeAnimationTimeout = window.setTimeout(scheduleAmbientLoop, 180)
    }
  }

  const toggleContactState = () => {
    const openingContact = expandedMode !== "contact"
    expandedMode = openingContact ? "contact" : "none"
    foodFeedCount = 0
    updateFoodCounter()
    isFoodReactionActive = false
    stopFedReset()
    stopActiveAnimation()
    setSpriteMode("ambient")
    applyState(false, { openingContact })
    applyHoverScale()
    applyContentState()
    currentFacing = "right"
    restoreCreatureLoop()
  }

  const restoreAfterFoodReaction = () => {
    isFoodReactionActive = false
    setSpriteMode("ambient")
    applyHoverScale()
    restoreCreatureLoop()
    updateFoodCounter()
  }

  const showHeartReaction = (mode: Exclude<NotchSpriteMode, "ambient">) => {
    isFoodReactionActive = true
    stopFedReset()
    stopActiveAnimation()
    setSpriteMode(mode)
    applyCreatureFrame(notchAnimationFrames.fed[0])
    playRetroHeartTone(mode)
    fedResetTimeout = window.setTimeout(() => {
      restoreAfterFoodReaction()
    }, heartReactionDurationMs)
  }

  const handleFoodFeed = () => {
    if (expandedMode !== "contact" || isFoodReactionActive) return

    isFoodReactionActive = true
    foodFeedCount += 1
    updateFoodCounter()
    stopFedReset()
    stopActiveAnimation()
    setSpriteMode("ambient")
    currentFacing = "right"
    playRetroHeartTone("snack")

    playAnimation("snack", 90, () => {
      if (foodFeedCount >= 3) {
        foodFeedCount = 0
        showHeartReaction("fed")
        return
      }

      restoreAfterFoodReaction()
    })
  }

  const handleSpriteHeartClick = () => {
    if (isFoodReactionActive) return
    showHeartReaction("fed-amber")
  }

  const handleDocumentPointerDown = (event: PointerEvent) => {
    if (expandedMode === "none") return

    const target = event.target
    if (!(target instanceof Node)) return
    if (notch.contains(target)) return

    closeFedState()
  }

  const handleScrollClose = () => {
    if (expandedMode === "none") return

    closeFedState()
  }

  const resetUnsupportedHover = () => {
    if (canHover()) return

    isHovered = false
    stopActiveAnimation()
    applyState(true)
    applyHoverScale(true)
    restoreCreatureLoop()
  }

  const playAnimation = (
    name: keyof typeof notchAnimationFrames,
    frameDuration: number,
    onComplete?: () => void
  ) => {
    const frames = notchAnimationFrames[name]
    let frameIndex = 0
    const session = ++animationSession

    const tick = () => {
      if (session !== animationSession) return

      if (name === "lookLeft") {
        if (frameIndex >= 3 && frameIndex <= 7) currentFacing = "left"
        if (frameIndex <= 1 || frameIndex >= 9) currentFacing = "right"
      } else if (name === "biteLeft") {
        currentFacing = "left"
      } else if (name !== "fed") {
        currentFacing = "right"
      }

      applyCreatureFrame(frames[frameIndex] ?? frames[0])
      frameIndex += 1

      if (frameIndex >= frames.length) {
        if (session !== animationSession) return
        onComplete?.()
        return
      }

      if (session !== animationSession) return
      activeAnimationTimeout = window.setTimeout(tick, frameDuration)
    }

    tick()
  }

  const scheduleAmbientLoop = () => {
    if (isHovered) {
      applyCreatureFrame(getOpenMouthFrame())
      return
    }

    const shouldBite = ambientCycleCount > 0 && ambientCycleCount % 8 === 0
    const shouldLookLeft = ambientCycleCount > 0 && ambientCycleCount % 4 === 0
    ambientCycleCount += 1

    if (shouldBite) {
      playAnimation("bite", 90, () => {
        activeAnimationTimeout = window.setTimeout(scheduleAmbientLoop, 1600)
      })
      return
    }

    if (shouldLookLeft) {
      playAnimation("lookLeft", 180, () => {
        activeAnimationTimeout = window.setTimeout(scheduleAmbientLoop, 1100)
      })
      return
    }

    playAnimation("idle", 220, () => {
      activeAnimationTimeout = window.setTimeout(scheduleAmbientLoop, 520)
    })
  }

  const resetNotchFromZero = () => {
    expandedMode = "none"
    isHovered = false
    isFoodReactionActive = false
    foodFeedCount = 0
    updateFoodCounter()
    stopFedReset()
    stopActiveAnimation()
    stopIntroAnimation()
    gsap.killTweensOf(notchState)

    measureBaseSize()
    const closedSize = getTargetSize()
    notchState.width = closedSize.width
    notchState.height = closedSize.height
    renderNotchShape()
    applyHoverScale(true)
    applyContentState(true)
    setSpriteMode("ambient")
    currentFacing = "right"
    applyCreatureFrame(notchAnimationFrames.idle[0])

    gsap.set(notch, {
      clearProps: "transform",
      autoAlpha: 0,
      pointerEvents: "none",
      "--hero-device-notch-intro-scale": 0,
    })
    gsap.set(notchContent, {
      autoAlpha: 0,
      y: -2,
      filter: "blur(10px)",
    })

    if (prefersReducedMotion()) {
      gsap.set(notch, {
        autoAlpha: 1,
        pointerEvents: "auto",
        "--hero-device-notch-intro-scale": 1,
      })
      gsap.set(notchContent, { autoAlpha: 1, y: 0, filter: "blur(0px)" })
      return
    }

    introStartTimeout = window.setTimeout(() => {
      const introTimeline = gsap.timeline({
        defaults: {
          overwrite: "auto",
        },
        onStart: () => {
          gsap.set(notch, { pointerEvents: "auto" })
        },
      })

      introTimeline.to(notch, {
        autoAlpha: 1,
        "--hero-device-notch-intro-scale": 1,
        duration: 0.46,
        ease: "power3.out",
      })
      introTimeline.to(
        notchContent,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.26,
          ease: "power3.out",
        },
        0.16
      )
    }, notchIntroDelayMs)

    activeAnimationTimeout = window.setTimeout(
      scheduleAmbientLoop,
      notchIntroDelayMs + 260
    )
  }

  resetNotchFromZero()

  signal.addEventListener(
    "abort",
    () => {
      stopFedReset()
      stopActiveAnimation()
      stopIntroAnimation()
      gsap.killTweensOf(notchState)
    },
    { once: true }
  )

  notch.addEventListener("pointerenter", handlePointerEnter, { signal })
  notch.addEventListener("pointerleave", handlePointerLeave, { signal })
  notchContactTrigger.addEventListener("click", toggleContactState, { signal })
  notchContactTrigger.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return
      event.preventDefault()
      toggleContactState()
    },
    { signal }
  )
  notchSprite.addEventListener("click", handleSpriteHeartClick, { signal })
  foodButtons.forEach((button) => {
    button.addEventListener("click", handleFoodFeed, { signal })
  })
  document.addEventListener("pointerdown", handleDocumentPointerDown, { signal })
  window.addEventListener("scroll", handleScrollClose, { passive: true, signal })
  hoverCapability.addEventListener("change", resetUnsupportedHover, { signal })
  window.addEventListener(
    "pageshow",
    (event) => {
      if (!event.persisted) return
      resetNotchFromZero()
    },
    { signal }
  )

  window.addEventListener(
    "resize",
    () => {
      resetUnsupportedHover()
      measureBaseSize()
      applyState(true)
      applyHoverScale(true)
      applyContentState(true)
    },
    { signal }
  )
}

function getCenterNodeOffsetX(node: HTMLElement, orbitField: HTMLElement) {
  const originLeft = getPercentFromInlineStyle(node, "left", 50)
  return ((50 - originLeft) / 100) * orbitField.clientWidth
}

function getCenterNodeOffsetY(node: HTMLElement, orbitField: HTMLElement) {
  const originTop = getPercentFromInlineStyle(node, "top", 50)
  return ((50 - originTop) / 100) * orbitField.clientHeight
}

function getProfileNodeOffsetX(
  node: HTMLElement,
  orbitField: HTMLElement
) {
  const originLeft = getPercentFromInlineStyle(node, "left", 50)
  const angle = getNumericDataset(node, "profileAngle", 0)
  const radius = getProfileDatasetValue(
    node,
    "profileRadiusDesktop",
    "profileRadiusMobile",
    0
  )
  const angleInRadians = (angle * Math.PI) / 180
  const targetLeft =
    orbitField.clientWidth / 2 + Math.cos(angleInRadians) * radius

  return targetLeft - (originLeft / 100) * orbitField.clientWidth
}

function getProfileNodeOffsetY(
  node: HTMLElement,
  orbitField: HTMLElement
) {
  const originTop = getPercentFromInlineStyle(node, "top", 50)
  const angle = getNumericDataset(node, "profileAngle", 0)
  const radius = getProfileDatasetValue(
    node,
    "profileRadiusDesktop",
    "profileRadiusMobile",
    0
  )
  const angleInRadians = (angle * Math.PI) / 180
  const targetTop =
    orbitField.clientHeight / 2 + Math.sin(angleInRadians) * radius

  return targetTop - (originTop / 100) * orbitField.clientHeight
}

export function initHeroOrbit() {
  const roots = document.querySelectorAll<HTMLElement>("[data-hero-root]")
  const debugScroll = new URL(window.location.href).searchParams.has(
    scrollDebugParam
  )

  heroAbortController ??= new AbortController()
  const heroSignal = heroAbortController.signal

  for (const root of roots) {
    if (root.dataset.bound === "true") continue
    root.dataset.bound = "true"

    initBrandCycles(root, heroSignal)
    let passportGlobeController: ReturnType<typeof initPassportGlobe> = null
    initDeviceNotch(root, heroSignal)

    const title = root.querySelector<HTMLElement>("[data-title]")
    const titlePieces = root.querySelectorAll<HTMLElement>("[data-title-piece]")
    const heroImage = root.querySelector<HTMLElement>("[data-hero-image]")
    const orbitScene = root.querySelector<HTMLElement>("[data-orbit-scene]")
    const orbitField = root.querySelector<HTMLElement>(".hero-orbit-field")
    const orbitGraphic = root.querySelector<HTMLElement>("[data-orbit-graphic]")
    const originNodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-orbit-origin-node]")
    )
    const profileNodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-orbit-profile-node]")
    )
    const interestTriggers = Array.from(
      root.querySelectorAll<HTMLButtonElement>("[data-interest-trigger]")
    )
    const clusterShell = root.querySelector<HTMLElement>("[data-orbit-cluster]")
    const clusterLayer = root.querySelector<HTMLElement>("[data-orbit-cluster-layer]")
    const orbitAvatar = root.querySelector<HTMLElement>("[data-orbit-avatar]")
    const orbitAvatarSurface = root.querySelector<HTMLElement>(
      "[data-orbit-avatar-surface]"
    )
    const orbitMeta = root.querySelector<HTMLElement>("[data-orbit-meta]")
    const boardLayer = root.querySelector<HTMLElement>("[data-orbit-board-layer]")
    const boardPanel = root.querySelector<HTMLElement>("[data-orbit-board-panel]")
    const boardDefault = root.querySelector<HTMLElement>("[data-orbit-board-default]")
    const boardPhotography = root.querySelector<HTMLElement>(
      "[data-orbit-board-photography]"
    )
    const boardIllustration = root.querySelector<HTMLElement>(
      "[data-orbit-board-illustration]"
    )
    const boardTitle = root.querySelector<HTMLElement>("[data-orbit-board-title]")
    const boardToolbar = root.querySelector<HTMLElement>(
      "[data-orbit-board-toolbar]"
    )
    const boardClose = root.querySelector<HTMLButtonElement>(
      "[data-orbit-board-close]"
    )
    const passportLayer = root.querySelector<HTMLElement>("[data-orbit-passport-layer]")
    const passportGlobe = root.querySelector<HTMLElement>("[data-orbit-passport-globe]")
    const passportFrame = root.querySelector<HTMLElement>("[data-passport-globe-frame]")
    const passportToolbar = root.querySelector<HTMLElement>(".hero-passport-toolbar")
    const passportDetail = root.querySelector<HTMLElement>("[data-passport-detail]")
    const introStep = root.querySelector<HTMLElement>('[data-story-step="Intro"]')

    const initOrbitNodeMagnetism = () => {
      if (
        typeof window === "undefined" ||
        !orbitField ||
        prefersReducedMotion() ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        return
      }
      const magnetismField = orbitField

      const nodeEntries = profileNodes
        .map((node) => {
          const inner = node.querySelector<HTMLElement>(".hero-orbit-node__inner")

          if (!inner) return null

          return {
            node,
            inner,
            xTo: gsap.quickTo(inner, "x", {
              duration: 0.22,
              ease: "power3.out",
            }),
            yTo: gsap.quickTo(inner, "y", {
              duration: 0.22,
              ease: "power3.out",
            }),
            scaleTo: gsap.quickTo(inner, "scale", {
              duration: 0.2,
              ease: "power3.out",
            }),
            hovered: false,
          }
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null)

      if (!nodeEntries.length) return

      const influenceRadius = 180
      const maxOffset = 10
      const hoverScale = 1.22

      const applyRestingState = () => {
        for (const entry of nodeEntries) {
          if (!entry.hovered) {
            entry.xTo(0)
            entry.yTo(0)
          }
          entry.scaleTo(entry.hovered ? hoverScale : 1)
        }
      }

      // Coalesced to one rAF per frame: pointermove can fire far more often
      // than the display refreshes, and each pass reads layout (rects).
      let pointerFrame = 0
      let lastPointerEvent: PointerEvent | null = null

      const processPointerFrame = () => {
        pointerFrame = 0
        const event = lastPointerEvent
        if (!event) return

        const fieldRect = magnetismField.getBoundingClientRect()
        const pointerX = event.clientX
        const pointerY = event.clientY

        if (
          pointerX < fieldRect.left ||
          pointerX > fieldRect.right ||
          pointerY < fieldRect.top ||
          pointerY > fieldRect.bottom
        ) {
          applyRestingState()
          return
        }

        for (const entry of nodeEntries) {
          if (entry.hovered) {
            entry.xTo(0)
            entry.yTo(0)
            entry.scaleTo(hoverScale)
            continue
          }

          const rect = entry.node.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const deltaX = pointerX - centerX
          const deltaY = pointerY - centerY
          const distance = Math.hypot(deltaX, deltaY)

          if (distance > influenceRadius || distance === 0) {
            entry.xTo(0)
            entry.yTo(0)
            entry.scaleTo(entry.hovered ? hoverScale : 1)
            continue
          }

          const strength = 1 - distance / influenceRadius
          const offsetX = (deltaX / distance) * maxOffset * strength
          const offsetY = (deltaY / distance) * maxOffset * strength

          entry.xTo(offsetX)
          entry.yTo(offsetY)
          entry.scaleTo((entry.hovered ? hoverScale : 1) + strength * 0.04)
        }
      }

      magnetismField.addEventListener(
        "pointermove",
        (event) => {
          lastPointerEvent = event
          pointerFrame ||= window.requestAnimationFrame(processPointerFrame)
        },
        { signal: heroSignal }
      )

      heroCleanupTasks.push(() => {
        if (pointerFrame) window.cancelAnimationFrame(pointerFrame)
      })

      magnetismField.addEventListener(
        "pointerleave",
        () => {
          applyRestingState()
        },
        { signal: heroSignal }
      )

      for (const entry of nodeEntries) {
        entry.node.addEventListener(
          "mouseenter",
          () => {
            entry.hovered = true
            entry.xTo(0)
            entry.yTo(0)
            entry.scaleTo(hoverScale)
          },
          { signal: heroSignal }
        )

        entry.node.addEventListener(
          "mouseleave",
          () => {
            entry.hovered = false
            entry.scaleTo(1)
          },
          { signal: heroSignal }
        )
      }
    }

    const initProfileAvatarMagnetism = () => {
      if (
        typeof window === "undefined" ||
        !orbitField ||
        !orbitAvatar ||
        prefersReducedMotion() ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        return
      }
      const magnetismField = orbitField
      const magnetismAvatar = orbitAvatar

      if (!orbitAvatarSurface) {
        return
      }

      const xTo = gsap.quickTo(orbitAvatarSurface, "x", {
        duration: 0.26,
        ease: "power3.out",
      })
      const yTo = gsap.quickTo(orbitAvatarSurface, "y", {
        duration: 0.26,
        ease: "power3.out",
      })

      const influenceRadius = 240
      const maxOffset = 12
      const deadZoneRadius = 40

      let avatarFrame = 0
      let lastAvatarEvent: PointerEvent | null = null

      const processAvatarFrame = () => {
        avatarFrame = 0
        const event = lastAvatarEvent
        if (!event) return

        const avatarRect = magnetismAvatar.getBoundingClientRect()
        const centerX = avatarRect.left + avatarRect.width / 2
        const centerY = avatarRect.top + avatarRect.height / 2
        const deltaX = event.clientX - centerX
        const deltaY = event.clientY - centerY
        const distance = Math.hypot(deltaX, deltaY)

        if (
          distance > influenceRadius ||
          distance === 0 ||
          distance <= deadZoneRadius
        ) {
          xTo(0)
          yTo(0)
          return
        }

        const normalizedDistance =
          (distance - deadZoneRadius) / (influenceRadius - deadZoneRadius)
        const strength = (1 - distance / influenceRadius) * normalizedDistance
        xTo((deltaX / distance) * maxOffset * strength)
        yTo((deltaY / distance) * maxOffset * strength)
      }

      magnetismField.addEventListener(
        "pointermove",
        (event) => {
          lastAvatarEvent = event
          avatarFrame ||= window.requestAnimationFrame(processAvatarFrame)
        },
        { signal: heroSignal }
      )

      heroCleanupTasks.push(() => {
        if (avatarFrame) window.cancelAnimationFrame(avatarFrame)
      })

      magnetismField.addEventListener(
        "pointerleave",
        () => {
          xTo(0)
          yTo(0)
        },
        { signal: heroSignal }
      )
    }

    if (
      !title ||
      !heroImage ||
      !orbitScene ||
      !orbitField ||
      !orbitGraphic ||
      !clusterShell ||
      !clusterLayer ||
      !orbitAvatar ||
      !orbitAvatarSurface ||
      !orbitMeta ||
      !boardLayer ||
      !boardPanel ||
      !boardDefault ||
      !boardPhotography ||
      !boardIllustration ||
      !boardTitle ||
      !boardToolbar ||
      !boardClose ||
      !passportLayer ||
      !passportGlobe ||
      !passportFrame ||
      !passportToolbar ||
      !passportDetail ||
      !introStep
    ) {
      continue
    }

    initOrbitNodeMagnetism()
    initProfileAvatarMagnetism()
    passportLayer.hidden = false
    passportGlobeController = initPassportGlobe(root, heroSignal)
    passportGlobeController?.setActive(false)

    let boardOpen = false
    let boardAnimation: gsap.core.Timeline | null = null

    heroCleanupTasks.push(() => {
      boardAnimation?.kill()
      boardAnimation = null
    })
    let lockedScrollY = 0
    const preventDocumentScroll = (event: Event) => {
      if (
        event.target instanceof Node &&
        (boardLayer.contains(event.target) ||
          passportLayer.contains(event.target))
      ) {
        return
      }

      event.preventDefault()
    }
    const preventDocumentScrollKeys = (event: KeyboardEvent) => {
      if (
        document.activeElement instanceof Node &&
        (boardLayer.contains(document.activeElement) ||
          passportLayer.contains(document.activeElement))
      ) {
        return
      }

      if (
        [
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "End",
          "Home",
          "PageDown",
          "PageUp",
          " ",
        ].includes(event.key)
      ) {
        event.preventDefault()
      }
    }

    const resetDocumentScrollLockStyles = () => {
      document.documentElement.style.overflow = ""
      document.documentElement.style.overscrollBehavior = ""
      document.body.style.position = ""
      document.body.style.inset = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      document.body.style.overscrollBehavior = ""
    }

    const lockDocumentScroll = () => {
      lockedScrollY = window.scrollY
      resetDocumentScrollLockStyles()
      window.addEventListener("wheel", preventDocumentScroll, {
        capture: true,
        passive: false,
        signal: heroSignal,
      })
      window.addEventListener("touchmove", preventDocumentScroll, {
        capture: true,
        passive: false,
        signal: heroSignal,
      })
      window.addEventListener("keydown", preventDocumentScrollKeys, {
        capture: true,
        signal: heroSignal,
      })
    }

    const unlockDocumentScroll = () => {
      window.removeEventListener("wheel", preventDocumentScroll, true)
      window.removeEventListener("touchmove", preventDocumentScroll, true)
      window.removeEventListener("keydown", preventDocumentScrollKeys, true)
      resetDocumentScrollLockStyles()
      window.scrollTo(0, lockedScrollY)
    }

    resetDocumentScrollLockStyles()

    const ensurePassportGlobeController = () => {
      if (!passportGlobeController) {
        passportGlobeController = initPassportGlobe(root, heroSignal)
      }

      return passportGlobeController
    }

    const openBoard = (label: string, key: string) => {
      if (boardOpen) return

      const isTravelBoard = key === "travel"
      const isPhotographyBoard = key === "photography"
      const isIllustrationBoard = key === "illustration"
      const isDevelopmentBoard =
        !isTravelBoard && !isPhotographyBoard && !isIllustrationBoard
      boardOpen = true
      lockDocumentScroll()
      boardLayer.setAttribute("aria-hidden", "false")
      boardLayer.style.visibility = "visible"
      // El tablero de viaje vive en la capa del pasaporte (debajo de esta):
      // la capa del board actúa solo de fondo y no debe capturar el puntero.
      boardLayer.style.pointerEvents = isTravelBoard ? "none" : "auto"
      boardTitle.textContent = label
      boardPanel.classList.toggle(
        "hero-board-panel--development",
        isDevelopmentBoard
      )
      gsap.set(boardDefault, {
        display: isPhotographyBoard || isIllustrationBoard ? "none" : "flex",
      })
      gsap.set(boardPhotography, {
        display: isPhotographyBoard ? "grid" : "none",
      })
      gsap.set(boardIllustration, {
        display: isIllustrationBoard ? "grid" : "none",
      })

      if (isTravelBoard) {
        passportLayer.setAttribute("aria-hidden", "false")
        gsap.set(passportLayer, {
          autoAlpha: 0,
          filter: "blur(0px)",
          pointerEvents: "none",
          visibility: "visible",
        })
        gsap.set([passportFrame, passportToolbar], {
          autoAlpha: 0,
          filter: "blur(12px)",
          pointerEvents: "auto",
          scale: 0.92,
        })
        gsap.set(passportDetail, {
          autoAlpha: 0,
        })
        ensurePassportGlobeController()?.setActive(true)
      } else {
        passportLayer.setAttribute("aria-hidden", "true")
        passportGlobeController?.setActive(false)
      }

      boardAnimation?.kill()
      boardAnimation = gsap.timeline({
        defaults: { ease: "power3.out", overwrite: "auto" },
      })

      boardAnimation
        .to(
          boardLayer,
          {
            autoAlpha: 1,
            duration: 0.12,
          },
          0
        )
        .fromTo(
          boardToolbar,
          {
            autoAlpha: 0,
            filter: "blur(8px)",
            x: -10,
          },
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            x: 0,
            pointerEvents: "auto",
            duration: 0.2,
          },
          0.04
        )
        .to(
          [clusterLayer, profileNodes],
          {
            autoAlpha: 0,
            filter: "blur(10px)",
            duration: 0.24,
            pointerEvents: "none",
          },
          0
        )

      if (isTravelBoard) {
        boardAnimation
          .set(boardPanel, { autoAlpha: 0, pointerEvents: "none" }, 0)
          .fromTo(
            passportLayer,
            {
              autoAlpha: 0,
              pointerEvents: "none",
            },
            {
              autoAlpha: 1,
              pointerEvents: "auto",
              duration: 0.24,
            },
            0.04
          )
          .fromTo(
            [passportFrame, passportToolbar],
            {
              autoAlpha: 0,
              filter: "blur(12px)",
              scale: 0.92,
            },
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              pointerEvents: "auto",
              scale: 1,
              duration: 0.32,
            },
            0.06
          )
      } else {
        boardAnimation
          .set(passportLayer, { autoAlpha: 0, pointerEvents: "none" }, 0)
          .fromTo(
            boardPanel,
            {
              autoAlpha: 0,
              filter: "blur(10px)",
              pointerEvents: "none",
            },
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              pointerEvents: "auto",
              duration: 0.24,
            },
            0.04
          )
      }
    }

    const closeBoard = () => {
      if (!boardOpen) return

      boardOpen = false
      boardAnimation?.kill()
      boardAnimation = gsap.timeline({
        defaults: { ease: "power3.inOut", overwrite: "auto" },
        onComplete: () => {
          boardLayer.setAttribute("aria-hidden", "true")
          boardLayer.style.visibility = "hidden"
          boardLayer.style.pointerEvents = "none"
          unlockDocumentScroll()
        },
      })

      boardAnimation
        .to(
          [boardPanel, boardToolbar, passportLayer, passportFrame, passportToolbar],
          {
            autoAlpha: 0,
            filter: "blur(10px)",
            duration: 0.34,
            pointerEvents: "none",
          },
          0
        )
        .to(
          clusterLayer,
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.42,
            pointerEvents: "none",
          },
          0.14
        )
        .to(
          profileNodes,
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.42,
            pointerEvents: "auto",
          },
          0.14
        )
        .to(
          boardLayer,
          {
            autoAlpha: 0,
            duration: 0.18,
            onComplete: () => {
              passportLayer.setAttribute("aria-hidden", "true")
              passportGlobeController?.setActive(false)
            },
          },
          0.28
        )
    }

    for (const trigger of interestTriggers) {
      trigger.addEventListener(
        "click",
        (event) => {
          event.stopPropagation()
          const label =
            trigger.closest<HTMLElement>("[data-orbit-profile-node]")?.dataset
              .interestLabel ?? "Interest"
          const key =
            trigger.closest<HTMLElement>("[data-orbit-profile-node]")?.dataset
              .interestKey ?? ""
          openBoard(label, key)
        },
        { signal: heroSignal }
      )
    }

    boardClose.addEventListener("click", closeBoard, { signal: heroSignal })
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape") {
          closeBoard()
        }
      },
      { signal: heroSignal }
    )

    const prepareInitialState = () => {
      gsap.set(orbitScene, {
        autoAlpha: 0,
        pointerEvents: "none",
      })
      gsap.set(orbitGraphic, {
        autoAlpha: 0,
        scale: 0.6,
        rotate: -45,
        transformOrigin: "50% 50%",
      })
      gsap.set(originNodes, {
        autoAlpha: 0,
        scale: 0.5,
        x: 0,
        y: 12,
        filter: "blur(10px)",
      })
      gsap.set(profileNodes, {
        autoAlpha: 0,
        scale: 0.42,
        x: 0,
        y: 0,
        filter: "blur(14px)",
      })
      gsap.set(clusterLayer, { autoAlpha: 0 })
      gsap.set(orbitAvatar, {
        autoAlpha: 0,
        scale: 0.78,
        y: 0,
        filter: "blur(10px)",
      })
      gsap.set(orbitMeta, {
        autoAlpha: 0,
        y: 10,
        filter: "blur(10px)",
      })
      gsap.set(passportLayer, {
        autoAlpha: 0,
        pointerEvents: "none",
      })
      passportGlobeController?.setActive(false)
      gsap.set(passportGlobe, {
        autoAlpha: 1,
        scale: 1,
        rotate: 0,
        y: 0,
        filter: "blur(0px)",
        transformOrigin: "50% 50%",
      })
      gsap.set(passportFrame, {
        autoAlpha: 0,
        scale: 0.82,
        filter: "blur(18px)",
        transformOrigin: "50% 50%",
      })
      gsap.set(passportToolbar, {
        autoAlpha: 0,
      })
      gsap.set(passportDetail, {
        autoAlpha: 0,
      })
      gsap.set(boardLayer, {
        autoAlpha: 0,
        pointerEvents: "none",
      })
      boardLayer.style.visibility = "hidden"
      gsap.set(boardToolbar, {
        autoAlpha: 0,
        filter: "blur(8px)",
        x: -10,
      })
      gsap.set(boardPanel, {
        autoAlpha: 0,
        filter: "blur(10px)",
        transformOrigin: "50% 50%",
      })
      gsap.set(title, {
        autoAlpha: 1,
        filter: "blur(0px)",
      })
      gsap.set(heroImage, {
        autoAlpha: 0,
        scale: 1.02,
        filter: introImageFilter,
      })

      if (prefersReducedMotion()) {
        gsap.set(heroImage, {
          autoAlpha: introImageOpacity,
          scale: 1,
          filter: introImageFilter,
        })
        gsap.set(titlePieces, { autoAlpha: 1, y: 0, filter: "blur(0px)" })
        return
      }

      gsap.to(heroImage, {
        autoAlpha: introImageOpacity,
        scale: 1,
        filter: introImageFilter,
        duration: 1.3,
        ease: "power3.out",
        delay: 0.08,
      })

      gsap.fromTo(
        titlePieces,
        {
          autoAlpha: 0,
          y: 28,
          filter: "blur(14px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.12,
        }
      )
    }

    const createIntroScrub = () => {
      const { collapseStartPx, expandStartPx, passportStartPx } =
        getHeroSequenceRuntime()
      const { intro } = heroSequenceMotion
      const footerTriggerPx = passportStartPx
      const heroFlowEndPx = footerTriggerPx + intro.tailPx

      const syncNavPoints = () => {
        const rootTop = root.getBoundingClientRect().top + window.scrollY

        root.dataset.navHomeY = String(Math.round(rootTop))
        root.dataset.navDevY = String(Math.round(rootTop + expandStartPx))
        delete root.dataset.navPassportY
        window.dispatchEvent(new CustomEvent("hero-nav-points"))
      }

      syncNavPoints()

      // Under reduced motion, map scroll position directly (no easing lag).
      const scrubSmoothing = prefersReducedMotion() ? true : 1

      const introTimeline = gsap.timeline({
        defaults: { ease: "none", overwrite: "auto" },
        scrollTrigger: {
          id: "hero-intro-scrub",
          trigger: root,
          start: "top top",
          end: () => `+=${collapseStartPx}`,
          scrub: scrubSmoothing,
          markers: getMarkerConfig(debugScroll),
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: "hero-flow",
        },
      })

      const orbitRotationTimeline = gsap.timeline({
        scrollTrigger: {
          id: "hero-orbit-rotation",
          trigger: root,
          start: "top top",
          end: () => `top+=${heroFlowEndPx} top`,
          scrub: scrubSmoothing,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          markers: getMarkerConfig(debugScroll, {
            startColor: "#f59e0b",
            endColor: "#f59e0b",
            indent: 92,
          }),
        },
      })

      orbitRotationTimeline.fromTo(
        orbitGraphic,
        { rotate: -45 },
        {
          rotate: 135,
          duration: heroFlowEndPx,
          ease: "none",
          immediateRender: false,
        }
      )

      introTimeline.set(orbitScene, { pointerEvents: "auto" }, 0)
      const heroImageTween = gsap.fromTo(
        heroImage,
        {
          autoAlpha: introImageOpacity,
          scale: 1,
          filter: introImageFilter,
        },
        {
          autoAlpha: orbitImageOpacity,
          scale: 1.04,
          filter: orbitImageFilter,
          immediateRender: false,
          ease: "none",
          scrollTrigger: {
            id: "hero-image-scrub",
            trigger: root,
            start: "top top",
            end: () => `+=${collapseStartPx}`,
            scrub: scrubSmoothing,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: "hero-flow",
            markers: getMarkerConfig(debugScroll),
          },
        }
      )
      introTimeline.to(
        orbitScene,
        {
          autoAlpha: 1,
          duration: intro.orbitSceneInDuration,
        },
        intro.orbitSceneInAt
      )
      introTimeline.to(
        orbitGraphic,
        {
          autoAlpha: 1,
          scale: 1,
          duration: intro.orbitGraphicInDuration,
        },
        intro.orbitGraphicInAt
      )
      introTimeline.to(
        originNodes,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: intro.nodeInDuration,
          stagger: intro.nodeInStagger,
        },
        intro.nodeInStart
      )

      const nodeHoldDuration = Math.max(
        intro.targetNodesCompleteAt -
          (intro.nodeInStart +
            intro.nodeInDuration +
            Math.max(originNodes.length - 1, 0) * intro.nodeInStagger),
        0
      )

      if (nodeHoldDuration > 0) {
        introTimeline.to({}, { duration: nodeHoldDuration })
      }

      const collapseSpanPx = Math.max(expandStartPx - collapseStartPx, 1)
      const expandAvailablePx = Math.max(footerTriggerPx - expandStartPx, 1)
      const expandMotionPx = Math.min(
        expandAvailablePx,
        Math.max(120, Math.round(expandAvailablePx * 0.28))
      )
      const profileHoldPx = Math.max(expandAvailablePx - expandMotionPx, 0)
      const centerSwapStartPx = Math.max(
        Math.min(56, collapseSpanPx - 1),
        0
      )
      const centerSwapDurationPx = Math.max(
        Math.min(56, collapseSpanPx - centerSwapStartPx),
        1
      )
      const collapseAvatarStartPx = Math.max(
        Math.min(centerSwapStartPx, collapseSpanPx - 1),
        0
      )
      const collapseAvatarDurationPx = Math.max(
        Math.min(
          centerSwapDurationPx,
          collapseSpanPx - collapseAvatarStartPx
        ),
        1
      )
      const titleExitDurationPx = Math.max(
        Math.min(centerSwapDurationPx, collapseSpanPx - centerSwapStartPx),
        1
      )
      const collapseNodesStartPx = Math.max(
        Math.min(
          centerSwapStartPx + centerSwapDurationPx + 150,
          collapseSpanPx - 1
        ),
        0
      )
      const collapseNodesDurationPx = Math.max(
        collapseSpanPx - collapseNodesStartPx,
        1
      )
      const expandMetaStartPx = Math.min(
        Math.round(expandMotionPx * 0.56),
        expandMotionPx
      )
      const expandMetaDurationPx = Math.max(expandMotionPx - expandMetaStartPx, 1)

      const flowTimeline = gsap.timeline({
        defaults: { ease: "none", overwrite: "auto" },
        scrollTrigger: {
          id: "hero-flow-scrub",
          trigger: root,
          start: () => `top+=${collapseStartPx} top`,
          end: () => `top+=${heroFlowEndPx} top`,
          scrub: scrubSmoothing,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: "hero-flow",
          markers: getMarkerConfig(debugScroll, {
            startColor: "#fb7185",
            endColor: "#f9fafb",
            indent: 44,
          }),
          onRefresh: syncNavPoints,
        },
      })

      flowTimeline.to(
        title,
        {
          autoAlpha: 0,
          filter: "blur(6px)",
          duration: titleExitDurationPx,
        },
        centerSwapStartPx
      )
      flowTimeline.to(
        clusterLayer,
        {
          autoAlpha: 1,
          duration: 0.01,
        },
        collapseAvatarStartPx
      )
      flowTimeline.to(
        orbitAvatar,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: collapseAvatarDurationPx,
        },
        collapseAvatarStartPx
      )
      flowTimeline.to(
        originNodes,
        {
          x: (_, node) => getCenterNodeOffsetX(node as HTMLElement, orbitField),
          y: (_, node) => getCenterNodeOffsetY(node as HTMLElement, orbitField),
          autoAlpha: 0.22,
          scale: 0.42,
          filter: "blur(14px)",
          duration: collapseNodesDurationPx,
          stagger: 0,
        },
        collapseNodesStartPx
      )
      flowTimeline.to(
        profileNodes,
        {
          autoAlpha: 0,
          x: 0,
          y: 0,
          scale: 0.42,
          filter: "blur(14px)",
          duration: 0.01,
          stagger: 0,
        },
        0
      )
      flowTimeline.set(
        orbitMeta,
        {
          autoAlpha: 0,
          y: 10,
          filter: "blur(10px)",
        },
        0
      )

      const expandStartAt = collapseSpanPx

      flowTimeline.to(
        orbitAvatar,
        {
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: expandMotionPx,
        },
        expandStartAt
      )
      flowTimeline.to(
        originNodes,
        {
          autoAlpha: 0,
          duration: Math.max(Math.round(expandMotionPx * 0.3), 1),
          stagger: 0,
        },
        expandStartAt
      )
      flowTimeline.to(
        profileNodes,
        {
          autoAlpha: 1,
          x: (_, node) =>
            getProfileNodeOffsetX(node as HTMLElement, orbitField),
          y: (_, node) =>
            getProfileNodeOffsetY(node as HTMLElement, orbitField),
          scale: (_, node) =>
            getProfileDatasetValue(
              node as HTMLElement,
              "profileScaleDesktop",
              "profileScaleMobile",
              1
            ),
          filter: "blur(0px)",
          duration: expandMotionPx,
          stagger: 0,
        },
        expandStartAt
      )
      flowTimeline.to(
        orbitMeta,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: expandMetaDurationPx,
        },
        expandStartAt + expandMetaStartPx
      )

      if (profileHoldPx > 0) {
        flowTimeline.to({}, { duration: profileHoldPx })
      }

      heroCleanupTasks.push(() => {
        introTimeline.scrollTrigger?.kill()
        introTimeline.kill()
        orbitRotationTimeline.scrollTrigger?.kill()
        orbitRotationTimeline.kill()
        heroImageTween.scrollTrigger?.kill()
        heroImageTween.kill()
        flowTimeline.scrollTrigger?.kill()
        flowTimeline.kill()
      })
    }

    // En móvil el campo orbital es estrecho y alto, así que las posiciones
    // autoradas (pensadas para desktop) quedan a distancias muy dispares del
    // centro. Aquí se normalizan a un anillo de radio uniforme, conservando
    // el orden angular original de cada logo. En desktop se restauran las
    // posiciones autoradas tal cual.
    const applyMobileOriginRing = () => {
      const fieldWidth = orbitField.clientWidth
      const fieldHeight = orbitField.clientHeight

      if (!fieldWidth || !fieldHeight) return

      for (const node of originNodes) {
        node.dataset.originLeft ??= String(
          getPercentFromInlineStyle(node, "left", 50)
        )
        node.dataset.originTop ??= String(
          getPercentFromInlineStyle(node, "top", 50)
        )
      }

      if (!isMobileOrbitViewport()) {
        for (const node of originNodes) {
          node.style.left = `${node.dataset.originLeft}%`
          node.style.top = `${node.dataset.originTop}%`
        }
        return
      }

      const ringRadius = Math.min(fieldWidth, fieldHeight) * 0.38
      const sorted = originNodes
        .map((node) => {
          const left = Number(node.dataset.originLeft)
          const top = Number(node.dataset.originTop)

          return {
            node,
            angle: Math.atan2(
              ((top - 50) / 100) * fieldHeight,
              ((left - 50) / 100) * fieldWidth
            ),
          }
        })
        .sort((a, b) => a.angle - b.angle)

      sorted.forEach((entry, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI * 2) / sorted.length
        const leftPct = 50 + ((Math.cos(angle) * ringRadius) / fieldWidth) * 100
        const topPct = 50 + ((Math.sin(angle) * ringRadius) / fieldHeight) * 100

        entry.node.style.left = `${leftPct}%`
        entry.node.style.top = `${topPct}%`
      })
    }

    applyMobileOriginRing()
    window.addEventListener("resize", applyMobileOriginRing, {
      signal: heroSignal,
    })

    prepareInitialState()
    createIntroScrub()
  }
}
