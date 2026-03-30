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
      className="pointer-events-auto mx-auto w-[min(94vw,64rem)]"
    >
      <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:p-5">
        <HeaderOrbitArtMasonry />
      </div>
    </motion.div>
  )
}
