// Genera todas las imágenes derivadas de `public/images` a partir de las
// fuentes en `design/` (fuera de public y fuera de git: pesan ~20 MB).
//
//   node scripts/build-images.mjs            # todas las tareas
//   node scripts/build-images.mjs hero og    # solo algunas
//
// sharp viene con Astro; se resuelve desde su paquete para no añadir una
// dependencia propia.
import { createRequire } from "node:module"
import { mkdirSync, statSync } from "node:fs"
import { dirname } from "node:path"

const require = createRequire(import.meta.url)
const sharp = createRequire(require.resolve("astro/package.json"))("sharp")

const out = (path) => {
  mkdirSync(dirname(path), { recursive: true })
  return path
}
const report = (path) => console.log(`  ${path}  ${(statSync(path).size / 1024).toFixed(0)} KB`)

const tasks = {
  // Bocetos del hero: máscara de luminancia (trazo) + halo pre-desenfocado.
  // Blanco sobre negro sin alfa: WebP con pérdida comprime 5× mejor que PNG.
  async sketch() {
    const base = sharp("design/hero/sketch.png").flatten({ background: "#000" }).removeAlpha().grayscale()
    await base.clone().webp({ quality: 70, effort: 6, smartSubsample: true })
      .toFile(out("public/images/home/bg-header-lineas-lum.webp"))
    await base.clone().blur(28).linear(3.2, 0).webp({ quality: 70, effort: 6 })
      .toFile(out("public/images/home/bg-header-lineas-glow.webp"))
    report("public/images/home/bg-header-lineas-lum.webp")
    report("public/images/home/bg-header-lineas-glow.webp")
  },

  // Gota líquida del foco: círculo con degradado radial arrugado por ruido,
  // rasterizado una vez (un SVG con filtros como mask-image se re-rasteriza
  // en cada frame y calienta la GPU).
  async torch() {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='512' height='512'>
      <defs><radialGradient id='g'>
        <stop offset='0' stop-color='#fff' stop-opacity='0.52'/><stop offset='0.45' stop-color='#fff' stop-opacity='0.38'/>
        <stop offset='0.78' stop-color='#fff' stop-opacity='0.14'/><stop offset='1' stop-color='#fff' stop-opacity='0'/>
      </radialGradient></defs>
      <filter id='f' x='-25%' y='-25%' width='150%' height='150%' color-interpolation-filters='sRGB'>
        <feTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='2' seed='7' result='n'/>
        <feDisplacementMap in='SourceGraphic' in2='n' scale='70' xChannelSelector='R' yChannelSelector='G'/>
        <feGaussianBlur stdDeviation='12'/>
      </filter>
      <g filter='url(#f)'><circle cx='200' cy='200' r='150' fill='url(#g)'/></g></svg>`
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out("public/images/home/torch-blob.png"))
    report("public/images/home/torch-blob.png")
  },

  // Iconos de app a 256px (retina para tiles de hasta 96px).
  async apps() {
    await sharp("design/apps/huma.jpg").resize(256, 256, { fit: "cover" }).webp({ quality: 82 })
      .toFile(out("public/images/apps/huma.webp"))
    await sharp("design/apps/memory.png").resize(256, 256, { fit: "contain", background: "#dffcff" }).webp({ quality: 82 })
      .toFile(out("public/images/apps/memory.webp"))
    report("public/images/apps/huma.webp")
    report("public/images/apps/memory.webp")
  },

  // Miniaturas del lienzo de ilustraciones (tiles de hasta 200px, 2×).
  async illustrations() {
    for (let i = 1; i <= 5; i++) {
      const dst = out(`public/images/illustration/thumbs/pic_${i}.webp`)
      await sharp(`design/illustrations/pic_${i}.jpg`).resize({ width: 400 }).webp({ quality: 78 }).toFile(dst)
      report(dst)
    }
  },

  // Retrato del lienzo de fotografía.
  async photos() {
    await sharp("design/photos/landing-path.jpg").resize({ width: 480 }).webp({ quality: 78 })
      .toFile(out("public/images/photos/landing-path.webp"))
    report("public/images/photos/landing-path.webp")
  },

  // Foto del hero: a sangre, 2000px bastan (la original son 2731).
  async hero() {
    await sharp("design/hero/background.jpg").resize({ width: 2000 }).webp({ quality: 72, effort: 6 })
      .toFile(out("public/images/home/bg-header.webp"))
    report("public/images/home/bg-header.webp")
  },

  // Tren: paisaje y vagón (este con alfa en las ventanas).
  async scenery() {
    await sharp("design/scenery/landscape.jpg").resize({ width: 2000 }).webp({ quality: 72, effort: 6 })
      .toFile(out("public/images/home/fondo.webp"))
    await sharp("design/scenery/wagon.png").webp({ quality: 80, alphaQuality: 90, effort: 6 })
      .toFile(out("public/images/home/vagones.webp"))
    report("public/images/home/fondo.webp")
    report("public/images/home/vagones.webp")
  },

  // Fondo de la tarjeta Resume del bento (se ve a ~340px; 800 para retina).
  async bento() {
    await sharp("design/bento/resume.jpg").resize({ width: 800 }).webp({ quality: 75 })
      .toFile(out("public/images/bento/resume.webp"))
    report("public/images/bento/resume.webp")
  },

  // Imagen Open Graph: JPEG, que WebP no lo leen todas las redes.
  async og() {
    await sharp("design/og/cover.jpg").resize({ width: 1200 }).jpeg({ quality: 78, mozjpeg: true })
      .toFile(out("public/images/cover.jpg"))
    report("public/images/cover.jpg")
  },
}

const wanted = process.argv.slice(2)
const names = wanted.length ? wanted : Object.keys(tasks)
for (const name of names) {
  if (!tasks[name]) {
    console.error(`Tarea desconocida: ${name}. Disponibles: ${Object.keys(tasks).join(", ")}`)
    process.exit(1)
  }
  console.log(`▸ ${name}`)
  await tasks[name]()
}
