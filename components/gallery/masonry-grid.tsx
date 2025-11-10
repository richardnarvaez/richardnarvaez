"use client"

import { useState } from "react"
import { GalleryItem } from "@/lib/gallery-types"
import GalleryCard from "./gallery-card"
import GalleryModal from "./gallery-modal"

interface MasonryGridProps {
  items: GalleryItem[]
}

export default function MasonryGrid({ items }: MasonryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="break-inside-avoid">
            <GalleryCard 
              item={item} 
              onClick={() => setSelectedItem(item)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <GalleryModal 
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  )
}
