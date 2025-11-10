// Convertir componentes playground a gallery items (función legacy)

import { playgroundComponents } from "@/lib/gallery-data"
import { PlaygroundItem } from "@/lib/gallery-types"

// Re-exportar desde gallery-data.ts para mantener compatibilidad
export type { PlaygroundComponent } from "@/lib/gallery-data"

export {
  playgroundComponents,
  getAllPlaygroundComponents,
  getPlaygroundComponent,
  getPlaygroundComponentsByCategory,
  searchPlaygroundComponents,
} from "@/lib/gallery-data"

export function getPlaygroundComponents(): PlaygroundItem[] {
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
