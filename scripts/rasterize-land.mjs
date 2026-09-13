// Generates the land mask for src/components/sections/WorldDotMap.astro.
// Prints the rows ("#" land, "." water) ready to paste into the component's
// `land` array. Adjust COLS and the latitude crop here and in the component.
import { readFileSync } from "node:fs"

const COLS = 120
const LAT_MAX = 84
const LAT_MIN = -58
const STEP = 360 / COLS
const ROWS = Math.round((LAT_MAX - LAT_MIN) / STEP)

const geo = JSON.parse(readFileSync(process.argv[2] ?? "land.geojson", "utf8"))
const polys = [] // each: [outerRing, ...holes]
for (const f of geo.features) {
  const g = f.geometry
  if (g.type === "Polygon") polys.push(g.coordinates)
  else if (g.type === "MultiPolygon") for (const p of g.coordinates) polys.push(p)
}

function inRing(x, y, ring) {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j]
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}
function isLand(lon, lat) {
  for (const rings of polys) {
    if (!inRing(lon, lat, rings[0])) continue
    let hole = false
    for (let k = 1; k < rings.length; k++) if (inRing(lon, lat, rings[k])) { hole = true; break }
    if (!hole) return true
  }
  return false
}

const rows = []
let count = 0
for (let r = 0; r < ROWS; r++) {
  const lat = LAT_MAX - (r + 0.5) * STEP
  let line = ""
  for (let c = 0; c < COLS; c++) {
    const lon = -180 + (c + 0.5) * STEP
    const land = isLand(lon, lat)
    if (land) count++
    line += land ? "#" : "."
  }
  rows.push(line)
}
for (const r of rows) console.log(`  "${r}",`)
console.error({ COLS, ROWS, STEP, LAT_MAX, LAT_MIN, landCells: count })
