"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

import HeaderOrbitArtCard from "./HeaderOrbitArtCard"
import HeaderOrbitArtNodes from "./HeaderOrbitArtNodes"
import HeaderOrbitDevCard from "./HeaderOrbitDevCard"
import HeaderOrbitDevNodes from "./HeaderOrbitDevNodes"
import HeaderOrbitFrame from "./HeaderOrbitFrame"
import HeaderMobileCluster from "./HeaderMobileCluster"
import HeaderOrbitPassportCard from "./HeaderOrbitPassportCard"
import HeaderOrbitPassportNodes from "./HeaderOrbitPassportNodes"
import {
  orbitNodesContainerVariants,
} from "./HeaderOrbitMotion"
import type { HeaderOrbitTab } from "./HeaderOrbitTabs"

type HeaderOrbitSceneProps = {
  activeTab: HeaderOrbitTab
  visible: boolean
}

function HeaderOrbitTabNodes({ activeTab }: { activeTab: HeaderOrbitTab }) {
  switch (activeTab) {
    case "Dev":
      return <HeaderOrbitDevNodes />
    case "Art":
      return <HeaderOrbitArtNodes />
    case "Passport":
      return <HeaderOrbitPassportNodes />
    default:
      return null
  }
}

function HeaderOrbitTabCard({
  activeTab,
  motionPreset,
}: {
  activeTab: HeaderOrbitTab
  motionPreset: "open" | "switch"
}) {
  switch (activeTab) {
    case "Dev":
      return <HeaderOrbitDevCard motionPreset={motionPreset} />
    case "Art":
      return <HeaderOrbitArtCard motionPreset={motionPreset} />
    case "Passport":
      return <HeaderOrbitPassportCard motionPreset={motionPreset} />
    default:
      return null
  }
}

function HeaderOrbitCardLayer({
  activeTab,
  motionPreset,
}: {
  activeTab: HeaderOrbitTab
  motionPreset: "open" | "switch"
}) {
  if (activeTab === "Art") {
    return (
      <div className="pointer-events-auto absolute inset-0 z-20 overflow-y-auto overscroll-contain px-4 pb-32 pt-56 sm:px-6 sm:pt-20">
        <div className="mx-auto flex min-h-full w-full max-w-6xl items-start justify-center">
          <AnimatePresence mode="wait">
            <HeaderOrbitTabCard
              key={activeTab}
              activeTab={activeTab}
              motionPreset={motionPreset}
            />
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="absolute inset-0 z-20 hidden items-center justify-center md:flex">
        <AnimatePresence mode="wait">
          <HeaderOrbitTabCard
            key={activeTab}
            activeTab={activeTab}
            motionPreset={motionPreset}
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 md:hidden">
        <div className="flex w-full max-w-sm flex-col items-center">
          {activeTab !== "Passport" ? (
            <HeaderMobileCluster activeTab={activeTab} />
          ) : null}

          <div className={cn(activeTab !== "Passport" ? "mt-5" : "")}>
            <AnimatePresence mode="wait">
              <HeaderOrbitTabCard
                key={activeTab}
                activeTab={activeTab}
                motionPreset={motionPreset}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

export default function HeaderOrbitScene({
  activeTab,
  visible,
}: HeaderOrbitSceneProps) {
  const previousTabRef = useRef(activeTab)
  const previousVisibleRef = useRef(visible)

  const motionPreset: "open" | "switch" =
    visible && previousVisibleRef.current && previousTabRef.current !== activeTab
      ? "switch"
      : "open"

  useEffect(() => {
    previousTabRef.current = activeTab
    previousVisibleRef.current = visible
  }, [activeTab, visible])

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      )}
    >
      <AnimatePresence mode="wait">
        {visible ? (
          <>
            <div className="hidden md:block">
              <HeaderOrbitFrame>
                <motion.div
                  key="header-orbit-nodes"
                  variants={orbitNodesContainerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <HeaderOrbitTabNodes activeTab={activeTab} />
                </motion.div>
              </HeaderOrbitFrame>
            </div>

            <HeaderOrbitCardLayer
              activeTab={activeTab}
              motionPreset={motionPreset}
            />
          </>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
