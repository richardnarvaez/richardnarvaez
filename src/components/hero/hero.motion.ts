import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getHeroSequenceRuntime, heroSequenceMotion } from "./hero.sequence"

gsap.registerPlugin(ScrollTrigger)

const introImageOpacity = 0.25
const orbitImageOpacity = 0.3
const introImageFilter = "blur(0px) saturate(1)"
const orbitImageFilter = "blur(14px) saturate(1.25)"
const scrollDebugParam = "debug-scroll"
const clusterExpandShiftX = 30
const clusterExpandGap = 20
const deviceNotchBaseWidthScale = 0.62
const deviceNotchBaseHeightScale = 0.75
const deviceNotchClosedWidthScale = 1.2
const deviceNotchClosedHeightScale = 1.1
const deviceNotchOpenBottomRadiusScale = 2.35
const notchIntroDelayMs = 1000
const heartReactionDurationMs = 2000
let retroUiAudioContext: AudioContext | null = null

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

function getMarkerConfig(enabled: boolean) {
  if (!enabled) return false

  return {
    startColor: "#38bdf8",
    endColor: "#38bdf8",
    fontSize: "11px",
    fontWeight: "600",
    indent: 20,
  }
}

const deviceNotchMetrics = {
  baseWidth: 160.892,
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
  walk: [
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
      "000320000320",
      "003203003203",
    ],
    [
      "003300000000",
      "330003330000",
      "333343303333",
      "333333333333",
      "003000003000",
      "000323000323",
    ],
    [
      "303300000000",
      "030003330000",
      "333343303333",
      "333333333333",
      "000320000320",
      "003203003203",
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

  void audioContext.resume().then(() => {
    if (audioContext.state !== "running") return
    scheduleRetroHeartTone(audioContext, variant)
  })
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

function initDeviceNotch(root: HTMLElement) {
  const notch = root.querySelector<HTMLElement>("[data-hero-device-notch]")
  const notchSvg = root.querySelector<SVGSVGElement>("[data-hero-device-notch-svg]")
  const notchPath = root.querySelector<SVGPathElement>("[data-hero-device-notch-path]")
  const notchContent = root.querySelector<HTMLElement>(".hero-device-top-shell__content")
  const notchTopRow = root.querySelector<HTMLElement>(".hero-device-top-shell__row")
  const notchLead = root.querySelector<HTMLElement>(".hero-device-top-shell__lead")
  const notchSprite = root.querySelector<HTMLElement>("[data-notch-sprite]")
  const notchBoardCoco = root.querySelector<HTMLButtonElement>("[data-notch-board-coco]")
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

  const isCompactViewport = () => window.matchMedia("(max-width: 767px)").matches

  const readPixelValue = (value: string) => {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

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
    gsap.set(notch, { clearProps: "width,height" })
    baseWidth = notch.offsetWidth * deviceNotchBaseWidthScale
    baseHeight = notch.offsetHeight * deviceNotchBaseHeightScale
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
        ? "back.out(1.35)"
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
    const hovered = notch.matches(":hover")
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

  const handlePointerEnter = () => {
    isHovered = true
    if (isFoodReactionActive) return
    if (expandedMode === "none") {
      stopActiveAnimation()
      applyCreatureFrame(getOpenMouthFrame())
    }
    applyState()
    applyHoverScale()
  }

  const handlePointerLeave = () => {
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

  measureBaseSize()
  gsap.set(notch, { clearProps: "transform" })
  notchState.width = baseWidth
  notchState.height = baseHeight
  applyState(true)
  applyHoverScale(true)
  applyContentState(true)
  setSpriteMode("ambient")
  applyCreatureFrame(notchAnimationFrames.idle[0])
  gsap.set(notch, {
    autoAlpha: 0,
    pointerEvents: "none",
    "--hero-device-notch-intro-scale": 0.04,
  })
  gsap.set(notchContent, {
    autoAlpha: 0,
    y: -2,
    filter: "blur(10px)",
  })

  window.setTimeout(() => {
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
      ease: "back.out(1.2)",
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

  notch.addEventListener("pointerenter", handlePointerEnter)
  notch.addEventListener("pointerleave", handlePointerLeave)
  notchContactTrigger.addEventListener("click", toggleContactState)
  notchContactTrigger.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    toggleContactState()
  })
  notchSprite.addEventListener("click", handleSpriteHeartClick)
  notchBoardCoco?.addEventListener("click", handleSpriteHeartClick)
  foodButtons.forEach((button) => {
    button.addEventListener("click", handleFoodFeed)
  })
  document.addEventListener("pointerdown", handleDocumentPointerDown)
  window.addEventListener("scroll", handleScrollClose, { passive: true })

  window.addEventListener("resize", () => {
    measureBaseSize()
    applyState(true)
    applyHoverScale(true)
    applyContentState(true)
  })
}

function getCenteredAvatarY(clusterShell: HTMLElement, orbitAvatar: HTMLElement) {
  const shellHeight = clusterShell.offsetHeight || clusterShell.clientHeight
  const avatarHeight = orbitAvatar.offsetHeight || orbitAvatar.clientHeight

  return -((shellHeight / 2) - avatarHeight / 2)
}

function getCenterNodeOffsetX(node: HTMLElement, orbitField: HTMLElement) {
  const originLeft = getPercentFromInlineStyle(node, "left", 50)
  return ((50 - originLeft) / 100) * orbitField.clientWidth
}

function getCenterNodeOffsetY(node: HTMLElement, orbitField: HTMLElement) {
  const originTop = getPercentFromInlineStyle(node, "top", 50)
  return ((50 - originTop) / 100) * orbitField.clientHeight
}

function getClusterNodeOffsetX(
  node: HTMLElement,
  orbitField: HTMLElement,
  clusterShell: HTMLElement
) {
  const originLeft = getPercentFromInlineStyle(node, "left", 50)
  const clusterLeft = getNumericDataset(node, "clusterLeft", 50)
  const clusterOffsetLeft = (orbitField.clientWidth - clusterShell.clientWidth) / 2
  const baseTargetLeft =
    clusterOffsetLeft +
    clusterExpandShiftX +
    (clusterLeft / 100) * clusterShell.clientWidth
  const clusterCenterX = clusterOffsetLeft + clusterShell.clientWidth / 2
  const clusterOffsetTop = (orbitField.clientHeight - clusterShell.clientHeight) / 2
  const clusterTop = getNumericDataset(node, "clusterTop", 50)
  const baseTargetTop =
    clusterOffsetTop + (clusterTop / 100) * clusterShell.clientHeight
  const clusterCenterY = clusterOffsetTop + clusterShell.clientHeight / 2
  const deltaX = baseTargetLeft - clusterCenterX
  const deltaY = baseTargetTop - clusterCenterY
  const length = Math.hypot(deltaX, deltaY) || 1
  const targetLeft = baseTargetLeft + (deltaX / length) * clusterExpandGap

  return targetLeft - (originLeft / 100) * orbitField.clientWidth
}

function getClusterNodeOffsetY(
  node: HTMLElement,
  orbitField: HTMLElement,
  clusterShell: HTMLElement
) {
  const originTop = getPercentFromInlineStyle(node, "top", 50)
  const clusterTop = getNumericDataset(node, "clusterTop", 50)
  const clusterOffsetTop = (orbitField.clientHeight - clusterShell.clientHeight) / 2
  const baseTargetTop =
    clusterOffsetTop + (clusterTop / 100) * clusterShell.clientHeight
  const clusterOffsetLeft = (orbitField.clientWidth - clusterShell.clientWidth) / 2
  const clusterLeft = getNumericDataset(node, "clusterLeft", 50)
  const baseTargetLeft =
    clusterOffsetLeft +
    clusterExpandShiftX +
    (clusterLeft / 100) * clusterShell.clientWidth
  const clusterCenterX = clusterOffsetLeft + clusterShell.clientWidth / 2
  const clusterCenterY = clusterOffsetTop + clusterShell.clientHeight / 2
  const deltaX = baseTargetLeft - clusterCenterX
  const deltaY = baseTargetTop - clusterCenterY
  const length = Math.hypot(deltaX, deltaY) || 1
  const targetTop = baseTargetTop + (deltaY / length) * clusterExpandGap

  return targetTop - (originTop / 100) * orbitField.clientHeight
}

export function initHeroOrbit() {
  const roots = document.querySelectorAll<HTMLElement>("[data-hero-root]")
  const debugScroll = new URL(window.location.href).searchParams.has(
    scrollDebugParam
  )

  for (const root of roots) {
    if (root.dataset.bound === "true") continue
    root.dataset.bound = "true"

    initDeviceNotch(root)

    const title = root.querySelector<HTMLElement>("[data-title]")
    const titlePieces = root.querySelectorAll<HTMLElement>("[data-title-piece]")
    const heroImage = root.querySelector<HTMLElement>("[data-hero-image]")
    const orbitScene = root.querySelector<HTMLElement>("[data-orbit-scene]")
    const orbitField = root.querySelector<HTMLElement>(".hero-orbit-field")
    const orbitGraphic = root.querySelector<HTMLElement>("[data-orbit-graphic]")
    const originNodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-orbit-origin-node]")
    )
    const clusterShell = root.querySelector<HTMLElement>("[data-orbit-cluster]")
    const clusterLayer = root.querySelector<HTMLElement>("[data-orbit-cluster-layer]")
    const orbitAvatar = root.querySelector<HTMLElement>("[data-orbit-avatar]")
    const orbitMeta = root.querySelector<HTMLElement>("[data-orbit-meta]")
    const introStep = root.querySelector<HTMLElement>('[data-story-step="Intro"]')

    if (
      !title ||
      !heroImage ||
      !orbitScene ||
      !orbitField ||
      !orbitGraphic ||
      !clusterShell ||
      !clusterLayer ||
      !orbitAvatar ||
      !orbitMeta ||
      !introStep
    ) {
      continue
    }

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
      gsap.set(clusterLayer, { autoAlpha: 0 })
      gsap.set(orbitAvatar, {
        autoAlpha: 0,
        scale: 0.78,
        y: getCenteredAvatarY(clusterShell, orbitAvatar),
        filter: "blur(10px)",
      })
      gsap.set(orbitMeta, {
        autoAlpha: 0,
        y: 10,
        filter: "blur(10px)",
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

    const setIntroNodeState = () => {
      gsap.set(originNodes, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      })
      gsap.set(clusterLayer, { autoAlpha: 0 })
      gsap.set(orbitAvatar, {
        autoAlpha: 0,
        scale: 0.78,
        y: getCenteredAvatarY(clusterShell, orbitAvatar),
        filter: "blur(10px)",
      })
      gsap.set(orbitMeta, {
        autoAlpha: 0,
        y: 10,
        filter: "blur(10px)",
      })
      gsap.set(title, {
        autoAlpha: 1,
        filter: "blur(0px)",
      })
    }

    const setCollapsedCenterState = () => {
      gsap.set(title, {
        autoAlpha: 0,
        filter: "blur(6px)",
      })
      gsap.set(clusterLayer, { autoAlpha: 1 })
      gsap.set(orbitAvatar, {
        autoAlpha: 1,
        scale: 0.94,
        y: getCenteredAvatarY(clusterShell, orbitAvatar),
        filter: "blur(0px)",
      })
      gsap.set(orbitMeta, {
        autoAlpha: 0,
        y: 10,
        filter: "blur(10px)",
      })
      gsap.set(originNodes, {
        x: (_, node) => getCenterNodeOffsetX(node as HTMLElement, orbitField),
        y: (_, node) => getCenterNodeOffsetY(node as HTMLElement, orbitField),
        autoAlpha: 0.22,
        scale: 0.42,
        filter: "blur(14px)",
      })
    }

    const createIntroScrub = () => {
      const introDistance = Math.max(introStep.offsetHeight, window.innerHeight)
      const {
        collapseStartPx,
        expandStartPx,
        introEndDistance,
      } = getHeroSequenceRuntime(introDistance, originNodes.length)
      const { intro, collapse, expand } = heroSequenceMotion

      const timeline = gsap.timeline({
        defaults: { ease: "none", overwrite: "auto" },
        scrollTrigger: {
          id: "hero-intro-scrub",
          trigger: root,
          start: "top top",
          end: () => `+=${introEndDistance}`,
          scrub: true,
          markers: getMarkerConfig(debugScroll),
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
      const introScrollTrigger = timeline.scrollTrigger

      gsap.fromTo(
        orbitGraphic,
        {
          rotate: -45,
        },
        {
          rotate: 135,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            id: "hero-orbit-rotation",
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            markers: debugScroll
              ? {
                startColor: "#f59e0b",
                endColor: "#f59e0b",
                fontSize: "11px",
                fontWeight: "600",
                indent: 92,
              }
              : false,
          },
        }
      )

      timeline.set(orbitScene, { pointerEvents: "auto" }, 0)
      timeline.fromTo(
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
        },
        0
      )
      timeline.to(
        orbitScene,
        {
          autoAlpha: 1,
          duration: intro.orbitSceneInDuration,
        },
        intro.orbitSceneInAt
      )
      timeline.to(
        orbitGraphic,
        {
          autoAlpha: 1,
          scale: 1,
          duration: intro.orbitGraphicInDuration,
        },
        intro.orbitGraphicInAt
      )
      timeline.to(
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

      const activeTimelineDuration = timeline.duration()
      const introHoldDuration =
        activeTimelineDuration * ((introEndDistance - introDistance) / introDistance)

      if (introHoldDuration > 0) {
        timeline.to({}, { duration: introHoldDuration })
      }

      const freezeIntroScrub = () => {
        introScrollTrigger?.disable(false)
        timeline.progress(1).pause()
      }

      const resumeIntroScrub = () => {
        introScrollTrigger?.enable()
        introScrollTrigger?.update()
      }

      const collapseTimeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.inOut",
          overwrite: false,
        },
        onReverseComplete: () => {
          setIntroNodeState()
          resumeIntroScrub()
        },
      })

      const collapseToCenterDuration = collapse.nodesToCenterDuration
      const avatarInStart = collapseToCenterDuration

      collapseTimeline.to(title, {
        autoAlpha: 0,
        filter: "blur(6px)",
        duration: collapse.titleOutDuration,
      })
      collapseTimeline.to(
        clusterLayer,
        {
          autoAlpha: 1,
          duration: 0.01,
        },
        avatarInStart
      )
      collapseTimeline.to(
        orbitAvatar,
        {
          autoAlpha: 1,
          scale: 0.94,
          y: getCenteredAvatarY(clusterShell, orbitAvatar),
          filter: "blur(0px)",
          duration: collapse.avatarInDuration,
          ease: "power3.out",
        },
        avatarInStart
      )
      collapseTimeline.to(
        originNodes,
        {
          x: (_, node) => getCenterNodeOffsetX(node as HTMLElement, orbitField),
          y: (_, node) => getCenterNodeOffsetY(node as HTMLElement, orbitField),
          autoAlpha: 0.22,
          scale: 0.42,
          filter: "blur(14px)",
          duration: collapseToCenterDuration,
          stagger: 0,
        },
        0
      )

      const expandTimeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.inOut",
          overwrite: false,
        },
        onReverseComplete: setCollapsedCenterState,
      })
      const bubbleExpandStart = expand.bubbleInDelay
      const metaInStart = expand.metaInDelay

      expandTimeline.to(
        orbitAvatar,
        {
          scale: 1,
          y: getCenteredAvatarY(clusterShell, orbitAvatar),
          filter: "blur(0px)",
          duration: expand.avatarSettleDuration,
          ease: "power3.out",
        },
        0
      )
      expandTimeline.to(
        originNodes,
        {
          autoAlpha: 1,
          x: (_, node) =>
            getClusterNodeOffsetX(node as HTMLElement, orbitField, clusterShell),
          y: (_, node) =>
            getClusterNodeOffsetY(node as HTMLElement, orbitField, clusterShell),
          scale: (_, node) =>
            getNumericDataset(node as HTMLElement, "clusterScale", 1),
          filter: "blur(0px)",
          duration: expand.bubbleInDuration,
          stagger: 0,
          ease: "power3.inOut",
        },
        bubbleExpandStart
      )
      expandTimeline.to(
        orbitMeta,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: expand.metaInDuration,
          ease: "power3.out",
        },
        metaInStart
      )

      ScrollTrigger.create({
        id: "hero-collapse-trigger",
        trigger: root,
        start: () => `top+=${collapseStartPx} top`,
        end: () => `top+=${collapseStartPx} top`,
        markers: debugScroll
          ? {
            startColor: "#fb7185",
            endColor: "#fb7185",
            fontSize: "11px",
            fontWeight: "600",
            indent: 44,
          }
          : false,
        onEnter: () => {
          freezeIntroScrub()
          collapseTimeline.pause(0)
          collapseTimeline.play(0)
        },
        onLeaveBack: () => {
          expandTimeline.pause(0)
          collapseTimeline.pause().progress(1)
          setCollapsedCenterState()
          collapseTimeline.reverse()
        },
      })

      ScrollTrigger.create({
        id: "hero-expand-trigger",
        trigger: root,
        start: () => `top+=${expandStartPx} top`,
        end: () => `top+=${expandStartPx} top`,
        markers: debugScroll
          ? {
            startColor: "#4ade80",
            endColor: "#4ade80",
            fontSize: "11px",
            fontWeight: "600",
            indent: 68,
          }
          : false,
        onEnter: () => {
          freezeIntroScrub()
          collapseTimeline.pause().progress(1)
          setCollapsedCenterState()
          expandTimeline.play(0)
        },
        onLeaveBack: () => expandTimeline.reverse(),
      })
    }

    prepareInitialState()
    createIntroScrub()
  }
}
