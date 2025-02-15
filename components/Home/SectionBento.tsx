"use client"
/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import { ExternalLinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CardTopTools from "./SectionBento/TopTools"

export default function SectionBento() {
  return (
    <section
      id="main"
      className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-8 md:grid-cols-2 lg:grid-cols-3 lg:px-0"
    >
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://drive.google.com/file/d/1-6_qXA48htfG1dpM7xDRBNnVHXKSGRi_mw3PMFu7Szc/view"
        className="group relative h-96 w-full cursor-pointer overflow-hidden rounded-3xl border-4 border-red-500"
      >
        <Image
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform ease-out group-hover:scale-110 group-hover:blur-sm"
          src={"/images/avatars/richard.jpg"}
          width={700}
          height={900}
        />
        <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-between bg-black/30 transition-all group-hover:bg-black/50 ">
          <div className="w-fit rounded-br-xl bg-red-500 px-4 py-2">
            <p className="text-xs font-bold text-gray-300 ">NOW AVALIABLE</p>
          </div>

          <div className="">
            <div className="bg-gradient-to-t from-red-500 to-transparent p-4 font-bold">
              <p className="text-md text-gray-300">RESUME</p>
              <p className="text-3xl ">View or Download Resume in PDF</p>
              <p className="text-sm ">{"It's free, so take a look."}</p>
            </div>
            <div className="flex items-center justify-between gap-3  bg-red-500 p-2 pb-3">
              <div className="flex items-center gap-3 p-2">
                <Image
                  className="h-12 w-12"
                  src={"/images/GDrive-logo.png"}
                  width={150}
                  height={150}
                  alt=""
                />
                <div className="w-full overflow-hidden">
                  <p className="font-bold">PDF Resume </p>
                  <p
                    className="truncate text-sm"
                    title="Google Drive External Link"
                  >
                    Google Drive External Link
                  </p>
                </div>
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2  text-sm font-semibold">
                Visit
              </div>
            </div>
          </div>

          <Image
            alt=""
            className="absolute -right-[270px] -top-[80px] h-full w-full  rotate-45 object-cover opacity-0 transition-all duration-300 ease-out group-hover:right-0 group-hover:rotate-0 group-hover:opacity-100"
            src={"/images/home/me.webp"}
            width={700}
            height={900}
          />
        </div>
      </a>
      <div className="group relative z-50 flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-0 border-white/20 p-4 font-bold transition-transform lg:col-span-2">
        <Image
          alt="Background Huma Legends"
          src={"/images/blog/huma/huma-bg.jpg"}
          width={960}
          height={540}
          className="absolute top-0 h-full w-full scale-105 opacity-75 blur-md transition-all  group-hover:scale-125 group-hover:blur-lg "
        />
        <p className="z-10 rounded-full border-4 border-white/30 bg-white/70 px-4 py-1 text-sm  text-black/60">
          NEW
        </p>
        <div className="z-10 m-4 mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-white">
          <Image
            alt="Huma Legends App Icon"
            src={"/images/blog/huma/huma-app-icon.jpg"}
            width={100}
            height={100}
          />
        </div>
        <div className="z-10 flex-col items-center justify-center text-center">
          <p className="text-3xl text-white">HUMA LEGENDS</p>
          <p className="mb-4 mt-2">DOWNLOAD IN APPSTORE</p>
          <div className="flex justify-center gap-4">
            <Link
              href={"https://huma.darkpixl.com"}
              target="_blank"
              className="rounded-3xl border border-white/50 bg-black/20 px-4 py-2 text-sm"
            >
              Visit Website
            </Link>
            <Link
              href={"/projects/huma"}
              className="rounded-3xl border border-white/50 bg-black/20 px-4 py-2 text-sm"
            >
              Visit Story
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <Link
        href={"/#stack"}
        className="group relative h-[500px] w-full cursor-pointer overflow-hidden rounded-3xl bg-[#23293C]  md:h-full lg:h-auto "
      >
        <div
          className="p-4 font-bold"
          style={{
            zIndex: 14,
            position: "absolute",
            background: "linear-gradient(180deg, #23293c, transparent)",
            width: "100%",
          }}
        >
          <p className="text-md text-white/75">TECHNOLOGIES</p>
          <p className="text-3xl ">Tools and Frameworks</p>
        </div>
        <Image
          alt=""
          className="absolute -bottom-8 -right-8 w-full  -rotate-12 scale-125 transition-transform ease-out group-hover:scale-150"
          src={"/images/IconsTech.png"}
          width={800}
          height={800}
        />
      </Link>
      <div className=" grid w-full cursor-pointer grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => alert("Coming soon")}
            className="group relative flex items-center justify-center overflow-hidden rounded-3xl border p-6 text-center"
          >
            1M$ Ideas
          </button>
          <CardTopTools />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://www.figma.com/community/file/1270173776891030529"
            className="group relative flex items-center overflow-hidden rounded-3xl border-2 border-dashed border-[#FF512F]/50  p-6 font-bold "
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 26 26"
                fill="none"
                className="absolute right-8 top-0 h-96 w-96 text-gray-200/5 transition-all group-hover:top-8 group-hover:h-20 group-hover:w-20 group-hover:text-gray-200/20"
              >
                <title>Figma</title>
                <path
                  d="M13 1.625H9.20829C7.11421 1.625 5.41663 3.32259 5.41663 5.41667C5.41663 7.51075 7.11421 9.20833 9.20829 9.20833M13 1.625V9.20833M13 1.625H16.7916C18.8857 1.625 20.5833 3.32259 20.5833 5.41667C20.5833 7.51075 18.8857 9.20833 16.7916 9.20833M13 9.20833H9.20829M13 9.20833V16.7917M13 9.20833H16.7916M9.20829 9.20833C7.11421 9.20833 5.41663 10.9059 5.41663 13C5.41663 15.0941 7.11421 16.7917 9.20829 16.7917M13 16.7917H9.20829M13 16.7917V20.5833C13 22.6774 11.3024 24.375 9.20829 24.375C7.11421 24.375 5.41663 22.6774 5.41663 20.5833C5.41663 18.4893 7.11421 16.7917 9.20829 16.7917M16.7916 9.20833C18.8857 9.20833 20.5833 10.9059 20.5833 13C20.5833 15.0941 18.8857 16.7917 16.7916 16.7917C14.6975 16.7917 13 15.0941 13 13C13 10.9059 14.6975 9.20833 16.7916 9.20833Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mb-2 flex items-center gap-2 text-xl text-[#FF512F]">
                FIGMA <ExternalLinkIcon size={24} />
              </p>
              <p className="text-3xl ">Visit this Portfolio Template</p>
              <p className="text-md mt-3 font-normal text-gray-200/50">
                We have Updates of this Portfolio Design in Figma Community
              </p>
            </div>
          </Link>
          <Link
            href={"/#info"}
            className="group relative flex h-40 items-center justify-center overflow-hidden rounded-3xl border-2 border-white bg-slate-800 text-center"
          >
            <Image
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform ease-out group-hover:scale-110 group-hover:blur-sm"
              src={"/images/speech.png"}
              width={700}
              height={900}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <p className="font-bold">About Me</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
