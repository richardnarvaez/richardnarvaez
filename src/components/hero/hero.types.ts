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
  | "interest"

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
  label?: string
  iconSvg?: string
  originKind?: HeroOrbitNodeKind
  originAssets?: readonly HeroOrbitNodeAsset[]
  originLabel?: string
  originIconSvg?: string
  origin: HeroOrbitNodePosition
  cluster: HeroOrbitNodePosition
  clusterMobile?: HeroOrbitNodePosition
  clusterOffset?: HeroOrbitNodePosition
  clusterMobileOffset?: HeroOrbitNodePosition
}
