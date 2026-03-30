import Image from "next/image"

import { cn } from "@/lib/utils"

const artItems = [
  {
    src: "https://images.unsplash.com/photo-1764025721609-2bd1cf185f32?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Madeira",
    aspectClassName: "aspect-[4/5]",
  },
  {
    src: "/images/me.jpg",
    alt: "Portrait photography",
    aspectClassName: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1761671955448-f68ca9eec238?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
    alt: "Urban photography",
    aspectClassName: "aspect-[4/5]",
  },
  {
    src: "https://images.unsplash.com/photo-1761671955479-c1fa3e1cf1a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
    alt: "Street photography",
    aspectClassName: "aspect-[4/5]",
  },
  {
    src: "https://images.unsplash.com/photo-1767279265177-60b3595c61b5?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Lake Ohrid",
    aspectClassName: "aspect-[9/16]",
  },
  {
    src: "https://images.unsplash.com/photo-1764181582237-0c57598f693a?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspectClassName: "aspect-[4/5]",
  },
  {
    src: "https://images.unsplash.com/photo-1759424727859-7f489622313d?q=80&w=967&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspectClassName: "aspect-[9/16]",
  },
  {
    src: "https://images.unsplash.com/photo-1759424727855-772a29b2ee93?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    aspectClassName: "aspect-[3/4]",
  },
] as const

export default function HeaderOrbitArtMasonry() {
  return (
    <div className="columns-2 gap-3 space-y-3 md:columns-3">
      {artItems.map((item) => (
        <div
          key={item.src}
          className="break-inside-avoid overflow-hidden rounded-2xl bg-slate-100"
        >
          <div
            className={cn(
              "relative w-full overflow-hidden",
              item.aspectClassName
            )}
          >
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
  )
}
