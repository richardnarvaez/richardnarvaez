"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export const orbitTabs = ["Dev", "Art", "Passport"] as const

export type HeaderOrbitTab = (typeof orbitTabs)[number]

type HeaderOrbitTabsProps = {
  activeTab: HeaderOrbitTab
  onSelect: (tab: HeaderOrbitTab) => void
}

const tabsContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.04,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.028,
      staggerDirection: -1 as const,
    },
  },
}

const tabItemVariants = {
  initial: {
    opacity: 0,
    y: 8,
    scale: 0.92,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.94,
    filter: "blur(10px)",
    transition: {
      duration: 0.16,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
}

export default function HeaderOrbitTabs({
  activeTab,
  onSelect,
}: HeaderOrbitTabsProps) {
  return (
    <motion.div
      variants={tabsContainerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex max-w-[calc(100vw-4.5rem)] items-center gap-1.5 overflow-x-auto rounded-full border border-slate-200/80 bg-white/90 p-1.5 shadow-[0_14px_40px_rgba(15,23,42,0.24),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl"
    >
      {orbitTabs.map((tab) => (
        <motion.button
          type="button"
          key={tab}
          variants={tabItemVariants}
          onClick={() => onSelect(tab)}
          className={cn(
            "inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
            activeTab === tab
              ? "bg-slate-900 text-white"
              : "bg-transparent text-slate-600"
          )}
        >
          {tab}
        </motion.button>
      ))}
    </motion.div>
  )
}
