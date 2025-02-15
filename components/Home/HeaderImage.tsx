import Image from "next/image"

export default function HeaderImage() {
  return (
    <div className="animate-fade-in opacity-0">
      <div className="absolute inset-x-0 top-0 z-10 h-[50vh] w-full bg-gradient-to-b from-[hsl(244,31%,10%)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[50vh] w-full bg-gradient-to-t from-[hsl(244,31%,10%)] to-transparent" />

      <Image
        src="/images/home/bg-header.jpg"
        width={720}
        height={720}
        placeholder="blur"
        blurDataURL="/images/home/bg-header-blur.jpg"
        alt="Background - Richard Vinueza Profile"
        className="absolute inset-0 h-[100dvh] w-full object-cover opacity-25 transition-all duration-1000"
        priority
      />
    </div>
  )
}
