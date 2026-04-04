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
          "absolute inset-0 size-full object-cover transition-[opacity,transform] duration-1000 will-change-transform",
          orbitVisible ? "scale-[1.04] opacity-0" : "scale-100 opacity-25"
        )}
        priority
      />

      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/home/bg-header.jpg"
          width={720}
          height={720}
          alt=""
          aria-hidden="true"
          className={cn(
            "saturate-125 absolute inset-0 size-full transform-gpu object-cover blur-[14px] transition-[opacity,transform] duration-1000",
            orbitVisible ? "scale-[1.04] opacity-30" : "scale-100 opacity-0"
          )}
          priority
        />
      </div>

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
