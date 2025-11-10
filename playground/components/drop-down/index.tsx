"use client"

import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { barlow } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import BlurText from "./blur-text"

const options = ["Travel", "Bucket List"]

export default function DropDownBlur() {
  const [selected, setSelected] = useState(options[0])
  const [animationKey, setAnimationKey] = useState(0)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current) return
      if (containerRef.current.contains(event.target as Node)) return
      setOpen(false)
    }
    window.addEventListener("pointerdown", handlePointerDown)
    return () => window.removeEventListener("pointerdown", handlePointerDown)
  }, [open])

  const handleSelect = (value: string) => {
    if (value === selected) {
      setOpen(false)
      return
    }
    setSelected(value)
    setAnimationKey((key) => key + 1)
    setOpen(false)
  }

  return (
    <section>
      <div className="relative" ref={containerRef}>
        <button
          aria-haspopup="listbox"
          aria-label={selected}
          aria-controls={menuId}
          className="flex items-center gap-3 rounded-3xl border border-white/60 bg-white/80 px-7 py-4 text-black/90 transition hover:border-white focus-visible:border-black/20"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <BlurText
            key={animationKey}
            text={selected}
            className={cn(
              barlow.className,
              "w-40 text-3xl font-black leading-none text-black"
            )}
          />
          <ChevronDownIcon
            className={cn(
              "size-5 text-gray-400 transition-transform",
              open ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              id={menuId}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-3xl border border-gray-100 bg-white/95 p-4 text-left text-black shadow-[0_28px_70px_-18px_rgba(15,23,42,0.4)]"
            >
              {options.map((option) => {
                const isActive = option === selected
                return (
                  <button
                    key={option}
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-5 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-gray-100 text-black"
                        : "text-black/75 hover:bg-gray-50 hover:text-black"
                    )}
                    onClick={() => handleSelect(option)}
                    type="button"
                  >
                    <span>{option}</span>
                    {isActive && (
                      <div className="rounded-full bg-black/90 p-1">
                        <CheckIcon className="size-3 text-white" />
                      </div>
                    )}
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
