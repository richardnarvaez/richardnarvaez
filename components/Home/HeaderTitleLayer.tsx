"use client"

import { AnimatePresence, motion } from "framer-motion"

import AnimatedTitle from "./AnimatedTitle"

type HeaderTitleLayerProps = {
  visible: boolean
}

export default function HeaderTitleLayer({
  visible,
}: HeaderTitleLayerProps) {
  return (
    <div className="w-full max-w-5xl">
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            key="header-title"
            className="relative z-20 flex w-full flex-col items-center justify-center gap-4"
            initial={{ opacity: 1, filter: "blur(0px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              filter: "blur(6px)",
              transition: {
                duration: 0.28,
                ease: [0.4, 0, 1, 1],
              },
            }}
          >
            <AnimatedTitle />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
