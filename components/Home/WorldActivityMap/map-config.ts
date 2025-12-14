import type { Place, WorldData } from "./types"

export const mapConfig = {
  style: "mapbox://styles/mapbox/dark-v11",
  center: [-30, 25] as [number, number],
  zoom: 1.7,
  pitch: 0,
  bearing: 0,
  projection: "globe" as const,
}

const colorPalette = [
  "from-orange-500 to-red-500",
  "from-blue-500 to-purple-500",
  "from-yellow-500 to-green-500",
  "from-pink-500 to-rose-500",
  "from-cyan-500 to-blue-500",
  "from-amber-500 to-orange-500",
]

export const worldData: WorldData = [
  {
    id: "north-america",
    name: "North America",
    countries: [
      {
        id: "us",
        name: "United States",
        code: "US",
        places: [
          {
            id: "new-york",
            name: "New York",
            coordinates: [-74.006, 40.7128],
            color: colorPalette[0],
          },
          {
            id: "newark",
            name: "Newark",
            coordinates: [-74.1724, 40.7357],
            color: colorPalette[1],
          },
          {
            id: "philadelphia",
            name: "Philadelphia",
            coordinates: [-75.1652, 39.9526],
            color: colorPalette[2],
          },
          {
            id: "colorado",
            name: "Colorado",
            coordinates: [-105.3111, 39.7392],
            color: colorPalette[3],
          },
          {
            id: "boulder",
            name: "Boulder",
            coordinates: [-105.271, 40.015],
            color: colorPalette[4],
          },
          {
            id: "seattle",
            name: "Seattle",
            coordinates: [-122.4194, 47.6062],
            color: colorPalette[5],
          },
          {
            id: "portland",
            name: "Portland",
            coordinates: [-122.676, 45.5234],
            color: colorPalette[0],
          },
          {
            id: "miami",
            name: "Miami",
            coordinates: [-80.1918, 25.7617],
            color: colorPalette[1],
          },
          {
            id: "chicago",
            name: "Chicago",
            coordinates: [-87.6298, 41.8781],
            color: colorPalette[2],
          },
          {
            id: "los-angeles",
            name: "Los Angeles",
            coordinates: [-118.2437, 34.0522],
            color: colorPalette[3],
          },
          {
            id: "pittsburgh",
            name: "Pittsburgh",
            coordinates: [-80.0, 40.4406],
            color: colorPalette[4],
          },
          {
            id: "kansas-city",
            name: "Kansas City",
            coordinates: [-94.5786, 39.0997],
            color: colorPalette[5],
          },
          {
            id: "las-vegas",
            name: "Las Vegas",
            coordinates: [-115.1728, 36.1147],
            color: colorPalette[0],
          },
          {
            id: "san-francisco",
            name: "San Francisco",
            coordinates: [-122.4194, 37.7749],
            color: colorPalette[1],
          },
          {
            id: "atlanta",
            name: "Atlanta",
            coordinates: [-84.388, 33.749],
            color: colorPalette[2],
          },
        ],
      },
      {
        id: "ec",
        name: "Ecuador",
        code: "EC",
        places: [
          {
            id: "quito",
            name: "Quito",
            coordinates: [-78.4678, -0.1807],
            color: colorPalette[2],
          },
          {
            id: "cuenca",
            name: "Cuenca",
            coordinates: [-78.9833, -2.8833],
            color: colorPalette[3],
          },
        ],
      },
    ],
  },
  {
    id: "europe",
    name: "Europe",
    countries: [
      {
        id: "es",
        name: "Spain",
        code: "ES",
        places: [
          {
            id: "madrid",
            name: "Madrid",
            coordinates: [-3.7038, 40.4168],
            color: colorPalette[3],
          },
          {
            id: "cordoba",
            name: "Córdoba",
            coordinates: [-4.7794, 37.8882],
            color: colorPalette[4],
          },
          {
            id: "sevilla",
            name: "Sevilla",
            coordinates: [-5.9845, 37.3891],
            color: colorPalette[5],
          },
          {
            id: "benidorm",
            name: "Benidorm",
            coordinates: [-0.13, 38.5411],
            color: colorPalette[0],
          },
        ],
      },
      {
        id: "fr",
        name: "France",
        code: "FR",
        places: [
          {
            id: "paris",
            name: "Paris",
            coordinates: [2.3522, 48.8566],
            color: colorPalette[4],
          },
        ],
      },
      {
        id: "pt",
        name: "Portugal",
        code: "PT",
        places: [
          {
            id: "madeira",
            name: "Madeira",
            coordinates: [-16.9055, 32.7607],
            color: colorPalette[4],
          },
        ],
      },
      {
        id: "at",
        name: "Austria",
        code: "AT",
        places: [
          {
            id: "vienna",
            name: "Vienna",
            coordinates: [16.3738, 48.2082],
            color: colorPalette[5],
          },
          {
            id: "hallstatt",
            name: "Hallstatt",
            coordinates: [13.6494, 47.5622],
            color: colorPalette[0],
          },
        ],
      },
      {
        id: "ch",
        name: "Switzerland",
        code: "CH",
        places: [
          {
            id: "interlaken",
            name: "Interlaken",
            coordinates: [7.8513, 46.6863],
            color: colorPalette[1],
          },
        ],
      },
      {
        id: "it",
        name: "Italy",
        code: "IT",
        places: [
          {
            id: "rome",
            name: "Rome",
            coordinates: [12.4964, 41.9028],
            color: colorPalette[2],
          },
          {
            id: "milan",
            name: "Milan",
            coordinates: [9.19, 45.4642],
            color: colorPalette[3],
          },
          {
            id: "dolomites",
            name: "Dolomites",
            coordinates: [11.8476, 46.4102],
            color: colorPalette[4],
          },
          {
            id: "sorrento",
            name: "Sorrento",
            coordinates: [14.3758, 40.6263],
            color: colorPalette[5],
          },
        ],
      },
      {
        id: "mt",
        name: "Malta",
        code: "MT",
        places: [
          {
            id: "malta",
            name: "Malta",
            coordinates: [14.5136, 35.8989],
            color: colorPalette[0],
          },
        ],
      },
    ],
  },
]

// dividir colores por grupos,
// aeropuertos seria lugares que he volado pero no he vistado
// visitados avios o cualqueir medio y
// que me gustaria vistar o estan en la lista.
// tambien podriamos marcar lugares qeu queiro volver.
//si son multiples otro color

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

export const getPlaceColor = (place: Place): string => {
  return place.color || colorPalette[0]
}

export const getPlaceCountry = (
  placeId: string
): { country: string; code: string } | null => {
  for (const continent of worldData) {
    for (const country of continent.countries) {
      const place = country.places.find((p) => p.id === placeId)
      if (place) {
        return { country: country.name, code: country.code }
      }
    }
  }
  return null
}

export const getPlaceById = (placeId: string): Place | null => {
  for (const continent of worldData) {
    for (const country of continent.countries) {
      const place = country.places.find((p) => p.id === placeId)
      if (place) {
        return place
      }
    }
  }
  return null
}

export const getVisitedCountries = (): Array<{
  name: string
  code: string
}> => {
  const countries = new Map<string, { name: string; code: string }>()
  for (const continent of worldData) {
    for (const country of continent.countries) {
      if (country.places.length > 0) {
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
