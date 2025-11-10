"use client"

import { ProjectItem } from "@/lib/gallery-types"
import Link from "next/link"

interface ProjectModalProps {
  item: ProjectItem
  onClose: () => void
}

export default function ProjectModal({ item, onClose }: ProjectModalProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-gray-900/95 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/20 p-4">
        <h2 className="text-xl font-bold text-white">{item.title}</h2>
        <div className="flex items-center gap-3">
          <Link
            href={item.mdxSlug}
            className="rounded-lg bg-[#FF512F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#FF512F]/80"
          >
            View Details
          </Link>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-full p-2 transition-colors hover:bg-white/10"
          >
            <svg
              className="h-5 w-5 text-gray-300"
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
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Cover Image */}
        <div className="mb-4">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <img
              src={item.thumbnail.url}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-3">
          {/* Description */}
          <p className="text-gray-300">{item.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#FF512F]/20 px-3 py-1 text-sm text-[#FF512F]"
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

          {/* Call to Action */}
          <div className="border-t border-white/20 pt-3">
            <Link
              href={item.mdxSlug}
              className="inline-flex items-center rounded-lg bg-[#FF512F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#FF512F]/80"
            >
              Read Full Case Study
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
