"use client"

import { useEffect, useMemo, useRef, type ReactNode } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

type MacScrollScrubProps = {
  children?: ReactNode
  frameCount: number
  framePathTemplate: string
  posterHeight: number
  posterSrc: string
  posterWidth: number
  sectionClassName?: string
}

export default function MacScrollScrub({
  children,
  frameCount,
  framePathTemplate,
  posterHeight,
  posterSrc,
  posterWidth,
  sectionClassName,
}: MacScrollScrubProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const loadedFramesRef = useRef<HTMLImageElement[]>([])
  const reduceMotion = useReducedMotion()
  const frameSources = useMemo(
    () =>
      Array.from({ length: frameCount }, (_, index) =>
        framePathTemplate.replace("[index]", index.toString().padStart(3, "0"))
      ),
    [frameCount, framePathTemplate]
  )

  useEffect(() => {
    if (reduceMotion) return

    loadedFramesRef.current = frameSources.map((source) => {
      const img = new window.Image()
      img.decoding = "async"
      img.src = source
      return img
    })

    return () => {
      loadedFramesRef.current = []
    }
  }, [frameSources, reduceMotion])

  useGSAP(
    () => {
      if (reduceMotion) return

      const section = sectionRef.current
      const image = imageRef.current

      if (!section || !image) return

      const frameState = { index: 0 }
      let scrubTween: gsap.core.Tween | null = null
      let currentFrame = -1

      const renderFrame = (nextIndex: number) => {
        const safeIndex = Math.max(0, Math.min(frameCount - 1, nextIndex))
        if (safeIndex === currentFrame) return

        image.src = frameSources[safeIndex]
        currentFrame = safeIndex
      }

      renderFrame(0)

      scrubTween = gsap.to(frameState, {
        index: frameCount - 1,
        ease: "none",
        overwrite: true,
        snap: "index",
        onUpdate: () => {
          renderFrame(frameState.index)
        },
        scrollTrigger: {
          trigger: section,
          start: "top 66%",
          end: "top 50%",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        scrubTween?.kill()
      }
    },
    {
      scope: sectionRef,
      dependencies: [frameCount, frameSources, reduceMotion],
    }
  )

  return (
    <div ref={sectionRef} className={cn("relative", sectionClassName)}>
      <div className="sticky top-0 flex items-center justify-center">
        <div className="absolute size-full bg-black"></div>
        <div className="absolute inset-x-0 -top-28 h-28 bg-gradient-to-b from-transparent to-black sm:h-40" />
        <div className="absolute inset-x-0 -bottom-28 h-28 bg-gradient-to-t from-transparent to-black sm:h-40" />

        <div className="relative w-full px-4 sm:px-6">
          <div className="relative mx-auto w-full max-w-[800px]">
            {reduceMotion ? (
              <Image
                src={posterSrc}
                alt=""
                width={posterWidth}
                height={posterHeight}
                className="h-auto w-full select-none object-contain"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={imageRef}
                src={frameSources[0]}
                alt=""
                className="h-auto w-full select-none object-contain"
                aria-hidden="true"
                draggable={false}
              />
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
