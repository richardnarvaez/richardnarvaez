import { gsap } from "gsap"
import { closeNotchAudio, playRetroHeartTone } from "./notch.audio"
import {
  deviceNotchMetrics,
  notchAnimationFrames,
  notchToneClasses,
  type NotchSpriteMode,
} from "./notch.sprites"

const deviceNotchBaseWidthScale = 0.62
const deviceNotchBaseHeightScale = 0.75
const deviceNotchClosedWidthScale = 1.2
const deviceNotchClosedHeightScale = 1.1
const deviceNotchOpenBottomRadiusScale = 2.35
const notchIntroDelayMs = 1000
const heartReactionDurationMs = 2000

const isMobileOrbitViewport = () =>
  window.matchMedia("(max-width: 767px)").matches

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

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
    if (contactPreviewItems.length) gsap.to(contactPreviewItems, {
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
    if (contactLinks.length) gsap.set(contactLinks, {
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


let notchAbortController: AbortController | null = null

/** Monta el pet. Idempotente: llamarlo dos veces no duplica listeners. */
export function initNotchPet(root: HTMLElement = document.body) {
  notchAbortController ??= new AbortController()
  initDeviceNotch(root, notchAbortController.signal)
}

/** Libera listeners, timers, tweens y el AudioContext. */
export function destroyNotchPet() {
  notchAbortController?.abort()
  notchAbortController = null
  closeNotchAudio()
}
