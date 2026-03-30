"use client"

import { cn } from "@/lib/utils"

const homeProjects = [
  {
    title: "Veridian",
    description:
      "Led the product engineering foundation and shipped a cleaner workflow that reduced friction across key user journeys.",
    accentClassName: "bg-white",
    backgroundClassName: "bg-white/[0.08]",
  },
  {
    title: "GoProject",
    description:
      "Designed and built a focused experience that made project setup faster and helped teams move from idea to execution with less overhead.",
    accentClassName: "bg-zinc-300",
    backgroundClassName: "bg-zinc-300/[0.09]",
  },
  {
    title: "Huma Legends",
    description:
      "Crafted the product direction and interface language for a playful learning app, turning early concepts into a more memorable experience.",
    accentClassName: "bg-zinc-500",
    backgroundClassName: "bg-black/35",
  },
  {
    title: "",
    description: "",
    accentClassName: "",
    backgroundClassName: "bg-white/[0.03]",
  },
] as const

function HomeProjectCard({
  accentClassName,
  backgroundClassName,
  description,
  title,
}: (typeof homeProjects)[number]) {
  const isEmpty = title.length === 0

  return (
    <div
      className={cn(
        "border-white/12 flex min-h-32 rounded-2xl border p-4 shadow-[0_18px_40px_rgba(15,23,42,0.22)] backdrop-blur-md",
        isEmpty ? "border-dashed bg-white/[0.02]" : backgroundClassName
      )}
    >
      {isEmpty ? null : (
        <div className="flex flex-col justify-between text-left">
          <span className={cn("size-2 rounded-full", accentClassName)} />
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="text-white/68 text-[11px] leading-4">{description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function HeaderOrbitHomeProjects() {
  return (
    <div className="mt-6 grid w-[min(90vw,38rem)] grid-cols-2 gap-3">
      {homeProjects.map((project, index) => (
        <HomeProjectCard
          key={project.title || `placeholder-${index}`}
          {...project}
        />
      ))}
    </div>
  )
}
