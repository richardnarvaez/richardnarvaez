import Image from "next/image"

export default function CardTopTools() {
  return (
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
  )
}
