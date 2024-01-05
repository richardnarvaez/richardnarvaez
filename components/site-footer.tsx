import * as React from "react"

import { cn } from "@/lib/utils"
import Image from "next/image"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="flex items-center justify-center">
        <div className="relative flex">
          <Image
            src="/darkpixlsello.svg"
            alt="Blur"
            className="animate-spin-slow"
            width={90}
            height={90}
          />
          <Image
            src="/images/darkpixl-sm.png"
            alt="Blur"
            className="absolute inset-0 m-auto"
            width={40}
            height={40}
          />
        </div>
      </div>

      <div className="mb-32 mt-8 flex flex-col items-center justify-center gap-2.5">
        <div className="flex h-9 w-64 items-center justify-center gap-2 rounded-lg border border-slate-800 bg-gradient-to-b from-transparent to-black/20 text-xs font-medium text-neutral-100 text-opacity-80 shadow">
          <p>{"Cooked with love in "}</p>
          <img className="h-4 w-4" src="/images/ecuador-flag.png" />
          {"with"}
          <img className="h-4 w-2.5" src="/images/figma-icon.png" />
          {"&"}
          <img className="h-4 w-4" src="/images/react-icon.png" />
        </div>
        <div className="mt-3 text-xs font-medium leading-none text-white text-opacity-30">
          ©darkpixl 2024
        </div>
      </div>
    </footer>
  )
}
