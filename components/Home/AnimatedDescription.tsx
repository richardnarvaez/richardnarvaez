"use client"

import { motion } from "framer-motion"

export default function AnimatedDescription() {
  return (
    <motion.h3
      className="flex flex-col text-center text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.6 }} // Delay mayor que el último elemento del título
    >
      Over the last 5 years, I&apos;ve empowered 9+ companies
      <motion.span
        className="hidden max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.7 }} // Un poco más de delay para el subtexto
      >
        Developing user-centric interfaces that captivate and engage audiences
        and make a real impact.
      </motion.span>
    </motion.h3>
  )
}
