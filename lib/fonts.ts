import {
  Barlow,
  Caveat_Brush,
  JetBrains_Mono,
  Roboto_Mono,
  Playfair_Display,
} from "next/font/google"

export const barlow = Barlow({ subsets: ["latin"], weight: ["600"] })
export const robotoMono = Roboto_Mono({ subsets: ["latin"] })
export const jetbrains = JetBrains_Mono({ subsets: ["latin"] })
export const caveatBrush = Caveat_Brush({ subsets: ["latin"], weight: ["400"] })
export const playfair = Playfair_Display({ subsets: ["latin"], style: ["italic", "normal"], weight: ["400", "600", "800"] })
