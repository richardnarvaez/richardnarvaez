"use client"

import { useEffect, useRef, useState } from "react"

import HeaderBottomFade from "@/components/Home/HeaderBottomFade"
import HeaderImage from "@/components/Home/HeaderImage"
import HeaderInteractiveLayer from "@/components/Home/HeaderInteractiveLayer"
import HeaderTitleLayer from "@/components/Home/HeaderTitleLayer"
import type { HeaderOrbitTab } from "@/components/Home/HeaderOrbitTabs"

export default function Header() {
  const [activeTab, setActiveTab] = useState<HeaderOrbitTab>("Dev")
  const [isOrbitVisible, setIsOrbitVisible] = useState(false)
  const [areOrbitTabsVisible, setAreOrbitTabsVisible] = useState(false)
  const closeOrbitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setIsOrbitVisible(false)
    setAreOrbitTabsVisible(false)
  }, [])

  useEffect(() => {
    return () => {
      if (closeOrbitTimeoutRef.current) {
        clearTimeout(closeOrbitTimeoutRef.current)
      }
    }
  }, [])

  function handleOrbitToggle() {
    if (closeOrbitTimeoutRef.current) {
      clearTimeout(closeOrbitTimeoutRef.current)
      closeOrbitTimeoutRef.current = null
    }

    if (isOrbitVisible) {
      setAreOrbitTabsVisible(false)
      closeOrbitTimeoutRef.current = setTimeout(() => {
        setIsOrbitVisible(false)
        closeOrbitTimeoutRef.current = null
      }, 100)
      return
    }

    setIsOrbitVisible(true)
    setAreOrbitTabsVisible(true)
  }

  return (
    <>
      <section
        id="header"
        className="custom-cursor relative isolate flex h-dvh w-full flex-col items-center justify-center gap-4 overflow-hidden text-center"
      >
        <HeaderTitleLayer visible={!isOrbitVisible} />

        <HeaderInteractiveLayer
          activeTab={activeTab}
          orbitVisible={isOrbitVisible}
          orbitTabsVisible={areOrbitTabsVisible}
          onTabSelect={setActiveTab}
          onToggle={handleOrbitToggle}
        />
        <HeaderBottomFade />
        <HeaderImage activeTab={activeTab} orbitVisible={isOrbitVisible} />
      </section>
    </>
  )
}
