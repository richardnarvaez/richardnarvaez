export type PlaceStatus = "visited" | "wishlist" | "liked" | "repeat"

export interface Place {
  id: string
  name: string
  coordinates: [number, number]
  status?: PlaceStatus
  country: string
  code: string
}

export interface MarkerEntry {
  id: string
  coordinates: [number, number]
  places: Place[]
}

export const placeStatusColors: Record<PlaceStatus, { start: string; end: string }> = {
  visited: { start: "#34d399", end: "#22c55e" },
  wishlist: { start: "#fbbf24", end: "#f97316" },
  liked: { start: "#f43f5e", end: "#ef4444" },
  repeat: { start: "#0ea5e9", end: "#3b82f6" },
}

const place = (
  id: string,
  name: string,
  coordinates: [number, number],
  country: string,
  code: string,
  status?: PlaceStatus
): Place => ({
  id,
  name,
  coordinates,
  country,
  code,
  status,
})

export const places: Place[] = [
  place("quito", "Quito", [-78.4678, -0.1807], "Ecuador", "EC", "liked"),
  place("cuenca", "Cuenca", [-78.9833, -2.8833], "Ecuador", "EC", "repeat"),
  place("madrid", "Madrid", [-3.7038, 40.4168], "Spain", "ES", "repeat"),
  place("cordoba", "Cordoba", [-4.7794, 37.8882], "Spain", "ES", "visited"),
  place("paris", "Paris", [2.3522, 48.8566], "France", "FR", "liked"),
  place("rome", "Rome", [12.4964, 41.9028], "Italy", "IT", "repeat"),
  place("milan", "Milan", [9.19, 45.4642], "Italy", "IT", "visited"),
  place("malta", "Malta", [14.5136, 35.8989], "Malta", "MT", "repeat"),
  place("interlaken", "Interlaken", [7.8513, 46.6863], "Switzerland", "CH", "liked"),
  place("vienna", "Vienna", [16.3738, 48.2082], "Austria", "AT", "visited"),
  place("new-york", "New York", [-74.006, 40.7128], "United States", "US", "liked"),
  place("miami", "Miami", [-80.1918, 25.7617], "United States", "US", "repeat"),
  place("san-francisco", "San Francisco", [-122.4194, 37.7749], "United States", "US", "liked"),
]

export const globeCenter: [number, number] = [-30, 25]
export const neutralColor = { start: "#ffffff", end: "#f1f5f9" }

export function getPlaceGradient(place: Place) {
  return place.status ? placeStatusColors[place.status] : neutralColor
}

export function getVisitedCountries() {
  const countries = new Map<string, { name: string; code: string; coordinates: [number, number] }>()

  for (const currentPlace of places) {
    if (!countries.has(currentPlace.code)) {
      countries.set(currentPlace.code, {
        name: currentPlace.country,
        code: currentPlace.code,
        coordinates: currentPlace.coordinates,
      })
    }
  }

  return Array.from(countries.values())
}

function calculateDistance(coord1: [number, number], coord2: [number, number]) {
  const [lng1, lat1] = coord1
  const [lng2, lat2] = coord2
  const radiusKm = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return radiusKm * c
}

function getGroupCenter(group: Place[]): [number, number] {
  const sumLng = group.reduce((sum, currentPlace) => sum + currentPlace.coordinates[0], 0)
  const sumLat = group.reduce((sum, currentPlace) => sum + currentPlace.coordinates[1], 0)

  return [sumLng / group.length, sumLat / group.length]
}

export function buildMarkerEntries() {
  const groups: Place[][] = []
  const processed = new Set<number>()

  places.forEach((currentPlace, index) => {
    if (processed.has(index)) return

    const group = [currentPlace]
    processed.add(index)

    places.forEach((otherPlace, otherIndex) => {
      if (processed.has(otherIndex) || otherIndex === index) return

      if (calculateDistance(currentPlace.coordinates, otherPlace.coordinates) <= 200) {
        group.push(otherPlace)
        processed.add(otherIndex)
      }
    })

    groups.push(group)
  })

  return groups.map((group): MarkerEntry => ({
    id: group.length === 1 ? group[0].id : `group-${group.map((entry) => entry.id).join("-")}`,
    coordinates: group.length === 1 ? group[0].coordinates : getGroupCenter(group),
    places: group,
  }))
}
