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
              <p className="text-md text-white/75">TOP</p>
              <p className="text-3xl  text-white">List of Best Tools</p>{" "}
              <p className="">Coming Soon</p>
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
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>My favorites</DialogTitle>
            <DialogDescription>
              List of my favorite websites and tools
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              {
                title: "RailWay",
                description: "Backend Deployment",
                icon: <RailWayColorIcon className="h-10 w-10" />,
              },

              {
                title: "Open AI",
                description: "Send Emails",
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
              { title: "N8N", description: "Automatization" },
              {
                title: "Strapi",
                description: "HeadLess CMS",
                icon: <StrapiColorIcon className="h-10 w-10" />,
              },
              { title: "Spline", description: "3D Design" },
              {
                title: "Stripe",
                description: "Payments",
                icon: <StripeColorIcon className="h-10 w-10" />,
                theme: "ligth",
              },
              {
                title: "Medusa",
                description: "Shopify Open Source Alternative",
                icon: <MedusaColorIcon className="h-10 w-10" />,
                theme: "ligth",
              },
              {
                title: "Framer Motion",
                description: "Animations",
                icon: <FramerColorIcon className="h-10 w-10" />,
              },
              { title: "Resend", description: "Send Emails" },
              {
                title: "Pinterest",
                description: "Inspiration",
                icon: <PinterestColorIcon className="h-10 w-10" />,
                theme: "ligth",
              },
            ].map((item, index) => {
              return (
                <div
                  className={
                    "flex items-center justify-between gap-4 rounded-lg  bg-slate-800 p-4"
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
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <label className="text-white/50">
                        {item.description}
                      </label>
                    </div>
                  </div>
                  {/* <LinkIcon className="text-white/70" /> */}
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
