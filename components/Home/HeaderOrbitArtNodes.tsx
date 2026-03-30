import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { HeartIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { orbitNodeVariants } from "./HeaderOrbitMotion"

type OrbitAnchorProps = {
  children: ReactNode
  className?: string
  x: string
  y: string
}

function OrbitAnchor({ children, className, x, y }: OrbitAnchorProps) {
  return (
    <motion.div
      variants={orbitNodeVariants}
      className={cn("absolute -translate-x-1/2 -translate-y-1/2", className)}
      style={{ left: x, top: y }}
    >
      {children}
    </motion.div>
  )
}

function AvatarNode({
  initials,
  gradient,
}: {
  gradient: string
  initials: string
}) {
  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-full border border-white/60 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(15,23,42,0.22)]",
        gradient
      )}
    >
      {initials}
    </div>
  )
}

function ReactionBadge({
  icon,
  label,
  className,
}: {
  icon: ReactNode
  label: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.12)]",
        className
      )}
    >
      <span className="text-slate-500">{icon}</span>
      <span>{label}</span>
    </div>
  )
}

function CoverLogoBubble({ alt, src }: { alt: string; src: string }) {
  return (
    <div className="relative size-12 overflow-hidden rounded-full border border-white/70 shadow-[0_10px_24px_rgba(15,23,42,0.16)]">
      <Image src={src} alt={alt} fill sizes="48px" className="object-cover" />
    </div>
  )
}

export default function HeaderOrbitArtNodes() {
  return (
    <div className="absolute inset-0">
      <OrbitAnchor className="hidden md:block" x="18%" y="23%">
        <AvatarNode
          initials="RV"
          gradient="bg-gradient-to-br from-rose-400 to-orange-500"
        />
      </OrbitAnchor>

      <OrbitAnchor className="hidden md:block" x="89%" y="44%">
        <AvatarNode
          initials="EH"
          gradient="bg-gradient-to-br from-fuchsia-500 to-violet-600"
        />
        <ReactionBadge
          className="-mt-2"
          icon={<HeartIcon className="size-3.5" />}
          label="4"
        />
      </OrbitAnchor>

      <OrbitAnchor className="hidden md:block" x="8%" y="51%">
        <CoverLogoBubble src="/images/logos/procreate.jpeg" alt="Procreate" />
      </OrbitAnchor>
    </div>
  )
}
