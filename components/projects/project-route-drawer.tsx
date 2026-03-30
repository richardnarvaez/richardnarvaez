"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

interface ProjectRouteDrawerProps {
  title: string
  description?: string
  children: React.ReactNode
}

export default function ProjectRouteDrawer({
  title,
  description,
  children,
}: ProjectRouteDrawerProps) {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const closeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setOpen(true)
      return
    }

    setOpen(false)
    closeTimeoutRef.current = window.setTimeout(() => {
      router.back()
    }, 300)
  }

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content className="fixed inset-x-0 bottom-0 z-50 duration-300 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full sm:mx-auto sm:w-full sm:max-w-4xl">
          <DialogPrimitive.Close className="absolute -top-14 right-4 z-10 rounded-full border border-slate-200 bg-white p-3 text-slate-900 shadow-lg transition-colors hover:bg-slate-50 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          <div className="flex max-h-[88vh] flex-col overflow-hidden rounded-t-[28px] border border-b-0 bg-background shadow-2xl">
            <div className="sr-only">
              <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description>
                  {description}
                </DialogPrimitive.Description>
              ) : null}
            </div>

            <div className="overflow-y-auto px-6 pb-8 pt-5">{children}</div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
