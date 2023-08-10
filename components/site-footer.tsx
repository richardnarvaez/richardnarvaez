import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
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

      <div className="my-8 flex flex-col items-center justify-center gap-2.5">
        <div className="flex h-9 w-64 items-center justify-center gap-2 rounded-lg border border-slate-800 bg-gradient-to-b from-transparent to-black/20 text-xs font-medium text-neutral-100 text-opacity-80 shadow">
          <p>{"Cooked with love in "}</p>
          <img className="h-4 w-4" src="/images/ecuador-flag.png" />
          {"with"}
          <img className="h-4 w-2.5" src="/images/figma-icon.png" />
          {"&"}
          <img className="h-4 w-4" src="/images/react-icon.png" />
        </div>
        <div className="mt-3 text-xs font-medium leading-none text-white text-opacity-30">
          ©darkpixl 2023
        </div>
      </div>

      {/* <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
        </div>
        <ModeToggle />
      </div> */}
    </footer>
  )
}
