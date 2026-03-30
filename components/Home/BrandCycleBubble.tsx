"use client"

import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { useCursorProximity } from "./use-cursor-proximity"
import { useLogoCycle } from "./use-logo-cycle"

type BrandCycleBaseLogo = {
  alt: string
  className?: string
  key?: string
}

type BrandCycleImageLogo = BrandCycleBaseLogo & {
  height: number
  node?: never
  src: string
  width: number
}

type BrandCycleNodeLogo = BrandCycleBaseLogo & {
  height?: never
  node: ReactNode
  src?: never
  width?: never
}

type BrandCycleLogo = BrandCycleImageLogo | BrandCycleNodeLogo

type BrandCycleBubbleProps = {
  logos: BrandCycleLogo[]
  proximityRadius?: number
}

const bubbleLogoTransitionMs = 420

const bubbleLogoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.72,
    filter: "blur(4px)",
    transition: {
      duration: 0.14,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.01,
    },
  },
  incoming: {
    opacity: [0, 0.72, 1],
    scale: [0.72, 1.08, 1],
    filter: ["blur(5px)", "blur(1.5px)", "blur(0px)"],
    transition: {
      duration: bubbleLogoTransitionMs / 1000,
      ease: [0.22, 1, 0.36, 1] as const,
      times: [0, 0.68, 1] as const,
    },
  },
  outgoing: {
    opacity: [1, 0],
    scale: [1, 0.82],
    filter: ["blur(0px)", "blur(4px)"],
    transition: {
      duration: (bubbleLogoTransitionMs - 40) / 1000,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
}

export default function BrandCycleBubble({
  logos,
  proximityRadius = 250,
}: BrandCycleBubbleProps) {
  const { elementRef, isNear } = useCursorProximity<HTMLDivElement>({
    radius: proximityRadius,
  })
  const targetIndex = useLogoCycle({
    active: isNear,
    total: logos.length,
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (logos.length <= 1 || targetIndex === currentIndex) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setPreviousIndex(currentIndex)
    setCurrentIndex(targetIndex)
    setIsTransitioning(true)

    timeoutRef.current = setTimeout(() => {
      setPreviousIndex(null)
      setIsTransitioning(false)
      timeoutRef.current = null
    }, bubbleLogoTransitionMs)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [currentIndex, logos.length, targetIndex])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (logos.length === 0) {
    return null
  }

  return (
    <div
      ref={elementRef}
      className="relative flex size-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
    >
      {logos.map((logo, index) => {
        let animate: keyof typeof bubbleLogoVariants = "hidden"

        if (index === currentIndex) {
          animate = isTransitioning ? "incoming" : "visible"
        } else if (index === previousIndex && isTransitioning) {
          animate = "outgoing"
        }

        return (
          <motion.div
            key={logo.key ?? ("src" in logo ? logo.src : logo.alt)}
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={animate}
            variants={bubbleLogoVariants}
            style={{ pointerEvents: "none" }}
          >
            {"node" in logo ? (
              <div className={logo.className}>{logo.node}</div>
            ) : (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={logo.className ?? "object-contain"}
                loading="eager"
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
