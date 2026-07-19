import packageJson from "../package.json"

export const siteName = "Richard Vinueza"
export const siteRole = "Product Engineer, Madrid - Spain"
export const siteDescription =
  "Portfolio of Richard Vinueza - Product Engineer in Madrid. Software, sketches and passport."
export const siteUrl = "https://rbvn.vercel.app"

export const socialLinks = {
  github: "https://github.com/richardnarvaez/",
  instagram: "https://www.instagram.com/richard.vinueza/",
  linkedin: "https://www.linkedin.com/in/richard-vinueza/",
} as const

export const projectVersionLabel = `v${packageJson.version ?? "0.0.0"}`
