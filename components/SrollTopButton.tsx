"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronUpIcon } from "lucide-react"
import { useEffect, useState } from "react"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar el botón solo después de 100vh de scroll
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: window.innerHeight - 32, // Scrollea hasta 100vh
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-12 right-12 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-black/80 shadow-lg transition-transform hover:scale-110"
        >
          <ChevronUpIcon className="h-6 w-6" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
