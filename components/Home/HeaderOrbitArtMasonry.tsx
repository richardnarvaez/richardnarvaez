"use client"

import { useState, type CSSProperties } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

type ArtMasonryItem = {
  alt: string
  aspectClassName: string
  badge: string
  description: string
  src: string
  title: string
}

const artItems: readonly ArtMasonryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1764025721609-2bd1cf185f32?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Madeira",
    aspectClassName: "aspect-[4/5]",
    badge: "LANDSCAPE",
    title: "Madeira Cliffs",
    description: "Clouds wrapping the ridge before the sun opened the valley.",
  },
  {
    src: "/images/me.jpg",
    alt: "Portrait photography",
    aspectClassName: "aspect-[3/4]",
    badge: "PORTRAIT",
    title: "Landing Path",
    description:
      "A quiet frame under the flight line with the city opening behind.",
  },
  {
    src: "https://images.unsplash.com/photo-1761671955448-f68ca9eec238?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
    alt: "Urban photography",
    aspectClassName: "aspect-[4/5]",
    badge: "VALLEY",
    title: "Blue Valley",
    description:
      "A clear mountain basin with the horizon holding just one color.",
  },
  {
    src: "https://images.unsplash.com/photo-1761671955479-c1fa3e1cf1a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
    alt: "Street photography",
    aspectClassName: "aspect-[4/5]",
    badge: "STREET",
    title: "Flag Street",
    description:
      "A narrow corridor of facades, cables and banners in late light.",
  },
  {
    src: "https://images.unsplash.com/photo-1767279265177-60b3595c61b5?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Lake Ohrid",
    aspectClassName: "aspect-[9/16]",
    badge: "SEA",
    title: "Sail Line",
    description:
      "A single mast crossing the calmest part of the afternoon sea.",
  },
  {
    src: "https://images.unsplash.com/photo-1764181582237-0c57598f693a?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Landscape photography",
    aspectClassName: "aspect-[4/5]",
    badge: "RIDGE",
    title: "Green Rise",
    description: "A softer slope where clouds break just above the tree line.",
  },
  {
    src: "https://images.unsplash.com/photo-1759424727859-7f489622313d?q=80&w=967&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Editorial photography",
    aspectClassName: "aspect-[9/16]",
    badge: "EDITORIAL",
    title: "Stone Steps",
    description: "Texture, repetition and a monochrome path cut into the rock.",
  },
  {
    src: "https://images.unsplash.com/photo-1759424727855-772a29b2ee93?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Travel photography",
    aspectClassName: "aspect-[3/4]",
    badge: "TRAVEL",
    title: "Harbor Silence",
    description:
      "A narrow frame where water and distant relief almost flatten out.",
  },
]

const previewItems = artItems.slice(0, 10)
const PREVIEW_PAGE_SIZE = 4

