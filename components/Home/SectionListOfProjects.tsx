"use client"

import Image from "next/image"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const getColorOfStatus = {
  building: "bg-amber-500 text-amber-800",
  live: "bg-green-500 text-green-800",
  dead: "bg-red-500 text-red-800",
  "open source": "bg-gray-500 text-gray-800",
  proposal: "bg-blue-500 text-blue-800",
  mvp: "border bg-white/10",
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
      className="mx-auto grid grid-cols-1 px-8 sm:grid-cols-2 lg:grid-cols-2 lg:px-0"
    >
      <div className="col-span-full mx-auto my-16 flex max-w-[58rem] flex-col items-center space-y-4 text-center">
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
              className={
                "group col-span-1 aspect-video cursor-pointer bg-white transition-all"
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
    </section>
  )
}
