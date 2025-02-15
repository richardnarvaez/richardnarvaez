"use client"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { LinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CardTopTools() {
  return (
    <>
      <Link href="#tools">
        <div className="group relative flex h-full items-center justify-center overflow-hidden rounded-3xl border text-center">
          <div className="z-20 m-auto p-4 font-bold">
            <p className="text-xl text-white">Best Webs & Tools</p>
            <p className="mt-2 text-sm uppercase text-white">
              List of My Favorites
            </p>
          </div>
          <div className="absolute inset-0 z-10 h-full w-full bg-black/50" />

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
      </Link>
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
