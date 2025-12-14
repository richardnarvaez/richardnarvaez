"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import mapboxgl from "mapbox-gl"

import "mapbox-gl/dist/mapbox-gl.css"

import {
  getAllPlaces,
  getCountryPlaces,
  getPlaceById,
  getPlaceColor,
  getPlaceCountry,
  getVisitedCountries,
  mapConfig,
  worldData,
} from "./map-config"
import type { Place } from "./types"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

const createMarkerElement = (place: Place): HTMLDivElement => {
  const el = document.createElement("div")
  el.className = "marker-container"
  const color = getPlaceColor(place)

  el.innerHTML = `
    <div class="marker-glow" style="
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      box-shadow:
        0 0 10px rgba(255, 255, 255, 0.5),
        0 0 20px rgba(255, 255, 255, 0.3),
        0 0 30px rgba(255, 255, 255, 0.2);
      cursor: pointer;
    "></div>
  `

  const style = el.querySelector(".marker-glow") as HTMLElement
  if (style) {
    const colorMap: Record<string, { start: string; end: string }> = {
      "from-orange-500 to-red-500": {
        start: "#f97316",
        end: "#ef4444",
      },
      "from-blue-500 to-purple-500": {
        start: "#3b82f6",
        end: "#a855f7",
      },
      "from-yellow-500 to-green-500": {
        start: "#eab308",
        end: "#22c55e",
      },
      "from-pink-500 to-rose-500": {
        start: "#ec4899",
        end: "#f43f5e",
      },
      "from-cyan-500 to-blue-500": {
        start: "#06b6d4",
        end: "#3b82f6",
      },
      "from-amber-500 to-orange-500": {
        start: "#f59e0b",
        end: "#f97316",
      },
    }

    const colors = colorMap[color] || colorMap["from-orange-500 to-red-500"]
    style.style.setProperty("--gradient-start", colors.start)
    style.style.setProperty("--gradient-end", colors.end)
    style.style.background = `linear-gradient(135deg, ${colors.start}, ${colors.end})`
  }

  return el
}

const getColorGradient = (color: string): { start: string; end: string } => {
  const colorMap: Record<string, { start: string; end: string }> = {
    "from-orange-500 to-red-500": {
      start: "#f97316",
      end: "#ef4444",
    },
    "from-blue-500 to-purple-500": {
      start: "#3b82f6",
      end: "#a855f7",
    },
    "from-yellow-500 to-green-500": {
      start: "#eab308",
      end: "#22c55e",
    },
    "from-pink-500 to-rose-500": {
      start: "#ec4899",
      end: "#f43f5e",
    },
    "from-cyan-500 to-blue-500": {
      start: "#06b6d4",
      end: "#3b82f6",
    },
    "from-amber-500 to-orange-500": {
      start: "#f59e0b",
      end: "#f97316",
    },
  }

  return colorMap[color] || colorMap["from-orange-500 to-red-500"]
}

