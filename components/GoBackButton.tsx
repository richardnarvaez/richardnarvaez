"use client"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { buttonVariants } from "./ui/button"

export default function GoBackButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.history.go(-1)
      }}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute left-[-200px] top-14 hidden xl:inline-flex"
      )}
    >
      <Icons.chevronLeft className="mr-2 size-4" />
      Go back
    </button>
  )
}
