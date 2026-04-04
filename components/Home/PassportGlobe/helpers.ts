import {
  colorMap,
  GLOBE_HEIGHT,
  GLOBE_SCALE,
  GLOBE_SURFACE_RADIUS,
  mixedPlacesColor,
  neutralPlaceColor,
  passportGlobeConfig,
  placeStatusColors,
  PROJECTION_PHI_OFFSET,
  THETA_LIMIT,
} from "./constants"
import { worldData } from "./data"
import type {
  MarkerEntry,
  Place,
  PlaceStatus,
  ProjectedMarker,
  WorldData,
} from "./types"

export const getColorGradient = (color: string): { start: string; end: string } =>
  colorMap[color] || colorMap[neutralPlaceColor]

export const getAllPlaces = (data: WorldData): Place[] => {
  const places: Place[] = []

  data.forEach((continent) => {
    continent.countries.forEach((country) => {
      country.places.forEach((place) => {
        places.push(place)
      })
    })
  })

  return places
}

export const getPlaceStatus = (place: Place): PlaceStatus | null =>
  place.status || null

export const getPlaceColor = (place: Place): string => {
  const status = getPlaceStatus(place)
  return status ? placeStatusColors[status] : neutralPlaceColor
}

export const getPlacesColor = (places: Place[]): string => {
  if (places.length === 0) return neutralPlaceColor
  if (places.length > 1) return mixedPlacesColor
  return getPlaceColor(places[0])
}

export const getPlaceCountry = (
  placeId: string
): { country: string; code: string } | null => {
  for (const continent of worldData) {
    for (const country of continent.countries) {
      const match = country.places.find((place) => place.id === placeId)
      if (match) {
        return { country: country.name, code: country.code }
      }
    }
  }

  return null
}

export const getVisitedCountries = (): Array<{ name: string; code: string }> => {
  const countries = new Map<string, { name: string; code: string }>()

  for (const continent of worldData) {
    for (const country of continent.countries) {
      if (country.places.some((place) => getPlaceStatus(place) !== "wishlist")) {
        countries.set(country.code, {
          name: country.name,
          code: country.code,
        })
      }
    }
  }

  return Array.from(countries.values())
}

export const getCountryPlaces = (countryCode: string): Place[] => {
  for (const continent of worldData) {
    for (const country of continent.countries) {
      if (country.code === countryCode) {
        return country.places
      }
    }
  }

  return []
}

export const calculateDistance = (
  coord1: [number, number],
  coord2: [number, number]
): number => {
  const [lng1, lat1] = coord1
  const [lng2, lat2] = coord2
  const earthRadiusKm = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadiusKm * c
}

export const groupNearbyPlaces = (
  places: Place[],
  thresholdKm: number = 50
): Array<Place | Place[]> => {
  const groups: Place[][] = []
  const processed = new Set<number>()

  places.forEach((place, index) => {
    if (processed.has(index)) return

    const group: Place[] = [place]
    processed.add(index)

    places.forEach((otherPlace, otherIndex) => {
      if (processed.has(otherIndex) || index === otherIndex) return

      const distance = calculateDistance(
        place.coordinates,
        otherPlace.coordinates
      )

      if (distance <= thresholdKm) {
        group.push(otherPlace)
        processed.add(otherIndex)
      }
    })

    groups.push(group)
  })

  return groups.map((group) => (group.length === 1 ? group[0] : group))
}

export const getGroupCenter = (places: Place[]): [number, number] => {
  const sumLng = places.reduce((sum, place) => sum + place.coordinates[0], 0)
  const sumLat = places.reduce((sum, place) => sum + place.coordinates[1], 0)
  return [sumLng / places.length, sumLat / places.length]
}

export const buildMarkerEntries = (): MarkerEntry[] => {
  const groupedPlaces = groupNearbyPlaces(getAllPlaces(worldData), 200)

  return groupedPlaces.map((placeOrGroup) => {
    if (Array.isArray(placeOrGroup)) {
      return {
        id: `group-${placeOrGroup.map((place) => place.id).join("-")}`,
        coordinates: getGroupCenter(placeOrGroup),
        places: placeOrGroup,
      }
    }

    return {
      id: placeOrGroup.id,
      coordinates: placeOrGroup.coordinates,
      places: [placeOrGroup],
    }
  })
}

export const toRgb = (hex: string): [number, number, number] => {
  const normalized = hex.replace("#", "")
  const value = parseInt(normalized, 16)

  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ]
}

export const degToRad = (value: number): number => (value * Math.PI) / 180

export const clampTheta = (theta: number): number =>
  Math.max(-THETA_LIMIT, Math.min(THETA_LIMIT, theta))

export const getClosestWrappedAngle = (
  current: number,
  target: number
): number => {
  let delta = target - current

  while (delta > Math.PI) delta -= Math.PI * 2
  while (delta < -Math.PI) delta += Math.PI * 2

  return current + delta
}

export const locationToAngles = (
  lat: number,
  lng: number
): [number, number] => [Math.PI - (degToRad(lng) - Math.PI / 2), degToRad(lat)]

export const [INITIAL_PHI, INITIAL_THETA] = locationToAngles(
  passportGlobeConfig.center[1],
  passportGlobeConfig.center[0]
)

export const markerEntries = buildMarkerEntries()

export const projectMarker = (
  coordinates: [number, number],
  phi: number,
  theta: number,
  width: number,
  height: number
): ProjectedMarker => {
  const [lng, lat] = coordinates
  const lngRad = degToRad(lng)
  const latRad = degToRad(lat)
  const adjustedPhi = phi + PROJECTION_PHI_OFFSET
  const radius =
    (Math.min(width, height) / 2) * GLOBE_SCALE * GLOBE_SURFACE_RADIUS

  const cosLat = Math.cos(latRad)
  const sinLat = Math.sin(latRad)
  const lngPlusPhi = lngRad + adjustedPhi

  const x = cosLat * Math.cos(lngPlusPhi)
  const y =
    sinLat * Math.cos(theta) + cosLat * Math.sin(lngPlusPhi) * Math.sin(theta)
  const z =
    sinLat * Math.sin(theta) - cosLat * Math.sin(lngPlusPhi) * Math.cos(theta)

  return {
    x: width / 2 + x * radius,
    y: height / 2 - y * radius,
    depth: z,
    visible: z > 0.02,
  }
}

export const updateMarkerPositions = (
  currentMarkerEntries: MarkerEntry[],
  currentMarkerRefs: Record<string, HTMLButtonElement | null>,
  phi: number,
  theta: number,
  width: number,
  height: number = GLOBE_HEIGHT
) => {
  currentMarkerEntries.forEach((entry) => {
    const marker = currentMarkerRefs[entry.id]
    if (!marker) return

    const projected = projectMarker(
      entry.coordinates,
      phi,
      theta,
      width,
      height
    )

    if (!projected.visible) {
      marker.style.opacity = "0"
      marker.style.pointerEvents = "none"
      marker.style.transform = `translate3d(${projected.x}px, ${projected.y}px, 0) translate(-50%, -50%) scale(0.85)`
      return
    }

    marker.style.opacity = `${0.36 + projected.depth * 0.64}`
    marker.style.pointerEvents = "auto"
    marker.style.transform = `translate3d(${projected.x}px, ${projected.y}px, 0) translate(-50%, -50%) scale(${
      0.82 + projected.depth * 0.28
    })`
    marker.style.zIndex = `${Math.round(projected.depth * 100)}`
  })
}