function getPreviewCurveStyle(index: number, count: number): CSSProperties {
  const center = (count - 1) / 2
  const offset = index - center
  const distance = Math.abs(offset)
  const curveDistance = Math.max(0, distance - 0.5)
  const direction = Math.sign(offset)
  const rotateY = direction * -34 * curveDistance
  const translateX = offset * 18 + direction * curveDistance * 28
  const translateY = curveDistance * 20
  const translateZ = curveDistance === 0 ? 24 : -curveDistance * 160
  const scale = 1.02 - curveDistance * 0.28 - distance * 0.02
  const opacity = 1 - curveDistance * 0.18
  const zIndex = Math.round((count - distance) * 10)
  const transformOrigin =
    offset < 0 ? "right center" : offset > 0 ? "left center" : "center center"

  return {
    "--preview-curve-transform": `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    "--preview-curve-opacity": `${opacity}`,
    "--preview-curve-z": `${zIndex}`,
    "--preview-curve-origin": transformOrigin,
  } as CSSProperties
}

export default function HeaderOrbitArtMasonry() {
  const [showAll, setShowAll] = useState(false)
  const [previewPage, setPreviewPage] = useState(0)
  const previewPageCount = Math.ceil(previewItems.length / PREVIEW_PAGE_SIZE)
  const previewPageItems = previewItems.slice(
    previewPage * PREVIEW_PAGE_SIZE,
    previewPage * PREVIEW_PAGE_SIZE + PREVIEW_PAGE_SIZE
  )

  return (
    <div className="space-y-6">
      {showAll ? (
        <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:p-5">
          <div className="absolute right-4 top-4 z-20 sm:right-5 sm:top-5">
            <div className="inline-flex w-fit items-center gap-1 rounded-full border border-white/60 bg-white/85 p-1 shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setShowAll(false)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  !showAll
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  showAll
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                All
              </button>
            </div>
          </div>

          <div className="max-h-[min(68vh,42rem)] overflow-y-auto pr-1">
            <div className="columns-2 gap-3 space-y-3 md:columns-3">
              {artItems.map((item) => (
                <div
                  key={item.src}
                  className="break-inside-avoid overflow-hidden rounded-2xl bg-slate-100"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1279px) 42vw, 280px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative min-h-[26rem] sm:min-h-[30rem]">
          <div className="absolute right-2 top-0 z-20 sm:right-3">
            <div className="inline-flex w-fit items-center gap-1 rounded-full border border-white/60 bg-white/70 p-1 shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setShowAll(false)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  !showAll
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  showAll
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                All
              </button>
            </div>
          </div>

          <div className="flex min-h-[26rem] items-center justify-center pt-14 sm:min-h-[30rem] sm:pt-16">
            <div className="w-full max-w-5xl px-3 sm:px-4">
              <div className="relative lg:[perspective:1100px]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:flex lg:items-end lg:justify-center lg:gap-6 xl:gap-8">
                  {previewPageItems.map((item, index) => (
                    <article
                      key={item.src}
                      style={getPreviewCurveStyle(
                        index,
                        previewPageItems.length
                      )}
                      className="group relative w-full max-w-48 justify-self-center transition-opacity duration-500 ease-out lg:w-44 lg:[opacity:var(--preview-curve-opacity)] lg:[z-index:var(--preview-curve-z)]"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border-4 border-white/85 bg-white/10 shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition-transform duration-500 ease-out lg:[backface-visibility:hidden] lg:[transform-origin:var(--preview-curve-origin)] lg:[transform-style:preserve-3d] lg:[transform:var(--preview-curve-transform)]">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover transition-transform ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 42vw, (max-width: 1024px) 26vw, (max-width: 1280px) 18vw, 12rem"
                        />
                        <div className="group-hover:bg-black/12 pointer-events-none absolute inset-0 z-10 flex size-full flex-col justify-between bg-transparent transition-colors duration-300">
                          <div className="ml-1 mt-1 w-fit rounded-md rounded-tl-2xl bg-white px-4 py-2">
                            <p className="text-xs font-bold tracking-[0.16em] text-gray-500">
                              {item.badge}
                            </p>
                          </div>
                          <div className="relative h-28 sm:h-32">
                            <div className="absolute inset-0 z-[2] rounded-b-3xl bg-gradient-to-t from-black/50 to-transparent opacity-20 transition-opacity duration-500 ease-out group-hover:opacity-100" />
                            <div className="absolute inset-x-0 bottom-0 z-[1010] translate-y-2 px-4 pb-4 pt-10 opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                              <p className="text-base font-semibold leading-tight text-white">
                                {item.title}
                              </p>
                              <p className="text-white/78 mt-1 max-w-[22ch] text-xs leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {previewPageCount > 1 ? (
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewPage((page) => Math.max(0, page - 1))
                    }
                    disabled={previewPage === 0}
                    className={cn(
                      "rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors",
                      previewPage === 0
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-white/16"
                    )}
                  >
                    Prev
                  </button>
                  <p className="min-w-14 text-center text-xs font-semibold tracking-[0.16em] text-white/55">
                    {previewPage + 1} / {previewPageCount}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewPage((page) =>
                        Math.min(previewPageCount - 1, page + 1)
                      )
                    }
                    disabled={previewPage === previewPageCount - 1}
                    className={cn(
                      "rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors",
                      previewPage === previewPageCount - 1
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-white/16"
                    )}
                  >
                    Next
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
