"use client"

import { motion, useMotionValue, animate, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

interface MagicOrbProps {
  size?: number
  blur?: boolean
}

interface OrbitConfig {
  id: string
  color: string
  opacity: number
  size: {
    widthRem: number
    heightRem: number
  }
  brightness: number
  motion: {
    radius: number
    angle: number
    duration: number
    delay: number
  }
}

const bubbleConfig: OrbitConfig[] = [
  {
    id: "bubble-0",
    color: "bg-emerald-200",
    opacity: 1,
    size: {
      widthRem: 3,
      heightRem: 3,
    },
    brightness: 1,
    motion: {
      radius: 0.2,
      angle: 0,
      duration: 18,
      delay: 0,
    },
  },
  {
    id: "bubble-1",
    color: "bg-emerald-900",
    opacity: 1,
    size: {
      widthRem: 2.5,
      heightRem: 2,
    },
    brightness: 1.3,
    motion: {
      radius: 0.5,
      angle: 0,
      duration: 9,
      delay: 0,
    },
  },
  {
    id: "bubble-x",
    color: "bg-emerald-900",
    opacity: 1,
    size: {
      widthRem: 2,
      heightRem: 3,
    },
    brightness: 1.3,
    motion: {
      radius: 0.6,
      angle: 0,
      duration: 5,
      delay: 0,
    },
  },
  {
    id: "bubble-2",
    color: "bg-emerald-500",
    opacity: 1,
    size: {
      widthRem: 1.25,
      heightRem: 3,
    },
    brightness: 1.5,
    motion: {
      radius: 0.427,
      angle: 201,
      duration: 5.5,
      delay: 0.1,
    },
  },
  {
    id: "bubble-3",
    color: "bg-emerald-400",
    opacity: 1,
    size: {
      widthRem: 2.5,
      heightRem: 2,
    },
    brightness: 1,
    motion: {
      radius: 0.3,
      angle: 90,
      duration: 11,
      delay: 2,
    },
  },
]

const orbitTransition = (duration: number, delay = 0) => ({
  duration,
  ease: "linear",
  repeat: Infinity,
  delay,
})

const createOrbitAnimation = (radius: number, angle: number) => {
  const clockwiseAngle = -angle

  return {
    transform: [
      `translate(-50%, -50%) rotate(${clockwiseAngle}deg) translate3d(${
        radius * 100
      }%, 0, 0)`,
      `translate(-50%, -50%) rotate(${clockwiseAngle - 360}deg) translate3d(${
        radius * 100
      }%, 0, 0)`,
    ],
  }
}

const getInitialTransform = (radius: number, angle: number) =>
  `translate(-50%, -50%) rotate(${-angle}deg) translate3d(${
    radius * 100
  }%, 0, 0)`

const MagicOrb = ({ size = 96, blur = true }: MagicOrbProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        style={{
          width: size,
          height: size,
        }}
        className="relative"
      >
        <div className=" absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 text-white">
          <SparklesIcon width={size / 2} height={size / 2} />
        </div>
        <div className="relative size-full rounded-full">
          <motion.div
            className="relative size-full"
            style={{
              ...(blur && { filter: `blur(${size * 0.095}px)` }),
            }}
          >
            <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500" />
            {bubbleConfig.map((bubble) => (
              <motion.div
                key={bubble.id}
                className={`absolute rounded-full ${bubble.color}`}
                style={{
                  width: `${bubble.size.widthRem}rem`,
                  height: `${bubble.size.heightRem}rem`,
                  left: "50%",
                  top: "50%",
                  opacity: bubble.opacity,
                  filter: `brightness(${bubble.brightness})`,
                  transformOrigin: "center",
                  transform: getInitialTransform(
                    bubble.motion.radius,
                    bubble.motion.angle
                  ),
                }}
                animate={createOrbitAnimation(
                  bubble.motion.radius,
                  bubble.motion.angle
                )}
                transition={orbitTransition(
                  bubble.motion.duration,
                  bubble.motion.delay
                )}
              />
            ))}
          </motion.div>
        </div>
      </div>
      <p className="text-sm text-gray-500">Thinking...</p>
    </div>
  )
}

export default MagicOrb

const SparklesIcon = ({
  width,
  height,
}: {
  width?: number
  height?: number
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-sparkles-icon lucide-sparkles"
    >
      <path
        fill="currentColor"
        d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
      />
    </svg>
  )
}
