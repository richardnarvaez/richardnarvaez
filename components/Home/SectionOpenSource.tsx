import { siteConfig } from "@/config/site"
import Link from "next/link"

export default function SectionOpenSource() {
  return (
    <section id="open-source" className="container  py-8 md:py-12 lg:py-24">
      <div className="mx-auto  flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="z-20 font-heading  text-6xl  leading-[1.1]">
          Open Source
        </h2>
        <p className="z-20 max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          This Portfolio is Open Source and powered by open source software.{" "}
          <br /> The code is available on{" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
        <p>Next 14 | Tailwind | Shadcn UI |  ContentLayer | Framer Motion</p>
      </div>
    </section>
  )
}
