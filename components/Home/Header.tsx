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
  const [isTitleVisible, setIsTitleVisible] = useState(true)
  const orbitVisibleRef = useRef(isOrbitVisible)

  useEffect(() => {
    setIsOrbitVisible(false)
    setAreOrbitTabsVisible(false)
    setIsTitleVisible(true)
  }, [])

  useEffect(() => {
    orbitVisibleRef.current = isOrbitVisible
  }, [isOrbitVisible])

  function handleOrbitToggle() {
    if (isOrbitVisible) {
      setAreOrbitTabsVisible(false)
      setIsOrbitVisible(false)
      return
    }

    setIsTitleVisible(false)
    setIsOrbitVisible(true)
    setAreOrbitTabsVisible(true)
  }

  function handleOrbitExitComplete() {
    if (!orbitVisibleRef.current) {
      setIsTitleVisible(true)
    }
  }

  return (
    <>
      <section
        id="header"
        className="custom-cursor relative isolate flex h-dvh w-full flex-col items-center justify-center gap-4 overflow-hidden text-center"
      >
        <HeaderTitleLayer visible={isTitleVisible} />

        <HeaderInteractiveLayer
          activeTab={activeTab}
          onOrbitExitComplete={handleOrbitExitComplete}
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
