import type { ReactNode } from "react"
import Image from "next/image"

import AWSColorIcon from "@/components/Icons/brands/AWSColorIcon"
import OpenAIColorIcon from "@/components/Icons/brands/OpenAIColorIcon"
import VercelColorIcon from "@/components/Icons/brands/VercelColorIcon"

import { CountryFlag } from "./PassportGlobe/CountryFlag"
import { getVisitedCountries } from "./PassportGlobe/helpers"
import type { HeaderOrbitTab } from "./HeaderOrbitTabs"

export type HeaderMobileClusterItem = {
  key: string
  node: ReactNode
}

function WhiteBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
      {children}
    </div>
  )
}

function CoverBubble({ alt, src }: { alt: string; src: string }) {
  return (
    <div className="relative size-11 overflow-hidden rounded-full border border-white/70 shadow-[0_10px_24px_rgba(15,23,42,0.16)]">
      <Image src={src} alt={alt} fill sizes="44px" className="object-cover" />
    </div>
  )
}

function AvatarBubble({
  gradient,
  initials,
}: {
  gradient: string
  initials: string
}) {
  return (
    <div
      className={`flex size-11 items-center justify-center rounded-full border border-white/70 text-[11px] font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)] ${gradient}`}
    >
      {initials}
    </div>
  )
}

function OpenAIMark() {
  return (
    <span className="flex size-7 items-center justify-center rounded-full bg-slate-900">
      <OpenAIColorIcon width={16} height={16} className="size-4" />
    </span>
  )
}

function VercelMark() {
  return (
    <span className="flex size-7 items-center justify-center rounded-full bg-slate-900">
      <VercelColorIcon width={14} height={14} className="size-3.5" />
    </span>
  )
}

function FlagBubble({ code }: { code: string }) {
  return (
    <WhiteBubble>
      <CountryFlag code={code} />
    </WhiteBubble>
  )
}

function getDevItems(): HeaderMobileClusterItem[] {
  return [
    {
      key: "codex",
      node: (
        <WhiteBubble>
          <Image
            src="/images/codex.svg"
            alt="Codex"
            width={24}
            height={24}
            className="size-6 object-contain"
          />
        </WhiteBubble>
      ),
    },
    {
      key: "figma",
      node: (
        <WhiteBubble>
          <Image
            src="/images/figma-color.svg"
            alt="Figma"
            width={24}
            height={24}
            className="size-6 object-contain"
          />
        </WhiteBubble>
      ),
    },
    {
      key: "convex",
      node: (
        <WhiteBubble>
          <Image
            src="/images/convex.svg"
            alt="Convex"
            width={24}
            height={24}
            className="size-6 object-contain"
          />
        </WhiteBubble>
      ),
    },
    {
      key: "gemini",
      node: (
        <WhiteBubble>
          <Image
            src="/images/gemini-color.svg"
            alt="Gemini"
            width={28}
            height={28}
            className="size-7 object-contain"
          />
        </WhiteBubble>
      ),
    },
    {
      key: "claude",
      node: (
        <WhiteBubble>
          <Image
            src="/images/claude-symbol.png"
            alt="Claude"
            width={20}
            height={20}
            className="size-5 object-contain"
          />
        </WhiteBubble>
      ),
    },
    {
      key: "railway",
      node: (
        <WhiteBubble>
          <Image
            src="/images/railway.svg"
            alt="Railway"
            width={28}
            height={28}
            className="size-7 object-contain"
          />
        </WhiteBubble>
      ),
    },
    {
      key: "aws",
      node: (
        <WhiteBubble>
          <AWSColorIcon width={24} height={24} className="size-6" />
        </WhiteBubble>
      ),
    },
    {
      key: "vercel",
      node: (
        <WhiteBubble>
          <VercelMark />
        </WhiteBubble>
      ),
    },
    {
      key: "openai",
      node: (
        <WhiteBubble>
          <OpenAIMark />
        </WhiteBubble>
      ),
    },
  ]
}

function getArtItems(): HeaderMobileClusterItem[] {
  return [
    {
      key: "rv",
      node: (
        <AvatarBubble
          initials="RV"
          gradient="bg-gradient-to-br from-rose-400 to-orange-500"
        />
      ),
    },
    {
      key: "eh",
      node: (
        <AvatarBubble
          initials="EH"
          gradient="bg-gradient-to-br from-fuchsia-500 to-violet-600"
        />
      ),
    },
    {
      key: "procreate",
      node: (
        <CoverBubble
          src="/images/logos/procreate.jpeg"
          alt="Procreate illustration"
        />
      ),
    },
    {
      key: "madeira",
      node: (
        <CoverBubble
          src="https://images.unsplash.com/photo-1764025721609-2bd1cf185f32?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Madeira"
        />
      ),
    },
    {
      key: "urban",
      node: (
        <CoverBubble
          src="https://images.unsplash.com/photo-1761671955448-f68ca9eec238?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035"
          alt="Urban photography"
        />
      ),
    },
    {
      key: "street",
      node: (
        <CoverBubble
          src="https://images.unsplash.com/photo-1761671955479-c1fa3e1cf1a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035"
          alt="Street photography"
        />
      ),
    },
  ]
}

function getPassportItems(): HeaderMobileClusterItem[] {
  return getVisitedCountries()
    .slice(0, 6)
    .map((country) => ({
      key: country.code,
      node: <FlagBubble code={country.code} />,
    }))
}

export function getHeaderMobileClusterItems(
  activeTab: HeaderOrbitTab
): HeaderMobileClusterItem[] {
  switch (activeTab) {
    case "Art":
      return getArtItems()
    case "Passport":
      return getPassportItems()
    case "Dev":
    default:
      return getDevItems()
  }
}