const calculateDistance = (
  coord1: [number, number],
  coord2: [number, number]
): number => {
  const [lng1, lat1] = coord1
  const [lng2, lat2] = coord2
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const groupNearbyPlaces = (
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

const getGroupCenter = (places: Place[]): [number, number] => {
  const sumLng = places.reduce((sum, p) => sum + p.coordinates[0], 0)
  const sumLat = places.reduce((sum, p) => sum + p.coordinates[1], 0)
  return [sumLng / places.length, sumLat / places.length]
}

const createGroupMarkerElement = (places: Place[]): HTMLDivElement => {
  const el = document.createElement("div")
  el.className = "marker-container"

  el.innerHTML = `
    <div class="marker-group" style="
      position: relative;
      width: 24px;
      height: 24px;
      cursor: pointer;
    ">
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
      "></div>
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #a855f7);
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
      "></div>
      <div style="
        position: absolute;
        top: -4px;
        right: -4px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.9);
        border: 2px solid rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      ">${places.length}</div>
    </div>
  `

  return el
}

export default function WorldActivityMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [selectedPlacesGroup, setSelectedPlacesGroup] = useState<
    Place[] | null
  >(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const visitedCountries = getVisitedCountries()

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    if (!mapboxgl.accessToken) {
      console.warn(
        "Mapbox token not found. Please set NEXT_PUBLIC_MAPBOX_TOKEN"
      )
      return
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapConfig.style,
      center: mapConfig.center,
      zoom: mapConfig.zoom,
      pitch: mapConfig.pitch,
      bearing: mapConfig.bearing,
      projection: mapConfig.projection,
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      dragRotate: true,
      touchZoomRotate: false,
      touchPitch: false,
      attributionControl: false,
    })

    map.current.on("style.load", () => {
      if (!map.current) return

      map.current.setFog({
        color: "rgb(18, 17, 33)",
        "high-color": "rgb(18, 17, 33)",
        "horizon-blend": 0.02,
        "space-color": "rgb(18, 17, 33)",
        "star-intensity": 0,
      })

      const landColor = "rgb(30, 28, 49)"
      const waterColor = "rgb(18, 17, 30)"

      try {
        map.current.setPaintProperty("land", "background-color", landColor)
      } catch (error) {
        // Layer might not exist
      }

      try {
        map.current.setPaintProperty("water", "fill-color", waterColor)
      } catch (error) {
        // Layer might not exist
      }
    })

    map.current.on("load", () => {
      if (!map.current) return

      const places = getAllPlaces(worldData)
      const groupedPlaces = groupNearbyPlaces(places, 200)

      groupedPlaces.forEach((placeOrGroup) => {
        if (Array.isArray(placeOrGroup)) {
          const center = getGroupCenter(placeOrGroup)
          const markerElement = createGroupMarkerElement(placeOrGroup)
          markerElement.addEventListener("click", () => {
            setSelectedPlacesGroup(placeOrGroup)
            setSelectedPlace(placeOrGroup[0])
            setIsExpanded(true)
          })

          const marker = new mapboxgl.Marker({
            element: markerElement,
            anchor: "center",
          })
            .setLngLat(center)
            .addTo(map.current!)

          markersRef.current.push(marker)
        } else {
          const markerElement = createMarkerElement(placeOrGroup)
          markerElement.addEventListener("click", () => {
            setSelectedPlace(placeOrGroup)
            setSelectedPlacesGroup(null)
            setIsExpanded(true)
          })

          const marker = new mapboxgl.Marker({
            element: markerElement,
            anchor: "center",
          })
            .setLngLat(placeOrGroup.coordinates)
            .addTo(map.current!)

          markersRef.current.push(marker)
        }
      })
    })

    return () => {
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  if (!mapboxgl.accessToken) {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-gray-900/50 md:h-[800px]">
        <p className="text-sm text-gray-400">
          Mapbox token not configured. Please set NEXT_PUBLIC_MAPBOX_TOKEN in
          .env.local
        </p>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <div className="mx-auto mb-16 flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          My Passport
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {
            "A visual journey through the places I've explored across the globe. "
          }
          <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            BETA
          </span>
        </p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div ref={mapContainer} className="h-[600px] w-full" />
        <div className="absolute bottom-4 left-1/2 z-50 w-[560px] -translate-x-1/2">
          <motion.div
            layout
            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gray-900/95 shadow-2xl backdrop-blur-sm ${
              isExpanded ? "w-full p-6" : "w-auto px-4 py-3"
            }`}
            transition={{
              layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <motion.div
                  key="toolbar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-0"
                >
                  {visitedCountries.map((country, index) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        const places = getCountryPlaces(country.code)
                        if (places.length > 0) {
                          setSelectedPlace(places[0])
                          setIsExpanded(true)
                        }
                      }}
                      className={`flex size-10 items-center justify-center rounded-full border-2 border-gray-900 bg-white text-xs font-semibold text-black transition hover:bg-slate-200 ${
                        index > 0 ? "-ml-2" : ""
                      }`}
                      title={country.name}
                    >
                      {country.code}
                    </button>
                  ))}
                </motion.div>
              ) : (
                selectedPlace && (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => {
                        setIsExpanded(false)
                        setSelectedPlace(null)
                        setSelectedPlacesGroup(null)
                      }}
                      className="mb-4 text-gray-400 transition-colors hover:text-white"
                      aria-label="Close details"
                    >
                      <svg
                        className="size-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    {selectedPlacesGroup && selectedPlacesGroup.length > 1 ? (
                      <div className="mb-6">
                        <h3 className="mb-4 text-lg font-semibold text-white">
                          {selectedPlacesGroup.length} lugares cercanos
                        </h3>
                        <div className="max-h-[400px] space-y-3 overflow-y-auto">
                          {selectedPlacesGroup.map((place) => (
                            <div
                              key={place.id}
                              className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10"
                            >
                              <div
                                className="size-12 shrink-0 rounded-full"
                                style={{
                                  background: `linear-gradient(135deg, ${
                                    getColorGradient(getPlaceColor(place)).start
                                  }, ${getColorGradient(getPlaceColor(place)).end})`,
                                }}
                              />
                              <div className="flex flex-col">
                                <h4 className="font-semibold text-white">
                                  {place.name}
                                </h4>
                                <p className="text-xs text-gray-400">
                                  {getPlaceCountry(place.id)?.country},{" "}
                                  {getPlaceCountry(place.id)?.code}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      selectedPlace && (
                        <div className="mb-6 flex items-center gap-4">
                          <div
                            className="size-16 rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${
                                getColorGradient(getPlaceColor(selectedPlace))
                                  .start
                              }, ${getColorGradient(getPlaceColor(selectedPlace)).end})`,
                            }}
                          />
                          <div className="flex flex-col">
                            <h3 className="text-xl font-semibold text-white">
                              {selectedPlace.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                              {getPlaceCountry(selectedPlace.id)?.country},{" "}
                              {getPlaceCountry(selectedPlace.id)?.code}
                            </p>
                          </div>
                        </div>
                      )
                    )}

                    <div className="mb-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
                      <div>
                        <p className="text-xs text-gray-500">First seen</p>
                        <p className="mt-1 text-sm text-white">Lorem ipsum</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Visits</p>
                        <p className="mt-1 text-sm text-white">Lorem</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Events</p>
                        <p className="mt-1 text-sm text-white">Lorem</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                        <div className="flex items-center gap-2">
                          <svg
                            className="size-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          <span className="text-sm text-gray-300">
                            Lorem ipsum
                          </span>
                        </div>
                        <div className="size-2 rounded-full bg-purple-500" />
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
