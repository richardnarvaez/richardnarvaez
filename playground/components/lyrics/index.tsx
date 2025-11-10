"use client"

import React, { useEffect, useMemo, useRef } from "react"
import { gsap } from "gsap"

import { lyrics } from "./data"

interface VideoLyricsProps {
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
  videoClassName?: string
}

const VideoLyrics: React.FC<VideoLyricsProps> = ({
  enableBlur = true,
  baseOpacity = 0.9,
  baseRotation = 0,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  videoClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const segmentRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const segmentAnimations = useRef<Map<number, gsap.core.Tween>>(new Map())

  const allWords = lyrics.segments.flatMap((segment) => segment.words)
  const wordOnlyData = allWords.filter((word) => word.type === "word")
  const totalDuration =
    wordOnlyData.length > 0 ? wordOnlyData[wordOnlyData.length - 1].end : 0
  const totalWords = wordOnlyData.length

  const segmentData = useMemo(() => {
    return lyrics.segments.map((segment) => {
      const segmentWords = segment.words.filter((w) => w.type === "word")
      return {
        start: segmentWords.length > 0 ? segmentWords[0].start : 0,
        end:
          segmentWords.length > 0
            ? segmentWords[segmentWords.length - 1].end
            : 0,
      }
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video || totalWords === 0) return

    const isDev = process.env.NODE_ENV === "development"
    let frameCount = 0
    let lastTime = performance.now()
    let lastFPS = 60

    const updateFPS = () => {
      frameCount++
      const now = performance.now()
      const elapsed = now - lastTime

      if (elapsed >= 1000) {
        lastFPS = Math.round((frameCount * 1000) / elapsed)
        if (isDev) {
          console.log(`🎬 FPS: ${lastFPS}`)
          if (lastFPS < 30) {
            console.warn(`⚠️ Low FPS detected: ${lastFPS} fps`)
          }
        }
        frameCount = 0
        lastTime = now
      }
    }

    const wordElements = container.querySelectorAll<HTMLElement>(".word")

    const wordElementMap = new Map<
      string,
      { element: HTMLElement; index: number }
    >()
    wordElements.forEach((wordEl) => {
      const startAttr = wordEl.getAttribute("data-start")
      const endAttr = wordEl.getAttribute("data-end")
      if (startAttr && endAttr) {
        const key = `${startAttr}-${endAttr}`
        const wordIndex = wordOnlyData.findIndex(
          (w) =>
            Math.abs(w.start - parseFloat(startAttr)) < 0.01 &&
            Math.abs(w.end - parseFloat(endAttr)) < 0.01
        )
        if (wordIndex !== -1) {
          wordElementMap.set(key, { element: wordEl, index: wordIndex })
        }
      }

      gsap.set(wordEl, {
        opacity: baseOpacity,
        filter: enableBlur ? `blur(${blurStrength}px)` : "none",
        transformOrigin: "0% 50%",
        rotate: baseRotation,
      })
    })

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3)
    }

    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    }

    const updateAnimations = (currentTime: number) => {
      const frameStart = performance.now()
      const adjustedTime = currentTime + 0.3
      let currentWordIndex = -1

      for (let i = 0; i < wordOnlyData.length; i++) {
        const word = wordOnlyData[i]
        if (adjustedTime >= word.start && adjustedTime <= word.end) {
          currentWordIndex = i
          break
        }
      }

      if (currentWordIndex === -1) {
        for (let i = wordOnlyData.length - 1; i >= 0; i--) {
          if (adjustedTime >= wordOnlyData[i].end) {
            currentWordIndex = i
            break
          }
        }
      }

      if (currentWordIndex === -1) {
        currentWordIndex = 0
      }

      const wordsAhead = Math.max(1, Math.floor(blurStrength / 2))
      const endRange = Math.min(
        wordOnlyData.length - 1,
        currentWordIndex + wordsAhead
      )

      const currentWord = wordOnlyData[currentWordIndex]
      const referenceTime = currentWord ? currentWord.start : adjustedTime

      wordElementMap.forEach(({ element: wordEl, index: wordIndex }) => {
        const wordData = wordOnlyData[wordIndex]
        if (!wordData) return

        const { start, end } = wordData
        const wordDuration = end - start
        const animationStart = start - wordDuration * 0.5

        if (adjustedTime >= end) {
          gsap.set(wordEl, {
            opacity: 1,
            filter: "blur(0px)",
            rotate: 0,
          })
        } else if (adjustedTime >= animationStart) {
          const rawProgress = Math.max(
            0,
            Math.min(
              1,
              (adjustedTime - animationStart) / (end - animationStart)
            )
          )
          const easedProgress = easeOutCubic(rawProgress)

          gsap.set(wordEl, {
            opacity: baseOpacity + (1 - baseOpacity) * easedProgress,
            filter: enableBlur
              ? `blur(${blurStrength * (1 - easedProgress)}px)`
              : "none",
            rotate: baseRotation * (1 - easedProgress),
          })
        } else if (wordIndex <= endRange && wordIndex > currentWordIndex) {
          const timeUntilStart = start - adjustedTime
          const lastWordInRange = wordOnlyData[endRange]
          const maxTimeUntilStart = lastWordInRange
            ? lastWordInRange.start - adjustedTime
            : timeUntilStart

          if (timeUntilStart > 0 && maxTimeUntilStart > 0) {
            const normalizedTime = timeUntilStart / maxTimeUntilStart
            const rawProgress = Math.max(0, Math.min(1, 1 - normalizedTime))
            const easedProgress = easeInOutQuad(rawProgress) * 0.5

            gsap.set(wordEl, {
              opacity: baseOpacity + (1 - baseOpacity) * easedProgress,
              filter: enableBlur
                ? `blur(${blurStrength * (1 - easedProgress)}px)`
                : "none",
              rotate: baseRotation * (1 - easedProgress),
            })
          } else {
            gsap.set(wordEl, {
              opacity: baseOpacity,
              filter: enableBlur ? `blur(${blurStrength}px)` : "none",
              rotate: baseRotation,
            })
          }
        } else {
          gsap.set(wordEl, {
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : "none",
            rotate: baseRotation,
          })
        }
      })

      updateFPS()

      if (isDev) {
        const frameDuration = performance.now() - frameStart
        if (frameDuration > 16) {
          console.warn(
            `🐌 Slow frame: ${frameDuration.toFixed(2)}ms (target: <16ms for 60fps)`
          )
        }
      }
    }

    let currentActiveSegment = -1

    const updateActiveSegment = (currentTime: number) => {
      const adjustedTime = currentTime + 0.3
      let activeSegmentIndex = -1

      for (let i = 0; i < segmentData.length; i++) {
        const segment = segmentData[i]
        if (adjustedTime >= segment.start && adjustedTime <= segment.end) {
          activeSegmentIndex = i
          break
        }
      }

      if (activeSegmentIndex === -1) {
        for (let i = segmentData.length - 1; i >= 0; i--) {
          if (adjustedTime >= segmentData[i].end) {
            activeSegmentIndex = i
            break
          }
        }
      }

      if (activeSegmentIndex === -1) {
        activeSegmentIndex = 0
      }

      if (activeSegmentIndex !== currentActiveSegment) {
        const previousActiveSegment = currentActiveSegment
        currentActiveSegment = activeSegmentIndex

        segmentRefs.current.forEach((segmentEl, index) => {
          if (!segmentEl) return

          const existingAnimation = segmentAnimations.current.get(index)
          if (existingAnimation) {
            existingAnimation.kill()
            segmentAnimations.current.delete(index)
          }

          if (index === currentActiveSegment) {
            const animation = gsap.fromTo(
              segmentEl,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              }
            )
            segmentAnimations.current.set(index, animation)
          } else if (index === previousActiveSegment) {
            const animation = gsap.to(segmentEl, {
              opacity: 0,
              y: -20,
              duration: 0.4,
              ease: "power2.in",
            })
            segmentAnimations.current.set(index, animation)
          } else {
            gsap.set(segmentEl, {
              opacity: 0,
              y: 30,
            })
          }
        })
      } else {
        segmentRefs.current.forEach((segmentEl, index) => {
          if (!segmentEl) return

          if (index !== currentActiveSegment) {
            const existingAnimation = segmentAnimations.current.get(index)
            if (existingAnimation) {
              existingAnimation.kill()
              segmentAnimations.current.delete(index)
            }
            gsap.set(segmentEl, {
              opacity: 0,
              y: 30,
            })
          }
        })
      }
    }

    let rafId: number | null = null
    let isPlaying = false

    const animate = () => {
      if (video && isPlaying) {
        const currentTime = video.currentTime
        updateAnimations(currentTime)
        updateActiveSegment(currentTime)
        rafId = requestAnimationFrame(animate)
      }
    }

    const handlePlay = () => {
      isPlaying = true
      if (rafId === null) {
        rafId = requestAnimationFrame(animate)
      }
    }

    const handlePause = () => {
      isPlaying = false
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    const handleSeeked = () => {
      if (video) {
        const currentTime = video.currentTime
        updateAnimations(currentTime)
        updateActiveSegment(currentTime)
      }
    }

    segmentRefs.current.forEach((segmentEl) => {
      if (segmentEl) {
        gsap.set(segmentEl, {
          opacity: 0,
          y: 30,
        })
      }
    })

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("seeked", handleSeeked)

    const firstSegmentEl = segmentRefs.current.get(0)
    if (firstSegmentEl) {
      gsap.set(firstSegmentEl, {
        opacity: 1,
        y: 0,
      })
      currentActiveSegment = 0
    }

    if (!video.paused) {
      isPlaying = true
      rafId = requestAnimationFrame(animate)
    } else {
      const currentTime = video.currentTime
      updateActiveSegment(currentTime)
    }

    const animationsMap = segmentAnimations.current

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("seeked", handleSeeked)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      animationsMap.forEach((animation) => {
        animation.kill()
      })
      animationsMap.clear()
    }
  }, [
    enableBlur,
    baseOpacity,
    baseRotation,
    blurStrength,
    wordOnlyData,
    totalWords,
    segmentData,
  ])

  return (
    <div className={`relative ${containerClassName} h-[500px] w-full bg-white`}>
      <video
        ref={videoRef}
        src="/videos/lyrics.mp4"
        className={`w-full ${videoClassName} sticky top-0 z-10 aspect-video w-[250px] overflow-hidden rounded-lg bg-black`}
        controls
      />
      <div
        ref={containerRef}
        className="pointer-events-none relative m-5 min-h-[400px]"
      >
        {lyrics.segments.map((segment, segmentIndex) => {
          const segmentWords = segment.words.filter((w) => w.type === "word")
          const segmentStart =
            segmentWords.length > 0 ? segmentWords[0].start : 0
          const segmentEnd =
            segmentWords.length > 0
              ? segmentWords[segmentWords.length - 1].end
              : 0

          return (
            <div
              key={segmentIndex}
              ref={(el) => {
                if (el) {
                  segmentRefs.current.set(segmentIndex, el)
                } else {
                  segmentRefs.current.delete(segmentIndex)
                }
              }}
              className="absolute inset-x-0 top-0"
            >
              <div className="mb-4 text-sm text-gray-600">
                {segmentStart.toFixed(2)}s - {segmentEnd.toFixed(2)}s
              </div>
              <h2>
                <p
                  className={`text-[clamp(1.6rem,4vw,3rem)] font-semibold leading-normal text-gray-900 ${textClassName}`}
                >
                  {segment.words.map((word, wordIndex) => {
                    const globalIndex =
                      lyrics.segments
                        .slice(0, segmentIndex)
                        .reduce((acc, seg) => acc + seg.words.length, 0) +
                      wordIndex

                    if (word.type === "spacing") {
                      return <span key={globalIndex}>{word.text}</span>
                    }

                    return (
                      <span
                        key={globalIndex}
                        className="word inline-block"
                        data-start={word.start}
                        data-end={word.end}
                      >
                        {word.text}
                      </span>
                    )
                  })}
                </p>
              </h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VideoLyrics
