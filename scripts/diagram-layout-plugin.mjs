// Editor de posiciones del diagrama de Work, SOLO en desarrollo.
//
// `apply: 'serve'` y `configureServer` hacen que este plugin no exista en el
// build: no hay endpoint que exponer en producción. Recibe el mapa que se
// arrastra en pantalla y lo escribe en src/data/diagram-layout.json, así las
// posiciones acaban versionadas en el repo y no en el navegador.
//
// Vive aquí y no en astro.config.mjs porque el config va con @ts-check y sin
// @types/node instalado; el resto del código node del proyecto está en esta
// misma carpeta.
import { readFile, writeFile } from "node:fs/promises"

export function diagramLayoutEditor() {
  const file = new URL("../src/data/diagram-layout.json", import.meta.url)

  return {
    name: "diagram-layout-editor",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/__diagram-layout", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405
          return res.end()
        }
        try {
          let body = ""
          for await (const chunk of req) body += chunk
          const { layout, positions, reset } = JSON.parse(body)
          if (typeof layout !== "string" || typeof positions !== "object" || positions === null) {
            throw new Error("se esperaba { layout: string, positions: object }")
          }
          const current = JSON.parse(await readFile(file, "utf8").catch(() => "{}"))
          // Mezcla por pieza: guardar una no puede borrar las de antes. Con
          // `reset` se vacía el mapa entero de ese layout.
          const merged = reset ? {} : { ...(current[layout] ?? {}), ...positions }
          const next = { ...current, [layout]: merged }
          await writeFile(file, JSON.stringify(next, null, 2) + "\n")
          res.setHeader("content-type", "application/json")
          res.end(JSON.stringify({ ok: true, saved: Object.keys(merged).length }))
        } catch (error) {
          res.statusCode = 400
          res.end(JSON.stringify({ ok: false, error: String(error) }))
        }
      })
    },
  }
}
