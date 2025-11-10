"use client"

import { barlow } from "@/lib/fonts"
import { cn } from "@/lib/utils"

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
