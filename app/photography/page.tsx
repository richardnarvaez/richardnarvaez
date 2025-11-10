import { getPhotography } from "@/lib/gallery-data"
import MasonryGrid from "@/components/gallery/masonry-grid"

export const metadata = {
  title: "Photography - Richard Vinueza",
  description:
    "Photography portfolio showcasing landscapes, portraits, and creative work",
}

export default async function PhotographyPage() {
  const items = await getPhotography()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(244,31%,10%)] to-[hsl(244,31%,8%)]">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-6xl font-bold text-transparent">
            Photography
          </h1>
          <p className="text-xl text-gray-300">
            Capturing moments and landscapes
          </p>
        </div>

        {/* Masonry Grid - Solo fotografía */}
        <MasonryGrid items={items} />
      </div>
    </div>
  )
}
