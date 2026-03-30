"use client"

import { useEffect, useRef, useState } from "react"

type UseCursorProximityOptions = {
  radius?: number
}

export function useCursorProximity<T extends HTMLElement>({
  radius = 180,
}: UseCursorProximityOptions = {}) {
  const elementRef = useRef<T | null>(null)
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    let frameId: number | null = null

    const updateProximity = (clientX: number, clientY: number) => {
      const element = elementRef.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.hypot(clientX - centerX, clientY - centerY)

      setIsNear((previous) => {
        const next = distance <= radius
        return previous === next ? previous : next
      })
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }

      frameId = requestAnimationFrame(() => {
        updateProximity(event.clientX, event.clientY)
      })
    }

    const handlePointerLeave = () => {
      setIsNear(false)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerleave", handlePointerLeave)
    window.addEventListener("blur", handlePointerLeave)

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }

      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      window.removeEventListener("blur", handlePointerLeave)
    }
  }, [radius])

  return {
    elementRef,
    isNear,
  }
}
