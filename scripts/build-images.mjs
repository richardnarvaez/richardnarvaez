// Builds every derived image in `public/images` from the sources in `design/`,
// which live outside public and outside git (~20 MB).
// 
//   node scripts/build-images.mjs            # every task
//   node scripts/build-images.mjs hero og    # only some
// 
// sharp ships with Astro and is resolved from its package to avoid a dependency.
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
  // Hero sketches: stroke mask plus a pre-blurred halo, both as ALPHA (white
  // stroke on transparent). Safari ignores `mask-mode: luminance` on raster
  // images, so luminance is not an option. 2000px wide is enough.
  async sketch() {
    const src = sharp("design/hero/sketch.png").resize({ width: 2000 })
    const { width, height } = await src.clone().metadata()
    // Stroke: the image as-is, WebP lossy in colour with alpha nearly intact.
    await src.clone().webp({ quality: 60, alphaQuality: 90, effort: 6 })
      .toFile(out("public/images/home/bg-header-lineas-mask.webp"))
    // Halo: the stroke's alpha, blurred and strengthened over white. Half
    // resolution (already blurred) with LOSSLESS alpha, since lossy alpha bands
    // the soft gradients. Two passes on purpose: sharp applies `linear` before
    // `extractChannel` and `blur` in one chain, which does nothing on a 0/255 alpha.
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

  // Liquid torch drop: a radial gradient circle wrinkled by noise, rasterised
  // once (an SVG filter as mask-image re-rasterises every frame and heats the GPU).
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

  // App icons at 256px (retina for tiles up to 96px) and large for the viewer
  // (≤1024px, never upscaled). `contain` mounts alpha-cropped ones over white;
  // `extract` trims the leftover canvas.
  async apps() {
    const icons = [
      { id: "huma", src: "design/apps/huma.jpg" },
      // Small PNG: the large one stays at 512 with nearest neighbour, scaled by CSS.
      { id: "memory", src: "design/apps/memory.png", fit: "contain", background: "#dffcff", large: 512, kernel: "nearest" },
      { id: "ubrand", src: "design/apps/ubrand.png" },
      { id: "deliverycat", src: "design/apps/deliverycat.png", fit: "contain", background: "#fff" },
      { id: "chicken-vs-cats", src: "design/apps/chicken-vs-cats.webp" },
      { id: "little-king", src: "design/apps/little-king-icon.png", extract: { left: 100, top: 100, width: 824, height: 824 } },
      { id: "thelist", src: "design/apps/thelist.png", fit: "contain", background: "#fff" },
      { id: "zodiac", src: "design/apps/zodiac.png" },
      { id: "trendy-music", src: "design/apps/trendy-music.png", fit: "contain", background: "#fff" },
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
    // Game logos (with alpha) for the gallery: thumbnail and full size.
    const marks = [
      { id: "relax-puzzle", src: "design/apps/relax-puzzle.png" },
      { id: "little-king-logo", src: "design/apps/little-king-logo.png" },
      // Alternate Trendy Music icon, reference only inside the case.
      { id: "trendy-music-alt", src: "design/apps/trendy-music-alt.png" },
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

  // Illustration canvas thumbnails (tiles up to 200px, 2×).
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

  // Photography canvas portrait: thumbnail and full size for the viewer.
  async photos() {
    await sharp("design/photos/landing-path.jpg").resize({ width: 480 }).webp({ quality: 78 })
      .toFile(out("public/images/photos/landing-path.webp"))
    report("public/images/photos/landing-path.webp")
    await sharp("design/photos/landing-path.jpg").resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82, effort: 6 })
      .toFile(out("public/images/photos/large/landing-path.webp"))
    report("public/images/photos/large/landing-path.webp")
  },

  // Hero photo: full bleed, 2000px is enough (the original is 2731).
  async hero() {
    await sharp("design/hero/background.jpg").resize({ width: 2000 }).webp({ quality: 72, effort: 6 })
      .toFile(out("public/images/home/bg-header.webp"))
    report("public/images/home/bg-header.webp")
  },

  // Train: landscape and carriage, the latter with alpha in the windows.
  async scenery() {
    await sharp("design/scenery/landscape.jpg").resize({ width: 2000 }).webp({ quality: 72, effort: 6 })
      .toFile(out("public/images/home/fondo.webp"))
    await sharp("design/scenery/wagon.png").webp({ quality: 80, alphaQuality: 90, effort: 6 })
      .toFile(out("public/images/home/vagones.webp"))
    report("public/images/home/fondo.webp")
    report("public/images/home/vagones.webp")
  },

  // Resume card background in the bento (seen at ~340px; 800 for retina).
  async bento() {
    await sharp("design/bento/resume.jpg").resize({ width: 800 }).webp({ quality: 75 })
      .toFile(out("public/images/bento/resume.webp"))
    report("public/images/bento/resume.webp")
  },

  // Open Graph image: JPEG, since not every network reads WebP.
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
