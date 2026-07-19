import type {
   ArtPreviewItem,
   HeroOrbitOriginEntry,
   HeroOrbitProfileEntry,
} from './hero.types'
import { lucideInterestIcons } from '../icons/lucideInterestIcons'

export const artPreviewItems = [
   {
      src: 'https://images.unsplash.com/photo-1764025721609-2bd1cf185f32?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Madeira',
      badge: 'LANDSCAPE',
      title: 'Madeira Cliffs',
      description: 'Clouds wrapping the ridge before the sun opened the valley.',
   },
   {
      src: '/images/me.jpg',
      alt: 'Portrait photography',
      badge: 'PORTRAIT',
      title: 'Landing Path',
      description: 'A quiet frame under the flight line with the city opening behind.',
   },
   {
      src: 'https://images.unsplash.com/photo-1761671955448-f68ca9eec238?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035',
      alt: 'Urban photography',
      badge: 'VALLEY',
      title: 'Blue Valley',
      description: 'A clear mountain basin with the horizon holding just one color.',
   },
   {
      src: 'https://images.unsplash.com/photo-1761671955479-c1fa3e1cf1a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035',
      alt: 'Street photography',
      badge: 'STREET',
      title: 'Flag Street',
      description: 'A narrow corridor of facades, cables and banners in late light.',
   },
   {
      src: 'https://images.unsplash.com/photo-1767279265177-60b3595c61b5?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Lake Ohrid',
      badge: 'SEA',
      title: 'Sail Line',
      description: 'A single mast crossing the calmest part of the afternoon sea.',
   },
   {
      src: 'https://images.unsplash.com/photo-1764181582237-0c57598f693a?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Landscape photography',
      badge: 'RIDGE',
      title: 'Green Rise',
      description: 'A softer slope where clouds break just above the tree line.',
   },
   {
      src: 'https://images.unsplash.com/photo-1759424727859-7f489622313d?q=80&w=967&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Editorial photography',
      badge: 'EDITORIAL',
      title: 'Stone Steps',
      description: 'Texture, repetition and a monochrome path cut into the rock.',
   },
   {
      src: 'https://images.unsplash.com/photo-1759424727855-772a29b2ee93?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Travel photography',
      badge: 'TRAVEL',
      title: 'Harbor Silence',
      description: 'A narrow frame where water and distant relief almost flatten out.',
   },
] as const satisfies readonly ArtPreviewItem[]

export const illustrationPreviewItems = [
   { src: '/images/illustration/pic_1.jpg', alt: 'Illustration 1' },
   { src: '/images/illustration/pic_2.jpg', alt: 'Illustration 2' },
   { src: '/images/illustration/pic_3.jpg', alt: 'Illustration 3' },
   { src: '/images/illustration/pic_4.jpg', alt: 'Illustration 4' },
   { src: '/images/illustration/pic_5.jpg', alt: 'Illustration 5' },
] as const

export const heroOrbitOriginNodes: readonly HeroOrbitOriginEntry[] = [
   {
      key: 'photography',
      originNode: {
         kind: 'icon',
         assets: [
            {
               src: '/images/figma-color.svg',
               alt: 'Figma',
               className: 'size-6 object-contain',
            },
         ],
      },
      origin: { left: 5.5, top: 29.5 },
   },
   {
      key: 'illustration',
      originNode: {
         kind: 'icon',
         assets: [
            {
               src: '/images/convex.svg',
               alt: 'Convex',
               className: 'size-6 object-contain',
            },
         ],
      },
      origin: { left: 28, top: 0 },
   },
   {
      key: 'experiments',
      originNode: {
         kind: 'brand-cycle',
         assets: [
            {
               src: '/images/codex.svg',
               alt: 'Codex',
               className: 'size-6 object-contain',
            },
            {
               src: '/images/claudecode-color.svg',
               alt: 'Claude Code',
               className: 'size-6 object-contain',
            },
         ],
      },
      origin: { left: 14, top: 50 },
   },
   {
      key: 'apps',
      originNode: {
         kind: 'brand-cycle-wide',
         assets: [
            {
               src: '/images/gemini-color.svg',
               alt: 'Gemini',
               className: 'size-8 object-contain',
            },
            {
               src: '/images/googlecloud-color.svg',
               alt: 'Google Cloud',
               className: 'size-8 object-contain',
            },
         ],
      },
      origin: { left: 32, top: 84 },
   },
   {
      key: 'travel',
      originNode: {
         kind: 'icon',
         assets: [
            {
               src: '/images/cloudflare-color.svg',
               alt: 'Cloudflare',
               className: 'size-6 object-contain',
            },
         ],
      },
      origin: { left: 60, top: 8 },
   },
   {
      key: 'development',
      originNode: {
         kind: 'icon',
         assets: [
            {
               src: '/images/vercel.svg',
               alt: 'Vercel',
               className: 'size-3.5 object-contain',
            },
         ],
      },
      origin: { left: 96, top: 41 },
   },
   {
      key: 'writing',
      originNode: {
         kind: 'icon',
         assets: [
            {
               src: '/images/railway.svg',
               alt: 'Railway',
               className: 'size-7 object-contain',
            },
         ],
      },
      origin: { left: 86, top: 61 },
   },
   {
      key: 'routes',
      originNode: {
         kind: 'icon',
         assets: [
            {
               src: '/images/googlecloud-color.svg',
               alt: 'Google Cloud',
               className: 'size-6 object-contain',
            },
         ],
      },
      origin: { left: 84, top: 27 },
   },
   {
      key: 'video',
      originNode: {
         kind: 'cover',
         assets: [
            {
               src: '/images/logos/procreate.jpeg',
               alt: 'Procreate',
            },
         ],
      },
      origin: { left: 74, top: 98 },
   },
]

