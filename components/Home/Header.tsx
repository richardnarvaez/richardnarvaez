import AnimatedTitle from "@/components/Home/AnimatedTitle"
import HeaderImage from "@/components/Home/HeaderImage"

import ScrollDownIndicator from "../ScrollDownIndicator"

export default function Header() {
  return (
    <>
      <section
        id="header"
        className="custom-cursor flex h-dvh w-full flex-col items-center justify-center gap-4 overflow-hidden text-center"
      >
        <div className="w-full max-w-5xl">
          <div className="relative z-20 flex w-full flex-col items-center justify-center gap-4">
            <AnimatedTitle />
            <ScrollDownIndicator />
          </div>
        </div>
        <HeaderImage />
      </section>
    </>
  )
}
