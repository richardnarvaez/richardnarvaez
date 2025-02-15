"use client"

import { motion } from "framer-motion"
import { ChevronDownIcon } from "lucide-react"

export default function ScrollDownIndicator() {
  const scrollToTop = () => {
    window.scrollTo({
      top: window.innerHeight - 32, // Scrollea hasta 100vh
      behavior: "smooth",
    })
  }
  return (
    <motion.div
      onClick={scrollToTop}
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="rounded-full bg-white px-4 py-2 text-xs text-black/90">
        <p>v.3.2.42</p>
      </div>
      <motion.div
        animate={{
          y: [0, -8, 0], // Movimiento hacia arriba y abajo
          scale: [1, 1.1, 1], // Ligero efecto de escala
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 1, // Pausa entre animaciones
          ease: "easeInOut",
        }}
        className="mt-4 flex flex-col items-center gap-2"
      >
        <ChevronDownIcon />
      </motion.div>
    </motion.div>
  )
}
