"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { GalleryItem, chipStyles, chipLabels } from "@/lib/gallery-types"

interface GalleryCardProps {
  item: GalleryItem
  onClick: () => void
}

export default function GalleryCard({ item, onClick }: GalleryCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current && item.thumbnail.type === "video") {
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current && item.thumbnail.type === "video") {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.div
      className="gallery-card group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-700/20 bg-gray-800/80"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ scale: 1, y: 0 }}
      animate={
        isHovered
          ? {
              scale: 1.02,
              y: -4,
            }
          : { scale: 1, y: 0 }
      }
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <motion.div
          initial={{ scale: 1 }}
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          {item.thumbnail.type === "video" ? (
            <video
              ref={videoRef}
              className="h-auto w-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={item.thumbnail.url} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={item.thumbnail.url || "/images/cover.jpg"}
              alt={item.title}
              width={400}
              height={300}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/images/cover.jpg"
              }}
            />
          )}
        </motion.div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0"
          initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          animate={
            isHovered
              ? { backgroundColor: "rgba(0, 0, 0, 0.2)" }
              : { backgroundColor: "rgba(0, 0, 0, 0)" }
          }
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3
          className="mb-1 line-clamp-2 font-semibold text-white"
          initial={{ y: 5, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 5, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {item.title}
        </motion.h3>
        <motion.p
          className="text-sm text-gray-300"
          initial={{ y: 5, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 5, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {item.description}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
