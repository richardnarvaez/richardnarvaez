"use client"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
export default function HeaderImage() {
  const [isLoadBigImage, setIsLoadBigImage] = useState(false)
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-x-0 bottom-0  z-10 h-[75vh] w-full bg-gradient-to-t from-[hsl(244,31%,10%)] to-transparent object-cover" />

      <Image
        src="/images/home/bg-header.jpg"
        width={1920}
        height={720}
        // placeholder="blur"
        // blurDataURL="/images/home/bg-header-blur.jpg"
        alt="Background - Richard Vinueza Profile"
        className={
          "absolute inset-0 h-[100vh] w-full object-cover transition-opacity duration-1000 " +
          (!isLoadBigImage ? "opacity-0 blur-3xl" : "opacity-25")
        }
        onLoad={(image) => {
          setIsLoadBigImage(true)
          //   setTimeout(() => {
          //   }, 2000)
        }}
      />
    </motion.div>
  )
}
