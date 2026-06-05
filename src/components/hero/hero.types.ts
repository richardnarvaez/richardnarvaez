export interface ArtPreviewItem {
  src: string
  alt: string
  badge: string
  title: string
  description: string
}

export type HeroOrbitOriginKind =
  | "icon"
  | "cover"
  | "brand-cycle"
  | "brand-cycle-wide"

export type HeroOrbitClusterKind = "interest"

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

export interface HeroOrbitOriginNode {
  kind: HeroOrbitOriginKind
  assets: readonly HeroOrbitNodeAsset[]
}

export interface HeroOrbitClusterNode {
  kind: HeroOrbitClusterKind
  label: string
  iconSvg: string
}

export interface HeroOrbitProfilePlacement {
  angle: number
  radiusDesktop: number
  radiusMobile: number
  scaleDesktop?: number
  scaleMobile?: number
}

export interface HeroOrbitOriginEntry {
  key: string
  originNode: HeroOrbitOriginNode
  origin: HeroOrbitNodePosition
}

export interface HeroOrbitProfileEntry {
  key: string
  clusterNode: HeroOrbitClusterNode
  profilePlacement: HeroOrbitProfilePlacement
}
