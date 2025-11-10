import Link from "next/link"
import { LinkIcon } from "lucide-react"

import ImageCustom from "@/components/ImageCustom"

interface Tool {
  title?: string
  description?: string
  url?: string
  icon?: string
}

interface SectionFavToolsProps {
  tools: Tool[]
}

export default function SectionFavTools({ tools }: SectionFavToolsProps) {
  return (
    <section id="tools" className="flex min-h-screen items-center p-8 md:p-32">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {tools?.map((item, index) => {
          return (
            <div
              key={`tool-${index}`}
              className={`flex w-fit items-center justify-between gap-4 rounded-lg bg-slate-800 p-4 ${
                !item.title ? "opacity-30" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center overflow-hidden rounded-xl bg-slate-900">
                  <ImageCustom
                    alt={item.title || ""}
                    src={item.icon || ""}
                    width={64}
                    height={64}
                  />
                </div>
                <div className="grid max-w-[132px] flex-1">
                  <p className="font-bold">{item.title}</p>
                  <label
                    title={item.description}
                    className="truncate text-white/50"
                  >
                    {item.description}
                  </label>
                </div>
              </div>
              <div>
                {item.url && (
                  <Link href={item.url} target="_blank">
                    <LinkIcon className="text-white/70" />
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
