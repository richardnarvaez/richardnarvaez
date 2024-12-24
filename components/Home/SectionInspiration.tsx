import { siteConfig } from "@/config/site"
import Link from "next/link"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export default function SectionInspiration() {
  return (
    <section id="open-source" className="md:pt-22 container pt-20 lg:pt-16">
      <div className="mx-auto  flex max-w-[58rem] flex-col items-center  justify-center gap-4 rounded-xl border px-8 py-10 text-center">
        <h2 className="z-20 font-heading  text-4xl  leading-[1.1]">
          People who inspire me
        </h2>
        <p className="z-20 leading-normal text-muted-foreground sm:text-lg sm:leading-7 md:max-w-[65%]">
          You may be interested in the following profiles. Top profiles in
          social networks that share a lot of knowledge.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            {
              name: "midudev",
              site: {
                name: "YouTube | Twitch",
                url: "https://www.youtube.com/c/midudev",
              },
              lang: "es",
              image: "/images/inspiration/midu.jpg",
            },
            {
              name: "serudda",
              lang: "es",
              site: {
                name: "YouTube | Twitch",
                url: "https://www.youtube.com/@serudda",
              },
              image: "/images/inspiration/serudda.jpg",
            },
            {
              name: "Silicon Valley Girl",
              lang: "en",
              site: {
                name: "YouTube",
                url: "https://www.youtube.com/@SiliconValleyGirl",
              },
              image: "/images/inspiration/svg.jpg",
            },
            {
              name: "levelsio",
              lang: "en",
              site: {
                name: "Twitter",
                url: "https://twitter.com/levelsio",
              },
              image: "/images/inspiration/levelsio.jpg",
            },
            // {
            //   name: "Will Paterson",
            //   image:
            //     "https://yt3.googleusercontent.com/DDLvg8hqosLtGnXUdtb0OhfBEXhK80aIeQWj2iC3XqA7vA3Cdtcfc0W-Ffd0jGQtSjemMHh2Cg=s176-c-k-c0x00ffffff-no-rj",
            // },
            {
              name: "oguzyagizkara",
              lang: "en",
              site: {
                name: "Twitter",
                url: "https://twitter.com/oguzyagizkara",
              },
              image: "/images/inspiration/ogu.jpg",
            },
            {
              name: "Diego Fernandes", // Rocketseat
              lang: "pt",
              site: {
                name: "Youtube",
                url: "https://www.youtube.com/@rocketseat",
              },
              image: "/images/inspiration/diego.jpg",
            },
          ].map((item, index) => {
            return (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link
                    href={item.site.url}
                    target="_blank"
                    className="h-16 w-16 cursor-pointer overflow-hidden rounded-full border-4 border-white/10 "
                  >
                    <img src={item.image} className="h-full w-full" />
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 border-2 border-slate-700 bg-slate-900">
                  <div className="flex  space-x-4">
                    <Avatar>
                      <AvatarImage src={item.image} />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 text-left">
                      <h4 className="text-sm font-semibold">
                        @{item.name} | {item.lang.toUpperCase()}
                      </h4>
                      <p className="text-sm">{item.site?.name}</p>
                      <div className="flex items-center pt-2">
                        <Link
                          href={item.site.url}
                          target="_blank"
                          className="text-xs text-muted-foreground"
                        >
                          Visit Channel
                        </Link>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
