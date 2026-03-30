"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { getHeaderMobileClusterItems } from "./HeaderMobileClusterData"
import {
  orbitNodesContainerVariants,
  orbitNodeVariants,
} from "./HeaderOrbitMotion"
import type { HeaderOrbitTab } from "./HeaderOrbitTabs"

type HeaderMobileClusterProps = {
  activeTab: HeaderOrbitTab
}

type ClusterPosition = {
  scale?: number
  x: string
  y: string
}

const layout4: ClusterPosition[] = [
  { x: "18%", y: "54%", scale: 0.96 },
  { x: "36%", y: "22%", scale: 1 },
  { x: "64%", y: "22%", scale: 1 },
  { x: "82%", y: "54%", scale: 0.96 },
]

const layout6: ClusterPosition[] = [
  { x: "12%", y: "56%", scale: 0.92 },
  { x: "24%", y: "34%", scale: 0.96 },
  { x: "40%", y: "14%", scale: 1 },
  { x: "60%", y: "14%", scale: 1 },
  { x: "76%", y: "34%", scale: 0.96 },
  { x: "88%", y: "56%", scale: 0.92 },
]

const layout8: ClusterPosition[] = [
  { x: "10%", y: "56%", scale: 0.9 },
  { x: "18%", y: "38%", scale: 0.94 },
  { x: "30%", y: "18%", scale: 0.98 },
  { x: "44%", y: "8%", scale: 1 },
  { x: "56%", y: "8%", scale: 1 },
  { x: "70%", y: "18%", scale: 0.98 },
  { x: "82%", y: "38%", scale: 0.94 },
  { x: "90%", y: "56%", scale: 0.9 },
]

const layout9: ClusterPosition[] = [
  { x: "20%", y: "70%", scale: 0.88 },
  { x: "26%", y: "34%", scale: 0.92 },
  { x: "29%", y: "5%", scale: 0.75 },
  { x: "42%", y: "20%", scale: 1 },
  { x: "55%", y: "0%", scale: 0.8 },
  { x: "58%", y: "30%", scale: 1 },
  { x: "74%", y: "39%", scale: 0.8 },
  { x: "12%", y: "42%", scale: 0.65 },
  { x: "65%", y: "65%", scale: 0.88 },
]

function getClusterPositions(count: number) {
  if (count <= 4) return layout4.slice(0, count)
  if (count <= 6) return layout6.slice(0, count)
  if (count <= 8) return layout8.slice(0, count)
  return layout9.slice(0, count)
}

export default function HeaderMobileCluster({
  activeTab,
}: HeaderMobileClusterProps) {
  const items = getHeaderMobileClusterItems(activeTab)
  const positions = getClusterPositions(items.length)
  const showAvatar = activeTab !== "Passport"

  return (
    <motion.div
      variants={orbitNodesContainerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pointer-events-none relative h-[10.5rem] w-[min(100%,20.5rem)]"
    >
      {showAvatar ? (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center">
          <motion.div
            variants={orbitNodeVariants}
            className="relative z-20 size-20 overflow-hidden rounded-full border-[3px] border-white bg-white shadow-[0_18px_40px_rgba(15,23,42,0.28)]"
          >
            <Image
              src="/images/avatars/richard.jpg"
              alt="Richard Vinueza"
              fill
              className="object-cover"
              sizes="80px"
              priority
            />
          </motion.div>
        </div>
      ) : null}

      {items.map((item, index) => {
        const position = positions[index]

        if (!position) return null

        return (
          <motion.div
            key={item.key}
            variants={orbitNodeVariants}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: position.x,
              top: position.y,
            }}
          >
            <div
              className="origin-center"
              style={{ transform: `scale(${position.scale ?? 1})` }}
            >
              {item.node}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
