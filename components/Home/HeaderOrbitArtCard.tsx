"use client"

import { motion } from "framer-motion"

import HeaderOrbitArtMasonry from "./HeaderOrbitArtMasonry"
import {
  orbitCenterContentSwitchVariants,
  orbitCenterContentVariants,
} from "./HeaderOrbitMotion"

type HeaderOrbitArtCardProps = {
  motionPreset?: "open" | "switch"
}

export default function HeaderOrbitArtCard({
  motionPreset = "open",
}: HeaderOrbitArtCardProps) {
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
      className="pointer-events-auto mx-auto w-[min(96vw,68rem)]"
    >
      <HeaderOrbitArtMasonry />
    </motion.div>
  )
}
