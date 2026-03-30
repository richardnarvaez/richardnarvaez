"use client"

import { AnimatePresence, motion } from "framer-motion"

import HeaderOrbitTabs, { type HeaderOrbitTab } from "./HeaderOrbitTabs"
import { orbitNodesDelay } from "./HeaderOrbitMotion"
import HeaderOrbitTrigger from "./HeaderOrbitTrigger"

type HeaderOrbitToggleProps = {
  activeTab: HeaderOrbitTab
  onToggle: () => void
  onTabSelect: (tab: HeaderOrbitTab) => void
  tabsVisible: boolean
  visible: boolean
}

export default function HeaderOrbitToggle({
  activeTab,
  onToggle,
  onTabSelect,
  tabsVisible,
  visible,
}: HeaderOrbitToggleProps) {
  return (
    <div className="absolute inset-x-0 bottom-6 z-30 flex justify-center px-3">
      <motion.div
        layout
        className="flex max-w-[calc(100vw-1.5rem)] items-center"
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 32,
          mass: 0.8,
        }}
      >
        <HeaderOrbitTrigger visible={visible} onToggle={onToggle} />

        <AnimatePresence initial={false}>
          {tabsVisible ? (
            <motion.div
              key="header-orbit-tabs"
              initial={{
                opacity: 0,
                width: 0,
                marginLeft: 0,
                x: -10,
                scale: 0.98,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                width: "auto",
                marginLeft: 8,
                x: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: {
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                  delay: orbitNodesDelay,
                },
              }}
              exit={{
                opacity: 0,
                width: 0,
                marginLeft: 0,
                x: -10,
                scaleX: 0.82,
                scaleY: 0.96,
                filter: "blur(12px)",
                transition: {
                  duration: 0.22,
                  ease: [0.4, 0, 1, 1],
                },
              }}
              className="min-w-0 origin-left overflow-hidden"
            >
              <HeaderOrbitTabs activeTab={activeTab} onSelect={onTabSelect} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
