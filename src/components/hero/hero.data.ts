import type { ArtPreviewItem, HeroOrbitNode } from "./hero.types"

export const artPreviewItems = [
  {
    src: "https://images.unsplash.com/photo-1764025721609-2bd1cf185f32?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Madeira",
    badge: "LANDSCAPE",
    title: "Madeira Cliffs",
    description: "Clouds wrapping the ridge before the sun opened the valley.",
  },
  {
    src: "/images/me.jpg",
    alt: "Portrait photography",
    badge: "PORTRAIT",
    title: "Landing Path",
    description: "A quiet frame under the flight line with the city opening behind.",
  },
  {
    src: "https://images.unsplash.com/photo-1761671955448-f68ca9eec238?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
    alt: "Urban photography",
    badge: "VALLEY",
    title: "Blue Valley",
    description: "A clear mountain basin with the horizon holding just one color.",
  },
  {
    src: "https://images.unsplash.com/photo-1761671955479-c1fa3e1cf1a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
    alt: "Street photography",
    badge: "STREET",
    title: "Flag Street",
    description: "A narrow corridor of facades, cables and banners in late light.",
  },
  {
    src: "https://images.unsplash.com/photo-1767279265177-60b3595c61b5?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Lake Ohrid",
    badge: "SEA",
    title: "Sail Line",
    description: "A single mast crossing the calmest part of the afternoon sea.",
  },
  {
    src: "https://images.unsplash.com/photo-1764181582237-0c57598f693a?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Landscape photography",
    badge: "RIDGE",
    title: "Green Rise",
    description: "A softer slope where clouds break just above the tree line.",
  },
  {
    src: "https://images.unsplash.com/photo-1759424727859-7f489622313d?q=80&w=967&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Editorial photography",
    badge: "EDITORIAL",
    title: "Stone Steps",
    description: "Texture, repetition and a monochrome path cut into the rock.",
  },
  {
    src: "https://images.unsplash.com/photo-1759424727855-772a29b2ee93?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Travel photography",
    badge: "TRAVEL",
    title: "Harbor Silence",
    description: "A narrow frame where water and distant relief almost flatten out.",
  },
] as const satisfies readonly ArtPreviewItem[]

export const heroOrbitNodes = [
  {
    key: "figma",
    kind: "icon",
    assets: [
      {
        src: "/images/figma-color.svg",
        alt: "Figma",
        className: "size-6 object-contain",
      },
    ],
    origin: { left: 5.5, top: 29.5 },
    cluster: { left: 20, top: 70, scale: 0.88 },
  },
  {
    key: "convex",
    kind: "icon",
    assets: [
      {
        src: "/images/convex.svg",
        alt: "Convex",
        className: "size-6 object-contain",
      },
    ],
    origin: { left: 28, top: 0 },
    cluster: { left: 26, top: 34, scale: 0.92 },
  },
  {
    key: "codex-cycle",
    kind: "brand-cycle",
    assets: [
      {
        src: "/images/codex.svg",
        alt: "Codex",
        className: "size-6 object-contain",
      },
      {
        src: "/images/claudecode-color.svg",
        alt: "Claude Code",
        className: "size-6 object-contain",
      },
    ],
    origin: { left: 14, top: 50 },
    cluster: { left: 29, top: 5, scale: 0.75 },
  },
  {
    key: "gemini-cloud-cycle",
    kind: "brand-cycle-wide",
    assets: [
      {
        src: "/images/gemini-color.svg",
        alt: "Gemini",
        className: "size-8 object-contain",
      },
      {
        src: "/images/googlecloud-color.svg",
        alt: "Google Cloud",
        className: "size-8 object-contain",
      },
    ],
    origin: { left: 32, top: 84 },
    cluster: { left: 42, top: 20, scale: 1 },
  },
  {
    key: "cloudflare",
    kind: "icon",
    assets: [
      {
        src: "/images/cloudflare-color.svg",
        alt: "Cloudflare",
        className: "size-6 object-contain",
      },
    ],
    origin: { left: 60, top: 8 },
    cluster: { left: 55, top: 0, scale: 0.8 },
  },
  {
    key: "vercel",
    kind: "icon",
    assets: [
      {
        src: "/images/vercel.svg",
        alt: "Vercel",
        className: "size-3.5 object-contain",
      },
    ],
    origin: { left: 96, top: 41 },
    cluster: { left: 58, top: 30, scale: 1 },
  },
  {
    key: "railway",
    kind: "icon",
    assets: [
      {
        src: "/images/railway.svg",
        alt: "Railway",
        className: "size-7 object-contain",
      },
    ],
    origin: { left: 86, top: 61 },
    cluster: { left: 74, top: 39, scale: 0.8 },
  },
  {
    key: "google-cloud",
    kind: "icon",
    assets: [
      {
        src: "/images/googlecloud-color.svg",
        alt: "Google Cloud",
        className: "size-6 object-contain",
      },
    ],
    origin: { left: 84, top: 27 },
    cluster: { left: 12, top: 42, scale: 0.65 },
  },
  {
    key: "procreate",
    kind: "cover",
    assets: [
      {
        src: "/images/logos/procreate.jpeg",
        alt: "Procreate",
      },
    ],
    origin: { left: 74, top: 98 },
    cluster: { left: 65, top: 65, scale: 0.88 },
  },
] as const satisfies readonly HeroOrbitNode[]
