"use client"

import { useEffect } from "react"
import { GalleryItem } from "@/lib/gallery-types"
import ImageModal from "./modals/image-modal"
import ProjectModal from "./modals/project-modal"
import PlaygroundModal from "./modals/playground-modal"

interface GalleryModalProps {
  item: GalleryItem
  onClose: () => void
}

export default function GalleryModal({ item, onClose }: GalleryModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const renderModalContent = () => {
    switch (item.type) {
      case "photo":
      case "design":
        return <ImageModal item={item} onClose={onClose} />

      case "project":
        return <ProjectModal item={item} onClose={onClose} />

      case "playground":
        return <PlaygroundModal item={item} onClose={onClose} />

      default:
        return <ImageModal item={item} onClose={onClose} />
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 mx-4 max-h-[90vh] w-full max-w-6xl">
        {renderModalContent()}
      </div>
    </div>
  )
}
