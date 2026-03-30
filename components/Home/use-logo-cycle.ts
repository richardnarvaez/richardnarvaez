"use client"

import { useEffect, useRef, useState } from "react"

type UseLogoCycleOptions = {
  active: boolean
  intervalMs?: number
  total: number
}

export function useLogoCycle({
  active,
  intervalMs = 2200,
  total,
}: UseLogoCycleOptions) {
  const [activeIndex, setActiveIndex] = useState(0)
  const wasActiveRef = useRef(false)

  useEffect(() => {
    if (!active || total <= 1) {
      setActiveIndex(0)
      wasActiveRef.current = false
      return
    }

    if (!wasActiveRef.current) {
      setActiveIndex((current) => (current + 1) % total)
    }

    wasActiveRef.current = true

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total)
    }, intervalMs)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [active, intervalMs, total])

  return activeIndex
}
