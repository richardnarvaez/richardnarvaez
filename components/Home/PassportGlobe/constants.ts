import type { PlaceStatus } from "./types"

export const passportGlobeConfig = {
  center: [-30, 25] as [number, number],
}

export const GLOBE_HEIGHT = 600
export const GLOBE_SCALE = 1.2
export const GLOBE_SURFACE_RADIUS = 0.8
export const ROTATION_EASING = 0.08
export const ROTATION_SETTLE_EPSILON = 0.0004
export const PROJECTION_PHI_OFFSET = 0
export const FOCUS_THETA_OFFSET = 0.3
export const THETA_LIMIT = 1.05
export const DRAG_PHI_SENSITIVITY = 0.01
export const DRAG_THETA_SENSITIVITY = 0.008
export const GLOBE_DEVICE_PIXEL_RATIO_CAP_COMPACT = 1.25
export const GLOBE_DEVICE_PIXEL_RATIO_CAP_FULL = 1.75
export const GLOBE_MAP_SAMPLES_COMPACT = 6000
export const GLOBE_MAP_SAMPLES_FULL = 12000

export const mixedPlacesColor = "from-violet-500 to-purple-500"
export const neutralPlaceColor = "from-white to-slate-100"

export const placeStatusColors: Record<PlaceStatus, string> = {
  visited: "from-emerald-400 to-green-500",
  wishlist: "from-amber-400 to-orange-500",
  liked: "from-rose-500 to-red-500",
  repeat: "from-sky-500 to-blue-500",
}

export const colorMap: Record<string, { start: string; end: string }> = {
  "from-emerald-400 to-green-500": {
    start: "#34d399",
    end: "#22c55e",
  },
  "from-amber-400 to-orange-500": {
    start: "#fbbf24",
    end: "#f97316",
  },
  "from-rose-500 to-red-500": {
    start: "#f43f5e",
    end: "#ef4444",
  },
  "from-sky-500 to-blue-500": {
    start: "#0ea5e9",
    end: "#3b82f6",
  },
  "from-violet-500 to-purple-500": {
    start: "#8b5cf6",
    end: "#a855f7",
  },
  "from-white to-slate-100": {
    start: "#ffffff",
    end: "#f1f5f9",
  },
}
