"use client"
import StripeColorIcon from "@/components/Icons/brands/StripeColorIcon"
import StrapiColorIcon from "@/components/Icons/brands/StrapiColorIcon"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LinkIcon } from "lucide-react"
import Image from "next/image"
import FigmaColorIcon from "@/components/Icons/brands/FigmaColorIcon"
import RailWayColorIcon from "@/components/Icons/brands/RailWayColorIcon"
import AWSColorIcon from "@/components/Icons/brands/AWSColorIcon"
import PinterestColorIcon from "@/components/Icons/brands/PinterestColorIcon"
import OpenAIColorIcon from "@/components/Icons/brands/OpenAIColorIcon"
import MedusaColorIcon from "@/components/Icons/brands/MedusaColorIcon"
import FramerColorIcon from "@/components/Icons/brands/FramerColorIcon"
import VercelColorIcon from "@/components/Icons/brands/VercelColorIcon"
import N8NColorIcon from "@/components/Icons/brands/N8NColorIcon"
import SplineColorIcon from "@/components/Icons/brands/SplineColorIcon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const itemsGeneral = [
  {
    title: "RailWay",
    description: "Backend Deployment",
    url: "https://railway.app",
    icon: <RailWayColorIcon className="h-10 w-10" />,
  },

  {
    title: "Open AI",
    description: "AI development environment",
    icon: <OpenAIColorIcon className="h-10 w-10" />,
  },
  {
    title: "Figma",
    description: "Design",
    icon: <FigmaColorIcon className="h-10 w-10" />,
    theme: "ligth",
  },
  {
    title: "Vercel",
    description: "Frontend Deployment",
    icon: <VercelColorIcon className="m-3 h-10 w-10" />,
  },
  {
    title: "AWS",
    description: "EC2, Lambdas, ECS, S3",
    icon: <AWSColorIcon className="h-10 w-10" />,
    theme: "ligth",
  },
  {
    title: "N8N",
    description: "Automatization",
    icon: <N8NColorIcon />,
    theme: "ligth",
  },
  {
    title: "Strapi",
    description: "HeadLess CMS",
    icon: <StrapiColorIcon className="h-10 w-10" />,
  },
  {
    title: "Spline",
    description: "3D Design",
    url: "https://spline.design",
    icon: <SplineColorIcon />,
  },
  {
    title: "Stripe",
    description: "Payments",
    icon: <StripeColorIcon className="h-10 w-10" />,
    theme: "ligth",
  },
  {
    title: "Medusa",
    description: "Open Source E-Commerce",
    url: "https://medusajs.com/",
    icon: <MedusaColorIcon className="h-10 w-10" />,
    theme: "ligth",
  },
  {
    title: "Framer Motion",
    description: "Animations",
    icon: <FramerColorIcon className="h-10 w-10" />,
  },
  {
    title: "Resend",
    description: "Send Emails",
    icon: (
      <Image
        src={"https://asset.brandfetch.io/id0BqaqET6/idwjc1TygR.jpeg"}
        width={100}
        height={100}
        alt="Resend Logo"
        className="rounded-xl"
      />
    ),
  },
]

