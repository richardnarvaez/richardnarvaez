"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import {
  orbitCenterContentSwitchVariants,
  orbitCenterContentVariants,
} from "./HeaderOrbitMotion"

type HeaderOrbitDevCardProps = {
  motionPreset?: "open" | "switch"
}

export default function HeaderOrbitDevCard({
  motionPreset = "open",
}: HeaderOrbitDevCardProps) {
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
      className="flex flex-col items-center text-center"
    >
      <div className="relative hidden size-24 overflow-hidden rounded-full border-4 border-white shadow-[0_18px_40px_rgba(15,23,42,0.28)] md:block">
        <Image
          src="/images/avatars/richard.jpg"
          alt="Richard Vinueza"
          fill
          className="object-cover"
          sizes="96px"
          priority
        />
      </div>

      <p className="text-lg font-semibold text-white md:mt-4">
        Richard Vinueza
      </p>
      <p className="mt-2 max-w-72 text-sm font-medium text-white/80">
        Product Engineer at A2R, Madrid Spain.
      </p>
    </motion.div>
  )
}
