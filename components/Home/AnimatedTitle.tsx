"use client"

import { motion } from "framer-motion"
import { Barlow, Roboto_Mono, JetBrains_Mono } from "next/font/google"
import ArrowFigma from "@/components/Icons/ArrowFigma"
import { useEffect, useState } from "react"

const barlow = Barlow({ subsets: ["latin"], weight: ["600"] })
const robotoMono = Roboto_Mono({ subsets: ["latin"] })
const jetbrains = JetBrains_Mono({ subsets: ["latin"] })

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
    <motion.p
      className={`z-10 tracking-tight text-gray-400 ${jetbrains.className}`}
      style={{
        fontFeatureSettings: '"calt" 0', // Desactivar ligaduras
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      {text}
    </motion.p>
  )
}

function AnimatedCursor() {
  return (
    <motion.div className="relative -left-8 top-3 z-0">
      <div className="relative z-40">
        <ArrowFigma />
      </div>
      <div className="absolute  -left-14 -top-20 border-2 border-blue-400 bg-blue-700/20 px-2 font-semibold">
        <div className="absolute -left-1.5 -top-1.5 h-3 w-3 border-2 border-blue-400 bg-white"></div>
        <div className="absolute -right-1.5 -top-1.5 h-3 w-3 border-2 border-blue-400 bg-white"></div>
        <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-2 border-blue-400 bg-white"></div>
        <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-2 border-blue-400 bg-white"></div>
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
  return (
    <>
      {/* SEO title - hidden visually but available to screen readers and search engines */}
      <h1 className="sr-only">
        CREATIVE DEVELOPER - Richard Vinueza - SINCE 2014
      </h1>

      {/* Visual animated title */}
      <h2
        className={
          barlow.className +
          " z-10 flex max-w-3xl scale-[0.60] flex-col text-center text-8xl font-extrabold md:scale-100"
        }
      >
        <motion.span
          id="word_creative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          CREATIVE
        </motion.span>
        <motion.span
          id="word_developer"
          className="relative bg-black/30 px-4 py-1 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="border-h absolute -left-10 right-0 top-[-2px] h-1 w-[124%]"></div>
          <div className="border-h absolute -left-20 bottom-[-1px] right-0 h-1 w-[130%]"></div>
          <div className="border-v absolute -top-8 left-[-2px] h-[150%] w-1"></div>
          <div className="border-v absolute -bottom-12 right-[-1px] h-[170%] w-1"></div>

          <div className="absolute -left-1.5 -top-1.5  h-3 w-3  border-2 border-gray-400  bg-white "></div>
          <div className="absolute -bottom-1.5 -left-1.5  h-3 w-3  border-2 border-gray-400  bg-white "></div>
          <div className="absolute -bottom-1.5 -right-1.5  h-3 w-3  border-2 border-gray-400  bg-white "></div>
          <div className="absolute -right-1.5 -top-1.5  h-3 w-3  border-2 border-gray-400 bg-white  shadow"></div>
          {/*
          <div className="absolute inset-x-0 -top-1.5 m-auto  h-3 w-3  border border-gray-400 bg-gradient-to-br from-gray-300 to-gray-400 shadow"></div>
          <div className="absolute inset-x-0 -bottom-1.5 m-auto  h-3 w-3  border border-gray-400 bg-gradient-to-br from-gray-300 to-gray-400 shadow"></div>
          <div className="absolute inset-y-0 -left-1.5 m-auto  h-3 w-3  border border-gray-400 bg-gradient-to-br from-gray-300 to-gray-400 shadow"></div>
          <div className="absolute inset-y-0 -right-1.5 m-auto  h-3 w-3  border border-gray-400 bg-gradient-to-br from-gray-300 to-gray-400 shadow"></div> */}

          {/* <HackerText /> */}
          <p className="opacity-80">
            DEVELOP<span className="text-transparent">E</span>R
          </p>

          <motion.div
            className="absolute -bottom-12 -right-12"
            initial={{
              opacity: 1,
              x: 200,
              y: -100,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                duration: 1,
                ease: "easeOut",
                delay: 1.5,
              },
            }}
            whileInView={{
              x: [
                0, // Posición inicial después de la entrada
                0, // Mantiene posición
                20, // Primer movimiento
                20, // Pausa
                -30, // Segundo movimiento
                -30, // Pausa
                15, // Tercer movimiento
                15, // Pausa
                -10, // Cuarto movimiento
                -10, // Pausa
                0, // Vuelve al centro
                0, // Espera final
              ],
              y: [
                0, // Posición inicial después de la entrada
                0, // Mantiene posición
                -15, // Primer movimiento
                -15, // Pausa
                10, // Segundo movimiento
                10, // Pausa
                -20, // Tercer movimiento
                -20, // Pausa
                5, // Cuarto movimiento
                5, // Pausa
                0, // Vuelve al centro
                0, // Espera final
              ],
              transition: {
                duration: 12,
                repeat: Infinity,
                repeatType: "loop",
                times: [
                  0, // Inicio
                  0.2, // Fin espera inicial
                  0.25, // Llega a posición 1
                  0.4, // Fin pausa 1
                  0.45, // Llega a posición 2
                  0.7, // Fin pausa 2
                  0.75, // Llega a posición 3
                  0.8, // Fin pausa 3
                  0.85, // Llega a posición 4
                  0.9, // Fin pausa 4
                  0.95, // Vuelve al centro
                  1, // Espera final
                ],
                ease: "easeInOut",
                delay: 0.2, // Pequeño delay después de la animación de entrada
              },
            }}
          >
            <AnimatedCursor />
            <h2 className="relative z-50 rounded-md bg-gray-50 px-4 py-2 text-center text-xs font-semibold text-black">
              <span>Richard Vinueza</span>
            </h2>
          </motion.div>

          <motion.div className="absolute -bottom-14 -left-20">
            <Cursor />
            <h2 className="relative z-50 rounded-md bg-gray-50 px-4 py-2 text-center text-xs font-semibold text-black">
              <span>Jon Doe</span>
            </h2>
          </motion.div>
        </motion.span>
        <motion.span
          id="word_since"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          SINCE
        </motion.span>
        <motion.span
          id="word_2014"
          className="text-[#FF512F]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          2014
        </motion.span>
      </h2>
    </>
  )
}
