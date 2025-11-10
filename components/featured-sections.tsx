"use client"

import { useState } from "react"
import Link from "next/link"
import { PlaygroundComponent } from "@/lib/gallery-data"
import { PlaygroundItem } from "@/lib/gallery-types"
import GalleryModal from "@/components/gallery/gallery-modal"

interface FeaturedSectionsProps {
  dataList: PlaygroundComponent[]
}

export default function FeaturedSections({ dataList }: FeaturedSectionsProps) {
  const featuredComponents = dataList.slice(0, 4)
  const [selectedItem, setSelectedItem] = useState<PlaygroundItem | null>(null)

  const convertToPlaygroundItem = (
    comp: PlaygroundComponent
  ): PlaygroundItem => {
    return {
      id: comp.id,
      title: comp.title,
      type: "playground" as const,
      thumbnail: {
        url:
          comp.thumbnail ||
          `/playground/previews/${comp.id}.gif` ||
          "/images/cover.jpg",
        type: "image" as const,
      },
      category: comp.category,
      tags: comp.tags,
      date: comp.lastUpdated,
      componentPath: comp.id,
      description: comp.description,
      dependencies: comp.dependencies,
    }
  }

  const handleCardClick = (index: number) => {
    if (featuredComponents[index]) {
      setSelectedItem(convertToPlaygroundItem(featuredComponents[index]))
    }
  }

  return (
    <div className="container mx-auto px-4 py-48">
      {/* Featured Playground */}
      <section className="mb-16">
        <div className="mx-auto mb-[156px] flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Sandbox
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Safe place to experiment with new ideas and concepts. Logos,
            animations, photography, UI components, illustrations and more.
          </p>
          <Link
            href="/gallery?filter=playground"
            className="font-semibold text-[#FF512F] transition-colors hover:text-[#FF512F]/80"
          >
            View All
          </Link>
        </div>

        <div className="relative flex justify-center">
          <div className="relative h-[450px] w-[400px]">
            {/* Tarjeta 1 - Picture */}
            <div
              className="absolute inset-0 h-fit w-fit"
              style={{
                transform: "rotate(10deg) translate(180px, 200px)",
                zIndex: 10,
              }}
            >
              <div className="relative h-[380px] w-[280px] overflow-hidden rounded-3xl border-4 border-[#131221] bg-gradient-to-br from-background/90 via-[#FF512F]/15 to-purple-500/15 backdrop-blur-sm">
                <img
                  src={
                    "https://images.unsplash.com/photo-1761671955448-f68ca9eec238?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035https://images.unsplash.com/photo-1761671955448-f68ca9eec238?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035"
                  }
                  alt={featuredComponents[0]?.title}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </div>
            {/* Tarjeta 2 - Picture */}
            <div
              className="absolute inset-0 h-fit w-fit"
              style={{
                transform: "rotate(-4deg) translate(450px, 200px)",
                zIndex: 10,
              }}
            >
              <div className="relative h-[280px] w-[180px] overflow-hidden rounded-3xl border-4 border-[#131221] bg-gradient-to-br from-background/90 via-[#FF512F]/15 to-purple-500/15  backdrop-blur-sm">
                <img
                  src={
                    "https://images.unsplash.com/photo-1761671955479-c1fa3e1cf1a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035"
                  }
                  alt={featuredComponents[0]?.title}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </div>

            {/* Tarjeta 2 - Illustration huma legends */}
            <div
              className="absolute inset-0 h-fit w-fit"
              style={{
                transform: "rotate(5deg) translate(-250px, 100px)",
                zIndex: 10,
              }}
            >
              <div className="relative h-[280px] w-[180px] overflow-hidden rounded-3xl border-4 border-[#131221] bg-gradient-to-br from-background/90 via-[#FF512F]/15 to-purple-500/15  backdrop-blur-sm">
                <img
                  src={"/images/apps/huma_legends.jpg"}
                  alt={featuredComponents[0]?.title}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </div>

            {/* Tarjeta 2 - Logo App */}
            <div
              className="absolute inset-0 h-fit w-fit"
              style={{
                transform: "rotate(0deg) translate(400px, 400px)",
                zIndex: 10,
              }}
            >
              <div className="relative h-[100px] w-[100px] overflow-hidden rounded-3xl border-4 border-[#131221] bg-gradient-to-br from-background/90 via-[#FF512F]/15 to-purple-500/15 backdrop-blur-sm">
                <img
                  src={"/images/placeholder.webp"}
                  alt={featuredComponents[0]?.title}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </div>

            {/* Tarjeta 2 - Logo App */}
            <div
              className="absolute inset-0 h-fit w-fit"
              style={{
                transform: "rotate(4deg) translate(0px, 430px)",
                zIndex: 40,
              }}
            >
              <div className="relative h-[100px] w-[100px] overflow-hidden rounded-3xl border-4 border-[#131221] bg-gradient-to-br from-background/90 via-[#FF512F]/15 to-purple-500/15 backdrop-blur-sm">
                <img
                  src={"/images/placeholder.webp"}
                  alt={featuredComponents[0]?.title}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </div>
            {/* Tarjeta 2 - Logo App  Huma Legends*/}
            <div
              className="absolute inset-0 h-fit w-fit"
              style={{
                transform: "rotate(-6deg) translate(300px, -100px)",
                zIndex: 40,
              }}
            >
              <div className="relative h-[100px] w-[100px] overflow-hidden rounded-3xl border-4 border-[#131221] bg-gradient-to-br from-background/90 via-[#FF512F]/15 to-purple-500/15 backdrop-blur-sm">
                <img
                  src={"/images/apps/logo-huma.jpg"}
                  alt={featuredComponents[0]?.title}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </div>

            {/* Tarjeta 2 - Medio */}
            <div
              className="absolute inset-0 h-fit w-fit cursor-pointer transition-all"
              style={{
                transform: "rotate(-6deg) translate(-100px, 150px)",
                zIndex: 20,
              }}
              onClick={() => handleCardClick(1)}
            >
              <div className="relative h-[280px] w-[300px] overflow-hidden rounded-3xl border-4 border-[#131221] bg-gradient-to-br from-background/90 via-[#FF512F]/15 to-purple-500/15  backdrop-blur-sm">
                {featuredComponents[1] ? (
                  <>
                    <div className="flex h-[280px] w-[280px] items-center justify-center">
                      <div className="text-center">
                        {/* <div className="mb-3 text-4xl text-[#FF512F]">⚡</div> */}
                        <p className="text-sm font-semibold text-foreground">
                          {featuredComponents[1].title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Interactive Component
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity">
                      <div className="absolute inset-x-4 bottom-4">
                        <h3 className="mb-1 text-sm font-bold text-white">
                          {featuredComponents[1].title}
                        </h3>
                        <p className="mb-2 text-xs text-white/80">
                          {featuredComponents[1].description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {featuredComponents[1].tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-white/20 px-2 py-1 text-xs text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-[280px] w-[280px] items-center justify-center bg-gray-200">
                    <div className="text-center text-gray-500">
                      <div className="mb-2 text-2xl">⚡</div>
                      <p className="text-xs">Coming Soon</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tarjeta 3 - Arriba */}
            <div
              className="absolute inset-0 h-fit w-fit cursor-pointer transition-all"
              style={{
                transform: "rotate(3deg) translate(230px, -60px)",
                zIndex: 30,
              }}
              onClick={() => handleCardClick(0)}
            >
              <div className="relative h-[280px] w-[280px] overflow-hidden rounded-3xl border-4 border-[#131221] bg-gradient-to-br from-background/90 via-[#FF512F]/15 to-purple-500/15 backdrop-blur-sm">
                {featuredComponents[0] ? (
                  <>
                    <div className="flex h-[280px] w-[280px] items-center justify-center">
                      <div className="text-center">
                        {/* <div className="mb-3 text-4xl text-[#FF512F]">⚡</div> */}
                        <p className="text-sm font-semibold text-foreground">
                          {featuredComponents[0].title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Interactive Component
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity">
                      <div className="absolute inset-x-4 bottom-4">
                        <h3 className="mb-1 text-sm font-bold text-white">
                          {featuredComponents[0].title}
                        </h3>
                        <p className="mb-2 text-xs text-white/80">
                          {featuredComponents[0].description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {featuredComponents[0].tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-white/20 px-2 py-1 text-xs text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-[280px] w-[280px] items-center justify-center bg-gray-200">
                    <div className="text-center text-gray-500">
                      <div className="mb-2 text-2xl">⚡</div>
                      <p className="text-xs">Coming Soon</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tarjeta 4 - Superior todo */}
            <div
              className="absolute inset-0 h-fit w-fit cursor-pointer"
              style={{
                transform: "rotate(-8deg) translate(-25px, -120px)",
                zIndex: 40,
              }}
              onClick={() => handleCardClick(2)}
            >
              <div className="relative h-[280px] w-[280px] overflow-hidden rounded-3xl border-4 border-[#131221] bg-gradient-to-br from-background/90 via-[#FF512F]/15 to-purple-500/15 backdrop-blur-sm">
                {featuredComponents[2] ? (
                  <>
                    <div className="flex h-[280px] w-[280px] items-center justify-center">
                      <div className="text-center">
                        {/* <div className="mb-3 text-4xl text-[#FF512F]">⚡</div> */}
                        <p className="text-sm font-semibold text-foreground">
                          {featuredComponents[2].title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Interactive Component
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity">
                      <div className="absolute inset-x-4 bottom-4">
                        <h3 className="mb-1 text-sm font-bold text-white">
                          {featuredComponents[2].title}
                        </h3>
                        <p className="mb-2 text-xs text-white/80">
                          {featuredComponents[2].description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {featuredComponents[2].tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-white/20 px-2 py-1 text-xs text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-[280px] w-[280px] items-center justify-center bg-gray-200">
                    <div className="text-center text-gray-500">
                      <div className="mb-2 text-2xl">⚡</div>
                      <p className="text-xs">Coming Soon</p>
                    </div>
                  </div>
                )}
              </div>{" "}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <GalleryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}
