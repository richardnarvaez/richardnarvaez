// Lab collection helpers, shared by the section, the cards and the pages.
import { getCollection, type CollectionEntry } from "astro:content"

export type LabEntry = CollectionEntry<"lab">
export type LabKind = LabEntry["data"]["kind"]

/* Kind order in filters, index and highlights: prototypes first, being the mix. */
export const KINDS: LabKind[] = ["prototype", "system", "exercise"]

export const KIND_LABEL: Record<LabKind, string> = {
  prototype: "Prototype",
  system: "System design",
  exercise: "Exercise",
}

/* Flat cover colour per kind, when the entry brings none. */
export const KIND_ACCENT: Record<LabKind, string> = {
  system: "#1f4d7a",
  exercise: "#3b2f7a",
  prototype: "#0f6e56",
}

export const accentOf = (entry: LabEntry) => entry.data.accent ?? KIND_ACCENT[entry.data.kind]

const monthYear = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" })
export const formatDate = (date: Date) => monthYear.format(date)

export const STATUS_LABEL: Record<LabEntry["data"]["status"], string> = {
  solved: "Solved",
  "in-progress": "In progress",
  idea: "Idea",
  unsolved: "To solve",
}

/*
  Unsolved: still gets a page, with the statement linked inside, but never
  appears in the highlights.
*/
export const isUnsolved = (entry: LabEntry) => entry.data.status === "unsolved"

/* Every entry has its own page; the statement and source list are linked inside. */
export const hrefOf = (entry: LabEntry) => `/lab/${entry.id}`

/*
  Visible entries, drafts included in development. Solved or in progress before
  pending; within that, by `order` and date.
*/
export async function labEntries(): Promise<LabEntry[]> {
  const all = await getCollection("lab", ({ data }) => import.meta.env.DEV || !data.draft)
  return all.sort(
    (a, b) =>
      Number(isUnsolved(a)) - Number(isUnsolved(b)) ||
      (a.data.order ?? 1e9) - (b.data.order ?? 1e9) ||
      b.data.date.getTime() - a.data.date.getTime(),
  )
}

/*
  Featured first, then by kind (prototypes ahead) and date, up to `count`.
  Pending entries never make it.
*/
export function pickFeatured(entries: LabEntry[], count: number): LabEntry[] {
  const pool = entries.filter((e) => !isUnsolved(e))
  const rank = (e: LabEntry) => KINDS.indexOf(e.data.kind)
  const featured = pool.filter((e) => e.data.featured).sort((a, b) => rank(a) - rank(b))
  const rest = pool.filter((e) => !e.data.featured).sort((a, b) => rank(a) - rank(b) || b.data.date.getTime() - a.data.date.getTime())
  return [...featured, ...rest].slice(0, count)
}
