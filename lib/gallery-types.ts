export type GalleryItemType = 'project' | 'playground' | 'photo' | 'design'

export interface BaseGalleryItem {
  id: string
  title: string
  type: GalleryItemType
  thumbnail: {
    url: string
    type: 'image' | 'video'
  }
  category: string // "App", "Logo", "Photo", "Component"
  tags: string[]
  date: string
}

export interface ProjectItem extends BaseGalleryItem {
  type: 'project'
  mdxSlug: string // referencia al MDX existente
  description: string
}

export interface PlaygroundItem extends BaseGalleryItem {
  type: 'playground'
  componentPath: string // path al componente
  description: string
  dependencies: string[]
}

export interface MediaItem extends BaseGalleryItem {
  type: 'photo' | 'design'
  description?: string
  camera?: string // opcional para fotos
}

export type GalleryItem = ProjectItem | PlaygroundItem | MediaItem

// Chip styles for visual differentiation
export const chipStyles = {
  project: 'bg-blue-500/10 text-blue-600 border border-blue-500/20',
  playground: 'bg-purple-500/10 text-purple-600 border border-purple-500/20',
  photo: 'bg-green-500/10 text-green-600 border border-green-500/20',
  design: 'bg-orange-500/10 text-orange-600 border border-orange-500/20'
}

export const chipLabels = {
  project: 'Project',
  playground: 'Component',
  photo: 'Photography',
  design: 'Design'
}
