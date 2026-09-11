import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

// Casos de estudio: un MDX por producto en src/content/work. El frontmatter
// alimenta la cabecera (icono, rol, periodo, enlaces, métricas) y el cuerpo
// es libre, con los componentes de src/components/case disponibles.
const work = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/work" }),
  schema: z.object({
    name: z.string(),
    /** Una línea: qué es, para quién. */
    tagline: z.string(),
    icon: z.string(),
    /** Color de acento del producto (fondo del icono en el lienzo si no hay imagen). */
    tint: z.string().optional(),
    role: z.string(),
    period: z.string(),
    platform: z.string().optional(),
    stack: z.array(z.string()).default([]),
    links: z
      .array(z.object({ label: z.string(), href: z.url() }))
      .default([]),
    /** Cifras o hechos destacados, 3 o 4 como máximo. */
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .max(4)
      .default([]),
    /** Orden en el lienzo (menor primero). */
    order: z.number().default(99),
    /** Borrador: no se publica como página ni aparece en el lienzo. */
    draft: z.boolean().default(false),
  }),
})

export const collections = { work }
