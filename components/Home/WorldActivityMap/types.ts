export type PlaceStatus = "visited" | "wishlist" | "liked" | "repeat"

export interface Place {
  id: string
  name: string
  coordinates: [number, number]
  status?: PlaceStatus
}

export interface Country {
  id: string
  name: string
  code: string
  places: Place[]
}

export interface Continent {
  id: string
  name: string
  countries: Country[]
}

export type WorldData = Continent[]
