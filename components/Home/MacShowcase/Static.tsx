import Image from "next/image"

export default function MacShowcaseStatic() {
  return (
    <>
      <div className="mx-auto flex justify-center text-center md:max-w-[58rem]">
        <Image
          width={920}
          height={128}
          className="z-10 md:max-w-lg"
          src="/images/DockUsedApps.png"
          alt="Dock Used Apps"
        />
      </div>
      <div
        id="mac-img"
        className="relative mx-auto flex justify-center overflow-hidden bg-red-400 text-center md:max-w-[58rem]"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 62% 82% at 50% 50%, white 52%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 62% 82% at 50% 50%, white 52%, transparent 100%)",
        }}
      >
        <Image
          width={667}
          height={295}
          quality={100}
          className="absolute -top-10 -z-10 block w-full sm:-top-24 md:-top-32"
          src="/images/teclado-mac.jpg"
          alt="Teclado MacBook"
        />
      </div>
    </>
  )
}
