import packageJson from "../package.json"

export const siteName = "Richard Vinueza"
export const siteDescription =
  "Portfolio of Richard Vinueza - Product Engineer in Madrid. Software, sketches and passport."
export const siteUrl = "https://rbvn.vercel.app"

export const socialLinks = {
  github: "https://github.com/richardnarvaez/",
  instagram: "https://www.instagram.com/richard.vinueza/",
  linkedin: "https://www.linkedin.com/in/richard-vinueza/",
} as const

/* Original portfolio template, used by the bento and the footer note. */
export const figmaTemplate = "https://www.figma.com/community/file/1270173776891030529"

export const projectVersionLabel = `v${packageJson.version ?? "0.0.0"}`
