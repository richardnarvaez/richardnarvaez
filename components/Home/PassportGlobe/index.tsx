"use client"

import { useEffect, useRef, useState } from "react"
import createGlobe, { type Globe } from "cobe"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

import {
  DRAG_PHI_SENSITIVITY,
  DRAG_THETA_SENSITIVITY,
  FOCUS_THETA_OFFSET,
  GLOBE_HEIGHT,
  GLOBE_SCALE,
  ROTATION_EASING,
} from "./constants"
import { CountryFlag } from "./CountryFlag"
import {
  clampTheta,
  getClosestWrappedAngle,
  getColorGradient,
  getCountryPlaces,
  getGroupCenter,
  getPlaceColor,
  getPlaceCountry,
  getPlacesColor,
  getVisitedCountries,
  INITIAL_PHI,
  INITIAL_THETA,
  locationToAngles,
  markerEntries,
  toRgb,
  updateMarkerPositions,
} from "./helpers"
import type { MarkerEntry, Place } from "./types"

type PassportGlobeProps = {
  compact?: boolean
}

export default function PassportGlobe({ compact = false }: PassportGlobeProps) {
  const globeFrameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<Globe | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const markerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const rotationRef = useRef(INITIAL_PHI)
  const targetRotationRef = useRef(INITIAL_PHI)
  const thetaRef = useRef(INITIAL_THETA)
  const targetThetaRef = useRef(INITIAL_THETA)
  const phiVelocityRef = useRef(0)
  const thetaVelocityRef = useRef(0)
  const dragXRef = useRef<number | null>(null)
  const dragYRef = useRef<number | null>(null)
  const viewportWidthRef = useRef(0)
  const viewportHeightRef = useRef(GLOBE_HEIGHT)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(GLOBE_HEIGHT)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [selectedPlacesGroup, setSelectedPlacesGroup] = useState<
    Place[] | null
  >(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const visitedCountries = getVisitedCountries()

  useEffect(() => {
    if (!globeFrameRef.current) return

    const updateSize = () => {
      setViewportWidth(globeFrameRef.current?.clientWidth || 0)
      setViewportHeight(globeFrameRef.current?.clientHeight || GLOBE_HEIGHT)
    }

    updateSize()

    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(globeFrameRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    viewportWidthRef.current = viewportWidth
    viewportHeightRef.current = viewportHeight

    if (viewportWidth === 0) return

    updateMarkerPositions(
      markerEntries,
      markerRefs.current,
      rotationRef.current,
      thetaRef.current,
      viewportWidth,
      viewportHeight
    )
  }, [viewportHeight, viewportWidth])

  useEffect(() => {
    if (
      !canvasRef.current ||
      viewportWidth === 0 ||
      viewportHeight === 0 ||
      globeRef.current
    ) {
      return
    }

    try {
      const landColor = toRgb("#8c86b7")
      const fogColor = toRgb("#1b1f2d")

      globeRef.current = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: viewportWidth * 3,
        height: viewportHeight * 3,
        phi: rotationRef.current,
        theta: thetaRef.current,
        dark: 1,
        diffuse: 1.9,
        mapSamples: 20000,
        mapBrightness: 2,
        mapBaseBrightness: 0,
        baseColor: landColor,
        markerColor: [1, 1, 1],
        glowColor: fogColor,
        opacity: 0.6,
        scale: GLOBE_SCALE,
        offset: [0, 0],
        markers: [],
      })

      const renderFrame = () => {
        rotationRef.current +=
          (targetRotationRef.current - rotationRef.current) * ROTATION_EASING
        thetaRef.current +=
          (targetThetaRef.current - thetaRef.current) * ROTATION_EASING

        globeRef.current?.update({
          phi: rotationRef.current,
          theta: thetaRef.current,
          width: viewportWidthRef.current * 3,
          height: viewportHeightRef.current * 3,
        })

        updateMarkerPositions(
          markerEntries,
          markerRefs.current,
          rotationRef.current,
          thetaRef.current,
          viewportWidthRef.current,
          viewportHeightRef.current
        )

        animationFrameRef.current = window.requestAnimationFrame(renderFrame)
      }

      setIsLoaded(true)
      setLoadError(null)
      renderFrame()
    } catch (error) {
      setLoadError(
        "The Cobe globe could not be initialized locally. Check WebGL support and try again."
      )
    }
  }, [viewportHeight, viewportWidth])

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }

      globeRef.current?.destroy()
      globeRef.current = null
    }
  }, [])

  const handlePointerDown = (clientX: number) => {
    dragXRef.current = clientX
    phiVelocityRef.current = 0
  }

  const handlePointerDownY = (clientY: number) => {
    dragYRef.current = clientY
    thetaVelocityRef.current = 0
  }

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (dragXRef.current === null || dragYRef.current === null) return

    const deltaX = clientX - dragXRef.current
    const deltaY = clientY - dragYRef.current
    dragXRef.current = clientX
    dragYRef.current = clientY
    targetRotationRef.current += deltaX * DRAG_PHI_SENSITIVITY
    targetThetaRef.current = clampTheta(
      targetThetaRef.current + deltaY * DRAG_THETA_SENSITIVITY
    )
    phiVelocityRef.current = deltaX * 0.00015
    thetaVelocityRef.current = deltaY * 0.00012
  }

  const handlePointerEnd = () => {
    dragXRef.current = null
    dragYRef.current = null
    phiVelocityRef.current = 0
    thetaVelocityRef.current = 0
  }

  const focusOnCoordinates = (coordinates: [number, number]) => {
    const [phiTarget, thetaTarget] = locationToAngles(
      coordinates[1],
      coordinates[0]
    )

    phiVelocityRef.current = 0
    thetaVelocityRef.current = 0
    targetRotationRef.current = getClosestWrappedAngle(
      rotationRef.current,
      phiTarget
    )
    targetThetaRef.current = clampTheta(thetaTarget - FOCUS_THETA_OFFSET)
  }

  const handleMarkerClick = (entry: MarkerEntry) => {
    if (entry.places.length > 1) {
      setSelectedPlacesGroup(entry.places)
      setSelectedPlace(entry.places[0])
      setIsExpanded(true)
      return
    }

    setSelectedPlacesGroup(null)
    setSelectedPlace(entry.places[0])
    setIsExpanded(true)
  }

  const handleCountryFocus = (
    countryCode: string,
    shouldExpand: boolean = false
  ) => {
    const places = getCountryPlaces(countryCode)
    if (places.length === 0) return

    focusOnCoordinates(getGroupCenter(places))

    if (shouldExpand) {
      setSelectedPlace(places[0])
      setSelectedPlacesGroup(null)
      setIsExpanded(true)
    }
  }

  if (loadError) {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-gray-900/50 md:h-[800px]">
        <p className="max-w-md px-6 text-center text-sm text-gray-400">
          {loadError}
        </p>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {!compact ? (
        <div className="mx-auto mb-16 flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            My Passport
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {
              "A visual journey through the places I've explored across the globe. "
            }
          </p>
        </div>
      ) : null}

      <div className="relative w-full">
        <div
          ref={globeFrameRef}
          className={cn(
            "relative w-full cursor-grab touch-none active:cursor-grabbing",
            compact ? "h-[340px] sm:h-[400px] md:h-[460px]" : "h-[600px]"
          )}
          onPointerDown={(event) => {
            handlePointerDown(event.clientX)
            handlePointerDownY(event.clientY)
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) =>
            handlePointerMove(event.clientX, event.clientY)
          }
          onPointerUp={(event) => {
            handlePointerEnd()
            event.currentTarget.releasePointerCapture(event.pointerId)
          }}
          onPointerCancel={(event) => {
            handlePointerEnd()
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId)
            }
          }}
          onPointerLeave={handlePointerEnd}
        >
          <canvas
            ref={canvasRef}
            className={`size-full transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {!isLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-gray-400">Loading globe...</p>
            </div>
          ) : null}
          <div className="pointer-events-none absolute inset-0">
            {markerEntries.map((entry) => {
              const isGroup = entry.places.length > 1
              const place = entry.places[0]
              const gradient = getColorGradient(
                isGroup ? getPlacesColor(entry.places) : getPlaceColor(place)
              )

              return (
                <button
                  key={entry.id}
                  ref={(element) => {
                    markerRefs.current[entry.id] = element
                  }}
                  type="button"
                  title={
                    isGroup
                      ? `${entry.places.length} nearby places`
                      : entry.places[0].name
                  }
                  aria-label={
                    isGroup
                      ? `${entry.places.length} nearby places`
                      : entry.places[0].name
                  }
                  className="pointer-events-auto absolute left-0 top-0 transition-opacity duration-150"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation()
                    handleMarkerClick(entry)
                  }}
                >
                  {isGroup ? (
                    <span className="relative block size-6">
                      <span className="absolute inset-0 rounded-full border-2 border-white/50 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
                      <span
                        className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)]"
                        style={{
                          background: `linear-gradient(135deg, ${gradient.start}, ${gradient.end})`,
                        }}
                      />
                      <span
                        className="absolute -right-1 -top-1 flex size-[18px] items-center justify-center rounded-full border-2 border-white/80 text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                        style={{ background: gradient.end }}
                      >
                        {entry.places.length}
                      </span>
                    </span>
                  ) : (
                    <span
                      className="block size-4 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.3),0_0_30px_rgba(255,255,255,0.2)]"
                      style={{
                        background: `linear-gradient(135deg, ${gradient.start}, ${gradient.end})`,
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {compact ? (
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-[200] -translate-x-1/2">
            <div className="pointer-events-auto flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-2 shadow-[0_18px_40px_rgba(15,23,42,0.18)] backdrop-blur-md">
              {visitedCountries.map((country, index) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountryFocus(country.code)}
                  className={`relative flex size-8 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white transition hover:-translate-y-0.5 hover:bg-slate-100 ${
                    index > 0 ? "-ml-2.5" : ""
                  }`}
                  title={country.name}
                  style={{ zIndex: index + 1 }}
                >
                  <CountryFlag code={country.code} />
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {!compact ? (
          <div className="absolute bottom-4 left-1/2 z-[200] w-[calc(100%_-_2rem)] max-w-[560px] -translate-x-1/2">
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
                        type="button"
                        onClick={() => handleCountryFocus(country.code, true)}
                        className={`relative flex size-8 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white transition hover:-translate-y-0.5 hover:bg-slate-100 ${
                          index > 0 ? "-ml-2" : ""
                        }`}
                        title={country.name}
                        style={{ zIndex: index + 1 }}
                      >
                        <CountryFlag code={country.code} />
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
                        type="button"
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
                                      getColorGradient(getPlaceColor(place))
                                        .start
                                    }, ${
                                      getColorGradient(getPlaceColor(place)).end
                                    })`,
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
                        <div className="mb-6 flex items-center gap-4">
                          <div
                            className="size-16 rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${
                                getColorGradient(getPlaceColor(selectedPlace))
                                  .start
                              }, ${
                                getColorGradient(getPlaceColor(selectedPlace))
                                  .end
                              })`,
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
                          <div className="size-2 rounded-full bg-sky-500" />
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
