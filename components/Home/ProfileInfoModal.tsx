"use client"

import Image from "next/image"
import Link from "next/link"
import { LaptopIcon, MapPinIcon } from "lucide-react"

import { barlow } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import RewardBase from "@/components/ui/reward"
import FlagEC from "@/components/Icons/flags/ec"
import FlagES from "@/components/Icons/flags/es"
import {
  AWSIcon,
  CiscoIcon,
  GoogleIcon,
  HackerRankIcon,
  HarvardIcon,
  LinkedinIcon,
} from "@/components/Icons/IconsBusiness"
import { Signature } from "@/components/signature"

export default function ProfileInfoModal() {
  return (
    <div className="w-full items-center justify-start space-y-6 text-center">
      <div className="relative mb-6 flex w-full items-center gap-4 overflow-hidden rounded-xl bg-white/5 px-8 py-6">
        <Image
          src={"/images/avatars/richard.jpg"}
          alt="Richard B. Vinueza"
          className="size-12 rounded-full bg-white md:size-[80px]"
          width={96}
          height={96}
        />
        <div className="flex flex-col items-start justify-center">
          <div className="flex items-center gap-2">
            <p className="font-bold md:text-xl">Richard B. Vinueza</p>
            <div className="flex w-fit gap-1 rounded-full bg-white p-1">
              <FlagES width={16} />
              <FlagEC width={16} />
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <LaptopIcon size={16} />
              Software Enginner
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon size={16} />
              Everywhere
            </div>
            <div className="flex items-center gap-1 text-green-500">
              <div className="flex size-4 items-center justify-center rounded-full bg-green-500/30">
                <div className="size-2 rounded-full bg-green-500"></div>
              </div>
              Avaliable
            </div>
          </div>
        </div>
        <Image
          src={"/images/travel.png"}
          alt="Richard B. Vinueza"
          className="insert-y-0 absolute right-0"
          width={240}
          height={96}
        />
      </div>

      <h3
        className={
          barlow.className +
          " font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        }
      >
        {"Who am I?"}
      </h3>
      <h4 className="max-w-5xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        Software Engineer with several years of experience.
        <br />I began tinkering with{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="cursor-pointer rounded-sm bg-[#FF512F] px-1 font-bold text-amber-900">
              Mobile
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="border-2 border-slate-700 bg-slate-900">
            <ul className="text-left text-sm">
              <li>Android/iOS</li>
              <li>React Native/Flutter</li>
              <li>Java/Kotlin/Js&Ts/Swift</li>
            </ul>
          </HoverCardContent>
        </HoverCard>{" "}
        stuff when I was 12. Some time later I decided to pivot my focus to{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="cursor-pointer rounded-sm border px-1 font-bold">
              Web
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="border-2 border-slate-700 bg-slate-900">
            <ul className="text-left text-sm">
              <li>React/NextJS</li>
              <li>Angular</li>
              <li>HTML/CSS/JS/TS</li>
              <li>NodeJS/API Rest/Graphql</li>
              <li>PostgreSQL/MongoDB/MySql</li>
            </ul>
          </HoverCardContent>
        </HoverCard>{" "}
        Development,{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="cursor-pointer rounded-sm bg-green-500 px-1 font-bold text-green-900">
              UI/UX
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="border-2 border-slate-700 bg-slate-900">
            <ul className="text-left text-sm">
              <li>Figma/Adobe Suite</li>
              <li>Wireframes</li>
              <li>Responsive UIs</li>
              <li>Motion & Microinteractions</li>
              <li>Web Accessibility</li>
            </ul>
          </HoverCardContent>
        </HoverCard>{" "}
        and of course I learned about{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="cursor-pointer rounded-sm border bg-white/10 px-1 font-bold">
              Cloud
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="border-2 border-slate-700 bg-slate-900">
            <ul className="text-left text-sm">
              <li>AWS/GCP/Azure/DO</li>
              <li>CI/CD/DevOps</li>
              <li>Linux/Unix</li>
              <li>Docker/ECS/Serverless</li>
            </ul>
          </HoverCardContent>
        </HoverCard>
        . {"Now I'm working with AI to enhance learning."}
        <br /> <br />
        Passionate about traveling and naturally curious. Currently, I am
        focused on becoming a great leader and continuing to share my knowledge.
      </h4>

      <div className="flex w-full items-center justify-center gap-4 pt-12">
        <div className="w-full border-b-2 border-dashed"></div>
        <h3 className="text-sm font-medium">CERTIFICATIONS</h3>
        <div className="w-full border-b-2 border-dashed"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-24 pt-8 text-white">
        <GoogleIcon width="50" height="50" />
        <AWSIcon width="50" height="50" />
        <HarvardIcon width="50" height="50" />
        <HackerRankIcon width="50" height="50" />
        <CiscoIcon />
        <LinkedinIcon />
      </div>

      <div className="space-x-4 pt-8">
        <Link
          href="https://www.linkedin.com/in/richard-vinueza/details/certifications/"
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          See on Linkedin
        </Link>

        <Link
          href={"https://github.com/richardnarvaez"}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          GitHub
        </Link>
      </div>

      <div className="mb-12 flex w-full items-center justify-center gap-4 pt-8">
        <div className="w-full border-b-2 border-dashed"></div>
        <h3 className="text-sm font-medium">REWARDS</h3>
        <div className="w-full border-b-2 border-dashed"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-12 py-8">
        <RewardBase
          title="2023"
          description="Hackaton AI Challenge"
          base="1rt Place"
        />
        <RewardBase
          title="2023"
          description="Code Challenge"
          base="1rt Place"
        />
        <RewardBase
          title="2022"
          description="UISEK Hackaton"
          base="Finalists"
        />
      </div>
    </div>
  )
}
