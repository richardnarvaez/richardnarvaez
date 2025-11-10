"use client"

import { Suspense, useEffect, useState } from "react"
import { Info } from "lucide-react"

import { PlaygroundItem } from "@/lib/gallery-types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PlaygroundModalProps {
  item: PlaygroundItem
  onClose: () => void
}

export default function PlaygroundModal({
  item,
  onClose,
}: PlaygroundModalProps) {
  const [LiveComponent, setLiveComponent] =
    useState<React.ComponentType | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      try {
        // eslint-disable-next-line @next/next/no-assign-module-variable
        const module = await import(
          `@/playground/components/${item.componentPath}`
        )
        setLiveComponent(() => module.default)
      } catch (error) {
        console.error("Error loading component:", error)
      }
    }
    loadComponent()
  }, [item.componentPath])

  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-gray-900/95 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/20 p-4">
        <div>
          <h2 className="text-xl font-bold text-white">{item.title}</h2>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-400">
            {item.description} |
            {item.dependencies.map((dep) => (
              <span
                key={dep}
                className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300"
              >
                {dep}
              </span>
            ))}
          </p>
        </div>
        <div className="flex items-center gap-2">
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
        {/* Live Preview */}
        <div>
          <div className="flex min-h-[500px] items-center justify-center rounded-lg bg-white p-8">
            <Suspense
              fallback={
                <div className="text-gray-400">Loading component...</div>
              }
            >
              {LiveComponent ? (
                <LiveComponent />
              ) : (
                <div className="text-gray-400">Component not available</div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