export const heroOrbitProfileNodes: readonly HeroOrbitProfileEntry[] = [
   {
      key: 'photography',
      clusterNode: {
         kind: 'interest',
         label: 'Fotografia',
         iconSvg: lucideInterestIcons.photography,
      },
      profilePlacement: {
         angle: 180,
         radiusDesktop: 130,
         radiusMobile: 103.2,
         scaleDesktop: 0.9,
         scaleMobile: 0.74,
      },
   },
   {
      key: 'illustration',
      clusterNode: {
         kind: 'interest',
         label: 'Ilustracion',
         iconSvg: lucideInterestIcons.illustration,
      },
      profilePlacement: {
         angle: 212.7,
         radiusDesktop: 133.1,
         radiusMobile: 84.9,
         scaleDesktop: 0.9,
         scaleMobile: 0.74,
      },
   },
   {
      key: 'experiments',
      clusterNode: {
         kind: 'interest',
         label: 'Experimentos',
         iconSvg: lucideInterestIcons.experiments,
      },
      profilePlacement: {
         angle: 239.6,
         radiusDesktop: 173.9,
         radiusMobile: 110.7,
         scaleDesktop: 0.78,
         scaleMobile: 0.68,
      },
   },
   {
      key: 'apps',
      clusterNode: {
         kind: 'interest',
         label: 'Apps',
         iconSvg: lucideInterestIcons.apps,
      },
      profilePlacement: {
         angle: 261,
         radiusDesktop: 110,
         radiusMobile: 80,
         scaleDesktop: 1,
         scaleMobile: 0.86,
      },
   },
   {
      key: 'travel',
      clusterNode: {
         kind: 'interest',
         label: 'Viajes',
         iconSvg: lucideInterestIcons.travel,
      },
      profilePlacement: {
         angle: 290,
         radiusDesktop: 165.5,
         radiusMobile: 100,
         scaleDesktop: 0.82,
         scaleMobile: 0.7,
      },
   },
   {
      key: 'development',
      clusterNode: {
         kind: 'interest',
         label: 'Desarrollo',
         iconSvg: lucideInterestIcons.development,
      },
      profilePlacement: {
         angle: 320,
         radiusDesktop: 125,
         radiusMobile: 90,
         scaleDesktop: 1,
         scaleMobile: 0.84,
      },
   },
   {
      key: 'writing',
      clusterNode: {
         kind: 'interest',
         label: 'Notas',
         iconSvg: lucideInterestIcons.writing,
      },
      profilePlacement: {
         angle: 340,
         radiusDesktop: 170.2,
         radiusMobile: 125,
         scaleDesktop: 0.82,
         scaleMobile: 0.7,
      },
   },
   {
      key: 'routes',
      clusterNode: {
         kind: 'interest',
         label: 'Rutas',
         iconSvg: lucideInterestIcons.routes,
      },
      profilePlacement: {
         angle: 200,
         radiusDesktop: 195,
         radiusMobile: 130,
         scaleDesktop: 0.68,
         scaleMobile: 0.58,
      },
   },
   {
      key: 'video',
      clusterNode: {
         kind: 'interest',
         label: 'Video',
         iconSvg: lucideInterestIcons.video,
      },
      profilePlacement: {
         angle: 0,
         radiusDesktop: 100,
         radiusMobile: 93.5,
         scaleDesktop: 0.9,
         scaleMobile: 0.76,
      },
   },
]
