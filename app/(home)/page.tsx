import Link from "next/link"
import { allPosts } from "@/.contentlayer/generated"
import { getFavTools } from "@/services/posts"
import { compareDesc } from "date-fns"
import { LinkIcon } from "lucide-react"

import Header from "@/components/Home/Header"
import SectionBento from "@/components/Home/SectionBento"
import SectionFrameworksNStak from "@/components/Home/SectionFrameworksNStack"
import SectionInspiration from "@/components/Home/SectionInspiration"
import SectionListOfProjects from "@/components/Home/SectionListOfProjects"
import SectionOpenSource from "@/components/Home/SectionOpenSource"
import ImageCustom from "@/components/ImageCustom"
import { ScrollToTopButton } from "@/components/SrollTopButton"

interface Tool {
  title?: string
  description?: string
  url?: string
  icon?: string
}

export default async function IndexPage() {
  let favTools: Tool[] = await getFavTools()

  const posts = allPosts
    .filter((post) => post.published && post.highlight)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <div>
      <ScrollToTopButton />

      <Header />

      <SectionBento />

      <div
        id="projects-placeholder"
        className="relative mx-auto mt-4 grid max-w-5xl grid-cols-1 gap-4 px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-0"
      >
        <div className="absolute inset-x-0 bottom-0 z-10 h-24 w-full bg-gradient-to-t from-[hsl(244,31%,10%)] to-transparent"></div>
        <div className="col-span-2 h-24 w-full rounded-3xl border-2 border-dashed border-white/10"></div>
        <div className="col-span-2 h-24 w-full rounded-3xl border-2 border-dashed border-white/10"></div>
      </div>

      <SectionListOfProjects posts={posts} />

      {/* <section
        id="tools"
        className="flex min-h-[100vh] items-center p-8 md:p-32 "
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          {favTools?.map((item, index) => {
            return (
              <div
                key={"ite-" + index}
                className={
                  "flex w-fit items-center justify-between gap-4 rounded-lg  bg-slate-800 p-4 " +
                  (!item.title ? "opacity-30" : "")
                }
              >
                <div className="flex items-center gap-4">
                  <div
                    className={
                      "flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-slate-900 "
                    }
                  >
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
      </section> */}

      <SectionFrameworksNStak />

      {/* <SectionInspiration /> */}
      <SectionOpenSource />
    </div>
  )
}
