"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

import HeaderOrbitBackground from "./HeaderOrbitBackground"
import HeaderOrbitFrame from "./HeaderOrbitFrame"
import {
  getOrbitBackgroundRotation,
  orbitBackgroundVariants,
} from "./HeaderOrbitMotion"
import type { HeaderOrbitTab } from "./HeaderOrbitTabs"

type HeaderImageProps = {
  activeTab: HeaderOrbitTab
  orbitVisible: boolean
}

export default function HeaderImage({
  activeTab,
  orbitVisible,
}: HeaderImageProps) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 animate-fade-in overflow-hidden opacity-0">
      <Image
        src="/images/home/bg-header.jpg"
        width={720}
        height={720}
        placeholder="blur"
        blurDataURL="/images/home/bg-header-blur.jpg"
        alt="Background - Richard Vinueza Profile"
        className={cn(
          "absolute inset-0 size-full object-cover opacity-25 transition-[filter,opacity,transform] duration-1000",
          orbitVisible ? "scale-[1.2] blur-[10px]" : "scale-100 blur-0"
        )}
        priority
      />

      <AnimatePresence>
        {orbitVisible ? (
          <HeaderOrbitFrame>
            <motion.div
              key="header-orbit-background"
              custom={getOrbitBackgroundRotation(activeTab)}
              variants={orbitBackgroundVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0"
            >
              <HeaderOrbitBackground />
            </motion.div>
          </HeaderOrbitFrame>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
