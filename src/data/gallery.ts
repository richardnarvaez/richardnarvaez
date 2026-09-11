// Piezas de la galería (ilustraciones y fotografía) para el lienzo del Mac y
// el drawer de galería. Las fotos son las propias publicadas en Unsplash.
export type GalleryKind = "illustration" | "photo" | "app"

export interface GalleryItem {
  id: string
  kind: GalleryKind
  name: string
  desc?: string
  /** Miniatura: lienzo y drawer. */
  src: string
  /** Versión grande para el visor (≤1600px). */
  full: string
  /** Ancho / alto de la imagen, para reservar el hueco antes de cargar. */
  ratio: number
}

// Miniaturas a 960px (drawer en retina) y grandes a 1600px para el visor.
const unsplash = (id: string, w = 960) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75&w=${w}`
const unsplashPair = (id: string) => ({ src: unsplash(id), full: unsplash(id, 1600) })
const local = (thumb: string, large: string) => ({ src: thumb, full: large })

export const illustrations: GalleryItem[] = [
  { id: "ill-1", kind: "illustration", name: "New Brand", desc: "Brand exploration for Huma Legends.", ...local("/images/illustration/thumbs/pic_1.webp", "/images/illustration/large/pic_1.webp"), ratio: 1 },
  { id: "ill-2", kind: "illustration", name: "Huma Character A/B Test", desc: "Two directions for the main character, side by side.", ...local("/images/illustration/thumbs/pic_2.webp", "/images/illustration/large/pic_2.webp"), ratio: 1.43 },
  { id: "ill-3", kind: "illustration", name: "Illustration 03", ...local("/images/illustration/thumbs/pic_3.webp", "/images/illustration/large/pic_3.webp"), ratio: 0.56 },
  { id: "ill-4", kind: "illustration", name: "Illustration 04", ...local("/images/illustration/thumbs/pic_4.webp", "/images/illustration/large/pic_4.webp"), ratio: 0.7 },
  { id: "ill-5", kind: "illustration", name: "Cantuña", desc: "Cover for the story of Cantuña.", ...local("/images/illustration/thumbs/pic_5.webp", "/images/illustration/large/pic_5.webp"), ratio: 1 },
  { id: "ill-6", kind: "illustration", name: "First Illustration", desc: "Skull and sword, in two blues.", ...local("/images/illustration/thumbs/pic_6.webp", "/images/illustration/large/pic_6.webp"), ratio: 1 },
]

export const photos: GalleryItem[] = [
  { id: "madeira", kind: "photo", name: "Madeira Cliffs", desc: "Clouds wrapping the ridge before the sun opened the valley.", ...unsplashPair("photo-1764025721609-2bd1cf185f32"), ratio: 0.8 },
  { id: "landing-path", kind: "photo", name: "California", desc: "A quiet frame under the flight line with the city opening behind.", ...local("/images/photos/landing-path.webp", "/images/photos/large/landing-path.webp"), ratio: 0.75 },
  { id: "blue-valley", kind: "photo", name: "Blue Valley", desc: "A clear mountain basin with the horizon holding just one color.", ...unsplashPair("photo-1761671955448-f68ca9eec238"), ratio: 0.8 },
  { id: "flag-street", kind: "photo", name: "Malta", desc: "A narrow corridor of facades, cables and banners in late light.", ...unsplashPair("photo-1761671955479-c1fa3e1cf1a8"), ratio: 0.8 },
  { id: "sail-line", kind: "photo", name: "Ohrid, Macedonia", desc: "A single mast crossing the calmest part of the afternoon sea.", ...unsplashPair("photo-1767279265177-60b3595c61b5"), ratio: 0.5625 },
  { id: "green-rise", kind: "photo", name: "Green Rise", desc: "A softer slope where clouds break just above the tree line.", ...unsplashPair("photo-1764181582237-0c57598f693a"), ratio: 0.8 },
  { id: "stone-steps", kind: "photo", name: "Stone Steps", desc: "Texture, repetition and a monochrome path cut into the rock.", ...unsplashPair("photo-1759424727859-7f489622313d"), ratio: 0.5625 },
  { id: "harbor-silence", kind: "photo", name: "Harbor Silence", desc: "A narrow frame where water and distant relief almost flatten out.", ...unsplashPair("photo-1759424727855-772a29b2ee93"), ratio: 0.75 },
]

// Iconos de app: también son ilustración propia, y en miniatura apenas se ven.
export const appIcons: GalleryItem[] = [
  { id: "app-huma", kind: "app", name: "Huma Legends icon", desc: "App icon for Huma Legends.", ...local("/images/apps/huma.webp", "/images/apps/large/huma.webp"), ratio: 1 },
  { id: "app-memory", kind: "app", name: "Memory ClickStudio icon", desc: "App icon for Memory ClickStudio.", ...local("/images/apps/memory.webp", "/images/apps/large/memory.webp"), ratio: 1 },
  { id: "app-deliverycat", kind: "app", name: "DeliveryCat icon", desc: "App icon for DeliveryCat.", ...local("/images/apps/deliverycat.webp", "/images/apps/large/deliverycat.webp"), ratio: 1 },
  { id: "app-thelist", kind: "app", name: "The List icon", desc: "App icon for The List.", ...local("/images/apps/thelist.webp", "/images/apps/large/thelist.webp"), ratio: 1 },
  { id: "app-zodiac", kind: "app", name: "Zodiac icon", desc: "App icon for Zodiac.", ...local("/images/apps/zodiac.webp", "/images/apps/large/zodiac.webp"), ratio: 1 },
  { id: "app-chicken", kind: "app", name: "Chicken vs Cats icon", desc: "Game icon for Chicken vs Cats.", ...local("/images/apps/chicken-vs-cats.webp", "/images/apps/large/chicken-vs-cats.webp"), ratio: 1 },
  { id: "app-little-king", kind: "app", name: "The Little King icon", desc: "Game icon for The Little King.", ...local("/images/apps/little-king.webp", "/images/apps/large/little-king.webp"), ratio: 1 },
  { id: "app-little-king-logo", kind: "app", name: "The Little King logo", desc: "Wordmark for The Little King.", ...local("/images/apps/little-king-logo.webp", "/images/apps/large/little-king-logo.webp"), ratio: 1 },
  { id: "app-relax-puzzle", kind: "app", name: "Relax Puzzle logo", desc: "Wordmark for Relax Puzzle.", ...local("/images/apps/relax-puzzle.webp", "/images/apps/large/relax-puzzle.webp"), ratio: 2.33 },
]

export const gallery: GalleryItem[] = [...illustrations, ...appIcons, ...photos]
