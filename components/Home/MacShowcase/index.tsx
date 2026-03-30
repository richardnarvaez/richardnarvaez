import Image from "next/image"

import MacScrollScrub from "./MacScrollScrub"

const FRAME_COUNT = 96

export default function MacShowcase() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <MacScrollScrub
        frameCount={FRAME_COUNT}
        framePathTemplate="/mac-frames/frame-[index].jpg"
        posterSrc="/mac.png"
        posterWidth={1686}
        posterHeight={199}
      >
        {/* Create animation with separete apps and blur bg */}
        {/* <div className="pointer-events-none  absolute inset-x-0 bottom-[12%] z-10 flex justify-center px-4 sm:bottom-[13%]">
          <Image
            src="/images/DockUsedApps.png"
            alt="Dock Used Apps"
            width={920}
            height={128}
            className="h-auto w-full max-w-[620px] drop-shadow-[0_24px_80px_rgba(10,7,24,0.45)]"
            sizes="(max-width: 800px) 78vw, 620px"
          />
        </div> */}
      </MacScrollScrub>
    </div>
  )
}
