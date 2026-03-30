"use client"

import Image from "next/image"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const rulerTicks = Array.from({ length: 16 }, (_, index) => index * 50)
const rulerHeightClass = "h-[680px]"
const rulerFadeHeightClass = "h-[300px]"

const getColorOfStatus = {
  building: "bg-amber-500 text-amber-800",
  live: "bg-green-500 text-green-800",
  dead: "bg-red-500 text-red-800",
  "open source": "bg-gray-500 text-gray-800",
  proposal: "bg-blue-500 text-blue-800",
  mvp: "border bg-white/10",
}

function SideRuler({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left"

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 opacity-90 ${isLeft ? "left-0" : "right-0"} hidden xl:block`}
    >
      <div
        className={`absolute top-6 ${rulerHeightClass} w-[72px] ${isLeft ? "left-0 -translate-x-full" : "right-0 translate-x-full"}`}
      >
        <div className="relative size-full">
          <div
            className={`absolute inset-y-0 ${isLeft ? "right-0 border-r-2" : "left-0 border-l-2"} border-dashed border-white/10`}
          />

          <div
            className={`relative flex h-full flex-col justify-between ${isLeft ? "items-end pr-3" : "items-start pl-3"}`}
          >
            {rulerTicks.map((tick) => (
              <div
                key={`${side}-${tick}`}
                className={`flex items-center gap-2 ${isLeft ? "justify-end" : "justify-start"}`}
              >
                {!isLeft && (
                  <span className="h-0.5 w-2 rounded-full bg-white/20" />
                )}
                <span
                  className={`inline-block font-mono text-[10px] tabular-nums text-white/20 ${isLeft ? "-rotate-90" : "rotate-90"}`}
                >
                  {tick}
                </span>
                {isLeft && <span className="h-px w-3 bg-white/10" />}
              </div>
            ))}
          </div>

          <div
            className={`absolute inset-x-0 bottom-0 ${rulerFadeHeightClass} bg-gradient-to-t from-background via-background/90 to-transparent`}
          />
        </div>
      </div>
    </div>
  )
}

export default function SectionListOfProjects({ posts }) {
  useGSAP(() => {
    const articles = gsap.utils.toArray("article") as HTMLElement[]
    articles.forEach((article, i) => {
      gsap.fromTo(
        article,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: article,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.2,
        }
      )
    })
  }, [])

  return (
    <section
      id="products"
      className="relative isolate z-20 mx-auto max-w-5xl px-8 lg:px-0"
    >
      <SideRuler side="left" />
      <SideRuler side="right" />

      <div className="relative z-50 my-8 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2">
        <div className="col-span-full mx-auto -mt-12 flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <p className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Projects and Products
          </p>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            List of all the featured products or side projects I have
          </p>
        </div>

        {posts?.length ? (
          <>
            {posts.map((post, index) => (
              <Link
                key={"post-" + post._id}
                href={post.slug}
                scroll={false}
                className={
                  "group relative col-span-1 aspect-video cursor-pointer overflow-hidden bg-white transition-all"
                }
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={720}
                    height={405}
                    priority={index <= 1}
                    className="size-full object-cover"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 hidden w-full bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-12 group-hover:visible">
                  <h2 className="text-lg font-extrabold text-white md:text-xl">
                    {post.title}
                  </h2>
                  {/* <h3 className="line-clamp-2 text-sm text-white/50 md:text-base">
                    {post.description}
                  </h3> */}

                  {post.name && (
                    <p className="mt-2 flex items-center gap-2 truncate">
                      {" "}
                      {post.name}
                      {" - " + new Date(post.date).getFullYear()}
                      {post.status &&
                        post.status.map((chip, index) => {
                          return (
                            <span
                              key={
                                "status-" + chip + "-" + post._id + "-" + index
                              }
                              className={
                                "max-w-fit truncate rounded-full px-3 py-1 text-sm font-bold uppercase " +
                                (getColorOfStatus[chip] || "")
                              }
                            >
                              {chip}
                            </span>
                          )
                        })}
                    </p>
                  )}
                </div>
              </Link>
            ))}

            <div className="col-span-full mt-8 flex w-full justify-center">
              <Link
                href={"/projects"}
                className="rounded-md bg-white px-4 py-2 font-semibold text-slate-800"
              >
                See More
              </Link>
            </div>
          </>
        ) : (
          <p>No posts published.</p>
        )}
      </div>
    </section>
  )
}
