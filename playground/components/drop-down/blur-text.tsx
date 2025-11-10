import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"

type Snapshot = Record<string, string | number>

type BlurTextProps = {
  text?: string
  delay?: number
  className?: string
  direction?: "top" | "bottom"
  threshold?: number
  rootMargin?: string
  animationFrom?: Snapshot
  animationTo?: Snapshot[]
  easing?: string | ((value: number) => number)
  onAnimationComplete?: () => void
  stepDuration?: number
}

const BlurText = ({
  text = "",
  delay = 50,
  className = "",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = "power2.out",
  onAnimationComplete,
  stepDuration = 0.2,
}: BlurTextProps) => {
  const elements = useMemo(() => text.split(""), [text])
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const defaultFrom = useMemo<Snapshot>(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  )

  const defaultTo = useMemo<Snapshot[]>(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  useEffect(() => {
    if (!inView || !ref.current) return
    const spans = Array.from(ref.current.querySelectorAll("span"))
    const animations = spans.map((span, index) => {
      gsap.set(span, fromSnapshot)
      const timeline = gsap.timeline({
        delay: (index * delay) / 1000,
        defaults: { ease: easing, duration: stepDuration },
      })
      toSnapshots.forEach((snapshot, snapshotIndex) => {
        timeline.to(span, snapshot, snapshotIndex === 0 ? 0 : ">")
      })
      return timeline
    })
    const lastAnimation = animations.at(-1)
    if (lastAnimation && onAnimationComplete) {
      lastAnimation.eventCallback("onComplete", onAnimationComplete)
    }
    return () => {
      animations.forEach((timeline) => timeline.kill())
    }
  }, [
    delay,
    easing,
    fromSnapshot,
    inView,
    onAnimationComplete,
    stepDuration,
    toSnapshots,
  ])

  const paragraphClassName = className
    ? `flex flex-wrap ${className}`
    : "flex flex-wrap"

  return (
    <p ref={ref} className={paragraphClassName}>
      {elements.map((segment, index) => (
        <span
          className="inline-block will-change-[transform,filter,opacity]"
          key={`${segment}-${index}`}
        >
          {segment === " " ? "\u00A0" : segment}
        </span>
      ))}
    </p>
  )
}

export default BlurText
