import type { Place, PlaceStatus, WorldData } from "./types"

const place = (
  id: string,
  name: string,
  coordinates: [number, number],
  status?: PlaceStatus
): Place => ({
  id,
  name,
  coordinates,
  status,
})

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
          place("new-york", "New York", [-74.006, 40.7128], "liked"),
          place("newark", "Newark", [-74.1724, 40.7357], "visited"),
          place("philadelphia", "Philadelphia", [-75.1652, 39.9526], "visited"),
          place("colorado", "Colorado", [-105.3111, 39.7392], "repeat"),
          place("boulder", "Boulder", [-105.271, 40.015], "visited"),
          place("seattle", "Seattle", [-122.4194, 47.6062], "visited"),
          place("portland", "Portland", [-122.676, 45.5234], "visited"),
          place("miami", "Miami", [-80.1918, 25.7617], "repeat"),
          place("chicago", "Chicago", [-87.6298, 41.8781], "visited"),
          place("los-angeles", "Los Angeles", [-118.2437, 34.0522], "liked"),
          place("pittsburgh", "Pittsburgh", [-80.0, 40.4406], "visited"),
          place("kansas-city", "Kansas City", [-94.5786, 39.0997], "visited"),
          place("las-vegas", "Las Vegas", [-115.1728, 36.1147], "repeat"),
          place("san-francisco", "San Francisco", [-122.4194, 37.7749], "liked"),
          place("atlanta", "Atlanta", [-84.388, 33.749], "visited"),
        ],
      },
      {
        id: "ec",
        name: "Ecuador",
        code: "EC",
        places: [
          place("quito", "Quito", [-78.4678, -0.1807], "liked"),
          place("cuenca", "Cuenca", [-78.9833, -2.8833], "repeat"),
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
          place("madrid", "Madrid", [-3.7038, 40.4168], "repeat"),
          place("cordoba", "Córdoba", [-4.7794, 37.8882], "visited"),
          place("sevilla", "Sevilla", [-5.9845, 37.3891], "visited"),
          place("benidorm", "Benidorm", [-0.13, 38.5411], "wishlist"),
        ],
      },
      {
        id: "fr",
        name: "France",
        code: "FR",
        places: [place("paris", "Paris", [2.3522, 48.8566], "liked")],
      },
      {
        id: "pt",
        name: "Portugal",
        code: "PT",
        places: [place("madeira", "Madeira", [-16.9055, 32.7607], "wishlist")],
      },
      {
        id: "at",
        name: "Austria",
        code: "AT",
        places: [
          place("vienna", "Vienna", [16.3738, 48.2082], "visited"),
          place("hallstatt", "Hallstatt", [13.6494, 47.5622], "wishlist"),
        ],
      },
      {
        id: "ch",
        name: "Switzerland",
        code: "CH",
        places: [place("interlaken", "Interlaken", [7.8513, 46.6863], "liked")],
      },
      {
        id: "it",
        name: "Italy",
        code: "IT",
        places: [
          place("rome", "Rome", [12.4964, 41.9028], "repeat"),
          place("milan", "Milan", [9.19, 45.4642], "visited"),
          place("dolomites", "Dolomites", [11.8476, 46.4102], "liked"),
          place("sorrento", "Sorrento", [14.3758, 40.6263], "visited"),
        ],
      },
      {
        id: "mt",
        name: "Malta",
        code: "MT",
        places: [place("malta", "Malta", [14.5136, 35.8989], "repeat")],
      },
    ],
  },
]
