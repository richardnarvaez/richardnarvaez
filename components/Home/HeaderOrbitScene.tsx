"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

import HeaderMobileCluster from "./HeaderMobileCluster"
import HeaderOrbitArtCard from "./HeaderOrbitArtCard"
import HeaderOrbitArtNodes from "./HeaderOrbitArtNodes"
import HeaderOrbitDevCard from "./HeaderOrbitDevCard"
import HeaderOrbitDevNodes from "./HeaderOrbitDevNodes"
import HeaderOrbitFrame from "./HeaderOrbitFrame"
import { orbitNodesContainerVariants } from "./HeaderOrbitMotion"
import HeaderOrbitPassportCard from "./HeaderOrbitPassportCard"
import HeaderOrbitPassportNodes from "./HeaderOrbitPassportNodes"
import type { HeaderOrbitTab } from "./HeaderOrbitTabs"

type HeaderOrbitSceneProps = {
  activeTab: HeaderOrbitTab
  onExitComplete?: () => void
  visible: boolean
}

const orbitSceneVariants = {
  initial: {},
  animate: {},
  exit: {
    transition: {
      when: "afterChildren" as const,
    },
  },
}

const orbitCardLayerExit = {
  opacity: 0,
  y: 8,
  scale: 0.98,
  filter: "blur(10px)",
  transition: {
    duration: 0.16,
    ease: [0.4, 0, 1, 1] as const,
  },
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
      <motion.div
        initial={false}
        animate={{}}
        exit={orbitCardLayerExit}
        className="pointer-events-auto absolute inset-0 z-20 overflow-hidden px-4 py-20 sm:px-6 sm:py-16"
      >
        <div className="mx-auto flex min-h-full w-full max-w-6xl items-center justify-center">
          <AnimatePresence mode="wait">
            <HeaderOrbitTabCard
              key={activeTab}
              activeTab={activeTab}
              motionPreset={motionPreset}
            />
          </AnimatePresence>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div
        initial={false}
        animate={{}}
        exit={orbitCardLayerExit}
        className="absolute inset-0 z-20 hidden items-center justify-center md:flex"
      >
        <AnimatePresence mode="wait">
          <HeaderOrbitTabCard
            key={activeTab}
            activeTab={activeTab}
            motionPreset={motionPreset}
          />
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={false}
        animate={{}}
        exit={orbitCardLayerExit}
        className="absolute inset-0 z-20 flex items-center justify-center px-4 md:hidden"
      >
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
      </motion.div>
    </>
  )
}

export default function HeaderOrbitScene({
  activeTab,
  onExitComplete,
  visible,
}: HeaderOrbitSceneProps) {
  const previousTabRef = useRef(activeTab)
  const previousVisibleRef = useRef(visible)

  const motionPreset: "open" | "switch" =
    visible &&
    previousVisibleRef.current &&
    previousTabRef.current !== activeTab
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
      <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
        {visible ? (
          <motion.div
            key="header-orbit-scene"
            variants={orbitSceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0"
          >
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
