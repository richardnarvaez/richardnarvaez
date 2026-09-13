import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

// Case studies: one MDX per product. The frontmatter drives the header and
// the canvas diagram; the body is the case text.
const work = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/work" }),
  schema: z.object({
    name: z.string(),
    /** One line: what it is, who for. */
    tagline: z.string(),
    icon: z.string(),
    /** Product accent, used as the icon background when there is no image. */
    tint: z.string().optional(),
    role: z.string(),
    period: z.string(),
    platform: z.string().optional(),
    stack: z.array(z.string()).default([]),
    links: z
      .array(z.object({ label: z.string(), href: z.url() }))
      .default([]),
    /** Headline numbers or facts, 3 or 4 at most. */
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .max(4)
      .default([]),
    /** Start year: orders and labels the diagram. */
    year: z.number().optional(),
    /** Short note stuck to the node ("Shipped 2023", "Offline first"). */
    sticker: z.string().optional(),
    /** Retired: greyscale with an R.I.P. label in the diagram. */
    status: z.enum(["active", "discontinued"]).default("active"),
    /** Order on the canvas, lowest first. */
    order: z.number().default(99),
    /** Draft: no page, not on the canvas. */
    draft: z.boolean().default(false),
  }),
})

// Lab: prototypes, system design and interview exercises solved step by step.
// One MDX per entry, with its cover generated from the frontmatter.
const lab = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/lab" }),
  schema: z.object({
    title: z.string(),
    /** One line: what gets solved or designed. */
    summary: z.string(),
    kind: z.enum(["system", "exercise", "prototype"]),
    difficulty: z.enum(["easy", "medium", "hard"]).optional(),
    /** Where it comes from: "Classic interview", "LeetCode 146", "Own idea". */
    source: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    /** Pinned to the home highlights; the rest fill in by recency. */
    featured: z.boolean().default(false),
    /** Flat cover colour. Falls back to one per kind. */
    accent: z.string().optional(),
    /** Key idea in one sentence, shown on exercise covers. */
    keyIdea: z.string().optional(),
    complexity: z.object({ time: z.string(), space: z.string() }).optional(),
    /** Ready-made 4:3 cover; otherwise composed from the other fields. */
    cover: z.string().optional(),
    /** Screenshots at native ratio, shown in a fixed-height strip. */
    shots: z
      .array(z.object({ src: z.string(), alt: z.string(), frame: z.enum(["phone", "web", "none"]).default("none") }))
      .default([]),
    /** unsolved: study list only, linking to the statement, no page yet. */
    status: z.enum(["solved", "in-progress", "idea", "unsolved"]).default("solved"),
    /** Prototype that is the same app as a Work case: the cover reuses its icon. */
    app: z.string().optional(),
    /** Own square icon for prototypes with no Work case. */
    icon: z.string().optional(),
    /** Blueprint drawing for a prototype with no icon, instead of the blank device. */
    figure: z.enum(["brain", "globe", "input"]).optional(),
    /** Prototypes: where the live product and its code live, in another repo. */
    link: z.url().optional(),
    repo: z.url().optional(),
    stack: z.array(z.string()).default([]),
    /** Order in the study list, lowest first: how often it comes up. */
    order: z.number().optional(),
    /** Draft: visible in development only. */
    draft: z.boolean().default(false),
  }),
})

export const collections = { work, lab }
