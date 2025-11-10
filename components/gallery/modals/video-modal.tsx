"use client"

import { GalleryItem } from "@/lib/gallery-types"

interface VideoModalProps {
  item: GalleryItem
  onClose: () => void
}

export default function VideoModal({ item, onClose }: VideoModalProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-gray-900/95 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/20 p-4">
        <h2 className="text-xl font-bold text-white">{item.title}</h2>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="rounded-full p-2 transition-colors hover:bg-white/10"
        >
          <svg
            className="size-5 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Video */}
        <div className="mb-4">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <video className="size-full object-cover" controls autoPlay muted>
              <source src={item.thumbnail.url} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3">
          {/* Description */}
          {item.type === "photo" &&
            "description" in item &&
            item.description && (
              <p className="text-gray-300">{item.description}</p>
            )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-700/50 px-3 py-1 text-sm text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Date */}
          <div className="text-sm text-gray-400">
            {new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
