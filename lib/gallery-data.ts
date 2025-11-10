import { allPosts } from "@/.contentlayer/generated"
import {
  GalleryItem,
  ProjectItem,
  PlaygroundItem,
  MediaItem,
} from "./gallery-types"

export interface PlaygroundComponent {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  lastUpdated: string
  dependencies: string[]
  thumbnail?: string
}

// Convertir posts MDX existentes a gallery items
export async function getProjectsForGallery(): Promise<ProjectItem[]> {
  const posts = allPosts.filter((p) => p.published)

  return posts.map((post) => ({
    id: post._id,
    title: post.title,
    type: "project" as const,
    thumbnail: {
      url: post.image,
      type: "image" as const,
    },
    category: "Project",
    tags: post.status || [],
    date: post.date,
    mdxSlug: post.slug,
    description: post.description || "",
  }))
}

// Playground components data - Single source of truth
export const playgroundComponents: PlaygroundComponent[] = [
  {
    id: "drop-down",
    title: "Drop Down",
    category: "UI Component",
    tags: ["animation", "drop down", "blur text"],
    lastUpdated: "2025-11-10",
    description: "Drop Down with Blur Text",
    dependencies: ["gsap", "framer-motion"],
    thumbnail: "/images/components/drop-blur.jpg",
  },
  {
    id: "orb",
    title: "Magic Orb",
    category: "UI Component",
    tags: ["animation", "loading"],
    lastUpdated: "2025-11-10",
    description: "Loading animation with Framer Motion",
    dependencies: ["framer-motion"],
    thumbnail: "/images/components/orb.jpg",
  },
  {
    id: "lyrics",
    title: "Lyrics Animation",
    category: "UI Component",
    tags: ["animation", "lyrics"],
    lastUpdated: "2025-11-10",
    description: "Spotify, Youtube, Apple Music like lyrics animation",
    dependencies: ["framer-motion"],
    thumbnail: "/images/cover.jpg",
  },
]

// Convertir componentes playground a gallery items
export async function getPlaygroundForGallery(): Promise<PlaygroundItem[]> {
  return playgroundComponents.map((comp) => ({
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
  }))
}

// Funciones de utilidad para playground components
export function getAllPlaygroundComponents(): PlaygroundComponent[] {
  return playgroundComponents
}

export function getPlaygroundComponent(
  id: string
): PlaygroundComponent | undefined {
  return playgroundComponents.find((comp) => comp.id === id)
}

export function getPlaygroundComponentsByCategory(
  category: string
): PlaygroundComponent[] {
  return playgroundComponents.filter((comp) =>
    comp.category.toLowerCase().includes(category.toLowerCase())
  )
}

export function searchPlaygroundComponents(
  query: string
): PlaygroundComponent[] {
  const lowercaseQuery = query.toLowerCase()
  return playgroundComponents.filter(
    (comp) =>
      comp.title.toLowerCase().includes(lowercaseQuery) ||
      comp.description.toLowerCase().includes(lowercaseQuery) ||
      comp.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// Media items (fotografía y diseño)
const mediaItems: MediaItem[] = [
  // {
  //   id: "photo-001",
  //   title: "Mountain Landscape",
  //   type: "photo",
  //   thumbnail: {
  //     url: "https://images.unsplash.com/photo-1761424384120-81134aef0d8d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
  //     type: "image",
  //   },
  //   category: "Landscape",
  //   tags: ["nature", "mountains"],
  //   date: "2024-01-15",
  //   description: "Beautiful mountain landscape at sunset",
  //   camera: "Canon EOS R5",
  // },
  // {
  //   id: "design-001",
  //   title: "Logo Animation",
  //   type: "design",
  //   thumbnail: { url: "/images/cover.jpg", type: "video" },
  //   category: "Branding",
  //   tags: ["logo", "animation"],
  //   date: "2024-01-10",
  //   description: "Animated logo design for tech startup",
  // },
]

export function getMediaItems(): MediaItem[] {
  return mediaItems
}

// Función principal que combina todo
export async function getGallery(): Promise<GalleryItem[]> {
  const projects = await getProjectsForGallery()
  const playground = await getPlaygroundForGallery()
  const media = getMediaItems()

  return [...projects, ...playground, ...media]
}

// Función para obtener solo fotografía
export async function getPhotography(): Promise<MediaItem[]> {
  return mediaItems.filter((item) => item.type === "photo")
}

// Función para obtener solo trabajo (projects + playground + design)
export async function getWorkGallery(): Promise<GalleryItem[]> {
  // const projects = await getProjectsForGallery()
  const playground = await getPlaygroundForGallery()
  const design = mediaItems.filter((item) => item.type === "design")

  return [...playground, ...design]
}
