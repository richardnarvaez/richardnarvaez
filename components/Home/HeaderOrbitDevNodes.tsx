import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Heart,
  HeartIcon,
  Megaphone,
  MessageCircle,
  ThumbsUp,
} from "lucide-react"

import { cn } from "@/lib/utils"
import AWSColorIcon from "@/components/Icons/brands/AWSColorIcon"
import OpenAIColorIcon from "@/components/Icons/brands/OpenAIColorIcon"
import VercelColorIcon from "@/components/Icons/brands/VercelColorIcon"

import BrandCycleBubble from "./BrandCycleBubble"
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

function StatusPill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-emerald-700 shadow-[0_10px_24px_rgba(16,185,129,0.12)]">
      <span className="size-2 rounded-full bg-emerald-500" />
      <span>{label}</span>
    </div>
  )
}

function IconBubble({
  icon,
  toneClassName = "text-slate-500",
}: {
  icon: ReactNode
  toneClassName?: string
}) {
  return (
    <div className="flex size-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
      <span className={toneClassName}>{icon}</span>
    </div>
  )
}

function OpenAIBubbleIcon() {
  return (
    <span className="flex size-7 items-center justify-center rounded-full bg-slate-900">
      <OpenAIColorIcon width={16} height={16} className="size-4" />
    </span>
  )
}

function RailwayBubbleIcon() {
  return (
    <Image
      src="/images/railway.svg"
      alt="Railway"
      width={28}
      height={28}
      className="size-7 object-contain"
    />
  )
}

function AWSBubbleIcon() {
  return <AWSColorIcon width={24} height={24} className="size-6" />
}

function VercelBubbleIcon() {
  return (
    <span className="flex size-7 items-center justify-center rounded-full bg-slate-900">
      <VercelColorIcon width={14} height={14} className="size-3.5" />
    </span>
  )
}

function FigmaBubbleIcon() {
  return (
    <Image
      src="/images/figma-color.svg"
      alt="Figma"
      width={24}
      height={24}
      className="size-6 object-contain"
    />
  )
}

function ConvexBubbleIcon() {
  return (
    <Image
      src="/images/convex.svg"
      alt="Convex"
      width={24}
      height={24}
      className="size-6 object-contain"
    />
  )
}

function CloudflareBubbleIcon() {
  return (
    <Image
      src="/images/cloudflare-color.svg"
      alt="Cloudflare"
      width={24}
      height={24}
      className="size-6 object-contain"
    />
  )
}

export default function HeaderOrbitDevNodes() {
  return (
    <div className="absolute inset-0">
      <OrbitAnchor x="23.5%" y="29.5%">
        <IconBubble icon={<FigmaBubbleIcon />} toneClassName="" />
      </OrbitAnchor>

      <OrbitAnchor x="28%" y="39%">
        <IconBubble icon={<ConvexBubbleIcon />} toneClassName="" />
        <ReactionBadge
          className="-mt-2"
          icon={<HeartIcon className="size-3.5" />}
          label="4"
        />
      </OrbitAnchor>

      <OrbitAnchor x="12%" y="32%">
        <BrandCycleBubble
          logos={[
            {
              src: "/images/codex.svg",
              alt: "Codex",
              width: 24,
              height: 24,
              className: "size-6 object-contain",
            },
            {
              alt: "OpenAI",
              key: "openai",
              node: <OpenAIBubbleIcon />,
            },
          ]}
        />
      </OrbitAnchor>

      <OrbitAnchor x="16%" y="45%">
        <StatusPill label="Available" />
      </OrbitAnchor>

      <OrbitAnchor x="24%" y="69%">
        <BrandCycleBubble
          logos={[
            {
              src: "/images/gemini-color.svg",
              alt: "Gemini",
              width: 32,
              height: 32,
              className: "size-8 object-contain",
            },
            {
              src: "/images/googlecloud-color.svg",
              alt: "Google Cloud",
              width: 32,
              height: 32,
              className: "size-8 object-contain",
            },
          ]}
        />
      </OrbitAnchor>

      <OrbitAnchor x="56%" y="27.5%">
        <IconBubble icon={<VercelBubbleIcon />} toneClassName="" />
      </OrbitAnchor>

      <OrbitAnchor x="69%" y="24%">
        <IconBubble icon={<CloudflareBubbleIcon />} toneClassName="" />
      </OrbitAnchor>

      <OrbitAnchor x="9.5%" y="60%">
        <ReactionBadge icon={<Megaphone className="size-3.5" />} label="4" />
      </OrbitAnchor>

      <OrbitAnchor x="39%" y="70%">
        <ReactionBadge icon={<ThumbsUp className="size-3.5" />} label="35" />
      </OrbitAnchor>

      <OrbitAnchor x="94%" y="27%">
        <IconBubble icon={<AWSBubbleIcon />} toneClassName="" />
      </OrbitAnchor>

      <OrbitAnchor x="88%" y="41%">
        <BrandCycleBubble
          logos={[
            {
              src: "/images/claude-symbol.png",
              alt: "Claude",
              width: 20,
              height: 20,
              className: "size-5 object-contain",
            },
            {
              src: "/images/claudecode-color.svg",
              alt: "Claude Code",
              width: 24,
              height: 24,
              className: "size-6 object-contain",
            },
          ]}
        />
      </OrbitAnchor>

      <OrbitAnchor x="82%" y="61%">
        <IconBubble icon={<RailwayBubbleIcon />} toneClassName="" />
      </OrbitAnchor>

      <OrbitAnchor x="76.5%" y="72.5%">
        <AvatarNode
          initials="RV"
          gradient="bg-gradient-to-br from-orange-400 to-amber-500"
        />
      </OrbitAnchor>

      <OrbitAnchor x="82.5%" y="27%">
        <ReactionBadge icon={<Heart className="size-3.5" />} label="10" />
      </OrbitAnchor>

      <OrbitAnchor x="76%" y="34%">
        <ReactionBadge
          icon={<MessageCircle className="size-3.5" />}
          label="32"
        />
      </OrbitAnchor>

      <OrbitAnchor x="64%" y="79%">
        <ReactionBadge icon={<ThumbsUp className="size-3.5" />} label="17" />
      </OrbitAnchor>
    </div>
  )
}
