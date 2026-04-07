export interface ArtPreviewItem {
  src: string
  alt: string
  badge: string
  title: string
  description: string
}

export type HeroOrbitNodeKind =
  | "icon"
  | "cover"
  | "brand-cycle"
  | "brand-cycle-wide"

export interface HeroOrbitNodeAsset {
  src: string
  alt: string
  className?: string
}

export interface HeroOrbitNodePosition {
  left: number
  top: number
  scale?: number
}

export interface HeroOrbitNode {
  key: string
  kind: HeroOrbitNodeKind
  assets: readonly HeroOrbitNodeAsset[]
  origin: HeroOrbitNodePosition
  cluster: HeroOrbitNodePosition
}
