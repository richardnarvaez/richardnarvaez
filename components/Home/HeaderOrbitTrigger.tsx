"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeftIcon, PlayIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type HeaderOrbitTriggerProps = {
  onToggle: () => void
  visible: boolean
}

const buttonTransition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.7,
}

const swapTransition = {
  duration: 0.22,
  ease: [0.22, 1, 0.36, 1] as const,
}

export default function HeaderOrbitTrigger({
  onToggle,
  visible,
}: HeaderOrbitTriggerProps) {
  return (
    <motion.button
      type="button"
      aria-label={visible ? "Return to home header" : "Show brain orbit"}
      aria-pressed={visible}
      onClick={onToggle}
      initial={false}
      animate={{
        width: visible ? 44 : 136,
        paddingLeft: visible ? 12 : 16,
        paddingRight: visible ? 12 : 16,
      }}
      transition={buttonTransition}
      className={cn(
        "relative inline-flex h-11 shrink-0 items-center overflow-hidden rounded-full border bg-white/90 text-slate-900 shadow-[0_14px_40px_rgba(15,23,42,0.24),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(244,31%,10%)]",
        visible
          ? "border-slate-200/80"
          : "border-slate-300/70 text-slate-700 hover:bg-white/80"
      )}
    >
      <span className="relative flex size-5 shrink-0 items-center justify-center">
        <AnimatePresence initial={false} mode="wait">
          {visible ? (
            <motion.span
              key="back"
              initial={{ opacity: 0, scale: 0.72, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.72, filter: "blur(8px)" }}
              transition={swapTransition}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ArrowLeftIcon className="size-4" />
            </motion.span>
          ) : (
            <motion.span
              key="play"
              initial={{ opacity: 0, scale: 0.72, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.72, filter: "blur(8px)" }}
              transition={swapTransition}
              className="absolute inset-0 flex items-center justify-center"
            >
              <PlayIcon className="size-3 fill-current" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      <motion.span
        initial={false}
        animate={{
          opacity: visible ? 0 : 1,
          width: visible ? 0 : 67,
          marginLeft: visible ? 0 : 8,
          filter: visible ? "blur(10px)" : "blur(0px)",
        }}
        transition={swapTransition}
        className="overflow-hidden whitespace-nowrap font-semibold"
      >
        My brain
      </motion.span>
    </motion.button>
  )
}
