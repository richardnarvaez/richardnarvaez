"use client"

import { motion } from "framer-motion"

import {
  orbitCenterContentSwitchVariants,
  orbitCenterContentVariants,
} from "./HeaderOrbitMotion"
import PassportGlobe from "./PassportGlobe"

type HeaderOrbitPassportCardProps = {
  motionPreset?: "open" | "switch"
}

export default function HeaderOrbitPassportCard({
  motionPreset = "open",
}: HeaderOrbitPassportCardProps) {
  const variants =
    motionPreset === "switch"
      ? orbitCenterContentSwitchVariants
      : orbitCenterContentVariants

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pointer-events-auto w-[min(92vw,34rem)] md:w-[min(74vw,40rem)]"
    >
      <PassportGlobe compact />
    </motion.div>
  )
}
