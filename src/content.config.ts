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
    /** Año de arranque; ordena y etiqueta el diagrama. */
    year: z.number().optional(),
    /** Nota corta pegada al nodo en el diagrama ("Shipped 2023", "Offline first"). */
    sticker: z.string().optional(),
    /** Retirado hace años: en el diagrama va en blanco y negro con etiqueta R.I.P. */
    status: z.enum(["active", "discontinued"]).default("active"),
    /** Orden en el lienzo (menor primero). */
    order: z.number().default(99),
    /** Borrador: no se publica como página ni aparece en el lienzo. */
    draft: z.boolean().default(false),
  }),
})

// Lab: system design, ejercicios de entrevista resueltos paso a paso y
// prototipos. Un MDX por entrada en src/content/lab. La portada 4:3 de la
// tarjeta se compone desde estos datos si no hay imagen `cover`.
const lab = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/lab" }),
  schema: z.object({
    title: z.string(),
    /** Una línea: qué se resuelve o qué se diseña. */
    summary: z.string(),
    kind: z.enum(["system", "exercise", "prototype"]),
    difficulty: z.enum(["easy", "medium", "hard"]).optional(),
    /** De dónde sale: "Classic interview", "LeetCode 146", "Own idea". */
    source: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    /** Fijo entre los destacados del home; el resto se rellena con lo más reciente. */
    featured: z.boolean().default(false),
    /** Color plano de la portada. Si falta, uno por tipo. */
    accent: z.string().optional(),
    /** Idea clave en una frase: va en la portada de los ejercicios. */
    keyIdea: z.string().optional(),
    complexity: z.object({ time: z.string(), space: z.string() }).optional(),
    /** Portada 4:3 ya hecha; si falta, se compone desde el resto de campos. */
    cover: z.string().optional(),
    /** Capturas en su proporción nativa; van en una tira de alto fijo. */
    shots: z
      .array(z.object({ src: z.string(), alt: z.string(), frame: z.enum(["phone", "web", "none"]).default("none") }))
      .default([]),
    status: z.enum(["solved", "in-progress", "idea"]).default("solved"),
    /** Borrador: solo se ve en desarrollo. */
    draft: z.boolean().default(false),
  }),
})

export const collections = { work, lab }
