import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
export default function HeaderImage() {
  // const [isLoadBigImage, setIsLoadBigImage] = useState(false)
  return (
    <>
      <div
        // initial={{
        //   opacity: 0,
        // }}
        // animate={{ opacity: 1 }}
        className="animate-fade-in opacity-0"
      >
        <div className="absolute inset-x-0 top-0 z-10 h-[50vh] w-full bg-gradient-to-b from-[hsl(244,31%,10%)] to-transparent" />

        <div className="absolute inset-x-0 bottom-0  z-10 h-[50vh] w-full bg-gradient-to-t from-[hsl(244,31%,10%)] to-transparent" />

        <Image
          src="/images/home/bg-header.jpg"
          width={720}
          height={720}
          placeholder="blur"
          blurDataURL="/images/home/bg-header-blur.jpg"
          alt="Background - Richard Vinueza Profile"
          className={
            "absolute inset-0 h-[100vh] w-full object-cover opacity-25 transition-opacity duration-1000"
            // (!isLoadBigImage ? "opacity-0 blur-3xl" : "opacity-25")
          }
          priority
          // onLoad={(image) => {
          //   setTimeout(() => {
          //     setIsLoadBigImage(true)
          //   }, 1000)
          // }}
        />
      </div>
    </>
  )
}