const itemsLogos = [
  {
    title: "Brandfetch",
    description: "Brand Logos",
    url: "https://brandfetch.com",
    icon: (
      <Image
        src={"https://asset.brandfetch.io/idL0iThUh6/idXGq6SIu2.svg"}
        width={100}
        height={100}
        alt="Brandfetch Logo"
        className="h-10 w-10"
      />
    ),
  },
  {
    title: "svgl",
    description: "Good SVG Icons",
    url: "https://svgl.app/",
    icon: (
      <svg
        width="50"
        name="SVGL Logo"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect
          id="r4"
          width="512"
          height="512"
          x="0"
          y="0"
          rx="128"
          fill="#222"
          stroke="#FFFFFF"
          stroke-width="0"
          stroke-opacity="100%"
          paint-order="stroke"
        ></rect>
        <rect
          width="512"
          height="512"
          x="0"
          y="0"
          fill="url(#r6)"
          rx="128"
          style={{ mixBlendMode: "overlay" }}
        ></rect>
        <clipPath id="clip">
          <use xlinkHref="#r4"></use>
        </clipPath>
        <defs>
          <linearGradient
            id="r5"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(135)"
            style={{ transformOrigin: "center center" }}
          >
            <stop stop-color="#222"></stop>
            <stop offset="1" stop-color="#222222"></stop>
          </linearGradient>
          <radialGradient
            id="r6"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(256) rotate(90) scale(512)"
          >
            <stop stop-color="white"></stop>
            <stop offset="1" stop-color="white" stop-opacity="0"></stop>
          </radialGradient>
        </defs>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="310"
          height="310"
          fill="#e8e8e8"
          viewBox="0 0 256 256"
          x="101"
          y="101"
          alignment-baseline="middle"
          style={{ color: "rgb(255, 255, 255)" }}
        >
          <path d="M168,32H88A56.06,56.06,0,0,0,32,88v80a56.06,56.06,0,0,0,56,56h48a8.07,8.07,0,0,0,2.53-.41c26.23-8.75,76.31-58.83,85.06-85.06A8.07,8.07,0,0,0,224,136V88A56.06,56.06,0,0,0,168,32ZM48,168V88A40,40,0,0,1,88,48h80a40,40,0,0,1,40,40v40H184a56.06,56.06,0,0,0-56,56v24H88A40,40,0,0,1,48,168Zm96,35.14V184a40,40,0,0,1,40-40h19.14C191,163.5,163.5,191,144,203.14Z"></path>
        </svg>
      </svg>
    ),
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
]

const itemsInspiration = [
  {
    title: "Pinterest",
    description: "Inspiration",
    url: "https://www.pinterest.com/search/pins/?q=ui%20saas%20page",
    icon: <PinterestColorIcon className="h-10 w-10" />,
    theme: "ligth",
  },
  {
    title: "Refero",
    description: "Designs from the best products",
    url: "https://refero.design/",
    icon: (
      <Image
        src={"https://asset.brandfetch.io/idiWIi67lS/id824DNM84.png"}
        width={100}
        height={100}
        alt="Refero Logo"
      />
    ),
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
]

export default function CardTopTools() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="group relative flex items-center justify-center overflow-hidden rounded-xl border text-center">
            <div className="z-20 m-auto p-4 font-bold">
              <div className="m-4 mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white">
                <Image
                  alt="Logo Richard Vinueza"
                  src={"/images/logo-richard.png"}
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-md border-b-2 border-dashed border-white/30 p-2 text-white/75">
                TOP
              </p>
              <p className="mt-4 text-3xl text-white">Best Webs & Tools</p>
              <p className="mt-2 text-lg uppercase text-white">
                List of My Favorites
              </p>
            </div>
            <div className="absolute top-0 z-10 h-full w-full bg-[rgba(35,41,60,0.3)]"></div>

            <Image
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-all ease-out group-hover:scale-110 group-hover:blur-sm"
              src={
                "https://images.unsplash.com/photo-1664448007527-2c49742dbb24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
              }
              width={700}
              height={900}
            />
          </div>
        </DialogTrigger>
        <DialogContent className="min-h-[700px] sm:max-w-3xl">
          {/* <DialogHeader>
            <DialogTitle>My favorites</DialogTitle>
            <DialogDescription>
              List of my favorite websites and tools
            </DialogDescription>
          </DialogHeader> */}
          <Tabs defaultValue="general" className="h-full">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="logos">Logos</TabsTrigger>
              <TabsTrigger value="inspiration">Inspiration</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div className="grid gap-2 md:grid-cols-2">
                {itemsGeneral.map((item, index) => (
                  <ItemTop item={item} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="logos">
              <div className="grid gap-2 md:grid-cols-2">
                {itemsLogos.map((item) => (
                  <ItemTop item={item} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="inspiration">
              <div className="grid gap-2 md:grid-cols-2">
                {itemsInspiration.map((item) => (
                  <ItemTop item={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}

const ItemTop = ({ item }: any) => {
  return (
    <div
      className={
        "flex w-full items-center justify-between gap-4 rounded-lg  bg-slate-800 p-4 " +
        (!item.title ? "opacity-30" : "")
      }
    >
      <div className="flex items-center gap-4">
        <div
          className={
            "flex h-16 w-16 items-center justify-center rounded-xl p-2 " +
            (item.theme && item.theme === "ligth"
              ? "bg-white/95"
              : "bg-slate-900")
          }
        >
          {item.icon}
        </div>
        <div className="grid flex-1">
          <p className="font-bold">{item.title}</p>
          <label title={item.description} className="truncate text-white/50">
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
}
