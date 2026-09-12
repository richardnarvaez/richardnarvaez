// Utilidades de la colección Lab compartidas por sección, tarjetas y páginas.
import { getCollection, type CollectionEntry } from "astro:content"

export type LabEntry = CollectionEntry<"lab">
export type LabKind = LabEntry["data"]["kind"]

/** Orden de los tipos en filtros, índice y destacados: los prototipos primero, que son la mezcla de los otros dos. */
export const KINDS: LabKind[] = ["prototype", "system", "exercise"]

export const KIND_LABEL: Record<LabKind, string> = {
  prototype: "Prototype",
  system: "System design",
  exercise: "Exercise",
}

/** Color plano de portada por tipo, si la entrada no trae el suyo. */
export const KIND_ACCENT: Record<LabKind, string> = {
  system: "#1f4d7a",
  exercise: "#3b2f7a",
  prototype: "#0f6e56",
}

export const accentOf = (entry: LabEntry) => entry.data.accent ?? KIND_ACCENT[entry.data.kind]

const monthYear = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" })
export const formatDate = (date: Date) => monthYear.format(date)

/** Entradas visibles: en desarrollo también los borradores, para poder verlos. */
export async function labEntries(): Promise<LabEntry[]> {
  const all = await getCollection("lab", ({ data }) => import.meta.env.DEV || !data.draft)
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

/** Destacados primero; el resto por tipo (prototipos antes) y fecha, hasta `count`. */
export function pickFeatured(entries: LabEntry[], count: number): LabEntry[] {
  const rank = (e: LabEntry) => KINDS.indexOf(e.data.kind)
  const featured = entries.filter((e) => e.data.featured).sort((a, b) => rank(a) - rank(b))
  const rest = entries.filter((e) => !e.data.featured).sort((a, b) => rank(a) - rank(b) || b.data.date.getTime() - a.data.date.getTime())
  return [...featured, ...rest].slice(0, count)
}
