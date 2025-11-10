"use client"

import { cn } from "@/lib/utils"
import { barlow } from "@/lib/fonts"

export default function LyricsAnimation() {
  return (
    <section>
      <div className="relative">
        <p
          className={cn(
            barlow.className,
            "text-3xl font-black leading-none text-black"
          )}
        >
          Lyrics Animation in Construction
        </p>
      </div>
    </section>
  )
}
