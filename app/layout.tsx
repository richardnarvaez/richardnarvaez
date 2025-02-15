import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "@/styles/globals.css"
import { siteConfig } from "@/config/site"
import { absoluteUrl, cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Viewport } from "next"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const viewport: Viewport = {
  themeColor: "black",
}

export const metadata = {
  metadataBase: new URL("https://richard.darkpixl.com"),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Portfolio",
    "Richard",
    "Richard Vinueza",
    "Narvaez",
  ],
  authors: [
    {
      name: "Richard Vinueza",
      url: "https://darkpixl.com",
    },
  ],
  creator: "richardvinueza",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@richard-vinueza",
  },
  icons: {
    icon: "/images/logo-richard.png",
    shortcut: "/images/logo-richard.png",
    apple: "/images/logo-richard.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Richard Vinueza",
  url: siteConfig.url,
  alumniOf: "ESCUELA SUPERIOR POLITECNICA DE CHIMBORAZO",
  sameAs: [
    "https://www.linkedin.com/in/richardvnarvaez/",
    siteConfig.links.twitter,
    siteConfig.links.github,
    "https://dribbble.com/RichardNarvaez",
    "https://www.figma.com/@richardvnarvaez",
  ],
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
          {/* <Analytics /> */}
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
