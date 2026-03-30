import type { ReactNode } from "react"

type HeaderOrbitFrameProps = {
  children: ReactNode
}

export default function HeaderOrbitFrame({ children }: HeaderOrbitFrameProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[min(88vh,780px)] w-[min(96vw,1120px)]">
        <div className="absolute left-1/2 top-1/2 aspect-square h-[200%] -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      </div>
    </div>
  )
}
