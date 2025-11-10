"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { barlow, caveatBrush, jetbrains, robotoMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import ArrowFigma from "@/components/Icons/ArrowFigma"

// Caracteres más similares en ancho para reducir el salto
const hackerChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%"
const finalWord = "DEVELOPER"

function HackerText() {
  const [text, setText] = useState(hackerChars.slice(0, finalWord.length))
  const [counter, setCounter] = useState(0)
  const [shouldReveal, setShouldReveal] = useState(false)

  // Efecto para los caracteres aleatorios (comienza inmediatamente)
  useEffect(() => {
    if (counter >= finalWord.length) return

    const interval = setInterval(() => {
      let result = ""
      for (let i = 0; i < finalWord.length; i++) {
        if (i <= counter && shouldReveal) {
          result += finalWord[i]
        } else {
          // Mantener el mismo caracter por más tiempo
          if (Math.random() > 0.3) {
            result += text[i]
          } else {
            result +=
              hackerChars[Math.floor(Math.random() * hackerChars.length)]
          }
        }
      }
      setText(result)

      if (result === finalWord) {
        clearInterval(interval)
      }
    }, 80) // Un poco más rápido pero con menos cambios

    return () => clearInterval(interval)
  }, [counter, shouldReveal, text])

  // Comenzamos a revelar después de 2s
  useEffect(() => {
    const revealDelay = setTimeout(() => {
      setShouldReveal(true)
    }, 1000)

    return () => clearTimeout(revealDelay)
  }, [])

  // Efecto para revelar letra por letra
  useEffect(() => {
    if (!shouldReveal) return

    const timeout = setTimeout(() => {
      setCounter((prev) => {
        if (prev < finalWord.length) return prev + 1
        return prev
      })
    }, 150)

    return () => clearTimeout(timeout)
  }, [counter, shouldReveal])

  return (
    <p
      className={`z-10 tracking-tight text-gray-400 ${jetbrains.className}`}
      style={{
        fontFeatureSettings: '"calt" 0', // Desactivar ligaduras
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {text}
    </p>
  )
}

function AnimatedCursor() {
  return (
    <motion.div className="relative -left-8 top-3 z-0">
      <div className="relative z-40">
        <ArrowFigma />
      </div>
      <div className="absolute -left-14 -top-20 border-2 border-blue-400 bg-blue-700/20 px-2 font-semibold">
        <div className="absolute -left-1.5 -top-1.5 size-3 border-2 border-blue-400 bg-white"></div>
        <div className="absolute -right-1.5 -top-1.5 size-3 border-2 border-blue-400 bg-white"></div>
        <div className="absolute -bottom-1.5 -left-1.5 size-3 border-2 border-blue-400 bg-white"></div>
        <div className="absolute -bottom-1.5 -right-1.5 size-3 border-2 border-blue-400 bg-white"></div>
        <p>E</p>
      </div>
    </motion.div>
  )
}

function Cursor() {
  return (
    <motion.div className="relative -right-10 top-6 rotate-90">
      <div className="relative z-40">
        <ArrowFigma color="#0c56c7" />
      </div>
    </motion.div>
  )
}

export default function AnimatedTitle() {
  const START_YEAR = 2014
  const currentYear = new Date().getFullYear()
  const yearsOfExperience = currentYear - START_YEAR

  return (
    <>
      {/* SEO title - hidden visually but available to screen readers and search engines */}
      <h1 className="sr-only">
        Richard Vinueza - CREATIVE DEVELOPER - SINCE 2014
      </h1>

      <div
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight - 32,
            behavior: "smooth",
          })
        }}
        className={cn(
          "flex items-center gap-2 text-center text-2xl text-gray-400",
          jetbrains.className,
          "transition-all duration-300"
        )}
      >
        {`Hey, I'm <`}
        <div className="relative h-10 w-20 overflow-hidden rounded-full border-2 border-white bg-white transition-all duration-300 hover:scale-150">
          <Image
            src="/images/avatars/richard.jpg"
            alt="Richard"
            className="mt-3 scale-[1.9] grayscale"
            width={300}
            height={300}
          />
        </div>
        {" Richard/>"}
      </div>
      {/* Visual animated title */}
      <h2
        className={cn(
          barlow.className,
          "z-10 flex max-w-3xl scale-[0.60] flex-col text-center text-8xl font-extrabold md:scale-100"
        )}
      >
        <span className="animate-fade-up-1 opacity-0">CREATIVE</span>

        <span className="relative z-10 mt-2 animate-fade-up-2 bg-black/30 px-4 py-1 opacity-0 backdrop-blur-sm">
          {/* Bordes y decoraciones */}
          <div className="border-h absolute -left-10 right-0 top-[-2px] h-1 w-[124%]" />
          <div className="border-h absolute -bottom-px -left-20 right-0 h-1 w-[130%]"></div>
          <div className="border-v absolute -top-8 left-[-2px] h-[150%] w-1"></div>
          <div className="border-v absolute -bottom-12 -right-px h-[170%] w-1"></div>

          <div className="absolute -left-1.5 -top-1.5 size-3 border-2 border-gray-400 bg-white"></div>
          <div className="absolute -bottom-1.5 -left-1.5 size-3 border-2 border-gray-400 bg-white"></div>
          <div className="absolute -bottom-1.5 -right-1.5 size-3 border-2 border-gray-400 bg-white"></div>
          <div className="absolute -right-1.5 -top-1.5 size-3 border-2 border-gray-400 bg-white shadow"></div>

          {/* <HackerText /> */}
          <p className="opacity-80">
            DEVELOP<span className="text-transparent">E</span>R
          </p>

          <div className="absolute -bottom-12 -right-12 z-50 animate-float">
            <AnimatedCursor />
            <h2 className="relative z-50 rounded-md bg-gray-50 px-4 py-2 text-center text-xs font-semibold text-black">
              <span>Richard Vinueza</span>
            </h2>
          </div>
          <div className="absolute -bottom-14 -left-20">
            <Cursor />
            <h2 className="relative z-50 -mt-2 mr-2 rounded-md bg-gray-50 px-4 py-2 text-center text-xs font-semibold text-black opacity-50">
              <span>Jhon Doe</span>
            </h2>
          </div>
        </span>

        <span className="animate-fade-up-3 opacity-0">SINCE</span>
        <span className="animate-fade-up-4 text-[#FF512F] opacity-0">2014</span>
      </h2>
    </>
  )
}
