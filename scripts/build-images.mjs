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
  // Bocetos del hero: máscara del trazo + halo pre-desenfocado, ambas como
  // ALFA (trazo blanco sobre transparente). Safari ignora `mask-mode:
  // luminance` con imágenes raster, así que la luminancia no es opción.
  // 2000px de ancho bastan (el hero se ve a ≤1920 y el trazo es suave).
  async sketch() {
    const src = sharp("design/hero/sketch.png").resize({ width: 2000 })
    const { width, height } = await src.clone().metadata()
    // Trazo: la imagen tal cual (blanco + alfa), WebP con pérdida en color y alfa casi intacto.
    await src.clone().webp({ quality: 60, alphaQuality: 90, effort: 6 })
      .toFile(out("public/images/home/bg-header-lineas-mask.webp"))
    // Halo: el alfa del trazo desenfocado y reforzado, montado sobre blanco.
    // A la mitad de resolución (ya va desenfocado) y con alfa SIN pérdida: la
    // compresión con pérdida del alfa deja bandas en los degradados suaves.
    // Dos pasadas a propósito: sharp aplica `linear` ANTES de `extractChannel`
    // y `blur` si van en la misma cadena, y sobre un alfa 0/255 no hace nada.
    const half = Math.round(width / 2)
    const blurred = await src.clone().extractChannel("alpha").blur(20).toBuffer()
    const alpha = await sharp(blurred).linear(3.2, 0).resize({ width: half }).toBuffer()
    await sharp({ create: { width: half, height: Math.round(height / 2), channels: 3, background: "#fff" } })
      .joinChannel(alpha)
      .webp({ quality: 60, alphaQuality: 100, effort: 6 })
      .toFile(out("public/images/home/bg-header-lineas-glow.webp"))
    report("public/images/home/bg-header-lineas-mask.webp")
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

  // Iconos de app a 256px (retina para tiles de hasta 96px) y grandes para
  // el visor (≤1024px, sin ampliar). `contain` monta sobre blanco los que
  // vienen recortados con alfa; `extract` recorta el lienzo sobrante.
  async apps() {
    const icons = [
      { id: "huma", src: "design/apps/huma.jpg" },
      // PNG pequeño: el grande se deja a 512 con vecino más próximo, ampliado por CSS.
      { id: "memory", src: "design/apps/memory.png", fit: "contain", background: "#dffcff", large: 512, kernel: "nearest" },
      { id: "ubrand", src: "design/apps/ubrand.png" },
      { id: "deliverycat", src: "design/apps/deliverycat.png", fit: "contain", background: "#fff" },
      { id: "chicken-vs-cats", src: "design/apps/chicken-vs-cats.webp" },
      { id: "little-king", src: "design/apps/little-king-icon.png", extract: { left: 100, top: 100, width: 824, height: 824 } },
      { id: "thelist", src: "design/apps/thelist.png", fit: "contain", background: "#fff" },
      { id: "zodiac", src: "design/apps/zodiac.png" },
    ]
    for (const icon of icons) {
      const base = () => (icon.extract ? sharp(icon.src).extract(icon.extract) : sharp(icon.src))
      const fit = icon.fit ?? "cover"
      const thumb = out(`public/images/apps/${icon.id}.webp`)
      await base().resize(256, 256, { fit, background: icon.background }).webp({ quality: 82 }).toFile(thumb)
      report(thumb)
      const large = out(`public/images/apps/large/${icon.id}.webp`)
      const size = icon.large ?? 1024
      await base().resize(size, size, { fit, background: icon.background, withoutEnlargement: !icon.kernel, kernel: icon.kernel })
        .webp({ quality: icon.kernel ? 90 : 84 }).toFile(large)
      report(large)
    }
    // Logotipos de los juegos (con alfa) para la galería: miniatura y grande.
    const marks = [
      { id: "relax-puzzle", src: "design/apps/relax-puzzle.png" },
      { id: "little-king-logo", src: "design/apps/little-king-logo.png" },
    ]
    for (const mark of marks) {
      const thumb = out(`public/images/apps/${mark.id}.webp`)
      await sharp(mark.src).resize({ width: 480 }).webp({ quality: 82, alphaQuality: 90 }).toFile(thumb)
      report(thumb)
      const large = out(`public/images/apps/large/${mark.id}.webp`)
      await sharp(mark.src).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 84, alphaQuality: 90, effort: 6 }).toFile(large)
      report(large)
    }
  },

  // Miniaturas del lienzo de ilustraciones (tiles de hasta 200px, 2×).
  // Miniaturas (lienzo, drawer) y versiones grandes (visor, ≤1600px).
  async illustrations() {
    const sources = ["pic_1.jpg", "pic_2.jpg", "pic_3.jpg", "pic_4.jpg", "pic_5.jpg", "pic_6.png"]
    for (const [index, file] of sources.entries()) {
      const i = index + 1
      const src = `design/illustrations/${file}`
      const thumb = out(`public/images/illustration/thumbs/pic_${i}.webp`)
      await sharp(src).resize({ width: 400 }).webp({ quality: 78 }).toFile(thumb)
      report(thumb)
      const large = out(`public/images/illustration/large/pic_${i}.webp`)
      await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(large)
      report(large)
    }
  },

  // Retrato del lienzo de fotografía: miniatura y grande para el visor.
  async photos() {
    await sharp("design/photos/landing-path.jpg").resize({ width: 480 }).webp({ quality: 78 })
      .toFile(out("public/images/photos/landing-path.webp"))
    report("public/images/photos/landing-path.webp")
    await sharp("design/photos/landing-path.jpg").resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82, effort: 6 })
      .toFile(out("public/images/photos/large/landing-path.webp"))
    report("public/images/photos/large/landing-path.webp")
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
