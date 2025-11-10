import { getWorkGallery } from "@/lib/gallery-data"
import GalleryFilters from "@/components/gallery/gallery-filters"
import MasonryGrid from "@/components/gallery/masonry-grid"

export const metadata = {
  title: "Gallery - Work & Projects",
  description: "Explore my projects, components, and design work",
}

export default async function GalleryPage() {
  const items = await getWorkGallery()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(244,31%,10%)] to-[hsl(244,31%,8%)]">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-6xl font-bold text-[#FF512F]">
            Work Gallery
          </h1>
          <p className="text-xl text-gray-300">
            Projects, components, and design work
          </p>
        </div>

        {/* Masonry Grid */}
        <MasonryGrid items={items} />
      </div>
    </div>
  )
}
