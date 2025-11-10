"use client"

import { useState } from "react"
import Link from "next/link"

export default function GalleryFilters() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { id: "all", label: "All Work", href: "/gallery" },
    { id: "projects", label: "Projects", href: "/gallery?filter=projects" },
    {
      id: "playground",
      label: "Components",
      href: "/gallery?filter=playground",
    },
    { id: "design", label: "Design", href: "/gallery?filter=design" },
  ]

  return (
    <div className="mb-12 flex justify-center">
      <div className="rounded-2xl border border-white/20 bg-gray-800/80 p-2 shadow-lg">
        <div className="flex gap-2">
          {filters.map((filter) => (
            <Link
              key={filter.id}
              href={filter.href}
              className={`
                rounded-xl px-6 py-3 font-semibold transition-all duration-200
                ${
                  activeFilter === filter.id
                    ? "bg-[#FF512F] text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                }
              `}
            >
              {filter.label}
            </Link>
          ))}

          {/* Photography Link */}
          <Link
            href="/photography"
            className="rounded-xl px-6 py-3 font-semibold text-gray-300 transition-all duration-200 hover:bg-white/10"
          >
            Photography
          </Link>
        </div>
      </div>
    </div>
  )
}
